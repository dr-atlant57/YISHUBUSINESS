import {engine,axes,graph} from './yishu.mjs';
import {locale} from './locale.mjs';

const dirs=['inbound','domestic','outbound','regional'];
const trans=['develop','transform','integrate','protect'];
const comps=['strat','struct','cult','mkt','sales','ops','risk','net','sem'];
const routes=graph.nodes.filter(n=>n.type==='intent');
export function vocabulary(lang){
 const t=locale[lang]||locale.en;
 const v={};
 for(const k of axes.order.filter(k=>k!=='destination'))v[k]=Object.fromEntries(axes.axes[k].values.map((x,i)=>[x,t[k][i]]));
 v.destination=Object.fromEntries(axes.axes.destination.values.map(x=>[x,x==='MULTI'?t.extra[0]:x==='HOME'?t.extra[1]:v.origin[x]]));
 return {t,v};
}
export function matchingRoutes(filters={}){
 return routes.filter(n=>(!filters.direction||n.directions?.includes(filters.direction))&&(!filters.transition||axes.transitionType[n.route]===filters.transition)&&(!filters.subject||n.subjects?.includes(filters.subject))&&(!filters.state||n.states?.includes(filters.state))&&(!filters.comp||engine.profile({r:n.route}).task.includes('comp.'+filters.comp)));
}
export function routeURL(raw,pathname){
 const s=engine.normalize(raw),params=new URLSearchParams();
 for(const [k,short] of Object.entries(axes.short))if(s[k])params.set(short,s[k]);
 if(s.r)params.set('r',s.r);
 if(s.src)params.set('src',s.src);
 return pathname+(params.size?'?'+params.toString():'')+'#idba-navigator';
}
function el(tag,text,cls){
 const e=document.createElement(tag);if(text!=null)e.textContent=text;if(cls)e.className=cls;return e;
}
export function mount(form){
 if(!form||document.getElementById('idba-navigator'))return;
 const lang=document.documentElement.lang.split('-')[0];
 const {t,v}=vocabulary(lang),u=t.ui;
 const section=el('section',null,'idba-shell');section.id='idba-navigator';
 section.setAttribute('aria-labelledby','idba-heading');
 const kicker=el('span','YISHU · IDBA','kicker'),heading=el('h2',u[0]);heading.id='idba-heading';
 const actions=el('div',null,'idba-actions'),panel=el('div',null,'idba-panel'),map=el('div',null,'idba-map');
 map.id='idba-map';map.hidden=true;
 section.append(kicker,heading,actions,panel,map);
 form.closest('.assessment').before(section);
 const btn=(name,action,cls='outline')=>{const e=el('button',name,cls);e.type='button';e.addEventListener('click',action);return e;};
 let state=engine.normalize(Object.fromEntries(new URLSearchParams(location.search))),history=[],refine=false;
 let asked=axes.order.filter(k=>state[k]).length;
 const selectRoute=(id,industry)=>{history=[];asked=0;refine=false;state={r:id,src:'menu',...(industry?{industry}:{})};map.hidden=true;render(true);};
 const sync=()=>{try{window.history.replaceState(null,'',routeURL(state,location.pathname));}catch(e){}};
 function clearContact(){
  delete form.dataset.idbaContext;delete form.dataset.idbaRoute;
  const out=document.getElementById('profile');if(out)out.hidden=true;
 }
 function snapshot(){history.push({state:{...state},asked,refine});}
 function back(){const p=history.pop();if(p){state=p.state;asked=p.asked;refine=p.refine;render(true);}}
 function restart(){state={src:'quiz'};history=[];asked=0;refine=false;map.hidden=true;render(true);}
 function apply(p){
  form.dataset.idbaContext=p.contextId;form.dataset.idbaRoute=p.route;
 }
 function focusPanel(){const h=panel.querySelector('h3');if(h){h.tabIndex=-1;h.focus({preventScroll:true});}section.scrollIntoView({block:'start',behavior:'auto'});}
 function render(focus=false){
  clearContact();
  state=engine.normalize(state);
  panel.replaceChildren();
  const axis=engine.nextAxis(state,asked,refine),p=engine.profile(state);
  if(axis){
   panel.append(el('span',axes.axes[axis].n+' / 08','kicker'),el('h3',t.q[axes.order.indexOf(axis)]));
   const opts=el('div',null,'idba-options');
   for(const key of engine.options(state,axis))opts.append(btn(v[axis][key],()=>{snapshot();state={...state,[axis]:key,src:state.src||'quiz'};asked++;render(true);}));
   panel.append(opts);
  }else if(p.route){
   const n=routes.findIndex(n=>n.route===p.route),row=t.routes[n];
   panel.append(el('span',u[6],'kicker'),el('h3',row[0]));
   const chosen=axes.order.filter(k=>p.state[k]).map(k=>v[k][p.state[k]]);
   if(p.direction)chosen.push(t.dir[dirs.indexOf(p.direction)]);
   if(chosen.length)panel.append(el('p',chosen.join(' · '),'muted'));
   const grid=el('div',null,'idba-states');
   const now=p.state.state?v.state[p.state.state]:row[1];
   [now,row[2],row[3]].forEach((x,i)=>{const card=el('div',null,'idba-state');card.append(el('span',u[7+i],'kicker'),el('strong',x));grid.append(card);});
   panel.append(grid,el('p',u[10],'muted'),el('h4',u[11]));
   const ul=el('ul',null,'idba-layers');p.task.forEach(x=>{const name=t.comp[comps.indexOf(x.split('.')[1])];if(name)ul.append(el('li',name));});panel.append(ul);
   const context=el('p','Context ID: '+p.contextId,'idba-context');
   const controls=el('div',null,'idba-actions');
   controls.append(btn(u[12],()=>{
    apply(p);
    const marketMap={KG:'Kyrgyzstan · KG',KZ:'Kazakhstan · KZ',UZ:'Uzbekistan · UZ',CN:'China · CN'};
    const m=p.state.destination==='HOME'?p.state.origin:p.state.destination;
    if(marketMap[m]&&[...form.elements.market.options].some(o=>o.value===marketMap[m]))form.elements.market.value=marketMap[m];
    if(p.route==='semantic')form.elements.type.value='5';
    form.scrollIntoView({block:'start',behavior:'auto'});form.elements.description.focus({preventScroll:true});
   },'button'));
   if(engine.nextAxis(state,asked,true))controls.append(btn(u[5],()=>{snapshot();refine=true;render(true);}));
   const share=el('a',u[20],'outline');share.href=routeURL(state,location.pathname);controls.append(share);
   panel.append(context,el('p',u[13],'muted'),controls);
   apply(p);
  }
  const bottom=el('div',null,'idba-actions');
  if(history.length)bottom.append(btn(u[3],back));
  if(asked||state.r)bottom.append(btn(u[4],restart));
  panel.append(bottom);
  sync();if(focus)focusPanel();
 }
 actions.append(btn(u[1],()=>{map.hidden=true;panel.hidden=false;restart();},'button'),btn(u[2],()=>{map.hidden=!map.hidden;if(!map.hidden)map.scrollIntoView({block:'start',behavior:'auto'});}));
 const filters=el('div',null,'idba-filters'),cards=el('div',null,'idba-options'),values={};
 const makeFilter=(key,title,keys,labels)=>{
  const label=el('label',title),s=el('select');s.append(new Option(u[14],''));
  keys.forEach((k,i)=>s.append(new Option(labels[i],k)));
  s.addEventListener('change',()=>{values[key]=s.value;drawMap();});label.append(s);filters.append(label);
 };
 makeFilter('direction',u[15],dirs,t.dir);
 makeFilter('transition',u[16],trans,t.trans);
 makeFilter('subject',u[17],axes.axes.subject.values,t.subject);
 makeFilter('industry',u[18],axes.axes.industry.values,t.industry);
 makeFilter('state',u[19],axes.axes.state.values,t.state);
 makeFilter('comp',u[11],comps,t.comp);
 function drawMap(){
  cards.replaceChildren();
  const found=matchingRoutes(values);
  for(const n of found){const a=el('a',t.routes[routes.indexOf(n)][0],'outline');a.href=routeURL({r:n.route,src:'menu',industry:values.industry||undefined},location.pathname);a.addEventListener('click',e=>{if(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;e.preventDefault();selectRoute(n.route,values.industry);});cards.append(a);}
  if(!found.length)cards.append(el('p',u[21],'muted'));
 }
 map.append(el('h3',u[2]),filters,cards);drawMap();render();
}
