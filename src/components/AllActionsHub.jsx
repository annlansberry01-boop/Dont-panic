import { ACTIONS } from '../data/actions.js';

export default function AllActionsHub({ onSelect }) {
  const count = (type) => type === 'all' ? ACTIONS.length : ACTIONS.filter(a => a.actionType === type).length;
  const options = [
    { key: 'personal',  label: 'Personal',    emoji: '🏠', desc: 'Your everyday choices at home, in the kitchen and on the road', mod: '--personal' },
    { key: 'community', label: 'Community',   emoji: '🤝', desc: 'Actions you take together with neighbours and local groups',     mod: '--community' },
    { key: 'political', label: 'Political',   emoji: '📢', desc: 'Advocacy, voting and pushing for systemic change',               mod: '--political' },
    { key: 'all',       label: 'All Actions', emoji: '🗂️', desc: 'Browse the full library across all types',                      mod: '--all' },
  ];
  return (
    <div className="screen">
      <p className="hub-intro">Actions come in different shapes. Pick the kind you're looking for.</p>
      <div className="hub-grid">
        {options.map(opt => (
          <button key={opt.key} className={`hub-card hub-card${opt.mod}`} onClick={() => onSelect(opt.key)}>
            <span className="hub-emoji">{opt.emoji}</span>
            <span className="hub-label">{opt.label}</span>
            <span className="hub-desc">{opt.desc}</span>
            <span className="hub-count">{count(opt.key)} action{count(opt.key) !== 1 ? 's' : ''}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
