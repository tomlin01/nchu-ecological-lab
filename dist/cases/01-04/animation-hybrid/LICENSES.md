# 素材與工具

## 真實照片與資料集標註

來源為 Jain 等的 [Insect Identification in the Wild: The AMI Dataset，Zenodo v2](https://doi.org/10.5281/zenodo.12554005)，只使用 AMI-Traps 部分的三張照片與對應標註。Zenodo 資料集紀錄標示 MIT 授權；作者資料集儲存庫的完整授權隨附於 [DATASET-LICENSE.txt](assets/DATASET-LICENSE.txt)。作者名單、來源、原檔名、時間、雜湊與選取方式見 [SOURCE.md](SOURCE.md)。未將 AMI-GBIF 的第三方照片授權合併推定。

原照片不作修補。頁面裁切與放大屬於呈現方式，回查原圖保留完整照片。

## 設備 SVG

沿用本專案原版 Anatomy 設備示意，參考 UKCEH 2024 V4.0 手冊構造。沒有嵌入手冊照片，也不把示意設備稱為這組照片的實際硬體。Anatomy 採 MIT 授權，完整文字另附 `assets/ANATOMY-LICENSE.txt`。

## 本次偵測

推論使用官方 AMI Companion 的 MobileNet detector 與公開 checkpoint。固定程式版本、權重hash與本地執行紀錄保存在專案 `work/ecology-ai-rollout/cases/01-04/hybrid-v02/inference/`。前端只呈現保存結果，不下載或執行模型。

上游 Companion 的 LICENSE 為 AGPL-3.0，套件metadata仍標MIT，兩者不一致。這份說明沒有把程式授權擴張成模型或照片的授權。本交付不散布 checkpoint 或上游推論程式；物體偵測輸出與資料集作者的物種標註分開保存。

## 播放器與字型

本地 GSAP 3.13.0 保留原標頭，條款見 [GSAP standard license](https://gsap.com/standard-license/)。Noto Sans TC 與 Noto Serif TC 子集採 SIL Open Font License 1.1，完整文字隨 `fonts/*-OFL.txt` 提供。
