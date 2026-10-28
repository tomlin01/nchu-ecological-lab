import * as THREE from './vendor/three.module.js';

const variants = [
  { key:'silver-blue', count:36, depth:.106, width:.072, side:'#91c4db', back:'#346b8b', belly:'#e1e7d6', fin:'#6f9fab' },
  { key:'yellow-banded', count:14, depth:.225, width:.064, side:'#efc633', back:'#a28627', belly:'#f9df77', fin:'#d8ae37' },
  { key:'orange-ochre', count:32, depth:.135, width:.062, side:'#db7b3f', back:'#a74a32', belly:'#efba72', fin:'#bf5a36' },
];
const noise = n => { const x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x); };

function fishGeometry(form){
  const positions=[],normals=[],colors=[];
  const base=new THREE.Color(form.side),back=new THREE.Color(form.back),belly=new THREE.Color(form.belly),fin=new THREE.Color(form.fin);
  const dark=new THREE.Color('#263c3c'),eye=new THREE.Color('#101d23');
  const color=new THREE.Color(),normal=new THREE.Vector3();
  const push=(point,n,c)=>{positions.push(...point);normals.push(...n);colors.push(c.r,c.g,c.b);};
  const triangle=(a,b,c,tint)=>{
    normal.subVectors(new THREE.Vector3(...b),new THREE.Vector3(...a)).cross(new THREE.Vector3(...c).sub(new THREE.Vector3(...a))).normalize();
    const n=normal.toArray();push(a,n,tint);push(b,n,tint);push(c,n,tint);
  };
  // Rounded nose, full shoulder and narrow tail stock distinguish the body from a cone.
  const sections=[[-.37,.17],[-.29,.38],[-.20,.72],[-.08,.95],[.06,1],[.19,.89],[.29,.64],[.36,.36],[.39,.12]];
  const radial=12;
  const ring=(i,j)=>{
    const [x,r]=sections[i],angle=j/radial*Math.PI*2;
    return [x,Math.cos(angle)*form.depth*r,Math.sin(angle)*form.width*r];
  };
  const bodyVertex=(i,j)=>{
    const point=ring(i,j),angle=j/radial*Math.PI*2,vertical=Math.cos(angle);
    color.copy(base).lerp(vertical>0?back:belly,Math.abs(vertical)**2*.8);
    if(form.key==='silver-blue')color.lerp(belly,Math.exp(-(((vertical-.05)/.2)**2))*.34);
    if(form.key==='yellow-banded'){
      const x=sections[i][0];
      if(i===2||i===4||i===6)color.lerp(dark,.9);
      if(x<-.27)color.lerp(fin,.45);
    }
    const longitudinal=(i===0?-.8:i===sections.length-1?.9:(sections[i-1][1]-sections[i+1][1])*.55);
    normal.set(longitudinal,vertical,Math.sin(angle)*form.depth/form.width).normalize();
    push(point,normal.toArray(),color);
  };
  for(let i=0;i<sections.length-1;i++)for(let j=0;j<radial;j++){
    bodyVertex(i,j);bodyVertex(i+1,j);bodyVertex(i+1,(j+1)%radial);
    bodyVertex(i,j);bodyVertex(i+1,(j+1)%radial);bodyVertex(i,(j+1)%radial);
  }
  for(let j=0;j<radial;j++){
    triangle([.397,0,0],ring(sections.length-1,j),ring(sections.length-1,(j+1)%radial),base);
    triangle([-.38,0,0],ring(0,(j+1)%radial),ring(0,j),fin);
  }
  // A broad, forked tail and low swept fins keep the silhouette readable at distance.
  const tailHeight=form.key==='yellow-banded'?.19:form.key==='silver-blue'?.16:.15;
  const outline=[[-.35,.02,0],[-.43,.07,0],[-.57,tailHeight,0],[-.61,tailHeight*.78,0],[-.55,tailHeight*.34,0],[-.49,0,0],[-.55,-tailHeight*.34,0],[-.61,-tailHeight*.78,0],[-.57,-tailHeight,0],[-.43,-.07,0],[-.35,-.02,0]];
  for(let i=0;i<outline.length;i++)triangle([-.435,0,.004],outline[i],outline[(i+1)%outline.length],fin);
  const dorsal=form.key==='yellow-banded'?.29:form.depth*1.48;
  const dorsalPoints=[[-.29,form.depth*.38,0],[-.17,dorsal*.87,0],[-.03,dorsal,0],[.13,form.depth*.98,0],[.25,form.depth*.7,0]];
  for(let i=1;i<dorsalPoints.length-1;i++)triangle(dorsalPoints[0],dorsalPoints[i],dorsalPoints[i+1],fin);
  triangle([-.25,-form.depth*.5,0],[-.09,-dorsal*.86,0],[.10,-form.depth*.95,0],fin);
  for(const side of [-1,1]){
    triangle([.09,-form.depth*.12,side*form.width*.95],[-.09,-form.depth*.58,side*form.width*1.7],[-.04,form.depth*.07,side*form.width*1.04],fin);
    const eyeRadius=form.key==='yellow-banded'?.018:.013;
    const eyeGeometry=new THREE.SphereGeometry(eyeRadius,6,4).toNonIndexed();
    const p=eyeGeometry.attributes.position,n=eyeGeometry.attributes.normal;
    for(let i=0;i<p.count;i++)push([p.getX(i)+.28,p.getY(i)+form.depth*.28,p.getZ(i)+side*form.width*.67],[n.getX(i),n.getY(i),n.getZ(i)],eye);
    eyeGeometry.dispose();
  }
  const geometry=new THREE.BufferGeometry();
  geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
  geometry.setAttribute('normal',new THREE.Float32BufferAttribute(normals,3));
  geometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));
  geometry.computeBoundingBox();geometry.computeBoundingSphere();
  return geometry;
}

function fishPlacement(form,index){
  const a=noise(index+21),b=noise(index+72),c=noise(index+153);
  if(form.key==='silver-blue')return {
    x:-11+(index%6)*.83+a*.48,z:-14.6+Math.floor(index/6)*.68+b*.72,y:4.1+c*1.25,
    length:.35+a*.19,rx:2.05,rz:.68,speed:.11,phase:.12*b,vertical:.13,
  };
  if(form.key==='yellow-banded'){
    const near=[[-5.3,-4.6,3.4,.57],[-3.9,-7.2,4.45,.64],[-4,-5.1,3.9,.58],[-2.4,-8.8,3.35,.67],
      [-.9,-6.1,4.55,.61],[.9,-9.3,3.8,.65],[1.7,-4.9,3.45,.55],[2.3,-7.4,4.2,.62]][index];
    if(near)return {x:near[0],z:near[1],y:near[2],length:near[3],
      rx:.8+a*.35,rz:.45+b*.35,speed:.108+c*.012,phase:.45+b*.35,vertical:.09};
    return {x:2.5+(index-8)*.6+a*.45,z:-13+b*3.3,y:3.6+c*1.15,length:.43+a*.15,
      rx:1.35,rz:.7,speed:.108+c*.018,phase:.5+b*.4,vertical:.1};
  }
  // These eight use low reef openings, while the other fish keep the open-water schools.
  const reefEdge=[[-.9,5.8,2.85,.40],[-1.2,7.2,2.65,.37],[.15,6.6,2.8,.44],[-.8,8,2.85,.38],
    [1.7,5,2.7,.41],[2.65,6.2,2.9,.36],[3.4,7.2,2.65,.35],[.9,8.1,2.85,.39]][index];
  if(reefEdge)return {x:reefEdge[0],z:reefEdge[1],clearance:reefEdge[2],length:reefEdge[3],
    rx:.32+a*.2,rz:.22+b*.13,speed:.12+c*.035,phase:index*1.31,vertical:.06};
  return {x:-9+(index%8)*1.93+a*.47,z:-3.2-Math.floor(index/8)*2.65-b*.95,y:3.35+c*1.2,
    length:.35+a*.14,rx:.48+a*.38,rz:.3+b*.34,speed:.17+c*.08,phase:index*1.93,vertical:.12};
}

export function createMarineLife({heightAt,waterLevel=7.5}){
  const group=new THREE.Group();group.name='marine-life';
  const timeUniform={value:0},schools=[],dummy=new THREE.Object3D();
  const stats={fish:0,forms:[],schools:3,midDistanceFish:8,reefEdgeFish:8,drawCalls:3,instancedTriangles:0,allPresentFromStart:true};
  for(const form of variants){
    const geometry=fishGeometry(form),placements=Array.from({length:form.count},(_,i)=>fishPlacement(form,i));
    geometry.setAttribute('reefFishPhase',new THREE.InstancedBufferAttribute(new Float32Array(placements.map((_,i)=>noise(i+47)*Math.PI*2)),1));
    const material=new THREE.MeshStandardMaterial({vertexColors:true,roughness:.57,metalness:.035,side:THREE.DoubleSide});
    material.userData.skipSurface=true;
    material.customProgramCacheKey=()=>`reef-fish-swim-v1:${form.key}`;
    material.onBeforeCompile=shader=>{
      shader.uniforms.reefFishTime=timeUniform;
      shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nuniform float reefFishTime;\nattribute float reefFishPhase;');
      shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>',`#include <begin_vertex>
        float reefTailWeight=1.-smoothstep(-.58,.12,transformed.x);
        transformed.z+=sin(reefFishTime*8.2+reefFishPhase+transformed.x*5.)*.092*reefTailWeight*reefTailWeight;`);
      material.userData.compiled=true;
    };
    const mesh=new THREE.InstancedMesh(geometry,material,form.count);
    mesh.name=`fish-${form.key}`;mesh.castShadow=false;mesh.receiveShadow=false;mesh.frustumCulled=false;mesh.userData.skipAO=true;
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    group.add(mesh);schools.push({mesh,placements,form});
    const triangles=geometry.attributes.position.count/3;
    stats.fish+=form.count;stats.instancedTriangles+=triangles*form.count;
    stats.forms.push({form:form.key,fish:form.count,trianglesPerFish:triangles});
  }
  function update(t){
    timeUniform.value=t;
    for(const {mesh,placements,form} of schools){
      for(let i=0;i<placements.length;i++){
        const p=placements[i],angle=t*p.speed+p.phase;
        const x=p.x+p.rx*Math.sin(angle),z=p.z+p.rz*Math.cos(angle);
        const dx=p.rx*p.speed*Math.cos(angle),dz=-p.rz*p.speed*Math.sin(angle);
        const extent=p.length*(form.depth+.075),bed=heightAt(x,z);
        const floor=p.clearance?bed+.6+extent:Math.max(3.2,bed+.6+extent),ceiling=waterLevel-.4-extent;
        const baseY=p.clearance?bed+p.clearance:p.y;
        const y=Math.min(ceiling,Math.max(floor,baseY+Math.sin(t*.73+p.phase)*p.vertical));
        dummy.position.set(x,y,z);dummy.rotation.set(0,-Math.atan2(dz,dx),Math.cos(t*.73+p.phase)*.028);
        dummy.scale.setScalar(p.length);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate=true;
    }
  }
  update(0);
  return {group,update,stats};
}
