(() => {
  'use strict';
  const first=document.querySelector('[data-topic-scene="topic-01"]');
  const second=document.getElementById('topic-02');
  if(!first||!second||!window.gsap||!window.ScrollTrigger)return;
  gsap.registerPlugin(ScrollTrigger);
  let mm=gsap.matchMedia();
  let printing=false;
  let transition=null;
  const toolbar=()=>parseFloat(getComputedStyle(document.body).paddingTop)||0;
  const originalInert=[first,first.querySelector('.case-navigation'),first.querySelector('.topic-continuation')].map(node=>[node,node.inert]);
  function restore(){
    document.documentElement.classList.remove('home-motion');
    first.removeAttribute('aria-hidden');
    originalInert.forEach(([node,value])=>node.inert=value);
    transition=null;
  }
  function setup(){mm.add('(min-width: 921px) and (prefers-reduced-motion: no-preference)',()=>{
    document.documentElement.classList.add('home-motion');
    const tl=gsap.timeline({scrollTrigger:{trigger:second,start:'top bottom',end:()=>`top ${toolbar()}px`,scrub:true,invalidateOnRefresh:true,onUpdate:self=>{
      const covered=self.progress>=.999;
      first.inert=covered;
      if(covered)first.setAttribute('aria-hidden','true');else first.removeAttribute('aria-hidden');
      const nextTop=second.getBoundingClientRect().top;
      for(const [,node] of [['nav',first.querySelector('.case-navigation')],['footer',first.querySelector('.topic-continuation')]])node.inert=covered||node.getBoundingClientRect().top>=nextTop;
    }}});
    tl.fromTo(first.querySelector('.hero-art'),{scale:1,y:0,opacity:1},{scale:.92,y:-28,opacity:.28,duration:1,ease:'none'},0);
    tl.fromTo(first.querySelector('.hero-copy'),{y:0,opacity:1},{y:-22,opacity:.2,duration:1,ease:'none'},0);
    const origins=[[-45,95],[-115,160],[50,-95],[-125,25]];
    second.querySelectorAll('.plate-motion').forEach((plate,i)=>tl.fromTo(plate,{x:origins[i][0],y:origins[i][1],scale:.86,opacity:0},{x:0,y:0,scale:1,opacity:1,duration:.5,ease:'power1.out'},.12+i*.08));
    tl.fromTo(second.querySelector('.hero-copy'),{y:24,opacity:.2},{y:0,opacity:1,duration:.6,ease:'none'},.22);
    tl.fromTo(second.querySelectorAll('.case-link'),{y:20,opacity:.2},{y:0,opacity:1,duration:.24,stagger:.055,ease:'none'},.55);
    transition=tl.scrollTrigger;
    return restore;
  });}
  setup();
  function refresh(){ScrollTrigger.refresh();ScrollTrigger.update();}
  document.fonts?.ready.then(refresh);
  Promise.all([...document.querySelectorAll('#home-story img')].map(img=>img.complete?Promise.resolve():new Promise(resolve=>{img.addEventListener('load',resolve,{once:true});img.addEventListener('error',resolve,{once:true});}))).then(refresh);
  let resizeFrame=0;
  addEventListener('resize',()=>{cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(refresh);});
  addEventListener('beforeprint',()=>{if(printing)return;printing=true;mm.kill();restore();});
  addEventListener('afterprint',()=>{if(!printing)return;printing=false;mm=gsap.matchMedia();setup();requestAnimationFrame(refresh);});
  window.HomeExhibition={getState:()=>({enhanced:!!transition,progress:transition?.progress||0,firstInert:first.inert,sourceImagesRewritten:false,reducedMotion:matchMedia('(prefers-reduced-motion: reduce)').matches})};
})();
