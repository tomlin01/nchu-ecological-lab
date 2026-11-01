#!/usr/bin/env python3
"""Subset the existing Noto Sans TC variable font for the ForTy case reader."""
from pathlib import Path
import argparse
import hashlib
import json
from fontTools import subset
from fontTools.ttLib import TTFont

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[4]
SOURCE=ROOT/'work/ecology-ai-whale-focus/fonts/NotoSansTC-VF.ttf'
TARGET=HERE/'fonts/forty-web-sans.woff2'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def codes(path):
    font=TTFont(path);result=set(font.getBestCmap());font.close();return result
def main():
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--check',action='store_true');args=parser.parse_args()
    paths=[p for p in HERE.iterdir() if p.is_file() and p.suffix in {'.html','.css','.js','.md'}]
    paths += [ROOT/'work/nchu-ecological-lab/dist/ui/site-map.js',ROOT/'work/nchu-ecological-lab/dist/ui/sidebar.js']
    content='\n'.join(p.read_text() for p in paths)
    required=set(range(32,127))|{ord(c) for c in content if not c.isspace()}
    available=codes(SOURCE)
    missing_source=required-available
    assert not [v for v in missing_source if 0x3400<=v<=0x9fff],missing_source
    if not args.check:
        TARGET.parent.mkdir(exist_ok=True)
        options=subset.Options();options.flavor='woff2';options.recalc_timestamp=False;options.layout_features=['*'];options.name_IDs=['*']
        font=subset.load_font(str(SOURCE),options);builder=subset.Subsetter(options=options);builder.populate(unicodes=required&available);builder.subset(font);subset.save_font(font,str(TARGET),options);font.close()
        (TARGET.parent/'NotoSans-OFL.txt').write_bytes((SOURCE.parent/'NotoSans-OFL.txt').read_bytes())
    missing=(required&available)-codes(TARGET)
    assert not missing,','.join(f'U+{c:04X}' for c in sorted(missing))
    report={'status':'PASS','family':'FortyCaseSans','weights':'100 900','required_codepoints':len(required),'missing_glyphs':[],
            'source_sha256':sha(SOURCE),'output_sha256':sha(TARGET),'output_bytes':TARGET.stat().st_size,
            'source_files':{str(p.relative_to(ROOT)):sha(p) for p in paths}}
    if not args.check:(TARGET.parent/'coverage.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
    print(json.dumps({k:v for k,v in report.items() if k!='source_files'},ensure_ascii=False))
if __name__=='__main__':main()
