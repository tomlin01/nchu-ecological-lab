import {DURATION,PHASES,ASSETS,stateAt,validateSource} from './story-model.mjs';
import {buildSourceGeometry,renderScene} from './story-scene.mjs';

const $=id=>document.getElementById(id);
const root=document.documentElement,player=$('player');
const reduced=matchMedia('(prefers-reduced-motion:reduce)'),mobile=matchMedia('(max-width:600px)');
const EXPAND='ecology-media-expand',RETRY_KEY=`ecology-reef-story-retry:${location.pathname}`;
const clamp=value=>Math.max(0,Math.min(DURATION,value));
const clockText=value=>{const seconds=Math.floor(clamp(value));return `${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`;};
let time=0,running=false,ready=false,loading=false,error=null,data=null,reef=null;
let frame=0,lastTick=0,lastCoreTime=null,lastNarrative='',lastPhase=-1,lastState='';
let expanded=false,suspended=false,printState=null,lastPauseReason='initial',requestedTheme='light';
let sizeFrame=0,lastHeight=0,attempt=0,generation=0,controller=null,loadPromise=null,corePromise=null,coreFailed=false;

try{
  const saved=sessionStorage.getItem(RETRY_KEY);sessionStorage.removeItem(RETRY_KEY);
  if(saved!==null&&Number.isFinite(Number(saved)))time=clamp(Number(saved));
  requestedTheme=localStorage.getItem('ecology-color-theme')==='dark'?'dark':'light';
}catch{}
root.classList.add('has-js','embedded-reef');
$('seekRange').min='0';$('seekRange').max=String(DURATION);$('seekRange').step=String(1/24);
$('seekRange').disabled=false;
document.querySelectorAll('#themeButton,#expandButton').forEach(node=>node.disabled=false);
document.querySelectorAll('[data-seek]').forEach(node=>node.disabled=false);

function text(id,value){const node=$(id);if(node&&node.textContent!==String(value))node.textContent=String(value);}
function status(value){text('playerStatus',value);}
function modelState(){return stateAt(time,data,{reducedMotion:reduced.matches,compact:mobile.matches,exportMode:false});}
function getState(){
  const composition=$('composition').getBoundingClientRect();
  return {...modelState(),ready,loading,error,attempt,playing:running&&ready,time,duration:DURATION,
    theme:root.dataset.theme,expanded,suspended,lastPauseReason,labels:false,
    composition:{width:composition.width,height:composition.height},sourceLoaded:!!data,
    conceptualDiagrams:true,newPrediction:false,modelInferenceRun:false,hasAudio:false,sourceImagesEdited:false};
}
function post(type,extra={}){if(parent!==window)parent.postMessage({type,...extra},location.origin);}
function postState(force=false){
  const key=JSON.stringify([Math.floor(time*2),ready,loading,error,running,expanded,suspended,root.dataset.theme,reduced.matches]);
  if(force||key!==lastState){lastState=key;post('ecology-reef-state',{state:getState()});}
}
function size(){
  if(sizeFrame)return;
  sizeFrame=requestAnimationFrame(()=>{
    sizeFrame=0;
    const height=Math.ceil(player.getBoundingClientRect().height);
    if(height>=300&&height<=7000&&height!==lastHeight){lastHeight=height;post('ecology-size',{height});}
  });
}
function render(forceCore=false){
  const s=modelState(),phase=PHASES[s.phase],narrative={...phase,...s.narrative};
  const coreTime=Math.min(time,20);
  // The accepted core never owns a running clock; after the opening its final frame is reused.
  if(reef?.getState().ready&&(forceCore||coreTime!==lastCoreTime)){
    reef.seek(coreTime);lastCoreTime=coreTime;
  }
  renderScene(s,data);
  document.body.dataset.phase=phase.id;
  if(lastPhase!==s.phase){
    text('phaseLabel',`${s.phase+1} / ${PHASES.length} · ${phase.label}`);
    document.querySelectorAll('[data-seek]').forEach(button=>Number(button.dataset.seek)===phase.start?button.setAttribute('aria-current','step'):button.removeAttribute('aria-current'));
    lastPhase=s.phase;
  }
  const narrativeKey=JSON.stringify([s.phase,narrative.title,narrative.copy,narrative.note]);
  if(lastNarrative!==narrativeKey){
    text('phaseTitle',narrative.title);text('phaseCopy',narrative.copy);text('phaseNote',narrative.note);
    lastNarrative=narrativeKey;size();
  }
  text('timeReadout',`${clockText(time)} / ${clockText(DURATION)}`);
  $('seekRange').value=String(time);$('seekRange').setAttribute('aria-valuetext',`${clockText(time)}，${phase.label}`);
  text('playButton',running?'暫停':time>=DURATION?'重新播放':time>0?'繼續播放':'播放');
  $('playButton').setAttribute('aria-pressed',String(running));$('playButton').setAttribute('aria-label',running?'暫停動畫':'播放動畫');
  $('playButton').disabled=$('replayButton').disabled=!ready||loading||suspended;
  document.querySelectorAll('[data-frame]').forEach(button=>button.disabled=!ready||loading);
  $('playerError').hidden=!error;text('playerErrorCopy',error||'');$('retryButton').disabled=loading;
  postState();
}
function stopClock(){running=false;cancelAnimationFrame(frame);frame=0;lastTick=0;}
function pause(reason='host-pause'){
  stopClock();lastPauseReason=reason;render();
  status(`已停在 ${clockText(time)}。`);postState(true);return getState();
}
function seek(value){
  const numeric=Number(value);if(!Number.isFinite(numeric))return getState();
  stopClock();time=clamp(numeric);lastPauseReason='seek';render(true);
  status(ready?`已停在 ${clockText(time)}，按播放繼續。`:`已選擇 ${clockText(time)}；載入完成後會停在這裡。`);
  postState(true);return getState();
}
function tick(now){
  frame=0;if(!running)return;
  time=clamp(time+Math.max(0,now-lastTick)/1000);lastTick=now;
  if(time>=DURATION){stopClock();render();status('動畫結束。可重播或跳回任一段落。');postState(true);return;}
  render();frame=requestAnimationFrame(tick);
}
function play(){
  if(!ready||loading||suspended||document.hidden||printState)return getState();
  if(running)return getState();
  if(time>=DURATION)seek(0);
  running=true;lastTick=performance.now();render();status('動畫播放中，沒有聲音。');postState(true);
  frame=requestAnimationFrame(tick);return getState();
}
function replay(){seek(0);return play();}
function suspend(reason='host-suspend'){suspended=true;return pause(reason);}
function resume(){suspended=false;render();postState(true);return getState();}
function setTheme(value,{persist=false}={}){
  if(value!=='light'&&value!=='dark')return getState();
  requestedTheme=value;root.dataset.theme=value;reef?.setTheme(value);
  const button=$('themeButton');
  if(button){text('themeButton',value==='dark'?'切換淺色':'切換深色');button.setAttribute('aria-pressed',String(value==='dark'));}
  if(persist)try{localStorage.setItem('ecology-color-theme',value);}catch{}
  postState(true);return getState();
}
function syncTheme(){
  if(parent===window)return;
  try{setTheme(parent.EcologyTheme?.getState().theme||parent.document.documentElement.dataset.theme);}catch{}
}
function viewport(message){
  if(typeof message.hostHeight==='number'&&Number.isFinite(message.hostHeight))root.style.setProperty('--reef-host-height',`${Math.max(320,Math.min(1800,message.hostHeight))}px`);
  size();
}
function focusable(){
  return [...player.querySelectorAll('a[href],button,input,select,textarea,summary,[tabindex]')].filter(node=>
    !node.disabled&&node.tabIndex>=0&&!node.closest('[hidden],[inert],[aria-hidden="true"]')&&node.getClientRects().length&&getComputedStyle(node).visibility!=='hidden');
}
function focusBoundary(last){const items=focusable(),target=last?items.at(-1):items[0];if(target)target.focus();else post(EXPAND,{action:'focus-start'});}
function setExpanded(value){
  expanded=Boolean(value);root.classList.toggle('media-expanded-view',expanded);document.body.classList.toggle('is-expanded',expanded);
  const button=$('expandButton');
  if(button){button.setAttribute('aria-expanded',String(expanded));button.setAttribute('aria-pressed',String(expanded));text('expandButton',expanded?'收起放大':'放大觀看');}
  if(!expanded)scrollTo(0,0);
  render();size();postState(true);return getState();
}
function requestExpand(){
  if(parent!==window){
    if(expanded){post(EXPAND,{action:'close'});return;}
    try{
      const stage=window.frameElement?.closest('[data-media-expand-stage]');
      if(stage&&parent.EcologyMediaExpand){parent.EcologyMediaExpand.open(stage);return;}
    }catch{}
    return;
  }
  setExpanded(!expanded);
}

function abortable(promise,signal){
  return new Promise((resolve,reject)=>{
    const abort=()=>{signal.removeEventListener('abort',abort);reject(new DOMException('Aborted','AbortError'));};
    signal.addEventListener('abort',abort,{once:true});
    if(signal.aborted){abort();return;}
    promise.then(value=>{signal.removeEventListener('abort',abort);resolve(value);},cause=>{signal.removeEventListener('abort',abort);reject(cause);});
  });
}
function preload(key,url,signal,expected){
  return new Promise((resolve,reject)=>{
    const image=new Image();let settled=false;
    const finish=cause=>{
      if(settled)return;settled=true;signal.removeEventListener('abort',abort);image.onload=image.onerror=null;
      cause?reject(cause):resolve();
    };
    const abort=()=>{finish(new DOMException('Aborted','AbortError'));image.src='';};
    image.onerror=()=>finish(new Error(`圖片「${key}」未能載入。`));
    image.onload=async()=>{
      if(image.naturalWidth!==expected.width||image.naturalHeight!==expected.height){finish(new Error(`圖片「${key}」尺寸與來源不符。`));return;}
      try{await image.decode();finish();}catch{finish(new Error(`圖片「${key}」未能解碼。`));}
    };
    signal.addEventListener('abort',abort,{once:true});if(signal.aborted){abort();return;}image.src=url;
  });
}
function assignAssets(urls){
  document.querySelectorAll('[data-asset]').forEach(node=>{
    const url=urls[node.dataset.asset];if(!url)return;
    if(node.tagName.toLowerCase()==='image')node.setAttribute('href',url);
    else if(node.getAttribute('src')!==url)node.setAttribute('src',url);
  });
}
async function load(){
  if(loading)return loadPromise;
  const current=++generation;attempt++;stopClock();ready=false;loading=true;error=null;
  controller?.abort();controller=new AbortController();const active=controller;
  status('正在載入礁區場景、地圖與來源資料。可以先選擇段落，載入後按播放才會開始。');render();postState(true);
  loadPromise=(async()=>{
    const timeout=setTimeout(()=>active.abort(),30000);
    try{
      if(!window.ReefStudy?.getState().ready){
        corePromise??=import('./app.mjs');await abortable(corePromise,active.signal);
      }
      reef=window.ReefStudy;
      if(!reef?.getState().ready){coreFailed=true;throw new Error($('error')?.querySelector('p')?.textContent||'礁區場景未能載入。');}
      reef.pause();reef.setTheme(requestedTheme);coreFailed=false;
      const response=await fetch(new URL('./story-source.json',import.meta.url),{signal:active.signal,cache:attempt>1?'reload':'default'});
      if(!response.ok)throw new Error(`來源資料未能載入（${response.status}）。`);
      const source=validateSource(await response.json());
      const urls=Object.fromEntries(Object.entries(ASSETS).map(([key,asset])=>{
        const url=new URL(asset.file,import.meta.url);if(attempt>1)url.searchParams.set('retry',String(attempt));return [key,url.href];
      }));
      await Promise.all([...Object.entries(urls).map(([key,url])=>preload(key,url,active.signal,source.assets[key])),abortable(document.fonts?.ready||Promise.resolve(),active.signal)]);
      if(current!==generation)return;
      data=source;buildSourceGeometry(data);assignAssets(urls);ready=true;loading=false;render(true);
      status(`圖片與來源資料已載入，停在 ${clockText(time)}。按播放開始，沒有聲音。`);
      postState(true);post('ecology-reef-ready',{state:getState()});size();
    }catch(cause){
      if(current!==generation)return;
      coreFailed=!window.ReefStudy?.getState().ready;
      ready=false;loading=false;error=cause?.name==='AbortError'?'場景、圖片、字型或來源資料載入逾時。':cause?.message||'動畫資料未能載入。';
      active.abort();render();status(`${error} 可以重試，已選時間會保留。`);
      post('ecology-reef-error',{error,state:getState()});postState(true);size();
    }finally{clearTimeout(timeout);if(current===generation)loadPromise=null;}
  })();
  return loadPromise;
}
function retry(){
  if(loading)return loadPromise;
  pause('retry');
  if(coreFailed&&!window.ReefStudy?.getState().ready){
    try{sessionStorage.setItem(RETRY_KEY,String(time));}catch{}
    location.reload();return;
  }
  return load();
}

$('playButton').addEventListener('click',()=>running?pause('play-button'):play());
$('replayButton').addEventListener('click',replay);
$('seekRange').addEventListener('input',event=>seek(event.target.value));
$('retryButton').addEventListener('click',retry);
document.querySelectorAll('[data-frame]').forEach(button=>button.addEventListener('click',()=>seek(time+Number(button.dataset.frame)/24)));
document.querySelectorAll('[data-seek]').forEach(button=>button.addEventListener('click',()=>seek(button.dataset.seek)));
$('themeButton')?.addEventListener('click',()=>setTheme(root.dataset.theme==='dark'?'light':'dark',{persist:true}));
$('expandButton')?.addEventListener('click',requestExpand);
addEventListener('message',event=>{
  if(parent===window||event.source!==parent||event.origin!==location.origin||!event.data||typeof event.data!=='object')return;
  const message=event.data;
  if(message.type==='ecology-control'){
    if(message.action==='play')play();else if(message.action==='pause')pause(message.reason||'host-pause');
    else if(message.action==='seek')seek(message.time??message.seconds);else if(message.action==='theme')setTheme(message.theme);
    else if(message.action==='suspend')suspend(message.reason||'host-suspend');else if(message.action==='resume')resume();
    else if(message.action==='retry')retry();else if(message.action==='state')postState(true);else if(message.action==='viewport')viewport(message);
    return;
  }
  if(message.type!==EXPAND)return;
  viewport(message);if(typeof message.expanded==='boolean')setExpanded(message.expanded);
  if(expanded&&message.action==='focus-first')focusBoundary(false);else if(expanded&&message.action==='focus-last')focusBoundary(true);
});
document.addEventListener('keydown',event=>{
  if(event.defaultPrevented||event.isComposing||event.altKey||event.ctrlKey||event.metaKey)return;
  if(expanded&&event.key==='Escape'){
    event.preventDefault();if(parent!==window)post(EXPAND,{action:'close'});else setExpanded(false);return;
  }
  if(expanded&&event.key==='Tab'){
    const items=focusable(),edge=event.shiftKey?items[0]:items.at(-1);
    if(!items.length||document.activeElement===edge){
      event.preventDefault();if(parent!==window)post(EXPAND,{action:items.length?'focus-close':'focus-start'});else focusBoundary(event.shiftKey);
    }
    return;
  }
  if(event.target.closest('a,button,input,select,textarea,summary,[contenteditable]'))return;
  if(event.code==='Space'){event.preventDefault();running?pause('keyboard'):play();}
  else if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();seek(time+(event.key==='ArrowLeft'?-1:1));}
});
document.addEventListener('visibilitychange',()=>{if(document.hidden)pause('document-hidden');});
addEventListener('pagehide',()=>pause('page-hidden'));
addEventListener('pageshow',()=>{size();postState(true);});
// Embedded height changes follow the scene content; the host pauses real viewport resizes.
addEventListener('resize',()=>{if(parent===window)pause('viewport-resize');size();});
reduced.addEventListener('change',()=>pause('motion-preference'));
mobile.addEventListener('change',()=>{render();size();});
player.addEventListener('click',event=>{if(event.target.closest('a[href]'))pause('source-link');});
new IntersectionObserver(entries=>{if(entries[0]&&!entries[0].isIntersecting&&running)pause('player-offscreen');},{threshold:0}).observe($('stage'));
new ResizeObserver(size).observe(player);
new MutationObserver(()=>{
  if(loading||!ready||$('error').hidden)return;
  coreFailed=true;ready=false;error=$('error').querySelector('p')?.textContent||'礁區場景已中斷。';
  pause('core-error');post('ecology-reef-error',{error,state:getState()});size();
}).observe($('error'),{attributes:true,attributeFilter:['hidden']});
const parentThemeObserver=new MutationObserver(syncTheme);
try{
  if(parent!==window){parentThemeObserver.observe(parent.document.documentElement,{attributes:true,attributeFilter:['data-theme']});parent.addEventListener('ecologythemechange',syncTheme);}
}catch{}
addEventListener('storage',event=>{if(event.key==='ecology-color-theme'||event.key===null)setTheme(event.newValue==='dark'?'dark':'light');});
addEventListener('beforeprint',()=>{
  if(printState)return;pause('before-print');printState={time,details:[...player.querySelectorAll('details')].map(node=>[node,node.open])};
  printState.details.forEach(([node])=>node.open=true);
});
addEventListener('afterprint',()=>{
  if(!printState)return;const saved=printState;printState=null;saved.details.forEach(([node,open])=>node.open=open);seek(saved.time);
});
window.EcologyReefPlayer={getState,play,pause,seek,replay,retry,setTheme,suspend,resume,setExpanded};
window.EcologyReefEmbed={getState:()=>({expanded,height:lastHeight,theme:root.dataset.theme,scrollY})};
setTheme(requestedTheme);syncTheme();render();size();post(EXPAND,{action:'ready'});load();
