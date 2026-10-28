/* Presentation and keyboard bridge only. The accepted player owns its clock and media. */
(() => {
  'use strict';
  if (window.parent === window) return;

  const TYPE = 'ecology-media-expand';
  const root = document.documentElement;
  const knownCases = new Set(['01-01', '01-03', '01-04', '02-01', '02-02', '02-03', '02-04', '04-02', '07-01']);
  const focusSelector = 'a[href],button,input:not([type="hidden"]),select,textarea,summary,[tabindex],[contenteditable]:not([contenteditable="false"]),video[controls],audio[controls]';
  let expanded = false;
  let caseId = '';
  let hostHeight = 0;

  function identifyCase() {
    const declared = document.body?.dataset.caseId;
    const fromPath = location.pathname.match(/(?:^|\/)(\d{2}-\d{2})(?:\/|$)/)?.[1];
    caseId = knownCases.has(declared) ? declared : knownCases.has(fromPath) ? fromPath : '';
    if (caseId) root.dataset.mediaCaseId = caseId;
  }

  function send(action) {
    parent.postMessage({type: TYPE, action}, '*');
  }

  function sizeStage() {
    if (!expanded) return;
    const height = hostHeight || window.innerHeight;
    const minimum = caseId === '01-03' ? 520 : 320;
    const stageHeight = Math.max(minimum, Math.min(900, Math.round(height * 0.70)));
    root.style.setProperty('--media-expanded-stage-height', `${stageHeight}px`);
  }

  function setExpanded(value, height) {
    expanded = value;
    if (Number.isFinite(height) && height >= 200 && height <= 5000) hostHeight = height;
    identifyCase();
    root.classList.toggle('media-expanded-view', expanded);
    if (expanded) sizeStage();
    else root.style.removeProperty('--media-expanded-stage-height');
  }

  function localDialogOpen() {
    return !!document.querySelector('dialog[open]');
  }

  function focusableElements() {
    return [...document.querySelectorAll(focusSelector)]
      .filter(element => {
        if (element.tabIndex < 0 || element.matches(':disabled') || element.getAttribute('aria-disabled') === 'true') return false;
        if (element.closest('[hidden],[inert]') || !element.getClientRects().length) return false;
        const style = getComputedStyle(element);
        return style.visibility !== 'hidden' && style.visibility !== 'collapse' && style.display !== 'none';
      })
      .map((element, order) => ({element, order, priority: element.tabIndex > 0 ? element.tabIndex : Infinity}))
      .sort((a, b) => a.priority - b.priority || a.order - b.order)
      .map(item => item.element);
  }

  function focusBoundary(last) {
    if (!expanded || localDialogOpen()) return;
    const controls = focusableElements();
    const target = last ? controls.at(-1) : controls[0];
    if (target) target.focus();
    else send('focus-start');
  }

  addEventListener('message', event => {
    if (event.source !== parent || !event.data || typeof event.data !== 'object' || event.data.type !== TYPE) return;
    const data = event.data;
    if (data.action === 'focus-first') { focusBoundary(false); return; }
    if (data.action === 'focus-last') { focusBoundary(true); return; }
    if (typeof data.expanded !== 'boolean') return;
    setExpanded(data.expanded, data.hostHeight);
  });

  document.addEventListener('keydown', event => {
    if (!expanded || event.defaultPrevented || event.isComposing || localDialogOpen()) return;
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      send('close');
      return;
    }
    if (event.key !== 'Tab') return;
    const controls = focusableElements();
    const active = document.activeElement;
    const boundary = event.shiftKey ? controls[0] : controls.at(-1);
    if (!controls.length) {
      event.preventDefault();
      send('focus-start');
    } else if (active === boundary) {
      event.preventDefault();
      send('focus-close');
    }
  });

  function ready() {
    identifyCase();
    sizeStage();
    send('ready');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready, {once: true});
  else ready();
})();
