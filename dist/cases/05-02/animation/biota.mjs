import * as THREE from './vendor/three.module.js';

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

// Each material has one geometry, so a whole reef does not add per-branch draw calls.
function batch(name, color, surfaceKind, doubleSided = false) {
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff, vertexColors: true, roughness: 0.91, metalness: 0,
    side: doubleSided ? THREE.DoubleSide : THREE.FrontSide,
  });
  material.userData.surfaceKind = surfaceKind;
  return {
    name, surfaceKind, material, color: new THREE.Color(color), tipColor: new THREE.Color('#ead2ac'), positions: [], normals: [], colors: [], indices: [],
  };
}

function vertex(out, point, normal, light = 1, tip = 0) {
  const index = out.positions.length / 3;
  out.positions.push(point.x, point.y, point.z);
  out.normals.push(normal.x, normal.y, normal.z);
  out.colors.push(
    (out.color.r * (1 - tip) + out.tipColor.r * tip) * light,
    (out.color.g * (1 - tip) + out.tipColor.g * tip) * light,
    (out.color.b * (1 - tip) + out.tipColor.b * tip) * light,
  );
  return index;
}

function sweep(out, start, end, radius, bend, segments = 10, sides = 9, tipTint = 0.45, endRatio = 0.46) {
  const direction = end.clone().sub(start);
  const phase = start.x * 0.57 + start.z * 0.81 + radius * 13;
  const lateral = new THREE.Vector3().crossVectors(direction, UP).normalize();
  const irregularity = out.surfaceKind === 'branch' ? 1 : 0;
  const curve = new THREE.CubicBezierCurve3(
    start,
    start.clone().addScaledVector(direction, 0.34).add(bend),
    end.clone().addScaledVector(direction, -0.23).add(new THREE.Vector3(0, -direction.length() * 0.07, 0))
      .addScaledVector(lateral, direction.length() * 0.025 * Math.sin(phase) * irregularity),
    end,
  );
  const base = out.positions.length / 3;
  let across = new THREE.Vector3(1, 0, 0);
  const capRadius = radius * endRatio;
  for (let row = 0; row <= segments + 2; row++) {
    const t = Math.min(row / segments, 1);
    const center = curve.getPoint(t);
    const tangent = curve.getTangent(t).normalize();
    across.addScaledVector(tangent, -across.dot(tangent)).normalize();
    if (across.lengthSq() < 0.1) across.crossVectors(tangent, UP).normalize();
    const other = new THREE.Vector3().crossVectors(tangent, across).normalize();
    const capAngle = Math.max(0, row - segments) * Math.PI / 6;
    center.addScaledVector(tangent, capRadius * Math.sin(capAngle));
    const growth = 1 + irregularity * 0.075 * Math.sin(t * Math.PI * 3 + phase) * Math.sin(t * Math.PI);
    const ringRadius = row > segments ? capRadius * Math.cos(capAngle) : radius * (0.96 - (0.96 - endRatio) * t) * growth;
    for (let side = 0; side < sides; side++) {
      const a = side / sides * TAU;
      const radial = across.clone().multiplyScalar(Math.cos(a)).addScaledVector(other, Math.sin(a));
      const normal = radial.clone().multiplyScalar(Math.cos(capAngle)).addScaledVector(tangent, row > segments ? Math.sin(capAngle) : 0.04).normalize();
      const oval = 1 + irregularity * 0.04 * Math.sin(a * 2 + phase) * Math.sin(t * Math.PI);
      vertex(out, center.clone().addScaledVector(radial, ringRadius * oval), normal, 0.83 + t * 0.15 + 0.015 * Math.sin(t * 7 + phase), tipTint * Math.pow(t, 5));
      if (row < segments + 2) {
        const a0 = base + row * sides + side;
        const a1 = base + row * sides + (side + 1) % sides;
        out.indices.push(a0, a1, a0 + sides, a1, a1 + sides, a0 + sides);
      }
    }
  }
  const endNormal = curve.getTangent(1).normalize();
  const tip = vertex(out, end.clone().addScaledVector(endNormal, capRadius), endNormal, 1.0, tipTint);
  for (let side = 0; side < sides; side++) {
    out.indices.push(base + (segments + 2) * sides + side, base + (segments + 2) * sides + (side + 1) % sides, tip);
  }
  return curve;
}

function attachment(out, origin, scale, seed, heightAt) {
  const sectors = 40;
  const rings = 6;
  const base = out.positions.length / 3;
  function surface(u, a) {
    const edge = 1 + 0.09 * Math.sin(a * 5 + seed) + 0.045 * Math.cos(a * 3 - seed);
    const x = origin.x + Math.cos(a) * scale * 0.73 * u * edge;
    const z = origin.z + Math.sin(a) * scale * 0.73 * u * edge;
    return new THREE.Vector3(x, heightAt(x, z) - 0.016 + scale * 0.10 * Math.pow(1 - u * u, 2), z);
  }
  for (let ring = 0; ring <= rings; ring++) {
    const u = ring / rings;
    for (let sector = 0; sector < sectors; sector++) {
      const a = sector / sectors * TAU;
      const point = surface(u, a);
      const normal = u === 0 ? new THREE.Vector3(
        heightAt(origin.x - 0.01, origin.z) - heightAt(origin.x + 0.01, origin.z), 0.02,
        heightAt(origin.x, origin.z - 0.01) - heightAt(origin.x, origin.z + 0.01),
      ).normalize() : new THREE.Vector3().crossVectors(
        surface(u, a + 0.001).sub(surface(u, a - 0.001)),
        surface(u + 0.001, a).sub(surface(u - 0.001, a)),
      ).normalize();
      vertex(out, point, normal, 0.72 + (1 - u) * 0.13, 0.03);
      if (ring < rings) {
        const p = base + ring * sectors + sector;
        const q = base + ring * sectors + (sector + 1) % sectors;
        out.indices.push(p, q + sectors, p + sectors);
        if (ring > 0) out.indices.push(p, q, q + sectors);
      }
    }
  }
}

function branchField(out, origin, scale, seed, rich, heightAt, family) {
  const random = seededRandom(seed);
  const colonyColor = out.color.clone();
  const stems = rich ? (family === 1 ? 64 : 72) + seed % 7 : (family === 1 ? 28 : 32) + seed % 5;
  attachment(out, origin, scale * 0.96, seed, heightAt);
  for (let i = 0; i < stems; i++) {
    const a = i * 2.39996 + (random() - 0.5) * 0.55;
    const r = Math.sqrt((i + 0.35) / stems) * (0.88 + random() * 0.11);
    const width = family === 1 ? 0.95 : 0.86;
    const root = origin.clone().add(new THREE.Vector3(Math.cos(a) * r * scale * width * 1.10, 0, Math.sin(a) * r * scale * width * 0.86));
    root.y = heightAt(root.x, root.z) - 0.018;
    const envelope = 0.42 + 0.50 * (1 - r * r) + 0.07 * Math.sin(a * 3 + seed);
    const height = scale * ((family === 1 ? 0.34 : 0.27) + envelope * (family === 1 ? 0.56 : 0.48) + random() * 0.12);
    const end = root.clone().add(new THREE.Vector3(Math.cos(a) * scale * (0.05 + random() * 0.13), height, Math.sin(a) * scale * (0.05 + random() * 0.13)));
    out.color.copy(colonyColor).multiplyScalar(0.94 + random() * 0.13);
    const radius = scale * (family === 1 ? 0.044 + random() * 0.027 : 0.050 + random() * 0.028);
    const stem = sweep(out, root, end, radius, new THREE.Vector3(), rich ? 8 : 6, rich ? 10 : 8, 0.13, 0.48 + random() * 0.08);
    const forks = random() < 0.56 ? 3 : 2;
    for (let fork = 0; fork < forks; fork++) {
      const t = 0.38 + fork * 0.18 + random() * 0.07;
      const start = stem.getPoint(t);
      const angle = a + fork * 2.32 + random() * 0.70;
      const lateral = scale * (0.10 + random() * 0.12);
      const tip = start.clone().add(new THREE.Vector3(Math.cos(angle) * lateral, scale * (0.14 + random() * 0.14), Math.sin(angle) * lateral));
      const delta = tip.clone().sub(start);
      const bend = stem.getTangent(t).multiplyScalar(delta.length() * 0.16).addScaledVector(delta, -0.09);
      sweep(out, start, tip, radius * (0.51 + random() * 0.16), bend, rich ? 6 : 5, 8, 0.20, 0.46 + random() * 0.08);
    }
  }
  out.color.copy(colonyColor);
}

function branching(out, origin, scale, seed, rich, heightAt) {
  if (seed % 3 !== 0) {
    branchField(out, origin, scale, seed, rich, heightAt, seed % 3);
    return;
  }
  const random = seededRandom(seed);
  const colonyColor = out.color.clone();
  const family = seed % 3;
  const arms = rich ? [11, 12, 12][family] : [7, 8, 7][family];
  const lean = new THREE.Vector3(Math.cos(seed * 0.63), 0, Math.sin(seed * 0.63)).multiplyScalar(scale * 0.13);
  attachment(out, origin, scale * 0.88, seed, heightAt);
  function shoot(start, end, radius, parentTangent, segments, sides, tint, endRatio) {
    const delta = end.clone().sub(start);
    const bend = parentTangent.clone().multiplyScalar(delta.length() * 0.19).addScaledVector(delta, -0.11);
    return sweep(out, start, end, radius, bend, segments, sides, tint, endRatio);
  }
  function direction(parent, angle, spread) {
    return parent.clone().multiplyScalar(0.32).add(new THREE.Vector3(
      Math.cos(angle) * spread, 0.40 + random() * 0.35, Math.sin(angle) * spread,
    )).normalize();
  }
  for (let arm = 0; arm < arms; arm++) {
    const angle = arm * 2.39996 + (random() - 0.5) * 0.75;
    const outward = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    const root = origin.clone().addScaledVector(outward, scale * (0.08 + Math.sqrt(random()) * 0.38));
    root.y = heightAt(root.x, root.z) - 0.025;
    const spread = scale * (0.42 + Math.sqrt(random()) * (family === 0 ? 0.74 : 0.60));
    const end = origin.clone().add(new THREE.Vector3(Math.cos(angle) * spread * 1.08, 0, Math.sin(angle) * spread * 0.86)).add(lean);
    const height = family === 0 ? 0.68 + random() * 0.37 : family === 1 ? 0.46 + random() * 0.30 : 0.40 + random() * 0.27;
    end.y = Math.max(origin.y + scale * height, root.y + scale * 0.38);
    out.color.copy(colonyColor).multiplyScalar(0.94 + random() * 0.13);
    const trunk = shoot(root, end, scale * (0.125 + random() * 0.040), UP, rich ? 10 : 8, rich ? 12 : 9, 0.07, 0.46);
    const forks = rich ? 4 + Number(random() > 0.35) : 3;
    for (let fork = 0; fork < forks; fork++) {
      const t = 0.11 + 0.73 * (fork + 0.2 + random() * 0.5) / forks;
      const start = trunk.getPoint(t);
      const parent = trunk.getTangent(t);
      const sideAngle = angle + (fork % 2 ? -1 : 1) * (0.60 + random() * 0.95) + fork * 0.17;
      const length = scale * (family === 0 ? 0.40 + random() * 0.27 : family === 1 ? 0.28 + random() * 0.25 : 0.24 + random() * 0.23);
      const forkEnd = start.clone().addScaledVector(direction(parent, sideAngle, 0.95), length);
      const forkCurve = shoot(start, forkEnd, scale * (0.066 + random() * 0.027) * (1 - fork * 0.055), parent, rich ? 8 : 6, rich ? 10 : 8, 0.11, 0.43);
      const branches = rich ? (family === 2 ? 5 : 4) : 3;
      for (let bud = 0; bud < branches; bud++) {
        const u = 0.28 + 0.54 * (bud + random() * 0.45) / branches;
        const twigStart = forkCurve.getPoint(u);
        const tangent = forkCurve.getTangent(u);
        const twigAngle = sideAngle + (bud % 2 ? -1 : 1) * (0.55 + random() * 1.1);
        const twigLength = scale * (family === 0 ? 0.20 + random() * 0.20 : 0.16 + random() * 0.20);
        const twigEnd = twigStart.clone().addScaledVector(direction(tangent, twigAngle, 0.88), twigLength);
        const twigRadius = scale * (family === 2 ? 0.050 + random() * 0.022 : 0.042 + random() * 0.021) * (1 - bud * 0.035);
        shoot(twigStart, twigEnd, twigRadius, tangent, rich ? 7 : 5, 9, 0.23, family === 0 ? 0.42 : 0.50);
      }
    }
  }
  out.color.copy(colonyColor);
}

function plate(out, center, radius, seed, tilt = 0, rotation = 0, cupping = 0, coarse = false) {
  const random = seededRandom(seed);
  const phase = random() * TAU;
  const notches = [-1.4 + random() * 2.8, -1.4 + random() * 2.8];
  const openFan = true;
  const understory = coarse === 'understory';
  const sectors = understory ? 20 : coarse ? 48 : 86;
  const rings = understory ? 4 : coarse ? 10 : 16;
  const span = Math.PI * (1.02 + random() * 0.28);
  const aspect = 0.82 + random() * 0.21;
  const thickness = Math.max(0.012, radius * 0.022);
  const base = out.positions.length / 3;
  const stride = sectors * (rings + 1);
  function surface(u, a, top) {
    const edge = understory ? 1 + 0.075 * Math.sin(a * 2.7 + phase) + 0.04 * Math.sin(a * 5.1 - phase)
      - 0.045 * Math.exp(-Math.pow((a - notches[0]) / 0.20, 2))
      - 0.030 * Math.exp(-Math.pow((a - notches[1]) / 0.18, 2))
      : 1 + 0.075 * Math.sin(a * 2.7 + phase) + 0.04 * Math.sin(a * 5.1 - phase)
      + 0.022 * Math.sin(a * 11.3 + phase * 0.7) + 0.012 * Math.sin(a * 17.2 - phase)
      - 0.10 * Math.exp(-Math.pow((a - notches[0]) / 0.085, 2))
      - 0.065 * Math.exp(-Math.pow((a - notches[1]) / 0.065, 2));
    const r = radius * u * edge;
    const localX = Math.cos(a) * r;
    const localZ = Math.sin(a) * r * aspect;
    const x = localX * Math.cos(rotation) - localZ * Math.sin(rotation);
    const z = localX * Math.sin(rotation) + localZ * Math.cos(rotation);
    const outer = Math.max(0, (u - 0.68) / 0.32);
    const wave = radius * u * u * (0.045 + 0.055 * Math.sin(a * 2.7 + phase) + 0.028 * Math.sin(a * 5.2 - phase));
    const curl = radius * outer * outer * (0.035 + 0.055 * Math.sin(a * 3.2 + phase * 0.4))
      + radius * cupping * u * u * (0.82 + 0.18 * Math.sin(a * 3.1 + phase))
      + (understory ? 0 : radius * Math.pow(u, 4) * (0.019 * Math.sin(a * 9.7 + phase) + 0.010 * Math.sin(a * 14.3 - phase * 1.2)));
    const ridges = understory ? 0 : radius * Math.pow(Math.max(u, 0), 1.2) * (0.7 + 0.3 * Math.cos(u * Math.PI))
      * (0.008 * Math.cos(a * 16.5 + 0.6 * Math.sin(u * 3 + phase)) + 0.004 * Math.cos(a * 23 + u * 2 - phase));
    const localThickness = thickness * (1 - 0.58 * Math.pow(Math.max(u, 0), 3));
    return new THREE.Vector3(center.x + x, center.y + wave + curl + ridges + x * tilt + (top ? 0 : -localThickness), center.z + z);
  }
  const angleAt = sector => (sector / (sectors - 1) - 0.5) * span;
  for (let face = 0; face < 2; face++) {
    for (let ring = 0; ring <= rings; ring++) {
      const u = ring / rings;
      for (let sector = 0; sector < sectors; sector++) {
        const a = angleAt(sector);
        const normal = u === 0 ? new THREE.Vector3(-tilt, 1, 0).normalize() : new THREE.Vector3().crossVectors(
          surface(u, a + 0.0005, face === 0).sub(surface(u, a - 0.0005, face === 0)),
          surface(u + 0.0005, a, face === 0).sub(surface(u - 0.0005, a, face === 0)),
        ).normalize();
        if (face) normal.negate();
        const growthShade = 0.018 * Math.cos(a * 16.5 + 0.6 * Math.sin(u * 3 + phase)) * u;
        vertex(out, surface(u, a, face === 0), normal, face ? 0.71 : 0.87 + 0.08 * u + growthShade, face ? 0 : 0.055 * Math.pow(u, 4));
        if (ring < rings && (!openFan || sector < sectors - 1)) {
          const p = base + face * stride + ring * sectors + sector;
          const q = base + face * stride + ring * sectors + (sector + 1) % sectors;
          if (face === 0) {
            out.indices.push(p, q + sectors, p + sectors);
            if (ring > 0) out.indices.push(p, q, q + sectors);
          } else {
            out.indices.push(p, p + sectors, q + sectors);
            if (ring > 0) out.indices.push(p, q + sectors, q);
          }
        }
      }
    }
  }
  const rim = out.positions.length / 3;
  for (let sector = 0; sector < sectors; sector++) {
    const a = angleAt(sector);
    const next = openFan ? Math.min(sector + 1, sectors - 1) : (sector + 1) % sectors;
    const previous = openFan ? Math.max(sector - 1, 0) : (sector + sectors - 1) % sectors;
    const tangent = surface(1, angleAt(next), true).sub(surface(1, angleAt(previous), true));
    const normal = new THREE.Vector3(tangent.z, 0, -tangent.x).normalize();
    vertex(out, surface(1, a, true), normal, 0.99, 0.12);
    vertex(out, surface(1, a, false), normal, 0.80, 0.04);
    const p = rim + sector * 2;
    const q = rim + ((sector + 1) % sectors) * 2;
    if (!openFan || sector < sectors - 1) out.indices.push(p, q, p + 1, q, q + 1, p + 1);
  }
  // A cupped leaf has two radial edges, not a face spanning its angular opening.
  if (openFan) {
    for (const boundary of [0, sectors - 1]) {
      const a = angleAt(boundary);
      const edgeBase = out.positions.length / 3;
      for (let ring = 0; ring <= rings; ring++) {
        const u = ring / rings;
        const tangent = surface(u + 0.0005, a, true).sub(surface(u - 0.0005, a, true));
        const normal = new THREE.Vector3().crossVectors(tangent, new THREE.Vector3(0, -1, 0)).normalize();
        if (boundary > 0) normal.negate();
        vertex(out, surface(u, a, true), normal, 0.94, 0.08 * u);
        vertex(out, surface(u, a, false), normal, 0.77, 0.03 * u);
        if (ring < rings) {
          const p = edgeBase + ring * 2;
          const q = p + 2;
          if (boundary === 0) out.indices.push(p, q, p + 1, q, q + 1, p + 1);
          else out.indices.push(p, p + 1, q, q, p + 1, q + 1);
        }
      }
    }
  }
}

function plateColony(out, origin, scale, seed, rich, heightAt, coarse = false) {
  const random = seededRandom(seed * 13);
  const colonyColor = out.color.clone();
  const orientation = seed * 0.93;
  const axis = new THREE.Vector3(Math.cos(orientation), 0, Math.sin(orientation));
  const across = new THREE.Vector3(-axis.z, 0, axis.x);
  const leaves = coarse === 'understory' ? 2 : rich ? 9 + seed % 3 : 3 + seed % 2;
  for (let i = 0; i < leaves; i++) {
    const along = ((i / (leaves - 1)) - 0.5) * (rich ? 1.6 : 0.65) + (random() - 0.5) * 0.20;
    const center = origin.clone().addScaledVector(axis, along * scale).addScaledVector(across, (random() - 0.5) * scale * 0.72);
    center.y = heightAt(center.x, center.z) + scale * (0.045 + (i % 3) * 0.12 + random() * 0.06);
    const root = new THREE.Vector3(center.x, Math.min(heightAt(center.x, center.z) - 0.025, center.y - scale * 0.08), center.z);
    out.color.copy(colonyColor).multiplyScalar(0.91 + random() * 0.15);
    sweep(out, root, center, scale * 0.065, new THREE.Vector3(), 5, 8, 0.04, 0.38);
    const radius = scale * (i % 5 === 0 ? 0.88 + random() * 0.13 : 0.46 + random() * 0.36);
    const rotation = orientation + (i % 2 ? -1 : 1) * (0.90 + random() * 0.60);
    plate(out, center, radius, seed + i * 7, (random() - 0.5) * 0.16, rotation, 0.035 + random() * 0.06, coarse);
  }
  out.color.copy(colonyColor);
}

function mound(out, origin, scale, phase, coarse = false) {
  const sectors = coarse ? 36 : 72;
  const rings = coarse ? 12 : 20;
  const base = out.positions.length / 3;
  function surface(theta, a) {
    const spread = Math.sin(theta);
    const lobe = 1 + spread * (0.12 * Math.cos(a * 3 + phase) + 0.045 * Math.sin(a * 5 - phase) + 0.025 * Math.cos(a * 7 + phase));
    const x = Math.cos(a) * spread * scale * lobe;
    const z = Math.sin(a) * spread * scale * 0.84 * lobe;
    const ridge = Math.sin(theta * 2) * Math.sin(theta) * Math.cos(a * 11 + 0.8 * Math.sin(theta * 3 + phase));
    const y = Math.cos(theta) * scale * 0.60 * (1 + 0.16 * Math.sin(a * 3 + phase) * spread * spread + 0.07 * Math.cos(a * 5 - phase) * spread)
      + scale * 0.026 * ridge;
    return origin.clone().add(new THREE.Vector3(x, y, z));
  }
  for (let ring = 0; ring <= rings; ring++) {
    const theta = (ring / rings) * Math.PI / 2;
    for (let sector = 0; sector < sectors; sector++) {
      const a = sector / sectors * TAU;
      const normal = ring === 0 ? UP : new THREE.Vector3().crossVectors(
        surface(theta, a + 0.0005).sub(surface(theta, a - 0.0005)),
        surface(theta + 0.0005, a).sub(surface(theta - 0.0005, a)),
      ).normalize();
      const ridgeShade = 0.024 * Math.cos(a * 11 + 0.8 * Math.sin(theta * 3 + phase)) * Math.sin(theta * 2);
      vertex(out, surface(theta, a), normal, 0.84 + Math.cos(theta) * 0.13 + ridgeShade, 0.045 * Math.cos(theta));
      if (ring < rings) {
        const p = base + ring * sectors + sector;
        const q = base + ring * sectors + (sector + 1) % sectors;
        if (ring > 0) out.indices.push(p, q, p + sectors);
        out.indices.push(q, q + sectors, p + sectors);
      }
    }
  }
}

function fineThicket(out, origin, scale, seed, heightAt, distant) {
  const random = seededRandom(seed);
  const stems = distant ? 10 : 22;
  attachment(out, origin, scale * 0.82, seed, heightAt);
  for (let i = 0; i < stems; i++) {
    const a = i * 2.39996 + random() * 0.55;
    const spread = Math.sqrt((i + 0.4) / stems) * scale * (0.43 + random() * 0.17);
    const root = origin.clone().add(new THREE.Vector3(Math.cos(a) * spread, 0, Math.sin(a) * spread * 0.83));
    root.y = heightAt(root.x, root.z) - 0.018;
    const lean = new THREE.Vector3(Math.cos(a + 0.4), 0, Math.sin(a + 0.4));
    const end = root.clone().addScaledVector(lean, scale * (0.10 + random() * 0.22));
    end.y += scale * (0.34 + random() * 0.40 + 0.075 * Math.sin(a * 1.3));
    const stem = sweep(out, root, end, scale * (0.034 + random() * 0.018), new THREE.Vector3(), 6, 7, 0.10, 0.42);
    const forks = distant ? 2 : 4;
    for (let fork = 0; fork < forks; fork++) {
      const t = 0.38 + fork * 0.14 + random() * 0.045;
      const start = stem.getPoint(t);
      const angle = a + fork * 2.25 + random() * 0.65;
      const tip = start.clone().add(new THREE.Vector3(
        Math.cos(angle) * scale * (0.10 + random() * 0.10),
        scale * (0.12 + random() * 0.16),
        Math.sin(angle) * scale * (0.10 + random() * 0.10),
      ));
      const direction = tip.clone().sub(start);
      const bend = stem.getTangent(t).multiplyScalar(direction.length() * 0.12).addScaledVector(direction, -0.06);
      const twig = sweep(out, start, tip, scale * (0.022 + random() * 0.009), bend, distant ? 4 : 5, 7, 0.17, 0.34);
      if (!distant && fork < 2) {
        const terminalRoot = twig.getPoint(0.60 + random() * 0.12);
        const terminal = terminalRoot.clone().add(new THREE.Vector3(
          Math.cos(angle + 0.8) * scale * 0.12, scale * (0.12 + random() * 0.08), Math.sin(angle + 0.8) * scale * 0.12,
        ));
        sweep(out, terminalRoot, terminal, scale * 0.013, new THREE.Vector3(), 4, 6, 0.20, 0.25);
      }
    }
  }
}

function folioseColony(out, origin, scale, seed, heightAt) {
  const random = seededRandom(seed);
  const colonyColor = out.color.clone();
  const orientation = seed * 0.67;
  const axis = new THREE.Vector3(Math.cos(orientation), 0, Math.sin(orientation));
  const across = new THREE.Vector3(-axis.z, 0, axis.x);
  attachment(out, origin, scale * 0.80, seed, heightAt);
  const leaves = 8 + seed % 4;
  for (let leaf = 0; leaf < leaves; leaf++) {
    const along = (leaf / (leaves - 1) - 0.5) * scale * 1.20;
    const center = origin.clone().addScaledVector(axis, along).addScaledVector(across, (random() - 0.5) * scale * 0.65);
    center.y = heightAt(center.x, center.z) + 0.04 + scale * (0.02 + random() * 0.17 + (leaf % 3 === 0 ? 0.10 : 0));
    const radius = scale * (leaf % 5 === 2 ? 0.89 + random() * 0.13 : 0.44 + random() * 0.35);
    const angle = orientation + (leaf % 2 ? -1 : 1) * (0.65 + random() * 0.80);
    out.color.copy(colonyColor).multiplyScalar(0.90 + random() * 0.16);
    plate(out, center, radius, seed + leaf * 11, (random() - 0.5) * 0.19, angle, 0.06 + random() * 0.12, true);
  }
  out.color.copy(colonyColor);
}

function encrusting(out, origin, scale, seed, heightAt) {
  const sectors = 44;
  const rings = 9;
  const phase = seed * 0.37;
  const base = out.positions.length / 3;
  function surface(u, a) {
    const edge = 1 + 0.14 * Math.sin(a * 4 + phase) + 0.07 * Math.cos(a * 7 - phase);
    const x = origin.x + Math.cos(a) * scale * u * edge;
    const z = origin.z + Math.sin(a) * scale * u * edge * 0.82;
    const lobe = Math.pow(Math.sin(a * 3 + phase), 2);
    const rise = scale * (0.22 * Math.pow(1 - u * u, 2)
      + 0.09 * lobe * u * u * (1 - u)
      + 0.04 * Math.cos(a * 5 + u * 2 + phase) * u * (1 - u));
    return new THREE.Vector3(x, heightAt(x, z) + 0.035 + rise, z);
  }
  for (let ring = 0; ring <= rings; ring++) {
    const u = ring / rings;
    for (let sector = 0; sector < sectors; sector++) {
      const a = sector / sectors * TAU;
      const normal = u === 0 ? new THREE.Vector3(
        heightAt(origin.x - 0.01, origin.z) - heightAt(origin.x + 0.01, origin.z), 0.02,
        heightAt(origin.x, origin.z - 0.01) - heightAt(origin.x, origin.z + 0.01),
      ).normalize() : new THREE.Vector3().crossVectors(
        surface(u, a + 0.001).sub(surface(u, a - 0.001)),
        surface(u + 0.001, a).sub(surface(u - 0.001, a)),
      ).normalize();
      const growth = 0.07 * Math.cos(a * 5 + u * 2 + phase) * u * (1 - u);
      vertex(out, surface(u, a), normal, 0.80 + (1 - u) * 0.15 + growth, 0.07 * u);
      if (ring < rings) {
        const p = base + ring * sectors + sector;
        const q = base + ring * sectors + (sector + 1) % sectors;
        out.indices.push(p, q + sectors, p + sectors);
        if (ring > 0) out.indices.push(p, q, q + sectors);
      }
    }
  }
}

function seaFan(out, origin, scale, seed) {
  const random = seededRandom(seed);
  const across = new THREE.Vector3(0.67, 0, -0.74).normalize();
  const depth = new THREE.Vector3(0.74, 0, 0.67).normalize();
  const local = (x, y) => origin.clone().addScaledVector(across, x * scale)
    .addScaledVector(UP, y * scale).addScaledVector(depth, Math.sin(x * 4 + y * 3) * scale * 0.035);
  const layers = [[3, 0.23, 0.17], [7, 0.45, 0.36], [13, 0.69, 0.60], [21, 0.92, 0.80], [29, 1.15, 0.98], [35, 1.38, 1.04], [31, 1.61, 0.96]];
  let previous = [origin];
  function connect(start, end, radius) {
    const length = start.distanceTo(end);
    if (length < scale * 0.065) return;
    const bow = depth.clone().multiplyScalar(scale * (random() - 0.5) * 0.024);
    sweep(out, start, end, radius, bow, length < scale * 0.22 ? 3 : 4, 6, 0.025, 0.68);
  }
  layers.forEach(([count, height, width], layer) => {
    const current = [];
    for (let node = 0; node < count; node++) {
      const u = node / (count - 1) * 2 - 1;
      const x = (u + (random() - 0.5) * 0.055) * width;
      const y = height - (layer > 3 ? 0.12 * u * u : 0) + (random() - 0.5) * 0.065;
      const point = local(x, y);
      const parent = Math.max(0, Math.min(previous.length - 1, Math.round(node / (count - 1) * (previous.length - 1) + (random() - 0.5) * 0.8)));
      const radius = scale * (0.006 + 0.024 * Math.pow(1 - y / 1.95, 1.25));
      connect(previous[parent], point, radius);
      if (layer > 1 && random() < 0.40) {
        const neighbor = Math.max(0, Math.min(previous.length - 1, parent + (random() < 0.5 ? -1 : 1)));
        if (neighbor !== parent) connect(previous[neighbor], point, radius * 0.70);
      }
      if (node > 0 && layer > 2 && random() < 0.32) connect(current[node - 1], point, radius * 0.65);
      current.push(point);
      if (layer === layers.length - 1) {
        for (let tip = 0; tip < 2; tip++) {
          connect(point, point.clone().addScaledVector(across, scale * (tip ? 0.045 : -0.045))
            .addScaledVector(UP, scale * (0.075 + random() * 0.055)), scale * 0.0065);
        }
      }
    }
    previous = current;
  });
}

function grass(out, origin, scale, seed) {
  const random = seededRandom(seed);
  for (let blade = 0; blade < 7; blade++) {
    const a = random() * TAU;
    const length = scale * (0.60 + random() * 0.60);
    const across = new THREE.Vector3(Math.cos(a), 0, Math.sin(a));
    const lean = new THREE.Vector3(Math.sin(a), 0, -Math.cos(a)).multiplyScalar(length * (0.22 + random() * 0.22));
    const root = origin.clone().addScaledVector(across, (random() - 0.5) * scale * 0.16);
    const base = out.positions.length / 3;
    for (let row = 0; row <= 6; row++) {
      const t = row / 6;
      const point = root.clone().addScaledVector(lean, t * t);
      point.y += length * t;
      const width = scale * 0.047 * (1 - t * 0.94);
      const normal = new THREE.Vector3().crossVectors(across, UP).normalize();
      vertex(out, point.clone().addScaledVector(across, -width), normal, 0.77 + t * 0.18);
      vertex(out, point.clone().addScaledVector(across, width), normal, 0.77 + t * 0.18);
      if (row < 6) {
        const p = base + row * 2;
        out.indices.push(p, p + 1, p + 2, p + 1, p + 3, p + 2);
      }
    }
  }
}

export function createBiota({ heightAt, replacePrimaryBranches = false, replacePrimaryPlates = false }) {
  if (typeof heightAt !== 'function') throw new TypeError('createBiota requires heightAt(x, z).');
  const group = new THREE.Group();
  group.name = 'Illustrative reef biota';
  const scanSlots = [];
  const branchBatch = batch('Branching coral', '#b77456', 'branch');
  const plateBatch = batch('Plate coral', '#aa8959', 'plate');
  const moundBatch = batch('Rounded coral', '#bc985e', 'mound');
  const fanBatch = batch('Small sea fan', '#a95f65', 'fan');
  const grassBatch = batch('Seagrass', '#6d7850', 'grass', true);
  const at = (x, z) => {
    const y = heightAt(x, z);
    if (!Number.isFinite(y)) throw new TypeError(`heightAt(${x}, ${z}) must return a finite number.`);
    return new THREE.Vector3(x, y + 0.035, z);
  };
  const fit = (origin, scale, height = 1.85) => {
    if (origin.y >= 6.1) throw new RangeError('Coral attachment must remain below the 6.2 crown ceiling.');
    return Math.min(scale, (6.2 - origin.y) / height);
  };
  const hero = at(-3, 2);
  const tables = at(1, -2);
  const rounded = at(-6, -4);
  // Overlapping colonies follow two reef shoulders, leaving the rock and sand examples open.
  const branchColonies = [
    [-3, 2, 1.30, '#b6ad99', true], [-5.0, 1.4, 1.03, '#b5aa85', true],
    [-2.4, 4.0, 0.98, '#bba58c', true], [-0.8, 1.9, 0.94, '#c4aa74', true],
    [-3.9, -0.4, 0.92, '#a9ac93', true], [1.8, -4, 1.03, '#b8ab84', true],
    [-6.2, 3.2, 0.68, '#b2a796', false], [-0.3, 4.3, 0.65, '#c0b499', false],
    [-5.8, -2.2, 0.70, '#bca776', false], [3.1, -2.3, 0.72, '#b1b29e', false],
    [3.4, -5.6, 0.64, '#b8aa98', false], [-6.8, 0.1, 0.62, '#bcb092', false],
  ];
  branchColonies.forEach(([x, z, size, color, rich], i) => {
    const origin = at(x, z);
    if (replacePrimaryBranches) {
      scanSlots.push({ form: 'branch', position: origin.toArray(), diameter: size * 2.3, color, rotationY: (0.35 + i * 2.39996) % TAU });
      return;
    }
    branchBatch.color.set(color);
    branching(branchBatch, origin, fit(origin, size, 3.4), 52 + i * 17, rich, heightAt);
  });
  const plateColonies = [[1, -2, 1.18], [-5.8, 5.1, 1.25], [-5.2, -4.9, 0.95]];
  plateColonies.forEach(([x, z, size], i) => {
    const origin = at(x, z);
    const color = ['#aa8959', '#b89b6e', '#a68d63'][i];
    if (replacePrimaryPlates) {
      scanSlots.push({ form: 'plate', position: origin.toArray(), diameter: size * 2.6, color, rotationY: (0.70 + i * 1.91) % TAU });
      return;
    }
    plateBatch.color.set(color);
    plateColony(plateBatch, origin, fit(origin, size, 1), 109 + i * 19, true, heightAt);
  });
  const mounds = [[-6, -4, 1.12], [0.5, 4.8, 0.86], [-6.8, 1.8, 0.76], [0.1, -4.6, 0.73]];
  mounds.forEach(([x, z, size], i) => {
    const origin = at(x, z);
    moundBatch.color.set(['#b6a075', '#c4a36a', '#ac925c', '#c5ae8c'][i]);
    mound(moundBatch, origin, fit(origin, size, 0.7), i * 0.7);
  });

  // Low foreground growth, large middle colonies, and a smaller rear chain share the same ridge.
  const thickets = [
    [-3.5, 5.7, 0.92], [-1.1, 5.3, 0.90], [-5.3, 7.0, 0.75], [1.2, 4.6, 0.72], [-7.2, 3.9, 0.72],
    [-4.5, 3.0, 0.65], [-1.5, -0.7, 0.80], [0.1, 0.7, 0.75],
    [-6.5, -6.6, 0.65], [-3.3, -5.7, 0.75], [-0.4, -6.8, 0.62], [-7.6, -7.3, 0.52], [-4.8, -8.3, 0.55], [-1.5, -8.5, 0.50],
  ];
  thickets.forEach(([x, z, size], i) => {
    const origin = at(x, z);
    branchBatch.color.set(['#bcaa83', '#ab99b8', '#b98d92', '#9ca078', '#bda064'][i % 5]);
    fineThicket(branchBatch, origin, fit(origin, size, 1.5), 410 + i * 23, heightAt, z < -5);
  });
  const rosettes = [
    [-3.8, 4.7, 1.20], [-0.8, 5.8, 1.15], [-5.6, 6.3, 1.25], [0.8, 3.3, 0.95],
    [-6.6, -0.7, 0.85], [-2.4, -2.6, 1.05], [1.9, -0.9, 1.00],
    [-6.7, -5.3, 1.12], [-4.1, -6.9, 1.15], [0.7, -6.9, 0.80],
  ];
  rosettes.forEach(([x, z, size], i) => {
    const origin = at(x, z);
    plateBatch.color.set(['#969a7b', '#a69a80', '#97939e', '#aa8f91', '#a79a72'][i % 5]);
    folioseColony(plateBatch, origin, fit(origin, size, 1), 730 + i * 29, heightAt);
  });
  const crusts = [
    [-4.7, 4.2, 1.15], [-1.2, 5.2, 0.95], [-6.4, 6.2, 0.80], [-3.0, 6.3, 0.70], [0.3, 4.2, 0.65],
    [-5.2, -1.3, 1.0], [-0.1, -0.8, 0.75], [1.8, -1.1, 0.55], [-7.4, 3.5, 0.70],
    [-8.0, -5.6, 0.80], [-6.5, -8.0, 0.90], [-2.8, -7.1, 0.85],
  ];
  crusts.forEach(([x, z, size], i) => {
    const origin = at(x, z);
    moundBatch.color.set(['#ab9a74', '#a6a17a', '#b3a181', '#9d9570'][i % 4]);
    encrusting(moundBatch, origin, fit(origin, size, 0.35), 950 + i * 31, heightAt);
  });
  const smallMounds = [
    [-4.9, 6.6, 0.62], [-2.0, 6.9, 0.48], [1.6, 4.7, 0.54], [-7.4, -1.8, 0.65], [1.3, -0.5, 0.58],
    [-8.2, -8.7, 0.50], [-4.1, -9.6, 0.50], [1.2, -7.8, 0.48],
  ];
  smallMounds.forEach(([x, z, size], i) => {
    const origin = at(x, z);
    moundBatch.color.set(['#b5a176', '#a9a17f', '#beaa87', '#b29978'][i % 4]);
    mound(moundBatch, origin, fit(origin, size, 0.7), 13 + i * 1.3, true);
  });
  const smallPlates = [[-9.0, -6.6, 0.75], [-6.7, -9.2, 0.62], [-2.6, -10.0, 0.58], [-8.4, -2.4, 0.78], [-7.8, 0.8, 0.68], [-4.4, 7.8, 0.65]];
  smallPlates.forEach(([x, z, size], i) => {
    const origin = at(x, z);
    plateBatch.color.set(['#aa9470', '#a59676', '#b39a77'][i % 3]);
    plateColony(plateBatch, origin, fit(origin, size, 1), 1200 + i * 37, false, heightAt, true);
  });
  const fan = at(-7.2, 5.1);
  seaFan(fanBatch, fan, fit(fan, 0.95, 2), 319);
  const grassPositions = [[22, -5], [22.8, -5.5], [21.3, -5.7], [23.0, -4.5], [21.7, -4.1]];
  grassPositions.forEach(([x, z], i) => grass(grassBatch, at(x, z), 0.80 + i * 0.06, 240 + i));

  let triangles = 0;
  let vertices = 0;
  let maxY = -Infinity;
  for (const out of [branchBatch, plateBatch, moundBatch, fanBatch, grassBatch]) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(out.positions, 3));
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(out.normals, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(out.colors, 3));
    geometry.setIndex(out.indices);
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    maxY = Math.max(maxY, geometry.boundingBox.max.y);
    const mesh = new THREE.Mesh(geometry, out.material);
    mesh.name = out.name;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
    triangles += out.indices.length / 3;
    vertices += out.positions.length / 3;
  }
  const coralColonies = branchColonies.length + plateColonies.length + mounds.length + thickets.length + rosettes.length + crusts.length + smallMounds.length + smallPlates.length + 1;
  return {
    group,
    scanSlots,
    anchors: {
      coral: hero.clone().add(new THREE.Vector3(0, 1.35, 0)).toArray(),
      branching: hero.clone().add(new THREE.Vector3(0, 1.35, 0)).toArray(),
      plate: tables.clone().add(new THREE.Vector3(0, 0.65, 0)).toArray(),
      mound: rounded.clone().add(new THREE.Vector3(0, 0.7, 0)).toArray(),
      fan: fan.clone().add(new THREE.Vector3(0, 1.1, 0)).toArray(),
      seagrass: at(22, -5).add(new THREE.Vector3(0, 0.55, 0)).toArray(),
    },
    stats: {
      triangles, vertices, drawCalls: group.children.length, materials: 5,
      // Configured total includes reserved scan slots; geometry counts cover procedural meshes only.
      coralColonies, proceduralColonies: coralColonies - scanSlots.length, scanSlots: scanSlots.length,
      smallColonies: 6 + thickets.length + smallMounds.length + smallPlates.length,
      morphologies: { branching: branchColonies.length, fineBranching: thickets.length, plate: plateColonies.length + smallPlates.length, foliose: rosettes.length, mound: mounds.length + smallMounds.length, encrusting: crusts.length, fan: 1 },
      clusterCount: 3, grassTufts: grassPositions.length, maxY,
    },
  };
}

export function createReefUnderstory({ heightAt, slots }) {
  if (typeof heightAt !== 'function' || !Array.isArray(slots)) {
    throw new TypeError('createReefUnderstory requires heightAt(x, z) and a slots array.');
  }
  const group = new THREE.Group();
  group.name = 'Fixed reef understory';
  const batches = {
    plate: batch('Understory plates', '#aa9470', 'plate'),
    mound: batch('Understory mounds', '#b5a176', 'mound'),
    crust: batch('Understory crusts', '#a6a17a', 'mound'),
  };
  const forms = { plate: 0, mound: 0, crust: 0 };
  const ground = (x, z) => {
    const y = heightAt(x, z);
    if (!Number.isFinite(y)) throw new TypeError(`heightAt(${x}, ${z}) must return a finite number.`);
    return y;
  };
  for (const slot of slots) {
    if (!slot || !['plate', 'mound', 'crust'].includes(slot.form)
      || !Array.isArray(slot.position) || slot.position.length !== 3 || !slot.position.every(Number.isFinite)
      || !Number.isFinite(slot.scale) || slot.scale <= 0 || !Number.isFinite(slot.seed) || slot.color == null) {
      throw new TypeError('Each understory slot requires form, finite position[3], positive scale, color, and finite seed.');
    }
    const out = batches[slot.form];
    const origin = new THREE.Vector3(...slot.position);
    out.color.set(slot.color);
    if (slot.form === 'plate') plateColony(out, origin, slot.scale, slot.seed, false, ground, 'understory');
    else if (slot.form === 'mound') mound(out, origin, slot.scale, slot.seed * 0.17, true);
    else encrusting(out, origin, slot.scale, slot.seed, ground);
    forms[slot.form]++;
  }
  let triangles = 0;
  let vertices = 0;
  let maxY = -Infinity;
  for (const out of Object.values(batches)) {
    if (out.indices.length === 0) {
      out.material.dispose();
      continue;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(out.positions, 3));
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(out.normals, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(out.colors, 3));
    geometry.setIndex(out.indices);
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    const mesh = new THREE.Mesh(geometry, out.material);
    mesh.name = out.name;
    mesh.receiveShadow = true;
    group.add(mesh);
    triangles += out.indices.length / 3;
    vertices += out.positions.length / 3;
    maxY = Math.max(maxY, geometry.boundingBox.max.y);
  }
  return {
    group,
    stats: {
      colonies: slots.length, forms, triangles, vertices,
      drawCalls: group.children.length, materials: group.children.length,
      maxY: group.children.length ? maxY : null,
    },
  };
}
