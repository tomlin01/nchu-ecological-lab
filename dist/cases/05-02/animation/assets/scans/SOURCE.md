# Smithsonian 珊瑚掃描素材來源

取得日期：2026-10-26。限定下載 3 件官方 GLB，未登入、未購買、未下載整個典藏。

這些模型用於 05-02 的本機 Three.js 外形研究。參考圖是使用者提供的 `Science_coral_1283902606.webp`。選型依據是照片裡的密集短分枝、緊密群體與葉片形態；模型不是由該照片重建，也不是照片中同一株珊瑚。

## 來源與授權

各件官方 IDS media metadata 的 `usage.id` 均是 `cc0`，下載自 `3d-api.si.edu`。逐件原始授權回應保存在 `*-rights.json`。官方 scene metadata 保存在 `*-document.json`。

所有模型都是乾燥標本的骨骼掃描；原始顏色不是水下活體顏色。若在場景中加上紫色、黃色或其他顏色，應說明為示意配色，不可說是活體顏色觀測或照片反演。

| 模型 | 形態用途 | 檔案大小 | 三角面 | 貼圖 |
|---|---|---:|---:|---|
| Pocillopora damicornis caespitosa（USNM 81450） | Dense short branching colony; no display base visible in official preview. | 6.57 MB | 100,000 | 3 張 JPEG、2048 × 2048、GLB 內嵌 |
| Pocillopora damicornis（USNM 44359） | Compact thick branching colony; no display base visible in official preview. | 6.75 MB | 99,996 | 3 張 JPEG、2048 × 2048、GLB 內嵌 |
| Leptoseris gardineri（USNM 93447） | Thin lobed foliose specimen; no display base visible in official preview. This is a specimen, not a whole table coral colony. | 4.66 MB | 100,000 | 3 張 JPEG、2048 × 2048、GLB 內嵌 |

## 逐件官方證據

### pocillopora-81450.glb

- [官方物件頁](https://3d.si.edu/object/3d/pocillopora-damicornis-caespitosa:14eb9321-2308-4878-8adb-831d078ba0b0)
- [逐件 CC0 與下載清單](https://ids.si.edu/ids/media_view?id=3d_package:14eb9321-2308-4878-8adb-831d078ba0b0&format=json)
- [原始 GLB 下載](https://3d-api.si.edu/content/document/3d_package:14eb9321-2308-4878-8adb-831d078ba0b0/resources/usnm_81450-100k-2048_std.glb)
- [官方 Voyager metadata](https://3d-api.si.edu/content/document/14eb9321-2308-4878-8adb-831d078ba0b0/document.json)
- SHA-256：`0172ea2f723be4fa90e120becb4133cbc4da5ff3dc64ea5b3f9d6cbf26a0ef85`

### pocillopora-44359.glb

- [官方物件頁](https://3d.si.edu/object/3d/pocillopora-damicornis:5dbbb9af-2a48-4665-839e-e66faf13ff85)
- [逐件 CC0 與下載清單](https://ids.si.edu/ids/media_view?id=3d_package:5dbbb9af-2a48-4665-839e-e66faf13ff85&format=json)
- [原始 GLB 下載](https://3d-api.si.edu/content/document/3d_package:5dbbb9af-2a48-4665-839e-e66faf13ff85/resources/usnm_44359-100k-2048_std.glb)
- [官方 Voyager metadata](https://3d-api.si.edu/content/document/5dbbb9af-2a48-4665-839e-e66faf13ff85/document.json)
- SHA-256：`31fa5dce1d14edbea6a2fbef8fe91f01ee80c2e5455b9ff3b6234d2e3a29e40c`

### leptoseris-gardineri.glb

- [官方物件頁](https://3d.si.edu/object/3d/leptoseris-gardineri:d8e61d2a-b986-4482-9733-fc1d5a6380b9)
- [逐件 CC0 與下載清單](https://ids.si.edu/ids/media_view?id=3d_package:d8e61d2a-b986-4482-9733-fc1d5a6380b9&format=json)
- [原始 GLB 下載](https://3d-api.si.edu/content/document/3d_package:d8e61d2a-b986-4482-9733-fc1d5a6380b9/resources/usnm_93447-100k-2048_std.glb)
- [官方 Voyager metadata](https://3d-api.si.edu/content/document/d8e61d2a-b986-4482-9733-fc1d5a6380b9/document.json)
- SHA-256：`7af7aba9fa64c3bebf5fafbcb1c09bd82723361ffaba73678e96d879d1deb8ef`

## 整合注意

- 每件只有 1 mesh、1 primitive、1 material；皆無 Draco，沒有外部貼圖依賴。
- 原始貼圖包含 base color、occlusion、normal。保留 normal/occlusion 可呈現珊瑚杯與細節。
- 官方下載標示單位為公尺；尺寸與 bounds 可查 `provenance.json`。用 Box3 正規化模型尺寸並將底部落在礁體表面。
- 原檔 material 的 metallicFactor 為 0.1、roughnessFactor 約 0.8。情境材質可在載入後調整，原檔保留不變。
- 81450 適合中型密集短分枝；44359 適合較低矮、厚實的群體。Leptoseris 是葉狀標本，不應稱作完整桌狀群體。
- 三個 GLB 的雜湊、檔案長度、mesh accessor 數量、嵌入 JPEG 可解碼均已檢查。這是檔案層級驗證；整合頁面仍需實際瀏覽器載入與外觀檢查。

## 比對後未下載的候選

- Acropora secale、Madrepora hyacinthus、Madrepora surculosa、Echinopora reflexa：官方預覽可見黑色展示底座，未取其 GLB。
- Pocillopora damicornis USNM 46926：形體過於瘤狀，未取其 GLB。

## 官方背景

- [Corals 主題典藏](https://3d.si.edu/corals)
- [Shape & Structure](https://3d.si.edu/corals/shape-structure)：提供 81450、44359、93447 的館藏與形態脈絡。
- [官方 3D API 文件](https://3d-api.si.edu/api-docs/)：說明模型搜尋與下載 API；本次以逐件 media metadata 作最終 CC0 證據。
