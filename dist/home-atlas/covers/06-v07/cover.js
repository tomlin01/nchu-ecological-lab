(() => {
  'use strict';
  let ready = false, request = 0, appliedTheme = null;
  const host = document.querySelector('#topic-06 .media-art-host');

  async function loadImages(theme) {
    const token = ++request;
    ready = false;
    for (const source of host.querySelectorAll('source[data-theme-light][data-theme-dark]')) {
      source.setAttribute('srcset', source.getAttribute(`data-theme-${theme}`));
    }
    for (const image of host.querySelectorAll('img[data-theme-light][data-theme-dark]')) image.src = image.getAttribute(`data-theme-${theme}`);
    const images = [...host.querySelectorAll('img')];
    images.forEach(image => { image.loading = 'eager'; });
    await Promise.all(images.map(image => image.decode().catch(() => {})));
    if (token !== request) return;
    ready = images.every(image => image.complete && image.naturalWidth > 0);
    dispatchEvent(new Event('resize'));
  }

  function sync() {
    const state = window.AtlasHome?.getState();
    if (!state?.initialized || state.activeTopic !== '06' || state.topicNavigationPlaying || document.hidden) return;
    const theme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    if (theme === appliedTheme) return;
    appliedTheme = theme;
    loadImages(theme).catch(console.error);
  }

  window.CoverMedia = {getState: () => ({mode: 'cg', ready})};
  window.addEventListener('ecologythemechange', sync);
  document.addEventListener('visibilitychange', sync);
  document.addEventListener('atlas-hover-reset', () => setTimeout(sync, 0));
  setInterval(sync, 150);
  sync();
})();
