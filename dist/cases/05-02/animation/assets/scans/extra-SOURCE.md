# v08 新增珊瑚外形掃描

取得日期：2026-10-26。只下載下列兩件原始 GLB。使用者參考照片已重新檢視，選型目的是增加圓丘腦紋與層疊葉片兩類輪廓。

這些是 Smithsonian 乾燥博物館標本的掃描。模型只作外形基礎，不是照片內同一株珊瑚，不是 Abaiang 物種分布或活體顏色觀測。場景配色是示意設定。

## 已下載模型

| 模型 | 外形 | 檔案 | 三角面 | 貼圖 |
|---|---|---:|---:|---|
| Diploria labyrinthiformis / USNM 74947 | 圓丘狀腦紋群體；底部有採集斷面，官方預覽未見黑色展示底座。 | 6.09 MB | 100,000 | 3 張內嵌 JPEG（2048×2048, 2048×2048, 2048×2048） |
| Pavona cactus / USNM 74851 | 低矮、相接的層疊葉片群體；官方預覽未見黑色展示底座。不是先前 Leptoseris 碎片。 | 10.84 MB | 149,999 | 3 張內嵌 JPEG（4096×4096, 4096×4096, 4096×4096） |

Pavona 官方未壓縮下載是 150k / 4096 版本，實際 149,999 三角面、10.84 MB，仍低於本次每件 12 MB 限制。沒有為追求 100k 自行修改原模型。

## 逐件來源與 CC0

### diploria-labyrinthiformis.glb

- [官方物件紀錄](https://3d.si.edu/object/3d/diploria-labyrinthiformis%3A87738412-3acd-45d1-bff4-3ab67093470e)：採集地 Carrie Bow Cay, Belize, North Atlantic Ocean；日期 1985-08-10；Preparation = Dry。
- [逐件授權與下載清單](https://ids.si.edu/ids/media_view?id=3d_package:87738412-3acd-45d1-bff4-3ab67093470e&format=json)：`usage.id = cc0`。原始回應保存在 `diploria-labyrinthiformis-rights.json`。
- [原始 GLB](https://3d-api.si.edu/content/document/3d_package:87738412-3acd-45d1-bff4-3ab67093470e/resources/usnm_74947-100k-2048_std.glb)
- [官方 scene metadata](https://3d-api.si.edu/content/document/87738412-3acd-45d1-bff4-3ab67093470e/document.json)
- SHA-256：`c55301c7ae8d2b829f855b69f6943a4ead345e727860fa77ce1617b43496af03`

### pavona-cactus-74851.glb

- [官方物件紀錄](https://3d.si.edu/es/object/3d/pavona-cactus%3A1b481481-8f5d-492e-8b52-23a6fe2d9cd9)：採集地 Ylig Bay, Guam, North Pacific Ocean；日期 1970-07-25；Preparation = Dry。
- [逐件授權與下載清單](https://ids.si.edu/ids/media_view?id=3d_package:1b481481-8f5d-492e-8b52-23a6fe2d9cd9&format=json)：`usage.id = cc0`。原始回應保存在 `pavona-cactus-74851-rights.json`。
- [原始 GLB](https://3d-api.si.edu/content/document/3d_package:1b481481-8f5d-492e-8b52-23a6fe2d9cd9/resources/Pavona_cactus-150k-4096_std.glb)
- [官方 scene metadata](https://3d-api.si.edu/content/document/1b481481-8f5d-492e-8b52-23a6fe2d9cd9/document.json)
- SHA-256：`4af75a0510a958d4a9bccf44fee46ce78982babb1d0387bf5c41a1ff2fd799dc`

## 檔案驗證與整合

- 兩件皆 1 mesh、1 primitive、1 material。無 Draco，無外部貼圖依賴。
- 原始貼圖角色是 base color、occlusion、normal；已逐張解碼。保留 normal 與 AO 可維持腦紋和葉片細節。
- GLB 版本、宣告長度、三角面數、內嵌 JPEG 解碼、SHA-256 及目的端複製一致性均通過。
- 單位為公尺，完整 bounds 與 extent 在 `provenance.json`。
- Diploria 下部可見採集斷面，整合時可讓該面埋入礁體；未切除或變更原始幾何。
- 模型預覽未見黑色展示底座。此判讀來自官方縮圖；整合後仍須從實際鏡頭檢查外觀、朝向與效能。
- 目的端：`work/ecology-ai-rollout/cases/05-02/three-study-v08/assets/scans/`。只複製兩件新 GLB，未更動既有兩件 base GLB。

## 未下載的候選

- Porites lobata：縮圖是塊狀採集標本，輪廓較不完整。
- Pseudodiploria strigosa：與已選 Diploria 同為腦紋；採集斷面較大，未額外取模型。
- Pavona cactus USNM 79226：較高而稀疏的葉片群體；本次採用較低矮且完整感較強的 USNM 74851。
