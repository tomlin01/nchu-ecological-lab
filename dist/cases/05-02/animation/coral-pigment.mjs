import * as THREE from './vendor/three.module.js';

// Reference-guided scene colours, not the specimens' living colours or a health assessment.
export const CORAL_PIGMENT_PALETTE = Object.freeze([
  { name: 'ochre', label: '淡赭黃', color: '#cbb885' },
  { name: 'olive', label: '橄欖綠', color: '#aaa87c' },
  { name: 'lilac', label: '淡紫', color: '#b3a7bb' },
  { name: 'rose', label: '灰玫瑰', color: '#ba9aab' },
  { name: 'rust', label: '淺赭褐', color: '#b49373' },
  { name: 'sea-green', label: '灰橄欖', color: '#aaa995' },
  { name: 'plum', label: '梅紫', color: '#a28a9f' },
]);

export function applyCoralPigment(material, { color = null } = {}) {
  const previous = material.onBeforeCompile;
  const cacheKey = material.customProgramCacheKey.bind(material);
  const pigment = new THREE.Color(color ?? '#ffffff');
  material.color.set('#ffffff');
  material.customProgramCacheKey = () => cacheKey() + ':coral-pigment-v2';
  material.onBeforeCompile = (shader, renderer) => {
    previous.call(material, shader, renderer);
    for (const chunk of ['common', 'map_fragment']) {
      if (!shader.fragmentShader.includes(`#include <${chunk}>`)) throw new Error(`珊瑚材質缺少 ${chunk}，無法套用色彩。`);
    }
    shader.uniforms.reefCoralPigment = { value: pigment };
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <common>',
      '#include <common>\nuniform vec3 reefCoralPigment;'
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <map_fragment>',
      `#include <map_fragment>
      // Remove specimen hue while retaining texture relief; instance colour follows below.
      float reefCoralLuminance = dot(diffuseColor.rgb, vec3(0.2126, 0.7152, 0.0722));
      float reefCoralDetail = reefCoralLuminance / (0.2 + 0.8 * reefCoralLuminance);
      diffuseColor.rgb = reefCoralPigment * reefCoralDetail;`
    );
  };
  material.needsUpdate = true;
  return material;
}
