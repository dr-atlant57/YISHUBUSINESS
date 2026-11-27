"use strict";
// IDBA M1: locale-independent context + opaque enquiry draft identifier.
// No personal information is used in either identifier.
const idbaMarkets=Object.freeze({"Kyrgyzstan · KG":"KG","Kazakhstan · KZ":"KZ","Uzbekistan · UZ":"UZ","China · CN":"CN","Global":"GLOBAL"});
function idbaContext(market,type,scaleIndex,languages){
  const m=Object.prototype.hasOwnProperty.call(idbaMarkets,market)?idbaMarkets[market]:"UNKNOWN";
  const t=/^[0-9]$/.test(type)?type:"UNKNOWN";
  const s=["GROWING","LARGE"][scaleIndex]||"UNKNOWN";
  const l=/^[1-6]$/.test(languages)?languages:"UNKNOWN";
  return ["YISHU","V1",m,t,s,"L"+l].join("-");
}
function idbaEnquiry(){
  const c=globalThis.crypto;
  if(!c||!c.getRandomValues)return null;
  if(typeof c.randomUUID==="function")return c.randomUUID();
  return Array.from(c.getRandomValues(new Uint8Array(16)),x=>x.toString(16).padStart(2,"0")).join("");
}
const lang=document.getElementById("language");if(lang)lang.addEventListener("change",()=>{const next=new URL(lang.value,location.origin);if(document.getElementById("idba-navigator")&&next.pathname.endsWith("/start/")){next.search=location.search;next.hash=location.hash}location.href=next.href});const first=document.querySelector(".langgrid");if(first){const supported=["ru","ky","kk","uz","zh","en"];const chosen=(navigator.languages||[navigator.language]).map(x=>x.split("-")[0].toLowerCase()).find(x=>supported.includes(x));if(chosen){const a=first.querySelector('[data-lang="'+chosen+'"]');if(a){a.classList.add("suggested");a.setAttribute("aria-label",a.textContent.trim())}}}const form=document.getElementById("assessment");if(form){const enquiryId=idbaEnquiry();form.addEventListener("submit",e=>{e.preventDefault();const data=new FormData(form),get=n=>String(data.get(n)||"");const type=form.elements.type.selectedOptions[0].textContent,scale=form.elements.scale.value;const details=[get("market"),scale,get("languages")+" / languages"].join(" · ");document.getElementById("scope").textContent=type;document.getElementById("profile-detail").textContent=details;const intakeId=idbaContext(get("market"),get("type"),form.elements.scale.selectedIndex,get("languages"));const cid=/^YS\.V2\.[A-Z0-9.]+$/.test(form.dataset.idbaContext||"")?form.dataset.idbaContext:intakeId;const msg=["YISHU.BUSINESS — Project enquiry","Context ID: "+cid,"Intake ID: "+intakeId,"Route: "+(form.dataset.idbaRoute||"direct"),"Enquiry ID: "+(enquiryId||"unavailable"),"Market: "+get("market"),"Scope: "+type,"Scale: "+scale,"Languages: "+get("languages"),"Email: "+get("email"),"Description: "+get("description")].join("\n");document.getElementById("mail").href="mailto:rootfrontier.office@gmail.com?subject="+encodeURIComponent("["+cid+"] YISHU — Project enquiry"+(enquiryId?" ["+enquiryId+"]":""))+"&body="+encodeURIComponent(msg);const out=document.getElementById("profile");out.hidden=false;out.scrollIntoView({block:"nearest",behavior:"auto"});});}
// Progressive enhancement: direct contact remains usable even if IDBA cannot load.
if(form){form.addEventListener('input',()=>{const out=document.getElementById('profile');if(out)out.hidden=true;});import('/idba/navigator.mjs').then(m=>m.mount(form)).catch(err=>console.warn('IDBA navigator unavailable',err));}
