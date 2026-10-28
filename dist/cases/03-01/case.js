(() => {
  'use strict';
  const root=document.documentElement,pages=[...document.querySelectorAll('.chapter')];
  const nav=[...document.querySelectorAll('.nav-pages [data-page]')];
  const labels=['看照片','電腦怎麼比','看動畫','辨認得準嗎'];
  const methodIndex=pages.findIndex(page=>page.id==='method');
  const mobile=matchMedia('(max-width:740px)'),reduced=matchMedia('(prefers-reduced-motion:reduce)');
  const full=document.getElementById('full-reading'),previous=document.getElementById('previous-page'),next=document.getElementById('next-page');
  const position=document.getElementById('page-position'),frame=document.getElementById('method-frame'),transcript=document.getElementById('method-text');
  const status=document.getElementById('frame-status'),retry=document.getElementById('retry-frame');
  let playerStarted=false;
  let continuous=reduced.matches,current=0,frameHeight=820,frameLoaded=false,childState=null,printState=null,scrollScheduled=false;
  let pauseCount=0,lastPauseReason='initial';
  const send=(action,extra={})=>frame.contentWindow?.postMessage({type:'ecology-control',action,...extra},'*');
  function ensurePlayer(){
    if(playerStarted||printState)return;
    playerStarted=true;frame.src=frame.dataset.playerSrc;updatePlayerStatus();
  }
  function isPaged(){return !continuous&&!mobile.matches;}
  function hashId(){try{return decodeURIComponent(location.hash.slice(1));}catch{return location.hash.slice(1);}}
  function pageForHash(){const page=document.getElementById(hashId())?.closest('.chapter');return page?pages.indexOf(page):0;}
  function closeExpanded(reason){window.EcologyMediaExpand?.close({restoreFocus:false,restoreScroll:false,reason});}
  function pauseAnimation(reason='page-change'){
    try{frame.contentWindow?.caseAnimation?.pause();}catch{}
    send('pause');pauseCount++;lastPauseReason=reason;
  }
  function reportViewport(){
    if(window.EcologyMediaExpand?.getState().expanded)return;
    const bars=document.querySelector('.site-header').getBoundingClientRect().height+document.querySelector('.section-nav').getBoundingClientRect().height;
    send('viewport',{hostHeight:Math.max(240,window.innerHeight-bars),hostWidth:window.innerWidth});
  }
  function playerState(){try{return frame.contentWindow?.caseAnimation?.getState()||childState;}catch{return childState;}}
  function updatePlayerStatus(){
    retry.hidden=!childState?.error;retry.disabled=!!childState?.loading;
    const message=!playerStarted?'進入方法頁後載入照片動畫；下方保留完整文字與原圖連結。':childState?.error?`${childState.error} 請重試載入，所選時間會保留。`:childState?.ready?'照片已就緒。按播放器的播放鍵開始。':childState?.loading?'正在載入三張照片。可以先選擇段落；完成後不會自動播放。':frameLoaded?'播放器已載入，正在準備照片。':'正在載入照片播放器。下方保留完整文字與原圖連結。';
    if(status.textContent!==message)status.textContent=message;
  }
  function updateNavigation(){
    pages.forEach((page,index)=>page.dataset.active=String(index===current));
    nav.forEach((link,index)=>index===current?link.setAttribute('aria-current','page'):link.removeAttribute('aria-current'));
    previous.disabled=current===0;next.disabled=current===pages.length-1;
    position.textContent=`${current+1} / ${pages.length} · ${labels[current]}`;document.body.dataset.page=pages[current].id;
  }
  function revealTarget(){
    const target=document.getElementById(hashId());if(!target)return;
    const details=target.closest('details');if(details)details.open=true;if(target.matches('details'))target.open=true;
    if(target!==pages[current]||!isPaged())target.scrollIntoView({block:'start',behavior:'instant'});
  }
  function showPage(index,{focus=false,reset=false,anchor=false}={}){
    current=Math.max(0,Math.min(index,pages.length-1));
    if(current!==methodIndex)pauseAnimation('leave-method');updateNavigation();
    if(reset&&isPaged())pages[current].scrollTop=0;
    if(focus)pages[current].focus({preventScroll:true});
    if(anchor)requestAnimationFrame(revealTarget);
    if(current===methodIndex){ensurePlayer();reportViewport();}
  }
  function navigate(id){
    const target=document.getElementById(String(id).replace(/^#/,'')),page=target?.closest('.chapter');if(!page)return false;
    closeExpanded('navigation');pauseAnimation('navigation');
    if(location.hash!==`#${target.id}`)history.pushState(null,'',`#${target.id}`);
    showPage(pages.indexOf(page),{focus:true,reset:true,anchor:true});return true;
  }
  function setMode(){
    closeExpanded('reading-mode');pauseAnimation('reading-mode');root.classList.toggle('paged',isPaged());
    full.setAttribute('aria-pressed',String(continuous));full.textContent=continuous?'返回四頁':'完整閱讀';updateNavigation();reportViewport();
  }
  document.addEventListener('click',event=>{
    const link=event.target.closest('a[href]');if(!link||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.altKey||event.shiftKey)return;
    const href=link.getAttribute('href');
    if(href.startsWith('#')&&document.getElementById(href.slice(1))?.closest('.chapter')){event.preventDefault();navigate(href.slice(1));}
    else if(!href.startsWith('#')){closeExpanded('source-or-site-link');pauseAnimation('source-or-site-link');}
  });
  previous.addEventListener('click',()=>navigate(pages[current-1]?.id));next.addEventListener('click',()=>navigate(pages[current+1]?.id));
  full.addEventListener('click',()=>{continuous=!continuous;setMode();requestAnimationFrame(()=>{if(!isPaged())pages[current].scrollIntoView({block:'start',behavior:'instant'});pages[current].focus({preventScroll:true});});});
  document.getElementById('print-page').addEventListener('click',()=>window.print());retry.addEventListener('click',()=>send('retry'));
  for(const name of ['hashchange','popstate'])window.addEventListener(name,()=>{closeExpanded(name);pauseAnimation(name);showPage(pageForHash(),{anchor:true});});
  mobile.addEventListener('change',()=>{setMode();requestAnimationFrame(revealTarget);});
  reduced.addEventListener('change',event=>{if(event.matches){continuous=true;setMode();}});
  document.addEventListener('keydown',event=>{
    if(!isPaged()||event.defaultPrevented||event.altKey||event.ctrlKey||event.metaKey||event.shiftKey)return;
    if(event.target.closest('a,button,input,select,textarea,iframe,summary,[contenteditable]'))return;
    const offset=event.key==='ArrowRight'?1:event.key==='ArrowLeft'?-1:0;
    if(offset&&current+offset>=0&&current+offset<pages.length){event.preventDefault();navigate(pages[current+offset].id);}
  });
  window.addEventListener('message',event=>{
    if(event.source!==frame.contentWindow||!event.data||typeof event.data!=='object')return;
    const data=event.data;
    if(data.type==='ecology-size'&&typeof data.height==='number'&&Number.isFinite(data.height)&&data.height>=300&&data.height<=7000){
      const height=Math.ceil(data.height);if(height!==frameHeight){frameHeight=height;frame.style.height=`${height}px`;frame.height=String(height);}
    }else if(data.type==='ecology-photo-state'&&data.state&&typeof data.state==='object'){
      childState=data.state;updatePlayerStatus();
    }else if(data.type==='ecology-photo-ready'){reportViewport();send('state');if(current!==methodIndex)pauseAnimation('child-ready-away');}
  });
  frame.addEventListener('load',()=>{if(!playerStarted)return;frameLoaded=true;pauseAnimation('frame-loaded');reportViewport();send('state');updatePlayerStatus();});
  frame.addEventListener('error',()=>{status.textContent='播放器未能載入。完整文字與來源原圖仍可閱讀。';});
  window.addEventListener('mediaexpandchange',event=>{if(event.detail?.expanded===false)reportViewport();});
  window.addEventListener('resize',()=>{pauseAnimation('viewport-resize');reportViewport();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)pauseAnimation('document-hidden');});
  window.addEventListener('pagehide',()=>pauseAnimation('page-hidden'));
  if('IntersectionObserver'in window)new IntersectionObserver(entries=>{if(entries[0]?.isIntersecting&&(!isPaged()||current===methodIndex))ensurePlayer();else if(entries[0]&&!entries[0].isIntersecting)pauseAnimation('frame-offscreen');},{threshold:0}).observe(frame);
  window.addEventListener('scroll',()=>{
    if(isPaged()||printState||scrollScheduled)return;scrollScheduled=true;
    requestAnimationFrame(()=>{scrollScheduled=false;let index=0;pages.forEach((page,i)=>{if(page.getBoundingClientRect().top<innerHeight*.4)index=i;});if(current!==index){current=index;updateNavigation();if(current!==methodIndex)pauseAnimation('continuous-reading-away');}});
  },{passive:true});
  window.addEventListener('beforeprint',()=>{
    if(printState)return;closeExpanded('before-print');pauseAnimation('before-print');
    printState={current,continuous,x:scrollX,y:scrollY,scrolls:pages.map(page=>page.scrollTop),details:[...document.querySelectorAll('details')].map(item=>[item,item.open])};
    printState.details.forEach(([item])=>item.open=true);
  });
  window.addEventListener('afterprint',()=>{
    if(!printState)return;const saved=printState;printState=null;current=saved.current;continuous=saved.continuous;
    saved.details.forEach(([item,open])=>item.open=open);setMode();requestAnimationFrame(()=>{pages.forEach((page,index)=>page.scrollTop=saved.scrolls[index]);scrollTo(saved.x,saved.y);pauseAnimation('after-print');});
  });
  window.caseWebsite={navigate,retryPlayer:()=>send('retry'),getState:()=>({currentPage:pages[current].id,pageIndex:current,paged:isPaged(),continuous,mobile:mobile.matches,reducedMotion:reduced.matches,frameHeight,frameLoaded,playerStarted,frameSrc:frame.getAttribute('src'),frameCount:document.querySelectorAll('iframe').length,pauseCount,lastPauseReason,player:playerState(),expanded:window.EcologyMediaExpand?.getState().expanded||false})};
  root.classList.add('has-js');document.querySelectorAll('.js-only').forEach(element=>element.hidden=false);
  current=pageForHash();transcript.open=false;setMode();showPage(current,{anchor:true});updatePlayerStatus();
})();
