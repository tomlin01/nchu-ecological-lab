import * as THREE from './vendor/three.module.js';
import { GLTFLoader } from './vendor/addons/loaders/GLTFLoader.js';
import { applyCoralPigment, CORAL_PIGMENT_PALETTE } from './coral-pigment.mjs';

const files=['pocillopora-81450.glb','pocillopora-44359.glb','diploria-labyrinthiformis.glb','pavona-cactus-74851.glb'];
const modelScale=[1,1,.72,.9];
function pigmentFor(color,modelIndex,seed){
  if(modelIndex!==2)return new THREE.Color(color);
  return new THREE.Color(CORAL_PIGMENT_PALETTE[[0,1,4][seed%3]].color).lerp(new THREE.Color('#b5a27c'),.28);
}

export async function loadCoralScans(){
  const loader=new GLTFLoader();
  const results=await Promise.all(files.map(name=>loader.loadAsync('./assets/scans/'+name)));
  return results.map((gltf,index)=>{
    // Runtime texture sizing keeps the original scan files intact and caps GPU memory.
    const resized=new Set();
    gltf.scene.traverse(object=>{
      if(!object.isMesh)return;
      for(const key of ['map','normalMap','aoMap']){
        const texture=object.material[key],source=texture?.image;
        if(!source||resized.has(texture)||Math.max(source.width,source.height)<=2048)continue;
        const ratio=2048/Math.max(source.width,source.height),canvas=document.createElement('canvas');
        canvas.width=Math.round(source.width*ratio);canvas.height=Math.round(source.height*ratio);
        canvas.getContext('2d').drawImage(source,0,0,canvas.width,canvas.height);texture.image=canvas;texture.needsUpdate=true;resized.add(texture);
      }
    });
    const root=new THREE.Group();root.add(gltf.scene);
    root.updateMatrixWorld(true);
    const box=new THREE.Box3().setFromObject(root),size=box.getSize(new THREE.Vector3()),center=box.getCenter(new THREE.Vector3());
    gltf.scene.position.x-=center.x;gltf.scene.position.z-=center.z;gltf.scene.position.y-=box.min.y;
    root.updateMatrixWorld(true);
    return{root,width:Math.max(size.x,size.z),file:files[index]};
  });
}

export function placeCoralScans(templates,slots){
  const group=new THREE.Group();group.name='Reference specimen morphology';
  let triangles=0;
  slots.forEach((slot,i)=>{
    const choice=[0,1,2,3,0,1,3,0,1,3,2,0][i%12];
    const template=templates[choice];
    const root=template.root.clone(true);
    const diameter=slot.diameter*modelScale[choice];
    root.scale.setScalar(diameter/template.width);
    root.rotation.y=slot.rotationY;
    root.position.fromArray(slot.position);root.position.y-=diameter*(choice===2?.30:.08);
    root.traverse(mesh=>{
      if(!mesh.isMesh)return;
      const material=mesh.material.clone();
      material.metalness=0;material.roughness=.91;
      material.aoMapIntensity=choice===2?.2:.3;material.normalScale.setScalar(choice===2?.4:.6);
      material.userData.isScan=true;material.userData.scanSource=template.file;
      applyCoralPigment(material,{color:pigmentFor(CORAL_PIGMENT_PALETTE[(i*3+2)%CORAL_PIGMENT_PALETTE.length].color,choice,i)});
      mesh.material=material;mesh.castShadow=true;mesh.receiveShadow=true;
      triangles+=mesh.geometry.index?mesh.geometry.index.count/3:mesh.geometry.attributes.position.count/3;
    });
    group.add(root);
  });
  return{group,stats:{instances:slots.length,sourceModels:files.length,triangles,sourceFiles:files}};
}

// The whole reef exists from startup. Fixed background geometry reduces work, not population.
export async function createCoralField(templates,slots){
  const indexArrays=await Promise.all(files.map(async name=>{
    const url='./assets/scans/'+name.replace('.glb','-lod-index.bin');
    const response=await fetch(url);if(!response.ok)throw new Error('Background index could not load: '+url);
    const bytes=await response.arrayBuffer();if(bytes.byteLength%12)throw new Error('Invalid background triangle index');
    return new Uint32Array(bytes);
  }));
  const group=new THREE.Group();group.name='Continuous reef field present at startup';
  let triangles=0;
  templates.forEach((template,modelIndex)=>{
    template.root.updateMatrixWorld(true);
    let source;template.root.traverse(object=>{if(object.isMesh)source=object;});
    const indices=indexArrays[modelIndex];
    for(const index of indices)if(index>=source.geometry.attributes.position.count)throw new Error('Background index outside source vertices');
    const geometry=source.geometry.clone();geometry.setIndex(new THREE.BufferAttribute(indices,1));
    geometry.applyMatrix4(source.matrixWorld);geometry.scale(1/template.width,1/template.width,1/template.width);
    const selected=slots.filter((slot,i)=>(slot.modelIndex??i%2)===modelIndex);
    const material=source.material.clone();material.color.set('#ffffff');material.metalness=0;material.roughness=.94;
    material.aoMapIntensity=modelIndex===2?.2:.3;material.normalScale.setScalar(modelIndex===2?.4:.6);material.userData.isScan=true;material.userData.scanSource=template.file;
    applyCoralPigment(material,{color:null});
    const mesh=new THREE.InstancedMesh(geometry,material,selected.length);
    mesh.name='Fixed lower-detail coral field '+template.file;mesh.castShadow=true;mesh.receiveShadow=true;
    const transform=new THREE.Object3D(), tint=new THREE.Color();
    selected.forEach((slot,i)=>{
      const diameter=slot.diameter*modelScale[modelIndex];
      transform.position.fromArray(slot.position);transform.position.y-=diameter*(modelIndex===2?.30:.08);
      transform.rotation.set(0,slot.rotationY,0);transform.scale.setScalar(diameter);transform.updateMatrix();mesh.setMatrixAt(i,transform.matrix);
      tint.copy(pigmentFor(slot.color,modelIndex,i));mesh.setColorAt(i,tint);
    });
    mesh.computeBoundingBox();mesh.computeBoundingSphere();group.add(mesh);triangles+=indices.length/3*selected.length;
  });
  return{group,stats:{instances:slots.length,sourceModels:files.length,triangles,drawCalls:group.children.length,fixedAtStartup:true,sourceFiles:files}};
}
