import {PHASES} from './model.mjs';
/* Host geometry, theme and keyboard bridge. app.mjs alone owns playback and its API. */
(() => {
  'use strict';
  const root=document.documentElement;
  root.classList.add('embedded-canopy');
  if(parent===window)return;
  const TYPE='ecology-media-expand';
  let expanded=false,lastHeight=0,sizeFrame=0,started=false,layoutKey='',reservedHeight=0,phaseHeights=[];
  const resizeObserver='ResizeObserver'in window?new ResizeObserver(size):null;
  const localThemeObserver=new MutationObserver(syncTheme);
  const parentThemeObserver=new MutationObserver(syncTheme);
  const post=(type,extra={})=>parent.postMessage({type,...extra},location.origin);

  function reservePlayerHeight(force=false){
    const player=document.getElementById('player'),narrative=player?.querySelector('.narrative');
    if(!player||!narrative||matchMedia('print').matches)return;
    const width=player.getBoundingClientRect().width,narrativeWidth=narrative.getBoundingClientRect().width;
    if(width<=0||narrativeWidth<=0)return;
    const sourceReady=window.EcologyCanopyPlayer?.getState().ready===true;
    const key=`${width.toFixed(2)}:${narrativeWidth.toFixed(2)}:${expanded}:${sourceReady}`;
    if(!force&&key===layoutKey)return;

    // Measure all scenes and their taller subviews without seeking the live player.
    const probe=player.cloneNode(true);
    probe.inert=true;probe.setAttribute('aria-hidden','true');
    Object.assign(probe.style,{position:'fixed',inset:'auto',left:'0',top:'0',width:`${width}px`,height:'auto',minHeight:'0',maxHeight:'none',visibility:'hidden',pointerEvents:'none'});
    document.body.append(probe);
    try{
      const query=id=>probe.querySelector(`#${id}`);
      const scenes=['photoScene','heightScene','learnScene','gediScene','compareScene','testScene','endScene'].map(query);
      query('error').hidden=true;
      phaseHeights=PHASES.map((phase,i)=>{
        scenes.forEach((scene,index)=>scene.hidden=index!==i);
        query('phaseLabel').textContent=`${i+1} / ${PHASES.length} · ${phase.label}`;
        query('phaseTitle').textContent=phase.title;
        query('phaseCopy').textContent=phase.copy;
        query('phaseNote').textContent=phase.note;
        const variants=phase.id==='learn'?['features','pairs']:phase.id==='compare'?['wipe','lang','potapov']:['default'];
        return Math.max(...variants.map(variant=>{
          if(phase.id==='learn'){
            query('features').hidden=variant!=='features';query('pairs').hidden=variant!=='pairs';
            query('learnTitle').textContent=variant==='features'?'先認識照片中的形狀與紋理':'再把照片與高度配對';
          }else if(phase.id==='compare'){
            query('wipeView').hidden=variant!=='wipe';query('comparisonPair').hidden=variant==='wipe';
            query('comparisonTitle').textContent=variant==='wipe'?'照片與高度圖，對照同一片地':'同一範圍、同一高度色階';
            query('otherName').textContent=variant==='lang'?'Lang 等人的高度圖':'Potapov 等人的高度圖';
          }
          return Math.ceil(probe.getBoundingClientRect().height);
        }));
      });
      reservedHeight=Math.max(...phaseHeights);
      player.style.minHeight=`${reservedHeight}px`;
      layoutKey=key;
    }finally{probe.remove();}
  }

  function syncTheme(){
    try{
      const value=parent.EcologyTheme?.getState().theme||parent.document.documentElement.dataset.theme;
      const selected=value==='dark'?'dark':'light';
      if(root.dataset.theme===selected)return;
      const api=window.EcologyCanopyPlayer;
      if(api){
        api.setTheme(selected);
        // setTheme does not emit state in the original app; use its actual state once.
        post('ecology-canopy-state',{state:api.getState()});
      }else root.dataset.theme=selected;
    }catch{ /* A different-origin host cannot control the embedded theme. */ }
  }

  function size(){
    if(sizeFrame||!started)return;
    sizeFrame=requestAnimationFrame(()=>{
      sizeFrame=0;
      const player=document.getElementById('player');
      if(!player||!started)return;
      reservePlayerHeight();
      const height=Math.ceil(player.getBoundingClientRect().height);
      if(height>=300&&height<=7000&&height!==lastHeight){
        lastHeight=height;
        post('ecology-size',{height});
      }
    });
  }

  function resetCollapsedScroll(){
    if(!expanded)scrollTo(0,0);
  }
  function controls(){
    return [...document.querySelectorAll('a[href],button,input,select,textarea,summary,[tabindex]')].filter(node=>
      !node.disabled&&node.tabIndex>=0&&!node.closest('[hidden],[inert],[aria-hidden="true"]')&&
      node.getClientRects().length&&getComputedStyle(node).visibility!=='hidden');
  }
  function focusBoundary(last){
    if(!expanded)return;
    const list=controls(),target=last?list.at(-1):list[0];
    if(target)target.focus();else post(TYPE,{action:'focus-start'});
  }

  addEventListener('message',event=>{
    if(event.source!==parent||event.origin!==location.origin||!event.data||typeof event.data!=='object')return;
    const message=event.data;
    if(message.type==='ecology-control'){
      // app.mjs already handles pause/play/seek/retry/state. Do not dispatch them twice.
      if(message.action==='viewport')size();
      return;
    }
    if(message.type!==TYPE)return;
    if(typeof message.expanded==='boolean'){
      const changed=expanded!==message.expanded;
      expanded=message.expanded;
      root.classList.toggle('media-expanded-view',expanded);
      if(changed&&!expanded){
        resetCollapsedScroll();
        requestAnimationFrame(()=>{resetCollapsedScroll();size();});
      }
      size();
    }
    if(message.action==='focus-first')focusBoundary(false);
    else if(message.action==='focus-last')focusBoundary(true);
  });
  document.addEventListener('keydown',event=>{
    if(!expanded||event.defaultPrevented||event.isComposing||event.altKey||event.ctrlKey||event.metaKey)return;
    if(event.key==='Escape'){
      event.preventDefault();post(TYPE,{action:'close'});
    }else if(event.key==='Tab'){
      const list=controls(),boundary=event.shiftKey?list[0]:list.at(-1);
      if(!list.length||document.activeElement===boundary){
        event.preventDefault();post(TYPE,{action:list.length?'focus-close':'focus-start'});
      }
    }
  });

  function start(){
    if(started)return;
    started=true;
    const player=document.getElementById('player');
    if(player)resizeObserver?.observe(player);
    localThemeObserver.observe(root,{attributes:true,attributeFilter:['data-theme']});
    try{
      parentThemeObserver.observe(parent.document.documentElement,{attributes:true,attributeFilter:['data-theme']});
      parent.addEventListener('ecologythemechange',syncTheme);
    }catch{}
    syncTheme();
    document.fonts?.ready.then(()=>{reservePlayerHeight(true);size();});
    size();
    post(TYPE,{action:'ready'});
  }
  addEventListener('resize',()=>{resetCollapsedScroll();size();});
  addEventListener('pagehide',()=>{
    started=false;
    cancelAnimationFrame(sizeFrame);sizeFrame=0;
    resizeObserver?.disconnect();localThemeObserver.disconnect();parentThemeObserver.disconnect();
    try{parent.removeEventListener('ecologythemechange',syncTheme);}catch{}
  });
  addEventListener('pageshow',()=>{if(document.readyState!=='loading'&&!started){lastHeight=0;start();}});
  window.EcologyCanopyEmbed={getState:()=>({expanded,height:lastHeight,reservedHeight,phaseHeights:[...phaseHeights],theme:root.dataset.theme,scrollY})};
  syncTheme();
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
