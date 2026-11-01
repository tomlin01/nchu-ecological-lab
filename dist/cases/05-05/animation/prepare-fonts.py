#!/usr/bin/env python3
"""Create local Traditional Chinese font subsets; never change any image asset."""
import argparse
import hashlib
import json
from pathlib import Path
import shutil
from fontTools import subset
from fontTools.ttLib import TTFont

HERE=Path(__file__).resolve().parent
CASE=HERE.parent
ROOT=HERE.parents[4]
FONT_SOURCE=ROOT/'work/ecology-ai-whale-focus/fonts'
OUTPUT=HERE/'fonts'
PAIRS=(('NotoSansTC-VF.ttf','forty-sans.woff2','NotoSans-OFL.txt','Forty Sans'),
       ('NotoSerifTC-VF.ttf','forty-serif.woff2','NotoSerif-OFL.txt','Forty Serif'))

def sha(path):return hashlib.sha256(path.read_bytes()).hexdigest()
def cmap(path):
    font=TTFont(path);codes=set(font.getBestCmap());font.close();return codes
def corpus():
    # Read source copy and scripts, not large vendor files or metadata containing old cases.
    paths=[]
    for base in [HERE,CASE]:
        for path in base.iterdir():
            if path.is_file() and path.suffix in ('.html','.css','.mjs','.js','.md','.json'):
                paths.append(path)
    paths.append(ROOT/'work/keynote-12/forty-single-20261101/notes.txt')
    text='\n'.join(p.read_text() for p in sorted(set(paths)) if p.exists())
    text+='\n播放 暫停 重播 放大 關閉 淺色 深色 載入中 重新載入 無法載入 下載影片 章節 研究來源 '
    text+='時間 進度 影片 尚未結束 森林 土地 用途 觀測 先認識林地 一片綠還不夠 同位置的判讀 結果怎麼核對 回到這片森林 '
    text+='原生林 自然再生林 人工栽植林 集約經營人工林 樹作物與農林混作 其他土地 可靠例子 擴大資料 多年資訊 '
    text+='αβγδµ≤≥×−→←↑↓％／，。；：「」『』（）【】…·©°'
    return paths,text

def main():
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--check',action='store_true');args=parser.parse_args()
    files,text=corpus();required=set(range(32,127))|{ord(c) for c in text if not c.isspace()}
    OUTPUT.mkdir(exist_ok=True)
    report={'source_files':{str(p.relative_to(ROOT)):sha(p) for p in sorted(set(files)) if p.exists()},
            'unicode_count':len(required),'fonts':{},'has_ascii':True,'fonts_are_variable':True}
    css=[]
    for source_name,target_name,license_name,family in PAIRS:
        source=FONT_SOURCE/source_name;target=OUTPUT/target_name;available=cmap(source)
        # Some semantic arrows or Latin mathematical glyphs use the system math fallback; TC text must not.
        unsupported=required-available
        missing_tc=[f'U+{x:04X}' for x in sorted(unsupported) if 0x3400<=x<=0x9fff]
        if missing_tc:raise SystemExit('Full source font lacks TC glyphs: '+','.join(missing_tc))
        subset_required=required&available
        if not args.check:
            options=subset.Options();options.flavor='woff2';options.recalc_timestamp=False;options.layout_features=['*'];options.name_IDs=['*']
            font=subset.load_font(str(source),options);builder=subset.Subsetter(options=options);builder.populate(unicodes=subset_required);builder.subset(font);subset.save_font(font,str(target),options);font.close()
            shutil.copy2(FONT_SOURCE/license_name,OUTPUT/license_name)
        missing=subset_required-cmap(target)
        if missing:raise SystemExit(f'Subset {target_name} is missing '+','.join(f'U+{x:04X}' for x in sorted(missing)))
        weight='100 900' if 'Sans' in family else '200 900'
        css.append(f"@font-face{{font-family:'{family}';src:url('./{target_name}') format('woff2');font-weight:{weight};font-style:normal;font-display:swap;}}")
        report['fonts'][target_name]={'family':family,'source_sha256':sha(source),'bytes':target.stat().st_size,'sha256':sha(target),'missing_tc':missing_tc,'unsupported_symbols':[f'U+{x:04X}' for x in sorted(unsupported)]}
    if not args.check:
        (OUTPUT/'fonts.css').write_text('\n'.join(css)+'\n')
        (OUTPUT/'font-coverage.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
    print(json.dumps({'unicode_count':len(required),'fonts':report['fonts']},ensure_ascii=False,indent=2))

if __name__=='__main__':main()
