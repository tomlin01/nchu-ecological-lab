/* Independent 2→3 transition. The existing HomeExhibition timeline is not modified. */
(() => {
  'use strict';
  const root=document.documentElement;
  const second=document.querySelector('#home-story > #topic-02[data-topic-scene="topic-02"]');
  const third=document.querySelector('#home-story > #topic-03[data-topic-scene="topic-03"]');
  if(!second||!third||!window.gsap||!window.ScrollTrigger)return;
  const gsap=window.gsap,ScrollTrigger=window.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);
  const secondNav=second.querySelector('.case-navigation');
  const secondFooter=second.querySelector('.identification-footer');
  const thirdPanels=[...third.querySelectorAll('.individual-plate-motion')];
  const thirdCopy=third.querySelector('.individuals-copy');
  const thirdNav=third.querySelector('.case-navigation');
  const savedAccess=[second,secondNav,secondFooter].filter(Boolean).map(node=>({
    node,inert:node.inert,ariaHidden:node.getAttribute('aria-hidden')
  }));
  const QUERY='screen and (min-width: 921px) and (prefers-reduced-motion: no-preference)';
  const CLASS='home-topic-three-motion';
  const MEASURE='home-topic-three-measuring';
  let mm=gsap.matchMedia(),transition=null,enabled=false,printing=false;
  let refreshTimer=0,refreshFrame=0,refreshCount=0;
  let pendingAnchor=['#topic-02','#topic-03'].includes(location.hash);

  const toolbar=()=>parseFloat(getComputedStyle(document.body).paddingTop)||0;
  function setAccess(entry,hidden){
    entry.node.inert=entry.inert||hidden;
    if(hidden)entry.node.setAttribute('aria-hidden','true');
    else if(entry.ariaHidden===null)entry.node.removeAttribute('aria-hidden');
    else entry.node.setAttribute('aria-hidden',entry.ariaHidden);
  }
  function syncAccess(trigger=transition){
    if(!enabled||printing)return;
    const top=third.getBoundingClientRect().top;
    const covered=(trigger?.progress||0)>=.999&&top<=toolbar()+1;
    for(const entry of savedAccess){
      if(entry.node===second)setAccess(entry,covered);
      else{
        const bounds=entry.node.getBoundingClientRect();
        // The third scene paints over the lower part of the second scene first.
        const partlyCovered=top<innerHeight&&bounds.bottom>top+1;
        setAccess(entry,covered||partlyCovered);
      }
    }
  }
  function restore(){
    enabled=false;transition=null;
    root.classList.remove(CLASS,MEASURE);
    savedAccess.forEach(entry=>setAccess(entry,false));
  }

  // Sticky changes only painting, but getBoundingClientRect reports that painted
  // position. Release our sticky rule while all ScrollTriggers measure positions.
  function beginMeasurement(){if(enabled&&!printing)root.classList.add(MEASURE);}
  function finishMeasurement(){root.classList.remove(MEASURE);syncAccess();}
  ScrollTrigger.addEventListener('refreshInit',beginMeasurement);
  ScrollTrigger.addEventListener('refresh',finishMeasurement);

  function alignKnownAnchor(){
    if(!pendingAnchor)return;
    pendingAnchor=false;
    const target=location.hash==='#topic-02'?second:location.hash==='#topic-03'?third:null;
    if(!target)return;
    // Native anchors to a sticky scene can see its already-pinned screen position.
    // Read only our normal-flow position, then let the browser perform the scroll.
    const measuring=root.classList.contains(MEASURE);
    if(enabled)root.classList.add(MEASURE);
    const top=target.getBoundingClientRect().top+scrollY-toolbar();
    if(!measuring)root.classList.remove(MEASURE);
    scrollTo({top:Math.max(0,top),behavior:'instant'});
  }
  function requestRefresh(){
    if(printing)return;
    clearTimeout(refreshTimer);
    refreshTimer=setTimeout(()=>{
      refreshTimer=0;
      cancelAnimationFrame(refreshFrame);
      refreshFrame=requestAnimationFrame(()=>{
        refreshFrame=0;
        if(printing)return;
        ScrollTrigger.refresh();
        refreshCount++;
        alignKnownAnchor();
        ScrollTrigger.update();
        syncAccess();
      });
    },80);
  }

  function setup(){
    mm.add(QUERY,()=>{
      if(printing)return;
      enabled=true;
      root.classList.add(CLASS);
      // These are new scene-only layers. No immediate set touches topic 1 or 2.
      const origins=[[20,48],[24,70],[16,58],[24,86]];
      thirdPanels.forEach((panel,index)=>{
        const [x,y]=origins[index%origins.length];
        gsap.set(panel,{x,y,scale:.96,opacity:.18,transformOrigin:'50% 50%'});
      });
      if(thirdCopy)gsap.set(thirdCopy,{y:26,opacity:.32});
      if(thirdNav)gsap.set(thirdNav,{y:14,opacity:.4});
      const tl=gsap.timeline({scrollTrigger:{
        id:'home-topic-02-to-03',trigger:third,start:'top bottom',
        // Tween endpoints are fixed; refresh only the scroll bounds, preserving
        // the recorded starting values when refreshing partway through a tween.
        end:()=>`top ${toolbar()}px`,scrub:true,
        onUpdate:self=>syncAccess(self),onRefresh:self=>syncAccess(self)
      }});
      const art=second.querySelector('.identification-art');
      const copyParts=[...second.querySelectorAll('.identification-copy > *')];
      if(art)tl.to(art,{x:-36,y:-22,scale:.94,opacity:.14,duration:.86,ease:'none'},0);
      if(copyParts.length)tl.to(copyParts,{y:-18,opacity:.22,duration:.65,stagger:.045,ease:'none'},0);
      if(secondNav)tl.to(secondNav,{y:-12,opacity:.25,duration:.72,ease:'none'},.04);
      if(secondFooter)tl.to(secondFooter,{opacity:.25,duration:.65,ease:'none'},.08);
      // The photographic catalogue recedes left; four evidence panels advance
      // from the right and settle in reading order, rather than rotating images.
      thirdPanels.forEach((panel,index)=>tl.to(panel,{x:0,y:0,scale:1,opacity:1,duration:.6,ease:'power1.out'},.1+index*.1));
      if(thirdCopy)tl.to(thirdCopy,{y:0,opacity:1,duration:.6,ease:'none'},.24);
      if(thirdNav)tl.to(thirdNav,{y:0,opacity:1,duration:.32,ease:'none'},.66);
      transition=tl.scrollTrigger;
      tl.progress(transition.progress,true);
      syncAccess();
      requestRefresh();
      return restore;
    });
  }
  setup();
  document.fonts?.ready.then(requestRefresh);
  Promise.all([...third.querySelectorAll('img')].map(image=>image.complete?Promise.resolve():new Promise(resolve=>{
    image.addEventListener('load',resolve,{once:true});
    image.addEventListener('error',resolve,{once:true});
  }))).then(requestRefresh);
  addEventListener('resize',requestRefresh);
  addEventListener('hashchange',()=>{
    pendingAnchor=['#topic-02','#topic-03'].includes(location.hash);
    requestRefresh();
  });
  // Re-selecting the current hash emits no hashchange. A sticky topic still
  // needs its normal-flow position when the reader returns from a later scene.
  addEventListener('click',event=>{
    if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    const link=event.target.closest?.('a[href]');
    if(!link)return;
    const target=new URL(link.href,location.href);
    if(target.origin===location.origin&&target.pathname===location.pathname&&['#topic-02','#topic-03'].includes(target.hash)){
      pendingAnchor=true;requestRefresh();
    }
  });
  addEventListener('popstate',requestRefresh);
  // A bfcache return retains the browser's actual scroll position, not just its hash.
  addEventListener('pageshow',requestRefresh);
  addEventListener('beforeprint',()=>{
    if(printing)return;
    printing=true;
    clearTimeout(refreshTimer);refreshTimer=0;
    cancelAnimationFrame(refreshFrame);refreshFrame=0;
    mm.kill();restore();
  });
  addEventListener('afterprint',()=>{
    if(!printing)return;
    printing=false;mm=gsap.matchMedia();setup();requestRefresh();
  });
  window.HomeTopicThreeMotion={getState:()=>({
    enhanced:enabled&&!!transition,progress:transition?.progress||0,
    secondInert:second.inert,secondAriaHidden:second.getAttribute('aria-hidden'),
    navInert:secondNav?.inert||false,footerInert:secondFooter?.inert||false,
    thirdCaseCount:third.querySelectorAll('.case-link[href]').length,
    incomingPanelCount:thirdPanels.length,
    start:transition?.start??null,end:transition?.end??null,
    printing,measuring:root.classList.contains(MEASURE),refreshCount,
    reducedMotion:matchMedia('(prefers-reduced-motion: reduce)').matches,
    sourceImagesRewritten:false
  })};
})();
