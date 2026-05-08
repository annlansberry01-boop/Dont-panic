export const LIFE_STAGES = [
  { value: 'student',           label: 'Student' },
  { value: 'young_professional', label: 'Young Professional' },
  { value: 'family',            label: 'Family' },
  { value: 'retiree',           label: 'Retiree' },
  { value: 'pensioner',         label: 'Pensioner' },
];

export const YEAR_BUCKETS = [
  { value: 'this_year',   label: 'This year' },
  { value: 'next_year',   label: 'Next year' },
  { value: 'three_years', label: '3 years' },
  { value: 'five_years',  label: '5 years' },
  { value: 'ten_years',   label: '10 years' },
];

// Maps life stage → year bucket → array of action IDs
export const TEMPLATES = {
  student: {
    this_year:   ['led-lights', 'seal-gaps', 'try-riding-a-bike', 'try-catching-a-bus', 'grow-own-herbs'],
    next_year:   ['waste-free-shopping', 'eat-less-meat', 'join-community-bike'],
    three_years: ['buy-a-bike', 'switch-super'],
    five_years:  ['buy-efficient-home'],
    ten_years:   ['install-solar', 'buy-an-ev'],
  },
  young_professional: {
    this_year:   ['switch-super', 'switch-banks', 'led-lights', 'try-riding-a-bike', 'buy-green-power'],
    next_year:   ['get-an-e-bike', 'install-solar'],
    three_years: ['electrify-house', 'ditch-one-car'],
    five_years:  ['buy-an-ev', 'insulate-roof'],
    ten_years:   ['buy-efficient-home', 'fully-electrify'],
  },
  family: {
    this_year:   ['install-solar', 'try-riding-a-bike', 'grow-own-herbs'],
    next_year:   ['switch-super', 'small-native-garden'],
    three_years: ['electrify-house', 'get-an-e-bike'],
    five_years:  ['buy-an-ev'],
    ten_years:   ['insulate-floor', 'fully-electrify', 'donate-conservation'],
  },
  retiree: {
    this_year:   ['install-solar', 'small-native-garden', 'switch-super', 'switch-banks'],
    next_year:   ['electrify-house', 'insulate-roof'],
    three_years: ['buy-an-ev', 'insulate-floor'],
    five_years:  ['double-glaze', 'donate-conservation'],
    ten_years:   ['get-a-battery', 'community-solar-farm'],
  },
  pensioner: {
    this_year:   ['led-lights', 'seal-gaps', 'buy-green-power', 'bush-walk'],
    next_year:   ['grow-own-herbs', 'plant-native-tree'],
    three_years: ['insulate-roof', 'small-native-garden'],
    five_years:  ['install-solar'],
    ten_years:   ['donate-revegetation'],
  },
};
