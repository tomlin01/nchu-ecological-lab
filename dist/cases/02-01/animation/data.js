window.caseData = {
  "duration": 60,
  "photos": [
    {
      "id": "clear-jaguar",
      "code": "P01",
      "label": "清楚動物",
      "title": "白天的清楚影像",
      "original": "clear-jaguar-v01.png",
      "src": "../assets/02-01-jaguar-main.webp",
      "box": {
        "x": 0.15,
        "y": 0.35,
        "w": 0.61,
        "h": 0.46
      },
      "modelLabel": "美洲豹",
      "reviewLabel": "美洲豹",
      "state": "confirmed",
      "cameraLabel": "示意相機 A",
      "timeLabel": "白天",
      "alt": "生成相機情境照，一隻完整可見的美洲豹走過森林步道。",
      "width": 1536,
      "height": 1024,
      "original_sha256": "d2b364f5e47562e0328cc8b1c3818a23d98dd0555e5d888f8a5400891469d8cc"
    },
    {
      "id": "occluded-cat",
      "code": "P02",
      "label": "遮蔽動物",
      "title": "被枝葉遮住的動物",
      "original": "occluded-cat-v01.png",
      "src": "../assets/occluded-cat.webp",
      "box": {
        "x": 0.475,
        "y": 0.3,
        "w": 0.415,
        "h": 0.31
      },
      "modelLabel": "貓科",
      "reviewLabel": "貓科，待確認",
      "state": "uncertain",
      "cameraLabel": "示意相機 A",
      "timeLabel": "白天",
      "alt": "生成相機情境照，斑點貓科動物的頭和部分身體被枝葉遮住。",
      "width": 1536,
      "height": 1024,
      "original_sha256": "9be1b847fb5c4babe52f5e743e12bfaa85ee7a3c395443232cd551973219cf5a"
    },
    {
      "id": "night-tapir",
      "code": "P03",
      "label": "夜間影像",
      "title": "夜間的黑白影像",
      "original": "night-tapir-v01.png",
      "src": "../assets/night-tapir.webp",
      "box": {
        "x": 0.24,
        "y": 0.23,
        "w": 0.48,
        "h": 0.56
      },
      "modelLabel": "貘科",
      "reviewLabel": "貘科，待確認",
      "state": "uncertain",
      "cameraLabel": "示意相機 B",
      "timeLabel": "夜間",
      "alt": "生成的紅外線相機風格黑白影像，一隻貘走過夜間森林步道。",
      "width": 1536,
      "height": 1024,
      "original_sha256": "9a397639cbb24294b111ebe7ad5e3228544b249552d10d215ceb0cdd6332f38a"
    },
    {
      "id": "empty-forest",
      "code": "P04",
      "label": "空景",
      "title": "沒有可見動物的影像",
      "original": "empty-forest-v01.png",
      "src": "../assets/02-01-forest-bg.webp",
      "box": null,
      "modelLabel": "空景",
      "reviewLabel": "保留空景影像",
      "state": "retained",
      "cameraLabel": "示意相機 A",
      "timeLabel": "白天",
      "alt": "生成相機情境照，森林步道上沒有可見動物。",
      "width": 1536,
      "height": 1024,
      "original_sha256": "1e63fcf38ccd459d7cfff88c5d7c95f782d7f851d5a04edb4b869e2f15932181"
    }
  ],
  "interpretation": "All photos, boxes and labels are generated/authored teaching examples. SpeciesNet was not run. Four images are not four independently identified individuals."
};
