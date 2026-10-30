(() => {
  'use strict';
  const finePointer=matchMedia('(hover: hover) and (pointer: fine)');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const groups=new Map(),byButton=new Map(),touched=new Set();
  const accents=window.createAtlasTopic12Hover();
  const traits=window.createAtlasTraitHover();
  let active=null;
  document.querySelectorAll('.topic .asset-button').forEach(button=>{
    const topic=button.closest('.topic').dataset.topic,key=`${topic}:${button.dataset.case}`;
    if(!groups.has(key))groups.set(key,{topic,caseId:button.dataset.case,gallery:button.closest('.asset-gallery'),buttons:[]});
    const group=groups.get(key);group.buttons.push(button);byButton.set(button,group);
  });
  function reset(){
    accents.hide(true);
    traits.reset();
    active=null;
    if(touched.size){gsap.killTweensOf([...touched]);gsap.set([...touched],{clearProps:'transform'});touched.clear();}
  }
  function available(group,event){
    const state=window.AtlasHome?.getState();
    return event.pointerType!=='touch'&&finePointer.matches&&!reduced.matches&&state?.initialized&&
      state.activeTopic===group.topic&&!state.pageTurn?.active&&!state.traitEntrancePlaying&&
      !state.habitatMotion?.entrancePlaying&&!document.hidden&&
      !document.documentElement.classList.contains('is-printing')&&
      group.buttons.every(button=>!button.disabled&&!button.inert&&!gsap.isTweening(button));
  }
  function release(){
    const group=active;if(!group)return;active=null;
    accents.hide();
    traits.hide(group);
    const targets=group.items.map(item=>item.target);
    gsap.to(targets,{x:0,y:0,scale:1,rotationX:0,rotationY:0,duration:.18,ease:'power2.out',overwrite:true,
      onComplete:()=>{if(active===group)return;gsap.set(targets,{clearProps:'transform'});targets.forEach(target=>touched.delete(target));traits.settle(group);}});
  }
  function inside(group,event){
    const b=group.bounds;
    return event.clientX>=b.left&&event.clientX<=b.right&&event.clientY>=b.top&&event.clientY<=b.bottom;
  }
  function pose(group,event){
    const b=group.bounds,nx=gsap.utils.clamp(-1,1,(event.clientX-b.left)/b.width*2-1);
    const ny=gsap.utils.clamp(-1,1,(event.clientY-b.top)/b.height*2-1);
    const enhanced=['01','02','04'].includes(group.topic),angle=enhanced?2.8:2;
    group.pose={rotationX:-ny*angle,rotationY:nx*angle,scale:enhanced?1.035:1.02};
    accents.move(group,nx,ny);
    gsap.to(group.items.map(item=>item.target),{
      ...group.pose,x:index=>group.items[index].liftX,y:index=>group.items[index].liftY,
      transformPerspective:index=>800/group.items[index].scale,
      duration:.20,ease:'power2.out',overwrite:true
    });
  }
  function enter(group,event){
    if(!available(group,event))return;
    if(active!==group){
      release();
      const rects=group.buttons.map(button=>button.getBoundingClientRect());
      const left=Math.min(...rects.map(rect=>rect.left)),right=Math.max(...rects.map(rect=>rect.right));
      const top=Math.min(...rects.map(rect=>rect.top)),bottom=Math.max(...rects.map(rect=>rect.bottom));
      group.bounds={left,right,top,bottom,width:right-left,height:bottom-top};
      group.items=group.buttons.flatMap(button=>{
        const scale=Number(gsap.getProperty(button,'scale'))||1;
        const angle=Number(gsap.getProperty(button,'rotation'))*Math.PI/180;
        const lift=['01','02','04'].includes(group.topic)?6:4;
        return [button.querySelector('img'),...traits.targets(button)].map(target=>{
          touched.add(target);return {target,scale,liftX:-lift*Math.sin(angle)/scale,liftY:-lift*Math.cos(angle)/scale};
        });
      });
      active=group;
      accents.show(group);
      traits.show(group);
    }
    pose(group,event);
  }
  for(const [button,group] of byButton)button.addEventListener('pointerenter',event=>enter(group,event));
  for(const gallery of new Set([...groups.values()].map(group=>group.gallery))){
    gallery.addEventListener('pointermove',event=>{
      const group=byButton.get(event.target.closest('.asset-button'));
      if(group&&available(group,event)){enter(group,event);return;}
      if(active?.gallery===gallery){if(inside(active,event)&&available(active,event))pose(active,event);else release();}
    });
    gallery.addEventListener('pointerleave',()=>{if(active?.gallery===gallery)release();});
  }
  for(const name of ['atlas-hover-reset','keydown'])document.addEventListener(name,reset);
  for(const name of ['ecologythemechange','beforeprint','pagehide','blur','resize'])addEventListener(name,reset);
  reduced.addEventListener('change',reset);finePointer.addEventListener('change',reset);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)reset();});
  window.AtlasGroupHover={getState:()=>({activeTopic:active?.topic||null,activeCase:active?.caseId||null,
    memberIds:active?.buttons.map(button=>button.dataset.assetId)||[],pose:active?{...active.pose}:null})};
})();
