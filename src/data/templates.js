import { ACTIONS } from './actions.js';

export const LIFE_STAGES = [
  { value: 'student',            label: 'Student' },
  { value: 'young_professional', label: 'Young Professional' },
  { value: 'young_family',       label: 'Young Family' },
  { value: 'family_with_teens',  label: 'Family with Teens' },
  { value: 'empty_nester',       label: 'Empty Nester' },
  { value: 'mature_professional',label: 'Mature Professional' },
  { value: 'retiree',            label: 'Retiree' },
  { value: 'pensioner',          label: 'Pensioner' },
];

export const PLAN_TYPES = [
  { value: 'standard',    label: 'Standard' },
  { value: 'quick_wins',  label: 'Quick Wins' },
  { value: 'behavioural', label: 'Behavioural' },
  { value: 'ambitious',   label: 'Ambitious' },
  { value: 'blank',       label: 'Blank Plan' },
];

export const YEAR_BUCKETS = [
  { value: 'this_year',   label: 'This year' },
  { value: 'next_year',   label: 'Next year' },
  { value: 'three_years', label: '3 years' },
  { value: 'five_years',  label: '5 years' },
  { value: 'ten_years',   label: '10 years' },
  { value: 'ongoing',     label: 'Ongoing' },
];

export const PLAN_YEAR_BUCKETS = YEAR_BUCKETS.filter(b => b.value !== 'ongoing');

export const TEMPLATES = {
  student: {
    this_year:   ['led-lights', 'seal-gaps', 'try-riding-a-bike', 'try-catching-a-bus', 'grow-own-herbs'],
    next_year:   ['minimise-packaging', 'eat-less-meat', 'join-community-bike'],
    three_years: ['buy-a-bike', 'switch-super'],
    five_years:  ['electrify-house'],
    ten_years:   ['install-solar', 'buy-an-ev'],
  },
  young_professional: {
    this_year:   ['switch-super', 'led-lights', 'try-riding-a-bike', 'buy-green-power'],
    next_year:   ['get-an-e-bike', 'install-solar'],
    three_years: ['electrify-house', 'ditch-one-car'],
    five_years:  ['buy-an-ev', 'insulate-roof'],
    ten_years:   ['electrify-house', 'fully-electrify'],
  },
  young_family: {
    this_year:   ['led-lights', 'seal-gaps', 'grow-own-herbs', 'try-riding-a-bike', 'buy-green-power'],
    next_year:   ['switch-super', 'small-native-garden', 'minimise-packaging'],
    three_years: ['install-solar', 'get-an-e-bike'],
    five_years:  ['electrify-house', 'buy-an-ev'],
    ten_years:   ['insulate-roof', 'fully-electrify', 'donate-conservation'],
  },
  family_with_teens: {
    this_year:   ['switch-super', 'try-riding-a-bike', 'grow-own-herbs', 'eat-less-meat'],
    next_year:   ['install-solar', 'small-native-garden'],
    three_years: ['electrify-house', 'get-an-e-bike', 'ditch-one-car'],
    five_years:  ['buy-an-ev', 'insulate-roof'],
    ten_years:   ['fully-electrify', 'donate-conservation', 'collective-solar-farm'],
  },
  empty_nester: {
    this_year:   ['install-solar', 'switch-super', 'small-native-garden', 'bush-walk'],
    next_year:   ['electrify-house', 'insulate-roof', 'buy-green-power'],
    three_years: ['buy-an-ev', 'double-glaze', 'indigenous-garden'],
    five_years:  ['get-a-battery', 'donate-conservation'],
    ten_years:   ['collective-solar-farm', 'nature-covenant', 'fully-electrify'],
  },
  mature_professional: {
    this_year:   ['switch-super', 'led-lights', 'buy-green-power', 'try-riding-a-bike'],
    next_year:   ['install-solar', 'get-an-e-bike'],
    three_years: ['electrify-house', 'ditch-one-car', 'insulate-roof'],
    five_years:  ['buy-an-ev', 'insulate-floor'],
    ten_years:   ['get-a-battery', 'fully-electrify', 'collective-solar-farm'],
  },
  retiree: {
    this_year:   ['install-solar', 'small-native-garden', 'switch-super'],
    next_year:   ['electrify-house', 'insulate-roof'],
    three_years: ['buy-an-ev', 'insulate-floor'],
    five_years:  ['double-glaze', 'donate-conservation'],
    ten_years:   ['get-a-battery', 'collective-solar-farm'],
  },
  pensioner: {
    this_year:   ['led-lights', 'seal-gaps', 'buy-green-power', 'bush-walk'],
    next_year:   ['grow-own-herbs', 'plant-native-tree'],
    three_years: ['insulate-roof', 'small-native-garden'],
    five_years:  ['install-solar'],
    ten_years:   ['support-revegetation'],
  },
};

// Plan type templates — applied on top of the life stage
export const PLAN_TYPE_OVERRIDES = {
  blank: () => [],

  // The book's own message: "choose an action (or two) and do them this
  // year" - pick the cheap, high-impact actions from this life stage's own
  // curated plan, not the whole 190-action library regardless of relevance.
  quick_wins: (lifeStage) => {
    const template   = TEMPLATES[lifeStage] || {};
    const templateIds = new Set(Object.values(template).flat());
    return ACTIONS
      .filter(a => templateIds.has(a.id) && a.cost === 1 && a.impact >= 2)
      .map(a => ({ actionId: a.id, year: 'this_year', addedAt: new Date().toISOString() }));
  },

  behavioural: () => {
    const ids = [
      'try-walking','walk-often','try-riding-a-bike','ride-often','try-catching-a-bus',
      'catch-bus-or-train','drive-less','shorter-showers','open-windows','seal-gaps',
      'dress-up-heater','deciduous-vine','less-red-meat-try','buy-seasonal','grow-own-herbs',
      'eat-leftovers','buy-what-you-need','eat-less-red-meat','eat-less-meat','eat-less-dairy',
      'become-vegan','try-not-buying','try-fixing','minimise-packaging',
      'bush-walk','nature-sitting-spot','leave-mess-insects','responsible-pet-owner','join-community-bike',
    ];
    const yearMap = {
      'try-walking':'this_year','try-riding-a-bike':'this_year','try-catching-a-bus':'this_year',
      'shorter-showers':'this_year','open-windows':'this_year','seal-gaps':'this_year',
      'dress-up-heater':'this_year','less-red-meat-try':'this_year','buy-seasonal':'this_year',
      'grow-own-herbs':'this_year','eat-leftovers':'this_year','try-not-buying':'this_year',
      'bush-walk':'this_year','nature-sitting-spot':'this_year','try-less-power':'this_year',
      'try-shorter-showers':'this_year','try-less-meat-m':'this_year',
    };
    return ids.map(id => ({
      actionId: id,
      year: yearMap[id] || 'next_year',
      addedAt: new Date().toISOString(),
    }));
  },

  ambitious: (lifeStage) => {
    const base = TEMPLATES[lifeStage] || {};
    const items = [];
    for (const [year, ids] of Object.entries(base)) {
      for (const id of ids) items.push({ actionId: id, year, addedAt: new Date().toISOString() });
    }
    const inPlan = new Set(items.map(i => i.actionId));
    // Add all high-impact actions not already included
    ACTIONS
      .filter(a => a.impact >= 4 && !inPlan.has(a.id))
      .forEach(a => items.push({ actionId: a.id, year: 'ten_years', addedAt: new Date().toISOString() }));
    return items;
  },
};

export function buildInitialPlan(lifeStage, planType) {
  const override = PLAN_TYPE_OVERRIDES[planType];
  if (override) return override(lifeStage);
  // Standard: use life stage template
  const template = TEMPLATES[lifeStage] || {};
  const items = [];
  for (const [year, ids] of Object.entries(template)) {
    for (const actionId of ids) {
      items.push({ actionId, year, addedAt: new Date().toISOString() });
    }
  }
  return items;
}

export const SPRINT_PRELOAD_IDS = ['try-walking','try-riding-a-bike','try-catching-a-bus','try-not-buying','try-fixing','less-red-meat-try'];
