(() => {
  'use strict';
  const root = document.querySelector('main');
  const audio = document.getElementById('biotwang-audio');
  if (!root) return;
  const api = () => window.caseAnimation;
  const sourceFiles = new Set([
    '../assets/brydes-whale-mariana-noaa-original.JPG',
    'assets/spectrogram-low-frequency-only.png',
    '../assets/paper-figure-1.webp',
    '../assets/paper-figure-3.webp'
  ]);
  let lastHeight = 0, sizeFrame = null;

  function pause() {
    try { api()?.pause(); }
    finally { audio?.pause(); }
  }

  function useHostHeight(height) {
    if (!Number.isFinite(height) || height < 200 || height > 5000) return;
    const stageHeight = Math.max(220, Math.min(360, height - 540));
    document.documentElement.style.setProperty('--embed-stage-height', `${stageHeight}px`);
  }

  function reportSize() {
    sizeFrame = null;
    const height = Math.max(1, Math.ceil(root.getBoundingClientRect().height));
    if (height === lastHeight) return;
    lastHeight = height;
    if (parent !== window) parent.postMessage({type:'ecology-size', height}, '*');
  }

  function queueSize() {
    if (sizeFrame === null) sizeFrame = requestAnimationFrame(reportSize);
  }

  addEventListener('message', event => {
    if (event.source !== parent || !event.data || typeof event.data !== 'object') return;
    const data = event.data;
    if (data.type !== 'ecology-control') return;
    if (data.action === 'pause') {
      pause();
    } else if (data.action === 'seek' && Number.isFinite(data.time) && data.time >= 0 && data.time <= 88) {
      pause();
      api()?.seek(data.time);
      pause();
    } else if (data.action === 'viewport') {
      useHostHeight(data.hostHeight);
      queueSize();
    }
  });

  // The hidden gallery stays in the accepted document; its visible link opens the standalone page.
  document.querySelectorAll('a[href="#source-gallery"]').forEach(link => {
    link.href = 'index.html#source-gallery';
    link.target = '_blank';
    link.rel = 'noopener';
    link.addEventListener('click', pause);
  });

  // Intercept only an explicit source-button click, before the original modal handler.
  document.addEventListener('click', event => {
    const button = event.target instanceof Element ? event.target.closest('#open-source') : null;
    if (!button || button.disabled) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const sourceFile = api()?.getState().sourceFile;
    pause();
    if (sourceFiles.has(sourceFile)) {
      window.open(new URL(sourceFile, location.href).href, '_blank', 'noopener');
    }
  }, true);

  // Initial sizing is independent of the iframe's own height and playback clock.
  try { useHostHeight(parent.innerHeight); } catch (_) {}
  const observer = new ResizeObserver(queueSize);
  observer.observe(root);
  document.fonts?.ready.then(queueSize);
  document.addEventListener('load', queueSize, true);
  addEventListener('resize', queueSize);
  document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
  addEventListener('pagehide', pause);
  addEventListener('unload', () => {
    observer.disconnect();
    if (sizeFrame !== null) cancelAnimationFrame(sizeFrame);
  }, {once:true});
  queueSize();
})();
