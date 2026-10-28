/* Preserve the legacy four-page/reading layout; WhaleHybrid owns iframe pause and clock snapshots. */
(() => {
  'use strict';
  const body = document.body;
  const shell = document.querySelector('#story-shell');
  const reading = document.querySelector('#full-reading');
  const player = document.querySelector('#method-player');
  const slot = document.querySelector('#story-method-slot');
  const scenes = [...document.querySelectorAll('.story-scene')];
  const links = [...document.querySelectorAll('.scene-nav [data-page]')];
  const prev = document.querySelector('#page-prev'), next = document.querySelector('#page-next');
  const mobile = matchMedia('(max-width:740px)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const note = player?.querySelector('.motion-phase-note'), staticNote = note?.textContent;
  const placeholder = document.createElement('div');
  placeholder.id = 'reading-method-placeholder';
  let mode = 'reading', index = 0, storyOptIn = false, printState = null, frame = 0;
  let readingY = 0, storyY = 0;
  function destination(hash) {
    let match = /^#page-([1-4])$/.exec(hash);
    if (match) return {index:Number(match[1])-1};
    match = /^#scene-([1-9])$/.exec(hash);
    if (match) return {index:[0,1,1,1,2,3,3,3,3][Number(match[1])-1]};
    if (['#results-tile','#evidence-tile','#limitations-tile','#sources-tile'].includes(hash)) return {index:3,tile:hash.slice(1)};
    return hash ? null : {index:0};
  }
  function markScene(value) {
    index = value;
    if (index !== 2) window.WhaleHybrid?.pause('leave-method-page');
    scenes.forEach((scene,n) => {
      scene.classList.toggle('is-active', n === index);
      scene.inert = !mobile.matches && n !== index;
      if (mobile.matches) scene.removeAttribute('aria-hidden');
      else scene.setAttribute('aria-hidden', String(n !== index));
    });
    links.forEach(link => {
      if (Number(link.dataset.page) === index+1) link.setAttribute('aria-current','step');
      else link.removeAttribute('aria-current');
    });
    prev.disabled = index === 0;
    next.disabled = index === scenes.length-1;
    document.querySelector('#scene-position').textContent = `${String(index+1).padStart(2,'0')} / ${String(scenes.length).padStart(2,'0')}`;
  }
  function layout(value) {
    mode = value;
    const parent = mode === 'story' ? slot : placeholder;
    if (player.parentElement !== parent) {
      window.WhaleHybrid?.beforeMove();
      parent.append(player);
      window.WhaleHybrid?.afterMove();
    }
    body.classList.toggle('story-mode', mode === 'story');
    reading.inert = mode === 'story';
    shell.inert = mode !== 'story';
  }
  function setMode(value, {restore = true} = {}) {
    if (printState || !['story','reading'].includes(value)) return false;
    if (value === mode) return true;
    if (mode === 'reading') readingY = scrollY; else storyY = scrollY;
    layout(value);
    if (restore) scrollTo(0, mode === 'reading' ? readingY : mobile.matches ? storyY : 0);
    return true;
  }
  function setScene(value, {focus = false, tile = null} = {}) {
    if (printState || !Number.isInteger(value) || value < 0 || value >= scenes.length) return false;
    setMode('story', {restore:false});
    markScene(value);
    const target = tile ? document.getElementById(tile) : scenes[index];
    if (mobile.matches || tile) target?.scrollIntoView({block:'start',behavior:'instant'});
    if (focus) (tile ? target : scenes[index].querySelector('h1,h2'))?.focus({preventScroll:true});
    return true;
  }
  function navigate(value, tile = null) {
    storyOptIn = true;
    if (!setScene(value, {focus:true,tile})) return;
    const hash = tile ? '#'+tile : '#page-'+(value+1);
    if (location.hash !== hash) history.pushState(history.state,'',hash);
  }
  function route() {
    if (printState) return;
    const dest = destination(location.hash);
    if (reduced.matches && !storyOptIn) { setMode('reading', {restore:false}); return; }
    if (dest) { setScene(dest.index, {tile:dest.tile}); return; }
    setMode('reading', {restore:false});
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    document.getElementById(id)?.scrollIntoView();
  }
  function capturePrint() {
    if (!printState) printState = {mode,index,y:scrollY,scrollTop:scenes[index].scrollTop,note:note?.textContent};
  }
  function beginPrint() {
    capturePrint();
    layout('reading');
    if (note) note.textContent = staticNote;
  }
  function endPrint() {
    if (!printState) return;
    const saved = printState;
    markScene(saved.index);
    layout(saved.mode);
    if (note) note.textContent = saved.note;
    printState = null;
    const restoreScroll = () => {
      if (printState || mode !== saved.mode || index !== saved.index) return;
      scenes[index].scrollTop = saved.scrollTop;
      scrollTo(0,saved.y);
    };
    restoreScroll();
    // Keep the saved page position after the player has returned to its slot.
    requestAnimationFrame(restoreScroll);
  }
  function setupStory() {
    if (!player || !shell || !slot || scenes.length !== 4) return false;
    try {
      player.before(placeholder);
      body.classList.add('narrative-ready');
      const dest = destination(location.hash);
      markScene(dest ? dest.index : 0);
      // Keep inactive page geometry under the existing CSS/inert rules.
      layout(!reduced.matches && dest ? 'story' : 'reading');
      return true;
    } catch (error) {
      if (placeholder.isConnected) placeholder.replaceWith(player);
      body.classList.remove('narrative-ready','story-mode');
      reading.inert = false;
      return false;
    }
  }
  if (!setupStory()) return;
  prev.addEventListener('click', () => navigate(index-1));
  next.addEventListener('click', () => navigate(index+1));
  links.forEach(link => link.addEventListener('click', () => navigate(Number(link.dataset.page)-1,link.dataset.tile || null)));
  document.querySelectorAll('[data-reading]').forEach(link => link.addEventListener('click', () => {
    setMode('reading', {restore:false});
    const target = document.querySelector(link.getAttribute('href'));
    if (target) { target.setAttribute('tabindex','-1'); target.focus({preventScroll:true}); }
  }));
  document.querySelector('[data-return]').addEventListener('click', event => {
    event.preventDefault();
    navigate(index);
  });
  addEventListener('popstate',route);
  addEventListener('hashchange',route);
  // Phone tracking follows section edges, never a player visibility ratio or playback gate.
  addEventListener('scroll', () => {
    if (!mobile.matches || mode !== 'story' || printState || frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      if (!mobile.matches || mode !== 'story' || printState) return;
      let active = 0;
      const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      // scrollIntoView honors BOTH root scroll-padding and the section's scroll-margin.
      scenes.forEach((scene,n) => {
        const margin = parseFloat(getComputedStyle(scene).scrollMarginTop) || 0;
        const line = Math.max(76, padding + margin) + 2;
        if (scene.getBoundingClientRect().top <= line) active = n;
      });
      if (active !== index) markScene(active);
    });
  }, {passive:true});
  // Only a WIDTH breakpoint crossing may reposition. Phone browser chrome does not.
  mobile.addEventListener('change', () => {
    if (printState) return;
    markScene(index);
    if (mode === 'story') {
      if (mobile.matches) scenes[index].scrollIntoView({block:'start',behavior:'instant'});
      else scrollTo(0,0);
    }
  });
  reduced.addEventListener('change', () => { if (reduced.matches) { storyOptIn = false; setMode('reading'); } });
  addEventListener('pageshow', () => { if (!printState) layout(mode); }, true);
  addEventListener('afterprint',endPrint,true);
  // Capture scroll before the bridge expands the printed reading content.
  addEventListener('beforeprint',capturePrint,true);
  // The bridge pauses first; relocation follows without restarting playback.
  addEventListener('DOMContentLoaded', () => addEventListener('beforeprint',beginPrint), {once:true});
  requestAnimationFrame(() => { if (mode === 'story' && location.hash) route(); });
  window.WhaleNarrative = {setMode,setScene,beginPrint,endPrint,
    getState: () => ({mode,index,pageCount:scenes.length,mobile:mobile.matches,printing:!!printState,scrollTop:scenes[index].scrollTop,playerParent:player.parentElement.id})};
})();
