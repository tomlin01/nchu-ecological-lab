(() => {
  'use strict';
  const root = document.documentElement;
  const pages = [...document.querySelectorAll('.chapter')];
  const navLinks = [...document.querySelectorAll('[data-page]')];
  const labels = ['研究問題', '模型分工', '方法示意', '成果與限制'];
  const mobile = matchMedia('(max-width: 740px)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fullButton = document.getElementById('full-reading');
  const previousButton = document.getElementById('previous-page');
  const nextButton = document.getElementById('next-page');
  const position = document.getElementById('page-position');
  const video = document.getElementById('method-video');
  const FILM_DURATION = 65.55;
  video.defaultMuted = false;
  video.muted = false;
  const playButton = document.getElementById('play-toggle');
  const replayButton = document.getElementById('replay');
  const status = document.getElementById('video-status');
  const clock = document.getElementById('video-clock');
  const seekButtons = [...document.querySelectorAll('.chapter-seek')];
  let continuous = reduced.matches;
  let current = 0;
  let printState = null;
  let pendingSeek = null;

  function hashId() {
    try { return decodeURIComponent(location.hash.slice(1)); }
    catch (_) { return location.hash.slice(1); }
  }

  function pageForHash() {
    const target = document.getElementById(hashId());
    const page = target?.closest('.chapter');
    return page ? pages.indexOf(page) : 0;
  }

  function isPaged() { return !continuous && !mobile.matches; }

  function pauseVideo(message) {
    if (!video.paused) {
      video.pause();
      if (message) status.textContent = message;
    }
  }

  function updateNavigation() {
    pages.forEach((page, index) => { page.dataset.active = String(index === current); });
    navLinks.forEach((link, index) => {
      if (index === current) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    previousButton.disabled = current === 0;
    nextButton.disabled = current === pages.length - 1;
    position.textContent = `${current + 1} / ${pages.length} · ${labels[current]}`;
  }

  function revealTarget() {
    const target = document.getElementById(hashId());
    if (!target) return;
    const details = target.closest('details');
    if (details) details.open = true;
    if (target.matches('details')) target.open = true;
    if (target !== pages[current] || !isPaged()) {
      target.scrollIntoView({ block: 'start', behavior: 'instant' });
    }
  }

  function showPage(index, { focus = false, reset = false, anchor = false } = {}) {
    current = Math.max(0, Math.min(index, pages.length - 1));
    if (current !== 2) pauseVideo('已離開動畫頁，影片保持暫停。');
    updateNavigation();
    if (reset && isPaged()) pages[current].scrollTop = 0;
    if (focus) pages[current].focus({ preventScroll: true });
    if (anchor) requestAnimationFrame(revealTarget);
  }

  function navigate(id) {
    const target = document.getElementById(id);
    const page = target?.closest('.chapter');
    if (!page) return;
    if (location.hash !== `#${id}`) history.pushState(null, '', `#${id}`);
    showPage(pages.indexOf(page), { focus: true, reset: true, anchor: true });
  }

  function setMode() {
    pauseVideo('閱讀模式已切換，影片保持暫停。');
    root.classList.toggle('paged', isPaged());
    fullButton.setAttribute('aria-pressed', String(continuous));
    fullButton.textContent = continuous ? '返回四頁' : '完整閱讀';
    updateNavigation();
  }

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const id = link.getAttribute('href').slice(1);
    if (!document.getElementById(id)?.closest('.chapter')) return;
    event.preventDefault();
    navigate(id);
  });
  previousButton.addEventListener('click', () => navigate(pages[current - 1]?.id));
  nextButton.addEventListener('click', () => navigate(pages[current + 1]?.id));
  fullButton.addEventListener('click', () => {
    continuous = !continuous;
    setMode();
    requestAnimationFrame(() => {
      if (!isPaged()) pages[current].scrollIntoView({ block: 'start', behavior: 'instant' });
      pages[current].focus({ preventScroll: true });
    });
  });
  document.getElementById('print-page').addEventListener('click', () => window.print());
  addEventListener('popstate', () => showPage(pageForHash(), { anchor: true }));
  addEventListener('hashchange', () => showPage(pageForHash(), { anchor: true }));
  mobile.addEventListener('change', () => { setMode(); requestAnimationFrame(revealTarget); });
  reduced.addEventListener('change', event => {
    if (event.matches) { continuous = true; setMode(); }
  });
  document.addEventListener('keydown', event => {
    if (!isPaged() || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.target.closest('a,button,input,select,textarea,video,summary,[contenteditable]')) return;
    const offset = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    const next = current + offset;
    if (offset && next >= 0 && next < pages.length) {
      event.preventDefault(); navigate(pages[next].id);
    }
  });

  function secondsLabel(value) {
    const seconds = Math.max(0, Math.floor(value));
    return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  }

  function updateVideo() {
    playButton.textContent = video.paused ? '播放動畫' : '暫停動畫';
    replayButton.disabled = video.readyState < 1;
    const duration = Number.isFinite(video.duration) ? video.duration : FILM_DURATION;
    clock.textContent = `${secondsLabel(video.currentTime)} / ${secondsLabel(duration)}`;
    const active = seekButtons.findLastIndex(button => Number(button.dataset.time) <= video.currentTime + .03);
    seekButtons.forEach((button, index) => {
      if (index === active) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
  }

  async function playVideo() {
    try {
      await video.play();
      status.textContent = '正在播放。可用影片控制列調整進度或開啟全螢幕。';
    } catch (_) {
      status.textContent = '尚未開始播放，請使用影片上的播放鍵，或直接開啟影片。';
    }
  }

  function boundedTime(value) {
    const time = Number(value);
    if (!Number.isFinite(time)) return null;
    const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : FILM_DURATION;
    return Math.max(0, Math.min(time, duration));
  }

  function seek(time) {
    const target = boundedTime(time);
    if (target === null) return false;
    pauseVideo();
    if (video.readyState >= 1) {
      video.currentTime = target;
      pendingSeek = null;
    } else {
      pendingSeek = target;
      video.load();
    }
    updateVideo();
  }

  playButton.addEventListener('click', () => {
    if (video.paused) playVideo();
    else { video.pause(); status.textContent = '已暫停。按播放繼續。'; }
  });
  replayButton.addEventListener('click', () => { seek(0); playVideo(); });
  seekButtons.forEach(button => button.addEventListener('click', () => {
    seek(Number(button.dataset.time));
    status.textContent = `已跳至「${button.textContent.trim().replace(/^\d{2}:\d{2}\s*/, '')}」並暫停。按播放觀看。`;
    if (mobile.matches || !isPaged()) {
      video.scrollIntoView({ block: 'start', behavior: 'instant' });
      playButton.focus({ preventScroll: true });
    }
  }));
  video.addEventListener('loadedmetadata', () => {
    if (pendingSeek !== null) {
      // Metadata must not pause a play request made explicitly while loading.
      video.currentTime = boundedTime(pendingSeek);
      pendingSeek = null;
    }
    updateVideo();
  });
  ['timeupdate', 'pause', 'play', 'durationchange'].forEach(name => video.addEventListener(name, updateVideo));
  video.addEventListener('ended', () => { status.textContent = '播放結束。可重播，或閱讀下方如何選擇鯨群與前往位置的說明。'; });
  const reportError = () => {
    document.getElementById('video-error').hidden = false;
    status.textContent = '影片載入失敗，直接連結與文字版仍可使用。';
  };
  video.addEventListener('error', reportError);
  video.querySelector('source').addEventListener('error', reportError);
  addEventListener('pagehide', () => pauseVideo('已離開頁面，影片保持暫停。'));
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pauseVideo('視窗已切到背景，影片保持暫停。');
  });

  // In continuous reading, leaving the film should never leave invisible motion running.
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) pauseVideo('影片已離開可見範圍，保持暫停。');
    }, { threshold: 0.05 }).observe(video);
  }
  let scrollScheduled = false;
  addEventListener('scroll', () => {
    if (isPaged() || printState || scrollScheduled) return;
    scrollScheduled = true;
    requestAnimationFrame(() => {
      scrollScheduled = false;
      let index = 0;
      pages.forEach((page, i) => { if (page.getBoundingClientRect().top < innerHeight * .42) index = i; });
      if (current !== index) { current = index; updateNavigation(); }
    });
  }, { passive: true });

  addEventListener('beforeprint', () => {
    if (printState) return;
    pauseVideo('列印後影片保持暫停。');
    const transcript = document.getElementById('method-text');
    printState = { current, continuous, x: scrollX, y: scrollY, scrolls: pages.map(page => page.scrollTop), transcriptOpen: transcript.open };
    transcript.open = true;
  });
  addEventListener('afterprint', () => {
    if (!printState) return;
    const saved = printState;
    printState = null;
    current = saved.current;
    continuous = saved.continuous;
    document.getElementById('method-text').open = saved.transcriptOpen;
    setMode();
    requestAnimationFrame(() => {
      pages.forEach((page, index) => { page.scrollTop = saved.scrolls[index]; });
      scrollTo(saved.x, saved.y);
      pauseVideo();
    });
  });

  root.classList.add('has-js');
  document.querySelectorAll('.js-only').forEach(element => { element.hidden = false; });
  current = pageForHash();
  setMode();
  showPage(current, { anchor: true });
  updateVideo();
})();
