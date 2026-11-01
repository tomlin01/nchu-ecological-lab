(() => {
  'use strict';
  const root=document.documentElement,pages=[...document.querySelectorAll('.chapter')];
  const nav=[...document.querySelectorAll('.nav-pages [data-page]')];
  const labels=nav.map(link=>link.textContent.trim());
  const methodIndex=pages.findIndex(page=>page.id==='method');
  const mobile=matchMedia('(max-width:740px)'),reduced=matchMedia('(prefers-reduced-motion:reduce)');
  const full=document.getElementById('full-reading'),previous=document.getElementById('previous-page'),next=document.getElementById('next-page');
  const position=document.getElementById('page-position'),frame=document.getElementById('method-frame'),transcript=document.getElementById('method-text');
  const status=document.getElementById('frame-status'),retry=document.getElementById('retry-frame');
  frame.dataset.playerSrc='animation/embed.html?v=05-05-web-v01';
  let playerStarted=false;
  let continuous=reduced.matches,current=0,frameHeight=840,frameLoaded=false,childState=null,printState=null,scrollScheduled=false;
  let pauseCount=0,lastPauseReason='initial';
  const send=(action,extra={})=>frame.contentWindow?.postMessage({type:'ecology-control',action,...extra},location.origin);
  function ensurePlayer(){
    if(playerStarted||printState)return;
    playerStarted=true;frame.hidden=false;frame.src=frame.dataset.playerSrc;updatePlayerStatus();
  }
  function isPaged(){return !continuous&&!mobile.matches;}
  function hashId(){try{return decodeURIComponent(location.hash.slice(1));}catch{return location.hash.slice(1);}}
  function pageForHash(){const page=document.getElementById(hashId())?.closest('.chapter');return page?pages.indexOf(page):0;}
  function closeExpanded(reason){window.EcologyMediaExpand?.close({restoreFocus:false,restoreScroll:false,reason});}
  function pauseAnimation(reason='page-change'){
    try{frame.contentWindow?.ForTyPlayer?.pause(reason);}catch{}
    send('pause',{reason});pauseCount++;lastPauseReason=reason;
  }
  function fitMap(){
    const image=document.getElementById('global-map');if(!image)return;
    if(!isPaged()||pages[current].id!=='roles'){image.style.removeProperty('--map-image-height');return;}
    const figure=image.closest('figure'),caption=figure.querySelector('figcaption'),open=document.getElementById('open-map');
    const bottom=Math.min(pages[current].getBoundingClientRect().bottom,document.querySelector('.reading-controls').getBoundingClientRect().top,innerHeight);
    const extras=(caption?.getBoundingClientRect().height||0)+(open?.getBoundingClientRect().height||0)+26;
    const budget=Math.max(170,Math.floor(bottom-figure.getBoundingClientRect().top-extras));
    if(image.style.getPropertyValue('--map-image-height')!==`${budget}px`)image.style.setProperty('--map-image-height',`${budget}px`);
  }
  function reportViewport(){
    if(window.EcologyMediaExpand?.getState().expanded)return;
    const stage=frame.closest('[data-media-expand-stage]');let height;
    if(isPaged()&&current===methodIndex){
      const bounds=pages[methodIndex].getBoundingClientRect(),box=stage.getBoundingClientRect();
      const bottom=Math.min(bounds.bottom,document.querySelector('.reading-controls').getBoundingClientRect().top,innerHeight);
      height=Math.max(240,Math.floor(bottom-box.top-12));
      frame.style.setProperty('--method-frame-budget',`${height}px`);
    }else{
      frame.style.removeProperty('--method-frame-budget');
      const bars=document.querySelector('.site-header').getBoundingClientRect().height+document.querySelector('.section-nav').getBoundingClientRect().height;
      height=Math.max(240,innerHeight-bars);
    }
    send('viewport',{hostHeight:height,hostWidth:stage.clientWidth||innerWidth});
  }
  function fitVisuals(){fitMap();reportViewport();}
  function playerState(){try{return frame.contentWindow?.ForTyPlayer?.getState()||childState;}catch{return childState;}}
  function updatePlayerStatus(){
    const playButton=document.getElementById('play-animation');playButton.disabled=!childState?.ready||Boolean(childState?.loading||childState?.error);playButton.textContent=childState?.playing?'暫停動畫':childState?.ready?(childState.time>=childState.duration?'重新播放':'播放動畫'):playerStarted&&!childState?.error?'載入動畫中':'播放動畫';
    playButton.setAttribute('aria-pressed',String(Boolean(childState?.playing)));
    retry.hidden=!playerStarted||Boolean(childState?.ready&&!childState?.error);retry.disabled=Boolean(childState?.loading);
    retry.textContent=childState?.loading?'正在載入場景與字型':childState?'重新載入場景與字型':'重新載入播放器';
    const message=!playerStarted?'開啟「看動畫」後會載入場景與字型，也可以先讀下方解說。':childState?.error?`${childState.error} 可以重新載入，仍會停在剛才選的時間。`:childState?.ready?'動畫已載入。按播放開始，也可以暫停、移動時間軸或放大觀看。':childState?.loading?'正在載入場景與字型。可以先移動時間軸，載入後按播放才會開始。':frameLoaded?'播放介面已開啟，正在等待場景與字型載入。':'正在載入動畫。等待時可以先讀下方解說。';
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
    if(current===methodIndex){ensurePlayer();send('resume');reportViewport();}else send('suspend');
    requestAnimationFrame(fitVisuals);
  }
  function navigate(id){
    const target=document.getElementById(String(id).replace(/^#/,'')),page=target?.closest('.chapter');if(!page)return false;
    closeExpanded('navigation');pauseAnimation('navigation');
    if(location.hash!==`#${target.id}`)history.pushState(null,'',`#${target.id}`);
    showPage(pages.indexOf(page),{focus:true,reset:true,anchor:true});return true;
  }
  function setMode(){
    closeExpanded('reading-mode');pauseAnimation('reading-mode');root.classList.toggle('paged',isPaged());
    full.setAttribute('aria-pressed',String(continuous));full.textContent=continuous?'分頁閱讀':'連續閱讀';updateNavigation();reportViewport();
  }
  document.addEventListener('click',event=>{
    const link=event.target.closest('a[href]');if(!link||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.altKey||event.shiftKey)return;
    const href=link.getAttribute('href');
    if(href.startsWith('#')&&document.getElementById(href.slice(1))?.closest('.chapter')){event.preventDefault();navigate(href.slice(1));}
    else if(!href.startsWith('#')){closeExpanded('source-or-site-link');pauseAnimation('source-or-site-link');}
  });
  previous.addEventListener('click',()=>navigate(pages[current-1]?.id));next.addEventListener('click',()=>navigate(pages[current+1]?.id));
  full.addEventListener('click',()=>{continuous=!continuous;setMode();requestAnimationFrame(()=>{if(!isPaged())pages[current].scrollIntoView({block:'start',behavior:'instant'});pages[current].focus({preventScroll:true});});});
  document.getElementById('play-animation').addEventListener('click',()=>{if(playerState()?.playing)pauseAnimation('host-play-button');else{send('resume');send('play');}});
  document.getElementById('print-page').addEventListener('click',()=>window.print());retry.addEventListener('click',()=>{
    if(childState){send('retry');return;}
    frameLoaded=false;frame.src=frame.dataset.playerSrc;updatePlayerStatus();
  });
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
    if(event.source!==frame.contentWindow||event.origin!==location.origin||!event.data||typeof event.data!=='object')return;
    const data=event.data;
    if(data.type==='ecology-size'&&typeof data.height==='number'&&Number.isFinite(data.height)&&data.height>=300&&data.height<=7000){
      const height=Math.ceil(data.height);if(height!==frameHeight){
        const readingPage=pages[current],keepPosition=!isPaged()&&current!==methodIndex&&!printState;
        const beforeTop=keepPosition?readingPage.getBoundingClientRect().top:0;
        frameHeight=height;frame.style.height=`${height}px`;frame.height=String(height);
        if(keepPosition){const shift=readingPage.getBoundingClientRect().top-beforeTop;if(Math.abs(shift)>1)scrollBy({top:shift,behavior:'instant'});}
      }
    }else if(data.type==='ecology-media-expand'&&data.action==='open'){
      if(current===methodIndex)window.EcologyMediaExpand?.open(frame.closest('[data-media-expand-stage]'));
    }else if(data.type==='ecology-forty-state'&&data.state&&typeof data.state==='object'){
      childState=data.state;updatePlayerStatus();
    }else if(data.type==='ecology-forty-error'){childState=data.state||{...childState,error:data.error,ready:false};updatePlayerStatus();}else if(data.type==='ecology-forty-ready'){reportViewport();send('state');if(current!==methodIndex){pauseAnimation('child-ready-away');send('suspend');}else send('resume');}
  });
  frame.addEventListener('load',()=>{if(!playerStarted)return;frameLoaded=true;if(current!==methodIndex)pauseAnimation('frame-loaded-away');reportViewport();send('state');updatePlayerStatus();});
  frame.addEventListener('error',()=>{status.textContent='動畫暫時打不開。可以重新載入，或先讀下方解說。';retry.hidden=false;retry.disabled=false;});
  window.addEventListener('mediaexpandchange',event=>{
    frame.setAttribute('scrolling',event.detail?.expanded?'auto':'no');
    if(event.detail?.expanded===false)reportViewport();
  });
  window.addEventListener('resize',()=>{pauseAnimation('viewport-resize');requestAnimationFrame(fitVisuals);});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)pauseAnimation('document-hidden');});
  window.addEventListener('pagehide',()=>pauseAnimation('page-hidden'));
  // A few iframe pixels behind sticky navigation do not mean the reader entered the animation.
  if('IntersectionObserver'in window)new IntersectionObserver(entries=>{if(entries[0]?.isIntersecting&&current===methodIndex){ensurePlayer();send('resume');}else if(entries[0]&&!entries[0].isIntersecting){pauseAnimation('frame-offscreen');send('suspend');}},{threshold:0}).observe(frame);
  window.addEventListener('scroll',()=>{
    if(isPaged()||printState||scrollScheduled)return;scrollScheduled=true;
    requestAnimationFrame(()=>{scrollScheduled=false;let index=0;pages.forEach((page,i)=>{if(page.getBoundingClientRect().top<innerHeight*.4)index=i;});if(current!==index){current=index;updateNavigation();if(current!==methodIndex){pauseAnimation('continuous-reading-away');send('suspend');}else{ensurePlayer();send('resume');reportViewport();}}});
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
  window.ForTyCase=window.caseWebsite={navigate,retryPlayer:()=>send('retry'),getState:()=>({currentPage:pages[current].id,pageIndex:current,paged:isPaged(),continuous,mobile:mobile.matches,reducedMotion:reduced.matches,frameHeight,frameLoaded,playerStarted,frameSrc:frame.getAttribute('src'),frameCount:document.querySelectorAll('iframe').length,pauseCount,lastPauseReason,player:playerState(),expanded:window.EcologyMediaExpand?.getState().expanded||false})};

  const forestTypes=[
    {id:'primary',label:'原生林',color:'#007b2d',copy:'以原生樹種為主，沒有明顯人為干擾跡象。',note:'外觀與歷史都重要。衛星影像無法直接看見全部經營紀錄。'},
    {id:'natreg',label:'自然再生林',color:'#43bf78',copy:'主要靠自然更新長回來的森林，包含許多不同的恢復階段。',note:'年輕再生林與成熟次生林都可能屬於這一類，結構不一定相同。'},
    {id:'planted',label:'人工栽植林',color:'#0797bd',copy:'主要由人種植或播種，與集約經營人工林分開。',note:'本研究使用輪伐期超過40年作操作代理，不是各地都適用的完整生態定義。'},
    {id:'plantation',label:'集約經營人工林',color:'#ec39a5',copy:'常見少數樹種、相近樹齡和規律間距，以較短週期經營。',note:'研究用40年以內的輪伐期作為簡化判準，不保證各地都能這樣分。'},
    {id:'treecrop',label:'樹作物與農林混作',color:'#eea400',copy:'土地主要用來生產樹作物，例如橡膠、油棕、果樹或農林混作。',note:'樹冠看起來像森林，也可能是農業用途；單看綠色覆蓋還不夠。'},
    {id:'other',label:'其他土地',color:'#a4aaa4',copy:'其餘土地用途，以及未符合本研究森林門檻的地表。',note:'這張官方展示圖以背景呈現其他土地，原英文圖例只列出五種森林與樹作物類。'}
  ];
  function selectType(id){const item=forestTypes.find(x=>x.id===id);if(!item)return;const focus=document.getElementById('legend-focus');if(focus){const row={primary:861,natreg:905,planted:949,plantation:993,treecrop:1037}[id];focus.setAttribute('visibility',row===undefined?'hidden':'visible');if(row!==undefined)focus.setAttribute('y',String(row));}document.querySelectorAll('[data-forest-type]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.forestType===id)));document.querySelectorAll('[data-type-legend]').forEach(row=>row.dataset.active=String(row.dataset.typeLegend===id));const detail=document.getElementById('type-detail');detail.dataset.type=id;detail.style.setProperty('--type-color',item.color);document.getElementById('type-title').textContent=item.label;document.getElementById('type-copy').textContent=item.copy;document.getElementById('type-note').textContent=item.note;}
  document.querySelectorAll('[data-forest-type]').forEach(button=>button.addEventListener('click',()=>selectType(button.dataset.forestType)));
  const mapDialog=document.getElementById('map-dialog');const mapOpen=document.getElementById('open-map');
  mapOpen?.addEventListener('click',()=>{pauseAnimation('image-zoom');if(typeof mapDialog.showModal==='function')mapDialog.showModal();});
  document.getElementById('close-map')?.addEventListener('click',()=>mapDialog.close());
  mapDialog?.addEventListener('click',event=>{if(event.target===mapDialog){const r=mapDialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)mapDialog.close();}});
  selectType('natreg');
  document.getElementById('global-map')?.addEventListener('load',fitMap);
  document.fonts?.ready.then(()=>requestAnimationFrame(fitVisuals));
  window.addEventListener('DOMContentLoaded',()=>requestAnimationFrame(fitVisuals));
  root.classList.add('has-js');document.querySelectorAll('.js-only').forEach(element=>element.hidden=false);
  current=pageForHash();transcript.open=false;setMode();showPage(current,{anchor:true});updatePlayerStatus();
})();
