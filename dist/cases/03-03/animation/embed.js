/* The accepted audio player owns playback, seeking and scenes. This file only bridges the host. */
(() => {
  'use strict';
  if (parent === window) return;
  const root = document.documentElement;
  const TYPE = 'ecology-media-expand';
  const phaseNames = ['intro', 'listen', 'spectra', 'training', 'compare', 'labels', 'known-results', 'unfamiliar-results'];
  let expanded = false, lastHeight = 0, sizeScheduled = false, lastStateKey = '', wasReady = false;
  let timer = null, resizeObserver = null;
  root.classList.add('embedded-acoustic');

  function theme() {
    try {
      const value = parent.EcologyTheme?.getState().theme || parent.document.documentElement.dataset.theme;
      const selected = value === 'dark' ? 'dark' : 'light';
      if (root.dataset.theme !== selected) root.dataset.theme = selected;
    } catch (_) { /* A cross-origin document keeps the original player's theme. */ }
  }
  theme();
  new MutationObserver(theme).observe(root, {attributes: true, attributeFilter: ['data-theme']});
  try { parent.addEventListener('ecologythemechange', theme); } catch (_) {}

  const post = (type, extra = {}) => parent.postMessage({type, ...extra}, location.origin);
  function getState() {
    const main = document.getElementById('teachingAudio');
    const preview = document.getElementById('previewAudio');
    const player = document.getElementById('player');
    const playButton = document.getElementById('playButton');
    const errorPanel = document.getElementById('error');
    const error = errorPanel && !errorPanel.hidden ? errorPanel.querySelector('[data-error-copy]')?.textContent.trim() || '音訊載入失敗。' : null;
    const phase = player?.hasAttribute('data-phase') ? Number(player.dataset.phase) : -1;
    const appReady = !!playButton && !playButton.disabled && Number.isInteger(phase) && phase >= 0 && phase < phaseNames.length;
    const ready = appReady && !!main && main.readyState >= 1;
    const playing = !!main && !main.paused && !main.ended;
    const previewPlaying = !!preview && !preview.paused && !preview.ended;
    return {
      ready, error, loading: !error && (!ready || (previewPlaying && preview.readyState < 2)),
      playing, time: main?.currentTime || 0, previewPlaying, duration: 96,
      phaseId: phaseNames[phase] || null, phase,
      selectedTime: Number(document.getElementById('seek')?.value || 0),
      expanded, theme: root.dataset.theme === 'dark' ? 'dark' : 'light'
    };
  }
  function report(force = false) {
    const state = getState();
    const key = JSON.stringify([state.ready, state.loading, state.error, state.playing, state.previewPlaying, state.phaseId, state.theme, Math.floor(state.time), state.expanded]);
    if (force || key !== lastStateKey) {
      lastStateKey = key;
      post('ecology-acoustic-state', {state});
    }
    if (state.ready && !wasReady) post('ecology-acoustic-ready');
    wasReady = state.ready;
  }
  function pause() {
    const state = getState();
    document.getElementById('teachingAudio')?.pause();
    document.getElementById('previewAudio')?.pause();
    if (state.playing || state.previewPlaying) {
      const status = document.getElementById('status');
      if (status) status.textContent = '已暫停。按繼續播放可接著看。';
    }
    report(true);
    return getState();
  }
  function retry() {
    document.getElementById('retryButton')?.click();
    report(true);
    return getState();
  }
  window.EcologyAcousticPlayer = {getState, pause, retry};

  function size() {
    if (sizeScheduled) return;
    sizeScheduled = true;
    requestAnimationFrame(() => {
      sizeScheduled = false;
      const player = document.getElementById('player');
      if (!player) return;
      const height = Math.ceil(player.getBoundingClientRect().height);
      if (height >= 300 && height <= 7000 && height !== lastHeight) {
        lastHeight = height;
        post('ecology-size', {height});
      }
    });
  }
  function controls() {
    return [...document.querySelectorAll('a[href],button,input,select,textarea,summary,[tabindex]')].filter(node =>
      !node.disabled && node.tabIndex >= 0 && !node.closest('[hidden],[inert],[aria-hidden="true"]') &&
      node.getClientRects().length && getComputedStyle(node).visibility !== 'hidden');
  }
  function focus(last) {
    if (!expanded) return;
    const list = controls(), target = last ? list.at(-1) : list[0];
    if (target) target.focus();
    else post(TYPE, {action: 'focus-start'});
  }
  window.addEventListener('message', event => {
    if (event.source !== parent || event.origin !== location.origin || !event.data || typeof event.data !== 'object') return;
    const message = event.data;
    if (message.type === 'ecology-control') {
      if (message.action === 'pause') pause();
      else if (message.action === 'retry') retry();
      else if (message.action === 'state') report(true);
      else if (message.action === 'viewport') size();
      return;
    }
    if (message.type !== TYPE) return;
    if (typeof message.expanded === 'boolean') {
      const changed = expanded !== message.expanded;
      expanded = message.expanded;
      root.classList.toggle('media-expanded-view', expanded);
      if (changed && !expanded) scrollTo(0, 0);
      size();
      if (changed) report(true);
    }
    if (message.action === 'focus-first') focus(false);
    else if (message.action === 'focus-last') focus(true);
  });
  document.addEventListener('keydown', event => {
    if (!expanded || event.defaultPrevented || event.isComposing || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      post(TYPE, {action: 'close'});
    } else if (event.key === 'Tab') {
      const list = controls(), boundary = event.shiftKey ? list[0] : list.at(-1);
      if (!list.length || document.activeElement === boundary) {
        event.preventDefault();
        post(TYPE, {action: list.length ? 'focus-close' : 'focus-start'});
      }
    }
  });

  function resumeReporting() {
    if (!timer) timer = setInterval(() => { theme(); report(); }, 250);
    theme(); report(true); size();
  }
  function start() {
    const player = document.getElementById('player');
    if (player && 'ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(size);
      resizeObserver.observe(player);
    }
    for (const media of document.querySelectorAll('#teachingAudio,#previewAudio')) {
      for (const name of ['loadedmetadata', 'seeked', 'play', 'pause', 'ended', 'error', 'emptied', 'waiting', 'canplay']) {
        media.addEventListener(name, () => { report(true); size(); });
      }
    }
    document.fonts?.ready.then(size);
    resumeReporting();
    post(TYPE, {action: 'ready'});
  }
  window.addEventListener('resize', size);
  window.addEventListener('pagehide', () => { clearInterval(timer); timer = null; });
  window.addEventListener('pageshow', () => { if (document.readyState !== 'loading') resumeReporting(); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once: true});
  else start();
})();
