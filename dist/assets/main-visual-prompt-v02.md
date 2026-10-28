# 主題一主視覺修正 v02

修正使用者指出的兩處錯誤：AUV 過大且像飛彈；藻類出現在水面上空。使用內建 imagegen 編輯，原 v01 保留。

輸入一：`topic-01-main-v01.png`，編輯目標。
輸入二：`outputs/ecology-ai-site-v01/cases/01-03/assets/01-03-plankton-main.webp`，只參考微藻的透明細胞外觀。
預定輸出：`topic-01-main-v02.png`；網頁版：`outputs/ecology-ai-site-v01/assets/topic-01-main-v02.webp`。

## 編輯提示詞

```text
Use case: precise-object-edit.
Image 1 is the EDIT TARGET: the wide dark-green exhibition hero with zebras, a foreground sperm whale, a rear water specimen, and a moth on a board. Image 2 is a SUPPORTING REFERENCE ONLY for the translucent microscopic green-gold phytoplankton appearance. Do not replace the composition with Image 2.

Correct ONLY the rear blue-green water specimen and the microalgal models standing above it. The user identified two errors: the underwater research instruments are oversized and look like missiles, and the algae are in the sky.

1. Completely remove every green cell model ABOVE that rear water surface, all vertical metal stems and their dark mounting plinth. Restore the quiet dark-green background behind the removed models. No algae, rods, stands, plinth or floating ornament may remain above the waterline.
2. Show the phytoplankton UNDERWATER, suspended in the upper/front part of that same small blue-green water specimen. Use two or three delicate translucent green-gold round or oval microalgal cells, inspired by Image 2. Make this a restrained, clearly illustrative microscopic close-up blended into the near-water foreground. Cells are magnified for recognition, not giant organisms at the literal vehicle scale. Include the surrounding water, blue attenuation and soft suspended particles, so the organisms unmistakably live in water. No plants with stems, no seaweed, no coral-shaped algae, no airborne organisms. Keep every cell wholly beneath the visible water surface and inside this rear specimen. No circular magnifying lens, bubble frame, ruler or annotation.
3. Replace the two large missile-like objects with two MUCH SMALLER autonomous underwater research vehicles, each about ONE THIRD of the old vehicle length and less than one quarter of the water specimen width. Place them deeper/back in the same water volume, with ample open water. They are secondary details. Use restrained muted yellow and ivory equipment housings, a rounded blunt nose, subtle dark sensor band and tiny rear propulsor. Slim practical research instruments, without pointed warheads, large triangular fins, rockets, weapon markings, glowing beams or contrails. Do not exaggerate their equipment details or turn them into large submarines.

Strict invariants: preserve the complete foreground sperm whale and its ocean cutaway, both zebras and grassland fragment, the tiny flying drone, the moth and its upright board, plants outside the corrected specimen, left-side dark negative space, camera, framing, lighting, tactile texture, colour treatment, overall positions and size relationships of all OTHER objects. Do not crop or zoom. Preserve the wide 16:9 canvas and the original composition. Do not add any new scene or object. No text, numbers, labels, logos, arrows, sonar or data graphics. Output one edited finished illustration.
```
