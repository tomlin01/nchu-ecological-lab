"""84s hybrid: generated forest comparison, wildlife, real audio plots, inference.

The readable STFT is explanatory, not the model's internal representation.
Audio is muxed at 32, 40, 64 seconds from the exact model-input WAV.
"""
from pathlib import Path
import os,json
import numpy as np
import manimgx as m

BASE=Path(__file__).resolve().parent
ASSETS=BASE/'assets'
if not ASSETS.exists():ASSETS=BASE.parents[4]/'outputs/ecology-ai-rollout/candidates/02-02/prototype-v04/assets'
P=os.environ.get('BIRDNET_LAYOUT')=='portrait'
m.config.pixel_width,m.config.pixel_height=(864,1080) if P else (1440,810)
m.config.frame_rate=30
m.config.background_color='#101916'
BG,INK,MUTED,GREEN,ORANGE,CYAN='#101916','#E8EDE5','#ACBEB1','#BED7AA','#E3B17B','#A7D7D4'
WAVE=json.loads((ASSETS/'waveform.json').read_text())
DURATION=WAVE['duration_s']
RESULT=json.loads((ASSETS/'inference-result.json').read_text())
TOP=RESULT['top_candidates'][0]
assert TOP['scientific_name']=='Strix occidentalis'


def text(s,size=36,color=INK):
    return m.Text(s,font='Heiti TC',font_paths=['/Users/tom/Library/Fonts'],font_size=size,color=color)


def panel(w,h,point,color='#4F6D5E',fill='#182A20'):
    return m.RoundedRectangle(width=w,height=h,corner_radius=.12,fill_color=fill,
                              fill_opacity=1,stroke_color=color,stroke_width=1.3).move_to(point)


def curve(points,color=CYAN,width=1.4):
    return m.VMobject(stroke_color=color,stroke_width=width).set_points_as_corners(points)


def photo(filename,W,H,zoom=1.0,focus=(.5,.5)):
    im=m.ImageMobject(str(ASSETS/filename));im.scale(max(W/im.width,H/im.height)*zoom)
    x=max(-(im.width-W)/2,min((im.width-W)/2,(.5-focus[0])*im.width))
    y=max(-(im.height-H)/2,min((im.height-H)/2,(focus[1]-.5)*im.height))
    return im.move_to([x,y,0])


def waveform(w,h,y=0):
    pts=WAVE['points'];lines=m.Group()
    for key in ['min','max']:
        lines.add(curve([[-w/2+p['time']/DURATION*w,y+p[key]*h*.4,0] for p in pts]))
    return lines


def axes(w,h,y,spectral,portrait):
    group=m.Group(m.Line([-w/2,y-h/2,0],[w/2,y-h/2,0],color=MUTED,stroke_width=1))
    for t in [0,2,4,DURATION]:
        x=-w/2+t/DURATION*w
        group.add(text(f'{t:.1f}' if t==DURATION else str(t),29 if portrait else 24,MUTED).move_to([x,y-h/2-.35,0]))
    group.add(text('時間（秒）',29 if portrait else 25,MUTED).move_to([0,y-h/2-.85,0]))
    if spectral:
        for f in [0,1500,3000]:
            group.add(text(str(f),25 if portrait else 23,MUTED).move_to([-w/2-.48,y-h/2+f/3000*h,0]))
        group.add(text('頻率 Hz',28 if portrait else 24,MUTED).move_to([-w/2+.4,y+h/2+.32,0]))
    return group


class ForestToBirdNET(m.Scene):
    def construct(self):
        W,H=m.config.frame_width,m.config.frame_height;p=H>W;top=H/2
        previous=None
        def shot(name,seconds,z0=1,z1=1.04,focus=(.5,.5),fade=.45):
            nonlocal previous
            im=photo(name,W,H,z0,focus)
            if previous is None:self.add(im);f=0
            else:self.play(m.FadeIn(im),run_time=fade,rate_func=m.linear);self.remove(previous);f=fade
            target=photo(name,W,H,z1,focus)
            self.play(im.animate.scale(z1/z0).move_to(target.get_center()),run_time=seconds-f,rate_func=m.linear)
            previous=im

        # Matched-view condition illustrations: fixed camera so structure is comparable.
        shot('forest-intact-v01.webp',5,1,1)
        shot('forest-canopy-retained-v01.webp',5,1,1)
        shot('forest-canopy-lost-v01.webp',5,1,1)
        shot('spotted-owl-forest-v01.webp',5,1.08,1.02,(.55,.50))
        shot('black-backed-woodpecker-v01.webp',4,1.01,1.05,(.51,.51))
        shot('wood-borer-larva-v01.webp',3,1,1.03,(.51,.51))
        shot('recorder-brunk.jpg',4,1,1.04,(.28,.65))
        assert abs(self.time-31)<.01

        # One real recording, shown first as amplitude variation.
        self.play(m.FadeOut(previous),run_time=.4);previous=None
        heading=text('先聽這段聲音',43 if p else 43).move_to([0,top-.65,0])
        sub=text('同一段 5.3 秒錄音',30 if p else 26,MUTED).move_to([0,top-1.3,0])
        pw,ph,y=(6.3,3.0,.2) if p else (11.2,2.8,-.15)
        box=panel(pw+.3,ph+.3,[0,y,0])
        wave=waveform(pw,ph,y);time_axis=axes(pw,ph,y,False,p)
        plot=m.Group(box,wave,time_axis)
        self.play(m.FadeIn(heading),m.FadeIn(sub),m.FadeIn(plot),run_time=.6)
        cursor=m.Line([-pw/2,y-ph/2,0],[-pw/2,y+ph/2,0],color=ORANGE,stroke_width=2.8)
        self.add(cursor)
        self.play(cursor.animate.shift([pw,0,0]),run_time=DURATION,rate_func=m.linear)
        self.wait(39-self.time)

        # A readable STFT of exactly the same audio, rather than fabricated sound marks.
        self.play(m.FadeOut(cursor),m.FadeOut(plot),m.FadeOut(heading),run_time=.4)
        spectro=m.ImageMobject(str(ASSETS/'spectrogram-only.png'))
        spectro.stretch_to_fit_width(pw).stretch_to_fit_height(ph).move_to([0,y,0])
        spec_axis=axes(pw,ph,y,True,p)
        spec_heading=text('把同一段聲音，換個方式看',35 if p else 42).move_to(heading)
        strength=text('亮：較強的聲音能量',29 if p else 24,MUTED).move_to([0,-top+1.1,0])
        spectrum=m.Group(spectro,spec_axis,strength)
        self.play(m.FadeIn(spectrum),m.FadeIn(spec_heading),run_time=.6)
        cursor=m.Line([-pw/2,y-ph/2,0],[-pw/2,y+ph/2,0],color=ORANGE,stroke_width=2.6)
        self.add(cursor);self.play(cursor.animate.shift([pw,0,0]),run_time=DURATION,rate_func=m.linear)
        self.wait(47-self.time)

        # Prior learning is concept explanation. No fabricated network activations.
        self.play(m.FadeOut(cursor),m.FadeOut(spectrum),m.FadeOut(spec_heading),m.FadeOut(sub),run_time=.4)
        train_title=text('辨識之前，模型已先學過',37 if p else 42).move_to([0,top-.65,0])
        x=(0 if p else -3.5);cy=(1.5 if p else .2)
        examples=m.Group()
        for i in range(3):
            card=panel(4.8 if p else 4.5,.78,[x+i*.12,cy-i*.9,0])
            caption=text('帶鳥名的錄音',31 if p else 28,GREEN).move_to(card)
            examples.add(m.Group(card,caption))
        target_y=-2 if p else -.7;target_x=0 if p else 3.5
        model_box=panel(4.6 if p else 4.7,1.7,[target_x,target_y,0],GREEN)
        model_label=text('BirdNET\n已學習的聲音特徵',33 if p else 31).move_to(model_box)
        model=m.Group(model_box,model_label)
        arrow=m.Arrow([0,-.65,0],[0,-1.05,0],buff=0,color=GREEN) if p else m.Arrow([-1,-.7,0],[.95,-.7,0],buff=0,color=GREEN)
        self.play(m.FadeIn(train_title),m.FadeIn(examples),run_time=.6)
        self.play(m.Create(arrow),m.FadeIn(model),run_time=.8)
        self.wait(1.7)  # 50.5
        self.play(m.FadeOut(examples),m.FadeOut(arrow),m.FadeOut(train_title),run_time=.4)
        now_title=text('現在，換這段錄音',40 if p else 42).move_to([0,top-.65,0])
        input_box=panel(4.8 if p else 4.4,1.65,[0 if p else -3.5,1.3 if p else -.7,0],CYAN)
        input_wave=waveform(3.9,1.1,0).move_to(input_box)
        input_label=text('剛才的 5.3 秒',30 if p else 27,CYAN).next_to(input_box,m.UP,buff=.25)
        packet=m.Group(input_box,input_wave)
        self.play(m.FadeIn(now_title),m.FadeIn(packet),m.FadeIn(input_label),run_time=.6)
        entry=[0,target_y+.85+.7,0] if p else [target_x-2.35-1.2,target_y,0]
        self.play(packet.animate.scale(.5).move_to(entry),run_time=1.4)
        self.play(m.FadeOut(packet),m.FadeOut(input_label),run_time=.2)
        self.wait(55-self.time)

        # A genuine output from the pinned modern teaching model, not a guessed score.
        self.play(m.FadeOut(model),m.FadeOut(now_title),run_time=.4)
        result_title=text('模型提出的第一候選',39 if p else 42).move_to([0,top-.65,0])
        owl=m.ImageMobject(str(ASSETS/'spotted-owl-forest-v01.webp'))
        owl.scale_to_fit_width(7.0 if p else 7.8).move_to([0 if p else -2.8,1.3 if p else 0,0])
        name=text('斑點鴞',52 if p else 49,GREEN).move_to([0 if p else 3.8,-1.6 if p else .7,0])
        score=text(f'模型分數  {TOP["model_score"]:.3f}',32 if p else 29,MUTED).next_to(name,m.DOWN,buff=.45)
        pending=text('仍待人工核對',31 if p else 28,ORANGE).next_to(score,m.DOWN,buff=.45)
        candidate=m.Group(result_title,owl,name,score,pending)
        self.play(m.FadeIn(candidate),run_time=.7)
        self.wait(63-self.time)

        # Replay the exact same clip. No invented human acceptance checkbox.
        self.play(m.FadeOut(candidate),run_time=.4)
        review_title=text('回到原音，再確認',41 if p else 43).move_to([0,top-.65,0])
        review_wave=waveform(pw,ph,y);review_axis=axes(pw,ph,y,False,p)
        badge=text('候選：斑點鴞',33 if p else 30,ORANGE).move_to([0,top-1.4,0])
        review=m.Group(review_title,review_wave,review_axis,badge)
        self.play(m.FadeIn(review),run_time=.6)
        cursor=m.Line([-pw/2,y-ph/2,0],[-pw/2,y+ph/2,0],color=ORANGE,stroke_width=2.8)
        self.add(cursor);self.play(cursor.animate.shift([pw,0,0]),run_time=DURATION,rate_func=m.linear)
        self.wait(71-self.time)

        self.play(m.FadeOut(review),m.FadeOut(cursor),run_time=.4)
        shot('spotted-owl-forest-v01.webp',3.7,1.02,1.06,(.55,.5))
        shot('black-backed-woodpecker-v01.webp',4.1,1.01,1.05,(.51,.51))
        shot('forest-canopy-retained-v01.webp',4.8,1,1)
        assert abs(self.time-84)<.02,self.time
