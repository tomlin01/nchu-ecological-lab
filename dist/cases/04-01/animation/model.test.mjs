import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {DURATION,PHASES,stateAt,validateSource} from './model.mjs';
const source=JSON.parse(readFileSync(new URL('./assets/source-data.json',import.meta.url)));
test('source pair and ruler keep their distinct evidence roles',()=>{
 assert.equal(validateSource(source),source);
 assert.equal(source.authorOutput.width/source.specimen.width,2.475);
 assert.equal(source.authorOutput.height/source.specimen.height,2.475);
 for(const change of [d=>d.modelInferenceRun=true,d=>d.physicalLeafMeasurement=10,d=>d.ruler.authorQcValueAppliedToDisplayImage=true,d=>d.ruler.tickEnd[0]+=10]){
  const bad=structuredClone(source);change(bad);assert.throws(()=>validateSource(bad));
 }
});
test('every time is finite and seek order never changes the scene',()=>{
 for(let i=0;i<=DURATION*24;i++){
  const t=i/24,s=stateAt(t,source);assert.ok(s.camera.every(Number.isFinite));assert.ok(s.camera[2]>0&&s.camera[3]>0);
  assert.equal(s.centimetersPerReference,1);assert.equal(s.reportedLeafMeasurement,null);assert.equal(s.modelInferenceRun,false);
 }
 for(const t of [0,11.99,12,22,26,34,42,50,58,64,70,83.99,84]){const a=stateAt(t,source);stateAt(84-t,source);assert.deepEqual(stateAt(t,source),a);}
});
test('phase boundaries and reduced motion preserve complete readable states',()=>{
 PHASES.forEach((p,i)=>assert.equal(stateAt(p.start,source).phase,i));
 assert.equal(stateAt(22,source,{reducedMotion:true}).overlay,1);
 assert.equal(stateAt(42,source,{reducedMotion:true}).comparison,1);
 assert.equal(stateAt(70,source,{reducedMotion:true}).conclusionReveal,1);
 assert.equal(stateAt(-100,source).time,0);assert.equal(stateAt(1000,source).time,84);
});
