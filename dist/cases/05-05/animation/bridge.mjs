/* Host integration for the accepted ForTy player. No alternate scene or clock. */
const embedded = parent !== window;
const root = document.documentElement;
const TYPE = 'ecology-media-expand';
let player = null, suspended = false, expanded = false;
let hostHeight = null, lastHeight = null, lastSignature = '', queued = false;
let timer = 0, parentObserver = null;
const clamp = (value,min,max) => Math.max(min,Math.min(max,value));
const validTheme = value => value === 'light' || value === 'dark';
const send = message => { if (embedded) parent.postMessage(message,location.origin); };

function state() {
  const current = player?.getState();
  if (!current) return {ready:false,loading:true,time:0,duration:120,playing:false,error:null};
  return {ready:current.ready,loading:current.loading,error:current.error,time:current.time,
    duration:current.duration,playing:current.playing,theme:current.theme,hasAudio:false,
    attempt:current.attempt,expanded,
    scene:current.scene ? {ready:current.scene.ready,time:current.scene.time,chapterIndex:current.scene.chapterIndex} : null};
}
function publish(force = false) {
  const current = state();
  const signature = JSON.stringify(current);
  if (force || signature !== lastSignature) {
    lastSignature = signature;
    send({type:'ecology-forty-state',state:current});
    if (current.error) send({type:'ecology-forty-error',error:current.error,state:current});
  }
}
function fit() {
  queued = false;
  if (!embedded) return;
  const main = document.getElementById('player');
  const transport = document.querySelector('.transport');
  const status = document.getElementById('playerStatus');
  const error = document.getElementById('playerError');
  if (!main || !transport) return;
  const styles = getComputedStyle(main);
  const padding = parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);
  const statusHeight = status?.getClientRects().length ? status.getBoundingClientRect().height + 15 : 0;
  const errorHeight = error?.getClientRects().length ? error.getBoundingClientRect().height + 20 : 0;
  const width = Math.max(240,main.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight));
  // Inline sizing uses the host's requested available height, never the iframe height we just reported.
  // This keeps ResizeObserver and ecology-size from shrinking each other recursively.
  const available = expanded ? innerHeight : hostHeight;
  const controls = transport.getBoundingClientRect().height + statusHeight + errorHeight + padding;
  const sceneHeight = available ? Math.max(180,available - controls - 4) : width * 9 / 16;
  const compositionWidth = Math.min(width,sceneHeight * 16 / 9,1600);
  root.style.setProperty('--forty-composition-width',`${compositionWidth}px`);
  const height = Math.max(300,Math.ceil(main.getBoundingClientRect().height));
  if (!expanded && height !== lastHeight) {
    lastHeight = height;
    send({type:'ecology-size',height});
  }
}
function schedule() {
  publish();
  if (!queued) { queued = true; requestAnimationFrame(fit); }
}
function applyTheme() {
  if (!embedded || !player) return;
  let theme;
  try { theme = parent.EcologyTheme?.getState().theme || parent.document.documentElement.dataset.theme; } catch {}
  if (validTheme(theme) && player.getState().theme !== theme) player.setTheme(theme);
  schedule();
}
function focusable() {
  return [...document.querySelectorAll('#player button,#player input,#composition')].filter(node =>
    !node.disabled && node.tabIndex >= 0 && node.getClientRects().length && getComputedStyle(node).visibility !== 'hidden');
}
function focusEdge(last = false) {
  const items = focusable();
  (last ? items.at(-1) : items[0])?.focus({preventScroll:true});
}
async function control(data) {
  if (!player) return;
  switch (data.action) {
    case 'suspend': suspended = true; player.pause(data.reason || 'host-suspend'); break;
    case 'resume': suspended = false; break;
    case 'pause': player.pause(data.reason || 'host-pause'); break;
    case 'play': if (!suspended) player.play(); break;
    case 'retry': await player.retry(); applyTheme(); break;
    case 'seek': if (Number.isFinite(Number(data.time))) player.seek(Number(data.time)); break;
    case 'theme': if (validTheme(data.theme)) player.setTheme(data.theme); break;
    case 'viewport':
      if (Number.isFinite(data.hostHeight)) hostHeight = clamp(data.hostHeight,240,3000);
      break;
    case 'state': break;
    default: return;
  }
  publish(true); schedule();
}

if (embedded) {
  root.dataset.fortyEmbedded = 'true';
  window.addEventListener('message',event => {
    if (event.source !== parent || event.origin !== location.origin || !event.data || typeof event.data !== 'object') return;
    const data = event.data;
    if (data.type === 'ecology-control') control(data).catch(error => send({type:'ecology-forty-error',error:error.message,state:state()}));
    else if (data.type === TYPE) {
      if (typeof data.expanded === 'boolean') {
        expanded = data.expanded;
        root.dataset.fortyExpanded = String(expanded);
        document.getElementById('expandButton')?.setAttribute('aria-expanded',String(expanded));
        const button = document.getElementById('expandButton');
        if (button) button.textContent = expanded ? '收起放大' : '放大觀看';
      }
      if (data.action === 'focus-first') focusEdge(false);
      else if (data.action === 'focus-last') focusEdge(true);
      schedule();
    }
  });
  document.addEventListener('click',event => {
    if (event.target.closest?.('#expandButton')) {
      event.preventDefault(); event.stopImmediatePropagation();
      send({type:TYPE,action:expanded?'close':'open'});
      return;
    }
    if (suspended && event.target.closest?.('#playButton,#replayButton')) {
      event.preventDefault(); event.stopImmediatePropagation(); publish(true);
    } else requestAnimationFrame(schedule);
  },true);
  document.addEventListener('input',() => requestAnimationFrame(schedule),true);
  document.addEventListener('keydown',event => {
    if (expanded && event.key === 'Escape') {
      event.preventDefault(); event.stopImmediatePropagation(); send({type:TYPE,action:'close'}); return;
    }
    if (expanded && event.key === 'Tab') {
      const items = focusable();
      if ((!event.shiftKey && document.activeElement === items.at(-1)) || (event.shiftKey && document.activeElement === items[0])) {
        event.preventDefault(); event.stopImmediatePropagation(); send({type:TYPE,action:'focus-close'});
      }
    }
  },true);
  window.addEventListener('resize',schedule);
  window.addEventListener('ecology-animation-themechange',applyTheme);
  window.addEventListener('pagehide',() => {
    clearInterval(timer); parentObserver?.disconnect();
    try { parent.removeEventListener('ecologythemechange',applyTheme); } catch {}
  });
  const deadline = performance.now() + 15000;
  while (!window.ForTyPlayer && performance.now() < deadline) await new Promise(resolve => setTimeout(resolve,30));
  player = window.ForTyPlayer;
  if (!player) send({type:'ecology-forty-error',error:'播放器未能啟動。',state:state()});
  else {
    try {
      await player.readyPromise;
      applyTheme();
      try {
        parentObserver = new MutationObserver(applyTheme);
        parentObserver.observe(parent.document.documentElement,{attributes:true,attributeFilter:['data-theme']});
        parent.addEventListener('ecologythemechange',applyTheme);
      } catch {}
      new ResizeObserver(schedule).observe(document.getElementById('player'));
      timer = setInterval(() => { const s=state(); if (s.playing || s.loading || s.error) schedule(); else publish(); },250);
      publish(true);schedule();
      send({type:'ecology-forty-ready',state:state()});send({type:TYPE,action:'ready'});
    } catch (error) { send({type:'ecology-forty-error',error:error.message,state:state()}); }
  }
}

window.ForTyEmbedBridge = {getState:() => ({embedded,suspended,expanded,hostHeight,lastHeight,state:state()}),publish:() => publish(true)};
