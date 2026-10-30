import './app.mjs';

(() => {
  'use strict';
  if (parent === window) return;

  const root = document.documentElement;
  const player = document.getElementById('player');
  const expandButton = document.getElementById('expandButton');
  const api = window.BloomPlayer;
  const EXPAND = 'ecology-media-expand';
  const original = Object.fromEntries(
    ['getState', 'play', 'pause', 'replay', 'seek', 'renderAt', 'setTheme', 'retry'].map(name => [name, api[name].bind(api)])
  );
  let expanded = false;
  let suspended = false;
  let height = 0;
  let hostHeight = innerHeight;
  let hostWidth = innerWidth;
  let sizeFrame = 0;
  let stateTimer = 0;
  let lastState = '';
  let wasReady = false;
  let lastError = null;

  root.classList.add('bloom-embedded');

  function post(type, extra = {}) {
    parent.postMessage({type, ...extra}, location.origin);
  }

  function getState() {
    return {...original.getState(), expanded, suspended};
  }

  function publish(force = false) {
    const state = getState();
    const key = JSON.stringify([
      Math.floor(state.time * 5), state.ready, state.loading, state.error, state.playing,
      state.theme, state.attempt, state.lastPauseReason, expanded, suspended
    ]);
    if (force || key !== lastState) {
      lastState = key;
      post('ecology-bloom-state', {state});
    }
    if (state.ready && !wasReady) post('ecology-bloom-ready', {state});
    if (state.error && state.error !== lastError) post('ecology-bloom-error', {error: state.error, state});
    wasReady = state.ready;
    lastError = state.error;
    // Read the player's clock while it runs. This timer never advances the animation.
    if (state.playing && !stateTimer) {
      stateTimer = setTimeout(() => { stateTimer = 0; publish(); }, 200);
    } else if (!state.playing && stateTimer) {
      clearTimeout(stateTimer);
      stateTimer = 0;
    }
  }

  function size() {
    if (sizeFrame) return;
    sizeFrame = requestAnimationFrame(() => {
      sizeFrame = 0;
      const next = Math.ceil(player.getBoundingClientRect().height);
      if (next >= 300 && next <= 7000 && next !== height) {
        height = next;
        post('ecology-size', {height});
      }
    });
  }

  function viewport(message) {
    if (Number.isFinite(message.hostHeight)) {
      hostHeight = Math.max(240, Math.min(2400, message.hostHeight));
      root.style.setProperty('--bloom-host-height', `${hostHeight}px`);
    }
    if (Number.isFinite(message.hostWidth)) hostWidth = message.hostWidth;
    size();
  }

  function visible(node) {
    return Boolean(node?.isConnected && !node.closest('[hidden],[inert],[aria-hidden="true"]') &&
      node.getClientRects().length && getComputedStyle(node).visibility !== 'hidden');
  }

  function focusable() {
    return [...player.querySelectorAll('a[href],button,input,summary,[tabindex]')]
      .filter(node => !node.disabled && node.tabIndex >= 0 && visible(node));
  }

  function focusBoundary(last) {
    const items = focusable();
    const target = last ? items.at(-1) : items[0];
    if (target) target.focus({preventScroll: true});
    else post(EXPAND, {action: 'focus-start'});
  }

  function parentExpanded(value) {
    const changed = expanded !== Boolean(value);
    expanded = Boolean(value);
    root.classList.toggle('bloom-parent-expanded', expanded);
    expandButton.setAttribute('aria-expanded', String(expanded));
    expandButton.setAttribute('aria-pressed', String(expanded));
    expandButton.setAttribute('aria-label', expanded ? '收起放大觀看' : '放大觀看動畫');
    expandButton.textContent = expanded ? '收起放大' : '放大觀看';
    if (changed && !expanded) scrollTo(0, 0);
    publish(true);
    size();
  }

  function requestExpanded(value = !expanded) {
    if (Boolean(value) !== expanded) post(EXPAND, {action: value ? 'open' : 'close'});
    return getState();
  }

  function suspend(reason = 'host-suspend') {
    suspended = true;
    player.inert = true;
    original.pause(reason);
    publish(true);
    return getState();
  }

  function resume() {
    suspended = false;
    player.inert = false;
    publish(true);
    return getState();
  }

  function syncTheme() {
    try {
      const theme = parent.EcologyTheme?.getState().theme || parent.document.documentElement.dataset.theme;
      if ((theme === 'light' || theme === 'dark') && theme !== root.dataset.theme) api.setTheme(theme);
    } catch {}
  }

  api.getState = getState;
  api.setExpanded = requestExpanded;
  for (const name of ['play', 'replay']) {
    api[name] = (...args) => {
      if (!suspended) original[name](...args);
      publish(true);
      return getState();
    };
  }
  for (const name of ['pause', 'seek', 'renderAt', 'setTheme']) {
    api[name] = (...args) => {
      original[name](...args);
      publish(true);
      return getState();
    };
  }
  api.retry = () => {
    const pending = original.retry();
    publish(true);
    pending.then(() => { publish(true); size(); });
    return pending;
  };

  // Capture prevents the accepted standalone listener from opening its local modal.
  document.addEventListener('click', event => {
    if (!event.target.closest('#expandButton')) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    requestExpanded();
  }, true);
  document.addEventListener('keydown', event => {
    if (event.defaultPrevented || event.isComposing) return;
    if (suspended && (event.code === 'Space' || ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key))) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    if (!expanded) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopImmediatePropagation();
      post(EXPAND, {action: 'close'});
    } else if (event.key === 'Tab') {
      const items = focusable();
      const edge = event.shiftKey ? items[0] : items.at(-1);
      if (!items.length || document.activeElement === edge) {
        event.preventDefault();
        event.stopImmediatePropagation();
        post(EXPAND, {action: items.length ? 'focus-close' : 'focus-start'});
      }
    }
  }, true);

  addEventListener('message', event => {
    if (event.source !== parent || event.origin !== location.origin || !event.data || typeof event.data !== 'object') return;
    const message = event.data;
    if (message.type === 'ecology-control') {
      if (message.action === 'pause') api.pause(message.reason || 'host-pause');
      else if (message.action === 'play') api.play();
      else if (message.action === 'replay') api.replay();
      else if (message.action === 'seek') api.seek(message.time ?? message.seconds);
      else if (message.action === 'theme') api.setTheme(message.theme);
      else if (message.action === 'retry') api.retry();
      else if (message.action === 'suspend') suspend(message.reason || 'host-suspend');
      else if (message.action === 'resume') resume();
      else if (message.action === 'viewport') viewport(message);
      else if (message.action === 'state') publish(true);
      return;
    }
    if (message.type !== EXPAND) return;
    viewport(message);
    if (typeof message.expanded === 'boolean') parentExpanded(message.expanded);
    if (expanded && message.action === 'focus-first') focusBoundary(false);
    else if (expanded && message.action === 'focus-last') focusBoundary(true);
  });

  const controlObserver = new MutationObserver(() => { publish(); size(); });
  for (const id of ['playButton', 'replayButton', 'playerStatus', 'playerError', 'timeReadout']) {
    controlObserver.observe(document.getElementById(id), {
      childList: true, characterData: true, subtree: true,
      attributes: true, attributeFilter: ['disabled', 'hidden', 'aria-pressed']
    });
  }
  new MutationObserver(() => publish(true)).observe(root, {attributes: true, attributeFilter: ['data-theme']});
  new ResizeObserver(size).observe(player);
  for (const eventName of ['click', 'input']) player.addEventListener(eventName, () => queueMicrotask(() => publish(true)), true);
  addEventListener('resize', size);
  document.addEventListener('visibilitychange', () => queueMicrotask(() => publish(true)));
  try {
    new MutationObserver(syncTheme).observe(parent.document.documentElement, {attributes: true, attributeFilter: ['data-theme']});
    parent.addEventListener('ecologythemechange', syncTheme);
  } catch {}
  window.BloomEmbed = {getState: () => ({expanded, suspended, height, hostHeight, hostWidth, theme: root.dataset.theme, scrollY})};
  syncTheme();
  publish(true);
  size();
  post(EXPAND, {action: 'ready'});
})();
