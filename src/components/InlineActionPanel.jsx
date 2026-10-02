import { useEffect } from 'react';
import { THEMES } from '../data/actions.js';
import { YEAR_BUCKETS } from '../data/templates.js';

export default function InlineActionPanel({ action, planItem, onMove, onDone, onRemove, onAdd, onClose, sprintActive }) {
  const inPlan = !!planItem;
  const theme  = action ? THEMES[action.theme] : null;

  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, [onClose]);

  if (!action) return null;

  return (
    <div className="inline-panel" role="region" aria-label={`Options for ${action.title}`}>
      <div className="inline-panel-chip">
        <span className="inline-panel-chip-theme" style={{ color: theme?.text }}>{action.theme}</span>
        <span className="inline-panel-chip-title">{action.title}</span>
      </div>
      <h2 className="inline-panel-heading">
        {inPlan ? 'Move to a different year, or mark as done' : 'Add to your plan'}
      </h2>
      <div className="inline-panel-year-grid">
        {YEAR_BUCKETS.map(b => (
          <button key={b.value}
            className={`inline-panel-year-btn${planItem?.year === b.value ? ' active' : ''}${b.value === 'ongoing' ? ' inline-panel-year-btn--ongoing' : ''}`}
            onClick={() => inPlan ? onMove(b.value) : onAdd(b.value)}>
            {b.value === 'ongoing' ? '↺ Ongoing — do this continuously' : b.label}
          </button>
        ))}
        {sprintActive && (
          <button
            className={`inline-panel-year-btn${planItem?.year === 'sprint' ? ' active' : ''}`}
            onClick={() => inPlan ? onMove('sprint') : onAdd('sprint')}>
            ⚡ One Month Sprint
          </button>
        )}
      </div>
      {inPlan && (
        <button className="btn-primary btn-full inline-panel-done-btn" onClick={onDone}>
          Mark as done
        </button>
      )}
      {inPlan
        ? <button className="inline-panel-remove-btn" onClick={onRemove}>Remove from plan</button>
        : <button className="inline-panel-cancel-btn" onClick={onClose}>Cancel</button>
      }
    </div>
  );
}
