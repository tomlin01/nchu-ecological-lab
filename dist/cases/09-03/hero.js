const buttons=[...document.querySelectorAll('[data-sampling-day]')];
const bands=[...document.querySelectorAll('[data-probability-day]')];
const reading=document.getElementById('sampling-reading');
const status=document.getElementById('hero-status');
const retry=document.getElementById('retry-hero');
const image=document.getElementById('hero-habitat');
let days=[],selected='D',ready=false,loading=false,error=null,imageReady=false;
function getState(){const d=days.find(x=>x.id===selected),index=days.indexOf(d),start=days.slice(0,Math.max(0,index)).reduce((v,x)=>v+x.q,0);return{ready,loading,error,imageReady,selected,day:d?{id:d.id,g:d.g,q:d.q}:null,interval:d?[Math.round(start*100),Math.round((start+d.q)*100)]:null,probabilitySum:days.reduce((v,x)=>v+x.q,0),dataKind:'teaching-count-units',samplingExecuted:false,modelRun:false,authorChartDays:92};}
function selectDay(id){const d=days.find(x=>x.id===id);if(!d)return getState();selected=id;for(const b of buttons)b.setAttribute('aria-pressed',String(b.dataset.samplingDay===id));for(const b of bands)b.dataset.active=String(b.dataset.probabilityDay===id);reading.textContent=`${id}日的預估是${d.g}，占電腦總量100的${Math.round(d.q*100)}%，所以每次抽到${id}的機率是${Math.round(d.q*100)}%。其他三天仍有機會。`;return getState();}
async function load(){if(loading)return;loading=true;error=null;retry.hidden=true;for(const b of buttons)b.disabled=true;try{const response=await fetch('animation/data/sampling-teaching-v01.json');if(!response.ok)throw new Error('互動資料未載入');const data=await response.json();days=data.days;ready=true;selectDay(selected);for(const b of buttons)b.disabled=false;status.textContent='';}catch(cause){ready=false;error=cause.message;status.textContent='互動資料暫時無法載入。可以重新載入，或先閱讀四天的數字與機率。';retry.hidden=false;}finally{loading=false;}}
for(const b of buttons)b.addEventListener('click',()=>selectDay(b.dataset.samplingDay));
retry.addEventListener('click',load);
image.decode().then(()=>imageReady=true,()=>imageReady=false);
window.DiscountHero={getState,selectDay,retry:load,get ready(){return ready;}};
load();
