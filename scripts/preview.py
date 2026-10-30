"""Serve the website at its GitHub project path with Range and a runtime exclusion."""
import argparse
from functools import partial
from http.server import ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit

from range_preview import VideoHandler
from verify_site import BASE_PATH
from site_dependencies import PROTECTED_HOME_IMAGES

NEUTRAL_HOME_IMAGE = b'<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900"><rect width="1600" height="900" fill="#dddcd6"/></svg>'


def excluded(path, root):
    root = Path(root).resolve()
    decoded = unquote(urlsplit(path).path)
    relative = decoded.removeprefix(BASE_PATH)
    target = (root / relative).resolve()
    return ('/cases/01-02/' in decoded or decoded.rstrip('/').endswith('/cases/01-02')
            or target.is_relative_to(root / 'cases/01-02')
            or not target.is_relative_to(root))


class ProjectHandler(VideoHandler):
    def translate_path(self, path):
        relative = unquote(urlsplit(path).path).removeprefix(BASE_PATH)
        return super().translate_path('/' + relative)

    def not_found(self):
        body = (Path(self.directory) / '404.html').read_bytes()
        self.send_response(404)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        from io import BytesIO
        self.remaining = None
        return BytesIO(body)

    def send_head(self):
        path = unquote(urlsplit(self.path).path)
        if not path.startswith(BASE_PATH):
            return self.not_found()
        relative = path.removeprefix(BASE_PATH)
        if relative in PROTECTED_HOME_IMAGES:
            from io import BytesIO
            self.send_response(200)
            self.send_header('Content-Type', 'image/svg+xml')
            self.send_header('Content-Length', str(len(NEUTRAL_HOME_IMAGE)))
            self.end_headers()
            self.log_message('PROTECTED_HOME_SUBSTITUTION %s', relative)
            self.remaining = None
            return BytesIO(NEUTRAL_HOME_IMAGE)
        root = Path(self.directory).resolve()
        if excluded(self.path, root):
            self.send_error(403, 'Excluded from runtime verification')
            return None
        target = Path(self.translate_path(self.path))
        if not target.exists() or (target.is_dir() and not (target / 'index.html').is_file()):
            return self.not_found()
        return super().send_head()


class ProjectServer(ThreadingHTTPServer):
    request_queue_size = 128
    daemon_threads = True


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=Path(__file__).resolve().parents[1] / 'dist')
    parser.add_argument('--port', type=int, default=8993)
    args = parser.parse_args()
    server = ProjectServer(('127.0.0.1', args.port),
                           partial(ProjectHandler, directory=str(args.root.resolve())))
    print(f'Preview: http://127.0.0.1:{args.port}{BASE_PATH}', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.server_close()
