/* Button geometry belongs to app.js; only the artwork inside it moves here. */
window.createHabitatCoverMotion = ({section,reduced,getState}) => {
  const buttons=[...section.querySelectorAll('.asset-button')];
  const wrappers=buttons.map(button=>button.querySelector('.habitat-vignette')).filter(Boolean);
  const finePointer=matchMedia('(hover: hover) and (pointer: fine)');
  const effects=new Map();
  let entrance=null,played=false,dismissed=false,selectedCase=null;

  function reset(targets=wrappers){
    targets.forEach(wrapper=>{effects.get(wrapper)?.kill();effects.delete(wrapper);gsap.killTweensOf(wrapper);wrapper.style.willChange='';});
    gsap.set(targets,{clearProps:'transform'});
  }
  function suspend(){
    const moving=Boolean(entrance)||effects.size>0;
    if(entrance)played=true;
    entrance?.kill();entrance=null;if(moving)reset();
  }
  function available(){
    const state=getState();
    return state.initialized&&!state.printing&&!state.turning&&state.active&&!document.hidden;
  }
  function readyForEntrance(){
    if(!available()||!wrappers.length||!buttons.every(button=>{const image=button.querySelector('img');return image?.complete&&image.naturalWidth>0;}))return false;
    if(document.fonts&&document.fonts.status!=='loaded')return false;
    const gallery=section.querySelector('.asset-gallery').getBoundingClientRect();
    const header=document.querySelector('.site-header').getBoundingClientRect().bottom;
    const visible=Math.max(0,Math.min(gallery.bottom,innerHeight)-Math.max(gallery.top,header));
    return section.getBoundingClientRect().top<=innerHeight*.2&&gallery.height>0&&visible>=Math.min(gallery.height,innerHeight-header)*.75;
  }
  function finishEffect(wrapper,animation){
    if(effects.get(wrapper)!==animation)return;
    effects.delete(wrapper);wrapper.style.willChange='';gsap.set(wrapper,{clearProps:'transform'});
  }
  function selectMotion(){
    if(reduced.matches||!available())return;
    const wrapper=buttons.find(button=>button.dataset.case===selectedCase)?.querySelector('.habitat-vignette');
    if(!wrapper)return;
    wrapper.style.willChange='transform';
    const animation=gsap.timeline({onComplete:()=>finishEffect(wrapper,animation)});
    effects.set(wrapper,animation);
    animation.fromTo(wrapper,{scale:.985,y:2},{scale:1.006,y:0,duration:.16,ease:'power2.out',overwrite:true})
      .to(wrapper,{scale:1,duration:.14,ease:'power1.out'});
  }
  function playEntrance(){
    if(!readyForEntrance()||selectedCase||entrance)return false;
    if(reduced.matches){played=true;return false;}
    reset();wrappers.forEach(wrapper=>{wrapper.style.willChange='transform';});
    const animation=gsap.timeline({onComplete:()=>{
      if(entrance!==animation)return;
      entrance=null;played=true;reset();
    }});
    entrance=animation;
    wrappers.forEach((wrapper,index)=>animation.fromTo(wrapper,
      {y:18,rotation:index%2?2.5:-2.5,scale:.985},
      {y:0,rotation:0,scale:1,duration:.55,ease:'power2.out',overwrite:true},index*.055));
    return true;
  }
  function sync({animate=true}={}){
    const state=getState(),next=state.selectedCase||null,changed=next!==selectedCase;
    if(changed){suspend();selectedCase=next;if(next)dismissed=true;}
    if(!available()){suspend();return;}
    if(reduced.matches){suspend();played=true;return;}
    if(changed&&selectedCase){if(animate)selectMotion();return;}
    if(!selectedCase&&!played&&!dismissed&&!entrance)playEntrance();
  }
  function replay(){
    suspend();selectedCase=getState().selectedCase||null;
    if(selectedCase)return false;
    played=false;dismissed=false;return playEntrance();
  }
  function skipEntrance(){suspend();played=true;}
  function nudge(button){
    if(reduced.matches||!available()||entrance||button.inert)return;
    const wrapper=button.querySelector('.habitat-vignette');if(!wrapper||effects.has(wrapper))return;
    reset([wrapper]);wrapper.style.willChange='transform';
    const animation=gsap.timeline({onComplete:()=>finishEffect(wrapper,animation)});
    effects.set(wrapper,animation);
    animation.to(wrapper,{rotation:1.5,duration:.09,ease:'power1.out'})
      .to(wrapper,{rotation:-.65,duration:.09,ease:'power1.inOut'})
      .to(wrapper,{rotation:0,duration:.12,ease:'power2.out'});
  }
  section.querySelectorAll('.asset-button,.case-choice').forEach(control=>{
    const artwork=buttons.find(button=>button.dataset.case===control.dataset.case);
    if(!artwork)return;
    control.addEventListener('pointerenter',event=>{if(event.pointerType!=='touch'&&finePointer.matches)nudge(artwork);});
  });
  addEventListener('ecologythemechange',suspend);
  reduced.addEventListener('change',()=>{suspend();if(reduced.matches)played=true;sync();});
  return {sync,suspend,replay,skipEntrance,getState:()=>({entrancePlayed:played,entrancePlaying:Boolean(entrance),dismissed,
    selectedCase,effectCount:effects.size,spatialMotionEnabled:!reduced.matches})};
};
