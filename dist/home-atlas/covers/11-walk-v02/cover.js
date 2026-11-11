(() => {
  'use strict';
  const SVG='http://www.w3.org/2000/svg',section=document.getElementById('topic-11'),host=section.querySelector('.walk-art-host');
  const story=JSON.parse(document.getElementById('walk-story-data').textContent),DURATION=story.duration;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)'),ease=gsap.parseEase('power2.inOut'),out=gsap.parseEase('power2.out'),clamp=x=>Math.max(0,Math.min(1,x));
  const atlasURL='home-atlas/covers/11-walk-v02/assets/11-ranger-gait-v01.display-q90.webp',mode='walk';
  const artwork=host.closest('.extension-art'),playbackButton=host.querySelector('[data-cover-playback]'),imageLink=artwork.querySelector('.walk-image-link');
  let ready=false,started=false,time=reduce.matches?DURATION:0,wantedPlaying=!reduce.matches;
  let userPaused=false;
  let frame=0,lastFrame=0,wasOnTopic=false,camera=null,replayButton=null,actors=[],pathNodes={},results=[];
  document.body.dataset.walkMode=mode;
  function element(tag,attributes={}){const node=document.createElementNS(SVG,tag);for(const [key,value]of Object.entries(attributes))node.setAttribute(key,String(value));return node;}
  function phase(){return time<1?'departure':time<9?'walking':time<13?'inspect':time<15?'return':time<DURATION?'outcomes':'complete';}
  function cameraState(){
    if(time<6){
      const progress=ease(clamp((time-3)/3)),scale=1.55-.55*progress;
      const points=actors.map(actorState);
      const meanX=points.length?points.reduce((sum,p)=>sum+p.x,0)/points.length:510;
      const meanY=points.length?points.reduce((sum,p)=>sum+p.y,0)/points.length-20:780;
      const cx=meanX+(500-meanX)*progress,cy=meanY+(500-meanY)*progress;
      return{scale,x:500-scale*cx,y:500-scale*cy};
    }
    let amount=0;
    if(time>=9.5&&time<10.8)amount=ease(clamp((time-9.5)/1.3));
    else if(time>=10.8&&time<12.6)amount=1;
    else if(time>=12.6&&time<15)amount=1-ease(clamp((time-12.6)/2.4));
    const scale=1+1.6*amount,cx=500+(766-500)*amount,cy=500+(414-500)*amount;
    return{scale,x:500-scale*cx,y:500-scale*cy};
  }
  function active(){const state=window.AtlasHome?.getState();return ready&&!document.hidden&&state?.initialized&&state.activeTopic==='11'&&!state.topicNavigationPlaying;}
  function constructActors(world,group){
    const defs=element('defs');world.prepend(defs);pathNodes={};
    for(const [side,d]of Object.entries(story.paths)){const node=element('path',{d});defs.append(node);pathNodes[side]={node,length:node.getTotalLength()};}
    group.replaceChildren();actors=story.actors.map(spec=>{
      const node=element('g',{'class':'walk-actor','data-actor':spec.id,'data-side':spec.side});
      node.append(element('ellipse',{'class':'walk-contact',cx:0,cy:0,rx:10,ry:3,fill:'#1a211a',opacity:.20}));
      const sprite=element('svg',{'class':'walk-sprite',x:-27,y:-67.5,width:54,height:72,viewBox:'0 0 384 512',overflow:'hidden'});
      const image=element('image',{'class':'walk-pose-image',href:atlasURL,width:2304,height:1536});sprite.append(image);node.append(sprite);group.append(node);
      return{...spec,node,image,poseFrame:-1,state:null};
    });
  }
  function actorState(actor){
    const path=pathNodes[actor.side],left=actor.side==='left';
    const start=left?140-actor.index*30:0,end=path.length-(left?actor.index*30:0);
    const progress=clamp((time-(left?1:1.6))/(left?8:7.4));
    const distance=start+(end-start)*progress,point=path.node.getPointAtLength(distance),walking=progress>0&&progress<1;
    let pose=left?'stand-left':'stand-right',poseFrame=left?12:13;
    if(walking){pose='walk';poseFrame=(left?0:6)+Math.floor((distance-start)/(story.strideWorldUnits/6)+actor.index*1.15)%6;}
    else if(!left&&progress===1&&time>=9.5){pose='inspect';poseFrame=14;}
    const scale=(.74+.26*clamp(point.y/850))*actor.heightScale;
    return{id:actor.id,side:actor.side,x:point.x,y:point.y,distance,travelled:distance-start,frame:poseFrame,walking,pose,scale};
  }
  function render(){
    if(!camera)return;
    const c=cameraState();camera.setAttribute('transform',`matrix(${c.scale} 0 0 ${c.scale} ${c.x} ${c.y})`);
    for(const actor of actors){
      const state=actorState(actor);actor.node.setAttribute('transform',`translate(${state.x} ${state.y}) scale(${state.scale})`);
      if(actor.poseFrame!==state.frame){actor.image.setAttribute('x',String(-(state.frame%6)*384));actor.image.setAttribute('y',String(-Math.floor(state.frame/6)*512));actor.poseFrame=state.frame;actor.node.dataset.gaitFrame=String(state.frame);}
      actor.state=state;
    }
    const opacity=time>=15?out(clamp((time-15)/.5)):0;
    for(const result of results)if(result.style.opacity!==String(opacity))result.style.opacity=String(opacity);
    const current=phase();if(section.dataset.walkPhase!==current)section.dataset.walkPhase=current;
  }
  function stop(){if(frame)cancelAnimationFrame(frame);frame=0;lastFrame=0;}
  function interactionPaused(){return imageLink.contains(document.activeElement);}
  function updateControl(){const hidden=!ready||reduce.matches||time>=DURATION,label=userPaused?'繼續動畫':'暫停動畫';if(playbackButton.hidden!==hidden)playbackButton.hidden=hidden;if(playbackButton.textContent!==label)playbackButton.textContent=label;if(replayButton&&replayButton.hidden!==(!ready||reduce.matches))replayButton.hidden=!ready||reduce.matches;}
  function tick(now){frame=0;if(!active()||!wantedPlaying||interactionPaused()||reduce.matches)return;if(lastFrame)time=Math.min(DURATION,time+(now-lastFrame)/1000);lastFrame=now;render();if(time>=DURATION){wantedPlaying=false;lastFrame=0;updateControl();}else frame=requestAnimationFrame(tick);}
  function sync(){
    const state=window.AtlasHome?.getState(),onTopic=!!state?.initialized&&state.activeTopic==='11';
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
  function getState(){return{mode,ready,time,duration:DURATION,phase:phase(),cameraScale:cameraState().scale,playing:!!frame,active:active(),userPaused,interactionPaused:interactionPaused(),reducedMotion:reduce.matches,actors:actors.map(actor=>({...actor.state})),manyCount:4,fewCount:1,manyOutcome:'not-detected',fewOutcome:'snare',outcomesVisible:time>=15,illustrativeScenarios:true,modelResultsShown:false};}
  async function initialize(){
    started=true;
    const forest=host.querySelector('.walk-forest'),forestURL=forest.dataset.src;
    replayButton=host.querySelector('[data-walk-replay]');replayButton.disabled=true;
    forest.setAttribute('href',forestURL);
    await Promise.all([forestURL,atlasURL].map(async url=>{const image=new Image();image.src=url;await image.decode();}));
    await document.fonts.ready;
    camera=host.querySelector('.walk-camera');results=[...host.querySelectorAll('.walk-result')];
    constructActors(host.querySelector('.walk-world'),host.querySelector('.walk-actors'));
    replayButton.addEventListener('click',replay);
    time=reduce.matches?DURATION:0;wantedPlaying=!reduce.matches&&!userPaused;render();ready=true;
    host.classList.add('is-ready');replayButton.disabled=false;
    dispatchEvent(new Event('resize'));sync();return true;
  }
  playbackButton.addEventListener('click',()=>userPaused?play():pause());
  artwork.addEventListener('focusin',sync);
  artwork.addEventListener('focusout',()=>setTimeout(sync,0));
  document.addEventListener('visibilitychange',sync);document.addEventListener('atlas-hover-reset',()=>{stop();setTimeout(sync,0);});reduce.addEventListener('change',sync);setInterval(sync,150);
  window.PatrolWalkCover={getState,seek,pause,play,replay};
  sync();
})();
