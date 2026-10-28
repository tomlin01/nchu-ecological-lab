(() => {
  'use strict';
  const main = document.querySelector('main');
  let queued = false, lastHeight = 0;
  function hostSize() {
    try {
      const height = parent.innerHeight;
      if (Number.isFinite(height)) document.documentElement.style.setProperty('--embed-stage-height', `${Math.max(240, Math.min(380, height - 520))}px`);
    } catch (_) {}
  }
  function reportSize() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      const measured = main.getBoundingClientRect().height;
      if (!Number.isFinite(measured) || measured <= 0) return;
      const height = Math.max(400, Math.ceil(measured) + 2);
      if (height !== lastHeight) {
        lastHeight = height;
        if (parent !== window) parent.postMessage({type:'ecology-size', height}, '*');
      }
    });
  }
  function pause() { window.caseAnimation?.pause(); }
  function sourceFrom(target) {
    if (target.id === 'open-source') return window.caseAnimation?.getState().source?.src;
    if (target.matches('.record-button')) return target.querySelector('img')?.getAttribute('src');
    if (target.matches('#batch-photo-group > g')) return target.querySelector('image')?.getAttribute('href');
    const index = [...document.querySelectorAll('#batch-photo-links button')].indexOf(target);
    return index < 0 ? null : document.querySelectorAll('.record-button img')[index]?.getAttribute('src');
  }
  function openOriginal(event) {
    const target = event.target.closest('#open-source,.record-button,#batch-photo-links button,#batch-photo-group > g');
    if (!target || target.disabled) return;
    const source = sourceFrom(target);
    if (!source) return;
    event.preventDefault(); event.stopImmediatePropagation(); pause();
    window.open(new URL(source, location.href).href, '_blank', 'noopener');
  }
  // A full original opens outside the iframe, avoiding a modal taller than the page viewport.
  document.addEventListener('click', openOriginal, true);
  document.addEventListener('keydown', event => {
    if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('#batch-photo-group > g')) openOriginal(event);
  }, true);
  addEventListener('message', event => {
    if (event.source !== parent || !event.data || event.data.type !== 'ecology-control') return;
    const data = event.data, player = window.caseAnimation;
    if (!player) return;
    if (data.action === 'pause') player.pause();
    else if (data.action === 'seek' && Number.isFinite(data.time)) player.seek(Math.max(0, Math.min(60, data.time)));
    else return;
    reportSize();
  });
  const resize = new ResizeObserver(reportSize); resize.observe(main);
  const changes = new MutationObserver(reportSize);
  changes.observe(main, {subtree:true, attributes:true, attributeFilter:['hidden','data-phase','data-layout','data-mode','open']});
  main.addEventListener('load', reportSize, true);
  document.fonts?.ready.then(reportSize);
  addEventListener('resize', () => { hostSize(); reportSize(); });
  addEventListener('load', reportSize);
  addEventListener('pageshow', reportSize);
  addEventListener('beforeprint', pause);
  addEventListener('afterprint', () => { pause(); reportSize(); });
  addEventListener('pagehide', pause);
  document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
  addEventListener('unload', () => { resize.disconnect(); changes.disconnect(); }, {once:true});
  hostSize(); reportSize();
})();
