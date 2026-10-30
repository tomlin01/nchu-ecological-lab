import {DURATION, PHASES, stateAt} from './model.mjs';
import {initScene, renderScene, getSceneState} from './scene.mjs';

const $ = id => document.getElementById(id);
const root = document.documentElement;
const player = $('player');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const compact = matchMedia('(max-width: 720px)');
const THEME_KEY = 'ecology-color-theme';
const FPS = 24;
const queryTheme = new URLSearchParams(location.search).get('theme');
const clamp = value => Math.max(0, Math.min(DURATION, value));
const clockText = value => {
  const seconds = Math.floor(clamp(value));
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
};

let time = 0;
let playing = false;
let ready = false;
let loading = false;
let sceneReady = false;
let error = null;
let frame = 0;
let lastTick = 0;
let lastPhase = -1;
let lastNarrative = '';
let loadPromise = null;
let attempt = 0;
let expanded = false;
let dialogState = null;
let printState = null;
let inViewport = true;
let lastPauseReason = 'initial';

function text(id, value) {
  const node = $(id);
  if (node.textContent !== String(value)) node.textContent = String(value);
}

function status(message) { text('playerStatus', message); }

function modelState() {
  return stateAt(time, {reducedMotion: reduced.matches, compact: compact.matches});
}

function getState() {
  return {
    ...modelState(), time, duration: DURATION, playing, ready, loading, error,
    theme: root.dataset.theme, expanded, reducedMotion: reduced.matches,
    compact: compact.matches, attempt, lastPauseReason,
    scene: sceneReady ? getSceneState() : null, hasAudio: false
  };
}

function render() {
  const state = modelState();
  const phase = PHASES[state.phase];
  const narrative = {...phase, ...state.narrative};
  if (sceneReady && !error) {
    try { renderScene({...state, theme: root.dataset.theme, playing}); }
    catch (cause) {
      stopClock();
      ready = false;
      error = cause?.message || '動畫畫面無法顯示。';
      status(`${error} 可按重新載入再試一次。`);
    }
  }
  document.body.dataset.phase = phase.id;
  if (lastPhase !== state.phase) {
    text('phaseLabel', `${state.phase + 1} / ${PHASES.length} · ${phase.label}`);
    document.querySelectorAll('[data-seek]').forEach(button => {
      if (Number(button.dataset.seek) === phase.start) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
    lastPhase = state.phase;
  }
  const narrativeKey = JSON.stringify([state.phase, narrative.title, narrative.copy, narrative.note]);
  if (lastNarrative !== narrativeKey) {
    text('phaseTitle', narrative.title);
    text('phaseCopy', narrative.copy);
    text('phaseNote', narrative.note || '');
    lastNarrative = narrativeKey;
  }
  text('timeReadout', `${clockText(time)} / ${clockText(DURATION)}`);
  $('seekRange').value = String(time);
  $('seekRange').setAttribute('aria-valuetext', `${clockText(time)}，${phase.label}`);
  text('playButton', playing ? '暫停' : time >= DURATION ? '重新播放' : time > 0 ? '繼續播放' : '播放');
  $('playButton').setAttribute('aria-pressed', String(playing));
  $('playButton').setAttribute('aria-label', playing ? '暫停動畫' : '播放動畫');
  $('playButton').disabled = $('replayButton').disabled = !ready || loading;
  document.querySelectorAll('[data-frame]').forEach(button => button.disabled = !ready || loading);
  $('loadingNote').hidden = !loading;
  $('playerError').hidden = !error;
  text('playerErrorCopy', error || '');
  $('retryButton').disabled = loading;
}

function stopClock() {
  playing = false;
  cancelAnimationFrame(frame);
  frame = 0;
  lastTick = 0;
}

function pause(reason = 'api-pause') {
  stopClock();
  lastPauseReason = reason;
  render();
  if (!error && !loading) status(`已停在 ${clockText(time)}，按播放繼續。`);
  return getState();
}

function seek(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return getState();
  stopClock();
  time = clamp(numeric);
  lastPauseReason = 'seek';
  render();
  if (!error) status(ready ? `已停在 ${clockText(time)}，按播放繼續。` : `已選擇 ${clockText(time)}；載入完成後會停在這裡。`);
  return getState();
}

function tick(now) {
  frame = 0;
  if (!playing) return;
  time = clamp(time + Math.max(0, now - lastTick) / 1000);
  lastTick = now;
  if (time >= DURATION) {
    stopClock();
    lastPauseReason = 'ended';
    render();
    status('動畫結束。可重播或跳回任一段落。');
    return;
  }
  render();
  if (playing) frame = requestAnimationFrame(tick);
}

function play() {
  if (!ready || loading || document.hidden || !inViewport || printState || playing) return getState();
  if (time >= DURATION) time = 0;
  playing = true;
  lastTick = performance.now();
  render();
  if (playing) {
    status(reduced.matches ? '動畫播放中，已使用減少動態模式，沒有聲音。' : '動畫播放中，沒有聲音。');
    frame = requestAnimationFrame(tick);
  }
  return getState();
}

function replay() { seek(0); return play(); }

function renderAt(value) { return seek(value); }

function setTheme(value, {persist = false} = {}) {
  if (value !== 'light' && value !== 'dark') return getState();
  root.dataset.theme = value;
  text('themeButton', value === 'dark' ? '切換淺色' : '切換深色');
  $('themeButton').setAttribute('aria-pressed', String(value === 'dark'));
  $('themeButton').setAttribute('aria-label', value === 'dark' ? '切換淺色模式' : '切換深色模式');
  if (persist) try { localStorage.setItem(THEME_KEY, value); } catch {}
  render();
  return getState();
}

function visible(node) {
  return Boolean(node?.isConnected && !node.closest('[hidden],[inert]') && node.getClientRects().length);
}

function focusable() {
  return [...player.querySelectorAll('a[href],button,input,summary,[tabindex]')]
    .filter(node => !node.disabled && node.tabIndex >= 0 && visible(node));
}

function setExpanded(value) {
  const next = Boolean(value);
  if (next === expanded) return getState();
  pause('expanded-view');
  if (next) {
    dialogState = {
      focus: document.activeElement, scroll: [scrollX, scrollY], inert: [],
      attributes: ['role', 'aria-modal', 'tabindex'].map(name => [name, player.getAttribute(name)])
    };
    for (let node = player; node.parentElement; node = node.parentElement) {
      for (const sibling of node.parentElement.children) {
        if (sibling === node || sibling.hasAttribute('inert')) continue;
        sibling.setAttribute('inert', '');
        dialogState.inert.push(sibling);
      }
    }
    player.setAttribute('role', 'dialog');
    player.setAttribute('aria-modal', 'true');
    player.setAttribute('tabindex', '-1');
  }
  expanded = next;
  root.classList.toggle('media-expanded-view', expanded);
  document.body.classList.toggle('is-expanded', expanded);
  $('expandButton').setAttribute('aria-expanded', String(expanded));
  $('expandButton').setAttribute('aria-pressed', String(expanded));
  text('expandButton', expanded ? '收起放大' : '放大觀看');
  $('expandButton').setAttribute('aria-label', expanded ? '收起放大觀看' : '放大觀看動畫');
  if (expanded) $('expandButton').focus({preventScroll: true});
  else if (dialogState) {
    const saved = dialogState;
    dialogState = null;
    for (const [name, original] of saved.attributes) {
      if (original === null) player.removeAttribute(name);
      else player.setAttribute(name, original);
    }
    saved.inert.forEach(node => node.removeAttribute('inert'));
    scrollTo(...saved.scroll);
    (visible(saved.focus) ? saved.focus : $('expandButton')).focus({preventScroll: true});
  }
  render();
  return getState();
}

function load() {
  if (loadPromise) return loadPromise;
  stopClock();
  ready = false;
  sceneReady = false;
  loading = true;
  error = null;
  attempt += 1;
  status('正在載入場景與字型。可以先選擇段落，載入後按播放才會開始。');
  render();
  loadPromise = Promise.resolve().then(async () => {
    try {
      await initScene($('composition'));
      sceneReady = true;
      await document.fonts.ready;
      loading = false;
      ready = true;
      render();
      if (ready) status(`畫面已準備好，停在 ${clockText(time)}。按播放開始，沒有聲音。`);
    } catch (cause) {
      ready = false;
      loading = false;
      error = cause?.message || '動畫場景未能載入。';
      render();
      status(`${error} 可以重試，已選時間會保留。`);
    }
    return getState();
  }).finally(() => { loadPromise = null; });
  return loadPromise;
}

function retry() { return load(); }

function buildPhaseNavigation() {
  const fragment = document.createDocumentFragment();
  PHASES.forEach(phase => {
    const button = document.createElement('button');
    const timestamp = document.createElement('span');
    button.type = 'button';
    button.dataset.seek = String(phase.start);
    timestamp.textContent = clockText(phase.start);
    button.append(timestamp, phase.label);
    fragment.append(button);
  });
  $('phaseNavigation').replaceChildren(fragment);
}

buildPhaseNavigation();
$('seekRange').max = String(DURATION);
$('seekRange').step = String(1 / FPS);
$('playButton').addEventListener('click', () => playing ? pause('play-button') : play());
$('replayButton').addEventListener('click', replay);
$('seekRange').addEventListener('input', event => seek(event.target.value));
$('retryButton').addEventListener('click', retry);
$('themeButton').addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', {persist: true}));
$('expandButton').addEventListener('click', () => setExpanded(!expanded));
document.querySelectorAll('[data-frame]').forEach(button => button.addEventListener('click', () => seek(time + Number(button.dataset.frame) / FPS)));
$('phaseNavigation').addEventListener('click', event => {
  const button = event.target.closest('[data-seek]');
  if (button) seek(button.dataset.seek);
});

document.addEventListener('pointerdown', () => root.classList.remove('keyboard-input'), {passive: true});
document.addEventListener('keydown', event => {
  root.classList.add('keyboard-input');
  if (event.defaultPrevented || event.isComposing || event.altKey || event.ctrlKey || event.metaKey) return;
  if (expanded && event.key === 'Escape') {
    event.preventDefault();
    setExpanded(false);
    return;
  }
  if (expanded && event.key === 'Tab') {
    const items = focusable();
    const edge = event.shiftKey ? items[0] : items.at(-1);
    if (!items.length || document.activeElement === edge || !player.contains(document.activeElement)) {
      event.preventDefault();
      (event.shiftKey ? items.at(-1) : items[0])?.focus();
    }
    return;
  }
  if (event.target.closest('a,button,input,select,textarea,summary,[contenteditable]')) return;
  if (event.code === 'Space') {
    event.preventDefault();
    playing ? pause('keyboard') : play();
  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    seek(time + (event.key === 'ArrowLeft' ? -1 : 1));
  } else if (event.key === 'Home' || event.key === 'End') {
    event.preventDefault();
    seek(event.key === 'Home' ? 0 : DURATION);
  }
});
document.addEventListener('focusin', event => {
  if (expanded && !player.contains(event.target)) $('expandButton').focus({preventScroll: true});
});
document.addEventListener('visibilitychange', () => { if (document.hidden) pause('document-hidden'); });
addEventListener('pagehide', () => pause('page-hidden'));
player.addEventListener('click', event => { if (event.target.closest('a[href]')) pause('source-link'); });
reduced.addEventListener('change', () => pause('motion-preference'));
compact.addEventListener('change', render);
new IntersectionObserver(entries => {
  inViewport = entries[0]?.isIntersecting ?? true;
  if (!inViewport && playing) pause('player-offscreen');
}, {threshold: 0}).observe($('composition'));
addEventListener('storage', event => {
  if (!['light', 'dark'].includes(queryTheme) && (event.key === THEME_KEY || event.key === null)) {
    setTheme(event.newValue === 'dark' ? 'dark' : 'light');
  }
});
addEventListener('beforeprint', () => {
  if (printState) return;
  if (expanded) setExpanded(false);
  pause('before-print');
  printState = {time, details: [...player.querySelectorAll('details')].map(node => [node, node.open])};
  printState.details.forEach(([node]) => node.open = true);
});
addEventListener('afterprint', () => {
  if (!printState) return;
  const saved = printState;
  printState = null;
  saved.details.forEach(([node, open]) => node.open = open);
  seek(saved.time);
});

window.PawsPlayer = {getState, seek, play, pause, replay, setTheme, renderAt, setExpanded, retry,
  get ready() { return ready; }};
setTheme(['light', 'dark'].includes(queryTheme) ? queryTheme : root.dataset.theme);
load();
