/* Size, theme and keyboard bridge only. The accepted player keeps its own clock. */
(() => {
  'use strict';
  if(parent===window)return;
  const root=document.documentElement,TYPE='ecology-media-expand';
  root.classList.add('embedded-behaviour');
  let expanded=false,lastHeight=0,scheduled=false,lastStateKey='',sentReady=false,timer=null;
  const post=(type,extra={})=>parent.postMessage({type,...extra},location.origin);
  function theme(){try{const value=parent.EcologyTheme?.getState().theme||parent.document.documentElement.dataset.theme;root.dataset.theme=value==='dark'?'dark':'light';}catch{}}
  function size(){
    if(scheduled)return;scheduled=true;
    requestAnimationFrame(()=>{scheduled=false;const main=document.getElementById('playerMain');if(!main)return;
      const height=Math.ceil(main.getBoundingClientRect().height);
      if(height>=300&&height<=7000&&height!==lastHeight){lastHeight=height;post('ecology-size',{height});}
    });
  }
  function controls(){return [...document.querySelectorAll('a[href],button,input,select,textarea,summary,[tabindex]')].filter(n=>!n.disabled&&n.tabIndex>=0&&!n.closest('[hidden],[inert]')&&n.getClientRects().length&&getComputedStyle(n).visibility!=='hidden');}
  function focus(last){if(!expanded)return;const list=controls(),target=last?list.at(-1):list[0];if(target)target.focus();else post(TYPE,{action:'focus-start'});}
  window.addEventListener('message',e=>{
    if(e.source!==parent||e.origin!==location.origin||!e.data||typeof e.data!=='object')return;
    const d=e.data;
    if(d.type==='ecology-control'&&d.action==='viewport')size();
    if(d.type!==TYPE)return;
    if(d.action==='focus-first')focus(false);else if(d.action==='focus-last')focus(true);
    if(typeof d.expanded==='boolean'){expanded=d.expanded;root.classList.toggle('media-expanded-view',expanded);if(!expanded)scrollTo(0,0);size();}
  });
  document.addEventListener('keydown',e=>{
    if(!expanded||e.defaultPrevented||e.isComposing||e.altKey||e.ctrlKey||e.metaKey)return;
    if(e.key==='Escape'){e.preventDefault();post(TYPE,{action:'close'});return;}
    if(e.key==='Tab'){const list=controls(),boundary=e.shiftKey?list[0]:list.at(-1);if(!list.length||document.activeElement===boundary){e.preventDefault();post(TYPE,{action:list.length?'focus-close':'focus-start'});}}
  });
  function pulse(){
    theme();const api=window.EcologyBehaviourPlayer;if(!api)return;
    const s=api.getState(),key=JSON.stringify([s.ready,s.loading,s.error,s.attempt,s.phaseId]);
    if(key!==lastStateKey){lastStateKey=key;post('ecology-behaviour-state',{state:s});size();}
    if(s.ready&&!sentReady){sentReady=true;post('ecology-behaviour-ready');}
  }
  function start(){theme();const main=document.getElementById('playerMain');if(main&&'ResizeObserver'in window)new ResizeObserver(size).observe(main);
    document.fonts?.ready.then(size);timer=setInterval(pulse,200);pulse();size();post(TYPE,{action:'ready'});
    try{parent.addEventListener('ecologythemechange',theme);}catch{}
  }
  window.addEventListener('resize',size);
  window.addEventListener('pagehide',()=>{clearInterval(timer);try{parent.removeEventListener('ecologythemechange',theme);}catch{}});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
