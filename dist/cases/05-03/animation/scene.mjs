const $=id=>document.getElementById(id);
const sceneIds=['meadowScene','scaleScene','compareScene','learningScene','changeScene','resultsScene','endingScene'];
const show=(id,yes)=>$(id).toggleAttribute('hidden',!yes);
const text=(id,value)=>{if($(id).textContent!==String(value))$(id).textContent=String(value);};
export function buildSourceGeometry(d){
 text('photoCredit',d.context.credit);text('photoPlace',d.context.place);
 const [x,y,w,h]=d.region.detailRectangle;Object.assign($('detailLocator').style,{left:`${x*100}%`,top:`${y*100}%`,width:`${w*100}%`,height:`${h*100}%`});
 for(const node of document.querySelectorAll('[data-region-name]'))node.textContent=d.region.label;
 for(const node of document.querySelectorAll('[data-map-scale]')){node.style.width=`${d.region.scaleBar.normalizedLength*100}%`;node.querySelector('span').textContent=d.region.scaleBar.label;}
 for(const node of document.querySelectorAll('[data-map-legend]')){node.replaceChildren();for(const item of d.region.legend){const span=document.createElement('span'),swatch=document.createElement('i');swatch.style.background=item.color;swatch.setAttribute('aria-hidden','true');span.append(swatch,document.createTextNode(item.label));node.append(span);}}
 for(const key of ['before','after','difference'])document.querySelectorAll(`[data-asset="${key}"]`).forEach(img=>img.style.aspectRatio=`${d.assets.before.width}/${d.assets.before.height}`);
}
export function renderScene(s,d){
 sceneIds.forEach((id,i)=>show(id,s.phase===i));
 $('meadowPhoto').style.transform=`scale(${s.phase===0?s.photoScale:1})`;
 $('gridMeasure').style.opacity=String(.35+.65*s.scaleReveal);
 for(const [id,mode] of [['mapBefore','before'],['mapAfter','after'],['mapDifference','difference']])show(id,s.mapMode===mode);
 text('mapDate',s.mapMode==='before'?'2019–2020':s.mapMode==='after'?'2023–2024':'2019–2020 / 2023–2024');
 show('comparisonLegend',s.mapMode==='difference');
 text('mapState',s.mapMode==='before'?'前期資料標示的海草範圍':s.mapMode==='after'?'後期資料標示的海草範圍':'前期、後期，哪些標示重疊？');
 show('inputDiagram',s.learningMode==='inputs');show('checkingDiagram',s.learningMode==='check');
 $('learningArrow').style.strokeDashoffset=String(1-s.inputReveal);
 show('extentChange',s.changeMode==='extent');show('coverChange',s.changeMode==='cover');
 $('sparseCover').querySelectorAll('rect').forEach(cell=>cell.style.opacity=cell.dataset.coverKeep==='true'?'1':String(1-s.coverProgress));
 show('netResult',s.resultMode==='net');show('sparseResult',s.resultMode==='sparse');
 if(d)text('periodFooter',`${d.periods[0]} 與 ${d.periods[1]} · 作者公開資料`);
}

// Authored teaching diagrams; these cell colors are not satellite pixels or predictions.
const SVG='http://www.w3.org/2000/svg';
function rectangle(group,x,y,width,height,fill,extra={}){const node=document.createElementNS(SVG,'rect');for(const [key,value]of Object.entries({x,y,width,height,fill,...extra}))node.setAttribute(key,String(value));group.append(node);}
for(let y=0;y<20;y++)for(let x=0;x<20;x++){
 const shade=(x*13+y*7+x*y)%7;rectangle($('patchCells'),x*12+1,y*12+1,10,10,['#8a9d90','#718d83','#45685c','#b9c5b6','#5d7f73','#92b2aa','#d0d6c3'][shade]);
}

for(const [id,offset]of [['denseCover',50],['sparseCover',440]])for(let y=0;y<4;y++)for(let x=0;x<5;x++)rectangle($(id),offset+x*56+(y%2)*3,75+y*48,43,35,'#658a6c',{'data-cover-keep':String((x*2+y)%3===0)});
