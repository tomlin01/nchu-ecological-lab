(() => {
  'use strict';
  const root=document.documentElement;
  const pages=[...document.querySelectorAll('.chapter')];
  const navLinks=[...document.querySelectorAll('.nav-pages [data-page]')];
  const labels=['研究問題','模型分工','方法動畫','成果與限制'];
  const mobile=matchMedia('(max-width: 740px)');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const fullButton=document.getElementById('full-reading');
  const previousButton=document.getElementById('previous-page');
  const nextButton=document.getElementById('next-page');
  const position=document.getElementById('page-position');
  const frame=document.getElementById('method-frame');
  const transcript=document.getElementById('method-text');
  let continuous=reduced.matches,current=0,printState=null,frameHeight=850;
  let pauseCount=0,lastPauseReason='initial',scrollScheduled=false;
  let animationState={time:0,duration:78,playing:false,ready:false,phase:0};
  const post=(action,extra={})=>frame.contentWindow?.postMessage({type:'ecology-control',action,...extra},'*');
  function sampleAnimation(){
    try{
      const value=frame.contentWindow?.caseAnimation?.getState();
      if(value&&Number.isFinite(value.time)&&value.time>=0&&value.time<=78&&value.duration===78){
        animationState={time:value.time,duration:78,playing:!!value.playing,ready:!!value.ready,phase:value.phase};
      }
    }catch(_){}
    return {...animationState};
  }
  function restoreAnimation(time){
    if(!Number.isFinite(time)||time<0||time>78)return;
    try{frame.contentWindow?.caseAnimation?.seek(time);frame.contentWindow?.caseAnimation?.pause();}catch(_){}
    post('seek',{time});post('pause');
    animationState={...animationState,time,playing:false};
  }
  const hello=()=>post('hello',{generation:0,hostHeight:innerHeight});
  addEventListener('resize',()=>post('viewport',{hostHeight:innerHeight}));

  function hashId(){try{return decodeURIComponent(location.hash.slice(1));}catch(_){return location.hash.slice(1);}}
  function pageForHash(){const page=document.getElementById(hashId())?.closest('.chapter');return page?pages.indexOf(page):0;}
  function isPaged(){return !continuous&&!mobile.matches;}
  function pauseAnimation(reason='page-change'){
    sampleAnimation();
    try{frame.contentWindow?.caseAnimation?.pause();}catch(_){}
    post('pause');animationState.playing=false;
    pauseCount++;lastPauseReason=reason;
  }
  function updateNavigation(){
    pages.forEach((page,index)=>page.dataset.active=String(index===current));
    navLinks.forEach((link,index)=>{if(index===current)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});
    previousButton.disabled=current===0;nextButton.disabled=current===pages.length-1;
    position.textContent=`${current+1} / ${pages.length} · ${labels[current]}`;
    document.body.dataset.page=pages[current].id;
  }
  function revealTarget(){
    const target=document.getElementById(hashId());if(!target)return;
    const details=target.closest('details');if(details)details.open=true;
    if(target.matches('details'))target.open=true;
    if(target!==pages[current]||!isPaged())target.scrollIntoView({block:'start',behavior:'instant'});
  }
  function showPage(index,{focus=false,reset=false,anchor=false}={}){
    current=Math.max(0,Math.min(index,pages.length-1));
    if(current!==2)pauseAnimation('leave-method');
    updateNavigation();
    if(reset&&isPaged())pages[current].scrollTop=0;
    if(focus)pages[current].focus({preventScroll:true});
    if(anchor)requestAnimationFrame(revealTarget);
  }
  function navigate(id){
    const target=document.getElementById(String(id).replace(/^#/,''));
    const page=target?.closest('.chapter');if(!page)return false;
    if(location.hash!==`#${target.id}`)history.pushState(null,'',`#${target.id}`);
    showPage(pages.indexOf(page),{focus:true,reset:true,anchor:true});return true;
  }
  function setMode(){
    pauseAnimation('reading-mode');root.classList.toggle('paged',isPaged());
    fullButton.setAttribute('aria-pressed',String(continuous));fullButton.textContent=continuous?'返回四頁':'完整閱讀';
    updateNavigation();
  }

  document.addEventListener('click',event=>{
    const link=event.target.closest('a[href^="#"]');
    if(!link||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    const id=link.getAttribute('href').slice(1);
    if(!document.getElementById(id)?.closest('.chapter'))return;
    event.preventDefault();navigate(id);
  });
  previousButton.addEventListener('click',()=>navigate(pages[current-1]?.id));
  nextButton.addEventListener('click',()=>navigate(pages[current+1]?.id));
  fullButton.addEventListener('click',()=>{
    continuous=!continuous;setMode();
    requestAnimationFrame(()=>{if(!isPaged())pages[current].scrollIntoView({block:'start',behavior:'instant'});pages[current].focus({preventScroll:true});});
  });
  document.getElementById('print-page').addEventListener('click',()=>window.print());
  addEventListener('popstate',()=>showPage(pageForHash(),{anchor:true}));
  addEventListener('hashchange',()=>showPage(pageForHash(),{anchor:true}));
  mobile.addEventListener('change',()=>{setMode();requestAnimationFrame(revealTarget);});
  reduced.addEventListener('change',event=>{if(event.matches){continuous=true;setMode();}});
  document.addEventListener('keydown',event=>{
    if(!isPaged()||event.defaultPrevented||event.altKey||event.ctrlKey||event.metaKey||event.shiftKey)return;
    if(event.target.closest('a,button,input,select,textarea,iframe,summary,[contenteditable]'))return;
    const offset=event.key==='ArrowRight'?1:event.key==='ArrowLeft'?-1:0;
    if(offset&&current+offset>=0&&current+offset<pages.length){event.preventDefault();navigate(pages[current+offset].id);}
  });

  // Only this embedded player can report its rendered height, including file:// delivery.
  addEventListener('message',event=>{
    if(event.source!==frame.contentWindow)return;
    const data=event.data;
    if(!data||typeof data!=='object')return;
    if(['ecology-state','ecology-ready'].includes(data.type)){
      const value=data.state;
      if(data.generation!==0||!value||!Number.isFinite(value.time)||value.time<0||value.time>78||value.duration!==78)return;
      animationState={time:value.time,duration:78,playing:!!value.playing,ready:!!value.ready,phase:value.phase};
      return;
    }
    if(data.type!=='ecology-size')return;
    if(typeof data.height!=='number'||!Number.isFinite(data.height)||data.height<400||data.height>3000)return;
    const next=Math.ceil(data.height);
    if(next!==frameHeight){frameHeight=next;frame.style.height=`${next}px`;frame.setAttribute('height',String(next));}
  });
  frame.addEventListener('load',()=>{pauseAnimation('frame-loaded');hello();});
  addEventListener('pageshow',()=>{pauseAnimation('page-shown');hello();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)pauseAnimation('document-hidden');});
  if('IntersectionObserver'in window){
    const visibility=new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)pauseAnimation('frame-offscreen');},{threshold:0});
    visibility.observe(frame);
    addEventListener('unload',()=>visibility.disconnect(),{once:true});
  }
  addEventListener('pagehide',()=>pauseAnimation('page-hidden'));
  addEventListener('scroll',()=>{
    if(isPaged()||printState||scrollScheduled)return;
    scrollScheduled=true;
    requestAnimationFrame(()=>{
      scrollScheduled=false;
      let index=0;pages.forEach((page,i)=>{if(page.getBoundingClientRect().top<innerHeight*.4)index=i;});
      if(current!==index){current=index;updateNavigation();if(current!==2)pauseAnimation('continuous-reading-away');}
    });
  },{passive:true});

  addEventListener('beforeprint',()=>{
    if(printState)return;
    const animationTime=sampleAnimation().time;
    pauseAnimation('before-print');
    printState={current,continuous,x:scrollX,y:scrollY,scrolls:pages.map(page=>page.scrollTop),transcriptOpen:transcript.open,animationTime};
    transcript.open=true;
  });
  addEventListener('afterprint',()=>{
    if(!printState)return;
    const saved=printState;printState=null;current=saved.current;continuous=saved.continuous;
    transcript.open=saved.transcriptOpen;setMode();
    requestAnimationFrame(()=>{pages.forEach((page,index)=>page.scrollTop=saved.scrolls[index]);scrollTo(saved.x,saved.y);restoreAnimation(saved.animationTime);pauseAnimation('after-print');});
  });

  window.caseWebsite={
    navigate,
    getState:()=>({currentPage:pages[current].id,pageIndex:current,paged:isPaged(),continuous,mobile:mobile.matches,reducedMotion:reduced.matches,frameHeight,frameSrc:frame.getAttribute('src'),pauseCount,lastPauseReason,animation:sampleAnimation()})
  };
  root.classList.add('has-js');
  document.querySelectorAll('.js-only').forEach(element=>element.hidden=false);
  current=pageForHash();transcript.open=false;setMode();showPage(current,{anchor:true});hello();
})();
