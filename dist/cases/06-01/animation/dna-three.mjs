import * as THREE from './vendor/three.module.js';

const clamp = value => Math.max(0, Math.min(1, value));
const interval = (time, start, end) => clamp((time - start) / (end - start));
const ease = value => value * value * (3 - 2 * value);
const mix = (a, b, amount) => a + (b - a) * amount;
const BASE_COMPLEMENT = {A: 'T', T: 'A', C: 'G', G: 'C'};

export function createDNAView({container, data, onError}) {
  if (!container?.appendChild) throw new Error('DNA 圖像缺少顯示容器。');
  const baseSequence = data?.records?.[0]?.sequence;
  if (!/^[ACGT]{20}$/.test(baseSequence || '')) {
    throw new Error('DNA 圖像需要第一筆記錄的 20 個真實序列字母。');
  }
  const complement = [...baseSequence].map(base => BASE_COMPLEMENT[base]).join('');
  const renderer = new THREE.WebGLRenderer({antialias: true, alpha: false, powerPreference: 'low-power'});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor('#fbfaf5');
  renderer.domElement.className = 'dna-three-canvas';
  renderer.domElement.setAttribute('aria-hidden', 'true');
  Object.assign(renderer.domElement.style, {position: 'absolute', inset: '0', width: '100%', height: '100%', display: 'block'});

  const overlay = document.createElement('div');
  overlay.className = 'dna-three-labels';
  overlay.setAttribute('aria-hidden', 'true');
  Object.assign(overlay.style, {position: 'absolute', inset: '0', pointerEvents: 'none', overflow: 'visible', zIndex: '2'});
  container.append(renderer.domElement, overlay);
  const contextLost = event => {
    event.preventDefault();
    state.webgl = false;
    state.ready = false;
    onError?.(new Error('3D DNA 圖像的 WebGL 連線中斷，請重試。'));
  };
  renderer.domElement.addEventListener('webglcontextlost', contextLost);

  const geometries = new Set();
  const materials = new Set();
  const geometry = value => { geometries.add(value); return value; };
  const material = (color, opacity = 1, extra = {}) => {
    const value = new THREE.MeshStandardMaterial({color, transparent: true, opacity, roughness: 0.4, metalness: 0.08, ...extra});
    value.userData.baseOpacity = opacity;
    materials.add(value);
    return value;
  };
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.05, 150);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x86909a, 2.2));
  const keyLight = new THREE.DirectionalLight(0xffffff, 3.0);
  keyLight.position.set(-4, 6, 9);
  scene.add(keyLight);
  const rimLight = new THREE.DirectionalLight(0xc1ddf0, 1.6);
  rimLight.position.set(5, -1, -4);
  scene.add(rimLight);

  const sphere = geometry(new THREE.SphereGeometry(1, 36, 24));
  const beadSphere = geometry(new THREE.SphereGeometry(0.105, 16, 12));
  const bondCylinder = geometry(new THREE.CylinderGeometry(0.038, 0.038, 1, 8));
  const cell = new THREE.Group();
  scene.add(cell);
  const membrane = new THREE.Mesh(sphere, material('#92b8ca', 0.16, {depthWrite: false, side: THREE.DoubleSide}));
  membrane.scale.set(6.3, 4.2, 3.15);
  cell.add(membrane);
  const innerCell = new THREE.Mesh(sphere, material('#bed0cc', 0.08, {depthWrite: false}));
  innerCell.scale.set(6.08, 4.04, 2.99);
  cell.add(innerCell);
  const nucleus = new THREE.Mesh(sphere, material('#8b9eaf', 0.38, {depthWrite: false}));
  nucleus.position.set(-2.25, 0.35, 0.05);
  nucleus.scale.set(1.55, 1.45, 1.25);
  cell.add(nucleus);
  const nucleolus = new THREE.Mesh(sphere, material('#657d93', 0.58));
  nucleolus.position.set(-2.5, 0.5, 0.85);
  nucleolus.scale.setScalar(0.47);
  cell.add(nucleolus);

  function tube(points, radius, tubeMaterial, segments = 64) {
    return new THREE.Mesh(geometry(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), segments, radius, 8, false)), tubeMaterial);
  }
  function mitochondrion() {
    const group = new THREE.Group();
    const outer = new THREE.Mesh(sphere, material('#6d9bb3', 0.3, {depthWrite: false, side: THREE.DoubleSide}));
    outer.scale.set(1.65, 0.77, 0.7);
    group.add(outer);
    const inner = new THREE.Mesh(sphere, material('#9bbbc7', 0.13, {depthWrite: false}));
    inner.scale.set(1.5, 0.64, 0.57);
    group.add(inner);
    const cristaMaterial = material('#bb8f4e', 0.86);
    for (let index = 0; index < 7; index++) {
      const x = -1.19 + index * 0.38;
      const height = 0.42 * Math.sqrt(1 - Math.pow(x / 1.58, 2));
      const points = [
        new THREE.Vector3(x - 0.12, -height, 0.19),
        new THREE.Vector3(x - 0.1, height * 0.76, 0.08),
        new THREE.Vector3(x + 0.04, height, -0.01),
        new THREE.Vector3(x + 0.14, -height * 0.7, 0.07)
      ];
      const fold = tube(points, 0.044, cristaMaterial, 20);
      fold.userData.crista = true;
      group.add(fold);
    }
    return group;
  }
  for (const [x, y, z, rotation, scale] of [[1.9, -2.0, 0.4, -0.55, 0.7], [-1.0, -2.0, 1.0, 0.4, 0.62], [2.6, 2.0, -1.1, -0.2, 0.62]]) {
    const organelle = mitochondrion();
    organelle.position.set(x, y, z);
    organelle.rotation.z = rotation;
    organelle.scale.setScalar(scale);
    cell.add(organelle);
  }
  const focusPosition = new THREE.Vector3(2.55, 0.55, 1.0);
  const focus = mitochondrion();
  focus.position.copy(focusPosition);
  scene.add(focus);

  const dna = new THREE.Group();
  dna.position.copy(focusPosition).add(new THREE.Vector3(0, 0, 0.22));
  scene.add(dna);
  const ring = new THREE.Group();
  dna.add(ring);
  const blue = material('#356b8a');
  const ochre = material('#bc9149');
  const ringBlue = material('#6e8d9b', 0.88);
  const ringOchre = material('#8b9b9a', 0.8);
  const coiMaterial = material('#c46d4a');
  const barcodeMaterial = material('#edc356');
  function ringPoint(angle, strand = 1) {
    const radius = 1.22 + strand * 0.075;
    return new THREE.Vector3(radius * Math.cos(angle), radius * Math.sin(angle), Math.sin(angle * 2) * 0.11 + strand * 0.045);
  }
  function ringArc(start, end, strand, radius, arcMaterial) {
    const points = Array.from({length: 97}, (_, index) => ringPoint(mix(start, end, index / 96), strand));
    return tube(points, radius, arcMaterial, 96);
  }
  ring.add(ringArc(0, Math.PI * 2, 1, 0.04, ringBlue), ringArc(0, Math.PI * 2, -1, 0.04, ringOchre));
  const coi = new THREE.Group();
  coi.add(ringArc(-0.12, 1.95, 1, 0.057, coiMaterial), ringArc(-0.12, 1.95, -1, 0.057, coiMaterial));
  ring.add(coi);
  const barcode = new THREE.Group();
  barcode.add(ringArc(0.28, 1.48, 1, 0.067, barcodeMaterial), ringArc(0.28, 1.48, -1, 0.067, barcodeMaterial));
  ring.add(barcode);
  const ringRungs = new THREE.InstancedMesh(bondCylinder, ringOchre, 80);
  ringRungs.frustumCulled = false;
  ring.add(ringRungs);

  const dnaParts = new THREE.Group();
  dna.add(dnaParts);
  const topBeads = new THREE.InstancedMesh(beadSphere, blue, 20);
  const bottomBeads = new THREE.InstancedMesh(beadSphere, ochre, 20);
  const topBackbone = new THREE.InstancedMesh(bondCylinder, blue, 19);
  const bottomBackbone = new THREE.InstancedMesh(bondCylinder, ochre, 19);
  const upperRungs = new THREE.InstancedMesh(bondCylinder, blue, 20);
  const lowerRungs = new THREE.InstancedMesh(bondCylinder, ochre, 20);
  dnaParts.add(topBeads, bottomBeads, topBackbone, bottomBackbone, upperRungs, lowerRungs);
  dnaParts.traverse(object => { if (object.isInstancedMesh) object.frustumCulled = false; });
  const transform = new THREE.Object3D();
  const yAxis = new THREE.Vector3(0, 1, 0);
  const direction = new THREE.Vector3();
  const midpoint = new THREE.Vector3();
  function placeBond(mesh, index, a, b) {
    direction.subVectors(b, a);
    transform.position.copy(a).add(b).multiplyScalar(0.5);
    transform.quaternion.setFromUnitVectors(yAxis, direction.clone().normalize());
    transform.scale.set(1, direction.length(), 1);
    transform.updateMatrix();
    mesh.setMatrixAt(index, transform.matrix);
  }
  function placeBead(mesh, index, point) {
    transform.position.copy(point);
    transform.quaternion.identity();
    transform.scale.setScalar(1);
    transform.updateMatrix();
    mesh.setMatrixAt(index, transform.matrix);
  }
  for (let index = 0; index < 80; index++) {
    const angle = index / 80 * Math.PI * 2;
    placeBond(ringRungs, index, ringPoint(angle, 1), ringPoint(angle, -1));
  }
  ringRungs.instanceMatrix.needsUpdate = true;

  function makeLabel(text, className = 'dna-three-label') {
    const node = document.createElement('span');
    node.className = className;
    node.textContent = text;
    Object.assign(node.style, {position: 'absolute', left: '0', top: '0', whiteSpace: 'nowrap', lineHeight: '1.35', fontWeight: '650', transform: 'translate(-50%,-50%)', userSelect: 'none'});
    overlay.append(node);
    return node;
  }
  const labels = {
    cell: makeLabel('細胞'),
    mitochondrion: makeLabel('粒線體'),
    mtDNA: makeLabel('粒線體DNA'),
    coi: makeLabel('COI基因'),
    barcode: makeLabel('COI-5P')
  };
  const topLetters = [...baseSequence].map(base => makeLabel(base, 'dna-three-base dna-three-base-upper'));
  const bottomLetters = [...complement].map(base => makeLabel(base, 'dna-three-base dna-three-base-lower'));
  const endLabels = [makeLabel('5′'), makeLabel('3′'), makeLabel('3′'), makeLabel('5′')];
  const upperPoints = Array.from({length: 20}, () => new THREE.Vector3());
  const lowerPoints = Array.from({length: 20}, () => new THREE.Vector3());
  const projected = new THREE.Vector3();
  let width = 0;
  let height = 0;
  let lastTheme;
  let disposed = false;
  let letterPositions = [];
  const state = {ready: true, webgl: true, time: 0, stageName: 'hidden', theme: 'light', baseSequence, complement};

  function groupOpacity(group, opacity, cristaOpacity = 1) {
    group.visible = opacity > 0.002;
    group.traverse(object => {
      if (!object.isMesh) return;
      object.material.opacity = object.material.userData.baseOpacity * opacity * (object.userData.crista ? cristaOpacity : 1);
    });
  }
  function project(point, object = dna) {
    projected.copy(point);
    object.localToWorld(projected);
    projected.project(camera);
    return {x: (projected.x * 0.5 + 0.5) * width, y: (-projected.y * 0.5 + 0.5) * height};
  }
  function positionLabel(node, point, opacity, object = dna, dx = 0, dy = 0) {
    const position = project(point, object);
    node.style.left = `${position.x + dx}px`;
    node.style.top = `${position.y + dy}px`;
    const bounds = node.getBoundingClientRect();
    const inside = (center, size, extent) => size + 8 > extent ? extent / 2 : Math.max(4 + size / 2, Math.min(extent - 4 - size / 2, center));
    node.style.left = `${inside(position.x + dx, bounds.width, width)}px`;
    node.style.top = `${inside(position.y + dy, bounds.height, height)}px`;
    node.style.opacity = String(opacity);
    node.style.visibility = opacity > 0.002 ? 'visible' : 'hidden';
  }
  function setTheme(theme, compact) {
    const dark = theme === 'dark';
    const themeKey = `${dark}:${compact}`;
    if (lastTheme === themeKey) return;
    lastTheme = themeKey;
    state.theme = dark ? 'dark' : 'light';
    const paper = getComputedStyle(container).getPropertyValue('--paper').trim() || (dark ? '#292e31' : '#fbfaf5');
    renderer.setClearColor(paper);
    blue.color.set(dark ? '#85bedc' : '#356b8a');
    ochre.color.set(dark ? '#e6bd71' : '#bc9149');
    ringBlue.color.set(dark ? '#8ba9b5' : '#6e8d9b');
    ringOchre.color.set(dark ? '#a1b2b0' : '#8b9b9a');
    coiMaterial.color.set(dark ? '#e29b79' : '#c46d4a');
    barcodeMaterial.color.set(dark ? '#f4d17c' : '#edc356');
    const fontSize = compact ? 13 : 18;
    for (const node of [...Object.values(labels), ...endLabels]) {
      Object.assign(node.style, {fontSize: `${fontSize}px`, color: dark ? '#ecede4' : '#263d49', padding: '3px 7px', borderRadius: '4px', background: paper});
    }
    labels.coi.style.color = dark ? '#f2b397' : '#9d472d';
    labels.barcode.style.color = dark ? '#f6d98e' : '#795b16';
    for (const [nodes, color, border] of [[topLetters, dark ? '#d0e9f5' : '#28546d', dark ? '#6b97aa' : '#98b6c4'], [bottomLetters, dark ? '#efd4a2' : '#836027', dark ? '#a88b58' : '#d0bc92']]) {
      for (const node of nodes) Object.assign(node.style, {fontSize: `${fontSize}px`, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', width: `${compact ? 16 : 25}px`, height: `${compact ? 23 : 30}px`, display: 'grid', placeItems: 'center', color, background: paper, border: `1px solid ${border}`, borderRadius: '4px', fontWeight: '700'});
    }
  }

  function render({time = 0, theme = 'light', reducedMotion = false, compact = false, targets = []} = {}) {
    if (disposed) return;
    time = Number.isFinite(time) ? time : 0;
    targets = Array.isArray(targets) ? targets : [];
    state.time = time;
    state.stageName = time < 14 || time >= 48 ? 'hidden' : time < 18 ? 'cell' : time < 22 ? 'mitochondrion' : time < 26 ? 'mitochondrial-dna' : time < 30 ? 'dna-morph' : time < 34 ? 'double-helix' : time < 38 ? 'base-pairs' : time < 42 ? 'sequence-readout' : time < 46 ? 'sequence-row' : 'handoff';
    const visible = time >= 14 && time < 48;
    renderer.domElement.style.visibility = visible ? 'visible' : 'hidden';
    overlay.style.visibility = visible ? 'visible' : 'hidden';
    const bounds = container.getBoundingClientRect();
    const nextWidth = Math.max(1, Math.round(bounds.width));
    const nextHeight = Math.max(1, Math.round(bounds.height));
    if (nextWidth !== width || nextHeight !== height) {
      width = nextWidth;
      height = nextHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
    compact ||= width < 600;
    setTheme(theme, compact);
    const zoom = ease(interval(time, 18, 22));
    const reveal = ease(interval(time, 22, 26));
    const morph = ease(interval(time, 26, 30));
    const flatten = ease(interval(time, 34, 38));
    const row = ease(interval(time, 42, 46));
    const handoff = ease(interval(time, 46, 48));
    const aspect = width / height;
    const cellDistance = Math.max(19.5, 20 / aspect);
    const mitoDistance = Math.max(5.4, 5.8 / aspect);
    const ringDistance = Math.max(8, 6.7 / aspect);
    const helixDistance = Math.max(5.6, 14.8 / aspect) + 0.95 * (1 - flatten);
    const target = new THREE.Vector3().lerpVectors(new THREE.Vector3(0.3, 0.05, 0), dna.position, zoom);
    let distance = mix(cellDistance, mitoDistance, zoom);
    distance = mix(distance, ringDistance, reveal);
    distance = mix(distance, helixDistance, morph);
    camera.position.copy(target).add(new THREE.Vector3(mix(0.65, 0, zoom), mix(0.5, 0, zoom), distance));
    camera.lookAt(target);
    camera.updateMatrixWorld();
    groupOpacity(cell, 1 - ease(interval(time, 18, 21.5)));
    groupOpacity(focus, 1 - ease(interval(time, 22.1, 25.0)), 1 - interval(time, 21.5, 23.0));
    const ringScale = mix(0.31, 1.6, reveal);
    ring.scale.setScalar(ringScale);
    ring.rotation.set(-0.12, -0.18, -0.08);
    const ringOpacity = ease(interval(time, 21.5, 23.0)) * (1 - ease(interval(time, 26.2, 28.7)));
    groupOpacity(ring, ringOpacity);
    groupOpacity(coi, ringOpacity * ease(interval(time, 23.1, 24.0)));
    groupOpacity(barcode, ringOpacity * ease(interval(time, 24.2, 25.1)));

    // These twenty pairs are a local schematic window; ring distances do not encode base coordinates.
    const strandOpacity = ease(interval(time, 25.7, 26.2)) * (1 - ease(interval(time, 43.0, 46)));
    blue.opacity = strandOpacity;
    ochre.opacity = strandOpacity * (1 - interval(time, 42, 45) * 0.55);
    dnaParts.visible = strandOpacity > 0.002;
    const helixTurn = reducedMotion ? 0 : mix(-0.16, 0.12, ease(interval(time, 30, 34))) * (1 - flatten);
    for (let index = 0; index < 20; index++) {
      const angle = mix(0.43, 1.31, index / 19);
      const ringTop = ringPoint(angle, 1).multiplyScalar(ringScale).applyEuler(ring.rotation);
      const ringBottom = ringPoint(angle, -1).multiplyScalar(ringScale).applyEuler(ring.rotation);
      const phase = index / 19 * Math.PI * 3.6 + helixTurn;
      const x = mix(-4.55, 4.55, index / 19);
      // Increasing x with (cos, sin) in the yz plane forms a right-handed helix.
      const top = new THREE.Vector3(x, mix(Math.cos(phase) * 0.9, 0.72, flatten), mix(Math.sin(phase) * 0.9, 0.0, flatten));
      const bottom = new THREE.Vector3(x, mix(-Math.cos(phase) * 0.9, -0.72, flatten), mix(-Math.sin(phase) * 0.9, 0.0, flatten));
      top.y = mix(top.y, 0.17, row);
      bottom.y = mix(bottom.y, -0.95, row);
      upperPoints[index].lerpVectors(ringTop, top, morph);
      lowerPoints[index].lerpVectors(ringBottom, bottom, morph);
      placeBead(topBeads, index, upperPoints[index]);
      placeBead(bottomBeads, index, lowerPoints[index]);
      midpoint.copy(upperPoints[index]).add(lowerPoints[index]).multiplyScalar(0.5);
      placeBond(upperRungs, index, upperPoints[index], midpoint);
      placeBond(lowerRungs, index, midpoint, lowerPoints[index]);
      if (index) {
        placeBond(topBackbone, index - 1, upperPoints[index - 1], upperPoints[index]);
        placeBond(bottomBackbone, index - 1, lowerPoints[index - 1], lowerPoints[index]);
      }
    }
    for (const object of dnaParts.children) object.instanceMatrix.needsUpdate = true;
    scene.updateMatrixWorld(true);
    const beforeDNA = 1 - ease(interval(time, 21.5, 22.5));
    positionLabel(labels.cell, new THREE.Vector3(-3.4, 3.1, 0), visible ? beforeDNA * (1 - zoom) : 0, scene);
    positionLabel(labels.mitochondrion, new THREE.Vector3(0.1, -1.05, 0.6), visible ? beforeDNA : 0, focus, 0, 12);
    positionLabel(labels.mtDNA, new THREE.Vector3(-0.2, -1.5, 0), visible ? ringOpacity * ease(interval(time, 22, 23)) : 0, ring, 0, 10);
    positionLabel(labels.coi, ringPoint(1.92, 1), visible ? ringOpacity * ease(interval(time, 23.1, 24)) * (1 - interval(time, 25.6, 26.4)) : 0, ring, -18, -24);
    positionLabel(labels.barcode, ringPoint(0.36, 1), visible ? ringOpacity * ease(interval(time, 24.2, 25.1)) : 0, ring, 20, -23);
    const lettersOpacity = ease(interval(time, 38, 39.5));
    const complementOpacity = lettersOpacity * (1 - ease(interval(time, 42, 44.4)));
    letterPositions = [];
    for (let index = 0; index < 20; index++) {
      const start = project(upperPoints[index]);
      const destination = targets[index];
      const hasTarget = Number.isFinite(destination?.x) && Number.isFinite(destination?.y);
      const targetX = hasTarget ? destination.x + (destination.width || 0) / 2 : start.x;
      const targetY = hasTarget ? destination.y + (destination.height || 0) / 2 : start.y;
      const x = mix(start.x, targetX, handoff);
      const y = mix(start.y, targetY, handoff);
      const opacity = visible ? lettersOpacity : 0;
      topLetters[index].style.left = `${x}px`;
      topLetters[index].style.top = `${y}px`;
      topLetters[index].style.opacity = String(opacity);
      topLetters[index].style.visibility = opacity > 0.002 ? 'visible' : 'hidden';
      positionLabel(bottomLetters[index], lowerPoints[index], visible ? complementOpacity : 0);
      letterPositions.push({index, letter: baseSequence[index], x, y, width: compact ? 16 : 25, height: compact ? 23 : 30, opacity});
    }
    const endsOpacity = visible ? lettersOpacity * (1 - ease(interval(time, 42.8, 45))) : 0;
    positionLabel(endLabels[0], upperPoints[0], endsOpacity, dna, compact ? -10 : -23, -29);
    positionLabel(endLabels[1], upperPoints[19], endsOpacity, dna, compact ? 10 : 23, -29);
    positionLabel(endLabels[2], lowerPoints[0], endsOpacity, dna, compact ? -10 : -23, 28);
    positionLabel(endLabels[3], lowerPoints[19], endsOpacity, dna, compact ? 10 : 23, 28);
    renderer.domElement.style.opacity = String(1 - handoff);
    if (visible && state.webgl) renderer.render(scene, camera);
  }

  function dispose() {
    if (disposed) return;
    disposed = true;
    state.ready = false;
    state.webgl = false;
    renderer.domElement.removeEventListener('webglcontextlost', contextLost);
    for (const value of geometries) value.dispose();
    for (const value of materials) value.dispose();
    scene.traverse(object => { if (object.isInstancedMesh) object.dispose(); });
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
    overlay.remove();
  }
  function getState() {
    return {
      ...state,
      letterPositions: letterPositions.map(position => ({...position})),
      clearColor: `#${renderer.getClearColor(new THREE.Color()).getHexString()}`,
      materialColors: {upperStrand: `#${blue.color.getHexString()}`, lowerStrand: `#${ochre.color.getHexString()}`, ringBackbone: `#${ringBlue.color.getHexString()}`, coi: `#${coiMaterial.color.getHexString()}`, coi5p: `#${barcodeMaterial.color.getHexString()}`},
      objects: scene.children.length,
      drawcalls: renderer.info.render.calls,
      geometries: renderer.info.memory.geometries,
      canvasCount: container.querySelectorAll('.dna-three-canvas').length
    };
  }
  render({time: 0});
  return {render, dispose, getState};
}
