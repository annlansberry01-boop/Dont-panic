import { useEffect } from 'react';
import { THEMES } from '../data/actions.js';
import { YEAR_BUCKETS } from '../data/templates.js';

export default function BottomSheet({ action, planItem, onMove, onDone, onRemove, onAdd, onClose, sprintActive }) {
  const inPlan = !!planItem;
  const theme  = action ? THEMES[action.theme] : null;
  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, [onClose]);
  if (!action) return null;
  return (
    <>
      <div className="sheet-backdrop" onClick={onClose} />
      <div className="sheet" role="dialog" aria-modal="true">
        <div className="sheet-handle" />
        <div className="sheet-chip"
          style={{ background: theme?.bg, color: theme?.text, borderColor: theme?.border }}>
          <span className="sheet-chip-theme">{action.theme}</span>
          <span className="sheet-chip-title">{action.title}</span>
        </div>
        <h2 className="sheet-heading">
          {inPlan ? 'Move to a different year, or mark as done' : 'Add to your plan'}
        </h2>
        <div className="sheet-year-grid">
          {YEAR_BUCKETS.map(b => (
            <button key={b.value}
              className={`sheet-year-btn${planItem?.year === b.value ? ' active' : ''}${b.value === 'ongoing' ? ' sheet-year-btn--ongoing' : ''}`}
              onClick={() => inPlan ? onMove(b.value) : onAdd(b.value)}>
              {b.value === 'ongoing' ? '↺ Ongoing — do this continuously' : b.label}
            </button>
          ))}
          {sprintActive && (
            <button
              className={`sheet-year-btn sheet-year-btn--sprint${planItem?.year === 'sprint' ? ' active' : ''}`}
              onClick={() => inPlan ? onMove('sprint') : onAdd('sprint')}>
              ⚡ One Month Sprint
            </button>
          )}
        </div>
        {inPlan && (
          <button className="btn-primary btn-full sheet-done-btn" onClick={onDone}>
            Mark as done
          </button>
        )}
        {inPlan
          ? <button className="sheet-remove-btn" onClick={onRemove}>Remove from plan</button>
          : <button className="sheet-cancel-btn" onClick={onClose}>Cancel</button>
        }
      </div>
    </>
  );
}
