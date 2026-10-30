#!/usr/bin/env python3
"""Build web-only TC font subsets without changing accepted animation fonts."""

import argparse
import hashlib
import json
from pathlib import Path
import shutil

from fontTools import subset
from fontTools.ttLib import TTFont


HERE = Path(__file__).resolve().parent
FONT_SOURCE = HERE.parents[3] / "ecology-ai-whale-focus" / "fonts"
TEXT_FILES = ("12-01.html", "case.css", "case.js", "hero.js", "index.html")
SITE_UI = HERE.parents[3] / "ecology-ai-sites-hosting-batched" / "dist" / "ui"
SHARED_FILES = ("site-map.js", "sidebar.js", "theme.js")
FONT_FILES = (
    ("NotoSansTC-VF.ttf", "12-sans.woff2", "NotoSans-OFL.txt"),
    ("NotoSerifTC-VF.ttf", "12-serif.woff2", "NotoSerif-OFL.txt"),
)


def sha256(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def coverage(path, required):
    font = TTFont(path)
    available = set(font.getBestCmap())
    font.close()
    return [f"U+{code:04X}" for code in sorted(required - available)]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Check current subsets without writing files.")
    args = parser.parse_args()
    missing_files = [name for name in TEXT_FILES if not (HERE / name).is_file()]
    if missing_files:
        raise SystemExit("Final text files are missing: " + ", ".join(missing_files))

    missing_shared = [name for name in SHARED_FILES if not (SITE_UI / name).is_file()]
    if missing_shared:
        raise SystemExit("Shared UI text files are missing: " + ", ".join(missing_shared))
    corpus = "\n".join((HERE / name).read_text() for name in TEXT_FILES)
    corpus += "\n" + "\n".join((SITE_UI / name).read_text() for name in SHARED_FILES)
    required = set(range(0x20, 0x7F)) | {ord(char) for char in corpus if not char.isspace()}
    destination = HERE / "fonts"
    destination.mkdir(exist_ok=True)
    report = {
        "text_files": {name: sha256(HERE / name) for name in TEXT_FILES},
        "shared_ui_text_files": {name: sha256(SITE_UI / name) for name in SHARED_FILES},
        "unicode_count": len(required),
        "scope": "Final web case text and shared UI labels only. Accepted animation files and fonts are untouched.",
        "fonts": {},
    }
    for source_name, output_name, license_name in FONT_FILES:
        source = FONT_SOURCE / source_name
        target = destination / output_name
        if not args.check:
            missing = coverage(source, required)
            if missing:
                raise SystemExit(f"Full source font {source_name} lacks: {', '.join(missing)}")
            options = subset.Options()
            options.flavor = "woff2"
            options.recalc_timestamp = False
            options.layout_features = ["*"]
            options.name_IDs = ["*"]
            font = subset.load_font(str(source), options)
            builder = subset.Subsetter(options=options)
            builder.populate(unicodes=required)
            builder.subset(font)
            subset.save_font(font, str(target), options)
            font.close()
            shutil.copy2(FONT_SOURCE / license_name, destination / license_name)
        if not target.is_file():
            raise SystemExit(f"Subset is missing: {target}")
        missing = coverage(target, required)
        if missing:
            raise SystemExit(f"Subset {output_name} lacks: {', '.join(missing)}")
        report["fonts"][output_name] = {
            "source": str(source),
            "source_sha256": sha256(source),
            "bytes": target.stat().st_size,
            "sha256": sha256(target),
            "missing_unicode": missing,
        }
    if not args.check:
        (destination / "web-font-coverage.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
