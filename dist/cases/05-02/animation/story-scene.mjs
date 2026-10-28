const $=id=>document.getElementById(id);
const sceneIds=['habitatScene','questionsScene','mapsScene','makingScene','limitsScene','validationScene','endingScene'];
function show(id,visible){$(id).toggleAttribute('hidden',!visible);}
function text(id,value){if($(id).textContent!==value)$(id).textContent=value;}
function legend(id,classes){
 const list=$(id);list.replaceChildren();
 for(const item of classes){
  const li=document.createElement('li'),swatch=document.createElement('i');
  swatch.className='swatch';swatch.style.background=item.color;swatch.setAttribute('aria-hidden','true');
  li.append(swatch,document.createTextNode(item.label));list.append(li);
 }
}
export function buildSourceGeometry(data){
 document.querySelectorAll('[data-map-pin]').forEach(pin=>{
  pin.style.left=`${data.anchor.x*100}%`;pin.style.top=`${data.anchor.y*100}%`;
  pin.dataset.longitude=String(data.anchor.lon);pin.dataset.latitude=String(data.anchor.lat);
 });
 document.querySelectorAll('.map-frame').forEach(frame=>{
  frame.style.aspectRatio=`${data.assets.geomorphic.width} / ${data.assets.geomorphic.height}`;
  frame.querySelectorAll('.map-scale,.map-north').forEach(n=>n.remove());
  const scale=document.createElement('div');scale.className='map-scale';
  const line=document.createElement('i');line.className='scale-line';
  line.style.width=`${data.scaleBar.normalizedLength*100}%`;
  const label=document.createElement('span');label.textContent='約 5 公里';scale.append(line,label);
  const north=document.createElement('span');north.className='map-north';north.textContent='北';
  frame.append(scale,north);
 });
 legend('fullGeomorphicLegend',data.classes.geomorphic);legend('fullBenthicLegend',data.classes.benthic);
}
export function renderScene(s,data){
 sceneIds.forEach((id,i)=>show(id,s.phase===i));
 $('reefWorld').style.visibility=s.phase===0?'visible':'hidden';
 $('questionOverview').toggleAttribute('hidden',s.questionMode!=='landform');
 $('questionMaterial').toggleAttribute('hidden',s.questionMode==='landform');
 const landform=s.questionMode==='landform';
 show('landformMarks',landform);show('materialMarks',!landform);
 show('landformKeys',landform);show('materialKeys',!landform);
 $('landformMarks').style.opacity=$('materialMarks').style.opacity=String(s.questionReveal);
 document.querySelectorAll('.concept-marks circle').forEach(c=>c.setAttribute('r',s.compact?'28':'18'));
 text('questionHeading',landform?'位於礁體的哪個部位？':'海床主要由什麼構成或覆蓋？');

 const pair=s.mapMode==='pair',geom=s.mapMode==='geomorphic';
 show('mapPair',pair&&!s.compact);show('mapSingle',!pair||s.compact);
 show('singleAnswer',!pair);show('compactAnswers',pair&&s.compact);
 show('mapViewNote',pair&&s.compact);
 $('singleGeomorphic').style.opacity=geom?'1':'0';
 $('singleBenthic').style.opacity=geom?'0':'1';
 for(const id of ['singleGeomorphic','singleBenthic']){
  $(id).style.transform=`scale(${s.mapZoom})`;
  $(id).style.transformOrigin=`${(data?.anchor.x??.32960526315784516)*100}% ${(data?.anchor.y??.4419354845127883)*100}%`;
 }
 if(data)$('mapSingle').querySelector('.scale-line').style.width=`${data.scaleBar.normalizedLength*s.mapZoom*100}%`;
 text('mapHeading',pair?'相同的位置，兩種描述。':geom?'地貌：位於礁體的哪個部位？':'底質：海床主要是什麼？');
 text('singleAnswerKind',geom?'地貌分類':'主要底質');text('singleAnswerValue',geom?'外礁坪':'岩石');

 const inputs=s.makingMode==='inputs';show('inputsView',inputs);show('ruleView',!inputs);
 $('inputLines').querySelector('path').style.strokeDashoffset=String(1-s.inputReveal);
 document.querySelectorAll('.input-rows p').forEach((row,i)=>row.style.opacity=String(s.reducedMotion?1:Math.max(.3,Math.min(1,(s.local-i*1.5)/1.5))));
 $('neighborLines').querySelector('path').style.strokeDashoffset=String(1-s.neighborReveal);
 $('misplacedCell').style.fill=s.ruleCorrected?'var(--inner-flat)':'var(--crest)';
 text('ruleHeading',s.ruleCorrected?'依周圍的地貌，調整這個分類。':'如果礁脊，被標在礁坪中央……');
 text('ruleAnswer',s.ruleCorrected?'依規則調整：內礁坪':'初步分類：礁脊');

 const combined=s.limitMode==='combined';show('combinedClass',combined);show('visibilityMessage',!combined);
 $('visibilityVeil').style.opacity=combined?'0':String(s.veil);
 text('limitHeading',combined?'硬質海床上的珊瑚與藻類，合併為一類。':'水越深或越混濁，越難看清海床。');
}
