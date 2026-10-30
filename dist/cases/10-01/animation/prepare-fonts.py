#!/usr/bin/env python3
"""Build local TC font subsets from the final shell, model and scene text."""

import argparse
import hashlib
import json
from pathlib import Path
import shutil

from fontTools import subset
from fontTools.ttLib import TTFont


HERE = Path(__file__).resolve().parent
FONT_SOURCE = HERE.parents[3] / "ecology-ai-whale-focus" / "fonts"
TEXT_FILES = ("index.html", "app.mjs", "style.css", "model.mjs", "scene.mjs")
FONT_FILES = (
    ("NotoSansTC-VF.ttf", "bloom-sans.woff2", "NotoSans-OFL.txt"),
    ("NotoSerifTC-VF.ttf", "bloom-serif.woff2", "NotoSerif-OFL.txt"),
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

    corpus = "\n".join((HERE / name).read_text() for name in TEXT_FILES)
    required = set(range(0x20, 0x7F)) | {ord(char) for char in corpus if not char.isspace()}
    destination = HERE / "fonts"
    destination.mkdir(exist_ok=True)
    report = {
        "text_files": {name: sha256(HERE / name) for name in TEXT_FILES},
        "unicode_count": len(required),
        "scope": "Only final index, app, style, model and scene. No lake-three or vendor scan.",
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
        (destination / "font-coverage.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
