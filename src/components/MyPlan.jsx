import { THEMES, getAction } from '../data/actions.js';
import { YEAR_BUCKETS } from '../data/templates.js';

function ActionCard({ planItem, onTap }) {
  const action = getAction(planItem.actionId);
  if (!action) return null;

  const isDone = planItem.year === 'done';
  const theme  = THEMES[action.theme];

  if (isDone) {
    return (
      <div className="action-card action-card--done" onClick={() => onTap(planItem.actionId)}>
        <span className="card-theme-label">done</span>
        <span className="card-title card-title--done">{action.title}</span>
      </div>
    );
  }

  return (
    <div
      className="action-card"
      style={{ background: theme.bg, borderColor: theme.border }}
      onClick={() => onTap(planItem.actionId)}
    >
      <span className="card-theme-label" style={{ color: theme.text }}>{action.theme}</span>
      <span className="card-title" style={{ color: theme.text }}>{action.title}</span>
    </div>
  );
}

export default function MyPlan({ planItems, onTapCard }) {
  const done = planItems.filter(p => p.year === 'done');

  return (
    <div className="screen">
      {/* Celebrating wins */}
      {done.length > 0 && (
        <section className="plan-section">
          <div className="bucket-header bucket-header--done">
            <span className="bucket-title">Celebrating wins</span>
            <span className="bucket-count">{done.length}</span>
          </div>
          <div className="card-grid">
            {done.map(item => (
              <ActionCard key={item.actionId} planItem={item} onTap={onTapCard} />
            ))}
          </div>
        </section>
      )}

      {/* Year buckets */}
      <section className="plan-section">
        <h2 className="section-title">Your plan</h2>
        {YEAR_BUCKETS.map(bucket => {
          const items = planItems.filter(p => p.year === bucket.value);
          if (items.length === 0) return null;
          return (
            <div key={bucket.value} className="bucket">
              <div className="bucket-header">
                <span className="bucket-title">{bucket.label}</span>
                <span className="bucket-count">{items.length}</span>
              </div>
              <div className="card-grid">
                {items.map(item => (
                  <ActionCard key={item.actionId} planItem={item} onTap={onTapCard} />
                ))}
              </div>
            </div>
          );
        })}

        {planItems.filter(p => p.year !== 'done').length === 0 && (
          <p className="empty-state">Your plan is empty. Head to All Actions to add some.</p>
        )}
      </section>
    </div>
  );
}
