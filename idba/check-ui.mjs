import {engine,axes} from './yishu.mjs';
import {vocabulary,matchingRoutes,routeURL} from './navigator.mjs';
let count=0;
function check(n,v){if(!v)throw Error(n);count++}
for(const l of ['ru','zh','en','ky','kk','uz']){
 const {t,v}=vocabulary(l);
 check(l+' locale UI',t.ui.length===22&&t.q.length===7&&t.routes.length===11&&t.routes.every(a=>a.length===4&&a.every(Boolean)));
 for(const k of axes.order)check(l+' '+k,axes.axes[k].values.every(x=>typeof v[k][x]==='string'&&v[k][x].length>0));
 check(l+' comp',t.comp.length===9&&t.dir.length===4&&t.trans.length===4);
}
check('all routes',matchingRoutes().length===11);
check('role facet',matchingRoutes({subject:'inv'}).map(n=>n.route).join()==='invest');
check('architecture facet',matchingRoutes({comp:'sem'}).some(n=>n.route==='semantic'));
check('transition facet',matchingRoutes({transition:'protect'}).map(n=>n.route).join()==='protect');
check('industry non-excluding',matchingRoutes({industry:'it'}).length===11);
check('direction facet',matchingRoutes({direction:'inbound'}).every(n=>n.directions.includes('inbound')));
const url=routeURL({r:'enter',o:'CN',d:'KG',email:'private@example.com',src:'menu'},'/ru/start/');
check('validated deep link',url==='/ru/start/?o=CN&d=KG&r=enter&src=menu#idba-navigator');
const state=Object.fromEntries(new URLSearchParams(url.split('?')[1].split('#')[0]));
check('link roundtrip',engine.profile(state).contextId===engine.profile({r:'enter',o:'CN',d:'KG',src:'menu'}).contextId);
console.log(count+' UI model checks passed');
