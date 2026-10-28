import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {DURATION,PHASES,stateAt,validateDetection} from './model.mjs';

const data=JSON.parse(readFileSync(new URL('./assets/detection-data.json',import.meta.url),'utf8'));
validateDetection(data);
assert.equal(DURATION,84);
assert.deepEqual(PHASES.map(phase=>phase.start),[0,12,26,40,54,68]);
for(let index=0;index<PHASES.length;index++)assert.equal(stateAt(PHASES[index].start,data).phase,index);
assert.equal(stateAt(84,data).phase,5);
assert.equal(stateAt(-1,data).time,0);
assert.equal(stateAt(100,data).time,84);
for(const t of [0,16,31,46,60,76,83.9]){
  const first=stateAt(t,data);stateAt(83,data);stateAt(0,data);assert.deepEqual(stateAt(t,data),first,'seek must be history independent');
  assert.equal(first.modelInferenceRun,false);assert.equal(first.continuousTrajectory,false);
  assert.deepEqual(first.sourceClassifications,{sunShade:null,markingColor:null,individualId:null,confidence:null});
  assert(first.observations.every(row=>row.time===null&&row.individual===null&&row.enclosure===null));
}
assert.deepEqual(stateAt(31,data).sourceRect,[1726,503,127,231]);
assert.equal(data.selected.cropIncludesCompleteAnimal,false);
assert.deepEqual(stateAt(60,data).paper,{confidenceThresholdPercent:95,retainedPredictionPercentApprox:85,retainedClassificationAccuracyPercent:96.52});
const shifted=structuredClone(data);shifted.selected.displayRectXYWH[0]++;assert.throws(()=>validateDetection(shifted));
const outside=structuredClone(data);outside.annotation.objects[0].displayRectXYWH[2]=4000;assert.throws(()=>validateDetection(outside));
const invented=structuredClone(data);invented.selected.sunShade='sun';assert.throws(()=>validateDetection(invented));
const falselyComplete=structuredClone(data);falselyComplete.selected.cropIncludesCompleteAnimal=true;assert.throws(()=>validateDetection(falselyComplete));
assert.equal(stateAt(12,data,{reducedMotion:true}).sunOpacity,1);
assert.equal(stateAt(26,data,{reducedMotion:true}).cropOpacity,1);
console.log('PASS: six phase boundaries; reversible state; original XML geometry; unknown classifications/keys; distinct fixed paper metrics; reduced-motion static details.');
