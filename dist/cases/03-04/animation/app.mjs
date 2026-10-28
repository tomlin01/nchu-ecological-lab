import {DURATION,EXPORT_SIZE,ASSETS,PHASES,clamp,clockText,stateAt,validateDetection} from './model.mjs';

const $=id=>document.getElementById(id);
const root=document.documentElement;
const scenes=[...document.querySelectorAll('.scene')];
const reduced=matchMedia('(prefers-reduced-motion:reduce)');
const mobile=matchMedia('(max-width:600px)');
const params=new URLSearchParams(location.search);
const exportMode=params.get('export')==='1';
const themeKey='ecology-color-theme';
const clock={time:0};
const ns='http://www.w3.org/2000/svg';
let data=null,timeline=null,ready=false,loading=false,error=null,attempt=0,loadGeneration=0,loadPromise=null,controller=null;
let lastPhase=-1,lastPostedTime=-1,printState=null,expandScroll=0;

root.classList.toggle('export-mode',exportMode);
root.classList.add('has-js');
document.querySelectorAll('#themeButton,#expandButton,#seekRange,[data-seek]').forEach(node=>node.disabled=false);
function text(id,value){const node=$(id);if(node.textContent!==String(value))node.textContent=String(value);}
function status(value){text('status',value);}
function setTheme(value,{persist=false}={}){
  const mode=value==='dark'?'dark':'light';root.dataset.theme=mode;
  text('themeButton',mode==='light'?'切換深色':'切換淺色');
  $('themeButton').setAttribute('aria-pressed',String(mode==='dark'));
  $('themeButton').setAttribute('aria-label',mode==='light'?'切換深色模式':'切換淺色模式');
  if(persist)try{localStorage.setItem(themeKey,mode);}catch{}
  return mode;
}
let storedTheme='light';try{storedTheme=localStorage.getItem(themeKey)||'light';}catch{}
setTheme(params.get('theme')||storedTheme);

function playing(){return Boolean(ready&&timeline&&!timeline.paused()&&clock.time<DURATION);}
function getState(){
  const composition=$('composition').getBoundingClientRect();
  return {...stateAt(clock.time,data,{reducedMotion:reduced.matches}),ready,loading,error,attempt,playing:playing(),
    theme:root.dataset.theme,exportMode,expanded:document.body.classList.contains('is-expanded'),
    compact:mobile.matches,composition:{width:composition.width,height:composition.height},
    exportSize:{...EXPORT_SIZE},sourceLoaded:Boolean(data),sourceFilename:data?.image?.fileName||null,
    cropIncludesCompleteAnimal:data?.selected?.cropIncludesCompleteAnimal??null,
    sourceCoordinateIndexBase:data?.annotation?.coordinateIndexBase??null,
    sourceGeometryAltered:false,sourceScoresInvented:false};
}
function postState(force=false){
  if(parent===window)return;
  if(!force&&Math.abs(clock.time-lastPostedTime)<.5)return;
  lastPostedTime=clock.time;
  parent.postMessage({type:'ecology-thermo-state',state:getState()},location.origin);
}
function render(){
  const state=stateAt(clock.time,data,{reducedMotion:reduced.matches}),phase=PHASES[state.phase];
  document.body.dataset.phase=phase.id;
  scenes.forEach((scene,index)=>{
    const active=index===state.phase;
    scene.dataset.active=String(active);scene.inert=!active;scene.setAttribute('aria-hidden',String(!active));
    scene.style.visibility=active?'visible':'hidden';scene.style.opacity=active?'1':'0';scene.style.pointerEvents=active?'auto':'none';
  });
  $('shadeReference').style.transform=(mobile.matches&&!exportMode)||(state.shadeTranslate===0&&state.shadeScale===1)?'none':`translateX(${state.shadeTranslate}%) scale(${state.shadeScale})`;
  $('sunReference').style.opacity=String(state.sunOpacity);
  $('sunReference').setAttribute('aria-hidden',String(state.phase===1&&state.sunOpacity===0));
  text('photoPairNote',state.phase===1&&state.local<4&&!reduced.matches?'先看這張陰影照片：亮的是背景。':'這是兩張不同照片，不能確認是同一隻的前後時刻。');
  $('sourceBoxes').style.opacity=String(data?state.sourceBoxOpacity:0);
  $('cropAndQuestions').style.opacity=String(data?state.cropOpacity:0);
  $('cropAndQuestions').setAttribute('aria-hidden',String(!data||(state.phase===2&&state.cropOpacity===0)));
  $('classificationQuestions').style.opacity=String(state.questionOpacity);
  document.querySelectorAll('[data-observation-row]').forEach((row,index)=>{
    const opacity=state.recordOpacities[index];row.style.opacity=String(opacity);row.setAttribute('aria-hidden',String(state.phase===3&&opacity===0));
  });
  $('paperResults').style.opacity=String(state.resultEmphasis);
  $('samplingGap').style.opacity=String(state.gapEmphasis);
  if(lastPhase!==state.phase){
    text('phaseLabel',`${state.phase+1} / ${PHASES.length} · ${phase.label}`);
    text('phaseTitle',phase.title);text('phaseCopy',phase.copy);text('phaseNote',phase.note);
    document.querySelectorAll('[data-seek]').forEach(button=>Number(button.dataset.seek)===phase.start?button.setAttribute('aria-current','step'):button.removeAttribute('aria-current'));
    lastPhase=state.phase;
  }
  text('timeReadout',`${clockText(clock.time)} / ${clockText(DURATION)}`);
  $('seekRange').value=String(clock.time);$('seekRange').setAttribute('aria-valuetext',`${clockText(clock.time)}，${phase.label}`);
  const running=playing();
  text('playButton',running?'暫停':clock.time>=DURATION?'重新播放':clock.time>0?'繼續播放':'播放');
  $('playButton').setAttribute('aria-pressed',String(running));
  $('playButton').setAttribute('aria-label',running?'暫停動畫':'播放動畫');
  $('playButton').disabled=$('replayButton').disabled=!ready||loading;
  $('error').hidden=!error;txtError();
  $('retryButton').disabled=loading;
  postState();
}
function txtError(){text('errorCopy',error||'');}
function pause(message='已暫停。'){
  timeline?.pause();render();if(message)status(message);postState(true);return getState();
}
function seek(value){
  const numeric=Number(value);if(!Number.isFinite(numeric))return getState();
  const requested=clamp(numeric,0,DURATION);
  timeline?.pause();timeline?.time(requested,true);clock.time=requested;render();
  status(ready?`已停在 ${clockText(clock.time)}，按播放繼續。`:`已選擇 ${clockText(clock.time)}，照片載入後會停在這裡。`);
  postState(true);return getState();
}
function play(){
  if(!ready||loading||document.hidden||printState)return getState();
  if(clock.time>=DURATION)seek(0);
  timeline.play();render();status('動畫播放中，沒有聲音。');postState(true);return getState();
}
function replay(){seek(0);return play();}
function setExpanded(value){
  if(exportMode)return getState();
  const expanded=Boolean(value),wasExpanded=document.body.classList.contains('is-expanded');
  if(expanded===wasExpanded)return getState();
  pause('畫面大小已調整，播放位置保持不變。');
  if(expanded)expandScroll=scrollY;
  document.body.classList.toggle('is-expanded',expanded);
  $('expandButton').setAttribute('aria-pressed',String(expanded));
  text('expandButton',expanded?'收起放大':'放大觀看');
  if(!expanded)scrollTo(0,expandScroll);
  $('expandButton').focus({preventScroll:true});postState(true);return getState();
}

function svgNode(tag,attributes,parent){const node=document.createElementNS(ns,tag);for(const [key,value]of Object.entries(attributes))node.setAttribute(key,String(value));parent.append(node);return node;}
function buildSourceGeometry(source){
  $('detectionImage').setAttribute('viewBox',`0 0 ${source.image.width} ${source.image.height}`);
  $('detectionCrop').setAttribute('viewBox',source.selected.displayRectXYWH.join(' '));
  $('sourceBoxes').replaceChildren();
  for(const object of source.annotation.objects){
    const [x,y,width,height]=object.displayRectXYWH;
    const selected=object.annotationIndex===source.selected.annotationIndex;
    if(selected)svgNode('rect',{x,y,width,height,class:'source-box-underlay','data-source-box':object.annotationIndex},$('sourceBoxes'));
    svgNode('rect',{x,y,width,height,class:selected?'source-box-selected':'source-box-other','data-source-box':object.annotationIndex},$('sourceBoxes'));
  }
  text('cropTitle',`${source.selected.label}，長尾未完整入框。`);
}
function preload(key,url,signal){
  return new Promise((resolve,reject)=>{
    const image=new Image();let settled=false;
    const timer=setTimeout(()=>finish(new Error(`照片「${key}」載入逾時。`)),20000);
    const abort=()=>finish(new DOMException('Aborted','AbortError'));
    const finish=error=>{if(settled)return;settled=true;clearTimeout(timer);signal.removeEventListener('abort',abort);image.onload=image.onerror=null;error?reject(error):resolve();};
    image.onerror=()=>finish(new Error(`照片「${key}」未能載入。`));
    image.onload=async()=>{
      const expected=ASSETS[key];
      if(image.naturalWidth!==expected.width||image.naturalHeight!==expected.height){finish(new Error(`照片「${key}」尺寸與來源不符。`));return;}
      try{if(typeof image.decode==='function')await image.decode();finish();}catch{finish(new Error(`照片「${key}」未能解碼。`));}
    };
    signal.addEventListener('abort',abort,{once:true});if(signal.aborted){abort();return;}image.src=url;
  });
}
function assignAssets(urls){
  document.querySelectorAll('[data-asset]').forEach(node=>{
    const url=urls[node.dataset.asset];
    if(node.tagName.toLowerCase()==='image')node.setAttribute('href',url);
    else if(node.getAttribute('src')!==url)node.setAttribute('src',url);
  });
}
async function load(){
  if(loading&&loadPromise)return loadPromise;
  const generation=++loadGeneration;attempt++;timeline?.pause();ready=false;loading=true;error=null;
  controller?.abort();controller=new AbortController();const activeController=controller;
  status('正在載入照片與作者標註。可以先選段落，載入後按播放才會開始。');render();postState(true);
  loadPromise=(async()=>{
    const timeout=setTimeout(()=>activeController.abort(),22000);
    try{
      if(!window.gsap)throw new Error('動畫程式未能載入，請重試。');
      const response=await fetch('assets/detection-data.json',{signal:activeController.signal,cache:attempt>1?'reload':'default'});
      if(!response.ok)throw new Error(`作者的照片標註未能載入（${response.status}）。`);
      const source=validateDetection(await response.json());
      const urls=Object.fromEntries(Object.entries(ASSETS).map(([key,asset])=>[key,attempt>1?`${asset.file}?retry=${attempt}`:asset.file]));
      await Promise.all([...Object.entries(urls).map(([key,url])=>preload(key,url,activeController.signal)),document.fonts?.ready||Promise.resolve()]);
      if(generation!==loadGeneration)return;
      data=source;buildSourceGeometry(source);assignAssets(urls);
      if(!timeline){
        timeline=gsap.timeline({paused:true,onUpdate:render,onComplete(){timeline.pause();render();status('動畫結束。可重播或跳回任一段落。');postState(true);}});
        timeline.fromTo(clock,{time:0},{time:DURATION,duration:DURATION,ease:'none',immediateRender:false},0);
        PHASES.forEach(phase=>timeline.addLabel(phase.id,phase.start));
      }
      const requested=clock.time;timeline.time(requested,true).pause();clock.time=requested;
      ready=true;loading=false;render();
      status(`照片與作者標註已載入，停在 ${clockText(clock.time)}。按播放開始，這支動畫沒有聲音。`);
      postState(true);
      if(parent!==window)parent.postMessage({type:'ecology-thermo-ready'},location.origin);
    }catch(cause){
      if(generation!==loadGeneration)return;
      ready=false;loading=false;error=cause?.name==='AbortError'?'照片或作者標註載入太久，請重試。':cause?.message||'照片沒有載入成功。';
      activeController.abort();render();status(`${error} 可以重試，已選時間會保留。`);postState(true);
    }finally{clearTimeout(timeout);if(generation===loadGeneration)loadPromise=null;}
  })();
  return loadPromise;
}
function retry(){if(loading)return loadPromise;pause('正在重新載入照片，仍會停在剛才的位置。');return load();}

$('playButton').addEventListener('click',()=>playing()?pause():play());
$('replayButton').addEventListener('click',replay);
$('seekRange').addEventListener('input',event=>seek(event.target.value));
$('retryButton').addEventListener('click',retry);
document.querySelectorAll('[data-seek]').forEach(button=>button.addEventListener('click',()=>seek(button.dataset.seek)));
$('themeButton').addEventListener('click',()=>setTheme(root.dataset.theme==='dark'?'light':'dark',{persist:true}));
$('expandButton').addEventListener('click',()=>setExpanded(!document.body.classList.contains('is-expanded')));
addEventListener('storage',event=>{if(!params.has('theme')&&(event.key===themeKey||event.key===null))setTheme(event.newValue);});
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&document.body.classList.contains('is-expanded')){event.preventDefault();setExpanded(false);return;}
  if(event.defaultPrevented||event.altKey||event.ctrlKey||event.metaKey||event.target.closest('a,button,input,select,textarea,summary,[contenteditable]'))return;
  if(event.code==='Space'){event.preventDefault();playing()?pause():play();}
  else if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();seek(clock.time+(event.key==='ArrowLeft'?-1:1));}
});
document.addEventListener('visibilitychange',()=>{if(document.hidden)pause('切換分頁後，動畫已暫停。');});
addEventListener('pagehide',()=>pause(''));
if(!exportMode&&'IntersectionObserver'in window)new IntersectionObserver(entries=>{
  if(entries[0]&&!entries[0].isIntersecting&&playing())pause('動畫已離開畫面，播放位置保持不變。');
},{threshold:0}).observe($('stage'));
addEventListener('resize',()=>{pause('視窗大小已改變，播放位置保持不變。');});
reduced.addEventListener('change',()=>pause('已套用新的動態設定，動畫先暫停。也可以直接選段落閱讀。'));
mobile.addEventListener('change',()=>render());
document.querySelectorAll('a[href]').forEach(link=>link.addEventListener('click',()=>pause('查看來源時，動畫會暫停。')));
addEventListener('beforeprint',()=>{
  if(printState)return;
  pause('列印時暫停。');printState={time:clock.time,details:[...document.querySelectorAll('details')].map(node=>[node,node.open])};
  printState.details.forEach(([node])=>node.open=true);
});
addEventListener('afterprint',()=>{
  if(!printState)return;const saved=printState;printState=null;
  saved.details.forEach(([node,open])=>node.open=open);seek(saved.time);status('列印結束，動畫保持暫停與原位置。');
});
addEventListener('message',event=>{
  if(parent===window||event.source!==parent||event.origin!==location.origin||!event.data||event.data.type!=='ecology-control')return;
  const {action,time}=event.data;
  if(action==='pause')pause();else if(action==='play')play();else if(action==='seek')seek(time);else if(action==='retry')retry();else if(action==='state')postState(true);
});
window.EcologyThermoPlayer={seek,getState,play,pause,replay,retry,setTheme,setExpanded};
render();load();
