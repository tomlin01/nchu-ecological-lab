(() => {
  'use strict';
  const links=[...document.querySelectorAll('.case-plate[data-case]')];
  const name=document.getElementById('preview-name');
  const copy=document.getElementById('preview-copy');
  const canHover=matchMedia('(hover: hover)');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let current=links[0]?.dataset.case || null;
  let printState=null;
  function preview(id){
    const selected=links.find(link=>link.dataset.case===id);
    if(!selected||!name||!copy)return false;
    current=id;
    name.textContent=selected.dataset.previewName;
    copy.textContent=selected.dataset.previewCopy;
    links.forEach(link=>link.classList.toggle('is-previewed',link===selected));
    return true;
  }
  links.forEach(link=>{
    link.addEventListener('pointerenter',event=>{if(canHover.matches&&event.pointerType!=='touch')preview(link.dataset.case);});
    link.addEventListener('focus',()=>preview(link.dataset.case));
    link.addEventListener('pointerleave',()=>{
      const focused=document.activeElement?.closest?.('.case-plate[data-case]');
      if(focused)preview(focused.dataset.case);
    });
  });
  // All navigation stays native, including the first tap on a touch screen.
  window.EcologyTopicHome={preview,getState:()=>({topic:'topic-02',previewCase:current,caseCount:links.length,reducedMotion:reduced.matches})};
  window.addEventListener('beforeprint',()=>{
    if(printState)return;
    printState=[...document.querySelectorAll('details')].map(detail=>[detail,detail.open]);
    printState.forEach(([detail])=>detail.open=true);
  });
  window.addEventListener('afterprint',()=>{
    if(!printState)return;
    printState.forEach(([detail,open])=>detail.open=open);printState=null;
  });
})();
