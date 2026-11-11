# NCHU Ecological Lab website

AI × 生態研究的唯一編輯與發布儲存庫，正式網站為[GitHub Pages](https://tomlin01.github.io/nchu-ecological-lab/)。

2026-11-12已發布Hallmark修整與首頁加速版。網站commit `21fbab225f45aad140cdc4e3bf649e80a360231d`，
[Actions 43061339249](https://github.com/tomlin01/nchu-ecological-lab/actions/runs/43061339249)與deployment `7715908576`均success。
內容為12主題／28案例、1,562檔、459,221,586 bytes，只發布`dist/`。
README-only紀錄commit可能比網站commit新；以dist差異判定，不把文件commit當成新網站發布。

## 目前行為

01–05第一次普通點圖先預覽，再點已選案例圖片進入；文字選案、配對圖、環境、Escape與空白重設保留。
06–12單一封面一次進入。07／11／12暫停與繼續、主題10揭開量測、手機05來源排列及月曆卷邊保留。
訪花九節點先保持可見，再展開十六連線；懸停或焦點暫停不會停成整圖空白。

首頁維持四張優先圖片，其餘延後載入。43份q90高品質顯示衍生檔及九圖responsive版本保留原圖，
文章拼圖資料接近主題12時才載入。這是有損顯示壓縮，不能稱逐像素相同。
主題10的Three、11的森林／步態資源仍只在啟用主題後載入。研究案例、影片、原圖、字型及來源授權保留。

## 本機檢查

```sh
PYTHONDONTWRITEBYTECODE=1 python3 -m unittest discover -s scripts -p 'test_*.py'
node --test scripts/test_home_image_loading.cjs scripts/test_network_cover.cjs
python3 -B scripts/verify_site.py
python3 -B scripts/preview.py --port 9020
```

16項Python、21項Node及28案／900份依賴檢查通過。發布後91項線上檔案、根網址與404、25項瀏覽器檢查通過。
瀏覽器大量案例導航使用最小文件代換，真實案例HTML另作HTTP核對，不宣稱重驗全部影片或實機Safari。
完整證據位於工作區`outputs/github-pages-deploy/nchu-ecological-lab-20261111T164332Z/`，不屬於網站內容。

## 保護與發布

01-02僅靜態文字、href、檔案存在及SHA核對，禁止案例、媒體、HTTP、瀏覽器、原生播放及替代host驗證。
每個browser context在newPage前安裝兩張精確首頁SVG代換，其他01-02／sperm／抹香鯨請求一律阻擋，service workers封鎖：

- `/nchu-ecological-lab/home-atlas/assets/environments/01-02-ocean-wide-v01.png`
- `/nchu-ecological-lab/home-atlas/assets/topic-01/01-02-sperm-whale-ocean-v01.png`

原素材完整保留於dist，代換只限測試，不讀原圖、不寫回網站。
workflow在push main或手動觸發時直接發布dist，沒有builder。新資源必須明確加入Git，不能只用git add -u。
不得從舊ZIP或試作builder覆寫目前來源。修改後同步根manifest並另存新驗證證據。
05-01照片與衍生圖的公開使用授權已由使用者確認，保留Rhett A. Butler／Mongabay署名，不宣稱開放授權。
既有公開狀態、子路徑、自訂404、舊Sites及DNS保持。
