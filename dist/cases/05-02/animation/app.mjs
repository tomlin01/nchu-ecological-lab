import * as THREE from './vendor/three.module.js';
import { createTerrain, createWater, WATER_LEVEL } from './terrain.mjs';
import { createBiota, createReefUnderstory } from './biota.mjs';
import { applySurface } from './surface-material.mjs';
import { EffectComposer } from './vendor/addons/postprocessing/EffectComposer.js';
import { RenderPass } from './vendor/addons/postprocessing/RenderPass.js';
import { SSAOPass } from './vendor/addons/postprocessing/SSAOPass.js';
import { OutputPass } from './vendor/addons/postprocessing/OutputPass.js';
import { createWaterBackground, applyWaterFog } from './atmosphere.mjs';
import { loadCoralScans, placeCoralScans, createCoralField } from './scan-corals.mjs';
import { createSurroundings } from './surroundings.mjs';
import { createMarineLife } from './marine-life.mjs';

const $=id=>document.getElementById(id);
const duration=20;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const state={ready:false,time:0,playing:false,labels:false,theme:'light',reducedMotion:reduced.matches};
let renderer,scene,camera,terrain,water,biota,scans,surroundings,backgroundScans,understory,marineLife,composer,aoPass,rockTexture,waterBackground,frame=0,last=0,transition=null,look=new THREE.Vector3();
const annotations=[];
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const smooth=v=>v*v*(3-2*v);

function theme(next){
  state.theme=next==='dark'?'dark':'light';document.documentElement.dataset.theme=state.theme;
  $('theme').textContent=state.theme==='dark'?'淺色模式':'深色模式';
  $('theme').setAttribute('aria-label',`切換${$('theme').textContent}`);
  try{localStorage.setItem('reef-study-theme',state.theme);}catch{}
}
try{theme(localStorage.getItem('reef-study-theme')||'light');}catch{theme('light');}
$('theme').addEventListener('click',()=>theme(state.theme==='light'?'dark':'light'));
$('retry').addEventListener('click',()=>location.reload());

function status(){
  const p=clamp((state.time-3)/12);
  $('play').textContent=state.playing?'暫停':state.time>=duration?'重新播放':'播放鏡頭移動';
  $('timeline').value=state.time;
  $('timeline').setAttribute('aria-valuetext',`${state.time.toFixed(1)} 秒，共 20 秒`);
  $('time').value=`00:${Math.floor(state.time).toString().padStart(2,'0')} / 00:20`;
  document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===(p<.5?'overview':'detail'))));
  $('shot-title').textContent=p<.5?'先看整片礁區':'再看海床上有什麼';
  $('shot-copy').textContent=p<.5?'較平坦的礁坪，沿著礁坡向外海下降。':'珊瑚散布在部分岩石上，旁邊仍有大片裸岩和沙地。';
}

function positionCamera(){
  const u=smooth(clamp((state.time-3)/9));
  const glide=smooth(clamp((state.time-12)/8));
  // Both shots use the same geometry. The path stays above the local seabed.
  const portrait=camera.aspect<1.1;
  camera.position.set(
    THREE.MathUtils.lerp(-17,portrait?-4.5:-8,u)+(portrait?.5:1.8)*glide,
    THREE.MathUtils.lerp(27,portrait?2.8:2,u)-(portrait?.4:.3)*glide,
    THREE.MathUtils.lerp(39,portrait?16:13,u)-(portrait?2:4)*glide);
  look.set(
    THREE.MathUtils.lerp(-4,portrait?-.5:0,u)+(portrait?1.3:2)*glide,
    THREE.MathUtils.lerp(-4,portrait?-1.1:-.6,u)+(portrait?.1:-.1)*glide,
    THREE.MathUtils.lerp(-2,portrait?1:-3,u)-(portrait?2:1)*glide);
  camera.fov=THREE.MathUtils.lerp(47,portrait?52:47,u);
  camera.lookAt(look);camera.updateProjectionMatrix();camera.updateMatrixWorld();
  if(waterBackground)waterBackground.position.copy(camera.position);
  scene.fog.density=THREE.MathUtils.lerp(.009,.016,u);
  if(aoPass){aoPass.ssaoMaterial.uniforms.cameraProjectionMatrix.value.copy(camera.projectionMatrix);aoPass.ssaoMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(camera.projectionMatrixInverse);}
  water.uniforms.submerged.value=camera.position.y<WATER_LEVEL?1:0;
  water.mesh.visible=camera.position.y>=WATER_LEVEL;
  terrain.uniforms.reefTime.value=state.time;
  water.uniforms.time.value=state.time;
  for(const a of annotations){
    const pt=a.point.clone().project(camera);
    a.node.hidden=!state.labels||pt.z<-1||pt.z>1||Math.abs(pt.x)>.92||pt.y>.88||pt.y<-.85||(a.type==='landform'?u>.55:u<=.55);
    a.node.style.left=`${(pt.x*.5+.5)*100}%`;a.node.style.top=`${(-pt.y*.5+.5)*100-3}%`;
  }
}
function draw(){if(!state.ready)return;positionCamera();marineLife.update(state.time);renderer.info.reset();composer.render(0);status();}
function schedule(){if(!frame)frame=requestAnimationFrame(tick);}
function tick(now){
  frame=0;const delta=last?Math.min(.1,(now-last)/1000):0;last=now;
  if(transition){const p=clamp((now-transition.start)/transition.duration);state.time=THREE.MathUtils.lerp(transition.from,transition.to,smooth(p));if(p>=1)transition=null;}
  else if(state.playing){state.time=Math.min(duration,state.time+delta);if(state.time>=duration)state.playing=false;}
  draw();if(state.playing||transition)schedule();else last=0;
}
function pause(){state.playing=false;transition=null;last=0;if(frame){cancelAnimationFrame(frame);frame=0;}status();}
function seek(time){pause();state.time=clamp(Number(time)||0,0,duration);draw();}
function setView(view){pause();const to=view==='detail'?16:0;if(reduced.matches){seek(to);return;}transition={from:state.time,to,start:performance.now(),duration:1100};schedule();}
function play(){
  if(!state.ready)return;
  if(reduced.matches){setView(state.time<10?'detail':'overview');return;}
  transition=null;if(state.time>=duration)state.time=0;state.playing=true;last=0;schedule();status();
}
$('play').addEventListener('click',()=>state.playing?pause():play());
$('prev').addEventListener('click',()=>seek(state.time-1/24));
$('next').addEventListener('click',()=>seek(state.time+1/24));
$('timeline').addEventListener('input',e=>seek(e.target.value));
document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>setView(b.dataset.view)));
$('labels').addEventListener('click',()=>{state.labels=!state.labels;$('labels').setAttribute('aria-pressed',String(state.labels));$('labels').textContent=state.labels?'隱藏標示':'顯示標示';draw();});
function reduce(){state.reducedMotion=reduced.matches;if(reduced.matches)pause();$('note').textContent=reduced.matches?'已減少動態。選擇視角會直接切換，不播放下降鏡頭。':'兩個視角使用同一座模型。珊瑚的位置不會因換鏡而改變。';}
reduced.addEventListener('change',reduce);reduce();
document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});
new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)pause();},{threshold:.05}).observe($('viewport'));

function addLabel(text,position,type){if(!position)return;const node=document.createElement('span');node.className='annotation';node.textContent=text;node.hidden=true;$('annotations').append(node);annotations.push({node,point:new THREE.Vector3(...position),type});}
function resize(){if(!state.ready)return;const {width,height}=$('viewport').getBoundingClientRect();const ratio=Math.min(devicePixelRatio,1.6);renderer.setPixelRatio(ratio);renderer.setSize(width,height,false);composer.setPixelRatio(ratio);composer.setSize(width,height);camera.aspect=width/height;draw();}
function fail(error){pause();state.ready=false;$('loading').hidden=true;$('error').hidden=false;if(error?.message?.includes('材質'))document.querySelector('#error p').textContent=error.message;for(const el of document.querySelectorAll('.transport button,.transport input,.view-bar button'))el.disabled=true;console.error('Reef study:',error);}
function getPopulationSignature(){
  let hash=2166136261;
  const add=array=>{const bits=new Uint32Array(array.buffer,array.byteOffset,array.byteLength/4);for(const value of bits)hash=Math.imul(hash^value,16777619);};
  for(const mesh of backgroundScans.group.children)add(mesh.instanceMatrix.array);
  for(const mesh of understory.group.children)add(mesh.geometry.attributes.position.array);
  return{field:backgroundScans.stats.instances,growth:understory.stats.colonies,fish:marineLife.stats.fish,visible:[backgroundScans.group.visible,understory.group.visible,marineLife.group.visible,...marineLife.group.children.map(m=>m.visible),...backgroundScans.group.children.map(m=>m.visible),...understory.group.children.map(m=>m.visible)],signature:(hash>>>0).toString(16)};
}
try{
  try{rockTexture=await new THREE.TextureLoader().loadAsync('./assets/reef-limestone-albedo.png');}catch{throw new Error('岩面材質沒有載入完成，請重新載入。');}
  rockTexture.colorSpace=THREE.SRGBColorSpace;rockTexture.wrapS=rockTexture.wrapT=THREE.RepeatWrapping;
  renderer=new THREE.WebGLRenderer({canvas:$('scene'),antialias:true,alpha:false,preserveDrawingBuffer:true,powerPreference:'high-performance'});
  renderer.debug.onShaderError=(gl,program,vertex,fragment)=>{throw new Error('Surface shader did not compile: '+gl.getProgramInfoLog(program)+' '+gl.getShaderInfoLog(vertex)+' '+gl.getShaderInfoLog(fragment));};
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;
  renderer.info.autoReset=false;rockTexture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFShadowMap;
  // Geometry and sunlight stay fixed: camera moves do not require another shadow render.
  renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=true;
  scene=new THREE.Scene();scene.fog=new THREE.FogExp2('#115b9c',.01);scene.background=new THREE.Color('#115b9c');
  camera=new THREE.PerspectiveCamera(43,1,.1,300);
  scene.add(new THREE.HemisphereLight('#a8c7eb','#535344',.9));
  const sun=new THREE.DirectionalLight('#fff1d5',3.2);sun.position.set(-15,35,22);sun.target.position.set(0,-4,0);sun.castShadow=true;
  // A wide five-tap PCF filter leaves visible stippling at the low close-up angle.
  sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-25,right:25,top:24,bottom:-24,near:1,far:100});sun.shadow.normalBias=.035;sun.shadow.bias=-.0001;sun.shadow.radius=1;
  scene.add(sun,sun.target);
  terrain=createTerrain();scene.add(terrain.group);biota=createBiota({heightAt:terrain.heightAt,replacePrimaryBranches:true});scene.add(biota.group);
  let templates;
  try{templates=await loadCoralScans();}catch{throw new Error('珊瑚模型與材質沒有載入完成，請重新載入。');}
  scans=placeCoralScans(templates,biota.scanSlots);biota.group.add(scans.group);
  surroundings=createSurroundings({heightAt:terrain.heightAt,protectedColonies:biota.scanSlots});scene.add(surroundings.group);
  try{backgroundScans=await createCoralField(templates,surroundings.scanSlots);}catch{throw new Error('礁區模型與材質沒有載入完成，請重新載入。');}
  surroundings.group.add(backgroundScans.group);
  understory=createReefUnderstory({heightAt:terrain.heightAt,slots:surroundings.growthSlots});surroundings.group.add(understory.group);
  marineLife=createMarineLife({heightAt:terrain.heightAt,waterLevel:WATER_LEVEL});scene.add(marineLife.group);
  const materials=new Set();
  for(const root of [terrain.group,biota.group,surroundings.group,marineLife.group])root.traverse(object=>{
    if(!object.isMesh||materials.has(object.material))return;
    materials.add(object.material);
    if(!object.material.userData.isScan&&!object.material.userData.skipSurface)applySurface(object.material,{kind:object.material.userData.surfaceKind||'rock',timeUniform:terrain.uniforms.reefTime,rockTexture});
    applyWaterFog(object.material);
  });
  water=createWater();scene.add(water.mesh);
  waterBackground=createWaterBackground();scene.add(waterBackground);
  const target=new THREE.WebGLRenderTarget(1,1,{type:THREE.HalfFloatType,samples:4});
  composer=new EffectComposer(renderer,target);composer.addPass(new RenderPass(scene,camera));
  aoPass=new SSAOPass(scene,camera,1,1,16);aoPass.kernelRadius=.5;aoPass.minDistance=.00035;aoPass.maxDistance=.008;aoPass.clear=false;
  aoPass.ssaoMaterial.fragmentShader=aoPass.ssaoMaterial.fragmentShader.replace('vec3( 1.0 - occlusion )','vec3( 1.0 - .45 * occlusion )');
  composer.addPass(aoPass);composer.addPass(new OutputPass());
  addLabel('礁坡',terrain.anchors.slope,'landform');addLabel('礁坪',terrain.anchors.flat,'landform');
  addLabel('珊瑚',biota.anchors.coral||biota.anchors.branching,'material');addLabel('岩石',terrain.anchors.rock,'material');addLabel('沙地',terrain.anchors.sand,'material');
  state.ready=true;$('loading').hidden=true;document.querySelectorAll('.transport button,.transport input').forEach(el=>el.disabled=false);
  $('scene').addEventListener('webglcontextlost',e=>{e.preventDefault();fail(new Error('WebGL context lost'));});
  new ResizeObserver(resize).observe($('viewport'));resize();
}catch(error){fail(error);}

window.ReefStudy={seek,play,pause,setView,setTheme:theme,getPopulationSignature,getState:()=>({...state,view:state.time<9?'overview':'detail',camera:camera?.position.toArray(),lookAt:look.toArray(),render:renderer?{...renderer.info.render}:null,biota:biota?.stats,scans:scans?.stats,surroundings:surroundings?.stats,backgroundScans:backgroundScans?.stats,understory:understory?.stats,marine:marineLife?.stats,surfaces:scene?Array.from(new Set([terrain?.group,biota?.group].flatMap(g=>g?.children.map(m=>m.material)||[]).filter(Boolean))).map(m=>({kind:m.userData.surfaceKind,compiled:!!m.userData.reefSurface?.compiled})):[]}),render:draw};
