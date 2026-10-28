"""Ten-second source-image introduction and eight-second source-image ending.

The accepted 47.55-second explanatory film is concatenated separately and is
never rebuilt here. Figure crops preserve pixels; the waveform is computed
from the same six-second NOAA WAV that build_film.py places at film t=1.5.
"""
from pathlib import Path
import wave

import numpy as np
from PIL import Image
import manimgx as m


def project_root():
    for parent in Path(__file__).resolve().parents:
        if (parent / "outputs/ecology-ai-site-v01/cases/01-02/assets/research-figure-1.png").is_file():
            return parent
    raise FileNotFoundError("Run this editable scene inside the ecology project.")


ROOT = project_root()
FIGURE = ROOT / "outputs/ecology-ai-site-v01/cases/01-02/assets/research-figure-1.png"
AUDIO = ROOT / "work/ecology-ai-rollout/cases/01-02/hybrid-v01/sources/sperm-whale-clicks-teaching-6s.wav"
WHALE_CROP = (1450, 590, 2008, 1005)
BOAT_CROP = (15, 35, 735, 470)
BG, INK, MUTED = "#0C1720", "#EAF0ED", "#A6B5BB"
CYAN, AMBER, GRID = "#62D3E8", "#F5B96A", "#314A58"
LEFT = -6.45
m.config.background_color = BG


def prose(value, size, y, color=INK, max_width=5.65):
    text = m.Text(value, font_size=size, color=color)
    if text.width > max_width:
        text.scale_to_fit_width(max_width)
    text.move_to([LEFT + text.width / 2, y, 0])
    return text


def source_photo(box, caption):
    with Image.open(FIGURE) as full:
        image = m.ImageMobject(np.asarray(full.convert("RGBA").crop(box)))
    image.scale_to_fit_width(7.10)
    image.move_to([3.13, 0.53, 0])
    edge = m.Rectangle(width=image.width, height=image.height,
                       stroke_color=GRID, stroke_width=1.25,
                       fill_opacity=0).move_to(image.get_center())
    note = m.Text(caption, font_size=18, color=MUTED)
    if note.width > 7.1:
        note.scale_to_fit_width(7.1)
    note.move_to([3.13, -2.39, 0])
    return image, edge, note


def common_footer():
    rule = m.Line([-6.45, -3.22, 0], [6.67, -3.22, 0],
                  color=GRID, stroke_width=1)
    credit = prose("研究影像：Bhattacharya 等（2025）Fig. 1 局部",
                   17, -3.47, MUTED, 12.8)
    license_line = prose("arXiv:2512.05808 · CC BY 4.0 · 照片僅作裁切與等比例顯示",
                        16, -3.75, MUTED, 12.8)
    return rule, credit, license_line


def waveform():
    """Min/max envelope of genuine samples, with no gain applied to the audio."""
    with wave.open(str(AUDIO), "rb") as wav:
        assert wav.getnchannels() == 1 and wav.getsampwidth() == 2
        samples = np.frombuffer(wav.readframes(wav.getnframes()), dtype="<i2").astype(float) / 32768
        assert wav.getframerate() == 48000 and len(samples) == 288000
    bins = 850
    edges = np.linspace(0, len(samples), bins + 1).astype(int)
    peak = np.max(np.abs(samples))
    x0, width, y0, amplitude = LEFT, 5.55, -0.75, 0.34
    graph = m.VMobject(stroke_color=CYAN, stroke_width=1.15)
    for i in range(bins):
        segment = samples[edges[i]:edges[i + 1]]
        x = x0 + (i + 0.5) / bins * width
        graph.start_new_path(np.array([x, y0 + segment.min() / peak * amplitude, 0]))
        graph.add_line_to(np.array([x, y0 + segment.max() / peak * amplitude, 0]))
    baseline = m.Line([x0, y0, 0], [x0 + width, y0, 0],
                      color=GRID, stroke_width=0.8)
    start = m.Text("0 s", font_size=17, color=MUTED).move_to([x0 + 0.14, y0 - 0.48, 0])
    end = m.Text("6 s", font_size=17, color=MUTED).move_to([x0 + width - 0.14, y0 - 0.48, 0])
    return (baseline, graph, start, end), (x0, width, y0)


class SpermWhaleIntro(m.Scene):
    def construct(self):
        photo_a = source_photo(WHALE_CROP, "研究原圖中的浮出鯨群")
        photo_b = source_photo(BOAT_CROP, "船後拖曳水聽器陣列")
        title_a = prose("浮出時看得見，\n下潛後怎麼找？", 43, 1.75)
        title_b = prose("用水聽器，\n接收牠們的聲音。", 43, 1.75)
        eyebrow = prose("CETI / AVATARS · 先看研究現場", 17, 3.48, MUTED, 12.8)
        wave_parts, (x0, width, y0) = waveform()
        label = prose("抹香鯨點擊聲示例｜非本次海試錄音", 18, -1.55, CYAN)
        credit = prose("NOAA Fisheries / NEFSC", 17, -1.99, MUTED)
        credit2 = prose("Passive Acoustics Branch (2023)", 16, -2.29, MUTED)
        note = prose("波形取自同一段錄音，不用於本片定位計算。", 16, -2.72, MUTED)
        clock = m.ValueTracker(0)
        cursor = m.Line([x0, y0 - 0.39, 0], [x0, y0 + 0.39, 0],
                        color=AMBER, stroke_width=2.1)

        def follow(mob):
            time = clock.get_value()
            elapsed = np.clip((time - 1.5) / 6.0, 0, 1)
            mob.move_to([x0 + width * elapsed, y0, 0])
            mob.set_opacity(1 if 1.5 <= time <= 7.5 else 0)

        cursor.add_updater(follow)
        follow(cursor)
        self.add(*photo_a, title_a, eyebrow, *wave_parts, label, credit, credit2,
                 note, *common_footer(), cursor)
        self.play(clock.animate.set_value(5), run_time=5, rate_func=m.linear)
        self.remove(*photo_a, title_a)
        self.add(*photo_b, title_b)
        self.play(clock.animate.set_value(10), run_time=5, rate_func=m.linear)


class SpermWhaleOutro(m.Scene):
    def construct(self):
        self.add(*source_photo(WHALE_CROP, "研究原圖中的浮出鯨群"))
        self.add(prose("CETI / AVATARS · 回到實際觀察", 17, 3.48, MUTED, 12.8))
        self.add(prose("到附近，\n仍要目視確認。", 43, 1.75))
        self.add(prose("位置估計協助引路，\n最後由研究人員確認。", 25, -0.25, MUTED))
        self.add(prose("影像中的鯨群不代表動畫中的 A、B 或 C 群。", 16, -1.65, MUTED))
        self.add(*common_footer())
        self.wait(8)
