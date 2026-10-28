"""Verify the prepared Pages artifact offline. Missing files produce exit code 1."""
import argparse
import hashlib
import json
from pathlib import Path

from site_dependencies import build_plan

BASE_PATH = '/nchu-ecological-lab/'


def verify(root, base_path=BASE_PATH):
    root = Path(root).resolve()
    plan = build_plan(root, 'https://tomlin01.github.io', base_path)
    errors = list(plan['errors'])
    files = {}
    for path in sorted(root.rglob('*')):
        if not path.is_file() and not path.is_symlink():
            continue
        rel = path.relative_to(root).as_posix()
        if path.is_symlink():
            errors.append({'path': rel, 'reason': 'Pages artifact must not contain symlinks'})
            continue
        size = path.stat().st_size
        files[rel] = {'bytes': size, 'sha256': hashlib.sha256(path.read_bytes()).hexdigest()}
        if size > 100 * 1024 * 1024:
            errors.append({'path': rel, 'reason': 'exceeds regular Git file size limit'})
        if any(part.startswith('.') for part in path.relative_to(root).parts):
            errors.append({'path': rel, 'reason': 'hidden website files require explicit artifact handling'})
    total = sum(meta['bytes'] for meta in files.values())
    if total >= 1_000_000_000:
        errors.append({'path': '.', 'reason': 'reaches GitHub Pages 1 GB published-site limit'})
    if '404.html' not in files:
        errors.append({'path': '404.html', 'reason': 'required not-found page missing'})
    try:
        manifest = json.loads((root / 'manifest.json').read_text())['files']
        actual = {rel: meta for rel, meta in files.items() if rel != 'manifest.json'}
        for rel in sorted(set(actual) | set(manifest)):
            if manifest.get(rel) != actual.get(rel):
                errors.append({'path': rel, 'reason': 'root manifest inventory/hash mismatch'})
    except (OSError, ValueError, KeyError, TypeError):
        errors.append({'path': 'manifest.json', 'reason': 'root manifest missing or invalid'})
    return {'passed': not errors, 'base_path': base_path, 'network_requests': 0,
            'website_files': len(files), 'website_bytes': total,
            'case_count': len(plan['cases']), 'dependency_files': len(plan['files']),
            'runtime_excluded_case_ids': ['01-02'], 'errors': errors,
            'limits': plan['limits'], 'files': files, 'dependency_plan': plan}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=Path(__file__).resolve().parents[1] / 'dist')
    parser.add_argument('--base-path', default=BASE_PATH)
    parser.add_argument('--output', type=Path)
    args = parser.parse_args()
    report = verify(args.root, args.base_path)
    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps({key: value for key, value in report.items()
                      if key not in ('files', 'dependency_plan')}, ensure_ascii=False, indent=2))
    return 0 if report['passed'] else 1


if __name__ == '__main__':
    raise SystemExit(main())
