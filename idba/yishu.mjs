// YISHU domain adapter: axes and graph ported from Claude v1.0 data/axes.json and data/graph.json. Node order is not significant.
import {createEngine} from './core.mjs';
export const axes={
  "version": "1.0",
  "order": [
    "subject",
    "intent",
    "origin",
    "destination",
    "industry",
    "scale",
    "state"
  ],
  "short": {
    "subject": "s",
    "intent": "i",
    "origin": "o",
    "destination": "d",
    "industry": "ind",
    "scale": "m",
    "state": "st"
  },
  "axes": {
    "subject": {
      "n": "01",
      "values": [
        "owner",
        "rep",
        "spec",
        "conn",
        "inv",
        "agent"
      ]
    },
    "state": {
      "n": "02",
      "values": [
        "scout",
        "entry",
        "launch",
        "grow",
        "stall",
        "rebuild"
      ]
    },
    "intent": {
      "n": "03",
      "values": [
        "enter",
        "expand",
        "grow",
        "transform",
        "protect",
        "integrate",
        "semantic"
      ]
    },
    "origin": {
      "n": "04",
      "values": [
        "CN",
        "TR",
        "KR",
        "GCC",
        "EU",
        "KG",
        "KZ",
        "UZ",
        "OT"
      ]
    },
    "destination": {
      "n": "05",
      "values": [
        "KG",
        "KZ",
        "UZ",
        "MULTI",
        "CN",
        "TR",
        "OT",
        "HOME"
      ]
    },
    "industry": {
      "n": "06",
      "values": [
        "trade",
        "mfg",
        "build",
        "log",
        "agro",
        "serv",
        "tour",
        "it",
        "res"
      ]
    },
    "scale": {
      "n": "07",
      "values": [
        "solo",
        "small",
        "ent",
        "hold"
      ]
    },
    "task": {
      "n": "08",
      "derived": true
    }
  },
  "regions": {
    "CA": [
      "KG",
      "KZ",
      "UZ",
      "MULTI"
    ],
    "foreign": [
      "CN",
      "TR",
      "KR",
      "GCC",
      "EU",
      "OT"
    ]
  },
  "subjectRoute": {
    "spec": "network",
    "conn": "connect",
    "inv": "invest",
    "agent": "represent"
  },
  "intentSubjects": [
    "owner",
    "rep"
  ],
  "transitionType": {
    "enter": "develop",
    "expand": "develop",
    "grow": "develop",
    "transform": "transform",
    "protect": "protect",
    "integrate": "integrate",
    "invest": "develop",
    "network": "integrate",
    "connect": "integrate",
    "represent": "integrate",
    "semantic": "transform"
  },
  "channels": [
    "quiz",
    "menu",
    "ads",
    "organic",
    "partner",
    "social"
  ],
  "questionBudget": 4
};
export const graph={
  "version": "1.0",
  "nodeTypes": [
    "intent",
    "state",
    "opportunity",
    "barrier",
    "transition",
    "competence",
    "evidence",
    "value",
    "resource",
    "offer"
  ],
  "edgeTypes": [
    "limits",
    "opens",
    "amplifies",
    "enables",
    "requires",
    "proves"
  ],
  "nodes": [
    {
      "id": "intent.enter",
      "type": "intent",
      "route": "enter",
      "group": "company",
      "relation": "client",
      "seo": true,
      "slug": "vhod-na-rynok",
      "req": [
        "origin",
        "destination"
      ],
      "opt": [
        "industry",
        "scale",
        "state"
      ],
      "exclude": {
        "destination": [
          "HOME"
        ]
      },
      "states": [
        "scout",
        "entry",
        "launch"
      ],
      "directions": [
        "inbound",
        "regional"
      ],
      "subjects": [
        "owner",
        "rep"
      ]
    },
    {
      "id": "intent.expand",
      "type": "intent",
      "route": "expand",
      "group": "company",
      "relation": "client",
      "seo": true,
      "slug": "vyhod-na-novyj-rynok",
      "req": [
        "origin",
        "destination"
      ],
      "opt": [
        "industry",
        "scale"
      ],
      "exclude": {
        "destination": [
          "HOME"
        ]
      },
      "states": [
        "scout",
        "entry",
        "launch",
        "grow"
      ],
      "directions": [
        "outbound",
        "regional"
      ],
      "subjects": [
        "owner",
        "rep"
      ]
    },
    {
      "id": "intent.grow",
      "type": "intent",
      "route": "grow",
      "group": "company",
      "relation": "strategic",
      "seo": true,
      "slug": "rost",
      "req": [
        "origin"
      ],
      "opt": [
        "industry",
        "state",
        "scale"
      ],
      "auto": {
        "destination": "HOME"
      },
      "states": [
        "launch",
        "grow",
        "stall"
      ],
      "directions": [
        "domestic"
      ],
      "subjects": [
        "owner",
        "rep"
      ]
    },
    {
      "id": "intent.transform",
      "type": "intent",
      "route": "transform",
      "group": "company",
      "relation": "client",
      "seo": true,
      "slug": "transformaciya",
      "req": [
        "state"
      ],
      "opt": [
        "industry",
        "scale"
      ],
      "states": [
        "stall",
        "rebuild"
      ],
      "directions": [
        "domestic",
        "inbound",
        "outbound",
        "regional"
      ],
      "subjects": [
        "owner",
        "rep"
      ]
    },
    {
      "id": "intent.protect",
      "type": "intent",
      "route": "protect",
      "group": "company",
      "relation": "client",
      "seo": true,
      "slug": "audit-arhitektury",
      "req": [],
      "opt": [
        "industry",
        "scale"
      ],
      "states": [
        "grow",
        "launch"
      ],
      "directions": [
        "domestic",
        "inbound",
        "outbound",
        "regional"
      ],
      "subjects": [
        "owner",
        "rep"
      ]
    },
    {
      "id": "intent.integrate",
      "type": "intent",
      "route": "integrate",
      "group": "company",
      "relation": "partner",
      "seo": true,
      "slug": "obedinenie",
      "req": [
        "destination"
      ],
      "opt": [
        "origin",
        "industry"
      ],
      "states": [
        "scout",
        "entry",
        "launch",
        "grow",
        "stall",
        "rebuild"
      ],
      "directions": [
        "domestic",
        "inbound",
        "outbound",
        "regional"
      ],
      "subjects": [
        "owner",
        "rep"
      ]
    },
    {
      "id": "intent.invest",
      "type": "intent",
      "route": "invest",
      "group": "investor",
      "relation": "investor",
      "seo": true,
      "slug": "investoram",
      "req": [
        "destination"
      ],
      "opt": [
        "industry"
      ],
      "exclude": {
        "destination": [
          "HOME"
        ]
      },
      "states": [
        "scout"
      ],
      "directions": [
        "inbound",
        "regional"
      ],
      "subjects": [
        "inv"
      ]
    },
    {
      "id": "intent.network",
      "type": "intent",
      "route": "network",
      "group": "ecosystem",
      "relation": "specialist",
      "seo": true,
      "slug": "set-specialistov",
      "req": [
        "origin"
      ],
      "subjects": [
        "spec"
      ]
    },
    {
      "id": "intent.connect",
      "type": "intent",
      "route": "connect",
      "group": "ecosystem",
      "relation": "referral",
      "seo": true,
      "slug": "rekomendaciya",
      "req": [
        "origin"
      ],
      "subjects": [
        "conn"
      ]
    },
    {
      "id": "intent.represent",
      "type": "intent",
      "route": "represent",
      "group": "ecosystem",
      "relation": "agent",
      "seo": false,
      "slug": "predstavitelstvo",
      "req": [
        "origin"
      ],
      "exclude": {
        "origin": [
          "CN",
          "TR",
          "KR",
          "GCC",
          "EU",
          "OT"
        ]
      },
      "subjects": [
        "agent"
      ]
    },
    {
      "id": "intent.semantic",
      "type": "intent",
      "route": "semantic",
      "group": "company",
      "relation": "client",
      "seo": true,
      "slug": "semanticheskaya-arhitektura",
      "req": [
        "industry"
      ],
      "opt": [
        "scale"
      ],
      "states": [
        "launch",
        "grow",
        "rebuild"
      ],
      "directions": [
        "domestic",
        "inbound",
        "outbound",
        "regional"
      ],
      "subjects": [
        "owner",
        "rep"
      ]
    },
    {
      "id": "opp.enter",
      "type": "opportunity"
    },
    {
      "id": "bar.unknown_market",
      "type": "barrier"
    },
    {
      "id": "tr.enter",
      "type": "transition"
    },
    {
      "id": "bar.wrong_sequence",
      "type": "barrier"
    },
    {
      "id": "comp.strat",
      "type": "competence"
    },
    {
      "id": "comp.struct",
      "type": "competence"
    },
    {
      "id": "comp.cult",
      "type": "competence"
    },
    {
      "id": "comp.mkt",
      "type": "competence"
    },
    {
      "id": "comp.sales",
      "type": "competence"
    },
    {
      "id": "comp.net",
      "type": "competence"
    },
    {
      "id": "res.owner_time",
      "type": "resource"
    },
    {
      "id": "res.budget",
      "type": "resource"
    },
    {
      "id": "res.local",
      "type": "resource"
    },
    {
      "id": "ev.enter",
      "type": "evidence",
      "kind": "scenario"
    },
    {
      "id": "val.cost_of_error",
      "type": "value"
    },
    {
      "id": "val.position",
      "type": "value"
    },
    {
      "id": "val.one_architect",
      "type": "value"
    },
    {
      "id": "offer.enter",
      "type": "offer"
    },
    {
      "id": "opp.expand",
      "type": "opportunity"
    },
    {
      "id": "bar.copied_model",
      "type": "barrier"
    },
    {
      "id": "tr.expand",
      "type": "transition"
    },
    {
      "id": "comp.ops",
      "type": "competence"
    },
    {
      "id": "res.data",
      "type": "resource"
    },
    {
      "id": "ev.expand",
      "type": "evidence",
      "kind": "scenario"
    },
    {
      "id": "val.scale",
      "type": "value"
    },
    {
      "id": "offer.expand",
      "type": "offer"
    },
    {
      "id": "opp.grow",
      "type": "opportunity"
    },
    {
      "id": "bar.price_only",
      "type": "barrier"
    },
    {
      "id": "tr.grow",
      "type": "transition"
    },
    {
      "id": "bar.owner_bottleneck",
      "type": "barrier"
    },
    {
      "id": "ev.grow",
      "type": "evidence",
      "kind": "scenario"
    },
    {
      "id": "offer.grow",
      "type": "offer"
    },
    {
      "id": "comp.sem",
      "type": "competence"
    },
    {
      "id": "opp.transform",
      "type": "opportunity"
    },
    {
      "id": "tr.transform",
      "type": "transition"
    },
    {
      "id": "comp.risk",
      "type": "competence"
    },
    {
      "id": "ev.transform",
      "type": "evidence",
      "kind": "scenario"
    },
    {
      "id": "val.resilience",
      "type": "value"
    },
    {
      "id": "offer.transform",
      "type": "offer"
    },
    {
      "id": "opp.protect",
      "type": "opportunity"
    },
    {
      "id": "bar.dependency",
      "type": "barrier"
    },
    {
      "id": "tr.protect",
      "type": "transition"
    },
    {
      "id": "ev.protect",
      "type": "evidence",
      "kind": "scenario"
    },
    {
      "id": "offer.protect",
      "type": "offer"
    },
    {
      "id": "opp.integrate",
      "type": "opportunity"
    },
    {
      "id": "bar.roles_unclear",
      "type": "barrier"
    },
    {
      "id": "tr.integrate",
      "type": "transition"
    },
    {
      "id": "res.network",
      "type": "resource"
    },
    {
      "id": "ev.integrate",
      "type": "evidence",
      "kind": "scenario"
    },
    {
      "id": "val.clarity",
      "type": "value"
    },
    {
      "id": "offer.integrate",
      "type": "offer"
    },
    {
      "id": "opp.invest",
      "type": "opportunity"
    },
    {
      "id": "bar.no_inside_view",
      "type": "barrier"
    },
    {
      "id": "tr.invest",
      "type": "transition"
    },
    {
      "id": "ev.invest",
      "type": "evidence",
      "kind": "scenario"
    },
    {
      "id": "val.insight",
      "type": "value"
    },
    {
      "id": "offer.invest",
      "type": "offer"
    },
    {
      "id": "opp.network",
      "type": "opportunity"
    },
    {
      "id": "bar.single_service",
      "type": "barrier"
    },
    {
      "id": "tr.network",
      "type": "transition"
    },
    {
      "id": "ev.network",
      "type": "evidence",
      "kind": "scenario"
    },
    {
      "id": "val.income",
      "type": "value"
    },
    {
      "id": "offer.network",
      "type": "offer"
    },
    {
      "id": "opp.connect",
      "type": "opportunity"
    },
    {
      "id": "bar.no_channel",
      "type": "barrier"
    },
    {
      "id": "tr.connect",
      "type": "transition"
    },
    {
      "id": "ev.connect",
      "type": "evidence",
      "kind": "scenario"
    },
    {
      "id": "offer.connect",
      "type": "offer"
    },
    {
      "id": "opp.represent",
      "type": "opportunity"
    },
    {
      "id": "tr.represent",
      "type": "transition"
    },
    {
      "id": "ev.represent",
      "type": "evidence",
      "kind": "scenario"
    },
    {
      "id": "offer.represent",
      "type": "offer"
    },
    {
      "id": "opp.semantic",
      "type": "opportunity"
    },
    {
      "id": "bar.knowledge_scattered",
      "type": "barrier"
    },
    {
      "id": "tr.semantic",
      "type": "transition"
    },
    {
      "id": "ev.semantic",
      "type": "evidence",
      "kind": "scenario"
    },
    {
      "id": "val.knowledge",
      "type": "value"
    },
    {
      "id": "offer.semantic",
      "type": "offer"
    }
  ],
  "edges": [
    [
      "intent.enter",
      "opens",
      "opp.enter"
    ],
    [
      "bar.unknown_market",
      "limits",
      "tr.enter"
    ],
    [
      "bar.wrong_sequence",
      "limits",
      "tr.enter"
    ],
    [
      "comp.strat",
      "enables",
      "tr.enter"
    ],
    [
      "comp.struct",
      "enables",
      "tr.enter"
    ],
    [
      "comp.cult",
      "enables",
      "tr.enter"
    ],
    [
      "comp.mkt",
      "enables",
      "tr.enter"
    ],
    [
      "comp.sales",
      "enables",
      "tr.enter"
    ],
    [
      "comp.net",
      "enables",
      "tr.enter"
    ],
    [
      "tr.enter",
      "requires",
      "res.owner_time"
    ],
    [
      "tr.enter",
      "requires",
      "res.budget"
    ],
    [
      "tr.enter",
      "requires",
      "res.local"
    ],
    [
      "ev.enter",
      "proves",
      "opp.enter"
    ],
    [
      "tr.enter",
      "opens",
      "val.cost_of_error"
    ],
    [
      "tr.enter",
      "opens",
      "val.position"
    ],
    [
      "tr.enter",
      "opens",
      "val.one_architect"
    ],
    [
      "offer.enter",
      "enables",
      "tr.enter"
    ],
    [
      "intent.expand",
      "opens",
      "opp.expand"
    ],
    [
      "bar.copied_model",
      "limits",
      "tr.expand"
    ],
    [
      "bar.unknown_market",
      "limits",
      "tr.expand"
    ],
    [
      "comp.strat",
      "enables",
      "tr.expand"
    ],
    [
      "comp.cult",
      "enables",
      "tr.expand"
    ],
    [
      "comp.mkt",
      "enables",
      "tr.expand"
    ],
    [
      "comp.sales",
      "enables",
      "tr.expand"
    ],
    [
      "comp.ops",
      "enables",
      "tr.expand"
    ],
    [
      "tr.expand",
      "requires",
      "res.owner_time"
    ],
    [
      "tr.expand",
      "requires",
      "res.budget"
    ],
    [
      "tr.expand",
      "requires",
      "res.data"
    ],
    [
      "ev.expand",
      "proves",
      "opp.expand"
    ],
    [
      "tr.expand",
      "opens",
      "val.cost_of_error"
    ],
    [
      "tr.expand",
      "opens",
      "val.scale"
    ],
    [
      "offer.expand",
      "enables",
      "tr.expand"
    ],
    [
      "intent.grow",
      "opens",
      "opp.grow"
    ],
    [
      "bar.price_only",
      "limits",
      "tr.grow"
    ],
    [
      "bar.owner_bottleneck",
      "limits",
      "tr.grow"
    ],
    [
      "comp.mkt",
      "enables",
      "tr.grow"
    ],
    [
      "comp.sales",
      "enables",
      "tr.grow"
    ],
    [
      "comp.ops",
      "enables",
      "tr.grow"
    ],
    [
      "tr.grow",
      "requires",
      "res.owner_time"
    ],
    [
      "tr.grow",
      "requires",
      "res.data"
    ],
    [
      "tr.grow",
      "requires",
      "res.budget"
    ],
    [
      "ev.grow",
      "proves",
      "opp.grow"
    ],
    [
      "tr.grow",
      "opens",
      "val.position"
    ],
    [
      "tr.grow",
      "opens",
      "val.scale"
    ],
    [
      "offer.grow",
      "enables",
      "tr.grow"
    ],
    [
      "comp.sem",
      "amplifies",
      "tr.grow"
    ],
    [
      "intent.transform",
      "opens",
      "opp.transform"
    ],
    [
      "bar.wrong_sequence",
      "limits",
      "tr.transform"
    ],
    [
      "bar.owner_bottleneck",
      "limits",
      "tr.transform"
    ],
    [
      "comp.strat",
      "enables",
      "tr.transform"
    ],
    [
      "comp.ops",
      "enables",
      "tr.transform"
    ],
    [
      "comp.sales",
      "enables",
      "tr.transform"
    ],
    [
      "comp.risk",
      "enables",
      "tr.transform"
    ],
    [
      "tr.transform",
      "requires",
      "res.owner_time"
    ],
    [
      "tr.transform",
      "requires",
      "res.data"
    ],
    [
      "ev.transform",
      "proves",
      "opp.transform"
    ],
    [
      "tr.transform",
      "opens",
      "val.scale"
    ],
    [
      "tr.transform",
      "opens",
      "val.resilience"
    ],
    [
      "offer.transform",
      "enables",
      "tr.transform"
    ],
    [
      "comp.sem",
      "amplifies",
      "tr.transform"
    ],
    [
      "intent.protect",
      "opens",
      "opp.protect"
    ],
    [
      "bar.dependency",
      "limits",
      "tr.protect"
    ],
    [
      "comp.risk",
      "enables",
      "tr.protect"
    ],
    [
      "comp.struct",
      "enables",
      "tr.protect"
    ],
    [
      "comp.ops",
      "enables",
      "tr.protect"
    ],
    [
      "tr.protect",
      "requires",
      "res.owner_time"
    ],
    [
      "tr.protect",
      "requires",
      "res.data"
    ],
    [
      "ev.protect",
      "proves",
      "opp.protect"
    ],
    [
      "tr.protect",
      "opens",
      "val.resilience"
    ],
    [
      "tr.protect",
      "opens",
      "val.cost_of_error"
    ],
    [
      "offer.protect",
      "enables",
      "tr.protect"
    ],
    [
      "intent.integrate",
      "opens",
      "opp.integrate"
    ],
    [
      "bar.roles_unclear",
      "limits",
      "tr.integrate"
    ],
    [
      "comp.struct",
      "enables",
      "tr.integrate"
    ],
    [
      "comp.cult",
      "enables",
      "tr.integrate"
    ],
    [
      "comp.risk",
      "enables",
      "tr.integrate"
    ],
    [
      "comp.net",
      "enables",
      "tr.integrate"
    ],
    [
      "tr.integrate",
      "requires",
      "res.owner_time"
    ],
    [
      "tr.integrate",
      "requires",
      "res.local"
    ],
    [
      "tr.integrate",
      "requires",
      "res.network"
    ],
    [
      "ev.integrate",
      "proves",
      "opp.integrate"
    ],
    [
      "tr.integrate",
      "opens",
      "val.clarity"
    ],
    [
      "tr.integrate",
      "opens",
      "val.scale"
    ],
    [
      "offer.integrate",
      "enables",
      "tr.integrate"
    ],
    [
      "intent.invest",
      "opens",
      "opp.invest"
    ],
    [
      "bar.no_inside_view",
      "limits",
      "tr.invest"
    ],
    [
      "comp.strat",
      "enables",
      "tr.invest"
    ],
    [
      "comp.struct",
      "enables",
      "tr.invest"
    ],
    [
      "comp.risk",
      "enables",
      "tr.invest"
    ],
    [
      "comp.net",
      "enables",
      "tr.invest"
    ],
    [
      "tr.invest",
      "requires",
      "res.data"
    ],
    [
      "ev.invest",
      "proves",
      "opp.invest"
    ],
    [
      "tr.invest",
      "opens",
      "val.insight"
    ],
    [
      "tr.invest",
      "opens",
      "val.clarity"
    ],
    [
      "offer.invest",
      "enables",
      "tr.invest"
    ],
    [
      "intent.network",
      "opens",
      "opp.network"
    ],
    [
      "bar.single_service",
      "limits",
      "tr.network"
    ],
    [
      "comp.net",
      "enables",
      "tr.network"
    ],
    [
      "tr.network",
      "requires",
      "res.network"
    ],
    [
      "ev.network",
      "proves",
      "opp.network"
    ],
    [
      "tr.network",
      "opens",
      "val.income"
    ],
    [
      "offer.network",
      "enables",
      "tr.network"
    ],
    [
      "intent.connect",
      "opens",
      "opp.connect"
    ],
    [
      "bar.no_channel",
      "limits",
      "tr.connect"
    ],
    [
      "comp.net",
      "enables",
      "tr.connect"
    ],
    [
      "tr.connect",
      "requires",
      "res.network"
    ],
    [
      "ev.connect",
      "proves",
      "opp.connect"
    ],
    [
      "tr.connect",
      "opens",
      "val.income"
    ],
    [
      "offer.connect",
      "enables",
      "tr.connect"
    ],
    [
      "intent.represent",
      "opens",
      "opp.represent"
    ],
    [
      "bar.no_channel",
      "limits",
      "tr.represent"
    ],
    [
      "comp.net",
      "enables",
      "tr.represent"
    ],
    [
      "comp.sales",
      "enables",
      "tr.represent"
    ],
    [
      "tr.represent",
      "requires",
      "res.network"
    ],
    [
      "tr.represent",
      "requires",
      "res.owner_time"
    ],
    [
      "ev.represent",
      "proves",
      "opp.represent"
    ],
    [
      "tr.represent",
      "opens",
      "val.income"
    ],
    [
      "offer.represent",
      "enables",
      "tr.represent"
    ],
    [
      "intent.semantic",
      "opens",
      "opp.semantic"
    ],
    [
      "bar.knowledge_scattered",
      "limits",
      "tr.semantic"
    ],
    [
      "comp.sem",
      "enables",
      "tr.semantic"
    ],
    [
      "comp.strat",
      "enables",
      "tr.semantic"
    ],
    [
      "comp.ops",
      "enables",
      "tr.semantic"
    ],
    [
      "tr.semantic",
      "requires",
      "res.owner_time"
    ],
    [
      "tr.semantic",
      "requires",
      "res.data"
    ],
    [
      "ev.semantic",
      "proves",
      "opp.semantic"
    ],
    [
      "tr.semantic",
      "opens",
      "val.knowledge"
    ],
    [
      "tr.semantic",
      "opens",
      "val.scale"
    ],
    [
      "offer.semantic",
      "enables",
      "tr.semantic"
    ]
  ],
  "rules": [
    {
      "when": {
        "state": [
          "scout"
        ]
      },
      "add": "comp.strat",
      "to": "transition"
    },
    {
      "when": {
        "scale": [
          "ent",
          "hold"
        ]
      },
      "add": "comp.ops",
      "to": "transition"
    },
    {
      "when": {
        "state": [
          "stall",
          "rebuild"
        ]
      },
      "add": "comp.risk",
      "to": "transition"
    },
    {
      "when": {
        "direction": [
          "inbound",
          "outbound",
          "regional"
        ]
      },
      "add": "comp.cult",
      "to": "transition"
    }
  ]
};
export const engine=createEngine({axes,graph});
