(() => {
  'use strict';
  const section=document.getElementById('topic-08'),host=section.querySelector('.trend-art-host');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)'),DURATION=8,out=gsap.parseEase('power2.out');
  const clamp=x=>Math.max(0,Math.min(1,x));
  const mode='landscape';
  let ready=false,started=false,time=reduce.matches?DURATION:0;
  let wantedPlaying=!reduce.matches,frame=0,lastFrame=0,wasOnTopic=false,night=null,afterCaption=null;
  function phase(){return time<1.8?'day':time<4?'night-arrives':time<DURATION?'comparison':'complete';}
  function active(){const state=window.AtlasHome?.getState();return ready&&!document.hidden&&state?.initialized&&state.activeTopic==='08'&&!state.topicNavigationPlaying;}
  function nightProgress(){return out(clamp((time-1.8)/2.2));}
  function render(){if(!night)return;const progress=nightProgress();night.style.opacity=String(progress);afterCaption.style.opacity=String(progress);section.dataset.trendPhase=phase();}
  function stop(){if(frame)cancelAnimationFrame(frame);frame=0;lastFrame=0;}
  function tick(now){frame=0;if(!active()||!wantedPlaying||reduce.matches)return;if(lastFrame)time=Math.min(DURATION,time+(now-lastFrame)/1000);lastFrame=now;render();if(time>=DURATION){wantedPlaying=false;lastFrame=0;}else frame=requestAnimationFrame(tick);}
  function sync(){
    const state=window.AtlasHome?.getState(),onTopic=!!state?.initialized&&state.activeTopic==='08';
    if(onTopic&&!wasOnTopic&&time>=DURATION&&!reduce.matches){time=0;wantedPlaying=true;render();}
    wasOnTopic=onTopic;
    if(reduce.matches&&time!==DURATION){time=DURATION;wantedPlaying=false;render();}
    if(onTopic&&!started&&!document.hidden&&!state.topicNavigationPlaying)initialize().catch(console.error);
    const isActive=active();
    if(isActive&&wantedPlaying&&!reduce.matches&&time<DURATION){if(!frame){lastFrame=0;frame=requestAnimationFrame(tick);}}else stop();
  }
  function pause(){wantedPlaying=false;stop();return getState();}
  function seek(seconds){wantedPlaying=false;stop();time=reduce.matches?DURATION:Math.max(0,Math.min(DURATION,Number(seconds)||0));render();return getState();}
  function replay(){stop();time=reduce.matches?DURATION:0;wantedPlaying=!reduce.matches;render();sync();return getState();}
  function play(){if(reduce.matches)return seek(DURATION);if(time>=DURATION)time=0;wantedPlaying=true;render();sync();return getState();}
  function getState(){const day=host.querySelector('[data-period="before"] .flock-day');return{mode,ready,time,duration:DURATION,phase:phase(),playing:!!frame,active:active(),reducedMotion:reduce.matches,nightProgress:nightProgress(),dayReferenceVisible:!!day&&day.complete&&Number(getComputedStyle(day).opacity)>.99,frames:host.querySelectorAll('.flock-frame').length,dayNightIsTimeMetaphor:true,flockAmountIsConceptual:true};}
  async function initialize(){
    started=true;
    night=host.querySelector('.flock-night');afterCaption=host.querySelector('[data-period="after"] .flock-period-caption');render();
    const images=[...host.querySelectorAll('img')];images.forEach(image=>{image.loading='eager';});
    await Promise.all(images.map(image=>image.decode()));await document.fonts.ready;
    ready=true;
    dispatchEvent(new Event('resize'));sync();return true;
  }
  document.addEventListener('visibilitychange',sync);document.addEventListener('atlas-hover-reset',()=>{stop();setTimeout(sync,0);});reduce.addEventListener('change',sync);
  setInterval(sync,150);
  window.TrendCover={getState,seek,play,pause,replay};
  sync();
})();
