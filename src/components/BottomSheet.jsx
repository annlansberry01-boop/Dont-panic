import { useEffect } from 'react';
import { THEMES } from '../data/actions.js';
import { YEAR_BUCKETS } from '../data/templates.js';

export default function BottomSheet({ action, planItem, onMove, onDone, onRemove, onAdd, onClose }) {
  const inPlan = !!planItem;
  const theme  = action ? THEMES[action.theme] : null;

  // Close on backdrop click
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!action) return null;

  return (
    <>
      <div className="sheet-backdrop" onClick={onClose} />
      <div className="sheet" role="dialog" aria-modal="true">
        <div className="sheet-handle" />

        {/* Action chip */}
        <div
          className="sheet-chip"
          style={{ background: theme?.bg, color: theme?.text, borderColor: theme?.border }}
        >
          <span className="sheet-chip-theme">{action.theme}</span>
          <span className="sheet-chip-title">{action.title}</span>
        </div>

        <h2 className="sheet-heading">
          {inPlan ? 'Move to a different year, or mark as done' : 'Add to your plan'}
        </h2>

        {/* Year grid */}
        <div className="sheet-year-grid">
          {YEAR_BUCKETS.map(b => {
            const active = planItem?.year === b.value;
            return (
              <button
                key={b.value}
                className={`sheet-year-btn${active ? ' active' : ''}`}
                onClick={() => inPlan ? onMove(b.value) : onAdd(b.value)}
              >
                {b.label}
              </button>
            );
          })}
        </div>

        {inPlan && (
          <button className="btn-primary btn-full sheet-done-btn" onClick={onDone}>
            Mark as done
          </button>
        )}

        {inPlan ? (
          <button className="sheet-remove-btn" onClick={onRemove}>
            Remove from plan
          </button>
        ) : (
          <button className="sheet-cancel-btn" onClick={onClose}>
            Cancel
          </button>
        )}
      </div>
    </>
  );
}
