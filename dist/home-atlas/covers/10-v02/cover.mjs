const section=document.getElementById('topic-10'),host=section.querySelector('.future-art-host');
const webgl=host.querySelector('.future-webgl'),poster=host.querySelector('.future-poster');
const button=host.querySelector('[data-future-reveal]'),status=host.querySelector('.future-status');
const reduce=matchMedia('(prefers-reduced-motion: reduce)'),DURATION=3,REVEAL_DURATION=.65;
const clamp=x=>Math.max(0,Math.min(1,x)),out=gsap.parseEase('power2.out'),mode='optical';
let ready=false,time=reduce.matches?DURATION:0,revealTime=0,revealing=false,revealed=false;
let wantedPlaying=!reduce.matches,frame=0,lastFrame=0,scene=null,observer=null;
let initializing=false,sceneModule=null,failed=false,closed=false,needsRender=true,needsResize=false,wasActive=false;

document.body.dataset.futureMode=mode;
section.dataset.futureState='idle';

function phase(){return revealed?'measured':revealing?'measuring':time>=DURATION?'forecast':time<.6?'now':'forecasting';}
function forecastProgress(){return out(clamp((time-.6)/(DURATION-.6)));}
function measurementProgress(){return out(clamp(revealTime/REVEAL_DURATION));}
function eligible(){const state=window.AtlasHome?.getState();return !closed&&!document.hidden&&state?.initialized&&state.activeTopic==='10'&&!state.topicNavigationPlaying;}
function active(){return ready&&eligible();}
function render(){
  if(!ready)return;
  const p=phase();section.dataset.futurePhase=p;
  if(status)status.textContent=p==='now'?'現在的量測':p==='measuring'||p==='measured'?'後來量到的訊號':'20 天後的推估';
  if(button){button.textContent=revealed?'重新看推估':'揭開後續量測';button.disabled=false;button.setAttribute('aria-pressed',String(revealed));}
  needsRender=true;
  if(active()){
    scene.render({theme:document.documentElement.dataset.theme==='dark'?'dark':'light',phase:revealing||revealed?'measured':forecastProgress()>0?'forecast':'now',forecastProgress:forecastProgress(),measurementProgress:measurementProgress(),focusProgress:forecastProgress()});
    needsRender=false;
  }
}
function stop(){if(frame)cancelAnimationFrame(frame);frame=0;lastFrame=0;}
function tick(now){
  frame=0;if(!active()||!wantedPlaying||reduce.matches)return;
  const delta=lastFrame?(now-lastFrame)/1000:0;lastFrame=now;
  if(revealing){revealTime=Math.min(REVEAL_DURATION,revealTime+delta);if(revealTime>=REVEAL_DURATION){revealing=false;revealed=true;wantedPlaying=false;}}
  else{time=Math.min(DURATION,time+delta);if(time>=DURATION)wantedPlaying=false;}
  render();if(wantedPlaying)frame=requestAnimationFrame(tick);else lastFrame=0;
}
function sync(){
  if(closed)return;
  if(reduce.matches){
    if(time!==DURATION){time=DURATION;needsRender=true;}
    if(revealing){revealTime=REVEAL_DURATION;revealing=false;revealed=true;needsRender=true;}
    wantedPlaying=false;stop();
  }
  const isActive=eligible();
  if(!isActive){wasActive=false;stop();return;}
  if(!ready){if(!failed&&!initializing)initialize();return;}
  if(!wasActive||needsResize){scene.resize();needsResize=false;needsRender=true;}
  wasActive=true;
  if(needsRender)render();
  if(wantedPlaying&&!reduce.matches){if(!frame){lastFrame=0;frame=requestAnimationFrame(tick);}}else stop();
}
function pause(){wantedPlaying=false;stop();return getState();}
function seek(seconds){stop();wantedPlaying=false;time=reduce.matches?DURATION:Math.max(0,Math.min(DURATION,Number(seconds)||0));revealing=false;revealed=false;revealTime=0;render();return getState();}
function replay(){stop();time=reduce.matches?DURATION:0;revealTime=0;revealing=false;revealed=false;wantedPlaying=!reduce.matches;render();sync();return getState();}
function play(){if(reduce.matches)return seek(DURATION);if(time>=DURATION&&!revealing)return getState();wantedPlaying=true;sync();return getState();}
function revealMeasurement(){
  if(!ready)return false;
  if(revealed)return replay();
  stop();time=DURATION;revealTime=reduce.matches?REVEAL_DURATION:0;revealing=!reduce.matches;revealed=reduce.matches;wantedPlaying=!reduce.matches;render();sync();return getState();
}
function getState(){return{mode,ready,time,duration:DURATION,phase:phase(),forecastProgress:forecastProgress(),measurementProgress:measurementProgress(),playing:!!frame,active:active(),reducedMotion:reduce.matches,forecastRetained:forecastProgress()===1,comparisonVisible:revealed,conceptualOnly:true,modelResultsShown:false,fallback:failed,scene:scene?.getState()||null};}

async function initialize(){
  initializing=true;section.dataset.futureState='loading';
  try{
    // Importing the scene also loads Three, so wait until this cover is active.
    sceneModule ||= import('./scene.mjs');
    const [{createFutureScene}]=await Promise.all([sceneModule,document.fonts.ready]);
    if(!eligible()){section.dataset.futureState='idle';return;}
    scene=await createFutureScene(webgl);
    if(closed){scene.dispose();scene=null;return;}
    observer=new ResizeObserver(()=>{if(active()){scene.resize();render();}else needsResize=true;});
    observer.observe(webgl);
    ready=true;render();section.dataset.futureState='ready';
    if(poster)poster.hidden=true;
    if(button)button.hidden=false;
    sync();
  }catch{
    stop();failed=true;ready=false;observer?.disconnect();scene?.dispose();scene=null;
    webgl.querySelector('.future-scene-canvas')?.remove();
    section.dataset.futureState='fallback';section.dataset.futurePhase='now';
    if(poster)poster.hidden=false;
    if(button){button.hidden=true;button.disabled=true;}
    if(status)status.textContent='湖泊訊號與推估示意';
  }finally{initializing=false;}
}

button?.addEventListener('click',revealMeasurement);
document.addEventListener('visibilitychange',sync);
reduce.addEventListener('change',sync);
window.addEventListener('ecologythemechange',()=>{needsRender=true;if(active())render();});
window.addEventListener('pageshow',sync);
const polling=setInterval(sync,150);
window.OpticalCover={getState,seek,pause,play,replay,revealMeasurement};
window.addEventListener('pagehide',event=>{stop();if(!event.persisted){closed=true;clearInterval(polling);observer?.disconnect();scene?.dispose();}},{once:true});
sync();
