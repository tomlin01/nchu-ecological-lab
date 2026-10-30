/* Printed field marks and optical corners are interface cues, with no research output. */
window.createAtlasTopic12Hover=()=>{
  const frameMarkup='<span class="focus-corner corner-tl"></span><span class="focus-corner corner-tr"></span><span class="focus-corner corner-bl"></span><span class="focus-corner corner-br"></span><span class="focus-tick tick-top"></span><span class="focus-tick tick-bottom"></span>';
  const galleries=['01','02'].map(id=>document.querySelector(`[data-gallery="${id}"]`));
  const layers=galleries.map((gallery,index)=>{
    const layer=document.createElement('div');
    layer.className=`hover-accent ${index?'hover-focus':'hover-field'}`;
    layer.setAttribute('aria-hidden','true');
    layer.innerHTML=index?'':
      '<svg viewBox="0 0 480 320" preserveAspectRatio="none"><g class="field-trace"><path d="M30 203 C62 120 146 113 224 138 S403 106 447 190 C465 239 355 281 243 266 S48 278 30 203Z"/></g><g class="field-trace"><path d="M58 202 C91 148 156 143 229 158 S374 140 411 196 C431 227 344 254 243 245 S75 254 58 202Z"/></g><g class="field-trace"><path d="M88 202 C117 172 169 168 232 178 S347 168 378 200 C389 218 326 234 243 225 S104 232 88 202Z"/></g><g class="field-marker"><path d="M65 98h14m-7-7v14 M394 118h14m-7-7v14 M410 265h12m-6-6v12"/></g></svg>';
    gallery.prepend(layer);return layer;
  });
  const peers=[...galleries[1].querySelectorAll('.asset-button img')];
  let active=null,entrance=null,peerTween=null;
  function focus(group,immediate=false){
    peerTween?.kill();peerTween=null;
    if(immediate){gsap.set(peers,{clearProps:'opacity'});return;}
    peerTween=gsap.to(peers,{opacity:(_,image)=>!group||group.buttons.includes(image.closest('.asset-button'))?1:.52,
      duration:.16,ease:'power2.out',overwrite:'auto',onComplete:()=>{if(!group)gsap.set(peers,{clearProps:'opacity'});}});
  }
  function hide(immediate=false){
    entrance?.kill();entrance=null;active=null;
    if(immediate){gsap.killTweensOf(layers);gsap.set(layers,{autoAlpha:0});}
    else gsap.to(layers,{autoAlpha:0,duration:.12,ease:'power2.out',overwrite:true});
    focus(null,immediate);
  }
  function show(group){
    if(group.topic!=='01'&&group.topic!=='02')return;
    const index=group.topic==='01'?0:1,layer=layers[index],gallery=group.gallery.getBoundingClientRect(),bounds=group.bounds;
    active=group;entrance?.kill();gsap.killTweensOf(layer);
    const pad=index?12:Math.max(20,bounds.width*.13);
    Object.assign(layer.style,{left:`${bounds.left-gallery.left-pad}px`,top:`${bounds.top-gallery.top-pad}px`,
      width:`${bounds.width+2*pad}px`,height:`${bounds.height+2*pad}px`});
    gsap.set(layer,{x:0,y:0,autoAlpha:1});
    entrance=gsap.timeline();
    if(index){
      layer.replaceChildren(...group.buttons.map(button=>{
        const rect=button.getBoundingClientRect(),frame=document.createElement('div');
        frame.className='focus-member';frame.dataset.assetId=button.dataset.assetId;frame.innerHTML=frameMarkup;
        Object.assign(frame.style,{left:`${rect.left-bounds.left}px`,top:`${rect.top-bounds.top}px`,
          width:`${rect.width+2*pad}px`,height:`${rect.height+2*pad}px`});
        return frame;
      }));
      focus(group);
      const corners=layer.querySelectorAll('.focus-corner');
      gsap.set(corners,{opacity:0,x:i=>i%2?9:-9,y:i=>i%4<2?-9:9});
      entrance.to(corners,{x:0,y:0,opacity:.8,duration:.22,stagger:i=>(i%4)*.025,ease:'power2.out'})
        .fromTo(layer.querySelectorAll('.focus-tick'),{opacity:0,scaleX:.3},{opacity:.45,scaleX:1,duration:.18,ease:'power2.out'},.12);
    }else{
      const traces=layer.querySelectorAll('.field-trace');
      gsap.set(traces,{transformOrigin:'50% 66%',opacity:0,scale:.86,y:10});
      entrance.to(traces,{opacity:.6,scale:1,y:0,duration:.46,stagger:.045,ease:'power2.out'})
        .fromTo(layer.querySelector('.field-marker'),{opacity:0},{opacity:.55,duration:.22,ease:'power2.out'},.14);
    }
  }
  function move(group,nx,ny){
    if(active!==group)return;
    const layer=layers[group.topic==='01'?0:1];
    gsap.to(layer,{x:nx*3,y:ny*2,duration:.20,ease:'power2.out',overwrite:'auto'});
  }
  return {show,move,hide};
};
