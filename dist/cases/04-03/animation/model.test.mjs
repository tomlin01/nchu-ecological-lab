import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {DURATION,PHASES,validateSource,stateAt} from './model.mjs';
const source=JSON.parse(readFileSync(new URL('assets/source-data.json',import.meta.url)));
test('the source distinguishes teaching coordinates from measured lengths',()=>{
 assert.equal(validateSource(source),source);
 assert.throws(()=>validateSource({...source,reportedFishLength:300}));
 assert.throws(()=>validateSource({...source,modelInferenceRun:true}));
 assert.throws(()=>validateSource({...source,study:{...source.study,maeMm:99}}));
 assert.equal(source.study.matN+source.study.boardN,source.study.n);
});
test('the complete film can seek in either direction without inventing a measurement',()=>{
 const times=Array.from({length:DURATION*24+1},(_,i)=>i/24),expected=times.map(t=>stateAt(t,source));
 for(let i=times.length-1;i>=0;i--){const s=stateAt(times[i],source);assert.deepEqual(s,expected[i]);assert.equal(s.reportedFishLength,null);assert.equal(s.modelInferenceRun,false);assert(s.camera.every(Number.isFinite));assert(s.camera[0]>=0&&s.camera[1]>=0&&s.camera[0]+s.camera[2]<=800.001&&s.camera[1]+s.camera[3]<=450.001);}
});
test('reduced motion keeps every explanatory layer available and phase boundaries are exact',()=>{
 for(let i=0;i<PHASES.length;i++)assert.equal(stateAt(PHASES[i].start,source).phase,i);
 assert.equal(stateAt(20,source,{reducedMotion:true}).mappingProgress,1);
 assert.equal(stateAt(35,source,{reducedMotion:true}).guideMode,'both');
 assert.equal(stateAt(88,source,{reducedMotion:true}).conclusionProgress,1);
 assert.equal(stateAt(-1).time,0);assert.equal(stateAt(100).time,88);assert.equal(stateAt(NaN).time,0);
});
