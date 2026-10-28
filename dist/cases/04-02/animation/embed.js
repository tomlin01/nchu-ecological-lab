/* The accepted bundle owns the 88-second clock; this file only adapts its host UI. */
(() => {
  'use strict';
  const html=document.documentElement,root=document.querySelector('main'),embedded=parent!==window;
  const targetOrigin=location.origin==='null'?'*':location.origin;
  let generation=null,readySent=false,lastState='',lastHeight=0,sizeQueued=false,returnToExpand=false;
  const api=()=>window.caseAnimation;
  const post=(type,payload={})=>{if(embedded)parent.postMessage({type,generation,...payload},targetOrigin);};
  function syncTheme(){
    try{
      const value=embedded?(parent.EcologyTheme?.getState().theme||parent.document.documentElement.dataset.theme):localStorage.getItem('ecology-color-theme');
      html.dataset.theme=value==='dark'?'dark':'light';
    }catch{html.dataset.theme||='light';}
    queueSize();
  }
  function useHostHeight(height){
    if(!Number.isFinite(height)||height<200||height>5000)return;
    html.style.setProperty('--embed-stage-height',`${Math.max(240,Math.min(400,height-600))}px`);
  }
  function reportSize(){
    sizeQueued=false;
    const height=Math.max(400,Math.ceil(root.getBoundingClientRect().height));
    if(height!==lastHeight){lastHeight=height;post('ecology-size',{height});}
  }
  function queueSize(){if(!sizeQueued){sizeQueued=true;requestAnimationFrame(reportSize);}}
  function reportState(force=false){
    const state=api()?.getState();if(!state)return;
    document.querySelectorAll('[data-frame]').forEach(button=>button.disabled=!state.ready);
    const summary={time:state.time,duration:state.duration,playing:state.playing,ready:state.ready,phase:state.phase};
    if(generation===null)return;
    if(summary.ready&&!readySent){readySent=true;post('ecology-ready',{state:summary});}
    const signature=JSON.stringify(summary);
    if(force||signature!==lastState){lastState=signature;post('ecology-state',{state:summary});}
  }
  // One consistent transport across the whole width, above the image and explanation.
  root.insertBefore(document.getElementById('transport'),root.querySelector('.story'));
  document.getElementById('timeline').step=String(1/24);
  document.querySelectorAll('[data-frame]').forEach(button=>button.addEventListener('click',()=>{
    const state=api()?.getState();if(!state?.ready)return;
    api().seek(Math.max(0,Math.min(88,state.time+Number(button.dataset.frame)/24)));reportState(true);
  }));
  document.getElementById('expand-player').addEventListener('click',()=>{
    if(!embedded)return;
    const stage=frameElement?.closest('[data-media-expand-stage]');
    if(stage){returnToExpand=Boolean(parent.EcologyMediaExpand?.open(stage));}
  });
  addEventListener('message',event=>{
    if(event.source!==parent||(location.origin!=='null'&&event.origin!==location.origin)||!event.data||typeof event.data!=='object')return;
    const data=event.data;
    if(data.type==='ecology-media-expand'){
      if(data.expanded===false&&returnToExpand){
        returnToExpand=false;
        requestAnimationFrame(()=>{
          const host=frameElement;
          if(host&&parent.document.activeElement===host&&!host.closest('[inert],[aria-hidden="true"]'))document.getElementById('expand-player').focus({preventScroll:true});
        });
      }
      return;
    }
    if(data.type!=='ecology-control')return;
    if(data.action==='hello'&&Number.isSafeInteger(data.generation)){
      useHostHeight(data.hostHeight);syncTheme();generation=data.generation;readySent=false;api()?.pause();reportState(true);queueSize();
    }else if(data.action==='viewport'){useHostHeight(data.hostHeight);queueSize();}
    else if(data.action==='pause'){api()?.pause();reportState(true);}
    else if(data.action==='play'){api()?.play();reportState(true);}
    else if(data.action==='theme'){syncTheme();}
    else if(data.action==='seek'&&Number.isFinite(data.time)&&data.time>=0&&data.time<=88){api()?.seek(data.time);api()?.pause();reportState(true);}
  });
  // Keep the accepted source-image dialog in this same player document.
  document.addEventListener('click',()=>setTimeout(()=>reportState(true),0));
  document.addEventListener('input',()=>setTimeout(()=>reportState(true),0),true);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)api()?.pause();reportState(true);});
  addEventListener('pagehide',()=>{api()?.pause();reportState(true);});
  const observer=new ResizeObserver(queueSize);observer.observe(root);
  const themeObserver=new MutationObserver(syncTheme);
  if(embedded){try{themeObserver.observe(parent.document.documentElement,{attributes:true,attributeFilter:['data-theme']});parent.addEventListener('ecologythemechange',syncTheme);}catch{}}
  document.fonts?.ready.then(queueSize);document.addEventListener('load',queueSize,true);
  const timer=setInterval(()=>reportState(),150);
  addEventListener('unload',()=>{clearInterval(timer);observer.disconnect();themeObserver.disconnect();if(embedded){try{parent.removeEventListener('ecologythemechange',syncTheme);}catch{}}},{once:true});
  try{useHostHeight(embedded?parent.innerHeight:innerHeight);}catch{}
  syncTheme();queueSize();
})();
