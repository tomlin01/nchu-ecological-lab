# 06-01動畫試作素材與來源

本頁沒有執行DeepCOI推論，也沒有產生逐條分類分數。

- 論文：Gwak與Rho，2025，Genome Biology 26:393，<https://link.springer.com/article/10.1186/s13059-025-03861-7>。正式Table 4用於本頁兩種比較。原始期刊圖片未放進動畫，也未裁改。
- 作者程式：<https://github.com/DMnBI/DeepCOI>。輸入為已定序的COI序列；重疊4-mer先編碼，再做分類。第一步辨認目標門或outgroup；對應門的模型同時輸出綱至種。動畫中神經網路圖為機制示意，不是實際權重或注意力。
- 真實序列：<https://github.com/DMnBI/DeepCOI-reproduce/blob/82c16e9ebec3e795352d33a7a6f26cca5d3c923c/Figure5/Aedes_four.msa.fasta>。雖然檔名含four，實際為50筆、5種。動畫自選4種各1筆，不是論文Fig. 5四種的重現。共同窗口為1-based alignment columns 348–367，不是基因組座標。20字母短窗只用來看差異，不支持單憑短窗鑑種。JSON保存完整記錄ID、字母、MIT全文與Copyright (c) 2025 DMnBI。以`extract-sequences.py`可重新核對。
- 蚊子實拍：CDC／Amy E. Lockwood, MS，2022，PHIL 26041，<https://wwwn.cdc.gov/phil/Details.aspx?pid=26041>。下載`https://wwwn.cdc.gov/phil/PHIL_Images/26041/26041_lores.jpg`，700×466，未改色。頁面列為公有領域、要求標明CDC來源。本動畫標為埃及斑蚊對象介紹，並非本次序列物種或對應標本。
- 三維細胞、粒線體、DNA環與雙股局部由`dna-three.mjs`建模，為教學示意，不是顯微或實驗量測。COI與COI-5P位置只表示包含關係，沒有把作者條碼定位到完整基因組。第一筆20字母用於局部結構與字母對照，互補股由A↔T、C↔G求出。此片段不足以單獨鑑種，不是完整模型輸入。
- 生物學背景：DeepCOI正式論文Methods的COI-5P資料條件；[Hebert等，2004原始條碼研究](https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.0020312)的粒線體COI條碼；[BOLD官方FAQ](https://www.boldsystems.org/resource-hub/faq/)的COI-5P標記；[蚊類粒線體與核基因組研究](https://pmc.ncbi.nlm.nih.gov/articles/PMC3162086/)提供環狀基因組背景。這些來源不提供本動畫四筆條碼的完整基因組座標，也不代表本頁執行定位或定序。
- Three.js revision186沿用專案現有vendor，MIT全文存於`vendor/LICENSE-three.txt`。不載入珊瑚場景模型、材質或任何01-02素材。
- GSAP：沿用專案現有`work/ecology-ai-reader/vendor/gsap.min.js`，檔頭保留版本與授權資訊。paused timeline與Three.js畫面均由播放器單一時鐘取樣，不建立第二條播放時間。
- 字體：沿用專案Noto Sans TC／Noto Serif TC變數字體，SIL OFL 1.1，以`prepare-fonts.py`產生本頁字集的WOFF2。

Table 4的五階層平均F1為DeepCOI 0.864、RDP 0.658、BLAST 0.853。種級F1依序為0.858、0.642、0.909。設定為四組節肢動物長讀長資料，DeepCOI門檻>0.9、RDP>0.8，BLAST query coverage>85%且依階層設identity門檻。F1不是正確率，未聲稱統計顯著或所有分類階層皆較好。

未使用摘要指標、未解分母與73倍宣傳數字。完整查核及未解項目見上一層`source-audit-v01.md`。

ManimGX技能已閱讀，並以既有環境實際執行全新0.4秒3D螺旋轉直線與文字smoke。工具可用，但本版選Three.js來保持網頁seek、逐幀、主題與DOM字母對位；沒有用smoke影像冒充本案成品，也沒有把它納入素材包。
