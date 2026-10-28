import {DURATION, PHASES, clampTime, phaseAt, cueAt, clipName, clockText} from './model.mjs';

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const main = $('#teachingAudio');
const preview = $('#previewAudio');
const player = $('#player');
const scenes = $$('.scene');
const motion = matchMedia('(prefers-reduced-motion: reduce)');
let data;
let desiredMedia = null;
let previewClip = null;
let intent = 0;
let requestedTime = null;
let phase = -1;
let expanded = false;
let focusBeforeExpand;
let raf = 0;
let muted = false;
let sceneTimeline;
let failedClip = null;

function status(text) { $('#status').textContent = text; }
function showError(text) {
  $('#error').hidden = false;
  $('#error').querySelector('[data-error-copy]').textContent = text;
}
function clearError() { $('#error').hidden = true; }
function timelineTime() { return requestedTime ?? main.currentTime; }

function buildSpectra() {
  $$('[data-spectrum]').forEach(host => {
    const clip = data.clips[host.dataset.spectrum];
    host.innerHTML = `<div class="spectrum-y" aria-hidden="true"><span>8</span><span>4</span><span>0</span></div><div class="spectrum-plot"><img src="${clip.spectrogram}" alt="由${clipName(host.dataset.spectrum)}計算的聲譜圖，橫軸0至1.5秒，縱軸0至8千赫。"><i class="sound-cursor" aria-hidden="true"></i></div><span class="spectrum-unit">kHz</span><div class="spectrum-x" aria-hidden="true"><span>0</span><span>0.5</span><span>1.0</span><span>1.5 秒</span></div>`;
  });
  $$('[data-wave]').forEach(host => {
    const clip = data.clips[host.dataset.wave];
    const points = clip.waveform.map((value,index) => {
      const x = (index + .5) * 600 / clip.waveform.length;
      const h = Math.max(1,value * 60);
      return `<path d="M${x.toFixed(2)} ${(64-h).toFixed(2)}v${(h*2).toFixed(2)}"/>`;
    }).join('');
    host.innerHTML = `<svg viewBox="0 0 600 128" preserveAspectRatio="none" aria-hidden="true">${points}</svg><i class="sound-cursor" aria-hidden="true"></i>`;
  });
}

function buildMotion() {
  sceneTimeline?.kill();
  sceneTimeline = gsap.timeline({paused:true});
  gsap.set(scenes, {autoAlpha:0,y:0});
  gsap.set(scenes[0], {autoAlpha:1});
  for (let index=1; index<PHASES.length; index++) {
    sceneTimeline.set(scenes[index-1], {autoAlpha:0}, PHASES[index].start);
    sceneTimeline.set(scenes[index], {autoAlpha:1}, PHASES[index].start);
    sceneTimeline.fromTo(scenes[index], {y:9}, {y:0,duration:.6,ease:'power1.out',immediateRender:false}, PHASES[index].start);
  }
  const steps = $$('[data-training-step]');
  steps.forEach((step,index) => {
    sceneTimeline.fromTo(step, {opacity:.25}, {opacity:1,duration:1,ease:'power1.out',immediateRender:false},34+index*2.4);
  });
  $$('[data-result-bar]').forEach(bar => {
    const start = PHASES[Number(bar.closest('[data-scene]').dataset.scene)].start;
    sceneTimeline.fromTo(bar, {opacity:.65}, {opacity:1,duration:1.8,ease:'power2.out',immediateRender:false},start);
  });
  sceneTimeline.to({}, {duration:.01}, DURATION-.01);
}

function render() {
  const time = clampTime(timelineTime());
  const next = phaseAt(time);
  if (next !== phase) {
    phase = next;
    scenes.forEach((scene,index) => {
      scene.inert = index !== phase;
      scene.setAttribute('aria-hidden', String(index !== phase));
    });
    const current = PHASES[phase];
    $('#phaseLabel').textContent = current.label;
    $('#phaseTitle').textContent = current.title;
    $('#phaseCopy').textContent = current.copy;
    $$('[data-seek]').forEach(button => {
      const active = Number(button.dataset.seek) === current.start;
      button.classList.toggle('is-current',active);
      if(active) button.setAttribute('aria-current','step');
      else button.removeAttribute('aria-current');
    });
    player.dataset.phase = phase;
  }
  if (motion.matches) {
    gsap.set(scenes, {autoAlpha:index => index===phase ? 1 : 0,y:0});
    gsap.set('[data-training-step]',{opacity:1});
    gsap.set('[data-result-bar]',{opacity:1});
  } else sceneTimeline?.time(time, true);

  $('#seek').value = time;
  $('#seek').setAttribute('aria-valuetext',`${clockText(time)}，${PHASES[phase].label}`);
  $('#timeReadout').textContent = `${clockText(time)} / ${clockText(DURATION)}`;
  const running = !main.paused && desiredMedia===main;
  $('#playButton').textContent = running ? '暫停' : time >= DURATION ? '重新播放' : time > 0 ? '繼續播放' : '播放・開啟聲音';
  $('#playButton').setAttribute('aria-label',$('#playButton').textContent);
  $('#playButton').setAttribute('aria-pressed', String(running));
  player.classList.toggle('is-playing',running);
  const cue = previewClip ? {clip:previewClip,start:0,end:data.clips[previewClip].duration} : cueAt(time,data.cues);
  const soundTime = previewClip ? preview.currentTime : cue ? time-cue.start : null;
  const sounding = cue && !(previewClip ? preview.paused : main.paused);
  $$('[data-spectrum],[data-wave]').forEach(host => {
    const ownClip = host.dataset.spectrum || host.dataset.wave;
    const active = cue?.clip === ownClip;
    host.classList.toggle('is-active',Boolean(active));
    host.classList.toggle('is-sounding',Boolean(active && sounding));
    const cursor=host.querySelector('.sound-cursor');
    if(cursor) {
      cursor.style.left = `${Math.min(100,100*(soundTime||0)/1.5)}%`;
      cursor.style.opacity = active ? '1' : '0';
    }
  });
  $$('[data-preview]').forEach(button => {
    const active=previewClip===button.dataset.preview && !preview.paused;
    button.classList.toggle('is-listening',active);
    button.setAttribute('aria-pressed',String(active));
    button.setAttribute('aria-label',`${active?'停止':'重聽'}${clipName(button.dataset.preview)}`);
  });
  $$('[data-now-playing]').forEach(node => {
    node.textContent = sounding ? `${muted?'靜音中 · ':''}${clipName(cue.clip)}` : '';
  });
}

function tick() {
  raf = 0;
  if (!data) return;
  render();
  if (!main.paused || !preview.paused) raf = requestAnimationFrame(tick);
}
function refresh() { if(data) render(); if(!raf && (!main.paused || !preview.paused)) raf=requestAnimationFrame(tick); }
function stopPreview() { preview.pause(); previewClip=null; }
function pauseAll(message='已暫停。按繼續播放可接著看。') {
  intent++;
  desiredMedia=null;
  main.pause();
  stopPreview();
  refresh();
  if(message) status(message);
}
async function playMedia(media) {
  const token=++intent;
  desiredMedia=media;
  clearError();
  failedClip=null;
  try {
    await media.play();
    if(desiredMedia!==media) media.pause();
    if(token===intent) refresh();
  } catch(error) {
    if(token!==intent || error.name==='AbortError') return;
    failedClip=media===preview?previewClip:null;
    pauseAll();
    showError('錄音暫時無法播放。可以重新載入，或先選下方段落看解說。');
  }
}
function playMain() {
  if(!data)return;
  if(desiredMedia===main && !main.paused) {pauseAll();return;}
  stopPreview();
  if(timelineTime()>=DURATION-.01) seek(0);
  playMedia(main);
  status('動畫播放中。聲音以原速播放。');
}
function seek(value) {
  intent++;
  stopPreview();
  if(desiredMedia===preview)desiredMedia=null;
  const time=clampTime(Number(value));
  requestedTime=time;
  if(main.readyState>=1) {main.currentTime=time;requestedTime=null;}
  if(time>=DURATION) {main.pause();desiredMedia=null;}
  refresh();
  if(main.paused)status(`已停在 ${clockText(time)}。可以重聽錄音，或按繼續播放。`);
}
async function listen(clip) {
  if(!data)return;
  if(previewClip===clip && !preview.paused) {pauseAll('已停止重聽。動畫停在原處。');return;}
  pauseAll();
  previewClip=clip;
  preview.src=data.clips[clip].file;
  status(`正在重聽${clipName(clip)}。動畫已暫停。`);
  await playMedia(preview);
}

function setTheme(dark) {
  document.documentElement.dataset.theme=dark?'dark':'light';
  $('#themeButton').textContent=dark?'淺色模式':'深色模式';
  $('#themeButton').setAttribute('aria-label',$('#themeButton').textContent);
  $('#themeButton').setAttribute('aria-pressed',String(dark));
  try{localStorage.setItem('ecology-color-theme',dark?'dark':'light');}catch{}
}
function setExpanded(value) {
  if(value===expanded)return;
  expanded=value;
  if(value)focusBeforeExpand=document.activeElement;
  player.classList.toggle('is-expanded',value);
  document.body.classList.toggle('is-expanded',value);
  $('#expandButton').textContent=value?'縮回':'放大';
  $('#expandButton').setAttribute('aria-expanded',String(value));
  $('#expandButton').setAttribute('aria-label',value?'縮回動畫':'同頁放大觀看');
  $('#expandButton').setAttribute('aria-pressed',String(value));
  if(value) {player.setAttribute('role','dialog');player.setAttribute('aria-label','小鴞聲音比較動畫');player.setAttribute('aria-modal','true');$('#expandButton').focus();}
  else {player.removeAttribute('role');player.removeAttribute('aria-modal');focusBeforeExpand?.focus();}
}

$('#playButton').addEventListener('click',playMain);
$('#replayButton').addEventListener('click',()=>{pauseAll();seek(0);playMain();});
$('#seek').addEventListener('input',event=>seek(event.target.value));
$$('[data-seek]').forEach(button=>button.addEventListener('click',()=>seek(button.dataset.seek)));
$$('[data-preview]').forEach(button=>button.addEventListener('click',()=>listen(button.dataset.preview)));
$('#volume').addEventListener('input',event=>{
  const value=Number(event.target.value);
  main.volume=preview.volume=value;
  muted=value===0;
  main.muted=preview.muted=muted;
  $('#muteButton').textContent=muted?'開啟聲音':'靜音';
  $('#muteButton').setAttribute('aria-pressed',String(muted));
  $('#muteButton').setAttribute('aria-label',$('#muteButton').textContent);
  refresh();
});
$('#muteButton').addEventListener('click',()=>{
  muted=!muted;
  if(!muted && main.volume===0){main.volume=preview.volume=.8;$('#volume').value=.8;}
  main.muted=preview.muted=muted;
  $('#muteButton').textContent=muted?'開啟聲音':'靜音';
  $('#muteButton').setAttribute('aria-pressed',String(muted));
  $('#muteButton').setAttribute('aria-label',$('#muteButton').textContent);
  refresh();
});
$('#themeButton').addEventListener('click',()=>setTheme(document.documentElement.dataset.theme!=='dark'));
$('#expandButton').addEventListener('click',()=>setExpanded(!expanded));
$('#retryButton').addEventListener('click',()=>{
  if(!data) {location.reload();return;}
  if(failedClip) {listen(failedClip);return;}
  const resumeTime=timelineTime();
  pauseAll();requestedTime=resumeTime;main.load();clearError();
  status('重新載入中，保留目前進度。載入後請按繼續播放。');
});
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&expanded){event.preventDefault();setExpanded(false);}
  if(event.key==='Tab'&&expanded){
    const focusable=[...player.querySelectorAll('button,input,a,summary')].filter(node=>!node.closest('[inert]')&&!node.disabled&&node.getClientRects().length);
    const first=focusable[0],last=focusable.at(-1);
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  }
});
document.addEventListener('visibilitychange',()=>{if(document.hidden)pauseAll('已暫停。回來後可繼續播放。');});
addEventListener('pagehide',()=>pauseAll());
addEventListener('beforeprint',()=>pauseAll());
motion.addEventListener('change',()=>{buildMotion();refresh();});
main.addEventListener('loadedmetadata',()=>{
  if(requestedTime!==null){main.currentTime=requestedTime;requestedTime=null;}
  refresh();
});
[main,preview].forEach(media=>{
  ['timeupdate','seeked','pause','playing','waiting','volumechange'].forEach(event=>media.addEventListener(event,refresh));
  media.addEventListener('play',()=>{if(desiredMedia!==media)media.pause();else refresh();});
  media.addEventListener('error',()=>{
    if(media===preview&&desiredMedia!==preview)return;
    failedClip=media===preview?previewClip:null;
    pauseAll();showError('錄音沒有載入成功。可以重新載入，或先選段落看解說。');
  });
});
main.addEventListener('ended',()=>{desiredMedia=null;refresh();status('動畫結束。可以重聽聲音，或重新播放。');});
preview.addEventListener('ended',()=>{
  if(desiredMedia!==preview)return;
  desiredMedia=null;previewClip=null;refresh();status('重聽結束。按繼續播放可從原處接著看。');
});

try {
  const response=await fetch('audio-data.json');
  if(!response.ok)throw new Error('audio metadata unavailable');
  data=await response.json();
  buildSpectra();buildMotion();
  main.volume=preview.volume=Number($('#volume').value);
  let savedTheme;
  try{savedTheme=localStorage.getItem('ecology-color-theme');}catch{}
  setTheme(savedTheme==='dark');
  $('#playButton').disabled=false;
  refresh();
  status('準備好了。按播放後會聽見三段真實的小鴞叫聲。');
} catch(error) {
  $('#playButton').disabled=true;
  $('#retryButton').textContent='重新整理頁面';
  showError('錄音資料沒有載入成功，請重新整理頁面。');
}
