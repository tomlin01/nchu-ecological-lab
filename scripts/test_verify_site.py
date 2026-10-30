"""Small offline regressions for the migration's actual failure modes."""
import hashlib
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

from site_dependencies import REQUIRED_FILES, PROTECTED_HOME_IMAGES, build_plan, vendor_refs, excluded_url
from verify_site import BASE_PATH, verify
from preview import excluded


class ProjectPathTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        for name in (*REQUIRED_FILES, '404.html', 'cases/02-01/index.html',
                     'cases/02-01/02-01.html'):
            path = self.root / name
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text('')
        data = {'topics': [{'cases': [{'id': '02-01', 'path': 'cases/02-01/02-01.html'}]}]}
        (self.root / 'ui/site-map.js').write_text('window.EcologySiteMap = ' + json.dumps(data))
        (self.root / 'index.html').write_text('<script src="ui/site-map.js"></script>')
        self.manifest()

    def manifest(self):
        files = {p.relative_to(self.root).as_posix():
                 {'bytes': p.stat().st_size, 'sha256': hashlib.sha256(p.read_bytes()).hexdigest()}
                 for p in self.root.rglob('*') if p.is_file() and p.name != 'manifest.json'}
        (self.root / 'manifest.json').write_text(json.dumps({'files': files}))

    def test_valid_relative_paths_and_manifest(self):
        self.assertTrue(verify(self.root)['passed'])

    def test_root_absolute_asset_escapes_project(self):
        (self.root / 'index.html').write_text('<script src="/ui/site-map.js"></script>')
        self.assertTrue(any('escapes project' in error['reason']
                            for error in build_plan(self.root, 'https://tomlin01.github.io')['errors']))

    def test_404_home_link_stays_in_project(self):
        (self.root / 'index.html').write_text('<a href="' + BASE_PATH + '">首頁</a>')
        self.assertTrue(build_plan(self.root, 'https://tomlin01.github.io')['passed'])

    def test_missing_dependency_is_nonzero_and_report_is_saved(self):
        (self.root / 'index.html').write_text('<script src="missing.js"></script>')
        self.manifest()
        output = self.root.parent / (self.root.name + '-report.json')
        self.addCleanup(output.unlink, missing_ok=True)
        result = subprocess.run([sys.executable, str(Path(__file__).with_name('verify_site.py')),
                                 '--root', str(self.root), '--output', str(output)],
                                capture_output=True, text=True)
        self.assertEqual(result.returncode, 1)
        self.assertTrue(any(error['path'] == 'missing.js'
                            for error in json.loads(output.read_text())['errors']))

    def test_manifest_detects_changed_media(self):
        (self.root / 'index.html').write_text('changed')
        self.assertFalse(verify(self.root)['passed'])

    def test_vendor_examples_are_not_imports(self):
        source = "/* import { X } from 'three/example.js'; */\nimport { X } from './real.js';"
        self.assertEqual(list(vendor_refs(source)), [('./real.js', 'import')])

    def test_protected_case_guard_without_network(self):
        self.assertTrue(excluded(BASE_PATH + 'cases/01-02/01-02.html', self.root))
        self.assertTrue(excluded(BASE_PATH + 'cases/01%2D02/animation/index.html', self.root))
        self.assertFalse(excluded(BASE_PATH + 'home-atlas/assets/environments/01-02-ocean.png', self.root))

    def test_protected_home_images_are_static_only(self):
        for path in PROTECTED_HOME_IMAGES:
            self.assertTrue(excluded_url(BASE_PATH + path))
        self.assertFalse(excluded_url(BASE_PATH + 'home-atlas/assets/topic-01/01-01-zebra-grassland-v01.png'))


if __name__ == '__main__':
    unittest.main()
