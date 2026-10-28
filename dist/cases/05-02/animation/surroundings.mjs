import * as THREE from './vendor/three.module.js';
import { sandWeight } from './terrain.mjs';
import { CORAL_PIGMENT_PALETTE } from './coral-pigment.mjs';

const TAU = Math.PI * 2;
const UP = new THREE.Vector3(0, 1, 0);

function seededRandom(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let n = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    n = (n + Math.imul(n ^ (n >>> 7), 61 | n)) ^ n;
    return ((n ^ (n >>> 14)) >>> 0) / 4294967296;
  };
}

function material(color, kind, doubleSided = false) {
  const mat = new THREE.MeshStandardMaterial({ color, roughness: .96, metalness: 0, side: doubleSided ? THREE.DoubleSide : THREE.FrontSide });
  mat.userData.surfaceKind = kind;
  return mat;
}

function reefFragment() {
  const geometry = new THREE.IcosahedronGeometry(1, 1);
  const p = geometry.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    const warp = 1 + .11 * Math.sin(x * 4.3 + y * 2.7) * Math.cos(z * 3.8) + .045 * Math.sin(z * 7.2 - x * 3.1);
    p.setXYZ(i, x * warp, y * warp + .06 * Math.sin(x * 5 + z * 4), z * warp);
  }
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}

function instanced(name, geometry, mat, placements) {
  const mesh = new THREE.InstancedMesh(geometry, mat, placements.length);
  mesh.name = name;
  const transform = new THREE.Object3D();
  const tint = new THREE.Color();
  placements.forEach(({ position, scale, normal, yaw, shade }, i) => {
    transform.position.fromArray(position);
    transform.scale.fromArray(scale);
    transform.quaternion.setFromUnitVectors(UP, normal);
    transform.quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(UP, yaw));
    transform.updateMatrix();
    mesh.setMatrixAt(i, transform.matrix);
    mesh.setColorAt(i, tint.setRGB(shade, shade, shade));
  });
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.computeBoundingBox();
  mesh.computeBoundingSphere();
  return mesh;
}

function shortGrass(tufts, heightAt, random) {
  const positions = [], indices = [];
  for (const [x, z, scale] of tufts) {
    for (let blade = 0; blade < 7; blade++) {
      const angle = random() * TAU;
      const rootX = x + (random() - .5) * scale * .40;
      const rootZ = z + (random() - .5) * scale * .40;
      const rootY = heightAt(rootX, rootZ) - .025;
      const h = scale * (.42 + random() * .58);
      const bend = scale * (.14 + random() * .22);
      const width = scale * (.022 + random() * .015);
      const base = positions.length / 3;
      for (let row = 0; row <= 4; row++) {
        const t = row / 4;
        const dx = Math.cos(angle), dz = Math.sin(angle);
        for (const side of [-1, 1]) {
          const w = width * (1 - t * .94) * side;
          positions.push(rootX + dx * bend * t * t - dz * w, rootY + h * t, rootZ + dz * bend * t * t + dx * w);
        }
        if (row < 4) {
          const k = base + row * 2;
          indices.push(k, k + 2, k + 1, k + 1, k + 2, k + 3);
        }
      }
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  const mesh = new THREE.Mesh(geometry, material('#687c68', 'grass', true));
  mesh.name = 'Short attached growth in reef gaps';
  mesh.receiveShadow = true;
  return mesh;
}

export function createSurroundings({ heightAt, protectedColonies = [] }) {
  if (typeof heightAt !== 'function') throw new TypeError('createSurroundings requires heightAt(x, z).');
  const group = new THREE.Group();
  group.name = 'Conceptual reef surroundings';
  const random = seededRandom(70942);
  const normalAt = (x, z) => new THREE.Vector3(heightAt(x - .06, z) - heightAt(x + .06, z), .12, heightAt(x, z - .06) - heightAt(x, z + .06)).normalize();
  const embeddedAt = (x, z, depth, normal) => [x - normal.x * depth, heightAt(x, z) - normal.y * depth, z - normal.z * depth];
  const outsideCore = (x, z) => ((x + 2.5) / 7.5) ** 2 + ((z + 1.5) / 11.5) ** 2 >= 1;
  const clearAnchors = (x, z, radius = 0) => Math.hypot(x - 7, z - 2) >= 2.5 + radius && Math.hypot(x - 12, z - 4) >= 3 + radius;
  const protectedCrowns = protectedColonies.map(s => [s.position[0], s.position[2], s.diameter / 2]);
  protectedCrowns.push([1, -2, .8], [-5.8, 5.1, .8], [-5.2, -4.9, .8], [-7.2, 5.1, .8]);
  const clearColonies = (x, z, radius) => protectedCrowns.every(([cx, cz, r]) => Math.hypot(x - cx, z - cz) >= r + radius);
  const onReef = (x, z, radius = 0) => clearColonies(x, z, radius) && clearAnchors(x, z, radius) && sandWeight(x, z) < .35;
  // Neighboring irregular patches overlap from the foreground to the far reef.
  const patches = [
    [-9, -55, 11, 10, 23], [-7, -43, 12, 10, 24], [-6, -31, 13, 11, 25],
    [-10, -18, 10, 9, 21], [-16, -5, 4.5, 12, 21], [-17, 12, 4.8, 11, 20],
    [-10, 23, 10, 9, 27], [2, 20, 8, 11, 25], [6, -16, 4.5, 11, 16],
    [5, -43, 5.5, 16, 17], [-17, -39, 4.5, 13, 15],
    [25, -45, 7.5, 9.2, 12], [34, -34, 7.5, 11.2, 13], [26, -22, 7.5, 10.8, 12],
    [34, -10, 7.5, 10, 12], [25, 2, 7.5, 10, 12], [34, 12, 7.5, 9, 11],
    [-2.5, -1.5, 7.5, 11.5, 24],
  ];
  const palette = CORAL_PIGMENT_PALETTE.map(p=>p.color);
  const scanSlots = [];
  patches.forEach(([cx, cz, rx, rz, count], patch) => {
    let placed = 0;
    for (let attempt = 0; placed < count && attempt < 6000; attempt++) {
      const angle = random() * TAU, radius = Math.sqrt(random());
      const x = cx + Math.cos(angle) * radius * rx, z = cz + Math.sin(angle) * radius * rz;
      const transition = patch === 17, rightBank = patch >= 11 && !transition;
      const diameter = transition ? 1.3 + random() * .75 : random() < .18 ? 1.3 + random() * .85 : 2.15 + random() * .85;
      if (x < (rightBank ? 21 : -20) || x > (rightBank ? 39 : 10) || z < (rightBank ? -50 : -65) || z > (rightBank ? 20 : 32)) continue;
      if (transition === outsideCore(x, z)) continue;
      if (!onReef(x, z, diameter / 2)) continue;
      if (scanSlots.some(slot => Math.hypot(slot.position[0] - x, slot.position[2] - z) < .31 * (slot.diameter + diameter))) continue;
      const colourChoice=random();
      const family=[0,1,2,5,3,0,4,2,1,5,6,3,0,1,5,2,4,3][patch%18];
      const color=palette[colourChoice<.70?family:(family+2)%palette.length];
      scanSlots.push({ form: 'branch', position: [x, heightAt(x, z), z], diameter, color, tint: color, rotationY: random() * TAU, modelIndex: (()=>{const v=random();return v<.35?0:v<.70?1:v<.82?2:3;})(), patch });
      placed++;
    }
    if (placed !== count) throw new Error(`Reef patch ${patch} placed ${placed} of ${count} colonies.`);
  });

  const growthSlots = [];
  const growthColors = ['#9fa37f', '#b4a275', '#a69cae', '#a99b89', '#b1ad8b', '#929e84', '#b7a17f'];
  for (const [region, count] of [['transition', 40], ['left', 60], ['right', 44]]) {
    const neighbors = scanSlots.filter(s => region === 'transition' ? s.patch === 17 : region === 'right' ? s.position[0] > 20 : s.position[0] < 20 && s.patch !== 17);
    let placed = 0;
    for (let attempt = 0; placed < count && attempt < 6000; attempt++) {
      const neighbor = neighbors[Math.floor(random() * neighbors.length)];
      const angle = random() * TAU, offset = neighbor.diameter * (.40 + random() * .50);
      const x = neighbor.position[0] + Math.cos(angle) * offset, z = neighbor.position[2] + Math.sin(angle) * offset;
      const scale = .3 + random() ** .8 * .7;
      if (region === 'transition' && outsideCore(x, z)) continue;
      if (region === 'right' && (x < 21 || x > 39 || z < -50 || z > 20)) continue;
      if (!onReef(x, z, scale)) continue;
      if (scanSlots.some(s => Math.hypot(s.position[0] - x, s.position[2] - z) < s.diameter * .27 + scale * .35)) continue;
      if (growthSlots.some(s => Math.hypot(s.position[0] - x, s.position[2] - z) < (s.scale + scale) * .60)) continue;
      growthSlots.push({ form: ['plate', 'mound', 'crust'][growthSlots.length % 3], position: [x, heightAt(x, z), z], scale, color: growthColors[Math.floor(random() * growthColors.length)], seed: 27000 + growthSlots.length * 37, region });
      placed++;
    }
    if (placed !== count) throw new Error(`Reef ${region} placed ${placed} of ${count} growth patches.`);
  }

  const rocks = [], mounds = [], tufts = [];
  for (let attempt = 0; rocks.length < 460 && attempt < 6000; attempt++) {
    const slot = scanSlots[Math.floor(random() * scanSlots.length)];
    const angle = random() * TAU, offset = slot.diameter * (.32 + random() * .50);
    const x = slot.position[0] + Math.cos(angle) * offset, z = slot.position[2] + Math.sin(angle) * offset;
    const s = .10 + random() ** 1.5 * .30, sy = s * (.52 + random() * .34);
    if (!onReef(x, z, s)) continue;
    const normal = normalAt(x, z);
    rocks.push({ position: embeddedAt(x, z, sy * .38, normal), scale: [s, sy, s * (.58 + random() * .50)], normal, yaw: random() * TAU, shade: .80 + random() * .30 });
    if (mounds.length < 120 && rocks.length % 3 === 0) {
      const ms = .24 + random() * .44;
      if (onReef(x, z, ms)) mounds.push({ position: embeddedAt(x, z, ms * .11, normal), scale: [ms, ms * .21, ms * (.66 + random() * .26)], normal, yaw: random() * TAU, shade: .84 + random() * .24 });
    }
    if (tufts.length < 36 && rocks.length % 11 === 0) tufts.push([x, z, .17 + random() * .19]);
  }
  const fragment = reefFragment();
  group.add(instanced('Clustered reef rubble', fragment, material('#989b85', 'rock'), rocks));
  group.add(instanced('Low attached growth', fragment, material('#8d9273', 'mound'), mounds));
  group.add(shortGrass(tufts, heightAt, random));

  const triangles = group.children.reduce((total, mesh) => total + (mesh.geometry.index ? mesh.geometry.index.count : mesh.geometry.attributes.position.count) / 3 * (mesh.count ?? 1), 0);
  return {
    group, scanSlots, growthSlots,
    stats: { triangles, drawCalls: group.children.length, materials: group.children.length, rubblePieces: rocks.length, lowGrowth: mounds.length, grassTufts: tufts.length, clusters: patches.length, scanSlots: scanSlots.length, transitionScanSlots: scanSlots.filter(s => s.patch === 17).length, growthSlots: growthSlots.length, growthForms: Object.fromEntries(['plate', 'mound', 'crust'].map(form => [form, growthSlots.filter(s => s.form === form).length])), leftBankSlots: scanSlots.filter(s => s.position[0] < 20).length, rightBankSlots: scanSlots.filter(s => s.position[0] > 20).length, populatedAtTimeZero: true },
  };
}
