/* Expand the existing player in place. Its document, source and clock stay owned by the player. */
(() => {
  'use strict';
  const STAGE = '[data-media-expand-stage]';
  const TRIGGER = '[data-media-expand]';
  const TYPE = 'ecology-media-expand';
  const NAVIGATION = '.nav-pages a,.scene-nav [data-page],[data-reading],[data-print],button#full-reading,#print-page,#page-prev,#page-next,#previous-page,#next-page,[data-media-expand-exit]';
  const FOCUSABLE = 'a[href],button,input:not([type="hidden"]),select,textarea,summary,iframe,video[controls],audio[controls],[tabindex],[contenteditable="true"]';
  const configs = new Map();
  let active = null;
  let lastReason = 'initial';
  let serial = 0;

  function visible(node) {
    return !!node?.isConnected && !node.closest('[hidden],[inert],[aria-hidden="true"]') && node.getClientRects().length > 0 && getComputedStyle(node).visibility !== 'hidden';
  }
  function focus(node) {
    if (visible(node)) node.focus({preventScroll:true});
  }
  function viewport() {
    return {hostHeight:Math.round(window.visualViewport?.height || window.innerHeight),hostWidth:Math.round(window.visualViewport?.width || window.innerWidth)};
  }
  function send(config, message) {
    if (config?.media.tagName === 'IFRAME') config.media.contentWindow?.postMessage({type:TYPE,...message}, '*');
  }
  function report(config = active?.config, expanded = !!active) {
    if (config) send(config,{expanded,mode:expanded ? active?.mode || null : null,...viewport()});
  }
  function announce(expanded, config, mode, reason) {
    window.dispatchEvent(new CustomEvent('mediaexpandchange',{detail:{expanded,stageId:config.stage.id,mediaId:config.media.id || null,mode,reason}}));
  }
  function getState() {
    const config = active?.config;
    return {expanded:!!active,mode:active?.mode || null,stageId:config?.stage.id || null,mediaId:config?.media.id || null,mediaType:config?.media.tagName.toLowerCase() || null,mediaSource:config?.media.getAttribute('src') || null,mediaConnected:config ? config.media.isConnected && config.media.parentElement === config.stage : null,nativePopoverAvailable:typeof HTMLElement.prototype.showPopover === 'function',fallbackReason:active?.fallbackReason || null,lastReason};
  }
  function attributes(node, names) {
    return names.map(name=>[name,node.getAttribute(name)]);
  }
  function restoreAttributes(node, values) {
    values.forEach(([name,value])=>value === null ? node.removeAttribute(name) : node.setAttribute(name,value));
  }
  function ancestors(stage) {
    const path = [];
    for (let node=stage.parentElement;node;node=node.parentElement) path.push(node);
    return path;
  }
  function context(path) {
    return path.map(node=>[node,node.getAttribute('hidden'),node.getAttribute('inert'),node.getAttribute('aria-hidden'),node.getAttribute('data-active'),node.getAttribute('class')]);
  }
  function sameContext(state) {
    const now = ancestors(state.config.stage);
    return now.length === state.path.length && now.every((node,index)=>node === state.path[index]) && state.context.every(([node,...saved])=>[node.getAttribute('hidden'),node.getAttribute('inert'),node.getAttribute('aria-hidden'),node.getAttribute('data-active'),node.getAttribute('class')].every((value,index)=>value === saved[index]));
  }
  function isolate(stage) {
    const changed = [];
    for (let node=stage;node.parentElement;node=node.parentElement) {
      for (const sibling of node.parentElement.children) {
        if (sibling === node || sibling.hasAttribute('inert')) continue;
        changed.push([sibling,sibling.getAttribute('inert')]);
        sibling.setAttribute('inert','');
      }
    }
    return changed;
  }
  function restoreInert(changed) {
    for (const [node,value] of changed) {
      // Existing inactive chapters were never changed. Do not undo a controller's removal.
      if (node.getAttribute('inert') !== '') continue;
      if (value === null) node.removeAttribute('inert');
      else node.setAttribute('inert',value);
    }
  }
  function tabbables(stage) {
    return [...stage.querySelectorAll(FOCUSABLE)].filter(node=>!node.classList.contains('media-expand-guard') && !node.disabled && node.tabIndex >= 0 && visible(node));
  }
  function mediaFocus(last = false) {
    if (!active) return;
    const {config} = active;
    if (config.media.tagName === 'IFRAME') {
      focus(config.media);
      send(config,{action:last?'focus-last':'focus-first'});
    } else {
      const nodes = tabbables(config.stage).filter(node=>node !== config.close);
      focus((last ? nodes.at(-1) : nodes[0]) || config.close);
    }
  }
  function configure(stage) {
    if (configs.has(stage)) return configs.get(stage);
    const media = stage.querySelector(':scope > iframe,:scope > video');
    const shell = stage.closest('.media-expand-shell');
    if (!media || !shell) return null;
    if (!stage.id) stage.id = `media-expand-stage-${++serial}`;
    stage.classList.add('media-expand-stage');
    const toolbar = document.createElement('div');
    toolbar.className = 'media-expand-toolbar'; toolbar.hidden = true;
    const title = document.createElement('p');
    title.className = 'media-expand-title'; title.textContent = '放大觀看';
    const closeButton = document.createElement('button');
    closeButton.type = 'button'; closeButton.className = 'media-expand-close';
    closeButton.textContent = '關閉'; closeButton.setAttribute('aria-label','關閉放大觀看');
    toolbar.append(title,closeButton);
    const guard = () => {
      const node = document.createElement('span');
      node.className = 'media-expand-guard'; node.tabIndex = 0;
      node.setAttribute('aria-hidden','true'); node.hidden = true; return node;
    };
    const start = guard(), end = guard();
    stage.prepend(start,toolbar); stage.append(end);
    const placeholder = document.createElement('div');
    placeholder.className = 'media-expand-placeholder'; placeholder.hidden = true;
    placeholder.setAttribute('aria-hidden','true'); shell.insertBefore(placeholder,stage);
    const config = {stage,media,shell,toolbar,close:closeButton,start,end,placeholder};
    configs.set(stage,config);
    closeButton.addEventListener('click',()=>close());
    closeButton.addEventListener('keydown',event=>{
      if (active?.config !== config || event.key !== 'Tab' || media.tagName !== 'IFRAME') return;
      event.preventDefault(); mediaFocus(event.shiftKey);
    });
    start.addEventListener('focus',()=>{if(active?.config === config)mediaFocus(true);});
    end.addEventListener('focus',()=>{if(active?.config === config)focus(closeButton);});
    stage.addEventListener('toggle',event=>{
      if (active?.config === config && active.mode === 'popover' && event.newState === 'closed') close({reason:'popover-hidden'});
    });
    media.addEventListener('load',()=>report(config,active?.config === config));
    return config;
  }
  function resolve(target) {
    if (typeof target === 'string') target = document.getElementById(target.replace(/^#/,''));
    if (target?.matches?.(STAGE)) return configure(target);
    if (target?.matches?.(TRIGGER)) {
      const id = target.getAttribute('data-media-expand') || target.getAttribute('aria-controls');
      if (id) {
        const stage = document.getElementById(id.replace(/^#/,''));
        if (stage?.matches(STAGE)) return configure(stage);
      }
      const nearby = target.closest('.media-expand-shell')?.querySelector(STAGE);
      if (nearby) return configure(nearby);
    }
    const stages = [...document.querySelectorAll(STAGE)];
    const stage = stages.length === 1 ? stages[0] : stages.find(node=>node.getClientRects().length);
    return stage ? configure(stage) : null;
  }
  function updateBounds() {
    if (!active) return;
    const {stage,toolbar} = active.config;
    const {hostHeight,hostWidth} = viewport();
    const gap = hostWidth <= 640 || (hostHeight <= 500 && hostWidth > hostHeight) ? 0 : 16;
    const height = active.mode === 'inline' ? Math.max(180,hostHeight-Math.max(0,stage.getBoundingClientRect().top)-12) : hostHeight-gap*2;
    stage.style.setProperty('--media-expand-height',`${Math.max(180,height)}px`);
    stage.style.setProperty('--media-expand-toolbar-height',`${Math.ceil(toolbar.getBoundingClientRect().height)}px`);
    report();
  }
  function open(target) {
    window.EcologySidebar?.close({restoreFocus:false});
    const trigger = target?.matches?.(TRIGGER) ? target : null;
    const config = resolve(target);
    if (!config || !config.stage.isConnected) return false;
    if (active?.config === config) { focus(config.close); return true; }
    if (active) close({restoreFocus:false,restoreScroll:false,reason:'switch-player'});
    const mode = typeof config.stage.showPopover === 'function' ? 'popover' : 'inline';
    // The sidebar must release its inert state before this component records its own.
    announce(true,config,mode,'open');
    if (!visible(config.stage)) { announce(false,config,null,'inactive-stage'); return false; }
    const path = ancestors(config.stage), rect = config.stage.getBoundingClientRect();
    const returnFocus = trigger || (document.activeElement !== document.body ? document.activeElement : [...document.querySelectorAll(TRIGGER)].find(button=>button.getAttribute('aria-controls') === config.stage.id));
    active = {config,mode,path,context:context(path),trigger:returnFocus,
      originalAttributes:attributes(config.stage,['role','aria-modal','aria-label','aria-labelledby','tabindex','popover']),
      scrolls:path.map(node=>[node,node.scrollLeft,node.scrollTop]),windowScroll:[scrollX,scrollY],
      changedInert:[],observer:null,fallbackReason:null,
      savedHeight:config.stage.style.getPropertyValue('--media-expand-height'),
      savedToolbarHeight:config.stage.style.getPropertyValue('--media-expand-toolbar-height')};
    config.stage.setAttribute('role','dialog');config.stage.setAttribute('aria-modal','true');
    config.stage.removeAttribute('aria-labelledby');
    config.stage.setAttribute('aria-label',config.stage.dataset.mediaExpandLabel || config.media.getAttribute('title') || config.media.getAttribute('aria-label') || '放大觀看播放器');
    config.stage.setAttribute('tabindex','-1');
    config.stage.classList.add('is-media-expanded');
    config.toolbar.hidden = config.start.hidden = config.end.hidden = false;
    if (mode === 'popover') {
      config.placeholder.style.height = `${rect.height}px`; config.placeholder.hidden = false;
      config.stage.setAttribute('popover','manual');
      try { config.stage.showPopover(); }
      catch (error) {
        config.stage.removeAttribute('popover'); config.placeholder.hidden = true;
        active.mode = 'inline'; active.fallbackReason = error.name || 'showPopover-failed';
      }
    }
    if (active.mode === 'inline') {
      config.stage.classList.add('is-media-expanded-inline');
      config.stage.scrollIntoView({block:'start',behavior:'instant'});
    }
    active.changedInert = isolate(config.stage);
    active.context = context(path);
    active.observer = new MutationObserver(()=>{
      if (active && (!active.config.stage.isConnected || !sameContext(active))) close({reason:'page-or-reading-change',restoreFocus:false,restoreScroll:false});
    });
    for (const node of path) active.observer.observe(node,{attributes:true,attributeFilter:['class','hidden','inert','aria-hidden','data-active']});
    active.observer.observe(document.body,{subtree:true,childList:true});
    document.querySelectorAll(TRIGGER).forEach(button=>button.setAttribute('aria-expanded',String(resolve(button) === config)));
    lastReason = 'open'; updateBounds(); focus(config.close);
    if (active.mode !== mode) announce(true,config,active.mode,'fallback');
    return true;
  }
  function close(options = {}) {
    if (!active) return false;
    if (typeof options === 'string') options = {reason:options};
    const state = active, {config} = state;
    active = null; state.observer?.disconnect();
    if (state.mode === 'popover') {
      try { config.stage.hidePopover(); } catch (_) { /* Already closed by the browser or page lifecycle. */ }
    }
    // Removing the attribute immediately keeps the original inline player visible.
    config.stage.removeAttribute('popover');
    config.stage.classList.remove('is-media-expanded','is-media-expanded-inline');
    config.toolbar.hidden = config.start.hidden = config.end.hidden = true;
    config.placeholder.hidden = true;
    restoreAttributes(config.stage,state.originalAttributes.filter(([name])=>name !== 'popover'));
    for (const [name,value] of [['--media-expand-height',state.savedHeight],['--media-expand-toolbar-height',state.savedToolbarHeight]]) {
      if (value) config.stage.style.setProperty(name,value); else config.stage.style.removeProperty(name);
    }
    restoreInert(state.changedInert);
    document.querySelectorAll(TRIGGER).forEach(button=>button.setAttribute('aria-expanded','false'));
    report(config,false);
    if (options.restoreScroll !== false) {
      state.scrolls.forEach(([node,x,y])=>{if(node.isConnected){node.scrollLeft=x;node.scrollTop=y;}});
      window.scrollTo({left:state.windowScroll[0],top:state.windowScroll[1],behavior:'instant'});
    }
    if (options.restoreFocus !== false) focus(state.trigger);
    lastReason = options.reason || 'close'; announce(false,config,null,lastReason);
    return true;
  }
  window.EcologyMediaExpand = {open,close,getState};
  function initialize() {
    document.querySelectorAll(STAGE).forEach(configure);
    document.querySelectorAll(TRIGGER).forEach(button=>{
      const config = resolve(button); if (!config) return;
      button.setAttribute('aria-controls',config.stage.id);
      button.setAttribute('aria-haspopup','dialog'); button.setAttribute('aria-expanded','false');
      button.hidden = false;
    });
  }
  document.addEventListener('click',event=>{
    const trigger = event.target.closest?.(TRIGGER);
    if (trigger && !event.defaultPrevented) { event.preventDefault(); open(trigger); return; }
    if (active && event.target.closest?.(NAVIGATION)) close({reason:'navigation',restoreFocus:false,restoreScroll:false});
  },true);
  document.addEventListener('keydown',event=>{
    if (!active || event.defaultPrevented) return;
    if (event.key === 'Escape') { event.preventDefault();event.stopPropagation();close({reason:'escape'}); }
  },true);
  document.addEventListener('focusin',event=>{
    if (active && !active.config.stage.contains(event.target)) focus(active.config.close);
  },true);
  let outsidePointer = false;
  const outside = event => {
    if (!active || active.mode !== 'popover') return false;
    const r = active.config.stage.getBoundingClientRect();
    return event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom;
  };
  document.addEventListener('pointerdown',event=>{outsidePointer=outside(event);},true);
  document.addEventListener('pointerup',event=>{if(outsidePointer && outside(event))close({reason:'backdrop'});outsidePointer=false;},true);
  document.addEventListener('wheel',event=>{if(outside(event))event.preventDefault();},{capture:true,passive:false});
  window.addEventListener('message',event=>{
    const config = active?.config;
    if (!config || config.media.tagName !== 'IFRAME' || event.source !== config.media.contentWindow) return;
    const data = event.data;
    if (!data || typeof data !== 'object' || data.type !== TYPE) return;
    if (data.action === 'close') close({reason:'child-escape'});
    else if (data.action === 'focus-close' || data.action === 'focus-start') focus(config.close);
    else if (data.action === 'ready') report();
  });
  for (const name of ['hashchange','popstate','pagehide','beforeprint']) window.addEventListener(name,()=>close({reason:name,restoreFocus:false,restoreScroll:false}),true);
  window.addEventListener('resize',updateBounds);
  window.visualViewport?.addEventListener('resize',updateBounds);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',initialize,{once:true});
  else initialize();
})();
