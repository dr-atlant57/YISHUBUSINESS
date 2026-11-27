// Public evidence adapter. Route associations are editorial mappings, not client outcome evidence.
// The original graph's scenario nodes remain unchanged. No confidential source documents here.
export const cases=[
  {
    "id": "YS-YISHU",
    "slug": "yishu",
    "name": "YISHU",
    "stage": "prototype",
    "industry": "business_architecture",
    "sources": [
      "Y-112",
      "Y-021",
      "Y-024"
    ],
    "competences": [
      "strat",
      "mkt",
      "sem",
      "cult",
      "sales"
    ],
    "routes": [
      "enter",
      "expand",
      "grow",
      "transform",
      "semantic"
    ],
    "authorship": "own"
  },
  {
    "id": "YS-KLEOS",
    "slug": "kleos",
    "name": "KLEOS",
    "stage": "concept",
    "industry": "corporate_programs",
    "sources": [
      "Y-113",
      "Y-080"
    ],
    "competences": [
      "mkt",
      "strat",
      "sem",
      "ops"
    ],
    "routes": [
      "grow",
      "transform",
      "semantic"
    ],
    "authorship": "own"
  },
  {
    "id": "YS-NOMAD",
    "slug": "nomad",
    "name": "NOMAD",
    "stage": "concept",
    "industry": "fashion_manufacturing",
    "sources": [
      "Y-122"
    ],
    "competences": [
      "strat",
      "mkt",
      "ops",
      "sales"
    ],
    "routes": [
      "expand",
      "grow",
      "integrate"
    ],
    "authorship": "own"
  },
  {
    "id": "YS-ISSYK-KUL",
    "slug": "issyk-kul",
    "name": "ISSYK-KUL",
    "stage": "concept",
    "industry": "ecology_economy",
    "sources": [
      "Y-123"
    ],
    "competences": [
      "strat",
      "net",
      "mkt"
    ],
    "routes": [
      "integrate",
      "transform"
    ],
    "authorship": "own",
    "partial": true
  }
];
export const caseLabels={
  "ru": [
    "Связанные авторские разработки",
    "Концепция",
    "Прототип",
    "Смотреть архитектуру"
  ],
  "en": [
    "Related original work",
    "Concept",
    "Prototype",
    "Explore architecture"
  ],
  "ky": [
    "Байланышкан автордук иштеп чыгуулар",
    "Концепция",
    "Прототип",
    "Архитектураны көрүү"
  ],
  "kk": [
    "Байланысты авторлық әзірлемелер",
    "Тұжырымдама",
    "Прототип",
    "Архитектураны көру"
  ],
  "uz": [
    "Bog‘liq mualliflik ishlari",
    "Konsepsiya",
    "Prototip",
    "Arxitekturani ko‘rish"
  ],
  "zh": [
    "相关原创架构",
    "概念",
    "原型",
    "查看架构"
  ]
};
export const supportedLocales=Object.keys(caseLabels);
export function relatedCases(profile){
 if(!profile?.route)return [];
 return cases.filter(c=>c.routes.includes(profile.route)).map(c=>({...c,score:c.competences.filter(x=>profile.task?.includes('comp.'+x)).length})).sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id));
}
export function caseURL(c,lang){if(!supportedLocales.includes(lang)||!cases.some(x=>x.id===c.id&&x.slug===c.slug))return null;return '/'+lang+'/portfolio/'+c.slug+'/';}
