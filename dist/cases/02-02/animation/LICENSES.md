# 02-02 v04 素材、模型與授權

本影片包含不同權利來源。以下分別記錄素材、模型與字型，不把整部影片視為單一開放授權的素材包。

## NPS 斑點鴞錄音

- 來源：[NPS Sound Gallery – Spotted Owl](https://www.nps.gov/subjects/sound/sounds-spotted-owl.htm)。
- 作者署名：**National Park Service（NPS）**；地點為 Yosemite National Park, California, USA。
- 依原頁 NPS 署名及 [NPS Ownership 政策](https://www.nps.gov/aboutus/disclaimer.htm)，本音檔判定為 **public domain in the United States（美國公有領域）**。這是根據作者與政策作出的權利判定，不是 CC 授權，也不延伸到 NPS 網站上的第三方素材。
- 個人錄音者、錄音日期與設備未列，保持未知。只使用物種級名稱 Spotted Owl／Strix occidentalis，不推定亞種。

建議保留署名：

> 鳥聲：美國國家公園管理局（NPS），美國加州優勝美地國家公園。斑點鴞真實錄音，作為教學樣本，非 Brunk 等（2025）的研究錄音。美國公有領域。

交付包含原 MP3、重採樣後的教學 WAV，以及影片內的 AAC 聲音。影片在 32、40、64 秒重播同一個完整短樣本，混音音量乘以 0.8；沒有合成鳥叫。波形包絡與聲譜由這份音檔計算。未使用 NPS 標誌，亦不表示 NPS 為本片背書。

完整來源與格式處理紀錄位於專案 `work/ecology-ai-rollout/cases/02-02/prototype-v04/audio-source.md`、`audio-provenance.json` 及 `sound-provenance.json`。

## 錄音器照片

`assets/recorder-brunk.jpg` 與影片中的錄音器照片：**© Kristin Brunk／Cornell**。

來源：[EurekAlert 研究報導素材頁](https://www.eurekalert.org/multimedia/1064135)。本專案僅在介紹這項研究的報導情境中使用，保留作者署名。它是受著作權保護的報導照片，不是可任意另作獨立素材使用的開放圖庫照片；其他用途應向權利人確認。

## 專案生成圖像

森林、斑點鴞、黑背啄木鳥與甲蟲幼蟲圖像，由本專案使用內建 imagegen 生成。三張同視角森林圖是教學對照，不是現場前後攝影；幼蟲是放大示意，沒有實測尺度。

- 森林三圖的原始 PNG、提示詞及生成紀錄：`outputs/ecology-ai-rollout-assets/02-02/v04/`。
- 鳥與幼蟲沿用 v03，原始 PNG、提示詞及生成紀錄：`outputs/ecology-ai-rollout-assets/02-02/v03/`。
- 交付使用對應 WebP，保留「生成情境」與「幼蟲放大示意」標示。

這份文件未替生成圖像新增對外再授權條款。

## BirdNET+ 模型與官方程式

本次一次教學推論使用 **BirdNET+ V3.0 model developer preview，Preview 3.1，Global 11K、FP16 pruned ONNX**。

模型署名：**Lasseck, Eibl, Klinck & Kahl（2026）**，DOI [10.5281/zenodo.20703646](https://doi.org/10.5281/zenodo.20703646)。Zenodo 標示模型授權為 **CC BY-SA 4.0**；授權全文見 [Creative Commons Attribution-ShareAlike 4.0](https://creativecommons.org/licenses/by-sa/4.0/)。發布者另附 `TERMS_OF_USE.txt`，列出研究與評估定位、署名要求，以及禁止盜獵與軍事用途等條款；模型再使用時應一併閱讀原文件。

官方程式來源為 [birdnet-team/birdnet-V3.0-dev](https://github.com/birdnet-team/birdnet-V3.0-dev)，本次固定 commit `623dec2605c0b9dcde36b9ae320f4fbda22c57ea`。官方示例程式採 **MIT License，Copyright (c) 2025 BirdNET-Team**。模型授權、官方程式授權與結果分數是不同項目。

原授權及條款保存於完整專案：

- `work/ecology-ai-rollout/cases/02-02/prototype-v04/inference/TERMS_OF_USE.txt`
- `work/ecology-ai-rollout/cases/02-02/prototype-v04/inference/official-LICENSE`
- `work/ecology-ai-rollout/cases/02-02/prototype-v04/inference/zenodo-record.json`

**交付資料夾不散布模型權重或官方推論程式。** 它提供教學音檔、圖解和結果 JSON；網頁不會下載模型。預覽模型與 Kahl 等（2021）的 CNN、Brunk 等（2025）的客製研究版本分開說明，沒有以新版本推論冒充舊研究重現。

## 網頁字型

Noto Sans TC 與 Noto Serif TC 的網頁子集採 **SIL Open Font License 1.1**。隨附授權全文：

- [fonts/NotoSans-OFL.txt](fonts/NotoSans-OFL.txt)
- [fonts/NotoSerif-OFL.txt](fonts/NotoSerif-OFL.txt)

重新散布字型時應保留相應授權。字型條款不會把所有影片內容或圖片改成同一授權。

## 製作工具與研究引用

ManimGX、FFmpeg、Python 與分析套件用於製作影片及資料圖；它們的執行環境沒有隨本資料夾散布。本版前端使用原生 HTML video、CSS 與 JavaScript，沒有 GSAP。

研究與自然史頁面在本案中作為引用來源，不表示取得其整頁內容或照片的重製權：

- [Kahl 等（2021），BirdNET 方法](https://doi.org/10.1016/j.ecoinf.2021.101236)
- [Brunk 等（2025），森林與鳥類研究](https://doi.org/10.1002/fee.2843)
- [Cornell：Spotted Owl 生活史](https://www.allaboutbirds.org/guide/Spotted_Owl/lifehistory)
- [Cornell：Black-backed Woodpecker 生活史](https://www.allaboutbirds.org/guide/Black-backed_Woodpecker/lifehistory)

本版沒有重製原論文圖表，未套用舊版研究地圖的資料授權。
