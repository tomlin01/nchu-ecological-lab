# 08-01 scene asset prompts v01

These assets are AI-generated concepts for the local 120-second eBird animation prototype. They are not real photographs, source observations, official eBird data, or evidence of bird occurrence.

- Method: built-in `image_gen.imagegen`.
- Execution: one new-image call per asset; no input images; no CLI or external API fallback.
- Saved PNGs: copied unchanged from the built-in default output location into `../assets/`.
- Inspection: both saved workspace PNGs reopened with `view_image`; bird alpha channel inspected separately.
- Human scientific and visual review remains the acceptance authority.

## Sagebrush environment

- File: `../assets/sagebrush-scene-v01.png`.
- Size: 1672 × 941 pixels, RGB, approximately 16:9.
- `transparent_background: false`.

```text
Use case: photorealistic-natural
Asset type: 16:9 landscape background plate for an educational eBird animation; an AI-generated concept environment.
Primary request: a wide North American sagebrush steppe landscape in soft morning light.
Scene/backdrop: silver-green sagebrush mixed with dry golden grasses on open arid land, with low rolling mountains in the distance and a pale natural morning sky.
Composition/framing: wide 16:9 landscape, plausible slightly elevated field viewpoint, horizon in the upper third. A narrow natural dirt walking path enters the lower-left corner, winds across the middle of the image and recedes toward the far-right distance. Distinct, naturally irregular foreground and midground sagebrush bushes provide useful occlusion edges. Preserve visible pockets of bare ground between bushes so separately animated small birds can later move through the scene.
Style/medium: photorealistic field-landscape image, natural botanical texture and restrained realistic color.
Lighting/mood: soft morning light, gentle shadows, calm clear conditions.
Constraints: no birds or other animals; no people; no buildings, fences, utility poles, vehicles, signs or structures; no text, labels, map graphics, logo or watermark. No exaggerated fantasy terrain. The path must be narrow and plausible. Generate a new original image with an opaque background.
```

## Sage Thrasher cutout

- File: `../assets/sage-thrasher-cutout-v01.png`.
- Size: 1536 × 1024 pixels, RGBA.
- `transparent_background: true`.
- Alpha is unchanged: 1,165,462 pixels are fully transparent; 407,402 pixels have nonzero alpha up to 254.
- The generated RGB preview may show hidden background colors if a viewer ignores alpha. The PNG contains actual transparency.

```text
Use case: scientific-educational
Asset type: isolated photorealistic bird cutout sprite for an educational ecology animation; AI-generated concept, not a field observation.
Primary request: exactly one Sage Thrasher (Oreoscoptes montanus), scientifically plausible adult, full body, both feet and entire tail visible, facing right in a natural side or slight three-quarter view.
Subject details: soft brown-grey upperparts; pale cream underparts with strong dark streaks on the breast and sides; pale yellowish eye; a slender, short, STRAIGHT dark bill characteristic of Sage Thrasher, with no downward curve; a relatively long grey-brown tail and natural folded wings. Realistic plumage detail, correct bird anatomy, natural compact proportions. Standing pose with toes clearly visible.
Composition/framing: single large bird centered with clean silhouette and a safe transparent margin around all extremities; no cropped feet or tail. Bird looks toward the right.
Style/medium: photorealistic natural bird, softly lit with fine detailed feather edges suitable for compositing over a morning sagebrush landscape.
Background: genuinely transparent RGBA background with actual alpha transparency everywhere outside the bird; do not render a white, grey, checkerboard or colored background.
Constraints: no branch, rock, ground, base, perch, vegetation, cast ground shadow or other object; no other birds; no text, labels, logo or watermark. Do not create a curved-billed thrasher. Preserve feet, tail and slender straight bill as an intact clean cutout.
```

## Targeted bird alpha edit candidate v02

- File: `../assets/sage-thrasher-cutout-v02.png`.
- Size: 1536 × 1024 pixels, RGBA.
- Method: one targeted built-in edit using `sage-thrasher-cutout-v01.png` as the sole referenced image.
- `transparent_background: true`.
- Generated alpha is unchanged: 1,184,727 pixels are fully transparent; the maximum alpha is 254. The edit did not produce literal alpha-255 interiors despite the prompt requirement.
- Saved original: `/Users/tom/.codex/generated_images/01a18327-8ccd-7820-9552-479aa61378ce/exec-81a26cab-157d-481f-89df-36780c6cc080.png`.

```text
Use case: background-extraction
Asset type: clean transparent Sage Thrasher sprite for compositing.
Input image: the supplied PNG is the edit target. Preserve the bird itself exactly.
Primary request: clean only the alpha/background outside the bird's feather and foot silhouette. Remove all tan/brown matte, cloud, haze, glow, shadow and background outside the bird. The entire area outside the true bird silhouette must be genuinely fully transparent with alpha 0. Make the bird's body and feather interior fully opaque (alpha 255), with only a thin natural antialias boundary around fine feathers and toes.
Invariants: keep the exact same bird morphology, pose, facing direction, placement, scale, full tail, full feet, feather pattern, colors, straight slender bill and pale eye. Do not redraw, restyle, reposition or crop the bird. Do not add anything. Preserve the original canvas dimensions and transparent margins.
Background: actual transparent RGBA. No solid color, checkerboard, background object, ground, shadow, brown halo, glow, soft background residue or floating cloud. This is a targeted clean cutout edit only.
```

## Actual alpha compositing review and selection

- Screenshot: `../assets/sage-thrasher-alpha-browser-review-v02.png`.
- Browser render: v01 and v02 shown over black and the generated sagebrush landscape.
- Result: neither file shows the broad tan/brown cloud visible in raw generation and `view_image` previews. The PNG alpha makes those hidden background pixels fully transparent.
- Selected animation asset: `../assets/sage-thrasher-cutout-v01.png`, confirmed after browser review. This retains the original neutral plumage colors.
- The v02 edit is retained as a candidate history asset; it warms plumage and increases contrast.
- No Python, CLI, or external API image editing was used. The review image is a browser screenshot, not a replacement asset.

