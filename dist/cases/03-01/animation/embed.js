/* Generic size/focus bridge for this local player. No case registry or playback clock. */
(() => {
  'use strict';
  if(parent===window)return;
  const root=document.documentElement,TYPE='ecology-media-expand';
  let expanded=false,hostHeight=900,lastHeight=0,scheduled=false;
  root.classList.add('embedded');
  function size(){
    root.style.setProperty('--stage-height',`${Math.max(240,Math.min(500,hostHeight-430))}px`);
    root.style.setProperty('--expanded-stage-height',`${Math.max(280,Math.min(850,hostHeight*.68))}px`);
    if(scheduled)return;scheduled=true;
    requestAnimationFrame(()=>{
      scheduled=false;const main=document.getElementById('player-main');if(!main)return;
      const height=Math.ceil(main.getBoundingClientRect().height);
      if(height>=300&&height<=7000&&height!==lastHeight){lastHeight=height;parent.postMessage({type:'ecology-size',height},'*');}
    });
  }
  function controls(){return [...document.querySelectorAll('a[href],button,input,select,textarea,summary,[tabindex]')].filter(node=>node.tabIndex>=0&&!node.disabled&&!node.closest('[hidden],[inert]')&&node.getClientRects().length&&getComputedStyle(node).visibility!=='hidden');}
  function reply(action){parent.postMessage({type:TYPE,action},'*');}
  function focusBoundary(last){if(!expanded||document.querySelector('dialog[open]'))return;const list=controls(),target=last?list.at(-1):list[0];if(target)target.focus();else reply('focus-start');}
  window.addEventListener('message',event=>{
    if(event.source!==parent||!event.data||typeof event.data!=='object')return;
    const data=event.data;
    if(data.type==='ecology-control'&&data.action==='viewport'){
      if(Number.isFinite(data.hostHeight)&&data.hostHeight>=200&&data.hostHeight<=5000)hostHeight=data.hostHeight;
      size();
    }else if(data.type===TYPE){
      if(data.action==='focus-first'){focusBoundary(false);return;}if(data.action==='focus-last'){focusBoundary(true);return;}
      if(typeof data.expanded==='boolean'){
        expanded=data.expanded;if(Number.isFinite(data.hostHeight)&&data.hostHeight>=200&&data.hostHeight<=5000)hostHeight=data.hostHeight;
        root.classList.toggle('media-expanded-view',expanded);size();
      }
    }
  });
  document.addEventListener('keydown',event=>{
    if(!expanded||event.defaultPrevented||event.isComposing||event.altKey||event.ctrlKey||event.metaKey||document.querySelector('dialog[open]'))return;
    if(event.key==='Escape'){event.preventDefault();reply('close');return;}
    if(event.key==='Tab'){
      const list=controls(),boundary=event.shiftKey?list[0]:list.at(-1);
      if(!list.length||document.activeElement===boundary){event.preventDefault();reply(list.length?'focus-close':'focus-start');}
    }
  });
  const main=document.getElementById('player-main');if(main&&'ResizeObserver'in window)new ResizeObserver(size).observe(main);
  window.addEventListener('resize',size);document.fonts?.ready.then(size);
  size();reply('ready');parent.postMessage({type:'ecology-photo-ready'},'*');
})();
