const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');

// Exercise the real loading functions while leaving layout/GSAP initialization out of unit tests.
function fixture(){
  const callbacks=new Map(),idle=[],requests=[];
  const retry={hidden:true,addEventListener(){}};
  const status={textContent:'',parentElement:{classList:{toggle(){}}}};
  const ids=Array.from({length:12},(_,i)=>String(i+1).padStart(2,'0'));
  const images=[];
  class Image {
    constructor(topic,environment=null){
      this.topic=topic;this.environment=environment;this.attrs=new Map();this.listeners={};
      this.complete=false;this.naturalWidth=0;this.loading='lazy';this.assignments=0;
      this.attrs.set(environment?'data-src':'src',`${topic}/${environment||'art'}.png`);
    }
    getAttribute(key){return this.attrs.get(key)||null;}
    removeAttribute(key){this.attrs.delete(key);}
    set src(value){this.attrs.set('src',value);this.assignments++;this.complete=false;this.naturalWidth=0;requests.push(value);}
    get src(){return this.attrs.get('src');}
    closest(selector){
      if(selector==='.environment-layer')return this.environment?{dataset:{environment:this.environment}}:null;
      if(selector==='.topic')return {dataset:{topic:this.topic}};
      return null;
    }
    addEventListener(type,callback){(this.listeners[type]??=[]).push(callback);}
    decode(){return Promise.resolve();}
    finish(ok=true){
      this.complete=true;this.naturalWidth=ok?100:0;
      const type=ok?'load':'error',listeners=this.listeners[type]||[];this.listeners[type]=[];
      listeners.forEach(callback=>callback());
    }
  }
  for(const id of ids)images.push(new Image(id));
  const environment=new Image('01','01-01');images.push(environment);
  const fieldStage={querySelector(selector){return selector.includes('01-01')?environment:null;}};
  const sections=ids.map(id=>({dataset:{topic:id},classList:{contains(){return Number(id)>5;}},
    querySelector(selector){return selector==='.field-stage'?fieldStage:null;},
    querySelectorAll(){return images.filter(image=>image.topic===id);}}));
  const document={documentElement:{},hidden:false,fonts:{status:'loaded'},
    currentScript:{src:'https://example.test/nchu-ecological-lab/home-atlas/app.js'},
    querySelectorAll(selector){return selector==='.topic[data-topic]'?sections:selector==='img'?images:[];},
    getElementById(id){return id==='retry-assets'?retry:id==='load-status'?status:sections.find(section=>id===`topic-${section.dataset.topic}`)||null;},
    addEventListener(){}};
  const context={document,console,URL,innerWidth:1440,innerHeight:900,location:{hash:''},
    matchMedia(){return {matches:false,addEventListener(){}};},
    addEventListener(name,callback){callbacks.set(name,callback);},
    requestAnimationFrame(){return 1;},cancelAnimationFrame(){},clearTimeout(){},
    setTimeout(callback){idle.push(callback);return 1;},requestIdleCallback(callback){idle.push(callback);return 1;}};
  context.window=context;
  let source=fs.readFileSync(path.join(__dirname,'../dist/home-atlas/app.js'),'utf8');
  const ending='  init();\n})();';assert.ok(source.endsWith(ending+'\n')||source.endsWith(ending));
  source=source.replace(ending,`  window.loadingTest={prepareTopicImages,prepareEnvironment,prefetchNextTopic,watchImage,retryImages,checkAssetStatus,
    setActive(id,chosen=null){activeTopic=id;selectedCases['01']=chosen;},
    ready(){return assetsReady;},failedCount(){return failedImages.size;}};\n})();`);
  vm.runInNewContext(source,context);
  return {api:context.loadingTest,images,environment,callbacks,idle,requests,retry,status,document};
}
const settle=()=>new Promise(resolve=>setImmediate(resolve));

test('initial status ignores unloaded future topics and hidden environments',async()=>{
  const f=fixture();f.api.setActive('01');const ready=f.api.prepareTopicImages('01');
  assert.equal(f.images[0].loading,'eager');assert.equal(f.images[1].loading,'lazy');
  assert.equal(f.environment.getAttribute('src'),null);assert.equal(f.requests.length,0);
  f.images[0].finish();await ready;f.api.checkAssetStatus();assert.equal(f.api.ready(),true);
});
test('a selected environment is requested once; failed loading offers retry',async()=>{
  const f=fixture();f.api.setActive('01','01-01');f.api.prepareEnvironment('01-01');
  assert.equal(f.environment.assignments,1);assert.equal(f.environment.getAttribute('data-src'),null);
  f.environment.finish(false);await settle();assert.equal(f.retry.hidden,false);
  const retry=f.api.retryImages();assert.equal(f.environment.assignments,2);
  assert.match(f.environment.src,/retry=1/);f.environment.finish();await retry;
  assert.equal(f.api.failedCount(),0);
});
test('next-topic preload waits for current pictures and runs at idle',async()=>{
  const f=fixture();f.api.setActive('01');f.api.prefetchNextTopic('01');
  assert.equal(f.idle.length,0);assert.equal(f.images[1].loading,'lazy');
  f.images[0].finish();await settle();assert.equal(f.idle.length,1);
  f.idle.shift()();assert.equal(f.images[1].loading,'eager');
  assert.equal(f.images[2].loading,'lazy');assert.equal(f.environment.assignments,0);
});
test('stale prefetch does not run after changing the active topic',async()=>{
  const f=fixture();f.api.setActive('01');f.api.prefetchNextTopic('01');
  f.images[0].finish();await settle();f.api.setActive('05');f.idle.shift()();
  assert.equal(f.images[1].loading,'lazy');
});
test('deep-linked extension covers receive eager loading without core assets',async()=>{
  const f=fixture();f.api.setActive('08');const p=f.api.prepareTopicImages('08');
  assert.equal(f.images[7].loading,'eager');assert.equal(f.images[0].loading,'lazy');
  f.images[7].finish();await p;f.api.checkAssetStatus();assert.equal(f.api.ready(),true);
});
test('printing promotes gallery images without downloading decorative backgrounds',()=>{
  const f=fixture();f.callbacks.get('beforeprint')();
  assert.ok(f.images.filter(image=>!image.environment).every(image=>image.loading==='eager'));
  assert.equal(f.environment.getAttribute('src'),null);
});
test('observing an image repeatedly does not attach duplicate download handlers',()=>{
  const f=fixture(),image=f.images[0];
  assert.equal(f.api.watchImage(image),f.api.watchImage(image));
  assert.equal(image.listeners.load.length,1);assert.equal(image.listeners.error.length,1);
});
