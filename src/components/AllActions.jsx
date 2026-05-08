import { useState } from 'react';
import { ACTIONS, THEMES } from '../data/actions.js';

const THEME_FILTERS = ['All', 'Transport', 'Energy', 'Nature', 'Food', 'Money', 'Stuff'];

function ActionCard({ action, inPlan, onTap }) {
  const theme = THEMES[action.theme];
  return (
    <div
      className={`action-card action-card--library${inPlan ? ' action-card--in-plan' : ''}`}
      style={{ background: theme.bg, borderColor: theme.border }}
      onClick={() => onTap(action.id)}
    >
      <span className="card-theme-label" style={{ color: theme.text }}>{action.theme}</span>
      <span className="card-title" style={{ color: theme.text }}>{action.title}</span>
      {inPlan && <span className="card-in-plan-badge" style={{ background: theme.border, color: theme.text }}>In plan</span>}
    </div>
  );
}

export default function AllActions({ planItems, onTapCard }) {
  const [themeFilter, setThemeFilter] = useState('All');
  const [sort, setSort]               = useState('default');

  const inPlanIds = new Set(planItems.map(p => p.actionId));

  let visible = ACTIONS.filter(a =>
    themeFilter === 'All' || a.theme === themeFilter.toLowerCase()
  );

  if (sort === 'low_cost')    visible = [...visible].sort((a, b) => a.cost - b.cost);
  if (sort === 'high_impact') visible = [...visible].sort((a, b) => b.impact - a.impact);

  return (
    <div className="screen">
      {/* Theme filter */}
      <div className="filter-row filter-row--scroll">
        {THEME_FILTERS.map(t => (
          <button
            key={t}
            className={`filter-chip${themeFilter === t ? ' filter-chip--active' : ''}`}
            onClick={() => setThemeFilter(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Sort filter */}
      <div className="filter-row">
        {[
          { value: 'default',     label: 'Default' },
          { value: 'low_cost',    label: 'Low cost first' },
          { value: 'high_impact', label: 'High impact first' },
        ].map(s => (
          <button
            key={s.value}
            className={`filter-chip${sort === s.value ? ' filter-chip--active' : ''}`}
            onClick={() => setSort(s.value)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="card-grid card-grid--library">
        {visible.map(action => (
          <ActionCard
            key={action.id}
            action={action}
            inPlan={inPlanIds.has(action.id)}
            onTap={onTapCard}
          />
        ))}
      </div>
    </div>
  );
}
