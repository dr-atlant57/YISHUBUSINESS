import {cases,caseURL,relatedCases,supportedLocales} from './cases.mjs';
import {engine,graph} from './yishu.mjs';
let count=0;function check(n,v){if(!v)throw Error(n);count++}
check('four cases',cases.length===4);
check('unique namespace',new Set(cases.map(c=>c.id)).size===4);
check('no measured outcome',cases.every(c=>['concept','prototype'].includes(c.stage)));
check('partial ecology',cases.find(c=>c.slug==='issyk-kul').partial===true);
const routes=graph.nodes.filter(n=>n.type==='intent').map(n=>n.route);
for(const c of cases){
 check(c.id+' source',c.sources.length>0);
 check(c.id+' route refs',c.routes.every(r=>routes.includes(r)));
 check(c.id+' competence refs',c.competences.every(x=>graph.nodes.some(n=>n.id==='comp.'+x)));
 for(const l of supportedLocales)check(c.id+' '+l,caseURL(c,l)==='/'+l+'/portfolio/'+c.slug+'/');
}
for(const route of routes){
 const p=engine.profile({r:route});
 check(route+' separation',relatedCases(p).every(c=>c.routes.includes(route)&&c.authorship==='own'&&!c.id.startsWith('ev.')));
}
check('semantic includes YISHU',relatedCases(engine.profile({r:'semantic'})).some(c=>c.id==='YS-YISHU'));
check('missing route',relatedCases({}).length===0);
check('bad lang',caseURL(cases[0],'../')===null);
console.log(count+' evidence model checks passed');
