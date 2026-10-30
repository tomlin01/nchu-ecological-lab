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

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if tag == 'section' and values.get('data-topic'):
            self.topic = values['data-topic']
        if tag == 'img':
            self.images.append({'topic': self.topic, **values})


class HomeImageMarkupTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        parser = Images()
        parser.feed((ROOT / 'index.html').read_text())
        cls.images = parser.images

    def test_first_screen_has_four_eager_images_under_three_megabytes(self):
        eager = [image for image in self.images if image.get('src') and image.get('loading') != 'lazy']
        self.assertEqual(len(eager), 4)
        self.assertTrue(all(image['topic'] == '01' for image in eager))
        self.assertLess(sum((ROOT / image['src']).stat().st_size for image in eager), 3_000_000)

    def test_hidden_decorative_environments_have_no_initial_src(self):
        deferred = [image for image in self.images if image.get('data-src')]
        self.assertEqual(len(deferred), 4)
        self.assertTrue(all('src' not in image and image['alt'] == '' for image in deferred))

    def test_visible_no_js_artwork_keeps_real_sources_and_dimensions(self):
        gallery = [image for image in self.images if not image.get('data-src')]
        self.assertEqual(len(gallery), 33)
        self.assertTrue(all(image.get('src') and image.get('width') and image.get('height') for image in gallery))
        self.assertTrue(all((ROOT / image['src']).is_file() for image in gallery))
        self.assertTrue(all(image.get('loading') == 'lazy' for image in gallery if image['topic'] != '01'))


if __name__ == '__main__':
    unittest.main()
