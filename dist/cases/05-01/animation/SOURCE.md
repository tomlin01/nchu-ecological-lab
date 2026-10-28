# 05-01 動畫素材

使用 Tolan 等人 arXiv:2304.07213v3 的 Figure 7。公開論文標示 CC BY 4.0；圖中衛星照片保留 Maxar 署名。動畫使用作者公開圖版，沒有另外取得 Maxar 原始影像授權，也沒有跑模型。

- 論文：https://arxiv.org/html/2304.07213v3
- 原圖：https://arxiv.org/html/2304.07213v3/figs/MetaETHPotapov_combined_v1p6.png
- 原始 PNG：2614 × 1144；此處 `assets/figure7.png` 與下載原檔逐位元一致。
- 顯示視窗記錄於 `assets/source-data.json`。全部使用 SVG viewBox 與 clipPath，只顯示 Figure 7 下排同區各面板，不重新著色、不旋轉、不由顏色解讀數值。圖例保留原線性 0–20 m。
- 初始與比較照片取同一個原圖面板。影像學習段的三個框只是示意觀察範圍，不是作者訓練影像清單或樹木分割結果。
- 高度剖面、照片／光達配對、GEDI 分工和一公尺網格為教學示意。沒有原始點雲、同地點 RGB／ALS 配對、模型推論或新的高度數字。
- 結果數字取 Table 2 的 SSL + GEDI 像元 MAE：NEON test 2.7、CA-Brande 0.6、São Paulo 5.1 公尺。三列長條共用 0–6 m 的顯示比例，數字直接呈現，不做計分動畫。
- 全球一公尺產品背景與日期：https://sustainability.atmeta.com/blog/2024/04/22/using-artificial-intelligence-to-map-the-earths-forests/
- 全球產品限制：https://datasets.wri.org/datasets/meta-tree-canopy-height
- 本輪固定使用既有核對的 2024 全球基線，不把論文 Figure 7 視為最新產品查詢。

GSAP 複用系列已採用的本機檔。Noto Sans TC／Noto Serif TC 從專案字型主檔重新產生本案文字子集，授權檔存於 fonts/。深色模式只改介面與概念示意的顏色，保留原研究圖像色彩。
