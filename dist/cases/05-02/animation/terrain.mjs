import * as THREE from './vendor/three.module.js';
import { mergeVertices } from './vendor/BufferGeometryUtils.js';
import { SimplexNoise } from './vendor/addons/math/SimplexNoise.js';

const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
const reefX = (x, z) => x + 1.5 * Math.sin(z * .09) + .7 * Math.sin(z * .23);
export const WATER_LEVEL = 7.5;
const dome = (x,z,cx,cz,rx,rz) => Math.exp(-(((x-cx)/rx)**2+((z-cz)/rz)**2));
let reefSeed=8502;
const reefNoise=new SimplexNoise({random:()=>((reefSeed=Math.imul(reefSeed,1664525)+1013904223>>>0)/4294967296)});
function reefRelief(x,z) {
  const warp=reefNoise.noise(x*.13+11,z*.15-7);
  const broad=reefNoise.noise(x*.38+warp*.48,z*.42+warp*.3);
  const ledge=reefNoise.noise(x*.86+21,z*.74-15);
  const crease=smooth(.1,.72,-ledge)*smooth(-.25,.55,reefNoise.noise(x*.23-9,z*.18+31));
  const near=.55+.45*dome(x,z,-3,1,17,22);
  const habitat=smooth(-29,-10,reefX(x,z))*(1-sandWeight(x,z))*(1-smooth(75,110,Math.hypot(x,z)));
  return {height:(.48*broad+.22*ledge+.065*reefNoise.noise(x*1.9,z*1.7)-.24*crease)*near*habitat,
    shade:crease*habitat, patch:reefNoise.noise(x*.46-18,z*.37+9)*habitat};
}
const legacySandWeight = (x,z) => smooth(7,14,reefX(x,z)+1.1*Math.sin(z*.55)+6*Math.exp(-(((z-12)/6)**2)));
const preservedArea = (x,z) => {
  const core=smooth(-15,-10,x)*(1-smooth(8,13,x))*smooth(-20,-15,z)*(1-smooth(12,17,z));
  const sandAnchor=1-smooth(1.2,3.5,Math.hypot(x-12,z-4));
  const slopeAnchor=1-smooth(1.2,3.5,Math.hypot(x+19,z));
  return Math.max(core,sandAnchor,slopeAnchor);
};
export const sandWeight = (x,z) => {
  const center=14+2*Math.sin(z*.09), halfWidth=3+.5*Math.sin(z*.12+1.4);
  const channel=1-smooth(halfWidth-1.2,halfWidth+1.2,Math.abs(x-center));
  const outer=smooth(43,58,x-3*Math.sin(z*.07));
  const world=Math.max(channel,outer), keep=preservedArea(x,z);
  return world+(legacySandWeight(x,z)-world)*keep;
};
// The material imports this source so colour and fine surface shading share the same habitat mask.
export const SAND_MASK_GLSL = `
float reefPreservedArea(vec2 p){
  float core=smoothstep(-15.,-10.,p.x)*(1.-smoothstep(8.,13.,p.x))*smoothstep(-20.,-15.,p.y)*(1.-smoothstep(12.,17.,p.y));
  float sandAnchor=1.-smoothstep(1.2,3.5,length(p-vec2(12.,4.)));
  float slopeAnchor=1.-smoothstep(1.2,3.5,length(p-vec2(-19.,0.)));
  return max(core,max(sandAnchor,slopeAnchor));
}
float reefSandWeight(vec2 p){
  float center=14.+2.*sin(p.y*.09), halfWidth=3.+.5*sin(p.y*.12+1.4);
  float channel=1.-smoothstep(halfWidth-1.2,halfWidth+1.2,abs(p.x-center));
  float outer=smoothstep(43.,58.,p.x-3.*sin(p.y*.07));
  float world=max(channel,outer);
  float q=p.x+1.5*sin(p.y*.09)+.7*sin(p.y*.23);
  float dz=(p.y-12.)/6.;
  float legacy=smoothstep(7.,14.,q+1.1*sin(p.y*.55)+6.*exp(-dz*dz));
  return mix(world,legacy,reefPreservedArea(p));
}`;

// All units are illustrative scene units, not measured bathymetry.
function legacyHeightAt(x, z) {
  const q = reefX(x, z);
  const platform = smooth(-30, -6, q);
  const sand = legacySandWeight(x,z);
  const ridges=2.35*dome(x,z,-3,2,5.0,4.6)+1.6*dome(x,z,2,-4,3.6,3.8)+1.25*dome(x,z,-7,-8,3.8,4.5);
  const reliefFade=1-smooth(22,42,Math.hypot(x,z));
  const roughReef=Math.min(1,ridges)*(.25*Math.sin(x*1.7+Math.sin(z*.8))*.5+.16*Math.cos(z*2.3+x*.5));
  const folds=(.16*Math.sin(x*1.13+2*Math.sin(z*.41))*Math.cos(z*.73+x*.21)+.07*Math.sin(x*2.8+z*1.6)+roughReef)*reliefFade;
  return -17 + 14.4 * platform - 3.2 * sand
    + (ridges+folds) * platform * (1 - sand)
    + .022 * Math.sin(z * 3.5 + Math.sin(x * .4)) * sand;
}

export function heightAt(x,z){
  const keep=preservedArea(x,z), legacy=legacyHeightAt(x,z);
  const contact=reefRelief(x,z).height;
  if(keep===1)return legacy+contact;
  const platform=smooth(-30,-6,reefX(x,z)), sand=sandWeight(x,z);
  const u=x+.85*Math.sin(z*.19), v=z+1.4*Math.sin(x*.24);
  const left=2.3*dome(u,v,-10,-37,7.5,31)+1.65*dome(u,v,1,-29,6,19)
    +2.1*dome(u,v,-4,-63,10,16)+1.25*dome(u,v,-11,23,8,22);
  const rightAxis=29+2.2*Math.sin(z*.075)+.7*Math.sin(z*.23);
  const right=3.15*Math.exp(-(((x-rightAxis)/9.5)**2))*(1-smooth(47,83,Math.abs(z+15)))
    *(1+.22*Math.sin(z*.17+x*.12)+.1*Math.sin(z*.41-x*.24));
  const erosion=.4*Math.sin(x*.69+1.6*Math.sin(z*.13))*Math.cos(z*.38+x*.12)+.18*Math.sin(x*1.5+z*.87);
  const relief=(left+right+erosion)*(1-smooth(76,115,Math.hypot(x,z)));
  const world=-17+14.4*platform-3.2*sand+relief*platform*(1-sand)
    +.022*Math.sin(z*3.5+Math.sin(x*.4))*sand;
  return world+(legacy-world)*keep+contact;
}

export function createTerrain() {
  const geometry = new THREE.PlaneGeometry(220, 210, 320, 280);
  geometry.rotateX(-Math.PI / 2);
  const pos = geometry.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const rock = new THREE.Color('#a29b83'), sand = new THREE.Color('#eddfbb'), slope = new THREE.Color('#596f68');
  const accretion=new THREE.Color('#b7a88a');
  const col = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    const rawX=pos.getX(i), rawZ=pos.getZ(i);
    const rx=Math.abs(rawX)/110, rz=Math.abs(rawZ)/105;
    const x=Math.sign(rawX)*(110*Math.pow(rx,1.45)+900*Math.pow(rx,12));
    const z=Math.sign(rawZ)*(105*Math.pow(rz,1.45)+900*Math.pow(rz,12));
    const q = reefX(x,z);
    pos.setXYZ(i,x,heightAt(x,z),z);
    col.copy(slope).lerp(rock, smooth(-23,-6,q));
    col.lerp(sand, sandWeight(x,z));
    // Broad attached growth and shaded low folds break up the exposed bed without outlining colonies.
    const relief=reefRelief(x,z);
    col.lerp(accretion,smooth(.05,.6,relief.patch)*.28);
    const grain = 1-.16*relief.shade+.08*relief.patch;
    col.multiplyScalar(grain).toArray(colors, i * 3);
  }
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.computeVertexNormals();
  const material = new THREE.MeshStandardMaterial({ vertexColors:true, roughness:.94, metalness:0 });
  const uniforms = { reefTime: { value:0 } };
  material.userData.surfaceKind='bed';
  const group = new THREE.Group();
  const bed = new THREE.Mesh(geometry,material);
  bed.receiveShadow = true;
  group.add(bed);
  // Low weathered outcrops support the rock/sand contrast without a cut face.
  const rockMaterial = new THREE.MeshStandardMaterial({color:'#9e967f', roughness:.96});
  rockMaterial.userData.surfaceKind='rock';
  const outcrop = new THREE.IcosahedronGeometry(1,18);
  const p = outcrop.attributes.position;
  for(let i=0;i<p.count;i++) {
    const x=p.getX(i), y=p.getY(i), z=p.getZ(i);
    const warp=1+.14*Math.sin(x*4.1+y*2)*Math.cos(z*3.2)+.045*Math.sin(z*8+x*5)
      +.018*Math.sin(x*18+z*12)*Math.cos(y*14-z*7);
    const ledges=.065*Math.sin(y*10+x*2)*Math.cos(z*4)+.018*Math.sin(z*25-y*18);
    p.setXYZ(i,x*warp,y*warp+ledges,z*warp);
  }
  outcrop.deleteAttribute('normal');outcrop.deleteAttribute('uv');
  const smoothOutcrop=mergeVertices(outcrop);smoothOutcrop.computeVertexNormals();outcrop.dispose();
  const rocks = [[7,2,1.7,.75,1.35],[9,-5,1.8,.7,1.3],[-10,7,2.2,1.1,1.8],[-13,-5,3,1.1,2],[2,-16,2.3,.8,1.6]];
  for(const [x,z,sx,sy,sz] of rocks) {
    const m=new THREE.Mesh(smoothOutcrop,rockMaterial);
    m.position.set(x,heightAt(x,z)-sy*.15,z);
    m.scale.set(sx,sy,sz); m.rotation.y=x*.31;
    m.castShadow=true; m.receiveShadow=true; group.add(m);
  }
  return {group, heightAt, uniforms, anchors:{rock:[7,heightAt(7,2)+.65,2],sand:[12,heightAt(12,4)+.1,4],slope:[-19,heightAt(-19,0)+.15,0],flat:[4,heightAt(4,-9)+.1,-9]}};
}

export function createWater() {
  const uniforms={time:{value:0}, submerged:{value:0}};
  const mat=new THREE.ShaderMaterial({
    uniforms,transparent:true,depthWrite:false,side:THREE.DoubleSide,
    vertexShader:`varying vec3 vWorld; uniform float time;
      void main(){vec3 p=position; p.z+=.025*sin(p.x*.38+p.y*.17+time*.32)+.018*sin(p.y*.3-p.x*.21+time*.21);
      vec4 w=modelMatrix*vec4(p,1.); vWorld=w.xyz; gl_Position=projectionMatrix*viewMatrix*w;}`,
    fragmentShader:`varying vec3 vWorld;uniform float time;uniform float submerged;
      void main(){vec2 p=vWorld.xz;
      float waves=sin(dot(p,vec2(.39,.64))+sin(p.y*.19+time*.18))
        +.6*sin(dot(p,vec2(-.57,.28))-time*.21)+.3*sin(dot(p,vec2(.11,-.43))+time*.14);
      float lightPatch=.5+.5*sin(p.x*.14+sin(p.y*.11))*sin(p.y*.16-p.x*.07);
      float glint=pow(max(0.,1.-abs(waves)),8.)*lightPatch;vec3 color=mix(vec3(.15,.58,.62),vec3(.68,.89,.86),glint*.32);
      gl_FragColor=vec4(color,mix(.035+glint*.009,.02,submerged));
      #include <tonemapping_fragment>
      #include <colorspace_fragment>}`
  });
  const mesh=new THREE.Mesh(new THREE.PlaneGeometry(220,210,80,60),mat);
  mesh.rotation.x=-Math.PI/2;mesh.position.y=WATER_LEVEL;mesh.renderOrder=10;mesh.userData.skipAO=true;
  return {mesh,uniforms};
}
