import { WIDTH, HEIGHT, DURATION, CLASSES, VALIDATION, FIGURES, getSceneState } from './model.mjs';

const NS = 'http://www.w3.org/2000/svg';
const URL3 = new URL('./assets/figure3.png', import.meta.url).href;
const URL5 = new URL('./assets/figure5.webp', import.meta.url).href;
let photoClipSequence = 0;
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const progress = (t, a, b) => clamp((t - a) / (b - a));

// Exact cubic-bezier tokens from the existing motion guidance. No wall clock enters the scene.
function bezier(p, x1 = .23, y1 = 1, x2 = .32, y2 = 1) {
  if (p <= 0 || p >= 1) return clamp(p);
  const component = (u, a, b) => 3 * (1 - u) ** 2 * u * a + 3 * (1 - u) * u * u * b + u ** 3;
  let low = 0, high = 1;
  for (let i = 0; i < 19; i++) {
    const middle = (low + high) / 2;
    if (component(middle, x1, x2) < p) low = middle; else high = middle;
  }
  return component((low + high) / 2, y1, y2);
}
const ease = p => bezier(p);
const easeMove = p => bezier(p, .77, 0, .175, 1);

function node(tag, attrs = {}, parent, text) {
  const el = document.createElementNS(NS, tag);
  for (const [key, value] of Object.entries(attrs)) if (value !== undefined) el.setAttribute(key, value);
  if (text !== undefined) el.textContent = text;
  if (parent) parent.appendChild(el);
  return el;
}
function text(parent, x, y, value, size = 26, options = {}) {
  return node('text', { x, y, 'font-size': size, class: options.serif ? 'serif' : 'sans',
    fill: options.fill || 'var(--ink)', 'font-weight': options.weight || (options.serif ? 500 : 450),
    'text-anchor': options.anchor || 'start', ...options.attrs }, parent, value);
}
function multiline(parent, x, y, lines, size = 26, options = {}) {
  const el = text(parent, x, y, '', size, options);
  lines.forEach((line, index) => node('tspan', { x, dy: index ? size * (options.lineHeight || 1.5) : 0 }, el, line));
  return el;
}
const rect = (parent, x, y, width, height, attrs = {}) => node('rect', { x, y, width, height, ...attrs }, parent);
const line = (parent, x1, y1, x2, y2, attrs = {}) => node('line', { x1, y1, x2, y2,
  stroke: 'var(--line)', 'stroke-width': 1.5, ...attrs }, parent);
function photo(parent, source, bounds, x, y, width, height, options = {}) {
  const frame = node('g', {}, parent);
  rect(frame, x, y, width, height, { fill: options.fill || 'var(--photo-mat)', stroke: 'var(--line)', 'stroke-width': 1.3, rx: 3 });
  const viewport = node('svg', { x, y, width, height, viewBox: bounds.join(' '),
    preserveAspectRatio: 'xMidYMid meet', overflow: 'hidden' }, frame);
  // A nested SVG's letterbox is still inside its viewport. Clip to the source panel itself,
  // otherwise neighboring panels from the full author figure appear in that letterbox.
  const clipId = `forty-photo-crop-${photoClipSequence++}`;
  const definitions = node('defs', {}, viewport);
  const sourceClip = node('clipPath', { id: clipId, clipPathUnits: 'userSpaceOnUse' }, definitions);
  rect(sourceClip, bounds[0], bounds[1], bounds[2], bounds[3]);
  node('image', { href: source, x: 0, y: 0,
    width: source === URL3 ? FIGURES.figure3.width : FIGURES.figure5.width,
    height: source === URL3 ? FIGURES.figure3.height : FIGURES.figure5.height,
    'clip-path': `url(#${clipId})` }, viewport);
  return frame;
}
function arrow(parent, x1, y, x2, color = 'var(--teal)') {
  line(parent, x1, y, x2 - 10, y, { stroke: color, 'stroke-width': 2.5 });
  node('path', { d: `M${x2 - 18},${y - 7}L${x2},${y}L${x2 - 18},${y + 7}`, fill: 'none', stroke: color, 'stroke-width': 2.5 }, parent);
}
function legend(parent, y, { x = 72, width = 1456, fontSize = 23 } = {}) {
  const group = node('g', {}, parent);
  const cell = width / 6;
  CLASSES.forEach((item, index) => {
    const left = x + index * cell;
    rect(group, left, y - 18, 16, 16, { fill: item.color, rx: 1 });
    text(group, left + 25, y - 2, item.label, fontSize, { fill: 'var(--muted)' });
  });
  return group;
}
const TITLES = [
  '同樣一片綠，AI怎麼分辨不同森林？',
  '只看有沒有樹，還不夠。',
  '把多年觀測和已知例子一起看。',
  '把同一位置對起來，差異才看得清楚。',
  '整體九成，不代表每一類都一樣。',
  '先分清林地，再談如何保護。',
];
const SUBTITLES = [
  '森林與樹作物，可能有很不同的形成方式與土地用途。',
  '道路和邊界幫助我們定位；林地的類型還牽涉經營歷史。',
  '先從可靠例子學習，再擴大資料，並加入相鄰年份的資訊。',
  '衛星影像保留原貌，彩色圖層顯示作者推估的林地類型。',
  '訓練之外，再用獨立樣點檢查分類結果。',
  '知道哪裡有樹，接著還要問：這片樹屬於哪一種林地？',
];
const SOURCENOTES = [
  '作者圖5｜不同地點的類型示例，各自保留原比例尺。',
  '作者圖3｜澳洲東南部，相同區域，範圍約5公里×3.5公里。',
  '方法示意｜年份及分工依論文，不在此執行模型或產生像元分數。',
  '作者圖3｜相同區域的衛星影像與推估分類，不是前後年份。',
  '論文表5、7｜全球驗證；整體準確率與類別F1為不同指標。',
  '2020基線｜10公尺是輸出網格；林型不是碳量或生物多樣性的直接量測。',
];

export async function createScene(host, { theme = 'light', reducedMotion = false } = {}) {
  let currentTime = 0, currentTheme = theme === 'dark' ? 'dark' : 'light';
  let reduce = !!reducedMotion, destroyed = false, ready = false, themeInitialized = false, lastPhase = -1;
  const svg = node('svg', { xmlns: NS, viewBox: `0 0 ${WIDTH} ${HEIGHT}`, width: WIDTH, height: HEIGHT,
    role: 'img', 'aria-label': 'ForTy 2020森林類型與土地利用教學動畫',
    style: 'width:100%;height:100%;display:block;overflow:hidden' });
  svg.innerHTML = `<style>
    .sans{font-family:"Forty Sans","Noto Sans TC",sans-serif;font-variant-numeric:tabular-nums}
    .serif{font-family:"Forty Serif","Noto Serif TC",serif}
    text{paint-order:stroke;stroke:none}
  </style>`;
  host.replaceChildren(svg);
  const defs = node('defs', {}, svg);
  const clip = node('clipPath', { id: 'forty-result-reveal' }, defs);
  const wipeClip = rect(clip, 838, 275, 690, 474);
  rect(svg, 0, 0, WIDTH, HEIGHT, { fill: 'var(--paper)' });
  rect(svg, 72, 60, 28, 3, { fill: 'var(--teal)' });
  const kicker = text(svg, 113, 70, '', 22, { fill: 'var(--teal)', weight: 650 });
  text(svg, 1528, 70, 'ForTy 2020', 22, { fill: 'var(--muted)', anchor: 'end' });
  const headline = text(svg, 72, 150, '', 52, { serif: true });
  const subtitle = text(svg, 72, 206, '', 27, { fill: 'var(--muted)' });
  line(svg, 72, 234, 1528, 234);
  const layers = Array.from({ length: 6 }, (_, index) => node('g', { 'data-phase': index }, svg));

  // 0–18: a specimen-like photographic field guide. The primary panel retains its tall aspect.
  const introCards = [], introOrder = ['natreg', 'primary', 'planted', 'plantation', 'treecrop'];
  const miniDescriptions = {
    natreg: ['以自然更新長回', '巴布亞紐幾內亞'],
    primary: ['沒有明顯人為干擾', '加拿大魁北克'],
    planted: ['由人種植或播種', '德國'],
    plantation: ['集約經營木材生產', '智利比奧比奧'],
    treecrop: ['樹木用來生產作物', '中國雲南西雙版納'],
  };
  introOrder.forEach((id, index) => {
    const item = CLASSES.find(c => c.id === id), panel = FIGURES.figure5.panels[id];
    const x = 72 + index * 294, card = node('g', {}, layers[0]);
    const mounting = rect(card, x - 6, 270, 282, 435, { fill: 'var(--wash)', stroke: 'var(--line)', 'stroke-width': 1, rx: 3 });
    photo(card, URL5, panel.rect, x, 278, 270, 310);
    rect(card, x, 617, 19, 4, { fill: item.color });
    text(card, x, 656, item.label, id === 'treecrop' ? 23 : 25, { weight: 650 });
    text(card, x, 694, miniDescriptions[id][0], 21, { fill: 'var(--muted)' });
    text(card, x, 733, miniDescriptions[id][1], 19, { fill: 'var(--muted)' });
    introCards.push({ card, mounting, color: item.color });
  });
  text(layers[0], 72, 790, '這五類之外，還有「其他土地」。ForTy共區分六類。', 25, { fill: 'var(--muted)' });

  // 18–32: stay with a real landscape before revealing a classification.
  // A complete panel above the source footer retains the original one-kilometer scale bar.
  photo(layers[1], URL3, FIGURES.figure3.satellite, 72, 270, 805, 553);
  const questionSide = node('g', {}, layers[1]);
  text(questionSide, 938, 318, '同一片綠，可能是……', 31, { serif: true });
  line(questionSide, 938, 353, 1528, 353);
  rect(questionSide, 938, 387, 19, 19, { fill: CLASSES[1].color });
  text(questionSide, 973, 407, '自然再生林', 36, { weight: 650 });
  text(questionSide, 973, 449, '主要靠自然更新長回來', 24, { fill: 'var(--muted)' });
  rect(questionSide, 938, 508, 19, 19, { fill: CLASSES[3].color });
  text(questionSide, 973, 528, '集約經營人工林', 36, { weight: 650 });
  text(questionSide, 973, 570, '為木材生產而密集經營', 24, { fill: 'var(--muted)' });
  multiline(questionSide, 938, 679, ['外觀看來相似，', '土地用途與過去歷史卻可能不同。'], 27, { fill: 'var(--muted)' });

  // 32–60: annual observations and a spatially simple, explicitly schematic three-stage explanation.
  photo(layers[2], URL3, FIGURES.figure3.satellite, 72, 286, 436, 300);
  text(layers[2], 72, 623, '位置固定，綜合多年資訊', 25, { weight: 650 });
  multiline(layers[2], 72, 661, ['AlphaEarth將多來源觀測', '整理成每個地點的特徵。'], 24, { fill: 'var(--muted)' });
  const yearGroups = [];
  text(layers[2], 600, 291, '多年的資訊，一起成為判讀依據', 31, { serif: true });
  for (let index = 0; index < 6; index++) {
    const x = 600 + index * 155, group = node('g', {}, layers[2]);
    const border = rect(group, x, 324, 133, 112, { fill: 'var(--wash)', stroke: 'var(--line)', 'stroke-width': 1.5, rx: 4 });
    text(group, x + 66.5, 365, String(2019 + index), 27, { anchor: 'middle', weight: 650 });
    text(group, x + 66.5, 407, '衛星特徵', 22, { anchor: 'middle', fill: 'var(--muted)' });
    line(group, x + 66.5, 436, x + 66.5, 465, { stroke: 'var(--teal)', 'stroke-width': 2 });
    yearGroups.push({ group, border });
  }
  line(layers[2], 666, 465, 1442, 465, { stroke: 'var(--teal)', 'stroke-width': 2 });
  line(layers[2], 1053, 465, 1053, 490, { stroke: 'var(--teal)', 'stroke-width': 2 });
  text(layers[2], 1053, 535, '六類森林與土地利用', 34, { anchor: 'middle', weight: 650 });
  text(layers[2], 1053, 576, '專家標註、既有資料與模型推估，分工不同', 23, { anchor: 'middle', fill: 'var(--muted)' });
  const stageGroups = [];
  const stages = [
    ['先從可靠例子學習', '專家標註與參考資料'],
    ['再擴大訓練資料', '前階段推估，加上輔助資料'],
    ['加入多年觀測資訊', '綜合相鄰年份，提取2020基線'],
  ];
  stages.forEach(([title, copy], index) => {
    const x = 600 + index * 310, group = node('g', {}, layers[2]);
    const rule = line(group, x, 634, x + 275, 634, { 'stroke-width': 3 });
    text(group, x, 682, String(index + 1).padStart(2, '0'), 30, { fill: 'var(--teal)', serif: true });
    text(group, x, 726, title, 27, { weight: 650 });
    multiline(group, x, 761, index === 2 ? ['綜合相鄰年份，', '提取2020基線'] : [copy], 21, { fill: 'var(--muted)', lineHeight: 1.4 });
    stageGroups.push({ group, rule });
  });

  // 60–83: spatial registration is held fixed. The result appears over the same-position right view.
  text(layers[3], 72, 272, '衛星影像', 26, { weight: 650 });
  text(layers[3], 838, 272, '衛星影像 → 作者推估分類', 26, { weight: 650 });
  photo(layers[3], URL3, FIGURES.figure3.satellite, 72, 294, 690, 474);
  photo(layers[3], URL3, FIGURES.figure3.satellite, 838, 294, 690, 474);
  const result = node('g', { 'clip-path': 'url(#forty-result-reveal)' }, layers[3]);
  photo(result, URL3, FIGURES.figure3.classification, 838, 294, 690, 474);
  wipeClip.setAttribute('y', '294');
  const wipeLine = line(layers[3], 838, 294, 838, 768, { stroke: 'var(--teal)', 'stroke-width': 3 });
  arrow(layers[3], 781, 528, 819);
  legend(layers[3], 812, { fontSize: 22 });

  // 83–105: show the evaluated denominator and separate overall accuracy from per-class F1.
  text(layers[4], 72, 292, '全球六類整體準確率', 30, { weight: 650 });
  text(layers[4], 72, 437, `${VALIDATION.oa.toFixed(2)}%`, 120, { serif: true });
  text(layers[4], 72, 488, '標準誤0.34%，包含「其他土地」', 26, { fill: 'var(--muted)' });
  line(layers[4], 72, 527, 711, 527);
  text(layers[4], 72, 603, '9,100', 49, { serif: true });
  arrow(layers[4], 276, 584, 413);
  text(layers[4], 453, 603, '8,190', 49, { serif: true });
  text(layers[4], 72, 643, '原始抽樣點', 24, { fill: 'var(--muted)' });
  text(layers[4], 453, 643, '完成專家共識', 24, { fill: 'var(--muted)' });
  text(layers[4], 72, 712, '738點待共識；172點不確定，未納入估計。', 23, { fill: 'var(--muted)' });
  multiline(layers[4], 72, 758, ['專家主要判讀影像與輔助資料，', '不全部等於現地量測。'], 22, { fill: 'var(--muted)', lineHeight: 1.35 });
  text(layers[4], 823, 292, '各類的表現有落差', 33, { serif: true });
  text(layers[4], 823, 338, 'F1：同時考量漏分與誤分，越高越好', 23, { fill: 'var(--muted)' });
  const f1Rows = [];
  [0, 50, 100].forEach(value => {
    const x = 1115 + value * 3.13;
    line(layers[4], x, 377, x, 710, { stroke: 'var(--line)', 'stroke-dasharray': '2 6', opacity: .55 });
    text(layers[4], x, 367, String(value), 19, { anchor: 'middle', fill: 'var(--muted)' });
  });
  CLASSES.forEach((item, index) => {
    const y = 413 + index * 52, group = node('g', {}, layers[4]);
    text(group, 823, y, item.label, 24, { weight: item.id === 'planted' ? 700 : 450 });
    rect(group, 1115, y - 20, 313, 20, { fill: 'var(--bar-track)', rx: 1 });
    rect(group, 1115, y - 20, item.f1 * 3.13, 20, { fill: item.color, rx: 1 });
    text(group, 1528, y, `${item.f1.toFixed(1)}%`, 25, { anchor: 'end', weight: item.id === 'planted' ? 700 : 450 });
    f1Rows.push(group);
  });
  line(layers[4], 823, 732, 1528, 732);
  text(layers[4], 823, 773, '人工栽植林尤其難分，仍要回頭核對。', 26, { weight: 650 });

  // 105–120: return to organisms and land use rather than ending on an algorithm diagram.
  const finalOrder = ['natreg', 'plantation', 'treecrop'];
  finalOrder.forEach((id, index) => {
    const item = CLASSES.find(c => c.id === id), x = 72 + index * 496;
    photo(layers[5], URL5, FIGURES.figure5.panels[id].rect, x, 276, 464, 397);
    rect(layers[5], x, 698, 19, 4, { fill: item.color });
    text(layers[5], x + 29, 711, item.label, 27, { weight: 650 });
  });
  text(layers[5], 800, 769, '全球一致的判讀起點，難分地區仍須核對經營歷史。', 28,
    { anchor: 'middle', serif: true });
  text(layers[5], 800, 809, '森林類型，不直接等於碳量或生物多樣性。', 25,
    { anchor: 'middle', fill: 'var(--muted)' });

  // Permanent, compact provenance avoids confusing demonstrations and observations.
  const sourceNote = text(svg, 72, 853, '', 18, { fill: 'var(--muted)' });
  text(svg, 72, 881, 'Neumann等（2026），Scientific Data 13:1434，CC BY 4.0。影像 © Google Earth, Maxar Technologies, Airbus。', 16,
    { fill: 'var(--muted)' });

  function setTheme(value) {
    const nextTheme = value === 'dark' ? 'dark' : 'light';
    if (themeInitialized && nextTheme === currentTheme) return currentTheme;
    currentTheme = nextTheme;
    const values = currentTheme === 'dark'
      ? { paper: '#222526', ink: '#f1eee5', muted: '#c5c7c0', line: '#505958', teal: '#91c6bb', wash: '#2c3131', 'photo-mat': '#eef0e8', 'bar-track': '#404748' }
      : { paper: '#f3f1e8', ink: '#243b3a', muted: '#5f706a', line: '#c6cec5', teal: '#39766e', wash: '#ebece2', 'photo-mat': '#f5f4ee', 'bar-track': '#dce2d7' };
    for (const [key, color] of Object.entries(values)) svg.style.setProperty(`--${key}`, color);
    svg.setAttribute('data-theme', currentTheme);
    themeInitialized = true;
    return currentTheme;
  }
  const starts = [0, 18, 32, 60, 83, 105], ends = [18, 32, 60, 83, 105, 120];
  function layerWeight(t, index) {
    const half = reduce ? .1 : .35;
    const enter = index === 0 ? 1 : progress(t, starts[index] - half, starts[index] + half);
    const exit = index === 5 ? 1 : 1 - progress(t, ends[index] - half, ends[index] + half);
    return Math.min(enter, exit);
  }
  function renderAt(value) {
    if (destroyed) return;
    currentTime = clamp(Number.isFinite(Number(value)) ? Number(value) : 0, 0, DURATION);
    const state = getSceneState(currentTime, { reducedMotion: reduce });
    const phase = state.chapterIndex;
    if (phase !== lastPhase) {
      kicker.textContent = state.chapter.label;
      headline.textContent = TITLES[phase]; subtitle.textContent = SUBTITLES[phase];
      sourceNote.textContent = SOURCENOTES[phase]; lastPhase = phase;
    }
    layers.forEach((layer, index) => {
      const opacity = layerWeight(currentTime, index);
      layer.setAttribute('opacity', opacity.toFixed(6));
      layer.setAttribute('visibility', opacity > 0 ? 'visible' : 'hidden');
    });
    const activeCard = Math.min(4, Math.floor(clamp(currentTime / 18) * 5));
    introCards.forEach(({ card, mounting, color }, index) => {
      const active = index === activeCard;
      card.setAttribute('transform', `translate(0 ${reduce ? 0 : active ? -8 : 0})`);
      mounting.setAttribute('stroke', active ? color : 'var(--line)');
      mounting.setAttribute('stroke-width', active ? 3 : 1);
    });
    const mechanismTime = clamp(currentTime - 32, 0, 28);
    yearGroups.forEach(({ group, border }, index) => {
      const visible = reduce ? 1 : ease(progress(mechanismTime, index * .25, .9 + index * .25));
      group.setAttribute('opacity', String(visible));
      group.setAttribute('transform', `translate(0 ${reduce ? 0 : (1 - visible) * 10})`);
      border.setAttribute('stroke', index === 1 ? 'var(--teal)' : 'var(--line)');
      border.setAttribute('stroke-width', index === 1 ? 2.5 : 1.5);
    });
    const activeStage = mechanismTime < 10 ? 0 : mechanismTime < 19 ? 1 : 2;
    stageGroups.forEach(({ group, rule }, index) => {
      group.setAttribute('opacity', index <= activeStage ? 1 : .45);
      rule.setAttribute('stroke', index === activeStage ? 'var(--teal)' : 'var(--line)');
    });
    const reveal = reduce ? 1 : easeMove(progress(currentTime, 62, 73.5));
    wipeClip.setAttribute('width', (690 * reveal).toFixed(5));
    wipeLine.setAttribute('x1', (838 + 690 * reveal).toFixed(5));
    wipeLine.setAttribute('x2', (838 + 690 * reveal).toFixed(5));
    wipeLine.setAttribute('opacity', reveal > 0 && reveal < 1 ? 1 : 0);
    f1Rows.forEach((row, index) => row.setAttribute('opacity', reduce ? 1 : ease(progress(currentTime, 84 + index * .2, 85 + index * .2))));
    svg.setAttribute('data-time', currentTime.toFixed(6)); svg.setAttribute('data-chapter', state.chapterId);
    return getState();
  }
  function getState() {
    const state = getSceneState(currentTime, { reducedMotion: reduce });
    return { ...state, ready, theme: currentTheme, reducedMotion: reduce, destroyed,
      samePositionAuthorResult: true, imageSources: ['figure3.png', 'figure5.webp'],
      modelInferenceRun: false, hasAudio: false, renderedBy: 'pure-time-svg-v01' };
  }
  setTheme(currentTheme); renderAt(0);
  await Promise.all([URL3, URL5].map(source => new Promise((resolve, reject) => {
    const image = new Image(); image.onload = resolve; image.onerror = () => reject(new Error(`無法載入研究圖：${source}`)); image.src = source;
  })));
  if (document.fonts?.ready) await document.fonts.ready;
  ready = true;
  renderAt(0);
  return {
    svg, renderAt, setTheme,
    setReducedMotion(value) { const next = !!value; if (next !== reduce) { reduce = next; renderAt(currentTime); } return reduce; },
    getState,
    destroy() { destroyed = true; host.replaceChildren(); },
  };
}
