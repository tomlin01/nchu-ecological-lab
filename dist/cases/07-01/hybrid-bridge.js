(() => {
  'use strict';
  const frame = document.getElementById('hybrid-frame');
  const player = document.getElementById('method-player');
  if (!frame || !player) return;
  let generation = 0, pendingTime = null, detailState = null;
  let state = {time:0,duration:90,playing:false,ready:false,phase:0};
  let lastPauseReason = 'initial', frameHeight = 850;
  const transcript = document.getElementById('hybrid-transcript');
  if (transcript) transcript.open = false;
  const sources = document.getElementById('hybrid-sources');
  if (sources) sources.open = false;
  const post = (action, extra = {}) => frame.contentWindow?.postMessage({type:'ecology-control',action,...extra}, '*');
  function sample() {
    // Same-origin snapshots preserve the exact clock across iframe reparenting.
    // PostMessage state remains the fallback for local file origins.
    try {
      const current = frame.contentWindow?.caseAnimation?.getState();
      if (current && Number.isFinite(current.time) && current.time >= 0 && current.time <= 90) {
        state = {time:current.time,duration:90,playing:!!current.playing,ready:!!current.ready,phase:current.phase};
      }
    } catch (_) {}
    return {...state};
  }
  function pause(reason = 'manual') {
    lastPauseReason = reason;
    sample();
    try { frame.contentWindow?.caseAnimation?.pause(); } catch (_) {}
    state.playing = false;
    post('pause');
  }
  function beforeMove() {
    const saved = pendingTime === null ? sample().time : pendingTime;
    pause('player-moved');
    pendingTime = saved; generation += 1; state.ready = false;
  }
  function hello() { post('hello', {generation, hostHeight:window.innerHeight}); }
  addEventListener('resize', () => post('viewport', {hostHeight:window.innerHeight}));
  function afterMove() { setTimeout(hello, 0); }
  function restore(currentTime) {
    // Avoid a queued no-op seek overwriting an early user interaction.
    if (pendingTime !== null && Math.abs(currentTime - pendingTime) > .02) post('seek', {time:pendingTime});
    post('pause');
  }
  addEventListener('message', event => {
    if (event.source !== frame.contentWindow || !event.data || typeof event.data !== 'object') return;
    const data = event.data;
    if (data.type === 'ecology-size') {
      if (!Number.isFinite(data.height) || data.height < 400 || data.height > 3000) return;
      frameHeight = Math.ceil(data.height); frame.style.height = `${frameHeight}px`; frame.height = String(frameHeight);
      return;
    }
    if (data.generation !== generation || !['ecology-state','ecology-ready'].includes(data.type)) return;
    const next = data.state;
    if (!next || !Number.isFinite(next.time) || next.time < 0 || next.time > 90 || next.duration !== 90) return;
    if (data.type === 'ecology-ready') restore(next.time);
    if (pendingTime !== null) {
      if (Math.abs(next.time - pendingTime) > .02) return;
      pendingTime = null;
    }
    state = {time:next.time,duration:90,playing:!!next.playing,ready:!!next.ready,phase:next.phase};
  });
  frame.addEventListener('load', () => { post('pause'); hello(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) pause('document-hidden'); });
  addEventListener('pagehide', () => pause('page-hidden'));
  addEventListener('pageshow', () => { pause('page-shown'); hello(); });
  const observer = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) pause('frame-offscreen');
  }, {threshold:0});
  observer.observe(frame);
  addEventListener('beforeprint', () => {
    pause('before-print');
    if (detailState === null) {
      detailState = [...document.querySelectorAll('details')].map(item => [item,item.open]);
      detailState.forEach(([item]) => { item.open = true; });
    }
  });
  addEventListener('afterprint', () => {
    if (detailState !== null) { detailState.forEach(([item,open]) => { item.open = open; }); detailState = null; }
    pause('after-print');
  });
  document.querySelectorAll('[data-print]').forEach(button => {
    button.hidden = false;
    button.addEventListener('click', async () => {
      pause('print-requested');
      await Promise.all([...document.images].map(image => image.decode?.().catch(() => {})));
      window.print();
    });
  });
  document.querySelectorAll('.hybrid-links a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const details = document.querySelector(link.getAttribute('href'));
      if (!details) return;
      event.preventDefault(); pause('read-animation-notes'); details.open = true;
      details.scrollIntoView({block:'start',behavior:'instant'});
      details.querySelector('summary')?.focus({preventScroll:true});
    });
  });
  window.EcologyHybrid = {pause,beforeMove,afterMove,
    getState:() => ({...sample(),generation,pendingTime,lastPauseReason,frameHeight,parent:player.parentElement?.id})};
  hello();
})();
