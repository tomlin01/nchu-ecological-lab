(() => {
  'use strict';
  const proof=document.getElementById('hero-proof');
  const rows=[...proof.querySelectorAll('.source-sequence')];
  const controls=[...proof.querySelectorAll('[data-position]')];
  const readout=document.getElementById('position-readout');
  function select(position){
    const letters=rows.map(row=>row.querySelector(`[data-column="${position}"]`)?.textContent);
    if(letters.some(letter=>!letter))return;
    proof.querySelectorAll('.sequence-cell').forEach(cell=>cell.classList.toggle('is-selected',cell.dataset.column===position));
    controls.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.position===position)));
    readout.textContent=`第${position}欄：第一筆是${letters[0]}，第二筆是${letters[1]}。`;
  }
  controls.forEach(button=>button.addEventListener('click',()=>select(button.dataset.position)));
  if(controls.length)select(controls[0].dataset.position);
  window.EcologyCOIProof={getState:()=>({position:controls.find(button=>button.getAttribute('aria-pressed')==='true')?.dataset.position,readout:readout.textContent,modelInferenceRun:false})};
})();
