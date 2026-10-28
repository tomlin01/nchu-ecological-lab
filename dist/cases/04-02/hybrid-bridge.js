(() => {
  'use strict';
  const frame = document.getElementById('hybrid-frame');
  const player = document.getElementById('method-player');
  if (!frame || !player) return;
  let generation = 0, pendingTime = null, detailState = null;
  let state = {time:0,duration:88,playing:false,ready:false,phase:0};
  let lastPauseReason = 'initial', frameHeight = 850;
  const transcript = document.getElementById('hybrid-transcript');
  if (transcript) transcript.open = false;
  const post = (action, extra = {}) => frame.contentWindow?.postMessage({type:'ecology-control',action,...extra}, '*');
  function sample() {
    // Same-origin snapshots preserve the exact clock across iframe reparenting.
    // PostMessage state remains the fallback for local file origins.
    try {
      const current = frame.contentWindow?.caseAnimation?.getState();
      if (current && Number.isFinite(current.time) && current.time >= 0 && current.time <= 88) {
        state = {time:current.time,duration:88,playing:!!current.playing,ready:!!current.ready,phase:current.phase};
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
  function restore() {
    if (pendingTime !== null) post('seek', {time:pendingTime});
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
    if (!next || !Number.isFinite(next.time) || next.time < 0 || next.time > 88 || next.duration !== 88) return;
    if (data.type === 'ecology-ready') restore();
    if (pendingTime !== null) {
      if (Math.abs(next.time - pendingTime) > .02) return;
      pendingTime = null;
    }
    state = {time:next.time,duration:88,playing:!!next.playing,ready:!!next.ready,phase:next.phase};
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
  const printButton = document.querySelector('[data-print]');
  if (printButton) {
    printButton.hidden = false;
    printButton.addEventListener('click', async () => {
      pause('print-requested');
      const urls = new Set([...document.querySelectorAll('img,svg image')].map(image => image.getAttribute('src') || image.getAttribute('href')).filter(Boolean));
      await Promise.all([...urls].map(src => { const image = new Image(); image.src = src; return image.decode ? image.decode().catch(() => {}) : Promise.resolve(); }));
      window.print();
    });
  }
  const dialog = document.getElementById('image-dialog');
  let opener = null;
  if (dialog && typeof dialog.showModal === 'function') {
    document.querySelectorAll('[data-zoom]').forEach(button => {
      button.hidden = false;
      button.addEventListener('click', () => {
        const original = button.closest('.research-original')?.querySelector('img');
        if (!original) return;
        pause('research-image-open');
        dialog.querySelector('.dialog-content').replaceChildren(original.cloneNode(true));
        opener = button; dialog.showModal();
      });
    });
    dialog.querySelector('[data-close-image]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => opener?.focus());
  }
  window.WhaleHybrid = {pause,beforeMove,afterMove,
    getState:() => ({...sample(),generation,pendingTime,lastPauseReason,frameHeight,parent:player.parentElement?.id})};
  hello();
})();
