# 06-01 DNA位置與結構補充查核

這份補充用於`prototype-v02`。原始資料、評估數字及未解項目仍以`source-audit-v01.md`為準。

本輪由獨立代理重新查核正式DeepCOI Methods、作者Predict文件與動物條碼背景。主代理也重新開啟正式論文及BOLD官方FAQ核對適用範圍。

| 畫面主張 | 依據與保留範圍 |
| --- | --- |
| 動物條碼常取自粒線體COI | [Hebert等，2004](https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.0020312)的原始條碼研究；不宣稱所有DNA或COI片段都只存在粒線體 |
| 本案使用COI-5P | [DeepCOI正式論文Methods](https://link.springer.com/article/10.1186/s13059-025-03861-7)明列COI-5P、無不明字母、分類標籤及400–2000 bp等篩選條件。[BOLD官方FAQ](https://www.boldsystems.org/resource-hub/faq/)亦列COI-5P為接收的條碼標記，但該FAQ不是本動畫完整基因組位置的來源 |
| 蚊類情境可用環狀粒線體DNA示意 | [蚊類粒線體基因組與NUMT原始研究](https://pmc.ncbi.nlm.nih.gov/articles/PMC3162086/)。只支持一般生物學背景，不提供本案四條FASTA的基因組定位 |
| 20字母短窗可對應一個雙股局部 | 上股直接讀取作者第一筆`MOSN4746-20`在MSA第348–367欄的字母，下股按A↔T、C↔G互補，5′／3′方向相反。色彩與幾何為自行解說，非模型重要性或分子量測 |

上股：`TATCAGCAGGAACAGCTCAT`。互補下股：`ATAGTCGTCCTTGTCGAGTA`。不得把這20字母稱為完整COI、完整COI-5P或足以單獨鑑種的輸入。本文沒有將記錄比對到整個粒線體參考基因組；348–367只能標為作者MSA的欄位。

Three.js將COI-5P的一個局部接到雙股、字母及表列資料。這是知識解說，不是模擬研究作者實驗、特定定序平台、DNA解旋機制或AI對分子的直接操作。畫面旁保留研究者完成萃取、擴增及定序的步驟，DeepCOI接收的是之後的序列。

鹼基順序與互補、場景正反seek、第一列位置對齊、主題及WebGL處理以`qa-v02/report.json`為實作證據。科學查核不以工具通過代替原文，也不以本機原型當作網站整合或模型推論。
