(() => {
  'use strict';

  const video = document.getElementById('method-video');
  const replay = document.getElementById('replay');
  const retry = document.getElementById('retry-load');
  const toggle = document.getElementById('video-toggle');
  const progress = document.getElementById('video-progress');
  const listenButton = document.getElementById('listen-call');
  const soundButton = document.getElementById('sound-toggle');
  const soundNote = document.getElementById('sound-note');
  const navigation = document.getElementById('chapter-navigation');
  const title = document.getElementById('phase-title');
  const description = document.getElementById('phase-description');
  const position = document.getElementById('phase-position');
  const clock = document.getElementById('clock');
  const status = document.getElementById('player-status');
  const transcript = document.getElementById('transcript-details');
  const demoDetails = document.getElementById('demo-details');
  const reducedNote = document.getElementById('reduced-motion-note');
  const narrow = matchMedia('(max-width: 650px)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const duration = 84;
  const media = {
    wide: { src: 'media/birdnet-mechanism-wide.mp4?release=20261027-media', poster: 'media/poster-wide.jpg' },
    portrait: { src: 'media/birdnet-mechanism-portrait.mp4?release=20261027-media', poster: 'media/poster-portrait.jpg' }
  };
  const mediaUrls = new Map();
  const chapters = [...document.querySelectorAll('#transcript > li')].map((item, phaseIndex) => ({
    phaseIndex,
    start: Number(item.dataset.start),
    end: Number(item.dataset.end),
    label: item.dataset.nav || '',
    title: item.querySelector('h3').textContent,
    description: item.dataset.caption
  }));

  const navigationChapters = chapters.filter(chapter => chapter.label);
  const forestTabs = [...document.querySelectorAll('#forest-tabs [role=tab]')];
  const forestPanels = [...document.querySelectorAll('.forest-panel')];
  let forestView = 0;
  let chapterIndex = 0;

  let variant = null;
  let sourceGeneration = 0;
  let pending = null;
  let ready = false;
  let loadFailed = false;
  let failedTime = 0;
  let phase = -1;
  let animationFrame = null;
  let inView = true;
  let printState = null;
  let lastPauseReason = 'initial';

  function formatTime(seconds) {
    const whole = Math.max(0, Math.floor(Number.isFinite(seconds) ? seconds : 0));
    return `${String(Math.floor(whole / 60)).padStart(2, '0')}:${String(whole % 60).padStart(2, '0')}`;
  }

  function currentTime() {
    return Number.isFinite(video.currentTime) ? video.currentTime : 0;
  }

  function limitTime(time) {
    const end = Number.isFinite(video.duration) ? Math.min(video.duration, duration) : duration;
    return Math.max(0, Math.min(time, end));
  }

  const chapterButtons = navigationChapters.map((chapter, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.phaseIndex = String(chapter.phaseIndex);
    button.dataset.chapterIndex = String(index);
    button.setAttribute('aria-label', `${formatTime(chapter.start)}，${chapter.label}`);
    const time = document.createElement('span');
    time.className = 'chapter-time';
    time.textContent = formatTime(chapter.start);
    const label = document.createElement('span');
    label.textContent = chapter.label;
    button.append(time, label);
    button.addEventListener('click', () => seek(chapter.start));
    navigation.append(button);
    return button;
  });

  function sync() {
    // The media element is the only clock. This function never advances time.
    const time = currentTime();
    const nextPhase = chapters.reduce((index, chapter, next) => time >= chapter.start ? next : index, 0);
    clock.textContent = `${formatTime(time)} / ${formatTime(duration)}`;
    toggle.textContent = video.paused ? (video.muted ? '播放（靜音）' : '播放（含鳥聲）') : '暫停';
    progress.value = String(time);
    progress.setAttribute('aria-valuetext', `${time.toFixed(1)} 秒，共 ${duration} 秒`);
    if (nextPhase === phase) return;
    phase = nextPhase;
    const chapter = chapters[phase];
    chapterIndex = navigationChapters.reduce((index, item, next) => time >= item.start ? next : index, 0);
    title.textContent = chapter.title;
    description.textContent = chapter.description;
    position.textContent = `${String(chapterIndex + 1).padStart(2, '0')} / ${String(navigationChapters.length).padStart(2, '0')}`;
    chapterButtons.forEach((button, index) => {
      if (index === chapterIndex) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
  }

  function stopFrameUpdates() {
    if (animationFrame !== null) cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }

  function updateWhilePlaying() {
    sync();
    animationFrame = video.paused || video.ended ? null : requestAnimationFrame(updateWhilePlaying);
  }

  function pause(reason = 'manual') {
    lastPauseReason = reason;
    video.pause();
    stopFrameUpdates();
    sync();
  }

  function seek(value) {
    const time = Number(value);
    if (!Number.isFinite(time)) return false;
    pause('chapter-seek');
    if (pending) {
      pending.time = limitTime(time);
      status.textContent = '影片載入後，會停在指定段落。';
      return true;
    }
    if (loadFailed) {
      failedTime = limitTime(time);
      status.textContent = '已記下指定段落，請按「重新載入影片」。';
      return true;
    }
    if (!ready) return false;
    video.currentTime = limitTime(time);
    sync();
    status.textContent = '已停在指定位置，可按播放繼續。';
    return true;
  }

  async function play() {
    if (!ready || document.hidden || printState !== null) return false;
    let rectangle = video.getBoundingClientRect();
    if (rectangle.bottom <= 0 || rectangle.top >= innerHeight) {
      video.scrollIntoView({ block: 'center', behavior: 'instant' });
      rectangle = video.getBoundingClientRect();
    }
    inView = rectangle.bottom > 0 && rectangle.top < innerHeight;
    if (!inView) return false;
    const generation = sourceGeneration;
    try {
      await video.play();
      return true;
    } catch (error) {
      if (generation === sourceGeneration && error.name !== 'AbortError') {
        status.textContent = '暫時無法開始播放，請再按影片上的播放鍵。';
      }
      return false;
    }
  }

  function failLoad() {
    failedTime = pending ? pending.time : currentTime();
    pending?.controller?.abort();
    pending = null;
    loadFailed = true;
    ready = false;
    replay.disabled = true;
    toggle.disabled = true;
    listenButton.disabled = true;
    const source = media[variant];
    const url = mediaUrls.get(source.src);
    if (url) URL.revokeObjectURL(url);
    mediaUrls.delete(source.src);
    pause('media-error');
    retry.hidden = false;
    status.textContent = '影片暫時無法載入。可重新載入，播放位置與聲音設定會保留。';
  }

  async function switchSource(nextVariant, initial = false) {
    if (variant === nextVariant && !loadFailed) return;
    // A second resize retains the first pending position, not the new file's zero.
    const savedTime = pending ? pending.time : loadFailed ? failedTime : currentTime();
    pending?.controller?.abort();
    pause(initial ? 'initial' : 'layout-change');
    sourceGeneration += 1;
    variant = nextVariant;
    ready = false;
    loadFailed = false;
    retry.hidden = true;
    replay.disabled = true;
    toggle.disabled = true;
    listenButton.disabled = true;
    const source = media[variant];
    pending = {
      generation: sourceGeneration,
      url: new URL(source.src, location.href).href,
      time: savedTime,
      initial,
      controller: new AbortController()
    };
    const request = pending;
    video.poster = source.poster;
    document.body.dataset.media = variant;
    status.textContent = initial ? '影片載入中，也可先閱讀下方全文。' : '正在切換影片版面，播放位置會保留。';
    // Sites returns whole MP4 files without Range support; a local blob restores seeking.
    try {
      let url = mediaUrls.get(source.src);
      if (!url) {
        const response = await fetch(source.src, {signal: request.controller.signal});
        if (!response.ok) throw new Error(`Video request failed: ${response.status}`);
        const blob = await response.blob();
        if (pending !== request) return;
        url = URL.createObjectURL(blob);
        mediaUrls.set(source.src, url);
      }
      if (pending !== request) return;
      request.url = url;
      video.preload = 'metadata';
      video.src = url;
      video.load();
    } catch (error) {
      if (pending === request) failLoad();
    }
  }

  video.addEventListener('loadedmetadata', () => {
    // Late metadata from an obsolete source must not restore an obsolete seek.
    if (!pending || pending.generation !== sourceGeneration ||
        video.currentSrc !== pending.url || video.readyState < 1 ||
        !Number.isFinite(video.duration)) return;
    const request = pending;
    pending = null;
    video.pause();
    if (request.time > 0) video.currentTime = limitTime(request.time);
    ready = true;
    replay.disabled = false;
    toggle.disabled = false;
    listenButton.disabled = false;
    status.textContent = request.initial
      ? '影片已就緒，按播放開始。'
      : '已切換版面並暫停，按播放後可從原位置繼續。';
    sync();
  });

  video.addEventListener('play', () => {
    if (document.hidden || !inView || printState !== null) {
      pause('not-visible');
      return;
    }
    status.textContent = '';
    stopFrameUpdates();
    updateWhilePlaying();
  });
  video.addEventListener('pause', () => { stopFrameUpdates(); sync(); });
  video.addEventListener('ended', () => {
    stopFrameUpdates();
    sync();
    status.textContent = '影片已播完，可重播或閱讀下方全文。';
  });
  ['timeupdate', 'seeking', 'seeked', 'durationchange'].forEach(event => video.addEventListener(event, sync));
  video.addEventListener('error', () => {
    if (pending && video.currentSrc && video.currentSrc !== pending.url) return;
    if (pending || ready) failLoad();
  });

  function syncSound() {
    soundButton.textContent = video.muted ? '開啟聲音' : '關閉聲音';
    soundButton.setAttribute('aria-pressed', String(!video.muted));
    soundNote.textContent = video.muted
      ? '目前靜音。真實鳥叫從 00:32 開始，按「聽這段鳥叫」可直接試聽；沒有旁白。'
      : '播放時有聲音。真實鳥叫從 00:32 開始，也可按「聽這段鳥叫」直接試聽；沒有旁白。';
    sync();
  }

  async function listenToCall() {
    if (!ready || !seek(32)) return false;
    video.muted = false;
    syncSound();
    return play();
  }

  function selectForest(index, focus = false) {
    if (!Number.isInteger(index) || index < 0 || index >= forestPanels.length) return false;
    forestView = index;
    forestTabs.forEach((tab, current) => {
      tab.setAttribute('aria-selected', String(current === index));
      tab.tabIndex = current === index ? 0 : -1;
      forestPanels[current].hidden = current !== index;
      forestPanels[current].setAttribute('role', 'tabpanel');
      forestPanels[current].setAttribute('aria-labelledby', tab.id);
    });
    if (focus) forestTabs[index].focus();
    return true;
  }

  forestTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectForest(index));
    tab.addEventListener('keydown', event => {
      let next = index;
      if (event.key === 'ArrowRight') next = (index + 1) % forestTabs.length;
      else if (event.key === 'ArrowLeft') next = (index + forestTabs.length - 1) % forestTabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = forestTabs.length - 1;
      else return;
      event.preventDefault();
      selectForest(next, true);
    });
  });

  listenButton.addEventListener('click', () => { void listenToCall(); });
  soundButton.addEventListener('click', () => { video.muted = !video.muted; syncSound(); });
  video.addEventListener('volumechange', syncSound);
  replay.addEventListener('click', () => { if (seek(0)) void play(); });
  retry.addEventListener('click', () => { void switchSource(variant); });
  toggle.addEventListener('click', () => { if (video.paused) void play(); else pause(); });
  progress.addEventListener('input', event => seek(event.target.value));
  narrow.addEventListener('change', () => switchSource(narrow.matches ? 'portrait' : 'wide'));
  reduced.addEventListener('change', () => {
    reducedNote.hidden = !reduced.matches;
    if (reduced.matches) pause('reduced-motion');
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pause('document-hidden');
  });
  addEventListener('pagehide', () => pause('page-hidden'));
  if ('IntersectionObserver' in window) {
    const visibility = new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting;
      if (!inView) pause('video-offscreen');
    }, { threshold: 0 });
    visibility.observe(video);
  }
  addEventListener('beforeprint', () => {
    if (printState !== null) return;
    printState = { transcriptOpen: transcript.open, demoOpen: demoDetails.open };
    pause('before-print');
    transcript.open = true;
    demoDetails.open = true;
  });
  addEventListener('afterprint', () => {
    if (printState === null) return;
    transcript.open = printState.transcriptOpen;
    demoDetails.open = printState.demoOpen;
    printState = null;
    pause('after-print');
  });

  window.caseAnimation = {
    seek, play, pause, listen: listenToCall,
    getState: () => ({
      time: currentTime(), phase, chapter: chapterIndex, duration, muted: video.muted, forestView, playing: !video.paused && !video.ended,
      variant, ready, loadFailed, currentSrc: video.currentSrc,
      pendingTime: pending ? pending.time : null,
      sourceGeneration, reducedMotion: reduced.matches, inView, lastPauseReason
    })
  };
  document.querySelectorAll('.js-only').forEach(element => { element.hidden = false; });
  video.controls = false;
  video.muted = false;
  reducedNote.hidden = !reduced.matches;
  transcript.open = false;
  demoDetails.open = false;
  selectForest(0);
  syncSound();
  sync();
  switchSource(narrow.matches ? 'portrait' : 'wide', true);
})();
