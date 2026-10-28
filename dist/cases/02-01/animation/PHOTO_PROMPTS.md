# 02-01 寫實生成照片 v01

使用內建 imagegen。用途為動畫中的相機照片示意，不是研究實拍或模型推論結果。每張獨立生成／編輯；原圖、裁切、縮圖、人工回查均重用同一張素材。

## clear-jaguar-v01.png

```text
Use case: photorealistic-natural.
Asset type: a single synthetic camera-trap photograph for a science explainer about sorting wildlife photographs. This must look like an ordinary field camera photograph, NOT a drawing, painting, 3D render, diorama, wildlife poster or polished cinematic wildlife portrait.

Scene: a modest lowland Amazonian rainforest animal trail with damp brown leaf litter, rough thin tree trunks, tangled natural understory and a few foreground leaves. Fixed unmanned camera at about knee height, moderately wide lens, landscape 3:2 frame. Natural dull overcast daylight, deep but readable forest shadows, realistic camera sensor texture, restrained colours, everything reasonably in focus. No bright studio lighting, artificial rim light, fog effects or extreme shallow depth of field.

Subject: one anatomically believable adult jaguar walking from left to right across the middle/lower area of the trail, naturally caught by the camera and not posing. Full body, head, paws and tail visible with space around the animal. Sturdy compact body, broad head, rounded ears, tan-yellow coat with irregular black rosettes containing central dark spots, shorter thicker tail than a leopard. Make the jaguar large enough to inspect, about half the image width and one third of its height, centred around x=53%, y=61%. Four anatomically correct legs with a natural walking stride. Not aggressive, no prey, no other animals.

This image will be reused unchanged for the full image, detection box, enlarged crop, thumbnail and human review. Give it clear natural detail, no fabricated scientific overlays.
No text, date stamp, timestamp, lettering, labels, boxes, arrows, watermark, logo, camera body, people, interfaces, grids or borders. One ordinary field-photo frame, not a contact sheet. Landscape aspect ratio 3:2.
```

## night-tapir-v01.png

```text
Use case: photorealistic-natural.
Asset type: one synthetic infrared camera-trap photograph for the same science explainer. Make it genuinely photographic in appearance, not a drawing, illustration, CGI animal or dramatic movie still.

A low, fixed, unattended field camera looks across a narrow forest trail in lowland South American rainforest at night. One adult South American lowland tapir (Tapirus terrestris) crosses the middle of the frame in side/three-quarter view. Show the full body with room around it: heavy rounded torso, short sturdy legs, small rounded ears with pale edges and a short flexible proboscis. No stripes or spots, no elephant trunk, no horns. Realistic anatomy, one animal only.

This is an ordinary monochrome near-infrared field-camera image: black and white / neutral grey only, dim background, nearer leaf litter and animal brighter from infrared illumination, modest sensor noise and slight motion softness on one moving leg. Some eye shine is natural but do not make glowing neon eyes. Low contrast deep forest trunks remain faintly visible. The animal occupies approximately 40% of image width and 40% of height around the centre, with all limbs and snout within the frame. Fixed wide-ish lens at knee height. No artificial vignette, stylized blur or cinematic spotlight.

No text, timestamp, date, letters, logos, watermarks, detection boxes, labels, borders, interface, arrows, people or visible camera. No extra animals. Landscape 3:2 frame. This is a synthetic illustrative photograph, not a real research observation; that notice will be placed outside the image by the webpage.
```

## occluded-cat-v01.png

編輯目標：`clear-jaguar-v01.png`，保留同一機位與寫實相機風格，建立獨立遮蔽影像。

```text
Use case: precise-object-edit.
Edit the supplied synthetic photographic camera-trap frame to make a SECOND, DIFFERENT camera-trap photograph demonstrating partial occlusion. Preserve the exact photographic medium, fixed low camera angle, 3:2 framing, rainforest location, natural dull daylight, colour and ordinary sensor texture. This is a photo, not illustration, not CGI.

Replace the clearly exposed foreground jaguar with a single spotted cat farther back on the trail, in the middle-right understory. Its position is different in this still frame, as if a separate photograph were captured. Existing natural foliage, thin trunks and leaves partly block it: approximately 50 to 65 percent of the animal is obscured, especially much of the head and some legs. The visible flank still has believable spotted fur and a compact cat-shaped body, with perhaps a small part of an ear or cheek visible. Do not make a green transparent overlay; actual opaque leaves and stems must sit in front of the animal, with correct depth and natural lighting. Keep enough visible animal that a viewer can locate a partly hidden cat, but do not give a clean view of the face or all four legs. The visible animal occupies roughly a third of image width, deeper in the scene, not filling the foreground.

Remove the original unoccluded animal completely; there is only ONE animal. Restore ordinary forest floor where it previously stood. Keep the forest composition and camera viewpoint consistent, avoid arbitrary extra props. No crop, no zoom, no artificial blur to mimic occlusion. Do not add a second animal, human, camera body, text, date, timestamp, label, score, bounding box, arrows, watermark, logo, border or graphic. Landscape 3:2, one finished field-photo-style frame.
```

## empty-forest-v01.png

編輯目標：`clear-jaguar-v01.png`，移除動物，保留無可見動物的森林照片。

```text
Use case: precise-object-edit.
Edit only the single animal out of the supplied synthetic camera-trap photograph. Remove the jaguar completely, including paws, tail and its animal-specific shadow. Fill the vacated area with plausible uninterrupted damp leaf litter and the natural forest trail continuing into the existing rainforest.

Strictly preserve the fixed camera viewpoint, 3:2 framing, all surrounding vegetation and trunks, ambient overcast daylight, original photographic texture, colours and exposure. It should look like the same unattended camera photographed the trail when no animal was visibly present. No blur or smudge over the removed animal; use convincing continuous natural detail.

This is an EMPTY FOREST camera frame: no animals, humans, animal silhouettes, hidden eyes, camera equipment or invented objects anywhere. No text, timestamp, date, bounding boxes, labels, arrows, interface, logo, watermark or border. Keep it a realistic ordinary camera photograph, never a drawing, painting, rendering or stylized background.
```
