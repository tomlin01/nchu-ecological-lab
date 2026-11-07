"""Guard the approved cover promotion and its static-host contract."""
from pathlib import Path
import hashlib
import json
import re
import unittest

ROOT = Path(__file__).resolve().parents[1] / 'dist'


class AcceptedCoverTests(unittest.TestCase):
    def test_selected_assets_retain_accepted_bytes(self):
        data = json.loads((ROOT / 'home-atlas/covers/accepted-sources.json').read_text())
        self.assertEqual(set(data['topics']), {'06', '07', '08', '09', '12'})
        for asset in data['assets']:
            self.assertEqual(hashlib.sha256((ROOT / asset['path']).read_bytes()).hexdigest(), asset['sha256'], asset['path'])

    def test_static_markup_has_no_comparison_routes_or_controls(self):
        html = (ROOT / 'index.html').read_text()
        self.assertIn('<a class="brand" href="#topic-01">', html)
        self.assertNotRegex(html, r'__(?:covermedia|network|networkbase|trend|flock|mapmotion)/|version-toggle|data-cover-view|<template')
        self.assertIn('Skander zarrad', html)
        self.assertIn('https://creativecommons.org/licenses/by-sa/4.0/', html)
        self.assertIn('日夜代表前後時段', html)

    def test_network_and_article_puzzle_data_survive_promotion(self):
        html = (ROOT / 'index.html').read_text()
        def data(name):
            return json.loads(re.search(r'<script type="application/json" id="' + name + r'">(.*?)</script>', html, re.S).group(1))
        network = data('network-cover-data')
        self.assertEqual(len(network['edges']), 16)
        self.assertEqual(len(network['plants']) + len(network['visitors']), 9)
        self.assertGreater(len(data('map-puzzle-data')['pieces']), 10)
        self.assertGreater(len(data('map-article-data')['articles']), 1)


if __name__ == '__main__':
    unittest.main()
