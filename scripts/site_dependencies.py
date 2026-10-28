"""Offline site dependency checks adapted from the existing release verifier.
No network I/O. Case 01-02 stays static-only, including its dependencies.
"""
import hashlib
from html.parser import HTMLParser
import json
from pathlib import Path, PurePosixPath
import posixpath
import re
from urllib.parse import unquote, urljoin, urlsplit

STATIC_LIMITS = [
    'Offline literal dependency checks; no browser execution or external-source crawl.',
    'Vendor imports exclude documentation examples and computed loader URLs.',
    'Computed JS/JSON paths are not exhaustively inferred; preserve the frozen file inventory.',
    '01-02 is static-only and must remain excluded from runtime validation.',
]

REQUIRED_FILES = (
    'index.html', 'home.css', 'home.js', 'home-topic-02.css', 'home-topic-02.js',
    'topics/02/index.html', 'ui/site-map.js', 'ui/sidebar.js',
    'ui/media-expand.js', 'ui/media-expand.css', 'ui/media-embed.js',
    'ui/media-embed.css', 'ui/theme.js', 'ui/theme-tokens.css',
    'ui/theme-controls.css',
)


MEDIA = {'.mp4', '.webm', '.mp3', '.wav', '.ogg', '.m4a'}


ASSET = MEDIA | {'.js', '.mjs', '.css', '.json', '.png', '.jpg', '.jpeg',
                  '.webp', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.vtt'}


EXACT_RUNTIME_ASSETS = {
    'cases/01-03/animation/app.bundle.js': (
        'assets/sources/auv-figure-9.webp', 'assets/sources/figure-7.png'),
    'cases/01-03/animation/embed.js': (
        'assets/sources/auv-figure-9.webp', 'assets/sources/figure-7.png'),
    'cases/02-04/animation/app.bundle.js': tuple(
        f'assets/D20200701T002011_IFCB104_{n}.png'
        for n in ('00120', '00216', '00298', '00732')),
    'cases/04-02/animation/embed.js': ('assets/figure-2.png', 'assets/figure-3.png'),
    'cases/07-01/animation-hybrid/embed.js': (
        'assets/figure-1.jpeg', 'assets/figure-2.jpeg'),
}


LITERAL = re.compile(r'''(["'`])([^"'`\s<>]+)\1''')


def digest(body):
    return hashlib.sha256(body).hexdigest()


def decoded(value):
    for _ in range(8):
        newer = unquote(value)
        if newer == value:
            break
        value = newer
    return value.replace('\\', '/')


def excluded_url(value):
    # Apply before normalization too: /01-02/../alias must never be requested.
    return bool(re.search(r'(?<![\w-])01-02(?![\w-])', decoded(value)))


def safe_url(value):
    parts = urlsplit(value)
    host = parts.hostname or ''
    if parts.port:
        host += ':' + str(parts.port)
    return {'origin': parts.scheme.lower() + '://' + host.lower(),
            'path': parts.path or '/'}


class Page(HTMLParser):
    def __init__(self, body):
        super().__init__(convert_charrefs=True)
        self.refs, self.scripts, self.styles, self.text = [], [], [], []
        self.base, self.mode, self.in_head = None, None, False
        self.password, self.form = False, False
        self.feed(body.decode('utf-8', errors='replace'))

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'head':
            self.in_head = True
        if tag == 'base' and a.get('href'):
            self.base = a['href']
        if tag in ('script', 'style'):
            self.mode = tag
        if tag == 'form':
            self.form = True
        if tag == 'input' and a.get('type', '').lower() == 'password':
            self.password = True
        for name in ('src', 'poster', 'data-src', 'data-poster', 'data-theme-light', 'data-theme-dark', 'xlink:href'):
            if a.get(name):
                self.refs.append((a[name], 'dependency'))
        if tag == 'object' and a.get('data'):
            self.refs.append((a['data'], 'dependency'))
        if tag in ('a', 'link', 'image', 'use') and a.get('href'):
            self.refs.append((a['href'], 'link' if tag == 'a' else 'dependency'))
        for name in ('srcset', 'imagesrcset'):
            if a.get(name) and not a[name].lstrip().startswith('data:'):
                self.refs.extend((v.strip().split()[0], 'dependency')
                                 for v in a[name].split(',') if v.strip())
        if a.get('style'):
            self.styles.append(a['style'])
        if tag == 'meta' and a.get('http-equiv', '').lower() == 'refresh':
            match = re.search(r'url\s*=\s*[\'\"]?(.+?)[\'\"]?$', a.get('content', ''), re.I)
            if match:
                self.refs.append((match[1], 'redirect'))

    handle_startendtag = handle_starttag

    def handle_endtag(self, tag):
        if tag in ('script', 'style'):
            self.mode = None
        if tag == 'head':
            self.in_head = False

    def handle_data(self, value):
        if self.mode == 'script':
            self.scripts.append(value)
        elif self.mode == 'style':
            self.styles.append(value)
        elif not self.in_head:
            self.text.append(value)

    def visible(self):
        return ' '.join(' '.join(self.text).split())


def css_refs(text):
    text = re.sub(r'/\*.*?\*/', '', text, flags=re.S)
    for match in re.finditer(r'''url\(\s*["']?([^\s)'"]+)["']?\s*\)|@import\s+["']([^"']+)["']''', text, re.I):
        yield match[1] or match[2]


def js_refs(text):
    # No evaluation. Bare metadata filenames and provenance paths are not URLs.
    for match in LITERAL.finditer(text):
        value = match[2]
        if '${' in value:
            continue
        context = text[max(0, match.start() - 100):match.start()]
        importing = bool(re.search(r'(?:\bfrom\s*|\bimport\s*\(?\s*)$', context))
        call = bool(re.search(r'(?:fetch|(?:new\s+)?(?:URL|Audio|Worker))\s*\(\s*$', context))
        assignment = bool(re.search(r'(?:\.src|\.poster|\.href)\s*=\s*$', context))
        redirect = bool(re.search(r'location(?:\.href)?\s*=\s*$|location\.(?:replace|assign)\(\s*$', context))
        path_literal = value.startswith(('assets/', 'media/', './', '../', '/'))
        if re.search(r'new\s+URL\s*\(\s*$', context) and not PurePosixPath(urlsplit(value).path).suffix:
            continue  # A directory URL constructor is not a file request.
        if (importing or call or assignment or redirect
                or (path_literal and PurePosixPath(urlsplit(value).path).suffix.lower() in ASSET)):
            if value.startswith(('../sources/', 'sources/', 'work/', 'inference/')) and not call:
                continue
            yield value, 'import' if importing else 'redirect' if redirect else 'dependency'


def vendor_refs(text):
    """Vendor module imports only; examples and computed loader URLs are not requests."""
    text = re.sub(r'/\*.*?\*/', '', text, flags=re.S)
    for match in re.finditer(r"(?:^|\n)\s*(?:import|export)\s+(?:[^;]*?\sfrom\s*)?['\"]([^'\"]+)['\"]", text):
        yield match[1], 'import'


def snapshot(path):
    return (PurePosixPath(path).suffix.lower() == '.html'
            and any(p in ('assets', 'sources', 'licenses', 'vendor') for p in PurePosixPath(path).parts))


def build_plan(root, origin, base_path="/nchu-ecological-lab/"):
    """Read local files only. Missing required files are retained as errors."""
    root = Path(root).resolve()
    if not re.fullmatch(r'/[A-Za-z0-9_-]+/', base_path):
        raise ValueError('base_path must be a project path with leading/trailing slash')
    site_base = origin + base_path
    plan = {'cases': [], 'http_case_ids': [], 'static_case_ids': ['01-02'],
            'files': {}, 'entry_pages': [], 'errors': [], 'excluded_references': [],
            'skipped_references': [], 'static_redirects': [], 'limits': STATIC_LIMITS,
            'exact_runtime_assets': EXACT_RUNTIME_ASSETS}
    pending, seen = [], set()

    def add(ref, base='index.html', kind='dependency', static=False):
        if not ref or ref.startswith(('#', 'data:', 'blob:', 'javascript:', 'mailto:', 'tel:')):
            return
        url = urljoin(site_base + base, ref)
        parts = urlsplit(url)
        if safe_url(url)['origin'] != origin:
            plan['skipped_references'].append({'from': base, **safe_url(url), 'reason': 'external'})
            return
        normalized = posixpath.normpath(decoded(parts.path))
        if not normalized.startswith(base_path) and normalized != base_path.rstrip('/'):
            plan['errors'].append({'path': ref, 'from': base, 'reason': 'same-origin URL escapes project subpath'})
            return
        path = normalized[len(base_path):] if normalized.startswith(base_path) else ''
        if not path or path == '.':
            path = 'index.html'
        elif parts.path.endswith('/'):
            path += '/index.html'
        if excluded_url(ref) or excluded_url(url):
            static = True
            plan['excluded_references'].append({'from': base, 'path': path, 'reason': '01-02 static only'})
        if snapshot(path):
            plan['skipped_references'].append({'from': base, 'path': path, 'reason': 'source/license snapshot'})
            return
        suffix = PurePosixPath(path).suffix.lower()
        if kind == 'link' and suffix not in ASSET | {'.html'}:
            return
        if kind == 'redirect':
            plan['static_redirects'].append({'from': base, 'target': path, 'http_excluded': static})
        # Query variants map to the same static file and are never saved.
        context = base if suffix in ('.js', '.mjs') and kind != 'import' else path
        pending.append((path, context, static))

    for name in REQUIRED_FILES:
        add(name)
    try:
        source = (root / 'ui/site-map.js').read_text(encoding='utf-8')
        match = re.fullmatch(r'\s*window\.EcologySiteMap\s*=\s*(\{.*\})\s*;?\s*', source, re.S)
        if not match:
            raise ValueError('site map must be a JSON object assignment')
        site_map = json.loads(match[1])
        cases = [c for topic in site_map['topics'] for c in topic.get('cases', [])]
        if not cases:
            raise ValueError('site map has no cases')
        ids = set()
        for case in cases:
            cid, path = case['id'], case['path']
            if (not re.fullmatch(r'\d{2}-\d{2}', cid) or cid in ids
                    or path != f'cases/{cid}/{cid}.html'):
                raise ValueError('invalid or duplicate site-map case')
            ids.add(cid)
            plan['cases'].append({'id': cid, 'path': path, 'http': cid != '01-02'})
            if cid != '01-02':
                plan['http_case_ids'].append(cid)
            add(path, static=cid == '01-02')
            add(f'cases/{cid}/index.html', static=cid == '01-02')
            for page in sorted((root / 'cases' / cid).rglob('*.html')):
                if not snapshot(page.relative_to(root).as_posix()):
                    add(page.relative_to(root).as_posix(), static=cid == '01-02')
        for topic in site_map['topics']:
            if topic.get('path'):
                add(topic['path'])
    except (OSError, ValueError, KeyError, TypeError):
        plan['errors'].append({'path': 'ui/site-map.js', 'reason': 'missing or invalid site map'})
    for page in sorted((root / 'topics').rglob('*.html')):
        add(page.relative_to(root).as_posix())

    while pending:
        path, context, static = pending.pop()
        key = (path, context, static)
        if key in seen:
            continue
        seen.add(key)
        local = root / path
        if not local.resolve().is_relative_to(root):
            plan['errors'].append({'path': path, 'reason': 'path escapes root'})
            continue
        try:
            body = local.read_bytes()
        except OSError:
            plan['errors'].append({'path': path, 'reason': 'required file missing or unreadable'})
            continue
        previous = plan['files'].get(path)
        plan['files'][path] = {'bytes': len(body), 'sha256': digest(body),
                               'http': (not static) or bool(previous and previous['http'])}
        suffix = local.suffix.lower()
        if suffix == '.html':
            page = Page(body)
            base = path
            if page.base:
                resolved = urljoin(site_base + path, page.base)
                if safe_url(resolved)['origin'] != origin or excluded_url(resolved):
                    plan['errors'].append({'path': path, 'reason': 'unsupported external/excluded HTML base'})
                    continue
                resolved_path = urlsplit(resolved).path
                if not resolved_path.startswith(base_path):
                    plan['errors'].append({'path': path, 'reason': 'HTML base escapes project subpath'})
                    continue
                base = resolved_path[len(base_path):]
            for ref, kind in page.refs:
                add(ref, base, kind, static)
            for script in page.scripts:
                for ref, kind in js_refs(script):
                    add(ref, base, kind, static)
            for style in page.styles:
                for ref in css_refs(style):
                    add(ref, base, static=static)
        elif suffix == '.css':
            for ref in css_refs(body.decode('utf-8', errors='replace')):
                add(ref, path, static=static)
        elif suffix in ('.js', '.mjs'):
            for ref, kind in (vendor_refs if '/vendor/' in path else js_refs)(body.decode('utf-8', errors='replace')):
                add(ref, path if kind == 'import' else context, kind, static)
            for ref in EXACT_RUNTIME_ASSETS.get(path, ()):
                add(ref, context, static=static)
    plan['files'] = dict(sorted(plan['files'].items()))
    plan['entry_pages'] = [p for p, meta in plan['files'].items() if p.endswith('.html') and meta['http']]
    plan['passed'] = not plan['errors']
    return plan
