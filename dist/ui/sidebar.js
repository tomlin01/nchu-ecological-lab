/* Global topic directory. Original chapter navigation and media controllers remain the owners. */
(() => {
  'use strict';

  const ownScript = document.currentScript;
  const scriptURL = ownScript?.src;
  const explicitRoot = ownScript?.dataset.siteRoot;
  const explicitCase = ownScript?.dataset.caseId;
  const explicitHome = ownScript?.dataset.sitePage === 'home';
  const explicitTopicPage = ownScript?.dataset.sitePage === 'topic';
  const explicitTopic = ownScript?.dataset.topicId;
  if (!scriptURL || window.EcologySidebar) return;

  function initialize() {
    const map = window.EcologySiteMap;
    if (!map || !Array.isArray(map.topics) || !map.topics.length || !document.body) return;

    const body = document.body;
    const siteRoot = explicitRoot ? new URL(explicitRoot, document.baseURI) : new URL('../', scriptURL);
    if (!siteRoot.pathname.endsWith('/')) siteRoot.pathname += '/';
    const homeURL = new URL(map.homePath || 'index.html', siteRoot);
    const desktop = matchMedia('(min-width: 1101px)');
    const topics = [];
    const seen = new Set();
    const pageKey = value => {
      const url = new URL(value, siteRoot);
      return url.origin + url.pathname;
    };

    // Data is generated from the existing home directory, never inferred from case numbers.
    for (const item of map.topics) {
      if (!item || typeof item.id !== 'string' || !item.id || seen.has(item.id) ||
          typeof item.title !== 'string' || !Array.isArray(item.cases)) return;
      seen.add(item.id);
      const cases = [];
      for (const entry of item.cases) {
        if (!entry || typeof entry.id !== 'string' || typeof entry.title !== 'string' ||
            typeof entry.path !== 'string') return;
        const url = new URL(entry.path, siteRoot);
        if (!['http:', 'https:', 'file:'].includes(url.protocol) ||
            url.origin !== siteRoot.origin || !url.pathname.startsWith(siteRoot.pathname)) return;
        cases.push({id: entry.id, title: entry.title, url, current: false});
      }
      let url = null;
      if (item.path) {
        url = new URL(item.path, siteRoot);
        if (!['http:', 'https:', 'file:'].includes(url.protocol) ||
            url.origin !== siteRoot.origin || !url.pathname.startsWith(siteRoot.pathname)) return;
      }
      topics.push({id: item.id, number: String(item.number || ''), title: item.title, cases, url});
    }

    const currentURL = pageKey(location.href);
    let currentCase = null;
    let currentTopic = null;
    for (const topic of topics) {
      for (const entry of topic.cases) {
        const folderIndex = new URL('index.html', entry.url);
        entry.current = explicitCase ? entry.id === explicitCase
          : currentURL === pageKey(entry.url) || currentURL === pageKey(folderIndex);
        if (entry.current) { currentCase = entry.id; currentTopic = topic.id; }
      }
    }
    const onHome = explicitHome || (!explicitCase &&
      (currentURL === pageKey(homeURL) || currentURL === pageKey(siteRoot)));
    const topicPage = !currentCase && !onHome && topics.find(topic =>
      explicitTopicPage ? topic.id === explicitTopic : topic.url && currentURL === pageKey(topic.url));
    if (topicPage) currentTopic = topicPage.id;
    if (onHome && !currentTopic) {
      const hash = decodeHash();
      currentTopic = topics.find(topic => topic.id === hash)?.id || null;
    }

    const ui = element('div', 'ecology-sidebar-ui');
    ui.id = 'ecology-sidebar-ui';
    const toggle = element('button', 'ecology-sidebar-toggle', '主題');
    toggle.type = 'button';
    toggle.setAttribute('aria-controls', 'ecology-sidebar-panel');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', '開啟全站研究主題');
    const backdrop = element('div', 'ecology-sidebar-backdrop');
    backdrop.setAttribute('aria-hidden', 'true');
    backdrop.hidden = true;
    const panel = element('aside', 'ecology-sidebar-panel');
    panel.id = 'ecology-sidebar-panel';
    panel.tabIndex = -1;
    panel.setAttribute('aria-label', '全站研究主題與案例');
    panel.hidden = true;

    const heading = element('div', 'ecology-sidebar-heading');
    const home = element('a', 'ecology-sidebar-home', map.title || 'AI × 生態研究');
    home.href = homeURL.href;
    if (onHome && !location.hash) home.setAttribute('aria-current', 'page');
    const closeButton = element('button', 'ecology-sidebar-close', '關閉');
    closeButton.type = 'button';
    closeButton.setAttribute('aria-label', '關閉主題選單');
    heading.append(home, closeButton);
    const label = element('p', 'ecology-sidebar-label', '研究主題');
    const directory = element('nav', 'ecology-sidebar-directory');
    directory.setAttribute('aria-label', '研究主題與已完成案例');
    const topicControls = new Map();

    topics.forEach((topic, index) => {
      const section = element('section', 'ecology-sidebar-topic');
      const button = element('button', 'ecology-sidebar-topic-button');
      button.type = 'button';
      button.dataset.sidebarTarget = topic.id;
      const panelID = `ecology-sidebar-topic-${index + 1}`;
      button.setAttribute('aria-controls', panelID);
      button.setAttribute('aria-expanded', String(topic.id === currentTopic));
      if (topic.id === currentTopic) button.classList.add('is-current-topic');
      const number = element('span', 'ecology-sidebar-number', topic.number);
      number.setAttribute('aria-hidden', 'true');
      const text = element('span', 'ecology-sidebar-topic-name', topic.title);
      const indicator = element('span', 'ecology-sidebar-indicator', topic.id === currentTopic ? '−' : '+');
      indicator.setAttribute('aria-hidden', 'true');
      button.append(number, text, indicator);
      const content = element('div', 'ecology-sidebar-topic-panel');
      content.id = panelID;
      content.hidden = topic.id !== currentTopic;
      if (topic.cases.length) {
        const list = element('ul', 'ecology-sidebar-cases');
        for (const entry of topic.cases) {
          const li = element('li');
          const link = element('a', 'ecology-sidebar-case-link', entry.title);
          link.href = entry.url.href;
          link.dataset.sidebarCase = entry.id;
          if (entry.current) link.setAttribute('aria-current', 'page');
          li.append(link);
          list.append(li);
        }
        content.append(list);
      } else {
        content.append(element('p', 'ecology-sidebar-pending', '案例待製作'));
      }
      const overviewURL = topic.url ? new URL(topic.url) : new URL(homeURL);
      if (!topic.url) overviewURL.hash = topic.id;
      const overview = element('a', 'ecology-sidebar-topic-link', topic.url ? '查看主題' : '查看主題清單');
      overview.href = overviewURL.href;
      if (topicPage?.id === topic.id) overview.setAttribute('aria-current', 'page');
      content.append(overview);
      section.append(button, content);
      directory.append(section);
      topicControls.set(topic.id, {button, content, indicator});
      button.addEventListener('click', () => setTopicOpen(topic.id, content.hidden));
    });

    panel.append(heading, label, directory);
    ui.append(toggle, backdrop, panel);

    let expanded = false;
    let opener = null;
    let backgroundState = [];
    let backgroundStoryMode = false;
    let focusFrame = 0;

    function element(tag, className = '', text) {
      const node = document.createElement(tag);
      if (className) node.className = className;
      if (text !== undefined) node.textContent = text;
      return node;
    }

    function decodeHash() {
      try { return decodeURIComponent(location.hash.slice(1)); }
      catch (_) { return location.hash.slice(1); }
    }

    function setTopicOpen(id, open) {
      const controls = topicControls.get(id);
      if (!controls) return;
      controls.content.hidden = !open;
      controls.button.setAttribute('aria-expanded', String(open));
      controls.indicator.textContent = open ? '−' : '+';
    }

    function lockBackground() {
      backgroundStoryMode = body.classList.contains('story-mode');
      backgroundState = [...body.children]
        .filter(node => node !== ui && !node.matches('script,style,link'))
        .map(node => ({node, inert: node.inert}));
      for (const item of backgroundState) item.node.inert = true;
    }

    function unlockBackground() {
      const storyMode = body.classList.contains('story-mode');
      for (const item of backgroundState) {
        if (!item.node.isConnected) continue;
        if (storyMode !== backgroundStoryMode && item.node.id === 'story-shell') item.node.inert = !storyMode;
        else if (storyMode !== backgroundStoryMode && item.node.id === 'full-reading') item.node.inert = storyMode;
        else item.node.inert = item.inert;
      }
      backgroundState = [];
    }

    function open() {
      if (expanded) return false;
      // Close the media layer before snapshotting its temporarily inert background.
      window.EcologyMediaExpand?.close({restoreFocus: false});
      opener = document.activeElement;
      expanded = true;
      panel.hidden = false;
      backdrop.hidden = false;
      panel.setAttribute('role', 'dialog');
      panel.setAttribute('aria-modal', 'true');
      toggle.setAttribute('aria-expanded', 'true');
      body.classList.add('ecology-sidebar-drawer-open');
      lockBackground();
      cancelAnimationFrame(focusFrame);
      focusFrame = requestAnimationFrame(() => {
        if (!expanded) return;
        const target = [...panel.querySelectorAll('[aria-current="page"]')].find(node => !node.closest('[hidden]')) ||
          topicControls.get(currentTopic)?.button || closeButton;
        target.focus({preventScroll: true});
        target.scrollIntoView({block: 'nearest', inline: 'nearest', behavior: 'instant'});
      });
      return true;
    }

    function close({restoreFocus = true} = {}) {
      if (!expanded) return false;
      cancelAnimationFrame(focusFrame);
      expanded = false;
      unlockBackground();
      body.classList.remove('ecology-sidebar-drawer-open');
      backdrop.hidden = true;
      panel.hidden = true;
      panel.removeAttribute('role');
      panel.removeAttribute('aria-modal');
      toggle.setAttribute('aria-expanded', 'false');
      if (restoreFocus) {
        const target = opener instanceof HTMLElement && opener !== body && opener.isConnected &&
          !opener.closest('[inert],[hidden]') && opener.getClientRects().length
          ? opener : toggle;
        target.focus({preventScroll: true});
      }
      opener = null;
      return true;
    }

    function focusableItems() {
      return [...panel.querySelectorAll('a[href],button:not(:disabled),[tabindex="0"]')]
        .filter(node => !node.closest('[hidden],[inert]') && node.getClientRects().length);
    }

    toggle.addEventListener('click', () => expanded ? close() : open());
    closeButton.addEventListener('click', () => close());
    backdrop.addEventListener('click', () => close());
    panel.addEventListener('click', event => {
      if (!event.target.closest('a[href]') || event.defaultPrevented || event.button !== 0 ||
          event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      window.EcologyMediaExpand?.close({restoreFocus: false, restoreScroll: false, reason: 'navigation'});
      close({restoreFocus: false});
      // Normal links retain their URL, browser history, modifier-click and file:// behavior.
    });
    document.addEventListener('keydown', event => {
      if (!expanded) return;
      if (event.key === 'Escape') {
        event.preventDefault(); event.stopPropagation(); close(); return;
      }
      if (event.key !== 'Tab') return;
      const items = focusableItems();
      if (!items.length) { event.preventDefault(); panel.focus(); return; }
      const first = items[0], last = items[items.length - 1];
      const current = document.activeElement;
      if (event.shiftKey && (current === first || !panel.contains(current))) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && (current === last || !panel.contains(current))) {
        event.preventDefault(); first.focus();
      }
    }, true);
    addEventListener('mediaexpandchange', event => {
      if (event.detail?.expanded) close({restoreFocus: false});
    });
    addEventListener('beforeprint', () => close({restoreFocus: false}), true);
    addEventListener('pagehide', () => close({restoreFocus: false}));
    // Release the drawer before an existing route handler changes reading-mode inert states.
    for (const name of ['popstate', 'hashchange']) addEventListener(name, () => close({restoreFocus: false}), true);
    matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', () => close({restoreFocus: false}));
    function updateHomeTopic(id) {
      if (currentTopic === id) return;
      currentTopic = id;
      for (const [topicID, controls] of topicControls) {
        controls.button.classList.toggle('is-current-topic', topicID === id);
        const link = controls.content.querySelector('.ecology-sidebar-topic-link');
        if (topicID === id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      }
      if (id) setTopicOpen(id, true);
    }
    addEventListener('hashchange', () => {
      if (!onHome) return;
      const hash = decodeHash();
      const target = document.getElementById(hash);
      const id = topics.find(topic => topic.id === hash)?.id ||
        (target?.dataset.topic ? 'topic-' + target.dataset.topic.padStart(2, '0') : null);
      updateHomeTopic(id);
      if (!location.hash) home.setAttribute('aria-current', 'page');
      else home.removeAttribute('aria-current');
    });
    if (onHome) {
      const sections = [...document.querySelectorAll('[data-topic-scene], .topic-row[data-topic]')];
      let scrollFrame = 0;
      function syncHomeTopic() {
        scrollFrame = 0;
        const toolbar = parseFloat(getComputedStyle(body).paddingTop) || 0;
        const line = toolbar + Math.min(80, innerHeight * .12);
        let active = sections[0];
        for (const section of sections) {
          if (section.getBoundingClientRect().top > line) break;
          active = section;
        }
        if (active) updateHomeTopic(active.dataset.topicScene || 'topic-' + active.dataset.topic.padStart(2, '0'));
      }
      function queueHomeTopic() { if (!scrollFrame) scrollFrame = requestAnimationFrame(syncHomeTopic); }
      addEventListener('scroll', queueHomeTopic, {passive: true});
      addEventListener('resize', queueHomeTopic);
      addEventListener('pageshow', queueHomeTopic);
      queueHomeTopic();
    }

    toggle.hidden = false;
    body.append(ui);
    body.classList.add('ecology-sidebar-ready');
    if (onHome) body.classList.add('ecology-sidebar-homepage');
    if (document.querySelector('#story-shell > .story-stage')) body.classList.add('ecology-sidebar-whale');

    window.EcologySidebar = {
      open,
      close,
      getState: () => ({
        ready: true,
        desktop: desktop.matches,
        defaultCollapsed: true,
        expanded,
        drawerExpanded: expanded,
        currentCase,
        currentTopic,
        home: onHome,
        topicPage: topicPage?.id || null,
        topicCount: topics.length,
        caseCount: topics.reduce((total, topic) => total + topic.cases.length, 0),
        expandedTopics: [...topicControls].filter(([, value]) => !value.content.hidden).map(([id]) => id),
        topics: topics.map(topic => ({id: topic.id, title: topic.title, cases: topic.cases.map(entry => entry.id)})),
        siteRoot: siteRoot.href
      })
    };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, {once: true});
  else initialize();
})();
