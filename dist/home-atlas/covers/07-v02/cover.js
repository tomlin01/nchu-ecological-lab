(() => {
  'use strict';
  const section=document.getElementById('topic-07'),host=section.querySelector('.network-art-host');
  const data=JSON.parse(document.getElementById('network-cover-data').textContent),reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const layoutData=JSON.parse(document.getElementById('network-layout-data').textContent);
  const edges=data.reveal_order.map(id=>data.edges.find(edge=>edge.id===id));
  const DURATION=8,starts=edges.map((_,i)=>i<3?.25+i*.7:3+(i-3)*.22),out=gsap.parseEase('power2.out');
  const clamp=x=>Math.min(1,Math.max(0,x));
  const mode='network';
  const artwork=host.closest('.extension-art'),playbackButton=artwork.querySelector('[data-cover-playback]'),hover=matchMedia('(hover: hover)'),imageLink=artwork.querySelector('.extension-image-link');
  let ready=false,started=false,time=reduce.matches?DURATION:0;
  let userPaused=false;
  let wantedPlaying=!reduce.matches,frame=0,lastFrame=0,wasOnTopic=false,scene=null,board=null,nodes=[],paths=[],lengths=[],observer=null,currentLayout='desktop';
  function phase(){return time<starts[0]?'appear':time<3?'shared-visitor':time<6.8?'weaving':time<DURATION?'network':'complete';}
  function active(){const atlas=window.AtlasHome?.getState();return ready&&!document.hidden&&atlas?.initialized&&atlas.activeTopic==='07'&&!atlas.topicNavigationPlaying;}
  function edgeProgress(){return starts.map(start=>out(clamp((time-start)/.7)));}
  function render(){
    if(!scene)return;
    const progress=edgeProgress();
    paths.forEach((path,i)=>{const p=progress[i];path.style.strokeDashoffset=String(lengths[i]*(1-p));path.style.opacity=p>0?'1':'0';path.style.stroke=p>0&&p<1?'var(--network-active)':'var(--network-line)';});
    section.dataset.networkPhase=phase();
  }
  function resize(){
    if(!scene)return;
    currentLayout=innerWidth<=700&&innerHeight>=innerWidth?'mobile':'desktop';
    const layout=layoutData[currentLayout],[,,w,h]=layout.viewBox,r=scene.getBoundingClientRect();
    board.style.aspectRatio=`${w} / ${h}`;board.style.width=Math.min(r.width,r.height*w/h)+'px';
    scene.querySelector('.network-links').setAttribute('viewBox',layout.viewBox.join(' '));
    nodes.forEach(node=>{const position=layout.nodes[node.dataset.node];node.style.left=position.x/w*100+'%';node.style.top=position.y/h*100+'%';node.style.width=position.width/w*100+'%';});
    paths.forEach(path=>path.setAttribute('d',layout.paths[path.dataset.edge]));
    lengths=paths.map(path=>path.getTotalLength());paths.forEach((path,i)=>path.style.strokeDasharray=String(lengths[i]));
    render();
  }
  function stop(){if(frame)cancelAnimationFrame(frame);frame=0;lastFrame=0;}
  function interactionPaused(){return(hover.matches&&imageLink.matches(':hover'))||imageLink.contains(document.activeElement);}
  function updateControl(){const hidden=!ready||reduce.matches,label=time>=DURATION?'重看動畫':userPaused?'繼續動畫':'暫停動畫';if(playbackButton.hidden!==hidden)playbackButton.hidden=hidden;if(playbackButton.textContent!==label)playbackButton.textContent=label;}
  function tick(now){frame=0;if(!active()||!wantedPlaying||interactionPaused()||reduce.matches)return;if(lastFrame)time=Math.min(DURATION,time+(now-lastFrame)/1000);lastFrame=now;render();if(time>=DURATION){wantedPlaying=false;lastFrame=0;updateControl();}else frame=requestAnimationFrame(tick);}
  function sync(){
    const state=window.AtlasHome?.getState(),onTopic=!!state?.initialized&&state.activeTopic==='07';
    if(onTopic&&!wasOnTopic&&time>=DURATION&&!userPaused&&!reduce.matches){time=0;wantedPlaying=true;render();}
    wasOnTopic=onTopic;
    if(reduce.matches&&time!==DURATION){time=DURATION;wantedPlaying=false;render();}
    if(onTopic&&!started&&!document.hidden&&!state.topicNavigationPlaying)initialize().catch(console.error);
    const isActive=active();
    if(isActive&&wantedPlaying&&!interactionPaused()&&!reduce.matches&&time<DURATION){if(!frame){lastFrame=0;frame=requestAnimationFrame(tick);}}else stop();
    updateControl();
  }
  function pause(){userPaused=true;wantedPlaying=false;stop();updateControl();return getState();}
  function seek(seconds){userPaused=true;wantedPlaying=false;stop();time=reduce.matches?DURATION:Math.max(0,Math.min(DURATION,Number(seconds)||0));render();updateControl();return getState();}
  function replay(){userPaused=false;stop();time=reduce.matches?DURATION:0;wantedPlaying=!reduce.matches;render();sync();return getState();}
  function play(){if(reduce.matches)return seek(DURATION);userPaused=false;if(time>=DURATION)time=0;wantedPlaying=true;render();sync();return getState();}
  function getState(){const progress=edgeProgress();return{mode,ready,time,duration:DURATION,phase:phase(),playing:!!frame,active:active(),userPaused,interactionPaused:interactionPaused(),reducedMotion:reduce.matches,assetCount:nodes.length,edgeCount:paths.length,drawnEdges:edges.filter((_,i)=>progress[i]>=1).map(edge=>edge.id),edgeProgress:progress,layout:currentLayout,cycleRank:data.verification.cycle_rank,nodeDegrees:data.verification.node_degrees,crossingCount:layoutData[currentLayout].crossingCount};}
  async function initialize(){
    started=true;
    scene=host.querySelector('.network-scene');board=scene.querySelector('.network-board');nodes=[...scene.querySelectorAll('.network-node')];paths=[...scene.querySelectorAll('.network-link')];
    // Image/label nodes stay visible while loading or paused at time zero.
    nodes.forEach(node=>{node.style.opacity='1';node.style.transform='translate(-50%,-50%) scale(1)';});
    resize();observer=new ResizeObserver(resize);observer.observe(scene);
    addEventListener('resize',resize);document.fonts.addEventListener('loadingdone',resize);
    const images=[...host.querySelectorAll('img')];images.forEach(image=>{image.loading='eager';});
    await Promise.all(images.map(image=>image.decode()));
    ready=true;
    dispatchEvent(new Event('resize'));sync();return true;
  }
  playbackButton.addEventListener('click',()=>time>=DURATION?replay():userPaused?play():pause());
  for(const event of ['pointerenter','pointerleave','focusin'])artwork.addEventListener(event,sync);
  artwork.addEventListener('focusout',()=>setTimeout(sync,0));
  document.addEventListener('visibilitychange',sync);document.addEventListener('atlas-hover-reset',()=>{stop();setTimeout(sync,0);});reduce.addEventListener('change',sync);
  setInterval(sync,150);
  window.NetworkCover={getState,seek,play,pause,replay};
  sync();
})();
