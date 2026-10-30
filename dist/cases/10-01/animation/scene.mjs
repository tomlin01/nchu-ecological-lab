import {PHASES,HORIZONS,HISTORY,FORECAST,LATER,interval,clamp} from './model.mjs';
import {createLakeScene} from './lake-three.mjs';
let host,svg,lake,latest,refs={},mode='',ready=false;
const $=id=>refs[id]||(refs[id]=svg.querySelector(`#${id}`));
const number=v=>Number(v).toFixed(3);
const plot=(values,x,y,w,h)=>values.map((v,i)=>[x+i*w/(values.length-1),y+(1-v)*h]);
const path=points=>points.map(([x,y],i)=>`${i?'L':'M'}${number(x)} ${number(y)}`).join(' ');
const nodes=[[45,90],[45,185],[160,57],[160,138],[160,218],[275,90],[275,185]];
function network(prefix,x,y){return `<g id="${prefix}" transform="translate(${x} ${y})">${nodes.slice(0,2).flatMap((a,i)=>nodes.slice(2,5).map((b,j)=>`<path class="netline" d="M${a[0]} ${a[1]}L${b[0]} ${b[1]}"/>`)).join('')}${nodes.slice(2,5).flatMap(a=>nodes.slice(5).map(b=>`<path class="netline" d="M${a[0]} ${a[1]}L${b[0]} ${b[1]}"/>`)).join('')}${nodes.map(([cx,cy])=>`<circle class="netnode" cx="${cx}" cy="${cy}" r="18"/>`).join('')}</g>`;}
const chart={x:590,y:304,now:930,right:1490,h:327};
const fx=d=>chart.now+d/28*(chart.right-chart.now),fy=v=>chart.y+(1-v)*chart.h;
function markup(){return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" class="bloom-overlay" role="img" aria-label="湖泊監測、模型量化與四個預測時間點的概念動畫"><style>
.bloom-overlay{--p:#f3f0e8;--ink:#26332f;--muted:#5b6a60;--line:#b1b9ae;--accent:#526f61;--past:#387b8b;--future:#b47630;--later:#8b6485;font-family:var(--font-sans,'PingFang TC',sans-serif)}
html[data-theme="dark"] .bloom-overlay{--p:#1b1e1f;--ink:#f0eee7;--muted:#b9bdbb;--line:#737e79;--accent:#cdbb95;--past:#8bc7ce;--future:#efba71;--later:#d9aad2}
text{fill:var(--ink)}.paper{fill:var(--p)}.title{font:500 43px var(--font-serif,'Songti TC',serif)}.big{font:500 50px var(--font-serif,'Songti TC',serif)}.label{font-size:29px;font-weight:500}.copy{font-size:24px}.small{font-size:20px;fill:var(--muted)}.muted{fill:var(--muted)}.axis{fill:none;stroke:var(--line);stroke-width:2}.past{fill:none;stroke:var(--past);stroke-width:5;stroke-linecap:round;stroke-linejoin:round}.future{fill:none;stroke:var(--future);stroke-width:4;stroke-dasharray:10 9;stroke-linejoin:round}.layer{visibility:hidden;opacity:0}.chip{fill:var(--p);opacity:.94}.netline{fill:none;stroke:var(--accent);stroke-width:2.5;opacity:.6}.netnode{fill:var(--p);stroke:var(--accent);stroke-width:4}.flow{fill:none;stroke:var(--accent);stroke-width:4;stroke-linecap:round}.tag{font-size:21px;fill:var(--muted)}.later-dot{fill:var(--p);stroke:var(--later);stroke-width:5}.forecast-dot{fill:var(--future)}
</style><defs><clipPath id="past-reveal"><rect id="past-mask" x="100" y="270" width="620" height="380"/></clipPath></defs>
<g id="lake-caption" class="layer"><rect class="chip" x="58" y="178" width="590" height="226" rx="3"/><text class="big" x="86" y="247">今天的湖面，</text><text class="big" x="86" y="311">看不出幾週後的變化。</text><text class="copy muted" x="90" y="370">藍綠藻大量增生時，可能形成水華。</text><g id="buoy-context"><rect class="chip" x="1090" y="697" width="435" height="93" rx="3"/><text class="label" x="1115" y="739">浮標在水面，探頭在水下。</text><text class="small" x="1115" y="773">裝置比例與水色為概念示意</text></g></g>
<g id="measurement" class="layer"><text class="label" x="75" y="208">一段時間的紀錄</text><text class="copy muted" x="75" y="252">水溫與藍綠藻相關的色素訊號</text><path class="axis" d="M100 300V650H730"/><path class="axis" d="M100 474H730" stroke-dasharray="5 9"/><g clip-path="url(#past-reveal)"><path id="measurement-line" class="past"/><path id="temperature-line" class="future" style="stroke-dasharray:none;stroke-width:3"/></g><path class="axis" d="M725 290V670" style="stroke:var(--ink);stroke-width:3"/><text class="label" x="725" y="715" text-anchor="middle">現在</text><text class="copy muted" x="100" y="715">過去的量測</text><path class="past" d="M100 770H152"/><text class="copy" x="169" y="780">色素訊號</text><path class="future" d="M385 770H437" style="stroke-dasharray:none"/><text class="copy" x="453" y="780">水溫</text><text class="small" x="75" y="830">兩條曲線各自縮放；沒有真實數值或共同單位。</text></g>
<g id="device" class="layer"><g id="training"><text class="label" x="80" y="207">① 電腦先訓練</text><rect class="axis" x="85" y="272" width="680" height="363" rx="10"/><path class="axis" d="M360 635V672M280 674H495"/>${network('train-net',255,292)}<text class="copy" x="424" y="595" text-anchor="middle">淺層 LSTM・學習歷史變化</text><text class="copy muted" x="80" y="748">水溫・月份・色素相關訊號</text><text class="small" x="80" y="801">此圖只示意模型；沒有在動畫中重新訓練。</text></g>
<g id="quantization"><text class="label" x="80" y="207">② 訓練後，再量化</text>${network('before-net',100,250)}${network('after-net',467,250)}<path class="flow" d="M420 382H465M449 368L465 382L449 396"/><text class="copy" x="260" y="574" text-anchor="middle">原來的數值</text><text class="copy" x="630" y="574" text-anchor="middle">較精簡的表示</text><text class="label" x="260" y="627" text-anchor="middle">0.183</text><text class="label" x="260" y="676" text-anchor="middle">0.614</text><text class="label" x="630" y="627" text-anchor="middle">0.2</text><text class="label" x="630" y="676" text-anchor="middle">0.6</text><text class="copy muted" x="80" y="734">結構保留，數值改用較省空間的表示。</text><text class="small" x="80" y="789">小數為原理示例；不是論文中的模型權重。</text></g>
<g id="embedded"><text class="label" x="80" y="207">③ 放進微控制器</text>${network('embedded-net',210,260)}<path class="flow" d="M575 405H795M774 387L795 405L774 423"/><text class="big" x="80" y="666">不用在湖上從頭學。</text><text class="copy muted" x="80" y="733">裝置用已訓練的模型，處理新的量測。</text><text class="small" x="80" y="789">電路板為概念模型；不代表研究採用的特定硬體。</text></g></g>
<g id="forecast" class="layer"><text class="label" x="590" y="212" id="chart-title">看向未來的四個時間點</text><text class="small" x="590" y="256">色素相關訊號（示意）</text><path class="axis" d="M590 290V650H1510"/><rect x="930" y="290" width="580" height="360" fill="var(--future)" opacity=".055"/><path id="forecast-history" class="past"/><path class="axis" d="M930 280V666" style="stroke:var(--ink);stroke-width:3"/><text class="copy" x="590" y="702">過去</text><text class="label" x="930" y="702" text-anchor="middle">現在</text><g id="forecast-targets">${HORIZONS.map((d,i)=>`<g id="target-${i}"><path class="axis" d="M${fx(d)} 650V666"/><text class="copy" x="${fx(d)}" y="702" text-anchor="middle">+${d}天</text><circle class="forecast-dot" cx="${fx(d)}" cy="${fy(FORECAST[i])}" r="10"/></g>`).join('')}</g><path id="forecast-line" class="future"/><g id="later-targets">${HORIZONS.map((d,i)=>`<g id="later-${i}"><path d="M${fx(d)} ${fy(FORECAST[i])}V${fy(LATER[i])}" stroke="var(--later)" stroke-width="2"/><circle class="later-dot" cx="${fx(d)}" cy="${fy(LATER[i])}" r="10"/></g>`).join('')}</g><path class="past" d="M590 774H640"/><text class="copy" x="657" y="782">先前量測</text><path class="future" d="M865 774H915"/><text class="copy" x="930" y="782">模型預測</text><g id="later-legend"><circle class="later-dot" cx="1201" cy="774" r="9"/><text class="copy" x="1224" y="782">後續量測</text></g><text class="small" x="590" y="830" id="chart-note">概念數值；四個預測期來自論文，點位不是真實結果。</text><rect class="chip" x="50" y="706" width="450" height="87"/><text class="copy" x="74" y="742" id="device-caption">由裝置執行預測</text><text class="small" x="74" y="776">不是在量測未來的湖水</text></g>
<g id="ending" class="layer"><rect class="chip" x="60" y="174" width="650" height="314" rx="3"/><text class="big" x="92" y="253">讓監測端先推估，</text><text class="big" x="92" y="324">讓研究者提早準備。</text><text class="copy" x="96" y="389">已做到：把量化模型放進微控制器。</text><text class="copy muted" x="96" y="446">仍待確認：長期現場表現與預警成效。</text><rect class="chip" x="62" y="738" width="1025" height="71"/><text class="copy" x="85" y="784">提供數週後的估計，再用後續量測與現場證據核對。</text></g>
<rect class="paper" width="1600" height="126"/><text id="headline" class="title" x="52" y="63"/><text id="subtitle" class="copy muted" x="54" y="105"/>
<rect class="paper" y="851" width="1600" height="49"/><text id="disclosure" class="small" x="34" y="883"/><text id="stage-time" class="small" x="1567" y="883" text-anchor="end"/>
</svg>`;}
const subtitles=['湖泊裡的藍綠菌與水華・三維概念場景','持續量測，累積到現在；再問接下來會怎麼變。','先完成訓練與量化，再讓小型裝置執行預測。','16、20、24、28天・模型估計，不是未來的實測。','預測先留下來，之後才知道和量測差多少。','內嵌預測原型；長期現場成效仍待驗證。'];
const notes=['湖泊、水華、浮標與探頭均為概念示意；不是研究現場紀錄。','量測曲線為示意；色素相關訊號不等於毒素濃度。','網路、電路板與數值為示意；未指定晶片、位元數或壓縮比。','概念曲線；沒有執行作者模型，也不是作者的實驗結果。','後續量測為教學示例；原研究使用MAPE，本片不呈現績效分數。','Sandubete-López et al., Water Research (2025)・研究原型，不代表已驗證的預警服務。'];
function text(id,value){const node=$(id);if(node.textContent!==value)node.textContent=value;}
function show(id,on){const node=$(id);node.style.visibility=on?'visible':'hidden';node.style.opacity=on?'1':'0';}
export async function initScene(element){
 ready=false;lake?.dispose();refs={};host=element;mode='';
 element.innerHTML='<div id="lake-viewport" aria-hidden="true"></div>'+markup();
 host.style.position='relative';host.style.overflow='hidden';host.style.background='var(--paper,#f3f0e8)';
 svg=element.querySelector('svg');svg.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none';
 const viewport=element.querySelector('#lake-viewport');viewport.style.cssText='position:absolute;left:0;top:14%;width:100%;height:80.45%;overflow:hidden';
 lake=await createLakeScene(viewport);ready=true;
 $('measurement-line').setAttribute('d',path(plot(HISTORY,100,325,620,285)));
 $('temperature-line').setAttribute('d',path(plot(HISTORY.map((v,i)=>.58+.13*Math.sin(i*.5)),100,325,620,285)));
 $('forecast-history').setAttribute('d',path(plot(HISTORY,590,chart.y,chart.now-590,chart.h)));
}
export function renderScene(state){
 if(!ready)return;latest=state;
 const viewport=host.querySelector('#lake-viewport');
 if(mode!==state.viewportMode){mode=state.viewportMode;const full=mode==='full',right=mode==='right';viewport.style.left=full?'0':right?'53.125%':'0';viewport.style.width=full?'100%':right?'46.875%':'32.5%';viewport.style.top=full?'14%':'16.11%';viewport.style.height=full?'80.45%':'76.11%';lake.resize();}
 const p=PHASES[state.phase],edge=Math.min(state.phase===0?1:interval(state.time,p.start,p.start+.55),state.phase===5?1:interval(p.end-state.time,0,.45));
 viewport.style.opacity=String(edge);
 if(!lake.getState().hasWebGL)throw new Error("三維場景連線中斷，請按重新載入。");
 lake.render(state);
 show('lake-caption',state.phase===0);show('measurement',state.phase===1);show('device',state.phase===2);show('forecast',state.phase===3||state.phase===4);show('ending',state.phase===5);
 for(const id of ['lake-caption','measurement','device','forecast','ending']){if($(id).style.visibility==='visible')$(id).style.opacity=number(edge);}
 $('buoy-context').style.opacity=number(interval(state.time,8,11));
 $('past-mask').setAttribute('width',String(630*state.historyProgress));
 for(const [i,id] of ['training','quantization','embedded'].entries())show(id,state.deviceStep===i);
 const count=state.forecastCount;
 for(let i=0;i<4;i++){show(`target-${i}`,i<count);show(`later-${i}`,i<state.laterCount);}
 const fpoints=[[chart.now,fy(HISTORY.at(-1))],...HORIZONS.slice(0,count).map((d,i)=>[fx(d),fy(FORECAST[i])])];
 $('forecast-line').setAttribute('d',path(fpoints));
 show('later-legend',state.phase===4);
 text('chart-title',state.phase===4?'後來量到的，和預測一樣嗎？':'看向未來的四個時間點');
 text('chart-note',state.phase===4?'教學對照：紫色空心點是後續量測示意，不是論文結果。':'概念數值；四個預測期來自論文，點位不是真實結果。');
 text('device-caption',state.phase===4?'保留預測，再核對量測':'由裝置執行預測');
 text('headline',state.phase===2?state.narrative.title:state.phase===5?'這項研究，往前走了哪一步？':p.title);
 text('subtitle',subtitles[state.phase]);text('disclosure',notes[state.phase]);
 text('stage-time',`${String(Math.floor(state.time/60)).padStart(2,'0')}:${String(Math.floor(state.time%60)).padStart(2,'0')}`);
}
export function getSceneState(){return {ready,time:latest?.time??0,phaseId:latest?.phaseId??null,viewportMode:mode,three:lake?.getState(),conceptualData:true,horizons:[...HORIZONS],forecastCount:latest?.forecastCount??0,laterCount:latest?.laterCount??0,hasAudio:false};}
