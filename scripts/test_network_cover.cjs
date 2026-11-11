'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '../dist/home-atlas/covers/07-v02/cover.js'), 'utf8');

function eventTarget(properties = {}) {
  const listeners = new Map();
  return Object.assign(properties, {
    addEventListener(name, callback) {
      if (!listeners.has(name)) listeners.set(name, []);
      listeners.get(name).push(callback);
    },
    emit(name) { for (const callback of listeners.get(name) || []) callback(); },
  });
}

// Only the cover script runs in the VM. Images, fonts and frame times stay under test control.
function loadCover({ topic = '07', reduced = false, hovered = false } = {}) {
  const state = { initialized: true, activeTopic: topic, topicNavigationPlaying: false };
  const nodes = Array.from({ length: 9 }, (_, i) => ({ dataset: { node: `node-${i}` }, style: {} }));
  const paths = Array.from({ length: 16 }, (_, i) => ({
    dataset: { edge: `edge-${i}` }, style: {}, attributes: {}, lengthReads: 0,
    setAttribute(name, value) { this.attributes[name] = value; },
    getTotalLength() { this.lengthReads++; return 100 + i; },
  }));
  const revealOrder = paths.map(item => item.dataset.edge);
  const graph = {
    edges: paths.map(item => ({ id: item.dataset.edge })).reverse(), reveal_order: revealOrder,
    verification: { cycle_rank: 8, node_degrees: {} },
  };
  const layouts = Object.fromEntries(['desktop', 'mobile'].map((name, i) => [name, {
    viewBox: [0, 0, i ? 400 : 1000, i ? 800 : 600], crossingCount: 4,
    nodes: Object.fromEntries(nodes.map((node, j) => [node.dataset.node, { x: 25 + j * 30, y: 40 + j * 20, width: 50 }])),
    paths: Object.fromEntries(paths.map(item => [item.dataset.edge, `M0 0 L${i ? 30 : 50} 50`])),
  }]));
  const decodes = [];
  let decodeCalls = 0, fontReadyReads = 0;
  const images = nodes.map(() => ({
    loading: 'lazy',
    decode() { decodeCalls++; return new Promise(resolve => decodes.push(resolve)); },
  }));
  const fonts = eventTarget();
  const pendingFonts = new Promise(() => {});
  Object.defineProperty(fonts, 'ready', { get() { fontReadyReads++; return pendingFonts; } });
  const board = { style: {} };
  const links = { attributes: {}, setAttribute(name, value) { this.attributes[name] = value; } };
  const scene = {
    querySelector(selector) {
      assert.ok(['.network-board', '.network-links'].includes(selector));
      return selector === '.network-board' ? board : links;
    },
    querySelectorAll(selector) {
      assert.ok(['.network-node', '.network-link'].includes(selector));
      return selector === '.network-node' ? nodes : paths;
    },
    getBoundingClientRect: () => ({ width: 900, height: 600 }),
  };
  const button = eventTarget({ hidden: true, textContent: '' });
  const focusTarget = {};
  const imageLink = {
    hovered,
    matches(selector) { assert.equal(selector, ':hover'); return this.hovered; },
    contains(element) { return element === this || element === focusTarget; },
  };
  const artwork = eventTarget({
    querySelector(selector) {
      assert.ok(['[data-cover-playback]', '.extension-image-link'].includes(selector));
      return selector === '[data-cover-playback]' ? button : imageLink;
    },
  });
  const host = {
    closest(selector) { assert.equal(selector, '.extension-art'); return artwork; },
    querySelector(selector) { assert.equal(selector, '.network-scene'); return scene; },
    querySelectorAll(selector) { assert.equal(selector, 'img'); return images; },
  };
  const section = { dataset: {}, querySelector(selector) { assert.equal(selector, '.network-art-host'); return host; } };
  const elements = {
    'topic-07': section,
    'network-cover-data': { textContent: JSON.stringify(graph) },
    'network-layout-data': { textContent: JSON.stringify(layouts) },
  };
  const document = eventTarget({
    fonts, hidden: false, activeElement: null,
    getElementById(id) { assert.ok(Object.hasOwn(elements, id), `Unexpected resource: ${id}`); return elements[id]; },
  });
  const reduce = eventTarget({ matches: reduced });
  const hover = eventTarget({ matches: true });
  const frames = new Map(), intervals = [], timeouts = [], observers = [], errors = [];
  let nextFrame = 0;
  const window = eventTarget({ AtlasHome: { getState: () => state } });
  const context = {
    window, document, innerWidth: 1200, innerHeight: 800, Event,
    gsap: { parseEase(name) { assert.equal(name, 'power2.out'); return value => 1 - (1 - value) ** 3; } },
    matchMedia(query) {
      assert.ok(['(prefers-reduced-motion: reduce)', '(hover: hover)'].includes(query));
      return query.includes('reduced-motion') ? reduce : hover;
    },
    ResizeObserver: class {
      constructor(callback) { this.callback = callback; observers.push(this); }
      observe(element) { assert.equal(element, scene); }
    },
    requestAnimationFrame(callback) { const id = ++nextFrame; frames.set(id, callback); return id; },
    cancelAnimationFrame(id) { frames.delete(id); },
    addEventListener: window.addEventListener,
    dispatchEvent(event) { window.emit(event.type); },
    setInterval(callback) { intervals.push(callback); },
    setTimeout(callback) { timeouts.push(callback); },
    console: { error(error) { errors.push(error); } },
  };
  vm.runInNewContext(source, context, { filename: '07-v02/cover.js' });
  return {
    api: window.NetworkCover, nodes, paths, images, button, imageLink, artwork, focusTarget,
    state, document, reduce, layouts, board, links, observers, errors,
    get decodeCalls() { return decodeCalls; },
    get fontReadyReads() { return fontReadyReads; },
    sync() { for (const callback of intervals) callback(); },
    flushTimeouts() { while (timeouts.length) timeouts.shift()(); },
    frame(now) { const callbacks = [...frames.values()]; frames.clear(); for (const callback of callbacks) callback(now); },
    resize(width, height) { context.innerWidth = width; context.innerHeight = height; window.emit('resize'); },
    async decodeImages() { for (const resolve of decodes) resolve(); await new Promise(resolve => setImmediate(resolve)); assert.deepEqual(errors, []); },
  };
}

function visibleNodes(cover) {
  for (const node of cover.nodes) {
    assert.equal(node.style.opacity, '1', `${node.dataset.node} and its image/label must remain visible`);
    assert.equal(node.style.transform, 'translate(-50%,-50%) scale(1)');
  }
}

test('all nine nodes are visible at the provided static positions while nine decodes are pending', () => {
  const cover = loadCover();
  assert.equal(cover.api.getState().ready, false);
  assert.equal(cover.decodeCalls, 9);
  assert.equal(cover.api.getState().assetCount, 9);
  assert.equal(cover.api.getState().edgeCount, 16);
  assert.equal(cover.api.getState().time, 0);
  visibleNodes(cover);
  for (const node of cover.nodes) {
    const position = cover.layouts.desktop.nodes[node.dataset.node];
    assert.equal(node.style.left, `${position.x / 1000 * 100}%`);
    assert.equal(node.style.top, `${position.y / 600 * 100}%`);
    assert.equal(node.style.width, `${position.width / 1000 * 100}%`);
  }
  assert.ok(cover.images.every(image => image.loading === 'eager'));
  assert.ok(cover.paths.every(item => item.style.opacity === '0'));
});

test('font readiness does not block playback; font, viewport and scene changes resize the graph', async () => {
  const cover = loadCover();
  await cover.decodeImages();
  assert.equal(cover.api.getState().ready, true);
  assert.equal(cover.api.getState().playing, true);
  assert.equal(cover.fontReadyReads, 0);
  const lengthReads = cover.paths[0].lengthReads;
  cover.document.fonts.emit('loadingdone');
  assert.ok(cover.paths[0].lengthReads > lengthReads);
  cover.resize(390, 844);
  assert.equal(cover.api.getState().layout, 'mobile');
  assert.equal(cover.links.attributes.viewBox, '0 0 400 800');
  assert.equal(cover.nodes[0].style.left, '6.25%');
  cover.observers[0].callback();
  visibleNodes(cover);
});

test('manual pause during decode keeps time zero visible and the button resumes independently', async () => {
  const cover = loadCover();
  cover.api.pause();
  visibleNodes(cover);
  await cover.decodeImages();
  cover.sync();
  assert.equal(cover.api.getState().time, 0);
  assert.equal(cover.api.getState().playing, false);
  assert.equal(cover.button.textContent, '繼續動畫');
  visibleNodes(cover);
  cover.document.activeElement = cover.button;
  cover.button.emit('click');
  assert.equal(cover.api.getState().playing, true);
  cover.button.emit('click');
  cover.artwork.emit('pointerleave');
  assert.equal(cover.api.getState().userPaused, true);
  assert.equal(cover.api.getState().playing, false);
});

test('pointer hover keeps playback running; keyboard image-link focus still pauses', async () => {
  const cover = loadCover({ hovered: true });
  await cover.decodeImages();
  assert.equal(cover.api.getState().playing, true);
  cover.artwork.emit('pointerenter');
  cover.sync();
  cover.frame(1000);cover.frame(1400);
  assert.ok(cover.api.getState().time > .3);
  assert.equal(cover.api.getState().interactionPaused, false);
  visibleNodes(cover);
  cover.imageLink.hovered = false;
  cover.artwork.emit('pointerleave');
  assert.equal(cover.api.getState().playing, true);
  cover.document.activeElement = cover.focusTarget;
  cover.artwork.emit('focusin');
  assert.equal(cover.api.getState().playing, false);
  visibleNodes(cover);
  cover.document.activeElement = null;
  cover.artwork.emit('focusout');
  cover.flushTimeouts();
  assert.equal(cover.api.getState().playing, true);
});

test('first edge starts at 0.25s; reveal order, eight-second completion and replay preserve nodes', async () => {
  const cover = loadCover();
  await cover.decodeImages();
  assert.equal(cover.api.seek(0.2).phase, 'appear');
  assert.ok(cover.api.getState().edgeProgress.every(value => value === 0));
  assert.equal(cover.api.seek(0.25).phase, 'shared-visitor');
  const early = cover.api.seek(0.26);
  assert.ok(early.edgeProgress[0] > 0);
  assert.ok(early.edgeProgress.slice(1).every(value => value === 0));
  assert.equal(cover.paths[0].style.opacity, '1');
  assert.ok(cover.paths.slice(1).every(item => item.style.opacity === '0'));
  const complete = cover.api.seek(8);
  assert.equal(complete.duration, 8);
  assert.equal(complete.phase, 'complete');
  assert.deepEqual(Array.from(complete.drawnEdges), cover.paths.map(item => item.dataset.edge));
  assert.ok(cover.paths.every(item => item.style.strokeDashoffset === '0'));
  visibleNodes(cover);
  assert.equal(cover.button.textContent, '重看動畫');
  cover.button.emit('click');
  assert.equal(cover.api.getState().time, 0);
  assert.equal(cover.api.getState().playing, true);
  visibleNodes(cover);
  cover.frame(1000);
  cover.frame(9000);
  assert.equal(cover.api.getState().phase, 'complete');
  assert.equal(cover.api.getState().playing, false);
  visibleNodes(cover);
});

test('initialization is deferred off topic, hidden or navigating; playback suspends off topic', async () => {
  const cover = loadCover({ topic: '08' });
  assert.equal(cover.decodeCalls, 0);
  assert.equal(cover.observers.length, 0);
  cover.state.activeTopic = '07';
  cover.state.topicNavigationPlaying = true;
  cover.sync();
  assert.equal(cover.decodeCalls, 0);
  cover.state.topicNavigationPlaying = false;
  cover.document.hidden = true;
  cover.sync();
  assert.equal(cover.decodeCalls, 0);
  cover.document.hidden = false;
  cover.sync();
  assert.equal(cover.decodeCalls, 9);
  await cover.decodeImages();
  cover.frame(1000);
  cover.frame(1400);
  const time = cover.api.getState().time;
  cover.state.activeTopic = '08';
  cover.sync();
  cover.frame(5000);
  assert.equal(cover.api.getState().playing, false);
  assert.equal(cover.api.getState().time, time);
  cover.state.activeTopic = '07';
  cover.sync();
  cover.frame(10000);
  assert.equal(cover.api.getState().time, time);
  visibleNodes(cover);
});

test('reduced motion renders the final network during decode and after replay or preference change', async () => {
  const cover = loadCover({ reduced: true });
  assert.equal(cover.api.getState().time, 8);
  assert.ok(cover.paths.every(item => item.style.opacity === '1'));
  visibleNodes(cover);
  await cover.decodeImages();
  assert.equal(cover.api.replay().time, 8);
  assert.equal(cover.api.getState().playing, false);
  assert.equal(cover.button.hidden, true);
  visibleNodes(cover);
  const animated = loadCover();
  await animated.decodeImages();
  animated.reduce.matches = true;
  animated.reduce.emit('change');
  assert.equal(animated.api.getState().phase, 'complete');
  assert.equal(animated.api.getState().playing, false);
  assert.equal(animated.api.getState().drawnEdges.length, 16);
  visibleNodes(animated);
});
