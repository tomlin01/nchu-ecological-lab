"""Local preview with byte ranges, required for native-video seeking."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from functools import partial
from pathlib import Path
import argparse
import re


class VideoHandler(SimpleHTTPRequestHandler):
    def send_head(self):
        self.remaining = None
        path = Path(self.translate_path(self.path))
        if not path.is_file():
            return super().send_head()
        try:
            stream = path.open('rb')
        except OSError:
            self.send_error(404)
            return None
        size = path.stat().st_size
        first, last = 0, size - 1
        requested = self.headers.get('Range')
        if requested:
            match = re.fullmatch(r'bytes=(\d*)-(\d*)', requested.strip())
            if not match or not any(match.groups()):
                stream.close()
                self.send_error(416)
                return None
            start, end = match.groups()
            if start:
                first = int(start)
                last = min(int(end), size - 1) if end else size - 1
            else:
                first = max(0, size - int(end))
            if first > last or first >= size:
                stream.close()
                self.send_response(416)
                self.send_header('Content-Range', f'bytes */{size}')
                self.send_header('Content-Length', '0')
                self.end_headers()
                return None
        self.send_response(206 if requested else 200)
        self.send_header('Content-Type', self.guess_type(str(path)))
        self.send_header('Accept-Ranges', 'bytes')
        self.send_header('Content-Length', str(last - first + 1))
        self.send_header('Cache-Control', 'no-store')
        if requested:
            self.send_header('Content-Range', f'bytes {first}-{last}/{size}')
        self.end_headers()
        stream.seek(first)
        self.remaining = last - first + 1
        return stream

    def copyfile(self, source, outputfile):
        if self.remaining is None:
            return super().copyfile(source, outputfile)
        while self.remaining:
            block = source.read(min(65536, self.remaining))
            if not block:
                break
            try:
                outputfile.write(block)
            except (BrokenPipeError, ConnectionResetError):
                break
            self.remaining -= len(block)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--directory', type=Path, required=True)
    parser.add_argument('--port', type=int, default=8860)
    args = parser.parse_args()
    handler = partial(VideoHandler, directory=str(args.directory.resolve()))
    server = ThreadingHTTPServer(('127.0.0.1', args.port), handler)
    print(f'Preview: http://127.0.0.1:{args.port}/index.html', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.server_close()
