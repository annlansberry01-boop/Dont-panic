import { useState, Fragment } from 'react';
import { ACTIONS, THEMES } from '../data/actions.js';
import InlineActionPanel from './InlineActionPanel.jsx';

const THEME_FILTERS = ['All', 'Transport', 'Energy', 'Nature', 'Food', 'Money', 'Stuff'];

export default function AllActions({
  planItems, onTapCard, typeFilter = 'all', onBack,
  openActionId, onAdd, onMove, onDone, onRemove, onClosePanel, sprintActive,
}) {
  const [themeFilter, setThemeFilter] = useState('All');
  const [sort, setSort]               = useState(null); // null=all | 'star'|'hchi'|'lcli'
  const inPlanIds    = new Set(planItems.map(p => p.actionId));
  const isMoneyView  = themeFilter === 'Money';

  const TYPE_LABELS = { personal: 'Personal', community: 'Community', political: 'Political', all: 'All' };

  let visible = ACTIONS.filter(a => {
    if (a.isSprint) return false; // sprint-only actions don't show in library
    const typeMatch  = typeFilter === 'all' || a.actionType === typeFilter;
    const themeMatch = themeFilter === 'All'
      ? true
      : isMoneyView ? (a.theme === 'money' || !!a.moneyAngle)
      : a.theme === themeFilter.toLowerCase() || a.altTheme === themeFilter.toLowerCase();
    return typeMatch && themeMatch;
  });

  // Quadrant filters: low=1-2, high=3-5
  if (sort === 'star') visible = visible.filter(a => a.cost <= 2 && a.impact >= 3);
  else if (sort === 'hchi') visible = visible.filter(a => a.cost >= 3 && a.impact >= 3);
  else if (sort === 'lcli') visible = visible.filter(a => a.cost <= 2 && a.impact <= 2);

  // In Money view: native money actions first, then cross-category
  if (isMoneyView && !sort) {
    visible = [
      ...visible.filter(a => a.theme === 'money'),
      ...visible.filter(a => a.theme !== 'money'),
    ];
  }

  return (
    <div className="screen">
      {onBack && (
        <button className="back-btn" onClick={onBack}>← All Actions</button>
      )}
      {typeFilter !== 'all' && (
        <div className="type-header">{TYPE_LABELS[typeFilter]} actions</div>
      )}
      <div className="filter-row filter-row--scroll">
        {THEME_FILTERS.map(t => (
          <button key={t} className={`filter-chip${themeFilter === t ? ' filter-chip--active' : ''}`}
            onClick={() => setThemeFilter(t)}>{t}</button>
        ))}
      </div>
      <div className="filter-row filter-row--scroll">
        {[
          { v: 'star', label: '⭐ Low cost, high impact', star: true },
          { v: 'hchi', label: 'High cost, high impact' },
          { v: 'lcli', label: 'Low cost, low impact' },
        ].map(s => (
          <button key={s.v}
            className={`filter-chip${s.star ? ' filter-chip--star' : ''}${sort === s.v ? ' filter-chip--active' : ''}`}
            onClick={() => setSort(sort === s.v ? null : s.v)}>
            {s.label}
          </button>
        ))}
      </div>
      <div className="card-grid card-grid--library">
        {visible.map(action => {
          const theme         = THEMES[action.theme];
          const planItem      = planItems.find(p => p.actionId === action.id) || null;
          const inPlan        = !!planItem;
          const crossCategory = isMoneyView && action.moneyAngle && action.theme !== 'money';
          const badgeLabel    = action.moneyAngle === 'save' ? 'Save $' : 'Invest $';
          const panelOpen     = openActionId === action.id;
          return (
            <Fragment key={action.id}>
              <div
                className={`action-card action-card--library${inPlan ? ' action-card--in-plan' : ''}`}
                onClick={() => onTapCard(action.id)}>
                <span className="card-theme-label" style={{ color: theme.text }}>
                  {action.theme}{crossCategory ? <span className="card-money-tag"> · {badgeLabel}</span> : ''}
                </span>
                <span className="card-title">{action.title}</span>
                {inPlan && <span className="card-in-plan-badge">In plan</span>}
              </div>
              {panelOpen && (
                <InlineActionPanel
                  action={action}
                  planItem={planItem}
                  onAdd={(year) => onAdd(action.id, year)}
                  onMove={(year) => onMove(action.id, year)}
                  onDone={() => onDone(action.id)}
                  onRemove={() => onRemove(action.id)}
                  onClose={onClosePanel}
                  sprintActive={sprintActive}
                />
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
