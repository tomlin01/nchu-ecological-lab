# ForTy 正式頁：日期與原文前兩張圖核對

核對：2026-11-01。本輪只保存官方來源及選定圖片，未更動正式站、已接受動畫或簡報。沒有重新生成、修改或重編碼圖片。

## 首屏日期

- **2026.10.22 官方公布**：DeepMind原文可見日期為October 22, 2026；HTML的`article:published_time`和文章的內嵌JSON-LD均為`2026-10-22T14:30:00+00:00`，相當於臺灣當天22:30。
- **2026.10.21 論文發表**：Scientific Data正式論文的PMC全文期刊紀錄標示2026 Oct 21，13:1434。Nature頁本輪導向不可取用的cookie認證頁，因此不把它說成已重新讀到Nature頁面metadata；日期另以PMC期刊紀錄核對。
- **2020 地圖基線**：指地圖要描述的目標年份，不是研究發表時間，也不是每張衛星影像的拍攝年份。
- 官方另外公布2017–2025早期時間序列；本案主要證據仍限已正式驗證的ForTy 2020，不把2020精度外推到各年度。

建議首屏直接寫「2026.10.22 官方公布」，並在同一區域補「2026.10.21 論文發表 · 2020 地圖基線」。不要只寫「2026最新」或把日期藏在註腳。

## 使用者指定的兩張圖

1. `deepmind-forty-hero-v01.webp`，1920×1080，106,634 bytes。來自原文第一張內容圖片，是南美洲前景的立體方塊森林地圖官方視覺。應標為「官方研究視覺」，不當作實測三維林相、冠層高度或逐10公尺地圖數值。
2. `deepmind-forty-world-map-v01.webp`，1920×1136，134,880 bytes。來自原文第二張內容圖片，2020森林類型全球圖。官方圖說明示各平方公里顯示最常見的林地類型；這張展示圖不是原生10公尺柵格。左下五類森林／樹作物圖例須保留，不以16:9 cover裁掉。研究完整分類仍為六類，包括Other Land。

兩張均從原文實際advertised srcset選取最大版本，保存HTTP回應圖片位元組，沒有本機裁圖、補畫、去背或重新壓縮。`asset-provenance.json`列出原img src、選用srcset、resolved URL、MIME、格式、尺寸與SHA。

## 來源與署名

- [DeepMind官方公布](https://deepmind.google/blog/beyond-tree-cover-mapping-the-worlds-forest-types/)
- [論文全文與期刊日期](https://pmc.ncbi.nlm.nih.gov/articles/PMC13686961/)
- [論文DOI](https://doi.org/10.1038/s41597-026-08299-5)

兩張網頁素材可標「來源：Google DeepMind／Google Research」。原文沒有為這張宣傳視覺提供單獨CC BY聲明；不要把論文或資料的開放授權自動貼到該圖。資料開放、論文CC BY、網站視覺來源與第三方衛星影像署名分開記錄。

## 證據檔

- `deepmind-source.html.gz`：下載的官方HTML壓縮回應，保存原始位元組。
- `article-jsonld.json`：原文BlogPosting與Organization兩個JSON-LD區塊的解析內容。
- `source-dates.json`：各日期及顯示建議。
- `asset-provenance.json`：圖片來源與檔案完整性。

圖片已用本機檢視確認。未讀取、請求或播放01-02相關任何媒體。
