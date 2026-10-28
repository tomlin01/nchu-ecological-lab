(() => {
  'use strict';
  const main = document.querySelector('main');
  if (!main) return;

  let queuedFrame = 0;
  let lastHeight = 0;
  function reportSize() {
    if (queuedFrame) return;
    queuedFrame = requestAnimationFrame(() => {
      queuedFrame = 0;
      // Body/document scrollHeight can include the parent's assigned iframe
      // height. Main is content-sized, so reporting it cannot grow that loop.
      const measured = main.getBoundingClientRect().height;
      if (!Number.isFinite(measured) || measured <= 0) return;
      const height = Math.max(400, Math.ceil(measured) + 2);
      if (height === lastHeight) return;
      lastHeight = height;
      if (window.parent !== window) {
        window.parent.postMessage({ type: 'ecology-size', height }, '*');
      }
    });
  }

  function pause() {
    window.caseAnimation?.pause();
  }

  addEventListener('message', event => {
    // Parent-window identity also works for local files with opaque origins.
    if (event.source !== window.parent) return;
    const data = event.data;
    if (!data || typeof data !== 'object' || data.type !== 'ecology-control') return;
    const player = window.caseAnimation;
    if (!player) return;
    if (data.action === 'pause') player.pause();
    else if (data.action === 'seek' && typeof data.time === 'number' && Number.isFinite(data.time)) {
      const actualDuration = player.getState?.().duration;
      const duration = Number.isFinite(actualDuration) && actualDuration > 0 ? actualDuration : 60;
      player.seek(Math.max(0, Math.min(duration, data.time)));
    } else return;
    reportSize();
  });

  const resize = new ResizeObserver(reportSize);
  resize.observe(main);
  // Observe panel visibility and phase changes, not per-frame photo transforms.
  const changes = new MutationObserver(reportSize);
  changes.observe(main, {
    subtree: true, attributes: true,
    attributeFilter: ['hidden', 'data-phase', 'open'],
  });
  main.addEventListener('load', reportSize, true);
  document.fonts?.ready.then(reportSize);
  addEventListener('load', reportSize);
  addEventListener('resize', reportSize);
  addEventListener('pageshow', reportSize);
  addEventListener('beforeprint', pause);
  addEventListener('afterprint', () => { pause(); reportSize(); });
  addEventListener('pagehide', pause);
  document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
  addEventListener('unload', () => {
    resize.disconnect();
    changes.disconnect();
    if (queuedFrame) cancelAnimationFrame(queuedFrame);
  }, { once: true });
  reportSize();
})();
