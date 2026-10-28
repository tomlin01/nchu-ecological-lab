import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {DURATION,PHASES,phaseAt,cueAt,clampTime} from './model.mjs';
const data=JSON.parse(readFileSync(new URL('./audio-data.json',import.meta.url)));
assert.equal(DURATION,data.duration);
for(let i=1;i<PHASES.length;i++) {
  assert.equal(phaseAt(PHASES[i].start-.001),i-1);
  assert.equal(phaseAt(PHASES[i].start),i);
}
for(const cue of data.cues) {
  assert.equal(cueAt(cue.start,data.cues),cue);
  assert.equal(cueAt(cue.end-.0001,data.cues),cue);
  assert.equal(cueAt(cue.end,data.cues),null);
  assert.ok(Math.abs(cue.end-cue.start-data.clips[cue.clip].duration)<1/44100);
}
assert.equal(cueAt(40,data.cues),null);
assert.equal(phaseAt(71.999),5);
assert.equal(phaseAt(72),6);
assert.equal(phaseAt(84),7);
assert.equal(phaseAt(96),7);
assert.equal(phaseAt(-1),0);
assert.equal(clampTime(NaN),0);
assert.equal(clampTime(100),96);
assert.equal(data.clips.a.sourceId,data.clips.q.sourceId);
assert.notEqual(data.clips.a.sourceId,data.clips.b.sourceId);
console.log('PASS: phase/reveal boundaries, cue sample boundaries, original-label pairing');
