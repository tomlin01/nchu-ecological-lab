/* Presentation-only bridge. The original player keeps its clock, source media and controls. */
(() => {
  'use strict';
  if (window.EcologyAnimationTheme) return;
  const root = document.documentElement;
  const key = 'ecology-color-theme';
  const valid = value => value === 'light' || value === 'dark';
  let current = null, parentObserved = false;
  const observer = new MutationObserver(sync);

  function selectedTheme() {
    if (parent !== window) {
      try {
        const theme = parent.EcologyTheme?.getState().theme || parent.document.documentElement.dataset.theme;
        if (valid(theme)) return theme;
      } catch (_) { /* A standalone or different-origin view uses its own saved preference. */ }
    }
    try {
      const theme = localStorage.getItem(key);
      return valid(theme) ? theme : 'light';
    } catch (_) { return current || 'light'; }
  }
  function sync() {
    const theme = selectedTheme();
    if (theme === current && root.dataset.animationTheme === theme && root.dataset.theme === theme) return;
    current = theme;
    root.dataset.theme = theme;
    root.dataset.animationTheme = theme;
    root.style.colorScheme = theme;
    dispatchEvent(new CustomEvent('ecology-animation-themechange', {detail: {theme}}));
  }
  function start() {
    if (parent !== window && !parentObserved) {
      try {
        observer.observe(parent.document.documentElement, {attributes: true, attributeFilter: ['data-theme']});
        parent.addEventListener('ecologythemechange', sync);
        parentObserved = true;
      } catch (_) {}
    }
    sync();
  }
  addEventListener('storage', event => { if (event.key === key || event.key === null) sync(); });
  addEventListener('pageshow', start);
  addEventListener('pagehide', () => {
    observer.disconnect();
    try { if (parentObserved) parent.removeEventListener('ecologythemechange', sync); } catch (_) {}
    parentObserved = false;
  });
  window.EcologyAnimationTheme = {getState: () => ({theme: current, caseId: root.dataset.animationCase, parentObserved})};
  start();
})();
