# 森林變了，怎麼知道哪些鳥還在？

02-02 的 v04 是一段 **84 秒**的科普影片與本地播放器。內容從同視角森林對照、兩種鳥的生活，走到真實斑點鴞錄音、聲音圖解及一次實際 BirdNET 教學辨識。

**狀態：技術檢查完成，等待使用者檢視（pending_user_review）。** 瀏覽器 34 項檢查通過，橫版已連續播放到 84 秒，三段音訊與游標的時間核對通過。完整證據見專案 `work/ecology-ai-rollout/cases/02-02/prototype-v04/verification.json`。本版尚未成為已接受案例，不是正式四頁案例網站，也未公開部署。

## 本地觀看

預覽位址：<http://127.0.0.1:8862/index.html>。

若服務尚未啟動，在本資料夾執行：

```sh
python3 serve_preview.py --directory . --port 8862
```

此服務支援 HTTP byte ranges，供原生影片拖曳與章節定位。也可直接開啟下列 MP4。

| 檔案 | 規格 |
| --- | --- |
| [橫版影片](media/birdnet-mechanism-wide.mp4) | 1440 × 810，16:9，84 秒，30 fps |
| [窄版影片](media/birdnet-mechanism-portrait.mp4) | 864 × 1080，4:5，84 秒，30 fps |
| `media/poster-wide.jpg`、`media/poster-portrait.jpg` | 各畫幅的靜態開場 |
| `index.html`、`style.css`、`app.js` | 播放器、森林對照、文字與來源 |

兩支影片使用 H.264 畫面及 32 kHz 單聲道 AAC 音軌。按「播放（含鳥聲）」即可有聲播放；真實鳥叫從 32 秒開始，沒有旁白。「聽這段鳥叫」會直接跳到 32 秒、解除靜音並播放。聲音開關可另行控制，影片不會自動播放。七個導航群組對應十一段圖外說明。

桌面與手機以 650 px 為切換點。換畫幅會保留時間並暫停；離頁、影片離開可見範圍或列印時也會暫停，不自動續播。無 JavaScript 時保留原生影片控制、三張森林圖與全文。列印保留三圖、文字與來源。

## 這支影片如何製作

| 部分 | 實際工作 |
| --- | --- |
| 森林、鳥與幼蟲圖像 | 使用專案生成的寫實情境圖。三張森林圖保留相同視角，供比較樹冠與林下；不是實測前後照片。幼蟲為放大示意。 |
| 錄音器 | 使用 Kristin Brunk／Cornell 研究報導照片，保留署名與限定用途。 |
| 波形與聲譜 | 從真正送入推論前的 32 kHz 聲音計算。波形以 800 個區段的峰值振幅包絡顯示；聲譜使用實際 STFT，不是裝飾線。 |
| ManimGX | `ForestToBirdNET` 場景編排圖片、波形、聲譜、訊號游標及教學流程，分別輸出橫版與窄版無聲畫面。 |
| FFmpeg | 把同一段約 5.303 秒錄音放在 32、40、64 秒，混合音量乘以 0.8，補足其他靜音時段，再編碼為交付影片。沒有合成鳥叫或旁白。 |
| 原生 HTML 影片 | `video.currentTime` 是唯一播放時鐘，驅動進度、導航和圖外文字。網頁不重演影片內容；本版沒有使用 GSAP。 |

聲譜顯示 0–3000 Hz，採 1024-sample Hann window、256-sample hop。亮度表示相對頻譜能量，不是校準聲壓或模型信心。這張圖供理解聲音使用，不是 BirdNET 的精確內部張量、注意力圖或判斷理由。

## 真正執行了哪個模型

教學樣本來自 **NPS 公開的 Yosemite 斑點鴞錄音**，不是 Brunk 等（2025）的研究錄音。本次使用官方 **BirdNET+ V3.0 developer preview 3.1，Global 11K、FP16 pruned ONNX**，在 CPU 上做了一次完整音檔推論。

原音完整解碼約 5.302857 秒；重採樣到 32 kHz 後，模型直接接收 `float32 [1, 169692]` 的 raw audio，約 5.302875 秒。整段作一個輸入窗，沒有切成 3 秒段、補零、重疊或套用地點／日期篩選。模型包含自己的聲音處理前端，另繪的 STFT 圖沒有送入模型。

第一候選為 **Spotted Owl／Strix occidentalis，模型分數 0.7352379560470581**，頁面顯示為 **0.735**。它不是 73.5% 正確率，也不是森林中的出現機率。示範仍標為待人工核對；NPS 的物種標記與模型結果一致，不能當成獨立準確率測試，亦未核對此音檔是否曾出現在模型訓練資料中。

這是現代預覽模型的教學推論，不是 Kahl 等（2021）的 CNN，也不是重現 Brunk 等（2025）客製 BirdNET 的研究流程。沒有重訓 BirdNET、重新分析該研究錄音或重擬合生態模型。[本次結果 JSON](assets/inference-result.json)隨頁面提供；模型權重沒有放進交付資料夾，前端也不下載或執行模型。

## 素材與原始碼位置

以下製作路徑均以完整專案根目錄為起點。

| 路徑 | 用途 |
| --- | --- |
| `work/ecology-ai-rollout/cases/02-02/prototype-v04/scene.py` | ManimGX 場景；本資料夾也有 [scene.py](scene.py) 副本。`BIRDNET_LAYOUT=portrait` 選擇窄版。 |
| `work/ecology-ai-rollout/cases/02-02/prototype-v04/build_media.py` | 渲染兩個畫幅、混入真實錄音、編碼 MP4 及擷取 poster。 |
| `work/ecology-ai-rollout/cases/02-02/prototype-v04/prepare_sound.py` | 計算峰值包絡與教學聲譜。 |
| `work/ecology-ai-rollout/cases/02-02/prototype-v04/audio-source.md`、`audio-provenance.json` | NPS 原音、權利依據與完整解碼紀錄。 |
| `work/ecology-ai-rollout/cases/02-02/prototype-v04/sound-provenance.json` | 波形與 STFT 的參數、資料及色彩意義。 |
| `work/ecology-ai-rollout/cases/02-02/prototype-v04/inference/README.md`、`result.json` | 固定模型、輸入、執行方式與全部分數的保存位置。 |
| `outputs/ecology-ai-rollout-assets/02-02/v04/` | 三張同視角森林 PNG、提示詞及 `provenance-v01.json`。 |
| `outputs/ecology-ai-rollout-assets/02-02/v03/` | 沿用的鳥與幼蟲 PNG、提示詞及生成紀錄。 |

本資料夾的 `assets/spotted-owl-teaching.wav` 是 **32 kHz 模型輸入 WAV** 的副本，與製作目錄 `inference/input-mono-32000.wav` 相同。製作目錄 `audio/spotted-owl-teaching.wav` 則是原 MP3 完整解碼的 44.1 kHz 版本；兩者不要混淆。原 MP3、聲譜圖、波形資料及推論結果也保存在本資料夾的 `assets/`。

在完整專案根目錄重製影片：

```sh
python3 -B work/ecology-ai-rollout/cases/02-02/prototype-v04/build_media.py
```

製作腳本使用專案既有的 ManimGX Python 環境及 FFmpeg；需要完整專案素材與工作目錄。本交付資料夾沒有附上整套製作環境或模型權重。各項素材權利與署名見 [LICENSES.md](LICENSES.md)。
