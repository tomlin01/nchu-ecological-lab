# NCHU Ecological Lab website

AI × 生態研究的 GitHub Pages 搬站準備副本。目標儲存庫為
[`tomlin01/nchu-ecological-lab`](https://github.com/tomlin01/nchu-ecological-lab)。

網站已於2026-10-30公開部署：
[AI × 生態研究](https://tomlin01.github.io/nchu-ecological-lab/)。
儲存庫已依使用者明確授權改為公開。
最新首頁載入優化commit為`a1444e250f88686ac34339b1e4ed9d9ace44827f`；
[GitHub Pages發布流程](https://github.com/tomlin01/nchu-ecological-lab/actions/runs/41006246514)已成功。

## 網站來源

`dist/` 取自2026-10-30核對完成的完整離線包，包含12個主題封面、27個案例、
六案閱讀字體校正、七張新封面圖片連結與十二橫列目錄。
來源Git基線仍是`123100a848cee56872b285fb0eaf5a7cc46cafcc`，內容以完整快照為準，
沒有只取舊HEAD或tracked diff。原始ZIP SHA-256為
`5fb542d214fcc0ad046fdbdf3421a01a36e1a51c326d6d96999dc1d463c600f1`。

排版CSS、日曆renderer、案例播放器、圖片、字型、影片與來源文件沿用原檔。
首頁後續調整了圖片載入時機，沒有重新壓縮媒體。只排除兩個本機預覽服務檔：

- `serve_preview.py`
- `cases/05-03/animation/serve-preview.py`

另新增`dist/404.html`並更新根manifest。原本的`scene.py`等研究或製作來源檔保留。
工作區中的舊ZIP、部署archive、憑證、Sites設定及Git歷史沒有複製進網站。

## 首次載入

第一屏四張插畫保持立即載入；其他封面使用瀏覽器原生延遲載入。
當前主題的圖片與字型準備完成後，才在閒置時預載下一主題。
四張原本隱藏的環境大圖改為選案後下載，載入期間仍保留插畫與閱讀入口。
等待／重試狀態以當前主題為準，列印前將有實際src的插畫切為立即載入。

HTML立即載入圖片量由26,452,825 bytes降至2,784,248 bytes，約減少89.5%。
這是原始檔案的載入優先量，不是實測LCP或整頁速度倍率；瀏覽器也可能提前載入鄰近圖片。

## 本機檢查

需要Python 3.10以上版本，不需要額外Python套件。

```sh
python3 -m unittest discover -s scripts -p 'test_*.py'
node --test scripts/test_home_image_loading.cjs
python3 scripts/verify_site.py
python3 scripts/preview.py --port 8993
```

開啟 `http://127.0.0.1:8993/nchu-ecological-lab/`。
預覽只在這個子路徑提供網站，提供影片Range及自訂404頁。
`scripts/`位於發布目錄外，不會成為網站內容。

`verify_site.py`檢查根manifest、大小、必要檔案及子路徑引用；失敗會回非零退出碼。
它重用既有發布檢查器的靜態解析邏輯，無法窮盡所有動態JS／JSON產生的路徑。
修改網站時須同步更新根manifest，並再做相關頁面與播放器的實際操作檢查。

01-02維持只做靜態內容及雜湊核對，禁止案例、影片、HTTP、瀏覽器、原生播放及
替代host驗證。預覽服務拒絕提供該案例；不能以其他副本或網址繞過。
兩張受保護的首頁圖片僅在測試預覽中，以中性SVG代換，不讀取原圖：

- `home-atlas/assets/environments/01-02-ocean-wide-v01.png`
- `home-atlas/assets/topic-01/01-02-sperm-whale-ocean-v01.png`

完整素材仍保存在發布目錄。這不是原圖視覺驗收。
若日後建立Playwright測試context，必須在任何頁面請求前安裝同樣的精確代換與
`**/cases/01-02/**`封鎖，記錄原始存取零次及代換次數。

## 發布流程設定

`.github/workflows/pages.yml`已加入官方GitHub Pages Actions，僅發布`dist/`。
後續推送`main`或手動執行workflow時，會先跑回歸測試與離線檢查，再上傳artifact及部署。
workflow不會自動啟用儲存庫的Pages功能。

之後更新時，依使用者當次指示完成：

1. 確認這份凍結副本包含要發布的最新修改。
2. 核對目前公開儲存庫與Pages設定，不擅自改變可見性。
3. 保留GitHub Actions發布方式及`/nchu-ecological-lab/`子路徑。
4. 推送來源並執行workflow，保存真正的部署結果。
5. 在GitHub網址重新檢查入口、404、字型、模型、影片跳段及同iframe放大。

目前本機HTTP的Range結果不代表GitHub託管端也具有相同行為。
既有Sites站持續保留，沒有設定舊網址轉址或修改DNS。

官方參考：[自訂Pages workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。
