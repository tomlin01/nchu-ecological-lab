(() => {
  'use strict';
  const root = document.querySelector('main');
  let generation = null, readySent = false, lastState = '', lastHeight = 0, sizeQueued = false;
  const api = () => window.caseAnimation;
  function useHostHeight(height) {
    if (!Number.isFinite(height) || height < 200 || height > 5000) return;
    const stageHeight = Math.max(240, Math.min(400, height - 600));
    document.documentElement.style.setProperty('--embed-stage-height', `${stageHeight}px`);
  }
  try { useHostHeight(parent.innerHeight); } catch (_) {}
  function send(type, payload = {}) {
    if (parent !== window) parent.postMessage({type, generation, ...payload}, '*');
  }
  function reportSize() {
    sizeQueued = false;
    const height = Math.max(400, Math.ceil(root.getBoundingClientRect().height));
    if (height !== lastHeight) { lastHeight = height; send('ecology-size', {height}); }
  }
  function queueSize() {
    if (!sizeQueued) { sizeQueued = true; requestAnimationFrame(reportSize); }
  }
  function reportState(force = false) {
    const state = api()?.getState();
    if (!state || generation === null) return;
    const summary = {time:state.time, duration:state.duration, playing:state.playing, ready:state.ready, phase:state.phase};
    if (summary.ready && !readySent) { readySent = true; send('ecology-ready', {state:summary}); }
    const signature = JSON.stringify(summary);
    if (force || signature !== lastState) { lastState = signature; send('ecology-state', {state:summary}); }
  }
  addEventListener('message', event => {
    if (event.source !== parent || !event.data || event.data.type !== 'ecology-control') return;
    const data = event.data;
    if (data.action === 'hello' && Number.isSafeInteger(data.generation)) {
      useHostHeight(data.hostHeight);
      generation = data.generation; readySent = false; api()?.pause(); reportState(true); queueSize();
    } else if (data.action === 'viewport') {
      useHostHeight(data.hostHeight); queueSize();
    } else if (data.action === 'pause') {
      api()?.pause(); reportState(true);
    } else if (data.action === 'seek' && Number.isFinite(data.time) && data.time >= 0 && data.time <= 78) {
      api()?.seek(data.time); api()?.pause(); reportState(true);
    }
  });
  // The accepted player keeps its modal; the embed opens only its three source JPEGs.
  const sourceFiles = new Set([
    'assets/frames/20230721230832-00-34.jpg',
    'assets/frames/20230721232832-00-35.jpg',
    'assets/frames/20230721234832-00-35.jpg'
  ]);
  document.addEventListener('click', event => {
    const target = event.target.closest('#open-source,#source-buttons button');
    if (!target) { setTimeout(() => reportState(true), 0); return; }
    if (target.disabled) return;
    event.preventDefault(); event.stopImmediatePropagation(); api()?.pause();
    const state = api()?.getState();
    const buttons = [...document.querySelectorAll('#source-buttons button')];
    const index = target.id === 'open-source' ? state?.selected : buttons.indexOf(target);
    const file = state?.photos?.[index]?.file;
    if (sourceFiles.has(file)) window.open(new URL(file, location.href).href, '_blank', 'noopener');
    reportState(true);
  }, true);
  document.addEventListener('input', () => setTimeout(() => reportState(true), 0), true);
  document.addEventListener('visibilitychange', () => { if (document.hidden) api()?.pause(); reportState(true); });
  addEventListener('pagehide', () => { api()?.pause(); reportState(true); });
  const observer = new ResizeObserver(queueSize); observer.observe(root);
  document.fonts?.ready.then(queueSize);
  document.addEventListener('load', queueSize, true);
  const timer = setInterval(() => reportState(), 150);
  addEventListener('unload', () => { clearInterval(timer); observer.disconnect(); }, {once:true});
  queueSize();
})();
