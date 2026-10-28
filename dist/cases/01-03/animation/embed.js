(() => {
  'use strict';
  const main = document.querySelector('main');
  let pendingSize = false, lastHeight = 0;
  function hostHeight(height) {
    if (!Number.isFinite(height) || height < 200 || height > 5000) return;
    // A desktop scene-host >=458px preserves the accepted 320px marker.
    document.documentElement.style.setProperty('--embed-stage-height', `${Math.max(460, Math.min(540, height - 440))}px`);
  }
  try { hostHeight(parent.innerHeight); } catch (_) {}
  function reportSize() {
    if (pendingSize) return;
    pendingSize = true;
    requestAnimationFrame(() => {
      pendingSize = false;
      const height = Math.max(400, Math.ceil(main.getBoundingClientRect().height + 2));
      if (height !== lastHeight) {
        lastHeight = height;
        parent.postMessage({type:'ecology-size',height}, '*');
      }
    });
  }
  function coreToMaster(value) {
    const t = Math.max(0, Math.min(82, value));
    return t < 35 ? t : t + 7;
  }
  addEventListener('message', event => {
    if (event.source !== parent || event.data?.type !== 'ecology-control') return;
    const data = event.data, player = window.caseAnimation;
    if (data.action === 'pause') player?.pause();
    if (data.action === 'viewport') { hostHeight(data.hostHeight); reportSize(); }
    if (data.action === 'seek' && Number.isFinite(data.time)) {
      const time = data.timeDomain === 'core' ? coreToMaster(data.time) : Math.max(0, Math.min(103, data.time));
      player?.seek(time); player?.pause();
    }
  });
  const allSources = document.querySelector('.source-actions a');
  if (allSources) {
    allSources.href = 'index.html#source-gallery'; allSources.target = '_blank'; allSources.rel = 'noopener';
    allSources.addEventListener('click', () => window.caseAnimation?.pause());
  }
  // The embedded source button opens the full local image on explicit user click.
  // The byte-identical standalone animation retains its original dialog.
  document.addEventListener('click', event => {
    const button = event.target.closest('#open-source');
    if (!button || button.disabled) return;
    const player = window.caseAnimation, source = player?.getState().currentSource;
    if (!['auv','colony','community'].includes(source)) return;
    event.preventDefault(); event.stopImmediatePropagation(); player.pause();
    const file = source === 'auv' ? 'auv-figure-9.webp' : 'figure-7.png';
    window.open(new URL(`assets/sources/${file}`, location.href).href, '_blank', 'noopener');
  }, true);
  new ResizeObserver(reportSize).observe(main);
  document.fonts?.ready.then(reportSize);
  document.addEventListener('load', reportSize, true);
  addEventListener('load', reportSize);
  reportSize();
})();
