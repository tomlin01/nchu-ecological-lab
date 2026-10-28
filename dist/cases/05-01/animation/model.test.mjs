import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {DURATION,PHASES,stateAt,validateSource} from './model.mjs';
const source=JSON.parse(readFileSync(new URL('./assets/source-data.json',import.meta.url)));
test('the seven segments cover every exported frame and can be visited in reverse',()=>{
 assert.equal(PHASES[0].start,0);assert.equal(PHASES.at(-1).end,DURATION);
 PHASES.slice(1).forEach((p,i)=>assert.equal(p.start,PHASES[i].end));
 const states=Array.from({length:2401},(_,i)=>stateAt(i/24,source));
 states.forEach((s,i)=>{assert.equal(s.time,i/24);assert.equal(s.modelInferenceRun,false);assert.equal(s.perTreeHeight,null);assert.ok(s.phase>=0&&s.phase<7);});
 states.toReversed().forEach(s=>assert.deepEqual(stateAt(s.time,source),s));
 assert.equal(stateAt(32).learningStep,1);assert.equal(stateAt(63).compareMode,'lang');assert.equal(stateAt(68).compareMode,'potapov');
 assert.equal(stateAt(-1).time,0);assert.equal(stateAt(101).time,100);
});
test('reduced motion keeps the evidence and all three validation rows',()=>{
 assert.equal(stateAt(12,source,{reducedMotion:true}).heightReveal,1);
 assert.equal(stateAt(56,source,{reducedMotion:true}).wipe,1);
 assert.equal(stateAt(74,source,{reducedMotion:true}).resultRows,3);
 assert.equal(stateAt(68,source,{reducedMotion:true}).compareMode,'potapov');
});
test('source boundaries reject a changed metric, value or out-of-image crop',()=>{
 assert.equal(validateSource(source),source);
 for(const mutate of [d=>{d.results.rows[0].mae=27;},d=>{d.modelInferenceRun=true;},d=>{d.windows.photo[0]=2600;},d=>{d.globalProduct.gridMetres=10;}]){
  const changed=structuredClone(source);mutate(changed);assert.throws(()=>validateSource(changed));
 }
 for(const key of ['photo','model','lang','potapov'])assert.deepEqual(source.windows[key].slice(2),[449,448]);
 const hash=createHash('sha256').update(readFileSync(new URL('./assets/figure7.png',import.meta.url))).digest('hex');
 assert.equal(hash,source.image.sha256);
});
