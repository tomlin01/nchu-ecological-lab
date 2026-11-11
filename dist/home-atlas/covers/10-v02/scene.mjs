import * as THREE from '../../../cases/10-01/animation/vendor/three.module.js';

const clamp = n => Math.max(0, Math.min(1, Number(n) || 0));
const BASE = -2.43;
const SIGNAL = {x: 1.38, z: 1.12, width: 0.66, depth: 0.39};

// A qualitative optical-signal model. Dimensions are illustrative, not instrument specifications.
// The controller owns time: this module never starts an animation or changes its own phase.
export async function createFutureScene(container) {
  if (!container?.appendChild) throw new Error('The lake scene needs a container.');
  const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true, preserveDrawingBuffer: true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.className = 'future-scene-canvas';
  renderer.domElement.setAttribute('aria-hidden', 'true');
  Object.assign(renderer.domElement.style, {position: 'absolute', inset: '0', width: '100%', height: '100%', display: 'block', pointerEvents: 'none'});
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-6, 6, 4, -4, 0.1, 80);
  const cameraOffset = new THREE.Vector3(7.4, 6.05, 11.8);
  const cameraTarget = new THREE.Vector3(0, -0.75, 0);
  const geometries = new Set(), materials = new Set();
  const geo = g => (geometries.add(g), g);
  const mat = (color, extra = {}) => {
    const m = new THREE.MeshStandardMaterial({color, roughness: 0.65, metalness: 0.02, ...extra});
    materials.add(m); return m;
  };
  const basic = (color, extra = {}) => {
    const m = new THREE.MeshBasicMaterial({color, ...extra}); materials.add(m); return m;
  };
  const cube = geo(new THREE.BoxGeometry(1, 1, 1));
  const cylinder = geo(new THREE.CylinderGeometry(1, 1, 1, 32));
  const pebble = geo(new THREE.IcosahedronGeometry(1, 2));
  const mesh = (parent, geometry, material, at = [0, 0, 0], scale = [1, 1, 1]) => {
    const m = new THREE.Mesh(geometry, material);
    m.position.set(...at); m.scale.set(...scale); m.castShadow = true; m.receiveShadow = true;
    parent.add(m); return m;
  };
  const box = (parent, m, at, scale) => mesh(parent, cube, m, at, scale);
  const cyl = (parent, m, at, r, h) => mesh(parent, cylinder, m, at, [r, h, r]);
  const line = (parent, points, color, opacity = 1) => {
    const m = new THREE.LineBasicMaterial({color, transparent: true, opacity, depthWrite: false}); materials.add(m);
    const o = new THREE.Line(geo(new THREE.BufferGeometry().setFromPoints(points.map(p => new THREE.Vector3(...p)))), m);
    parent.add(o); return o;
  };
  const tube = (parent, points, radius, m) => mesh(parent,
    geo(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p))), 36, radius, 8, false)), m);

  const hemi = new THREE.HemisphereLight('#edf6ff', '#4c6970', 2.0); scene.add(hemi);
  const key = new THREE.DirectionalLight('#f1f5f1', 2.8);
  key.position.set(-4, 9, 7); key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  Object.assign(key.shadow.camera, {left: -7, right: 7, top: 7, bottom: -7, near: 1, far: 30});
  key.shadow.normalBias = 0.025; scene.add(key);
  const fill = new THREE.DirectionalLight('#b5d9e3', 1.0); fill.position.set(5, 1, 4); scene.add(fill);

  const sand = mat('#727f7a'), soil = mat('#526461'), silt = mat('#677a75');
  const deepSoil = mat('#3d5353'), bank = mat('#728475');
  const reed = mat('#4b6755'), reedTip = mat('#645b45');
  const rockMats = ['#828f8a', '#647c79', '#a0a69b'].map(c => mat(c, {roughness: 0.95}));
  const steel = mat('#9daeb0', {metalness: 0.82, roughness: 0.28});
  const dark = mat('#173b43', {metalness: 0.64, roughness: 0.32});
  const rubber = mat('#263b3b', {roughness: 0.88});
  const ivory = mat('#e4e2d5', {roughness: 0.38, metalness: 0.12});
  const yellow = mat('#d9b55d', {roughness: 0.4, metalness: 0.18});

  const world = new THREE.Group(); scene.add(world);
  const perimeter = [];
  for (let i = 0; i < 96; i++) {
    const a = i / 96 * Math.PI * 2;
    const r = 1 + 0.055 * Math.sin(a * 3 + 0.6) + 0.035 * Math.sin(a * 7);
    perimeter.push([4.68 * r * Math.cos(a), 2.62 * r * Math.sin(a)]);
  }
  const outline = new THREE.Shape();
  perimeter.forEach(([x, z], i) => i ? outline.lineTo(x, -z) : outline.moveTo(x, -z)); outline.closePath();
  function stratum(y, depth, m, scale = 1) {
    const g = geo(new THREE.ExtrudeGeometry(outline, {depth, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.06, bevelThickness: 0.045, curveSegments: 64}));
    g.rotateX(-Math.PI / 2);
    return mesh(world, g, m, [0, y, 0], [scale, 1, scale]);
  }
  stratum(-3.18, 0.20, deepSoil, 0.98);
  stratum(-2.99, 0.14, soil, 0.99);
  stratum(-2.85, 0.11, silt);
  stratum(-2.74, 0.10, sand);

  // A low, asymmetric shore grows out of the back of the lake bed.
  const shoreVertices = [], shoreIndices = [];
  for (let i = 0; i <= 64; i++) {
    const a = Math.PI + i / 64 * Math.PI;
    const outer = 1 + 0.055 * Math.sin(a * 3 + 0.6) + 0.035 * Math.sin(a * 7);
    const height = 0.09 + 0.12 * Math.sin(i * 0.19) ** 2;
    shoreVertices.push(4.68 * outer * Math.cos(a), height, 2.62 * outer * Math.sin(a),
      4.27 * Math.cos(a), -0.03, 1.71 * Math.sin(a),
      3.95 * Math.cos(a), -2.61, 1.39 * Math.sin(a));
    if (i < 64) for (let j = 0; j < 2; j++) {
      const n = i * 3 + j; shoreIndices.push(n, n + 1, n + 3, n + 1, n + 4, n + 3);
    }
  }
  const shoreGeo = geo(new THREE.BufferGeometry());
  shoreGeo.setAttribute('position', new THREE.Float32BufferAttribute(shoreVertices, 3));
  shoreGeo.setIndex(shoreIndices); shoreGeo.computeVertexNormals();
  mesh(world, shoreGeo, bank);

  // The water is one shaped surface and a faint curved cut face, never a water box.
  const waterMat = mat('#6bb5bb', {transparent: true, opacity: 0.28, roughness: 0.22, metalness: 0.28, side: THREE.DoubleSide, depthWrite: false});
  const waterGeo = geo(new THREE.ShapeGeometry(outline, 64)); waterGeo.rotateX(-Math.PI / 2);
  const water = mesh(world, waterGeo, waterMat); water.castShadow = false; water.renderOrder = 8;
  const curtainVertices = [], curtainIndices = [];
  for (let i = 0; i <= 48; i++) {
    const [x, z] = perimeter[i % 96]; curtainVertices.push(x, 0, z, x, -2.62, z);
    if (i < 48) { const n = i * 2; curtainIndices.push(n, n + 1, n + 2, n + 1, n + 3, n + 2); }
  }
  const curtainGeo = geo(new THREE.BufferGeometry());
  curtainGeo.setAttribute('position', new THREE.Float32BufferAttribute(curtainVertices, 3)); curtainGeo.setIndex(curtainIndices); curtainGeo.computeVertexNormals();
  const curtainMat = mat('#79bec1', {transparent: true, opacity: 0.085, roughness: 0.45, side: THREE.DoubleSide, depthWrite: false});
  const curtain = mesh(world, curtainGeo, curtainMat); curtain.castShadow = false; curtain.renderOrder = 9;
  const surfaceEdge = line(world, [...perimeter, perimeter[0]].map(([x, z]) => [x, 0.008, z]), '#a9d7d3', 0.65);
  surfaceEdge.renderOrder = 10;
  for (const [rx, rz, z] of [[0.65, 0.35, 0], [1.04, 0.54, 0.03]]) {
    const points = Array.from({length: 70}, (_, i) => {const a = i / 69 * Math.PI * 2; return [0.05 + rx * Math.cos(a), 0.012, z + rz * Math.sin(a)];});
    line(world, points, '#cee5d9', 0.4).renderOrder = 10;
  }

  // Deterministic natural details: a few clustered stones, reeds, and submerged plants.
  for (let i = 0; i < 64; i++) {
    const a = i * 2.39996, r = Math.sqrt((i + 1) / 64);
    const x = Math.cos(a) * r * 4.2, z = Math.sin(a) * r * 2.22;
    if (z < -1.1 || (x > 0.55 && x < 2.1 && z > 0.5)) continue;
    const s = 0.075 + (Math.sin(i * 7.13) + 1) * 0.045;
    const stone = mesh(world, pebble, rockMats[i % 3], [x, -2.59, z], [s * 1.6, s * 0.65, s]); stone.rotation.set(i, i * 0.7, 0.2);
  }
  for (let i = 0; i < 25; i++) {
    const a = Math.PI + 0.22 + (i / 24) * 2.62;
    const x = Math.cos(a) * (4.35 + Math.sin(i * 2.3) * 0.12), z = Math.sin(a) * 2.26;
    const h = 0.5 + (Math.sin(i * 1.73) + 1) * 0.18;
    const stem = cyl(world, reed, [x, h / 2 + 0.03, z], 0.014, h); stem.rotation.z = Math.sin(i) * 0.14;
    cyl(world, reedTip, [x, h + 0.02, z], 0.026, 0.16);
    const leaf = box(world, reed, [x + 0.05, h * 0.49, z], [0.018, h * 0.72, 0.08]); leaf.rotation.z = -0.42;
  }
  for (let i = 0; i < 12; i++) {
    const x = -3.5 + i * 0.26, z = 0.6 + Math.sin(i * 1.7) * 0.4;
    tube(world, [[x, -2.6, z], [x + 0.09, -2.35, z], [x - 0.04, -2.12 + Math.sin(i) * 0.12, z]], 0.017, reed);
  }

  // The float and pressure housing deliberately have different, believable scales.
  const buoy = new THREE.Group(); world.add(buoy); buoy.position.set(0.05, 0, 0);
  cyl(buoy, yellow, [0, 0.045, 0], 0.48, 0.12);
  const floatRing = mesh(buoy, geo(new THREE.TorusGeometry(0.405, 0.105, 16, 56)), ivory, [0, 0.11, 0]); floatRing.rotation.x = Math.PI / 2;
  cyl(buoy, ivory, [0, 0.18, 0], 0.26, 0.23);
  cyl(buoy, dark, [0, 0.304, 0], 0.21, 0.025);
  cyl(buoy, steel, [-0.11, 0.46, 0], 0.018, 0.31);
  cyl(buoy, dark, [-0.11, 0.63, 0], 0.03, 0.055);
  const solar = box(buoy, dark, [0.04, 0.34, 0.025], [0.29, 0.025, 0.22]); solar.rotation.z = -0.11;
  for (let i = 0; i < 3; i++) line(buoy, [[-0.085 + i * 0.09, 0.36, -0.075], [-0.085 + i * 0.09, 0.36, 0.125]], '#82a5a7', 0.75);
  tube(world, [[0.05, -0.03, 0], [0.12, -0.46, 0.12], [0.24, -0.81, 0.55], [0.34, -1.12, 0.82]], 0.025, rubber);
  cyl(world, steel, [0.34, -1.48, 0.82], 0.145, 0.72);
  cyl(world, dark, [0.34, -1.13, 0.82], 0.17, 0.12);
  cyl(world, dark, [0.34, -1.82, 0.82], 0.16, 0.11);
  for (const y of [-1.27, -1.66]) cyl(world, steel, [0.34, y, 0.82], 0.17, 0.045);
  tube(world, [[0.34, -1.75, 0.82], [0.55, -1.95, 0.85], [0.84, -1.99, 1.12]], 0.035, dark);

  const optics = new THREE.Group(); optics.position.set(SIGNAL.x, BASE, SIGNAL.z); world.add(optics);
  // Open rails keep the inner optical volume legible from the camera angle.
  box(optics, dark, [0, -0.025, 0], [1.16, 0.15, 0.67]);
  box(optics, steel, [0, 0.065, 0], [1.04, 0.045, 0.57]);
  for (const x of [-0.51, 0.51]) {
    box(optics, dark, [x, 1.02, -0.245], [0.105, 2.0, 0.12]);
    box(optics, steel, [x + (x < 0 ? 0.028 : -0.028), 1.02, -0.175], [0.025, 1.91, 0.025]);
    for (const y of [0.17, 1.89]) {
      const bolt = cyl(optics, steel, [x, y, -0.163], 0.032, 0.025); bolt.rotation.x = Math.PI / 2;
    }
  }
  box(optics, dark, [0, 2.02, -0.23], [1.17, 0.14, 0.22]);
  const lensMat = mat('#5d999e', {transparent: true, opacity: 0.11, roughness: 0.12, metalness: 0.35, side: THREE.DoubleSide, depthWrite: false});
  const lens = box(optics, lensMat, [0, 1.04, -0.265], [0.9, 1.85, 0.018]); lens.renderOrder = 2;
  const teal = mat('#25aaa6', {metalness: 0.28, roughness: 0.24, emissive: '#087a78', emissiveIntensity: 0.28});
  const current = box(optics, teal, [0, 0.3, 0], [SIGNAL.width, 0.6, SIGNAL.depth]);
  const measured = box(optics, teal, [0, 0.601, 0], [SIGNAL.width, 0.002, SIGNAL.depth]);
  const topMat = basic('#b2fff0', {transparent: true, opacity: 0.8});
  const top = box(optics, topMat, [0, 0.603, 0], [SIGNAL.width + 0.012, 0.015, SIGNAL.depth + 0.012]);
  const forecast = new THREE.Group(); optics.add(forecast);
  const amber = mat('#e2b86d', {emissive: '#ae7937', emissiveIntensity: 0.3, roughness: 0.38, metalness: 0.24});
  const edgeWidth = 0.022, fw = SIGNAL.width + 0.13, fd = SIGNAL.depth + 0.13;
  for (const x of [-fw / 2, fw / 2]) for (const z of [-fd / 2, fd / 2])
    box(forecast, amber, [x, 0.85, z], [edgeWidth, 1.7, edgeWidth]);
  for (const y of [0, 1.7]) {
    for (const z of [-fd / 2, fd / 2]) box(forecast, amber, [0, y, z], [fw, edgeWidth, edgeWidth]);
    for (const x of [-fw / 2, fw / 2]) box(forecast, amber, [x, y, 0], [edgeWidth, edgeWidth, fd]);
  }
  // Small metal optical ports on the chamber's side ground the signal in the sensing rig.
  for (const y of [0.4, 1.4]) {
    const port = cyl(optics, dark, [-0.56, y, 0], 0.10, 0.12); port.rotation.z = Math.PI / 2;
    const glass = cyl(optics, steel, [-0.635, y, 0], 0.074, 0.018); glass.rotation.z = Math.PI / 2;
  }

  let last = {theme: 'light', phase: 'now', forecastProgress: 0, measurementProgress: 0};
  let width = 1, height = 1, disposed = false, focusProgress = 0, horizontalSpan = 11.8;
  const anchors = {};
  let opticalWindowBounds = {};
  function project(name, x, y, z) {
    const p = new THREE.Vector3(x, y, z).project(camera);
    anchors[name] = {x: (p.x + 1) * width / 2, y: (1 - p.y) * height / 2, nx: (p.x + 1) / 2, ny: (1 - p.y) / 2};
  }
  function resize() {
    if (disposed) return;
    const rect = container.getBoundingClientRect(); width = Math.max(1, rect.width); height = Math.max(1, rect.height);
    renderer.setSize(width, height, false);
    render(last);
  }
  function render(state = {}) {
    if (disposed) return;
    last = {...last, ...state};
    const night = last.theme === 'dark';
    renderer.setClearColor(night ? '#172124' : '#f2f0e8', 0);
    hemi.intensity = night ? 1.25 : 2.0; key.intensity = night ? 1.9 : 2.8; fill.intensity = night ? 1.4 : 1.0;
    waterMat.color.set(night ? '#3f858e' : '#4b8e97'); waterMat.opacity = night ? 0.20 : 0.23;
    curtainMat.opacity = night ? 0.055 : 0.065;
    amber.color.set(night ? '#f3cb82' : '#c79547'); amber.emissiveIntensity = night ? 0.55 : 0.15;
    const fp = last.phase === 'now' ? 0 : clamp(last.forecastProgress);
    const mp = last.phase === 'measured' ? clamp(last.measurementProgress) : 0;
    focusProgress = clamp(last.focusProgress ?? (last.phase === 'measured' ? 1 : fp));
    const focus = focusProgress * focusProgress * (3 - 2 * focusProgress);
    const aspect = width / height;
    const fullWidth = Math.max(11.8, aspect * 7.6), focusedWidth = Math.max(7.5, aspect * 4.25);
    horizontalSpan = fullWidth + (focusedWidth - fullWidth) * focus;
    cameraTarget.set(0.9 * focus, -0.75 - 0.4 * focus, 1.05 * focus);
    camera.position.copy(cameraTarget).add(cameraOffset); camera.lookAt(cameraTarget);
    camera.left = -horizontalSpan / 2; camera.right = horizontalSpan / 2;
    camera.top = horizontalSpan / aspect / 2; camera.bottom = -camera.top;
    camera.updateProjectionMatrix(); camera.updateMatrixWorld();
    forecast.visible = fp > 0.001; forecast.scale.y = Math.max(0.001, fp);
    measured.visible = mp > 0.001;
    const addedHeight = 0.55 * mp;
    measured.scale.y = Math.max(0.002, addedHeight); measured.position.y = 0.6 + addedHeight / 2;
    top.position.y = 0.608 + addedHeight;
    project('buoy', 0.05, 0.43, 0);
    project('probe', 0.34, -1.35, 0.82);
    project('current', SIGNAL.x, BASE + 0.6, SIGNAL.z);
    project('forecast', SIGNAL.x, BASE + 1.7, SIGNAL.z);
    project('measured', SIGNAL.x, BASE + 1.15, SIGNAL.z);
    const corners = [];
    for (const x of [-0.58, 0.58]) for (const y of [-0.1, 2.1]) for (const z of [-0.34, 0.34]) {
      const p = new THREE.Vector3(SIGNAL.x + x, BASE + y, SIGNAL.z + z).project(camera);
      corners.push({x: (p.x + 1) * width / 2, y: (1 - p.y) * height / 2});
    }
    const xs = corners.map(p => p.x), ys = corners.map(p => p.y);
    opticalWindowBounds = {x: Math.min(...xs), y: Math.min(...ys), width: Math.max(...xs) - Math.min(...xs), height: Math.max(...ys) - Math.min(...ys)};
    renderer.render(scene, camera);
    return getState();
  }
  function getState() {
    return {webgl: true, phase: last.phase, conceptualOnly: true, forecastOutlineVisible: forecast.visible,
      measurementVisible: measured.visible, forecastProgress: clamp(last.forecastProgress), measurementProgress: clamp(last.measurementProgress),
      focusProgress, horizontalSpan, cameraTarget: cameraTarget.toArray(), opticalWindowBounds,
      signalHeights: {current: 0.6, forecast: 1.7 * (forecast.visible ? forecast.scale.y : 0), measured: 0.6 + (measured.visible ? measured.scale.y : 0)}, anchors: {...anchors}};
  }
  function dispose() {
    if (disposed) return; disposed = true;
    geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose());
    renderer.dispose(); renderer.domElement.remove();
  }
  resize();
  return {render, resize, dispose, getState};
}
