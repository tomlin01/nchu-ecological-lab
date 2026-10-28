# AMI 真實監測照片與作者標註

2026-10-20 取得並實際查看三張原始照片。素材取得階段沒有生成、改圖、重採樣或執行模型；之後本輪已在三張完整原圖上執行官方 MobileNet 物體偵測，輸出保存在 `assets/detector-results.json`。本輪沒有執行物種分類器、人工物種鑑定或個體追蹤。2026-10-21 已將此版本接回本地主站，未公開部署。下列取圖與原始標註紀錄保留其取得時的脈絡；實際動畫的局部選取見 `assets/sample.json`。來源為 [Jain et al.（2024），Insect Identification in the Wild: The AMI Dataset，v2](https://zenodo.org/records/12554005)，DOI `10.5281/zenodo.12554005`。

## 可直接使用的原圖

共同目錄：`sources/ami_traps/ami_traps_dataset/images/`。

| 原檔名 | 原檔與 EXIF 一致的時間 | 尺寸 | 作者標註框數 |
|---|---|---|---:|
| `20230721230832-00-34.jpg` | 2023-07-21 23:08:32 | 4096 × 2160 RGB | 14 |
| `20230721232832-00-35.jpg` | 2023-07-21 23:28:32 | 4096 × 2160 RGB | 26 |
| `20230721234832-00-35.jpg` | 2023-07-21 23:48:32 | 4096 × 2160 RGB | 21 |

三圖合計 3,757,263 bytes。它們的伴隨 metadata 均標 `WesternEurope`，沒有國家、站點或部署 ID。EXIF 保留 `DateTimeOriginal`、`DateTime` 與原始 `TimeZoneOffset=1`；本輪不另推定精確地點或已校準時區。

三張相隔各 20 分鐘，白板紋理與照明外觀相似。但**不能僅據此宣稱已確認同站點、每次連續曝光，或同一隻蛾的移動軌跡**。適合用作「同晚近時的跨照片比較」，不作個體追蹤真值。若劇本一定需要確認的同一個體連續影格，這組素材尚不能滿足該聲明。

建議照片說明：**AMI 公開監測照片，西歐地區；2023-07-21 23:08:32／23:28:32／23:48:32（原檔時間）。** 不把它們稱為本案自己拍攝或英國指定站點實拍。原圖本身不是模型輸出；本輪偵測框另保存在結果檔中，顯示時疊加，不修改原始 JPEG。

## 素材授權依據

[Zenodo 官方資料集 API](https://zenodo.org/api/records/12554005) 的 `metadata.license.id` 明列 **`mit-license`**；這是**資料集本身**的發布標示，不是從另一套程式的 MIT 授權推論照片權利。原紀錄已保存在 `sources/zenodo-record.json`。

包內 `sources/ami_traps/readme.txt` 明確說明，`ami_traps_dataset` 包含原始 camera-trap 圖片與 YOLO 標註。所選三圖均來自此目錄，沒有使用另部分的 AMI-GBIF 第三方照片。

作者的 [AMI Dataset 官方 repository](https://github.com/RolnickLab/ami-dataset) 連到此資料集系列。其完整 [MIT LICENSE](https://raw.githubusercontent.com/RolnickLab/ami-dataset/b75b7f8b1c18c5721e89c4fac0d77e283b866496/LICENSE) 已原樣保存於 `sources/ami-dataset-repository/LICENSE`，版次固定為 commit `b75b7f8b1c18c5721e89c4fac0d77e283b866496`，含 `Copyright (c) 2024 RolnickLab`。重用時保留 copyright 與完整 permission notice；附上資料集署名，後續若裁切或加框，另標示改作。不要改標 CC BY／CC0，也不要將此授權延伸到來源不明的其他 AMI 測試圖。

建議署名：**Jain et al. (2024), Insect Identification in the Wild: The AMI Dataset, v2, DOI: 10.5281/zenodo.12554005. Copyright (c) 2024 RolnickLab. MIT license.**

## 原始標註與適合放大的位置

`labels/` 保存同名原始 YOLO `.txt`，`metadata/` 保存同名原始 `.json`；`classes.txt` 與 `notes.json` 保留作者的類別對照與階層。資料的類別不只到物種，亦含屬、科、目、`Non-Moth` 與 `Unidentifiable`。原標註沒有本輪模型信心分數或跨圖個體 ID。

第一張下方偏右的大型斑紋蛾適合作主放大目標。作者將它標為 **Hydriomena furcata**，YOLO 正規化框為 `cx=0.64746, cy=0.78583, width=0.06013, height=0.08435`。以原圖左上角為原點，約對應 `x=2529–2775, y=1606–1788`；可在顯示時加留白放大，但保留原圖。這是**作者資料集標註**，不是本輪 AI 的實際預測，也不是我重新做的分類鑑定。

第二張有多隻較細長蛾；第三張下方偏右有另一隻大型蛾，作者標為 **Philereme transversata**。不能把這兩隻大型蛾接成同一個體。第三張左下角的大型模糊物，作者標為 `Unidentifiable`，不可顯示成已確認物種。圖中的框數包括非蛾及無法辨識目標，不能相加成獨立個體數或區域密度。

## 取得與驗證方式

原始下載端點為 [官方 Archive.zip](https://zenodo.org/api/records/12554005/files/Archive.zip/content)，整包大小 16,009,517,474 bytes。本輪沒有下載整包，僅用官方支援的 HTTP Range 讀取 ZIP64 中央目錄及所選原圖／標註／說明檔；沒有繞過登入、存取限制或付費門檻。

每個已取檔案均核對 ZIP 中央目錄的未壓縮大小與 CRC32，三張原圖成功解碼；檔名時間與 EXIF 時間一致，標註框位於圖像範圍內。完整壓縮檔 MD5 因未下載整包而**未**驗證，不能誤稱整包 checksum 已通過。

精確 archive member、HTTP byte range、本地路徑、SHA-256、原 metadata、EXIF 與全部所選框位均存於 `asset-source.json`；取檔紀錄在 `sources/extraction-log.json`。原 JPEG 與原標註 bytes 完整保留。之後網頁只需打包實際使用的照片、必要標註與授權，不需攜帶檔案索引或整個研究工作目錄。
