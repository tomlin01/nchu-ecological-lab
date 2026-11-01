# 05-05 ForTy 2020：來源與研究範圍

核對日期：2026-11-01。新增簡報為`outputs/ForTy_森林類型_新增單頁_4比3_20261101.key`，其SHA與原製作紀錄相同。已用OfficeCLI讀取對應的保存PPTX文字，並查看既有單頁渲染；未修改簡報。

## 主要來源

- [Neumann et al.（2026），Global forest typology at 10-meter resolution for forest and land-use monitoring](https://pmc.ncbi.nlm.nih.gov/articles/PMC13686961/)，Scientific Data 13:1434，[DOI](https://doi.org/10.1038/s41597-026-08299-5)。本輪重新閱讀全文的Methods、Figure 3／5與Technical Validation。
- [ForTy 2020 v1.0官方資料目錄](https://developers.google.com/earth-engine/datasets/catalog/projects_nature-trace_assets_forest_typology_forest_typology_2020_v1_0_collection)。核對輸出、類別與限制。
- [Google DeepMind研究介紹](https://deepmind.google/blog/beyond-tree-cover-mapping-the-worlds-forest-types/)。用於理解公開說明與另外發布的早期時間序列，不代替論文驗證。

## 本案採用的證據

本案以2020基線為主。六類涵蓋原生林、自然再生林、人工栽植林、集約經營人工林、樹作物與農林混作，以及其他土地。人工栽植林和集約經營人工林分開；作者使用40年輪伐門檻作操作代理，有區域適用限制。定義見論文Class definitions及官方資料目錄。

AI輸入主要是AlphaEarth Foundations整理的衛星特徵。三階段訓練使用專家／既有參考資料、偽標籤與多年資訊；最後一階段綜合2019–2024資料，再取2020輸出。這是回顧性基線，不是提前預測。專家提供訓練資料、檢查難例，並另作獨立驗證；這幾個角色不混成同一次確認。見論文Methods及Table 4。

Figure 3是澳洲東南部同一區域的不同圖層，每個面板範圍5公里×3.5公里。衛星影像與分類圖可作空間對照；分類是作者推估，不是另一年或地面真值。Figure 5則為不同地點的類型例子，不能當成同一塊森林的變化。

論文Table 7的全球六類整體準確率為90.22%，標準誤0.34%，包含其他土地；大面積的其他土地影響整體值。人工栽植林F1為58.2%，集約經營人工林為66.7%。F1與整體準確率不同，不畫成同一條改善曲線。驗證共抽9100點，以8190個完成專家共識點估計精度，另738點未完成共識、172點不確定；這些主要是影像與輔助資料判讀，不全部等於現地量測。見Technical Validation及Table 5／7。

10公尺是輸出網格大小，不是定位誤差或分類精度。相對信心未做事後機率校準，不能把0.9直接說成九成機率正確；模型推估的林型也不是碳量或生物多樣性的直接量測。見官方資料目錄Limitations。

官方另有2017–2025早期時間序列，本案暫不納入，以免把2020精度外推到逐年變化。

## 素材與署名

實際檔案、用途、大小與SHA列於`sources/asset-references.json`。先重用新增簡報的Figure 3 PNG和Figure 5 WebP，不再複製一組原圖。

論文標示CC BY 4.0。圖內衛星影像保留© Google Earth、Maxar Technologies、Airbus署名及原圖例／比例尺；局部裁切與生成情境分開標示。不另主張取得商業原始衛星影像產品的使用權。

此輪沒有下載全球柵格、重跑模型、產生像元分數或從圖版顏色推算面積。
