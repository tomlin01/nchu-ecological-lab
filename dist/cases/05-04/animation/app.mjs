import {DURATION,PHASES,ASSETS,stateAt,validateSource} from './model.mjs';
import {buildSourceGeometry,renderScene} from './scene.mjs';

const $=id=>document.getElementById(id);
const root=document.documentElement,player=$('player'),embedded=parent!==window;
const reduced=matchMedia('(prefers-reduced-motion:reduce)'),mobile=matchMedia('(max-width:600px)');
const params=new URLSearchParams(location.search),exportMode=params.get('export')==='1';
const queryTheme=['light','dark'].includes(params.get('theme'))?params.get('theme'):null;
const EXPAND='ecology-media-expand',THEME_KEY='ecology-color-theme';
const clamp=value=>Math.max(0,Math.min(DURATION,value));
const clockText=value=>{const seconds=Math.floor(clamp(value));return `${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`;};
let time=0,running=false,ready=false,loading=false,error=null,data=null;
let frame=0,lastTick=0,lastNarrative='',lastPhase=-1,lastState='';
let expanded=false,suspended=false,printState=null,dialogState=null,lastPauseReason='initial';
let sizeFrame=0,lastHeight=0,attempt=0,generation=0,controller=null,loadPromise=null;

root.classList.add('has-js');root.classList.toggle('embedded-landcover',embedded);
root.classList.toggle('export-mode',exportMode);
$('seekRange').min='0';$('seekRange').max=String(DURATION);$('seekRange').step=String(1/24);$('seekRange').disabled=false;
document.querySelectorAll('#themeButton,#expandButton,[data-seek]').forEach(node=>node.disabled=false);

function text(id,value){const node=$(id);if(node&&node.textContent!==String(value))node.textContent=String(value);}
function status(value){text('playerStatus',value);}
function modelState(){return stateAt(time,data,{reducedMotion:reduced.matches,compact:!exportMode&&mobile.matches,exportMode});}
function getState(){
  const composition=$('composition').getBoundingClientRect();
  return {...modelState(),ready,loading,error,attempt,playing:running&&ready,time,duration:DURATION,
    theme:root.dataset.theme,exportMode,expanded,suspended,lastPauseReason,sourceLoaded:!!data,
    composition:{width:composition.width,height:composition.height},newPrediction:false,modelInferenceRun:false,hasAudio:false};
}
function post(type,extra={}){if(embedded)parent.postMessage({type,...extra},location.origin);}
function postState(force=false){
  const key=JSON.stringify([Math.floor(time*2),ready,loading,error,running,expanded,suspended,root.dataset.theme,reduced.matches,mobile.matches]);
  if(force||key!==lastState){lastState=key;post('ecology-landcover-state',{state:getState()});}
}
function size(){
  if(sizeFrame)return;
  sizeFrame=requestAnimationFrame(()=>{
    sizeFrame=0;
    const height=Math.ceil(player.getBoundingClientRect().height);
    if(height>=300&&height<=7000&&height!==lastHeight){lastHeight=height;post('ecology-size',{height});}
  });
}
function render(){
  const s=modelState(),phase=PHASES[s.phase],narrative={...phase,...s.narrative};
  renderScene(s,data);document.body.dataset.phase=phase.id;
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
  stopClock();lastPauseReason=reason;render();status(`已停在 ${clockText(time)}。`);postState(true);return getState();
}
function seek(value){
  const numeric=Number(value);if(!Number.isFinite(numeric))return getState();
  stopClock();time=clamp(numeric);lastPauseReason='seek';render();
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
  if(!ready||loading||suspended||document.hidden||printState||running)return getState();
  if(time>=DURATION)seek(0);
  running=true;lastTick=performance.now();render();status('動畫播放中，沒有聲音。');postState(true);
  frame=requestAnimationFrame(tick);return getState();
}
function replay(){seek(0);return play();}
function suspend(reason='host-suspend'){suspended=true;return pause(reason);}
function resume(){suspended=false;render();postState(true);return getState();}
function setTheme(value,{persist=false}={}){
  if(value!=='light'&&value!=='dark')return getState();
  root.dataset.theme=value;text('themeButton',value==='dark'?'切換淺色':'切換深色');
  $('themeButton').setAttribute('aria-pressed',String(value==='dark'));
  $('themeButton').setAttribute('aria-label',value==='dark'?'切換淺色模式':'切換深色模式');
  if(persist)try{localStorage.setItem(THEME_KEY,value);}catch{}
  postState(true);return getState();
}
function syncTheme(){
  if(!embedded||queryTheme)return;
  try{setTheme(parent.EcologyTheme?.getState().theme||parent.document.documentElement.dataset.theme);}catch{}
}
function viewport(message){
  if(typeof message.hostHeight==='number'&&Number.isFinite(message.hostHeight))root.style.setProperty('--landcover-host-height',`${Math.max(320,Math.min(1800,message.hostHeight))}px`);
  size();
}
function visible(node){return Boolean(node?.isConnected&&!node.closest('[hidden],[inert],[aria-hidden="true"]')&&node.getClientRects().length&&getComputedStyle(node).visibility!=='hidden');}
function focusable(){return [...player.querySelectorAll('a[href],button,input,select,textarea,summary,[tabindex]')].filter(node=>!node.disabled&&node.tabIndex>=0&&visible(node));}
function focusBoundary(last){
  const items=focusable(),target=last?items.at(-1):items[0];
  if(target)target.focus();else if(embedded)post(EXPAND,{action:'focus-start'});else player.focus();
}
function setExpanded(value){
  const next=Boolean(value);if(next===expanded)return getState();
  if(!embedded){
    pause('expanded-view');
    if(next){
      dialogState={focus:document.activeElement,scroll:[scrollX,scrollY],attributes:['role','aria-modal','aria-label','tabindex'].map(name=>[name,player.getAttribute(name)]),inert:[]};
      for(let node=player;node.parentElement;node=node.parentElement)for(const sibling of node.parentElement.children){
        if(sibling===node||sibling.hasAttribute('inert'))continue;
        dialogState.inert.push(sibling);sibling.setAttribute('inert','');
      }
      player.setAttribute('role','dialog');player.setAttribute('aria-modal','true');player.setAttribute('tabindex','-1');
      if(!player.hasAttribute('aria-label')&&!player.hasAttribute('aria-labelledby'))player.setAttribute('aria-label','放大觀看土地覆蓋動畫');
    }
  }
  expanded=next;root.classList.toggle('media-expanded-view',expanded);document.body.classList.toggle('is-expanded',expanded);
  $('expandButton').setAttribute('aria-expanded',String(expanded));$('expandButton').setAttribute('aria-pressed',String(expanded));
  $('expandButton').setAttribute('aria-label',expanded?'收起放大觀看':'放大觀看動畫');text('expandButton',expanded?'收起放大':'放大觀看');
  if(!embedded){
    if(expanded)$('expandButton').focus({preventScroll:true});
    else if(dialogState){
      const saved=dialogState;dialogState=null;
      for(const [name,value] of saved.attributes)value===null?player.removeAttribute(name):player.setAttribute(name,value);
      for(const node of saved.inert)if(node.getAttribute('inert')==='')node.removeAttribute('inert');
      scrollTo(...saved.scroll);
      (visible(saved.focus)?saved.focus:$('expandButton')).focus({preventScroll:true});
    }
  }else if(!expanded)scrollTo(0,0);
  render();size();postState(true);return getState();
}
function requestExpand(){
  if(!embedded){setExpanded(!expanded);return;}
  if(expanded){post(EXPAND,{action:'close'});return;}
  try{
    const stage=window.frameElement?.closest('[data-media-expand-stage]');
    if(stage&&parent.EcologyMediaExpand)parent.EcologyMediaExpand.open(stage);
  }catch{}
}

function abortable(promise,signal){
  return new Promise((resolve,reject)=>{
    const abort=()=>{signal.removeEventListener('abort',abort);reject(new DOMException('Aborted','AbortError'));};
    signal.addEventListener('abort',abort,{once:true});if(signal.aborted){abort();return;}
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
function load(){
  if(loadPromise)return loadPromise;
  const current=++generation;attempt++;stopClock();ready=false;loading=true;error=null;
  controller?.abort();controller=new AbortController();const active=controller;
  status('正在載入圖片、字型與來源資料。可以先選擇段落，載入後按播放才會開始。');render();postState(true);
  // Assign the shared promise before starting work, so repeated retry clicks cannot race.
  loadPromise=Promise.resolve().then(async()=>{
    const timeout=exportMode?null:setTimeout(()=>active.abort(),30000);
    try{
      if(DURATION!==120)throw new Error('動畫時間與120秒製作設定不符。');
      const response=await fetch(new URL('./assets/source-data.json',import.meta.url),{signal:active.signal,cache:attempt>1?'reload':'default'});
      if(!response.ok)throw new Error(`來源資料未能載入（${response.status}）。`);
      const source=validateSource(await response.json());
      const urls=Object.fromEntries(Object.entries(ASSETS).map(([key,asset])=>{
        const url=new URL(asset.file,import.meta.url);if(attempt>1)url.searchParams.set('retry',String(attempt));return [key,url.href];
      }));
      await Promise.all([...Object.entries(urls).map(([key,url])=>preload(key,url,active.signal,source.assets[key])),abortable(document.fonts?.ready||Promise.resolve(),active.signal)]);
      if(current!==generation)return getState();
      data=source;buildSourceGeometry(data);assignAssets(urls);ready=true;loading=false;render();
      status(`圖片與來源資料已載入，停在 ${clockText(time)}。按播放開始，沒有聲音。`);
      postState(true);post('ecology-landcover-ready',{state:getState()});size();return getState();
    }catch(cause){
      if(current!==generation)return getState();
      ready=false;loading=false;error=cause?.name==='AbortError'?'圖片、字型或來源資料載入逾時。':cause?.message||'動畫資料未能載入。';
      active.abort();render();status(`${error} 可以重試，已選時間會保留。`);
      post('ecology-landcover-error',{error,state:getState()});postState(true);size();return getState();
    }finally{if(timeout!==null)clearTimeout(timeout);}
  }).finally(()=>{if(current===generation)loadPromise=null;});
  return loadPromise;
}
function retry(){if(loadPromise)return loadPromise;pause('retry');return load();}

$('playButton').addEventListener('click',()=>running?pause('play-button'):play());
$('replayButton').addEventListener('click',replay);$('seekRange').addEventListener('input',event=>seek(event.target.value));
$('retryButton').addEventListener('click',retry);
document.querySelectorAll('[data-frame]').forEach(button=>button.addEventListener('click',()=>seek(time+Number(button.dataset.frame)/24)));
document.querySelectorAll('[data-seek]').forEach(button=>button.addEventListener('click',()=>seek(button.dataset.seek)));
$('themeButton').addEventListener('click',()=>setTheme(root.dataset.theme==='dark'?'light':'dark',{persist:true}));
$('expandButton').addEventListener('click',requestExpand);
addEventListener('message',event=>{
  if(!embedded||event.source!==parent||event.origin!==location.origin||!event.data||typeof event.data!=='object')return;
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
    event.preventDefault();if(embedded)post(EXPAND,{action:'close'});else setExpanded(false);return;
  }
  if(expanded&&event.key==='Tab'){
    const items=focusable(),edge=event.shiftKey?items[0]:items.at(-1);
    if(!items.length||document.activeElement===edge||(!embedded&&!player.contains(document.activeElement))){
      event.preventDefault();if(embedded)post(EXPAND,{action:items.length?'focus-close':'focus-start'});else focusBoundary(event.shiftKey);
    }
    return;
  }
  if(event.target.closest('a,button,input,select,textarea,summary,[contenteditable]'))return;
  if(event.code==='Space'){event.preventDefault();running?pause('keyboard'):play();}
  else if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();seek(time+(event.key==='ArrowLeft'?-1:1));}
});
document.addEventListener('focusin',event=>{if(!embedded&&expanded&&!player.contains(event.target))$('expandButton').focus({preventScroll:true});});
document.addEventListener('visibilitychange',()=>{if(document.hidden)pause('document-hidden');});
addEventListener('pagehide',()=>pause('page-hidden'));addEventListener('pageshow',()=>{size();postState(true);});
// Parent-driven iframe height changes are layout updates; the host pauses actual viewport resizes.
addEventListener('resize',()=>{if(!embedded)pause('viewport-resize');size();});
reduced.addEventListener('change',()=>pause('motion-preference'));mobile.addEventListener('change',()=>{render();size();});
player.addEventListener('click',event=>{if(event.target.closest('a[href]'))pause('source-link');});
if(!exportMode)new IntersectionObserver(entries=>{if(entries[0]&&!entries[0].isIntersecting&&running)pause('player-offscreen');},{threshold:0}).observe($('stage'));
new ResizeObserver(size).observe(player);
const parentThemeObserver=new MutationObserver(syncTheme);
try{
  if(embedded){parentThemeObserver.observe(parent.document.documentElement,{attributes:true,attributeFilter:['data-theme']});parent.addEventListener('ecologythemechange',syncTheme);}
}catch{}
addEventListener('storage',event=>{if(!queryTheme&&(event.key===THEME_KEY||event.key===null))setTheme(event.newValue==='dark'?'dark':'light');});
addEventListener('beforeprint',()=>{
  if(printState)return;if(!embedded&&expanded)setExpanded(false);pause('before-print');
  printState={time,details:[...player.querySelectorAll('details')].map(node=>[node,node.open])};printState.details.forEach(([node])=>node.open=true);
});
addEventListener('afterprint',()=>{
  if(!printState)return;const saved=printState;printState=null;saved.details.forEach(([node,open])=>node.open=open);seek(saved.time);
});
window.EcologyLandcoverPlayer={getState,play,pause,seek,replay,retry,setTheme,suspend,resume,setExpanded};
window.EcologyLandcoverEmbed={getState:()=>({expanded,height:lastHeight,theme:root.dataset.theme,scrollY})};
let initialTheme='light';try{if(localStorage.getItem(THEME_KEY)==='dark')initialTheme='dark';}catch{}
setTheme(queryTheme||initialTheme);syncTheme();render();size();post(EXPAND,{action:'ready'});load();
