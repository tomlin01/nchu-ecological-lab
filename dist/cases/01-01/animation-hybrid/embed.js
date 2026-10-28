(() => {
  'use strict';
  const main = document.querySelector('main');
  let generation = null, readySent = false, lastState = '', lastHeight = 0, queued = false;
  const api = () => window.caseAnimation;
  function useHostHeight(height) {
    if (!Number.isFinite(height) || height < 200 || height > 5000) return;
    document.documentElement.style.setProperty('--embed-stage-height', `${Math.max(300, Math.min(400, height - 480))}px`);
  }
  try { useHostHeight(parent.innerHeight); } catch (_) {}
  const send = (type, payload = {}) => {
    if (parent !== window) parent.postMessage({type,generation,...payload}, '*');
  };
  function reportSize() {
    queued = false;
    const height = Math.max(400, Math.ceil(main.getBoundingClientRect().height + 2));
    if (height !== lastHeight) { lastHeight = height; send('ecology-size', {height}); }
  }
  function queueSize() { if (!queued) { queued = true; requestAnimationFrame(reportSize); } }
  function reportState(force = false) {
    const state = api()?.getState();
    if (!state || generation === null) return;
    const summary = {time:state.time,duration:state.duration,playing:state.playing,ready:state.ready,phase:state.phase};
    if (summary.ready && !readySent) { readySent = true; send('ecology-ready', {state:summary}); }
    const signature = JSON.stringify(summary);
    if (force || signature !== lastState) { lastState = signature; send('ecology-state', {state:summary}); }
  }
  addEventListener('message', event => {
    if (event.source !== parent || !event.data || event.data.type !== 'ecology-control') return;
    const data = event.data;
    if (data.action === 'hello' && Number.isSafeInteger(data.generation)) {
      generation = data.generation; readySent = false; useHostHeight(data.hostHeight);
      api()?.pause(); reportState(true); queueSize();
    } else if (data.action === 'viewport') {
      useHostHeight(data.hostHeight); queueSize();
    } else if (data.action === 'pause') {
      api()?.pause(); reportState(true);
    } else if (data.action === 'seek' && Number.isFinite(data.time) && data.time >= 0 && data.time <= 64) {
      api()?.seek(data.time); api()?.pause(); reportState(true);
    }
  });
  const allSources = document.querySelector('.source-actions a');
  if (allSources) {
    allSources.href = 'index.html#source-gallery'; allSources.target = '_blank'; allSources.rel = 'noopener';
    allSources.addEventListener('click', () => { api()?.pause(); reportState(true); });
  }
  document.addEventListener('click', event => {
    const button = event.target.closest('#open-source');
    if (!button || button.disabled) { setTimeout(() => reportState(true), 0); return; }
    const file = api()?.getState().source?.file;
    if (typeof file !== 'string' || !file.startsWith('assets/frames/')) return;
    event.preventDefault(); event.stopImmediatePropagation(); api()?.pause();
    window.open(new URL(file, location.href).href, '_blank', 'noopener');
    reportState(true);
  }, true);
  document.addEventListener('input', () => setTimeout(() => reportState(true), 0), true);
  document.addEventListener('visibilitychange', () => { if (document.hidden) api()?.pause(); reportState(true); });
  addEventListener('pagehide', () => { api()?.pause(); reportState(true); });
  const observer = new ResizeObserver(queueSize); observer.observe(main);
  document.fonts?.ready.then(queueSize); document.addEventListener('load', queueSize, true);
  const timer = setInterval(() => reportState(), 150);
  addEventListener('unload', () => { clearInterval(timer); observer.disconnect(); }, {once:true});
  queueSize();
})();
