// The accepted v09 app owns the scene and clock; this bridge owns host communication.
const root=document.documentElement,player=document.getElementById('reef-player');
const EXPAND='ecology-media-expand';
const RETRY_KEY=`ecology-reef-retry:${location.pathname}`;
root.classList.add('embedded-reef');
let expanded=false,suspended=false,loading=true,localError=null,requestedTime=0,requestedTheme=null;
let lastState='',lastHeight=0,sizeFrame=0,statusTimer=0,lastPauseReason='initial';
try{
  const saved=sessionStorage.getItem(RETRY_KEY);sessionStorage.removeItem(RETRY_KEY);
  if(saved!==null&&Number.isFinite(Number(saved)))requestedTime=Math.max(0,Math.min(20,Number(saved)));
}catch{}
const core=()=>window.ReefStudy;
const post=(type,extra={})=>{if(parent!==window)parent.postMessage({type,...extra},location.origin);};

function getState(){
  const state=core()?.getState();
  const error=localError||(!document.getElementById('error').hidden?document.querySelector('#error p').textContent:null);
  return {ready:!!state?.ready,loading:loading&&!error,error,time:state?.ready?state.time:requestedTime,duration:20,
    playing:!!state?.playing,theme:state?.theme||requestedTheme||root.dataset.theme,labels:!!state?.labels,
    view:state?.view||'overview',reducedMotion:!!state?.reducedMotion,suspended,expanded,lastPauseReason};
}
function report(force=false){
  const state=getState(),key=JSON.stringify(state);
  if(force||key!==lastState){lastState=key;post('ecology-reef-state',{state});}
}
function size(){
  if(sizeFrame)return;
  sizeFrame=requestAnimationFrame(()=>{
    sizeFrame=0;
    const height=Math.ceil(player.getBoundingClientRect().height);
    if(height>=300&&height<=7000&&height!==lastHeight){lastHeight=height;post('ecology-size',{height});}
  });
}
function pause(reason='host-pause'){lastPauseReason=reason;core()?.pause();report();}
function play(){if(!suspended&&!document.hidden&&core()?.getState().ready)core().play();report();}
function seek(time){
  if(typeof time!=='number'||!Number.isFinite(time))return;
  requestedTime=Math.max(0,Math.min(20,time));
  if(core()?.getState().ready)core().seek(requestedTime);
  report();
}
function setTheme(theme){
  if(theme!=='light'&&theme!=='dark')return;
  requestedTheme=theme;
  if(core())core().setTheme(theme);else root.dataset.theme=theme;
  report();
}
function suspend(reason='host-suspend'){suspended=true;pause(reason);}
function resume(){suspended=false;report();}
function retry(){
  pause('retry');
  try{sessionStorage.setItem(RETRY_KEY,String(getState().time));}catch{}
  location.reload();
}
function syncTheme(){
  if(parent===window)return;
  try{setTheme(parent.EcologyTheme?.getState().theme||parent.document.documentElement.dataset.theme);}catch{}
}
function hostViewport(message){
  if(typeof message.hostHeight==='number'&&Number.isFinite(message.hostHeight)){
    root.style.setProperty('--reef-host-height',`${Math.max(320,Math.min(1800,message.hostHeight))}px`);
  }
  size();
}
function focusable(){
  return [...document.querySelectorAll('a[href],button,input,summary,[tabindex]')].filter(node=>
    !node.disabled&&node.tabIndex>=0&&!node.closest('[hidden],[inert],[aria-hidden="true"]')&&node.getClientRects().length&&getComputedStyle(node).visibility!=='hidden');
}
function focusBoundary(last){const list=focusable(),target=last?list.at(-1):list[0];if(target)target.focus();else post(EXPAND,{action:'focus-start'});}

addEventListener('message',event=>{
  if(event.source!==parent||event.origin!==location.origin||!event.data||typeof event.data!=='object')return;
  const message=event.data;
  if(message.type==='ecology-control'){
    if(message.action==='play')play();
    else if(message.action==='pause')pause(message.reason||'host-pause');
    else if(message.action==='seek')seek(message.time??message.seconds);
    else if(message.action==='theme')setTheme(message.theme);
    else if(message.action==='suspend')suspend(message.reason||'host-suspend');
    else if(message.action==='resume')resume();
    else if(message.action==='retry')retry();
    else if(message.action==='state')report(true);
    else if(message.action==='viewport')hostViewport(message);
    return;
  }
  if(message.type!==EXPAND)return;
  hostViewport(message);
  if(typeof message.expanded==='boolean'){
    expanded=message.expanded;root.classList.toggle('media-expanded-view',expanded);
    if(!expanded)scrollTo(0,0);
    size();report();
  }
  if(expanded&&message.action==='focus-first')focusBoundary(false);
  else if(expanded&&message.action==='focus-last')focusBoundary(true);
});
document.addEventListener('keydown',event=>{
  if(!expanded||event.defaultPrevented||event.isComposing||event.altKey||event.ctrlKey||event.metaKey)return;
  if(event.key==='Escape'){event.preventDefault();post(EXPAND,{action:'close'});}
  else if(event.key==='Tab'){
    const list=focusable(),boundary=event.shiftKey?list[0]:list.at(-1);
    if(!list.length||document.activeElement===boundary){event.preventDefault();post(EXPAND,{action:list.length?'focus-close':'focus-start'});}
  }
});
document.addEventListener('click',event=>{
  if(event.target.closest('#retry')){event.preventDefault();event.stopImmediatePropagation();retry();}
  else if(suspended&&event.target.closest('#play')){event.preventDefault();event.stopImmediatePropagation();}
},true);
for(const name of ['click','input'])player.addEventListener(name,()=>requestAnimationFrame(()=>{report();size();}));
document.addEventListener('visibilitychange',()=>{if(document.hidden)pause('document-hidden');});
addEventListener('beforeprint',()=>pause('before-print'));
addEventListener('resize',()=>{if(!expanded)scrollTo(0,0);size();});
const observer=new ResizeObserver(size);observer.observe(player);
const parentThemeObserver=new MutationObserver(syncTheme);
try{
  if(parent!==window){
    parentThemeObserver.observe(parent.document.documentElement,{attributes:true,attributeFilter:['data-theme']});
    parent.addEventListener('ecologythemechange',syncTheme);
  }
}catch{}
function startReporting(){if(!statusTimer)statusTimer=setInterval(report,250);}
addEventListener('pagehide',()=>{pause('page-hidden');clearInterval(statusTimer);statusTimer=0;});
addEventListener('pageshow',()=>{startReporting();size();report(true);});
window.EcologyReefPlayer={play,pause,seek,setTheme,suspend,resume,retry,getState};
window.EcologyReefEmbed={getState:()=>({expanded,height:lastHeight,theme:root.dataset.theme,scrollY})};
syncTheme();startReporting();report(true);size();
post(EXPAND,{action:'ready'});
try{
  await import('./app.mjs');
  loading=false;
  if(!core()?.getState().ready)throw new Error(document.querySelector('#error p').textContent);
  core().pause();core().seek(requestedTime);
  if(requestedTheme)setTheme(requestedTheme);else syncTheme();
  report(true);size();post('ecology-reef-ready',{state:getState()});
}catch(error){
  loading=false;localError=error?.message||'場景檔案沒有載入完成，請重新載入。';
  document.getElementById('loading').hidden=true;document.getElementById('error').hidden=false;
  document.querySelector('#error p').textContent=localError;
  document.querySelectorAll('.transport button,.transport input,.view-bar button').forEach(node=>node.disabled=true);
  post('ecology-reef-error',{error:localError,state:getState()});report(true);size();
}
document.fonts?.ready.then(size);
