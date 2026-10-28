import { SAND_MASK_GLSL } from './terrain.mjs';
import { RepeatWrapping, SRGBColorSpace } from './vendor/three.module.js';

// Concept-scene textures: frequencies and heights use illustrative scene units.
const SURFACES = {
  bed:    { roughness: .98, frequency: 12, bump: .012, variation: .10 },
  rock:   { roughness: .98, frequency: 10, bump: .026, variation: .14 },
  branch: { roughness: .96, frequency: 14, bump: .005, variation: .09 },
  plate:  { roughness: .97, frequency: 16, bump: .004, variation: .10 },
  mound:  { roughness: .96, frequency: 13, bump: .006, variation: .10 },
  fan:    { roughness: .96, frequency: 20, bump: .004, variation: .07 },
  grass:  { roughness: .93, frequency: 10, bump: .002, variation: .05 },
};

const GLSL = /* glsl */`
uniform float reefSurfaceTime;
varying vec3 vReefWorld;
#ifdef REEF_ROCK_TEXTURE
uniform sampler2D reefRockMap;
varying vec3 vReefWorldNormal;

vec3 reefRockAlbedo(vec3 position, vec3 normal) {
  vec3 weight = pow(abs(normal), vec3(4.0));
  weight /= max(weight.x + weight.y + weight.z, .0001);
  vec3 p = position * .22;
  // Repeat wrapping preserves mip derivatives across tile boundaries.
  vec3 x = texture2D(reefRockMap, p.zy * vec2(normal.x < 0.0 ? -1.0 : 1.0, 1.0), .8).rgb;
  vec3 y = texture2D(reefRockMap, p.xz * vec2(normal.y < 0.0 ? -1.0 : 1.0, 1.0), .8).rgb;
  vec3 z = texture2D(reefRockMap, p.xy * vec2(normal.z < 0.0 ? 1.0 : -1.0, 1.0), .8).rgb;
  return x * weight.x + y * weight.y + z * weight.z;
}
#endif

float reefHash(vec3 p) {
  p = fract(p * vec3(.1031, .11369, .13787));
  p += dot(p, p.yzx + 19.19);
  return fract((p.x + p.y) * p.z);
}

float reefNoise(vec3 p) {
  vec3 i = floor(p), f = fract(p);
  vec3 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(reefHash(i), reefHash(i + vec3(1,0,0)), u.x),
        mix(reefHash(i + vec3(0,1,0)), reefHash(i + vec3(1,1,0)), u.x), u.y),
    mix(mix(reefHash(i + vec3(0,0,1)), reefHash(i + vec3(1,0,1)), u.x),
        mix(reefHash(i + vec3(0,1,1)), reefHash(i + vec3(1,1,1)), u.x), u.y), u.z);
}

float reefNoise2(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(reefHash(vec3(i, 13.7)), reefHash(vec3(i + vec2(1,0), 13.7)), u.x),
             mix(reefHash(vec3(i + vec2(0,1), 13.7)), reefHash(vec3(i + vec2(1,1), 13.7)), u.x), u.y);
}

${SAND_MASK_GLSL}

float reefDetailFilter(float footprint, float frequency) {
  return 1.0 - smoothstep(.18, .65, footprint * frequency);
}

// Surface derivatives and the normal are all in view space. Height stays in world units.
vec3 reefBumpNormal(vec3 surfacePosition, vec3 surfaceNormal, float height, float faceDirection) {
  vec3 dx = dFdx(surfacePosition), dy = dFdy(surfacePosition);
  vec3 rx = cross(dy, surfaceNormal), ry = cross(surfaceNormal, dx);
  float determinant = dot(dx, rx) * faceDirection;
  vec3 gradient = sign(determinant) * (dFdx(height) * rx + dFdy(height) * ry);
  return normalize(max(abs(determinant), 1e-10) * surfaceNormal - gradient);
}

float reefWaterLight(vec3 position, float footprint) {
  vec2 p = position.xz + position.y * vec2(.12, -.08);
  vec2 drift = reefSurfaceTime * vec2(.027, -.019);
  float warp = reefNoise2(p * .31 + drift) - .5;
  float field = reefNoise2(p * .83 + vec2(warp * 1.8, warp * -.9) - drift);
  float band = 1.0 - smoothstep(.035, .14, abs(field - .52));
  float shallow = smoothstep(-17.0, -1.0, position.y);
  return band * .11 * shallow * reefDetailFilter(footprint, .83);
}
`;

const ROCK_DETAIL = /* glsl */`
  #ifdef REEF_ROCK_TEXTURE
    vec3 reefRockColor = reefRockAlbedo(reefPoint, normalize(vReefWorldNormal));
    float reefRockLuma = dot(reefRockColor, vec3(.2126, .7152, .0722));
    // Center this albedo's variation on its measured linear RGB mean, keeping the base rock color.
    vec3 reefRockVariation = clamp(reefRockColor / vec3(.430, .344, .208), vec3(.65), vec3(1.35));
    diffuseColor.rgb *= mix(vec3(1.0), reefRockVariation, .55 * reefRockWeight);
    reefHeight = mix(reefHeight, reefHeight * .55 + (reefRockLuma - .35) * .012, reefRockWeight);
  #endif
`;

function appearance(kind, settings) {
  const coral = kind === 'branch' || kind === 'plate' || kind === 'mound';
  const detail = /* glsl */`
    vec3 reefPoint = vReefWorld;
    float reefFootprint = max(length(dFdx(reefPoint)), length(dFdy(reefPoint)));
    float reefDistanceFade = 1.0 - smoothstep(18.0, 65.0, length(vViewPosition));
    float reefFineFade = reefDetailFilter(reefFootprint, ${settings.frequency.toFixed(1)}) * reefDistanceFade;
    // Rotate the lattice so no surface follows its axes.
    vec3 reefGrainPoint = mat3(.80, .48, -.36, -.60, .64, -.48, 0.0, .60, .80) * reefPoint;
    float reefBroad = (reefNoise(reefGrainPoint * 1.15 + 31.7) - .5)
      * reefDetailFilter(reefFootprint, 1.15);
    float reefFine = (reefNoise(reefGrainPoint * ${settings.frequency.toFixed(1)} + 9.2) - .5) * reefFineFade;
    float reefHeight = reefBroad * ${coral ? '.007' : '.018'} + reefFine * ${settings.bump.toFixed(3)};
    float reefTone = reefBroad * ${settings.variation.toFixed(2)} + reefFine * ${coral ? '.11' : '.075'};
  `;
  if (kind === 'bed') return detail + /* glsl */`
    float reefSand = reefSandWeight(reefPoint.xz);
    float reefSandFine = (reefNoise2(reefPoint.xz * 32.0 + 5.3) - .5)
      * reefDetailFilter(reefFootprint, 32.0) * reefDistanceFade;
    float reefRipple = sin(reefPoint.z * 10.0 + reefBroad * 3.5 + reefPoint.x * .19)
      * reefDetailFilter(reefFootprint, 1.6) * reefDistanceFade;
    reefHeight = mix(reefHeight, reefSandFine * .003 + reefRipple * .002, reefSand);
    reefTone = mix(reefTone, reefSandFine * .055 + reefRipple * .012, reefSand);
    diffuseColor.rgb *= 1.0 + reefTone;
    float reefRockWeight = 1.0 - reefSand;
  ` + ROCK_DETAIL;
  if (kind === 'rock') return detail + /* glsl */`
    reefHeight += reefBroad * .026;
    diffuseColor.rgb *= 1.0 + reefTone;
    float reefRockWeight = 1.0;
  ` + ROCK_DETAIL;
  if (coral) {
    const fold = {
      branch: { scale: 'vec3(4.3, 1.0, 4.3)', height: '.008', relief: '.016' },
      plate: { scale: 'vec3(2.6, 5.0, 2.6)', height: '.014', relief: '.009' },
      mound: { scale: 'vec3(3.4, .85, 3.4)', height: '.020', relief: '.014' },
    }[kind];
    return detail + /* glsl */`
      float reefFold = (reefNoise(reefPoint * ${fold.scale} + reefBroad * .65 + 47.2) - .5)
        * reefDetailFilter(reefFootprint, 5.0) * reefDistanceFade;
      reefHeight += reefFold * ${fold.height};
      // Solid, uneven growth nodules. No cell edges, dark holes, or white dot layer.
      float reefCellFade = reefDetailFilter(reefFootprint, 8.5) * reefDistanceFade;
      float reefCellField = reefNoise(reefGrainPoint * 8.5 + reefFold * .45 + vec3(17.3, 41.8, 7.1));
      float reefRelief = smoothstep(.43, .72, reefCellField) * reefCellFade;
      reefHeight += reefRelief * ${fold.relief};
      reefTone += reefFold * .065 + (reefRelief - .25 * reefCellFade) * .075;
      diffuseColor.rgb *= 1.0 + reefTone;
      // Reuse the growth field for small pigment differences within each vertex color.
      float reefGrowth = reefBroad * .65 + reefFold * .35;
      diffuseColor.rgb *= vec3(1.0 + reefGrowth * .08, 1.0 + reefGrowth * .015, 1.0 - reefGrowth * .05);
    `;
  }
  return detail + /* glsl */`
    reefHeight *= .4;
    diffuseColor.rgb *= 1.0 + reefTone;
  `;
}

function insert(source, chunk, code, kind, stage) {
  const marker = `#include <${chunk}>`;
  if (source.split(marker).length !== 2) {
    throw new Error(`Reef surface (${kind}): expected one ${stage} ${marker}; check the Three.js shader version.`);
  }
  return source.replace(marker, `${marker}\n${code}`);
}

/** Apply per unique material. Optional rockTexture is used only by bed and rock. */
export function applySurface(material, { kind, timeUniform, rockTexture = null }) {
  if (!material?.isMeshStandardMaterial || !Object.hasOwn(SURFACES, kind)) {
    throw new TypeError('applySurface requires a MeshStandardMaterial and a known surface kind.');
  }
  if (!timeUniform || !Number.isFinite(timeUniform.value)) {
    throw new TypeError('applySurface requires timeUniform: { value: finiteNumber }.');
  }
  if (rockTexture !== null && !rockTexture?.isTexture) {
    throw new TypeError('applySurface rockTexture must be a Three.js Texture or null.');
  }
  const texturedRock = (kind === 'bed' || kind === 'rock') && rockTexture !== null;
  if (texturedRock && (rockTexture.wrapS !== RepeatWrapping || rockTexture.wrapT !== RepeatWrapping || rockTexture.colorSpace !== SRGBColorSpace)) {
    rockTexture.wrapS = rockTexture.wrapT = RepeatWrapping;
    rockTexture.colorSpace = SRGBColorSpace;
    rockTexture.needsUpdate = true;
  }
  const settings = SURFACES[kind];
  material.roughness = settings.roughness;
  material.metalness = 0;
  const review = material.userData.reefSurface = {
    kind, compiled: false, version: 3, texturedRock,
    // Hash evaluations per fragment, not texture fetches. No finite-difference resampling.
    hashEvaluations: kind === 'bed' ? 28 : ['branch', 'plate', 'mound'].includes(kind) ? 40 : 24,
    textureFetches: texturedRock ? 3 : 0,
  };
  material.customProgramCacheKey = () => `reef-surface-v3:${kind}:${texturedRock ? 'albedo' : 'procedural'}`;
  material.onBeforeCompile = shader => {
    shader.uniforms.reefSurfaceTime = timeUniform;
    if (texturedRock) shader.uniforms.reefRockMap = { value: rockTexture };
    shader.vertexShader = insert(shader.vertexShader, 'common', 'varying vec3 vReefWorld;' + (texturedRock ? '\nvarying vec3 vReefWorldNormal;' : ''), kind, 'vertex');
    if (texturedRock) shader.vertexShader = insert(shader.vertexShader, 'normal_vertex',
      'vReefWorldNormal = inverseTransformDirection(transformedNormal, viewMatrix);', kind, 'vertex');
    shader.vertexShader = insert(shader.vertexShader, 'worldpos_vertex', /* glsl */`
      vec4 reefWorldPosition = vec4(transformed, 1.0);
      #ifdef USE_BATCHING
        reefWorldPosition = batchingMatrix * reefWorldPosition;
      #endif
      #ifdef USE_INSTANCING
        reefWorldPosition = instanceMatrix * reefWorldPosition;
      #endif
      vReefWorld = (modelMatrix * reefWorldPosition).xyz;
    `, kind, 'vertex');
    shader.fragmentShader = insert(shader.fragmentShader, 'common', (texturedRock ? '#define REEF_ROCK_TEXTURE\n' : '') + GLSL, kind, 'fragment');
    shader.fragmentShader = insert(shader.fragmentShader, 'color_fragment', appearance(kind, settings), kind, 'fragment');
    shader.fragmentShader = insert(shader.fragmentShader, 'roughnessmap_fragment',
      'roughnessFactor = clamp(roughnessFactor + reefBroad * .025 + reefFine * .035, .89, 1.0);', kind, 'fragment');
    shader.fragmentShader = insert(shader.fragmentShader, 'normal_fragment_maps',
      'normal = reefBumpNormal(-vViewPosition, normal, reefHeight, faceDirection);' + (kind === 'plate' ? /* glsl */`
        // World orientation separates plate undersides and thin rims in either camera view.
        float reefPlateUp = inverseTransformDirection(nonPerturbedNormal, viewMatrix).y;
        float reefPlateTop = smoothstep(-.7, .15, reefPlateUp);
        float reefPlateRim = (1.0 - smoothstep(.14, .44, abs(reefPlateUp))) * (.65 + reefBroad * .5);
        diffuseColor.rgb *= mix(.94, 1.0, reefPlateTop) + reefPlateRim * .06;
      ` : ''), kind, 'fragment');
    // Modulate only light that already passed the standard shadow calculation.
    shader.fragmentShader = insert(shader.fragmentShader, 'lights_fragment_end', /* glsl */`
      reflectedLight.directDiffuse *= 1.0 + reefWaterLight(vReefWorld, reefFootprint);
    `, kind, 'fragment');
    // This records hook execution. WebGL program diagnostics must still confirm GPU compilation.
    Object.assign(review, { compiled: true, vertexShader: shader.vertexShader, fragmentShader: shader.fragmentShader });
  };
  material.needsUpdate = true;
  return material;
}
