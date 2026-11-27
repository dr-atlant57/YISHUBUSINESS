// IDBA core: pure state and graph queries. No DOM, storage, telemetry or language dependencies.
export function createEngine(config){
 const {axes,graph}=config;
 const nodes=new Map(graph.nodes.map(n=>[n.id,n]));
 const routes=new Map(graph.nodes.filter(n=>n.type==="intent").map(n=>[n.route,n]));
 const own=(o,k)=>Object.prototype.hasOwnProperty.call(o,k);
 const valid=(k,v)=>typeof v==="string"&&axes.axes[k]?.values?.includes(v);
 const sanitize=(raw={})=>{
  const s={};
  for(const [key,short] of Object.entries(axes.short)){
   const v=own(raw,short)?raw[short]:own(raw,key)?raw[key]:null;
   if(valid(key,v))s[key]=v;
  }
  if(own(raw,"r")&&routes.has(raw.r))s.r=raw.r;
  if(own(raw,"src")&&[...axes.channels,"direct"].includes(raw.src))s.src=raw.src;
  return s;
 };
 const route=s=>{
  const role=s.subject, explicit=routes.get(s.r);
  if(explicit&&(!role||explicit.subjects?.includes(role)))return explicit.route;
  if(role&&own(axes.subjectRoute,role))return axes.subjectRoute[role];
  return axes.intentSubjects.includes(role)&&routes.has(s.intent)?s.intent:null;
 };
 const normalize=raw=>{
  const s=sanitize(raw),r=route(s),n=routes.get(r);
  if(s.r&&s.r!==r)delete s.r;
  if(n){
   for(const [k,vs] of Object.entries(n.exclude||{}))if(vs.includes(s[k]))delete s[k];
   for(const [k,v] of Object.entries(n.auto||{}))if(!s[k])s[k]=v;
  }
  return s;
 };
 const direction=s=>{
  const {origin:o,destination:d}=s;
  if(!o||!d)return null;
  if(d==="HOME"||d===o)return "domestic";
  const a=axes.regions.CA,f=axes.regions.foreign;
  if(f.includes(o)&&a.includes(d))return "inbound";
  if(a.includes(o)&&a.includes(d))return "regional";
  if(a.includes(o)&&f.includes(d))return "outbound";
  return null;
 };
 const nextAxis=(raw,asked=0,refine=false)=>{
  const s=normalize(raw),r=route(s),n=routes.get(r);
  if(!n)return s.subject?"intent":"subject";
  for(const k of n.req||[])if(!s[k])return k;
  if(!refine&&asked>=axes.questionBudget)return null;
  return (n.opt||[]).find(k=>!s[k])||null;
 };
 const options=(raw,k)=>{
  const s=normalize(raw),n=routes.get(route(s));
  return (axes.axes[k]?.values||[]).filter(v=>!(n?.exclude?.[k]||[]).includes(v));
 };
 const linked=(id,rel,incoming=false)=>graph.edges.filter(e=>e[1]===rel&&e[incoming?2:0]===id).map(e=>e[incoming?0:2]);
 const profile=raw=>{
  const s=normalize(raw),r=route(s),n=routes.get(r);
  if(!n)return {state:s,route:null,next:nextAxis(s)};
  const tr="tr."+r,opp="opp."+r,d=direction(s);
  const competences=linked(tr,"enables",true).filter(id=>nodes.get(id)?.type==="competence");
  if(n.group!=="ecosystem")for(const rule of graph.rules)if(Object.entries(rule.when).every(([k,vs])=>vs.includes(k==="direction"?d:s[k])))competences.push(rule.add);
  const contextId=["YS","V2",r,s.subject||"X",s.intent||"X",s.origin||"X",s.destination||"X",s.industry||"X",s.scale||"X",s.state||"X",s.src||"direct"].join(".").toUpperCase();
  return {state:s,route:r,relation:n.relation,direction:d,transition:axes.transitionType[r],task:[...new Set(competences)],opportunities:linked("intent."+r,"opens"),barriers:linked(tr,"limits",true),resources:linked(tr,"requires"),values:linked(tr,"opens"),offers:linked(tr,"enables",true).filter(id=>nodes.get(id)?.type==="offer"),scenarios:linked(opp,"proves",true).filter(id=>nodes.get(id)?.kind==="scenario"),contextId};
 };
 return {sanitize,normalize,route,direction,nextAxis,options,profile,linked};
}
