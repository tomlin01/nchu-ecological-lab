/* Hover guides own their SVG copies; app.js retains the original selected-case cues. */
window.createAtlasTraitHover=()=>{
  const overlays=new Map(),effects=new Map();
  document.querySelectorAll('#topic-04 .asset-button').forEach(button=>{
    const overlay=document.createElement('span');overlay.className='trait-hover-overlay';overlay.setAttribute('aria-hidden','true');
    let svg=button.querySelector('.trait-cue')?.cloneNode(true);
    if(!svg){
      svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 1536 1024');
      svg.innerHTML='<ellipse cx="370" cy="510" rx="330" ry="310"/><ellipse cx="800" cy="360" rx="245" ry="295"/><ellipse cx="1275" cy="285" rx="245" ry="245"/>';
      overlay.classList.add('trait-hover-clusters');
    }
    svg.setAttribute('class','trait-hover-lines');svg.removeAttribute('style');
    svg.querySelectorAll('path,ellipse').forEach(shape=>{shape.removeAttribute('class');shape.removeAttribute('style');});
    overlay.append(svg);button.append(overlay);overlays.set(button,overlay);
  });
  function stop(button){effects.get(button)?.kill();effects.delete(button);}
  function hide(group,immediate=false){
    if(group.topic!=='04')return;
    for(const button of group.buttons){
      stop(button);const overlay=overlays.get(button);
      if(immediate)overlay.style.transition='none';
      button.classList.remove('is-trait-hover-visible');
      if(immediate)button.classList.remove('is-trait-hover-held');
    }
  }
  function settle(group){
    if(group.topic==='04')group.buttons.forEach(button=>button.classList.remove('is-trait-hover-held','is-trait-hover-visible'));
  }
  function reset(){hide({topic:'04',buttons:[...overlays.keys()]},true);}
  function show(group){
    if(group.topic!=='04')return;
    group.buttons.forEach(button=>{
      stop(button);const overlay=overlays.get(button),scale=Number(gsap.getProperty(button,'scale'))||1;
      overlay.style.removeProperty('transition');
      button.classList.add('is-trait-hover-held','is-trait-hover-visible');
      const shapes=[...overlay.querySelectorAll('path,ellipse')];
      shapes.forEach(shape=>{
        const length=shape.getTotalLength();
        gsap.set(shape,{strokeWidth:1.5/scale,strokeDasharray:length,strokeDashoffset:length});
      });
      effects.set(button,gsap.to(shapes,{strokeDashoffset:0,duration:.40,stagger:.045,ease:'power2.out',overwrite:true}));
    });
  }
  return {targets:button=>overlays.has(button)?[overlays.get(button)]:[],show,hide,settle,reset};
};
