/* The interface owns its theme; embedded research animations keep their own visuals and clock. */
(() => {
  'use strict';
  if (window.EcologyTheme) return;
  const root = document.documentElement;
  const key = 'ecology-color-theme';
  const valid = value => value === 'light' || value === 'dark';
  const imageListeners = new WeakMap();
  let theme = 'light';
  let storageAvailable = true;
  let globalButton;

  function readSaved() {
    try {
      const value = localStorage.getItem(key);
      storageAvailable = true;
      return valid(value) ? value : 'light';
    } catch (_) {
      storageAvailable = false;
      return theme;
    }
  }

  function updateButton(button) {
    const next = theme === 'light' ? 'dark' : 'light';
    const label = next === 'dark' ? '深色' : '淺色';
    if (button.textContent !== label) button.textContent = label;
    button.setAttribute('aria-label', `切換為${label}模式`);
    button.setAttribute('title', `切換為${label}模式`);
    button.dataset.themeNext = next;
  }

  function updateImages() {
    document.querySelectorAll('img[data-theme-light][data-theme-dark]').forEach(img => {
      const selectedTheme = theme;
      const src = img.getAttribute(`data-theme-${selectedTheme}`);
      if (!src) return;
      if (img.getAttribute('src') === src && img.dataset.themeImageReady === selectedTheme) return;
      imageListeners.get(img)?.();
      img.removeAttribute('data-theme-image-ready');
      const finish = () => {
        cleanup();
        if (theme === selectedTheme && img.getAttribute('src') === src) {
          img.dataset.themeImageReady = selectedTheme;
        }
      };
      const cleanup = () => {
        img.removeEventListener('load', finish);
        img.removeEventListener('error', finish);
        imageListeners.delete(img);
      };
      imageListeners.set(img, cleanup);
      img.addEventListener('load', finish, {once: true});
      img.addEventListener('error', finish, {once: true});
      if (img.getAttribute('src') !== src) img.setAttribute('src', src);
      if (img.complete) finish();
    });
  }

  function apply(next, persist, reason) {
    if (!valid(next)) return getState();
    const changed = theme !== next;
    theme = next;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    if (persist) {
      try { localStorage.setItem(key, theme); storageAvailable = true; }
      catch (_) { storageAvailable = false; }
    }
    document.querySelectorAll('[data-ecology-theme-toggle]').forEach(updateButton);
    updateImages();
    if (changed) window.dispatchEvent(new CustomEvent('ecologythemechange', {detail: {theme, reason}}));
    return getState();
  }

  function getState() {
    return {theme, defaultTheme: 'light', storageKey: key, storageAvailable};
  }
  const setTheme = next => apply(next, true, 'user');
  const toggle = () => setTheme(theme === 'light' ? 'dark' : 'light');
  window.EcologyTheme = {getState, setTheme, toggle};
  apply(readSaved(), false, 'initial');
  root.dataset.themeController = 'ready';

  function makeButton(inline) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `ecology-theme-toggle${inline ? ' ecology-theme-toggle-inline' : ''}`;
    button.dataset.ecologyThemeToggle = '';
    button.addEventListener('click', toggle);
    updateButton(button);
    return button;
  }

  function attachMediaButton(toolbar) {
    if (toolbar.querySelector('[data-ecology-theme-toggle]')) return;
    const button = makeButton(true);
    const close = toolbar.querySelector('.media-expand-close');
    toolbar.insertBefore(button, close);
    // The existing close control sends Tab into the iframe. Keep the new button in that loop.
    close?.addEventListener('keydown', event => {
      if (event.key !== 'Tab' || !event.shiftKey || !toolbar.closest('.is-media-expanded')) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      button.focus({preventScroll: true});
    }, true);
    button.addEventListener('keydown', event => {
      const stage = toolbar.closest('.is-media-expanded');
      const frame = stage?.querySelector(':scope > iframe');
      if (event.key !== 'Tab' || !event.shiftKey || !frame) return;
      event.preventDefault();
      frame.focus({preventScroll: true});
      frame.contentWindow?.postMessage({type: 'ecology-media-expand', action: 'focus-last'}, '*');
    });
  }

  function attachControls() {
    if (!document.body) return;
    if (!globalButton) {
      globalButton = makeButton(false);
      globalButton.id = 'ecology-theme-toggle';
    }
    const target = document.querySelector('.ecology-sidebar-ui') || document.body;
    if (globalButton.parentElement !== target) target.append(globalButton);
    document.querySelectorAll('.media-expand-toolbar').forEach(attachMediaButton);
    updateImages();
  }

  function initialize() {
    attachControls();
    new MutationObserver(attachControls).observe(document.body, {subtree: true, childList: true});
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, {once: true});
  else initialize();

  window.addEventListener('storage', event => {
    if (event.key !== key && event.key !== null) return;
    apply(valid(event.newValue) ? event.newValue : 'light', false, 'storage');
  });
  window.addEventListener('pageshow', () => apply(readSaved(), false, 'pageshow'));
  window.addEventListener('mediaexpandchange', event => {
    root.dataset.themeMediaExpanded = String(!!event.detail?.expanded);
    const stage = document.getElementById(event.detail?.stageId || '');
    const toolbar = stage?.querySelector('.media-expand-toolbar');
    if (toolbar) attachMediaButton(toolbar);
  });
})();
