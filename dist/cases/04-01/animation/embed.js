import {PHASES} from './model.mjs';
/* Host geometry, theme and keyboard bridge. app.mjs alone owns playback and its API. */
(() => {
  'use strict';
  const root=document.documentElement;
  root.classList.add('embedded-leaf');
  if(parent===window)return;
  const TYPE='ecology-media-expand';
  let expanded=false,lastHeight=0,sizeFrame=0,started=false,narrativeWidth=0;
  const resizeObserver='ResizeObserver'in window?new ResizeObserver(size):null;
  const localThemeObserver=new MutationObserver(syncTheme);
  const parentThemeObserver=new MutationObserver(syncTheme);
  const post=(type,extra={})=>parent.postMessage({type,...extra},location.origin);

  function reserveNarrativeHeight(force=false){
    const narrative=document.querySelector('.narrative');
    if(!narrative)return;
    const width=narrative.getBoundingClientRect().width;
    if(width<=0||(!force&&Math.abs(width-narrativeWidth)<.1))return;
    narrativeWidth=width;
    const player=document.getElementById('player'),stage=document.getElementById('stage');
    player.style.minHeight='0';
    // The original player pauses on viewport resize. Reserve its longest caption
    // so a phase change cannot resize the iframe and interrupt playback.
    const probe=narrative.cloneNode(true);
    probe.inert=true;probe.setAttribute('aria-hidden','true');
    Object.assign(probe.style,{position:'fixed',left:'0',top:'0',width:`${width}px`,height:'auto',minHeight:'0',visibility:'hidden',pointerEvents:'none'});
    document.body.append(probe);
    let height=0;
    for(const [i,phase] of PHASES.entries()){
      probe.querySelector('#phaseLabel').textContent=`${i+1} / ${PHASES.length} · ${phase.label}`;
      probe.querySelector('#phaseTitle').textContent=phase.title;
      probe.querySelector('#phaseCopy').textContent=phase.copy;
      probe.querySelector('#phaseNote').textContent=phase.note;
      height=Math.max(height,probe.getBoundingClientRect().height);
    }
    probe.remove();narrative.style.minHeight=`${Math.ceil(height)}px`;
    // The leaf scenes share a fixed stage height. Keep that geometry,
    // but reserve their maximum outer height so the iframe viewport stays still.
    const extra=0;
    player.style.minHeight=`${Math.ceil(player.getBoundingClientRect().height+extra)}px`;
  }

  function syncTheme(){
    try{
      const value=parent.EcologyTheme?.getState().theme||parent.document.documentElement.dataset.theme;
      const selected=value==='dark'?'dark':'light';
      if(root.dataset.theme===selected)return;
      const api=window.EcologyLeafPlayer;
      if(api){
        api.setTheme(selected);
        // setTheme does not emit state in the original app; use its actual state once.
        post('ecology-leaf-state',{state:api.getState()});
      }else root.dataset.theme=selected;
    }catch{ /* A different-origin host cannot control the embedded theme. */ }
  }

  function size(){
    if(sizeFrame||!started)return;
    sizeFrame=requestAnimationFrame(()=>{
      sizeFrame=0;
      const player=document.getElementById('player');
      if(!player||!started)return;
      reserveNarrativeHeight();
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
    document.fonts?.ready.then(()=>{reserveNarrativeHeight(true);size();});
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
  window.EcologyLeafEmbed={getState:()=>({expanded,height:lastHeight,theme:root.dataset.theme,scrollY})};
  syncTheme();
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
