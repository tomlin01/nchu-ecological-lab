import * as THREE from './vendor/three.module.js';

const clamp = value => Math.max(0, Math.min(1, value));
const mix = (a, b, amount) => a + (b - a) * amount;
const ease = amount => amount * amount * (3 - 2 * amount);
const progress = (time, start, end) => ease(clamp((time - start) / (end - start)));
const PHASE_STARTS = [0, 18, 38, 65, 92, 106];
const WATER_Y = 0;
const PROBE_TIP_Y = -1.65;
const BOARD_Y = 0.973;

// All dimensions describe a concept model, not the authors' measured hardware.
// This module has no clock. Each visible change is a pure function of render(state).
export async function createLakeScene(container) {
  if (!container?.appendChild) throw new Error('湖泊 3D 場景缺少容器。');
  const renderer = new THREE.WebGLRenderer({
    alpha: true, antialias: true, preserveDrawingBuffer: true,
    powerPreference: 'low-power'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.className = 'lake-three-canvas';
  renderer.domElement.setAttribute('aria-hidden', 'true');
  Object.assign(renderer.domElement.style, {
    position: 'absolute', inset: '0', display: 'block', width: '100%', height: '100%', pointerEvents: 'none'
  });
  container.appendChild(renderer.domElement);

  const geometries = new Set();
  const materials = new Set();
  const textures = new Set();
  const geometry = value => { geometries.add(value); return value; };
  const material = (color, options = {}) => {
    const value = new THREE.MeshStandardMaterial({color, roughness: 0.55, metalness: 0.04, ...options});
    materials.add(value);
    return value;
  };
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2('#b5c8bf', 0.018);
  const camera = new THREE.PerspectiveCamera(38, 1, 0.035, 180);
  const lookAt = new THREE.Vector3();
  scene.add(new THREE.HemisphereLight('#f7f3e5', '#547a79', 2.0));
  const sun = new THREE.DirectionalLight('#fff1d0', 3.1);
  sun.position.set(-6, 10, 6);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.left = -6;
  sun.shadow.camera.right = 6;
  sun.shadow.camera.top = 6;
  sun.shadow.camera.bottom = -6;
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 35;
  sun.shadow.normalBias = 0.025;
  sun.shadow.bias = -0.0002;
  scene.add(sun);
  const fill = new THREE.DirectionalLight('#bbd9df', 0.65);
  fill.position.set(6, 3, -4);
  scene.add(fill);

  const skyCanvas = document.createElement('canvas');
  skyCanvas.width = 512;
  skyCanvas.height = 256;
  const sky = skyCanvas.getContext('2d');
  const skyGradient = sky.createLinearGradient(0, 0, 0, 256);
  skyGradient.addColorStop(0, '#bad7e5');
  skyGradient.addColorStop(0.46, '#edf0df');
  skyGradient.addColorStop(0.56, '#a3b6a9');
  skyGradient.addColorStop(1, '#5c827d');
  sky.fillStyle = skyGradient;
  sky.fillRect(0, 0, 512, 256);
  const glow = sky.createRadialGradient(115, 90, 0, 115, 90, 48);
  glow.addColorStop(0, '#fff9d9');
  glow.addColorStop(0.12, '#fff8e0');
  glow.addColorStop(1, '#fff8e000');
  sky.fillStyle = glow;
  sky.fillRect(0, 0, 512, 256);
  const environment = new THREE.CanvasTexture(skyCanvas);
  environment.mapping = THREE.EquirectangularReflectionMapping;
  environment.colorSpace = THREE.SRGBColorSpace;
  textures.add(environment);
  scene.environment = environment;
  const skyTexture = new THREE.CanvasTexture(skyCanvas);
  skyTexture.colorSpace = THREE.SRGBColorSpace;
  textures.add(skyTexture);
  const skyMaterial = new THREE.MeshBasicMaterial({map: skyTexture, side: THREE.BackSide, depthWrite: false, fog: false});
  materials.add(skyMaterial);
  const skyDome = new THREE.Mesh(geometry(new THREE.SphereGeometry(120, 32, 16)), skyMaterial);
  scene.add(skyDome);

  const boxGeometry = geometry(new THREE.BoxGeometry(1, 1, 1));
  const cylinderGeometry = geometry(new THREE.CylinderGeometry(1, 1, 1, 24));
  const sphereGeometry = geometry(new THREE.SphereGeometry(1, 16, 10));
  const yellow = material('#e6b72d', {roughness: 0.34, metalness: 0.08});
  const yellowEdge = material('#b78b19', {roughness: 0.6});
  const ivory = material('#e7e7d9', {roughness: 0.4, metalness: 0.1});
  const dark = material('#263537', {roughness: 0.55});
  const steel = material('#a2aeb0', {metalness: 0.78, roughness: 0.3});
  const rubber = material('#202c2d', {roughness: 0.84});
  const gold = material('#c8a45d', {roughness: 0.36, metalness: 0.7});
  const green = material('#165c48', {roughness: 0.48});

  function mesh(parent, meshGeometry, meshMaterial, position, scale) {
    const object = new THREE.Mesh(meshGeometry, meshMaterial);
    if (position) object.position.set(...position);
    if (scale) object.scale.set(...scale);
    object.castShadow = true;
    object.receiveShadow = true;
    parent.add(object);
    return object;
  }
  function box(parent, meshMaterial, position, scale) {
    return mesh(parent, boxGeometry, meshMaterial, position, scale);
  }
  function cylinder(parent, meshMaterial, position, radius, height, radiusZ = radius) {
    return mesh(parent, cylinderGeometry, meshMaterial, position, [radius, height, radiusZ]);
  }
  function tube(parent, points, radius, meshMaterial, segments = 32) {
    return mesh(parent, geometry(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p))), segments, radius, 7, false)), meshMaterial);
  }

  const nature = new THREE.Group();
  scene.add(nature);
  function ridge(z, base, height, color, offset) {
    const vertices = [];
    const indices = [];
    const count = 100;
    for (let i = 0; i <= count; i++) {
      const x = -65 + i * 1.3;
      const top = base + height * (0.52 + 0.20 * Math.sin(i * 0.08 + offset) + 0.17 * Math.sin(i * 0.17 + offset * 2) + 0.08 * Math.cos(i * 0.31));
      vertices.push(x, -1.3, z, x, top, z);
      if (i < count) {
        const a = i * 2;
        indices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
      }
    }
    const ridgeGeometry = geometry(new THREE.BufferGeometry());
    ridgeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    ridgeGeometry.setIndex(indices);
    ridgeGeometry.computeVertexNormals();
    mesh(nature, ridgeGeometry, material(color, {roughness: 1, side: THREE.DoubleSide}));
  }
  ridge(-55, 0.3, 11, '#8baba7', 0.5);
  ridge(-41, -0.1, 7.2, '#6b9185', 1.5);
  ridge(-29, -0.05, 4.6, '#4a7162', 3.1);
  const shore = box(nature, material('#6c7960', {roughness: 1}), [0, -0.25, -22], [90, 0.55, 3]);
  shore.castShadow = false;
  const treeColors = ['#426655', '#50705a', '#64774e'];
  for (let i = 0; i < 47; i++) {
    const x = -30 + i * 1.33;
    const z = -21.2 - (Math.sin(i * 2.1) + 1) * 1.5;
    const size = 0.55 + (Math.sin(i * 1.73) + 1) * 0.24;
    const tree = new THREE.Group();
    tree.position.set(x, 0, z);
    const foliage = material(treeColors[i % treeColors.length], {roughness: 1});
    cylinder(tree, material('#5b6150', {roughness: 1}), [0, 0.42 * size, 0], 0.055 * size, 0.85 * size);
    mesh(tree, sphereGeometry, foliage, [-0.18 * size, 1.0 * size, 0], [0.58 * size, 0.69 * size, 0.46 * size]);
    mesh(tree, sphereGeometry, foliage, [0.23 * size, 1.18 * size, 0.03], [0.48 * size, 0.66 * size, 0.44 * size]);
    nature.add(tree);
    tree.traverse(object => { object.castShadow = false; object.receiveShadow = false; });
  }
  const reeds = new THREE.InstancedMesh(cylinderGeometry, material('#6e7950', {roughness: 1}), 90);
  const reedLeaves = new THREE.InstancedMesh(boxGeometry, material('#7c8a55', {roughness: 1}), 90);
  const reedTransform = new THREE.Object3D();
  for (let i = 0; i < 90; i++) {
    const x = -24 + i * 0.57;
    const z = -20.25 + Math.sin(i * 2.0) * 0.34;
    const reedHeight = 0.4 + (Math.sin(i * 1.71) + 1) * 0.23;
    reedTransform.position.set(x, reedHeight / 2, z);
    reedTransform.rotation.set(0, 0, Math.sin(i) * 0.07);
    reedTransform.scale.set(0.015, reedHeight, 0.015);
    reedTransform.updateMatrix();
    reeds.setMatrixAt(i, reedTransform.matrix);
    reedTransform.position.set(x + 0.08, reedHeight * 0.57, z);
    reedTransform.rotation.set(0.15, i * 0.7, -0.7);
    reedTransform.scale.set(0.012, reedHeight * 0.65, 0.065);
    reedTransform.updateMatrix();
    reedLeaves.setMatrixAt(i, reedTransform.matrix);
  }
  nature.add(reeds, reedLeaves);

  const waterUniforms = {lakeTime: {value: 0}, lakeCutaway: {value: 0}, lakeMotion: {value: 1}};
  const waterMaterial = material('#477f81', {
    roughness: 0.26, metalness: 0.14, transparent: true, opacity: 0.87,
    depthWrite: false, side: THREE.DoubleSide, envMapIntensity: 0.8
  });
  waterMaterial.onBeforeCompile = shader => {
    Object.assign(shader.uniforms, waterUniforms);
    const header = 'uniform float lakeTime; uniform float lakeCutaway; uniform float lakeMotion; varying vec3 vLakePosition;\n';
    shader.vertexShader = header + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace('#include <beginnormal_vertex>', `
      #include <beginnormal_vertex>
      float w1 = position.x * 2.4 + position.z * 1.7 + lakeTime * 0.65;
      float w2 = position.x * 4.1 - position.z * 3.3 - lakeTime * 0.42;
      float dx = lakeMotion * (0.022 * 2.4 * cos(w1) + 0.007 * 4.1 * cos(w2));
      float dz = lakeMotion * (0.022 * 1.7 * cos(w1) - 0.007 * 3.3 * cos(w2));
      objectNormal = normalize(vec3(-dx, 1.0, -dz));
    `);
    shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', `
      #include <begin_vertex>
      transformed.y += lakeMotion * (0.022 * sin(w1) + 0.007 * sin(w2));
      vLakePosition = transformed;
    `);
    shader.fragmentShader = header + shader.fragmentShader;
    shader.fragmentShader = shader.fragmentShader.replace('#include <color_fragment>', `
      #include <color_fragment>
      float patchX = 1.0 - smoothstep(2.25, 2.5, abs(vLakePosition.x));
      float patchFront = smoothstep(-0.6, -0.35, vLakePosition.z);
      float patchEnd = 1.0 - smoothstep(4.0, 4.3, vLakePosition.z);
      diffuseColor.a *= 1.0 - lakeCutaway * 0.95 * patchX * patchFront * patchEnd;
    `);
  };
  waterMaterial.customProgramCacheKey = () => 'lake-water-cutaway-v1';
  const waterGeometry = geometry(new THREE.PlaneGeometry(120, 100, 120, 100));
  waterGeometry.rotateX(-Math.PI / 2);
  const water = mesh(scene, waterGeometry, waterMaterial, [0, WATER_Y, -15]);
  // Keep local x/z equal to world x/z for the cutaway shader's reference frame.
  water.position.z = 0;
  water.castShadow = false;
  water.receiveShadow = true;
  water.renderOrder = 4;
  const surfacePatches = new THREE.Group();
  scene.add(surfacePatches);
  const algaeMaterial = material('#89a66a', {roughness: 0.9, transparent: true, opacity: 0.14, depthWrite: false, side: THREE.DoubleSide});
  for (const [x, z, size, stretch] of [[-4.8, -2.5, 1.25, 0.55], [-6.2, -1.5, 0.9, 0.4], [4.8, -6.5, 2.0, 0.7], [6.0, -4.1, 1.05, 0.4]]) {
    const outline = new THREE.Shape();
    for (let i = 0; i <= 32; i++) {
      const a = i / 32 * Math.PI * 2;
      const radius = size * (1 + Math.sin(a * 5) * 0.13 + Math.sin(a * 7 + x) * 0.09);
      const px = Math.cos(a) * radius;
      const py = Math.sin(a) * radius * stretch;
      if (i === 0) outline.moveTo(px, py); else outline.lineTo(px, py);
    }
    const patch = mesh(surfacePatches, geometry(new THREE.ShapeGeometry(outline)), algaeMaterial, [x, 0.014, z]);
    patch.rotation.x = -Math.PI / 2;
    patch.castShadow = false;
    patch.renderOrder = 5;
  }

  const underwater = new THREE.Group();
  scene.add(underwater);
  const cutawayGlass = material('#4c9297', {transparent: true, opacity: 0, depthWrite: false, roughness: 0.45, side: THREE.DoubleSide});
  const cutawaySide = box(underwater, cutawayGlass, [0, -1.13, -0.48], [4.8, 2.26, 0.018]);
  cutawaySide.castShadow = false;
  const lakeFloor = mesh(underwater, geometry(new THREE.PlaneGeometry(4.8, 4.5)), material('#67897a', {roughness: 1, transparent: true, opacity: 0, depthWrite: false}), [0, -2.27, 1.78]);
  lakeFloor.rotation.x = -Math.PI / 2;
  lakeFloor.castShadow = false;
  const waterLine = tube(underwater, [[-2.38, 0, -0.48], [0, 0, -0.48], [2.38, 0, -0.48]], 0.009, material('#bfdad5', {transparent: true, opacity: 0}), 12);
  waterLine.castShadow = false;

  const buoy = new THREE.Group();
  scene.add(buoy);
  const float = cylinder(buoy, yellow, [0, 0.075, 0], 0.78, 0.15);
  const floatRing = mesh(buoy, geometry(new THREE.TorusGeometry(0.69, 0.15, 18, 64)), yellow, [0, 0.10, 0]);
  floatRing.rotation.x = Math.PI / 2;
  const lowerRim = mesh(buoy, geometry(new THREE.TorusGeometry(0.68, 0.045, 10, 64)), yellowEdge, [0, -0.015, 0]);
  lowerRim.rotation.x = Math.PI / 2;
  cylinder(buoy, yellow, [0, 0.21, 0], 0.35, 0.19);
  const tower = new THREE.Group();
  buoy.add(tower);
  for (const x of [-0.29, 0.29]) {
    for (const z of [-0.23, 0.23]) {
      cylinder(tower, steel, [x, 0.52, z], 0.025, 0.57);
      cylinder(tower, steel, [x, 0.247, z], 0.045, 0.02);
    }
  }
  box(tower, yellow, [0, 0.80, 0], [0.83, 0.10, 0.68]);
  const enclosure = new THREE.Group();
  enclosure.position.y = 0.85;
  tower.add(enclosure);
  box(enclosure, ivory, [0, 0.018, 0], [0.86, 0.036, 0.66]);
  box(enclosure, ivory, [-0.414, 0.125, 0], [0.034, 0.23, 0.66]);
  box(enclosure, ivory, [0.414, 0.125, 0], [0.034, 0.23, 0.66]);
  box(enclosure, ivory, [0, 0.125, -0.314], [0.80, 0.23, 0.034]);
  box(enclosure, ivory, [0, 0.125, 0.314], [0.80, 0.23, 0.034]);
  const gasket = material('#53625a', {roughness: 0.9});
  for (const z of [-0.307, 0.307]) box(enclosure, gasket, [0, 0.246, z], [0.83, 0.009, 0.015]);
  for (const x of [-0.407, 0.407]) box(enclosure, gasket, [x, 0.246, 0], [0.015, 0.009, 0.60]);
  const lid = new THREE.Group();
  lid.position.set(0, 1.102, -0.328);
  buoy.add(lid);
  box(lid, ivory, [0, 0.026, 0.328], [0.88, 0.052, 0.69]);
  box(lid, material('#cbd1c4', {roughness: 0.7}), [0, -0.006, 0.328], [0.76, 0.009, 0.57]);
  for (const x of [-0.30, 0.30]) {
    const hinge = cylinder(buoy, steel, [x, 1.095, -0.337], 0.027, 0.12);
    hinge.rotation.z = Math.PI / 2;
  }
  const antenna = new THREE.Group();
  antenna.position.set(-0.28, 1.11, -0.16);
  buoy.add(antenna);
  cylinder(antenna, rubber, [0, 0.20, 0], 0.019, 0.40);
  mesh(antenna, sphereGeometry, rubber, [0, 0.40, 0], [0.019, 0.023, 0.019]);

  const board = new THREE.Group();
  board.position.y = BOARD_Y;
  buoy.add(board);
  box(board, green, [0, 0, 0], [0.67, 0.024, 0.46]);
  const pcbCanvas = document.createElement('canvas');
  pcbCanvas.width = 1024;
  pcbCanvas.height = 704;
  const pcb = pcbCanvas.getContext('2d');
  pcb.fillStyle = '#185f48';
  pcb.fillRect(0, 0, 1024, 704);
  pcb.lineCap = 'square';
  for (let i = 0; i < 16; i++) {
    const startX = 345 + (i % 8) * 43;
    const sign = i < 8 ? -1 : 1;
    const startY = 352 + sign * 82;
    const endX = 83 + i * 56;
    const endY = sign < 0 ? 74 + (i % 3) * 31 : 630 - (i % 3) * 30;
    pcb.strokeStyle = i % 3 === 0 ? '#ab9453' : '#50906b';
    pcb.lineWidth = i % 3 === 0 ? 5 : 4;
    pcb.beginPath();
    pcb.moveTo(startX, startY);
    pcb.lineTo(startX, mix(startY, endY, 0.45));
    pcb.lineTo(endX, endY);
    pcb.lineTo(endX + 22, endY);
    pcb.stroke();
    pcb.fillStyle = '#d7bd77';
    pcb.beginPath();
    pcb.arc(endX + 22, endY, 8, 0, Math.PI * 2);
    pcb.fill();
  }
  pcb.strokeStyle = '#d9e5c7';
  pcb.lineWidth = 3;
  for (const [x, y, w, h] of [[348, 260, 330, 184], [85, 280, 116, 135], [735, 230, 146, 190], [300, 95, 170, 76]]) pcb.strokeRect(x, y, w, h);
  const pcbTexture = new THREE.CanvasTexture(pcbCanvas);
  pcbTexture.colorSpace = THREE.SRGBColorSpace;
  pcbTexture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
  textures.add(pcbTexture);
  const boardTop = mesh(board, geometry(new THREE.PlaneGeometry(0.665, 0.455)), material('#ffffff', {map: pcbTexture, roughness: 0.5, metalness: 0.12}), [0, 0.0125, 0]);
  boardTop.rotation.x = -Math.PI / 2;
  const chip = box(board, dark, [0.005, 0.045, 0], [0.205, 0.054, 0.145]);
  box(board, material('#3b4443', {roughness: 0.5}), [0.005, 0.073, 0], [0.172, 0.003, 0.112]);
  for (let i = 0; i < 8; i++) {
    const x = -0.079 + i * 0.024;
    for (const z of [-0.094, 0.094]) box(board, gold, [x, 0.029, z], [0.011, 0.012, 0.044]);
  }
  for (let i = 0; i < 5; i++) {
    const z = -0.049 + i * 0.024;
    for (const x of [-0.117, 0.127]) box(board, gold, [x, 0.029, z], [0.034, 0.012, 0.011]);
  }
  box(board, dark, [-0.238, 0.039, -0.005], [0.072, 0.04, 0.097]);
  for (const z of [-0.032, 0, 0.032]) {
    box(board, gold, [-0.286, 0.023, z], [0.025, 0.01, 0.011]);
    box(board, gold, [-0.189, 0.023, z], [0.025, 0.01, 0.011]);
  }
  const capTop = material('#d3d8cc', {roughness: 0.38, metalness: 0.6});
  for (const [x, z, radius, height] of [[0.247, -0.064, 0.038, 0.10], [0.251, 0.055, 0.027, 0.075]]) {
    cylinder(board, dark, [x, height / 2 + 0.014, z], radius, height);
    cylinder(board, capTop, [x, height + 0.014, z], radius * 0.95, 0.007);
    box(board, steel, [x, height + 0.018, z], [radius * 1.2, 0.001, 0.003]);
  }
  const resistor = material('#b8ad8c', {roughness: 0.7});
  for (const [x, z] of [[-0.08, -0.17], [0.02, -0.17], [0.12, -0.17], [-0.07, 0.175]]) {
    box(board, resistor, [x, 0.026, z], [0.048, 0.02, 0.021]);
    for (const dx of [-0.027, 0.027]) box(board, steel, [x + dx, 0.023, z], [0.014, 0.014, 0.022]);
  }
  box(board, rubber, [0.03, 0.043, 0.19], [0.235, 0.055, 0.042]);
  for (let i = 0; i < 8; i++) box(board, gold, [-0.063 + i * 0.0265, 0.079, 0.19], [0.01, 0.034, 0.01]);
  for (const x of [-0.305, 0.305]) {
    for (const z of [-0.203, 0.203]) {
      cylinder(board, gold, [x, 0.014, z], 0.019, 0.004);
      cylinder(board, steel, [x, 0.024, z], 0.009, 0.016);
    }
  }
  tube(buoy, [[0.29, 0.99, 0.15], [0.36, 0.87, 0.22], [0.31, 0.54, 0.23], [0.19, 0.22, 0.23], [0.13, -0.20, 0.21], [0.11, -0.70, 0.20]], 0.014, rubber, 40);
  const probe = new THREE.Group();
  probe.position.set(0.11, -1.13, 0.20);
  buoy.add(probe);
  cylinder(probe, rubber, [0, 0.34, 0], 0.055, 0.14);
  cylinder(probe, steel, [0, -0.015, 0], 0.06, 0.59);
  cylinder(probe, dark, [0, -0.34, 0], 0.058, 0.17);
  for (const y of [-0.25, -0.49]) {
    const ring = mesh(probe, geometry(new THREE.TorusGeometry(0.073, 0.009, 8, 20)), steel, [0, y, 0]);
    ring.rotation.x = Math.PI / 2;
  }
  for (let i = 0; i < 3; i++) {
    const a = i / 3 * Math.PI * 2;
    cylinder(probe, steel, [Math.cos(a) * 0.073, -0.37, Math.sin(a) * 0.073], 0.008, 0.24);
  }
  cylinder(probe, steel, [0, -0.50, 0], 0.07, 0.02);

  const boat = new THREE.Group();
  boat.position.set(-5.7, 0.04, -3.1);
  boat.rotation.y = 0.43;
  nature.add(boat);
  const boatShape = new THREE.Shape();
  boatShape.moveTo(-0.39, -0.83);
  boatShape.quadraticCurveTo(-0.55, 0.25, -0.31, 0.84);
  boatShape.quadraticCurveTo(0, 1.25, 0.31, 0.84);
  boatShape.quadraticCurveTo(0.55, 0.25, 0.39, -0.83);
  boatShape.closePath();
  const hull = mesh(boat, geometry(new THREE.ExtrudeGeometry(boatShape, {depth: 0.19, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.045, bevelThickness: 0.045})), ivory);
  hull.rotation.x = -Math.PI / 2;
  box(boat, material('#87918b', {roughness: 0.8}), [0, 0.25, -0.06], [0.64, 0.04, 1.38]);
  for (const z of [-0.43, 0.34]) box(boat, material('#b8a780', {roughness: 0.9}), [0, 0.34, z], [0.76, 0.08, 0.18]);
  box(boat, dark, [0, 0.23, 0.92], [0.22, 0.30, 0.12]);

  let width = 0;
  let height = 0;
  let disposed = false;
  let lastInput = null;
  const state = {
    ready: false, hasWebGL: true, disposed: false, waterLevel: WATER_Y,
    floatY: WATER_Y, probeTipY: PROBE_TIP_Y, boardY: BOARD_Y,
    boardOpen: 0, boardFocus: 0, cutaway: 0, sceneTime: 0, phaseId: 'lake', phase: 0,
    rendererSize: {width: 0, height: 0, pixelRatio: renderer.getPixelRatio()}
  };
  const contextLost = event => {
    event.preventDefault();
    state.ready = false;
    state.hasWebGL = false;
    container.dispatchEvent(new CustomEvent('lake-scene-error', {detail: {message: '湖泊 3D 場景的 WebGL 連線中斷。'}}));
  };
  renderer.domElement.addEventListener('webglcontextlost', contextLost);

  function resize(draw = true) {
    if (disposed) return false;
    const bounds = container.getBoundingClientRect();
    const nextWidth = Math.max(1, Math.round(bounds.width || container.clientWidth || 1));
    const nextHeight = Math.max(1, Math.round(bounds.height || container.clientHeight || 1));
    if (nextWidth === width && nextHeight === height) return false;
    width = nextWidth;
    height = nextHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    state.rendererSize = {width, height, pixelRatio: renderer.getPixelRatio()};
    if (draw && lastInput && state.hasWebGL) render(lastInput);
    return true;
  }

  function cameraPose(time, reducedMotion, phase, boardFocus) {
    const wide = {position: [4.4, 2.75, 6.7], target: [0, 0.15, 0]};
    const low = {position: [3.25, 1.35, 5.1], target: [0, -0.24, 0]};
    const device = {position: [2.8, 2.20, 4.3], target: [0, 0.35, 0]};
    const close = {position: [0.96, 1.84, 1.13], target: [0, 0.99, 0]};
    let from = wide;
    let to = wide;
    let amount = 0;
    if (phase === 0) {
      from = {position: [5.6, 3.15, 8.0], target: [0, 0.15, 0]};
      to = wide;
      amount = progress(time, 0, 16);
    } else if (phase === 1) {
      from = wide;
      to = low;
      amount = progress(time, 18, 26);
    } else if (phase === 2) {
      from = low;
      to = close;
      amount = boardFocus;
    } else if (phase === 3 || phase === 4) {
      from = close;
      to = device;
      amount = progress(time, 65, 70);
    } else {
      from = device;
      to = wide;
      amount = progress(time, 106, 114);
    }
    if (reducedMotion) {
      from = phase === 0 || phase === 5 ? wide : phase === 1 ? low : phase === 2 ? close : device;
      to = from;
      amount = 0;
    }
    lookAt.set(...from.target).lerp(new THREE.Vector3(...to.target), amount);
    camera.position.set(...from.position).lerp(new THREE.Vector3(...to.position), amount);
    const aspectDistance = Math.max(1, 0.84 / camera.aspect);
    camera.position.sub(lookAt).multiplyScalar(aspectDistance).add(lookAt);
    camera.lookAt(lookAt);
  }

  function render(input = {}) {
    if (disposed || !state.hasWebGL) return;
    lastInput = {...input};
    resize(false);
    const time = Math.max(0, Math.min(120, Number(input.time) || 0));
    const phase = Number.isInteger(input.phase) ? Math.max(0, Math.min(5, input.phase)) : Math.max(0, PHASE_STARTS.findLastIndex(start => time >= start));
    const reducedMotion = Boolean(input.reducedMotion);
    const cutaway = Number.isFinite(input.cutaway) ? clamp(input.cutaway) : phase === 1 ? progress(time, 19, 26) : 0;
    const boardOpen = Number.isFinite(input.boardOpen) ? clamp(input.boardOpen) : phase === 2 ? progress(time, 39, 46) : phase === 3 || phase === 4 ? 0.72 : 0;
    const boardFocus = Number.isFinite(input.boardFocus) ? clamp(input.boardFocus) : progress(time, 38, 48);
    waterUniforms.lakeTime.value = reducedMotion ? 0 : time;
    waterUniforms.lakeMotion.value = reducedMotion ? 0 : 1;
    waterUniforms.lakeCutaway.value = cutaway;
    cutawayGlass.opacity = cutaway * 0.21;
    lakeFloor.material.opacity = cutaway * 0.56;
    waterLine.material.opacity = cutaway * 0.6;
    underwater.visible = cutaway > 0.001;
    lid.rotation.x = -boardOpen * Math.PI * 0.58;
    boat.position.y = reducedMotion ? 0.04 : 0.04 + Math.sin(time * 0.55) * 0.012;
    boat.rotation.z = reducedMotion ? 0 : Math.sin(time * 0.4) * 0.008;
    nature.visible = phase !== 2 || boardFocus < 0.87;
    surfacePatches.visible = nature.visible;
    cameraPose(time, reducedMotion, phase, boardFocus);
    renderer.render(scene, camera);
    Object.assign(state, {
      ready: true, sceneTime: time, phase, phaseId: input.phaseId ?? ['lake', 'measure', 'embedded', 'forecast', 'check', 'return'][phase],
      boardOpen, boardFocus, cutaway, reducedMotion, viewportMode: input.viewportMode || 'full',
      camera: {position: camera.position.toArray(), target: lookAt.toArray()},
      drawCalls: renderer.info.render.calls, triangles: renderer.info.render.triangles
    });
  }

  function dispose() {
    if (disposed) return;
    disposed = true;
    state.disposed = true;
    state.ready = false;
    renderer.domElement.removeEventListener('webglcontextlost', contextLost);
    geometries.forEach(value => value.dispose());
    materials.forEach(value => value.dispose());
    textures.forEach(value => value.dispose());
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
    lastInput = null;
  }
  render({time: 0, phase: 0});
  return {render, getState: () => JSON.parse(JSON.stringify(state)), resize, dispose};
}
