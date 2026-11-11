"""Performance budgets and no-JS markup invariants for the homepage."""
from html.parser import HTMLParser
from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1] / 'dist'


class Images(HTMLParser):
    def __init__(self):
        super().__init__()
        self.topic = None
        self.images = []
        self.artwork = []

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if tag == 'section' and values.get('data-topic'):
            self.topic = values['data-topic']
        if tag == 'img':
            self.images.append({'topic': self.topic, **values})
        if 'asset-button' in values.get('class', '').split():
            self.artwork.append({'tag': tag, 'topic': self.topic, **values})


class HomeImageMarkupTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        parser = Images()
        parser.feed((ROOT / 'index.html').read_text())
        cls.images = parser.images
        cls.artwork = parser.artwork

    def test_first_screen_has_four_eager_images_under_1_2_megabytes(self):
        eager = [image for image in self.images if image.get('src') and image.get('loading') != 'lazy']
        self.assertEqual(len(eager), 4)
        self.assertTrue(all(image['topic'] == '01' for image in eager))
        self.assertLess(sum((ROOT / image['src']).stat().st_size for image in eager), 1_200_000)

    def test_hidden_decorative_environments_have_no_initial_src(self):
        deferred = [image for image in self.images if image.get('data-src')]
        self.assertEqual(len(deferred), 4)
        self.assertTrue(all('src' not in image and image['alt'] == '' for image in deferred))

    def test_visible_no_js_artwork_keeps_real_sources_and_dimensions(self):
        gallery = [image for image in self.images if not image.get('data-src')]
        self.assertEqual(len(gallery), 44)
        self.assertTrue(all(image.get('src') and image.get('width') and image.get('height') for image in gallery))
        self.assertTrue(all((ROOT / image['src']).is_file() for image in gallery))
        self.assertTrue(all(image.get('loading') == 'lazy' for image in gallery if image['topic'] != '01'))

    def test_every_artwork_is_a_native_link_to_its_case(self):
        self.assertEqual(len(self.artwork), 27)
        for link in self.artwork:
            case = link['data-case']
            self.assertEqual(link['tag'], 'a')
            self.assertEqual(link['href'], f'cases/{case}/{case}.html')
            self.assertTrue((ROOT / link['href']).is_file())
            self.assertNotIn('disabled', link)
            self.assertNotIn('aria-pressed', link)
            self.assertNotIn('type', link)
            self.assertIn('閱讀案例', link['aria-label'])

    def test_home_html_defers_the_large_article_data_bundle(self):
        html = (ROOT / 'index.html').read_text()
        self.assertLess(len(html.encode()), 200_000)
        self.assertIn('data-src="home-atlas/covers/12-v02/scene-data.json"', html)
        self.assertNotIn('id="map-motion-data"', html)


if __name__ == '__main__':
    unittest.main()
