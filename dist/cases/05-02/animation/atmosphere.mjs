import * as THREE from './vendor/three.module.js';
import { WATER_LEVEL } from './terrain.mjs';

// These are reference-guided scene coefficients, not measured water properties.
const deep = new THREE.Color('#082f61');
const upper = new THREE.Color('#197ccc');
const waterColour = /* glsl */`
  uniform vec3 reefWaterDeep;
  uniform vec3 reefWaterUpper;
  vec3 reefWaterColour(vec3 direction) {
    float sky = smoothstep(-.65, .42, direction.y);
    float sun = pow(max(dot(direction, vec3(-.32, .86, .39)), 0.), 6.);
    return mix(reefWaterDeep, reefWaterUpper, sky) + vec3(.008, .02, .028) * sun;
  }
`;

function insert(source, chunk, addition) {
  const marker = `#include <${chunk}>`;
  if (!source.includes(marker)) throw new Error(`水下材質缺少 ${chunk}，無法套用光程。`);
  return source.replace(marker, marker + '\n' + addition);
}

export function createWaterBackground(){
  const mesh=new THREE.Mesh(new THREE.SphereGeometry(180,40,24),new THREE.ShaderMaterial({
    side:THREE.BackSide,depthWrite:false,
    uniforms:{reefWaterDeep:{value:deep},reefWaterUpper:{value:upper}},
    vertexShader:'varying vec3 waterDirection;void main(){waterDirection=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader:`${waterColour} varying vec3 waterDirection;
      void main(){gl_FragColor=vec4(reefWaterColour(normalize(waterDirection)),1.);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
      }`
  }));
  mesh.renderOrder=-100;mesh.frustumCulled=false;mesh.userData.skipAO=true;
  return mesh;
}

export function applyWaterFog(material){
  const previous=material.onBeforeCompile;
  const cacheKey=material.customProgramCacheKey.bind(material);
  material.customProgramCacheKey=()=>cacheKey()+':water-path-v3';
  material.onBeforeCompile=(shader,renderer)=>{
    previous.call(material,shader,renderer);
    if(!shader.fragmentShader.includes('varying vec3 vReefWorld;')){
      shader.vertexShader=insert(shader.vertexShader,'common','varying vec3 vReefWorld;');
      shader.vertexShader=insert(shader.vertexShader,'worldpos_vertex',`
        vec4 reefFogPosition=vec4(transformed,1.);
        #ifdef USE_BATCHING
          reefFogPosition=batchingMatrix*reefFogPosition;
        #endif
        #ifdef USE_INSTANCING
          reefFogPosition=instanceMatrix*reefFogPosition;
        #endif
        vReefWorld=(modelMatrix*reefFogPosition).xyz;`);
      shader.fragmentShader=insert(shader.fragmentShader,'common','varying vec3 vReefWorld;');
    }
    shader.uniforms.reefWaterDeep={value:deep};shader.uniforms.reefWaterUpper={value:upper};
    shader.uniforms.reefWaterLevel={value:WATER_LEVEL};
    shader.fragmentShader=insert(shader.fragmentShader,'common',waterColour+'\nuniform float reefWaterLevel;');
    const fog=/* glsl */`
      #ifdef USE_FOG
        vec3 reefRay=vReefWorld-cameraPosition;
        float reefDistance=length(reefRay);
        vec3 reefDirection=reefRay/max(reefDistance,.0001);
        float reefCameraDepth=reefWaterLevel-cameraPosition.y;
        float reefPointDepth=reefWaterLevel-vReefWorld.y;
        float reefWaterFraction=0.;
        if(min(reefCameraDepth,reefPointDepth)>0.) reefWaterFraction=1.;
        else if(max(reefCameraDepth,reefPointDepth)>0.)
          reefWaterFraction=clamp(max(reefCameraDepth,reefPointDepth)/max(abs(reefCameraDepth-reefPointDepth),.0001),0.,1.);
        #ifdef FOG_EXP2
          float reefDensityScale=max(fogDensity,0.)/.016;
        #else
          float reefDensityScale=1.;
        #endif
        // The overview includes an air segment; only the underwater segment loses colour.
        float reefImmersion=smoothstep(-.6,1.5,reefCameraDepth);
        float reefPath=reefDistance*reefWaterFraction*reefDensityScale*mix(.65,1.,reefImmersion);
        float reefSunPath=max(reefPointDepth,0.)*reefDensityScale;
        // Keep the nearby 6–12 scene-unit foreground warm while the rear slope loses colour.
        float reefColourPath=max(reefPath-6.,0.);
        float reefScatterPath=max(reefPath-4.,0.);
        vec3 reefTransmission=exp(-vec3(.052,.022,.009)*reefColourPath-vec3(.012,.004,.0015)*reefSunPath);
        float reefScatter=1.-exp(-.0018*reefScatterPath*reefScatterPath);
        gl_FragColor.rgb=gl_FragColor.rgb*reefTransmission*(1.-reefScatter)
          +reefWaterColour(reefDirection)*reefScatter;
      #endif`;
    if(!shader.fragmentShader.includes('#include <fog_fragment>')||!shader.fragmentShader.includes('#include <tonemapping_fragment>'))
      throw new Error('水下材質缺少線性色彩輸出位置。');
    // Apply optical loss in linear light, before either direct output or the composer's OutputPass.
    shader.fragmentShader=shader.fragmentShader.replace('#include <fog_fragment>','')
      .replace('#include <tonemapping_fragment>',fog+'\n#include <tonemapping_fragment>');
  };
  material.needsUpdate=true;
  return material;
}
