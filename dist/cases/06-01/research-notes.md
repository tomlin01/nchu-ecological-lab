# 06-01 DeepCOI 來源稽核 v01

查核日期：2026-10-27。範圍：原始論文、作者程式庫、既有簡報素材。本次未改簡報、正式網頁或排程；未下載模型或訓練集，未執行推論。

## 決策

本案符合「下一案須在現有簡報內」的條件。`work/keynote-12/slide-copy.json` 第8頁、`case_id: 06-01` 已收錄 DeepCOI，主題為「AI 分析 DNA，協助辨認動物種類」。

適合發展的科普主句是：**研究者先採樣與定序，DeepCOI 再逐條分析動物 COI 條碼，提出可檢查的分類標籤。**分類庫的範圍與分數門檻會影響能辨認到多細。建議先講這個工作分工，成果數字放在後面。

暫不把論文摘要的 AU-ROC 0.958、AU-PR 0.897 做成「準確率」主視覺。下述資料分母有未解差異，應保存來源口徑。`novel species` 應譯為「模型訓練未見的物種」，不能譯為「新發現物種」。

## 原始來源與權重

| 來源 | 用途 |
| --- | --- |
| [Gwak & Rho，Genome Biology 26:393，正式論文](https://link.springer.com/article/10.1186/s13059-025-03861-7) | 架構、實驗、Methods、Table 4/5、出版與圖像授權的首要依據。2025-11-17出版。 |
| [PMC全文](https://pmc.ncbi.nlm.nih.gov/articles/PMC12621415/) | 同篇論文典藏。網頁本次回驗證頁，另透過[NCBI BioC API](https://www.ncbi.nlm.nih.gov/research/bionlp/RESTful/pmcoa.cgi/BioC_json/PMC12621415/unicode)核對內文及表格 XML。 |
| [作者 DeepCOI](https://github.com/DMnBI/DeepCOI) | 輸入、逐條輸出格式、模型入口。查核時 main 為 `eae07c33edc451ee0c60a4d11b98e5fe09f63a2a`。README仍寫 In Review，出版狀態以論文為準。 |
| [作者 DeepCOI-reproduce](https://github.com/DMnBI/DeepCOI-reproduce) | 作者數值CSV、測試標籤、序列資料、評估程式；main 固定於 `82c16e9ebec3e795352d33a7a6f26cca5d3c923c`。 |

既有素材來源已讀：`work/keynote-12/image-revision/source-a.md`、`work/keynote-12/assets/manifest-a.json`。本次重新實看 Fig. 1、Fig. 5 的既有本機檔。沒有依賴二手報導。

## 輸入、模型與輸出

- 輸入是已完成定序的動物 COI-5P 核苷酸序列。模型每次處理一條序列；FASTA可以放多條query，程式批次逐條分類。混合樣本須先經實驗與序列前處理，不能把一管水、照片、原始混合訊號直接交給本模型。依據：Methods的 Input layer，以及[作者 Predict 說明](https://github.com/DMnBI/DeepCOI#23-predict)。
- 這裡的語言模型是讀 DNA 字串的 BERT 類編碼器，採 ESM2 類架構。它把重疊4-mer轉成向量，包含六層transformer、320維表示，嵌入層約800萬參數。自監督預訓練用遮住片段後預測的方式學習序列規律；下游訓練固定嵌入層。它沒有用 ChatGPT 對話辨物種，也不生成新DNA。依據：Methods的 Input/Embedding layer、Model training。
- 1D-CNN與max pooling彙整序列特徵，分類層計算既有標籤的分數。先分八個目標門或outgroup，再交給相應門分類器，同時輸出綱、目、科、屬、種。推論時MCM把祖先標籤分數至少拉到後代標籤的最大分數；它不能補出分類庫沒有的物種名稱。依據：Fig. 1與Methods的 Classification layer。
- 目標八門為環節動物、節肢動物、脊索動物、刺絲胞動物、棘皮動物、軟體動物、線形動物、扁形動物。不能把「八門」寫成已涵蓋所有動物。
- 作者TSV是一列一條query，含階層、標籤與分數。分數是模型輸出，不是「樣本內有該物種的機率」或現地調查完整率。README的 `query0 / Copicerus irroratus / 0.85` 是格式例子，不能當成此次推論結果。

## 資料尺度與切分

| 項目 | 已核對的原文範圍 | 解讀與限制 |
| --- | --- | --- |
| 預訓練 | BOLD v4；COI-5P、無模糊核苷酸；合計7,474,090條，95%約710萬訓練、5%約37萬評估 | 自監督資料量，不等於已標好物種的分類訓練量。Methods稱資料下載於2022-08-30；reproduce README另寫2022-08-22，日期不混用。 |
| 監督分類 | 完整門到種標籤、無模糊核苷酸、400至2,000 bp；只用每種超過50條序列者訓練 | 資料庫多寡決定可訓練類群。參考庫與物種標籤仍由人類建立。 |
| Table 5 train | 八門合計1,764,756條；其中節肢動物1,439,945條 | 各門樣本極不平均。合計是本次加總Table 5，非重新訓練結果。 |
| Table 5 validation | 95,405條 | 原文概稱約95,000。 |
| Table 5 test | 236,022條 | 是Test欄八門相加；不能自行再加46,929成282,951。 |
| 已知物種切分敘述 | 每種保留10%，加入0.5%至1%隨機突變，再均分validation/test | 物種內保留，不能說測試物種全部與訓練不同。隨機突變不是所有實驗誤差的完整模擬。 |
| 未見物種切分敘述 | 物種未進監督訓練及validation，但其屬已知 | 測試可否辨到已知祖先階層，並抑制錯誤種級指認；不是命名新物種。 |
| 長讀長外部資料 | DS-PBBC1至4；排除短於400 bp後為95、948、8,662、9,037條，共18,742條 | 既有BOLD節肢動物資料，三綱Insecta、Arachnida、Collembola。不能當成已驗證所有野外混合環境樣本。 |

長讀長測試前，作者從節肢動物訓練與validation排除與四資料集完全相同的序列，再訓練DeepCOI/RDP，並重建BLAST資料庫。這證明的是該實驗的排除程序；不能推廣成所有預訓練與所有測試之間都零重疊。本文只明確寫出自監督預訓練/評估互斥，未在此證明其與下游測試全面互斥。

### 分母矛盾，保留為未解

1. Results的 Overview文字稱「known 236,022」及「novel 46,929」。但同篇Table 5的全部Test欄已合計236,022。
2. 作者公開的[測試標籤檔](https://github.com/DMnBI/DeepCOI-reproduce/blob/82c16e9ebec3e795352d33a7a6f26cca5d3c923c/data/testset_labels.tar.gz)共236,022列；本次只在記憶體解壓讀取，`species`標記為`included`的100,612列、`excluded`的135,410列。不能以此冒充原文46,929的同一定義。
3. 這可能涉及資料版本或子集定義，但現有證據不足以判定原因。本稽核不替作者補分母。公眾文案可寫「以BOLD資料庫及四組既有節肢動物長讀長資料評估」，若必須寫test總數，須明指「Table 5列出的236,022條」，不要稱全為已知物種。

## 可用結果與不可混用的指標

### 資料庫分類結果

Fig. 3按階層比較三種方法；作者先計算各門分類指標，再報八門macro平均。以下為正式論文數字，亦與作者[Fig. 3 CSV](https://github.com/DMnBI/DeepCOI-reproduce/blob/82c16e9ebec3e795352d33a7a6f26cca5d3c923c/Figure3/DeepCOI/DeepCOI.scores.csv)逐門數值平均相符：

| 階層 | DeepCOI AU-ROC | DeepCOI AU-PR |
| --- | ---: | ---: |
| 綱 | 0.991 | 0.983 |
| 目 | 0.990 | 0.960 |
| 科 | 0.981 | 0.928 |
| 屬 | 0.965 | 0.895 |
| 種 | 0.925 | 0.832 |

AU-ROC與AU-PR衡量分數在不同門檻下的分類表現，**0.925不能譯成92.5%物種辨認正確**。種級比高階層更難。各門差異也大，例如作者同一CSV的種級AU-PR，刺絲胞動物約0.629，節肢動物約0.942。

摘要的0.958/0.897沒有明示可直接對上的階層與平均分母。本次未能將其與Fig. 3重算數值對齊。Table 1/3的種級0.913/0.817是架構/消融比較口徑，也不能代替Fig. 3的0.925/0.832。

作者未見物種子集CSV只列綱到屬，沒有「辨出未知種名」的種級成功率。可說它評估了未見物種的上層分類及誤指認，不能說AI學會資料庫外的新物種。

### 四組節肢動物長讀長結果

正式Table 4使用DeepCOI分數高於0.9、RDP高於0.8作已分類；BLAST要求覆蓋query超過85%，並依階層設定75%、90%、94%的identity門檻。未達門檻保留為未分類。

| 正式Table 4，F1 | DeepCOI，含MCM | RDP | BLAST |
| --- | ---: | ---: | ---: |
| 綱 | 0.993 | 0.883 | 0.975 |
| 目 | 0.974 | 0.755 | 0.953 |
| 科 | 0.850 | 0.461 | 0.860 |
| 屬 | 0.644 | 0.550 | 0.567 |
| 種 | 0.858 | 0.642 | 0.909 |
| 上列五階層平均 | 0.864 | 0.658 | 0.853 |

0.864是五階層F1的平均，不是所有動物或所有序列的辨識率。BLAST在該表科、種級F1較高，不能聲稱DeepCOI在每個階層都勝過BLAST。

Methods把「達門檻且標籤相同」算TP，「達門檻但標籤不同，含undefined」算FP，「有參考標籤但低於門檻」算FN。F1綜合作者依此定義的precision與recall；不是單純答對條數除以18,742。作者的[Table4 notebook](https://github.com/DMnBI/DeepCOI-reproduce/blob/82c16e9ebec3e795352d33a7a6f26cca5d3c923c/notebooks/Table4.ipynb)亦顯示此計數定義。

Table 4與該notebook的已存輸出另有數值差異，例如含MCM種級F1在正式表為0.858，notebook為0.890420。本次不跑模型，亦未重算完整預測，故不能聲稱完成重現。對外引用以正式表為主，保留此差異。

同四組資料在種級共有16,468條被作者視為未見或未標記類群，這些條目不是可拿來驗證已知種名的完整truth。論文所報DeepCOI種級FPR 0.023，是未見條目被錯誤指成已知種的比例，不能改寫成「未知物種辨認率97.7%」。

### 速度

完整含MCM版本平均32.42條/秒，約BLAST的15.29倍。移除MCM後154.8條/秒，才是RDP的4.7倍、BLAST的73.02倍。這是Fig. 4指定設備的比較：DeepCOI用單張Tesla V100 32GB GPU，RDP單執行緒，BLAST 20執行緒。不能把73倍當作所有設備與完整版本的保證。科普可保守說「在論文設定下加快大量條碼分類」。

## 限制與敘事界線

| 可以說 | 不可據此聲稱 |
| --- | --- |
| AI整理已定序的條碼，提出分類標籤及分數，研究者再檢查 | AI從動物照片、水樣或外觀直接讀出DNA |
| 可批次處理許多query，每條各自分類 | 模型直接解開混合樣本、定量每個物種的個體數 |
| 測試有模擬0.5%至1%隨機突變 | 任意短序列、高錯誤率reads、缺失、污染、嵌合序列都已驗證 |
| 已知屬內未見物種的上層分類及抑制誤指認有測試 | 發現、命名或確證新物種；已覆蓋所有動物 |
| 依既有條碼參考庫提出分類 | 序列數、reads數或分數能直接等同動物隻數、密度或生物量 |

400 bp以下序列未在這套主要分類驗證範圍，長讀長評估也主動排除。推論程式把含模糊字母的k-mer轉成unknown token，僅是輸入處理規則，不等於已證明模糊字母很多時仍可靠。本文亦未證明單一COI基因能區分所有物種。採樣、萃取、擴增、定序、參考庫品質與分類審核仍會影響整體結果。

## 可用原始素材

| 素材 | 已查核狀態 | 建議用法 |
| --- | --- | --- |
| `work/keynote-12/assets/case08-deepcoi-figure1.jpg` | 本次重看，709×534，完整作者四面板。論文CC BY-NC-ND 4.0 | 供來源查閱或深入附圖。主畫面字太小。保留原圖與署名，不拆面板、改色、加譯字或動畫化原圖。 |
| `work/keynote-12/image-revision/assets/source-a/case08-deepcoi-figure5-original.jpg` | 本次重看，709×432，曲線、熵值與四種Aedes序列對齊。相同論文授權 | 不適合科普入口；不把原圖重畫後聲稱已取得改作授權。 |
| [作者Aedes原始對齊FASTA](https://github.com/DMnBI/DeepCOI-reproduce/blob/82c16e9ebec3e795352d33a7a6f26cca5d3c923c/Figure5/Aedes_four.msa.fasta) | 35,328 bytes，50筆記錄、五種；每筆658個對齊欄位。已保存於本案sources，含標本ID與物種名 | 檔名的`four`不能證明物種數。可取有來源的短序列片段，清楚標為「作者公開序列示例／對齊資料」。這是資料，不能說是本次模型成功辨出的案例。若畫圖，自己排版資料，不仿製期刊Fig. 5。 |
| [作者README輸出格式](https://github.com/DMnBI/DeepCOI#23-predict) | query ID、rank、label、score；repo標MIT | 可自製少量可編輯文字示意。不要沿用任意分數營造本次實測結果。 |
| 本案保存的Fig. 3 CSV | 40列，八門×五階層，作者公開結果資料 | 可依資料自己設計簡單圖表，署名並寫清平均方式。不要當成新的模型評估。 |

2026-10-27獨立重數FASTA標頭，五種分布為A. nigromaculis 15筆、A. sollicitans 9筆、A. taeniorhynchus 11筆、A. mitchellae 8筆、A. sierrensis 7筆。論文Fig. 5圖示四種與這份檔案實含五種是不同事實，不能互換。動畫可另挑四種各一筆、展示第348至367個對齊欄位，但這只是20字母的教學子集，既不代表各物種的全部變異，也不證明這20個字母足以辨認物種。欄位座標是多序列對齊位置，不是所有記錄去除gap後的核苷酸位置。

論文與期刊圖的[CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/)允許在條件內分享未改作素材，並不授權散布改作版本。作者程式與重現資料在論文Data availability明列MIT；兩種授權不能互換。若後續複製作者repo的資料或程式，附其Copyright (c) 2025 DMnBI及MIT授權。來源資料可支持自製解說，但本次沒有製作任何圖像或動畫。

## 後續可直接採用的科普結論

> 一段DNA條碼要變成物種資訊，前面仍需要採樣和定序。DeepCOI學習大量動物COI序列，再逐條提出從大類到物種的分類。它讓研究者更快整理條碼，但分類庫缺少的物種、過短或品質不佳的序列，仍可能無法得到可靠的種名。

建議後續畫面只先表達「研究者採樣與定序 → 已定序條碼 → AI提出階層標籤 → 研究者檢查」。A/C/G/T短片段可用作者公開序列，或明標概念示意。暫不設定模型分數，不把測試分母矛盾藏進視覺。

## 本次查核證據

- `sources/source-checks-v01.json`保存固定commit、下載小檔大小與SHA-256、Table 5加總、作者test標籤彙總、Fig. 3逐階層平均。只做算術與檔案檢查，沒有模型推論。
- `sources/deepcoi-figure3-scores.csv`與`sources/Aedes_four.msa.fasta`是作者的小型原始資料；`sources/LICENSE-DeepCOI-reproduce.txt`保存MIT授權。
- 補充DOCX入口本次未成功取得，未假裝讀過補充表。沒有下載整套資料、模型或大檔預測，沒有將任何內容加入正式頁面。
