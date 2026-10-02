import { getAction, THEMES } from '../data/actions.js';
import ActionCardPlan from './ActionCardPlan.jsx';

export function sprintDaysLeft(sprint) {
  if (!sprint?.startDate) return 30;
  const ms = Date.now() - new Date(sprint.startDate).getTime();
  return Math.max(0, 30 - Math.floor(ms / 86400000));
}

// Sprint section shown inside MyPlan (card grid style)
export function SprintCards({ planItems, onTapCard, sprint, onEnd }) {
  const items = planItems.filter(p => p.year === 'sprint');
  const left  = sprintDaysLeft(sprint);
  return (
    <div className="sprint-section">
      <div className="sprint-header">
        <div className="sprint-header-info">
          <span className="sprint-header-icon">⚡</span>
          <div>
            <div className="sprint-title">One Month Sprint</div>
            <div className="sprint-days">{left} day{left !== 1 ? 's' : ''} remaining</div>
          </div>
        </div>
        <button className="sprint-end-btn" onClick={onEnd}>End sprint</button>
      </div>
      <div className="sprint-cards">
        {items.length === 0
          ? <p className="sprint-empty">No actions here yet. Open any action card and choose ⚡ One Month Sprint.</p>
          : <div className="card-grid">{items.map(item => <ActionCardPlan key={item.actionId} planItem={item} onTap={onTapCard} />)}</div>
        }
      </div>
    </div>
  );
}

// Sprint section shown inside YourPlan (list style) — currently unused but kept for parity with the original app
export function SprintList({ planItems, sprint, onEnd }) {
  const items = planItems.filter(p => p.year === 'sprint');
  const left  = sprintDaysLeft(sprint);
  return (
    <div className="sprint-section" style={{ marginBottom: 24 }}>
      <div className="sprint-header">
        <div className="sprint-header-info">
          <span className="sprint-header-icon">⚡</span>
          <div>
            <div className="sprint-title">One Month Sprint</div>
            <div className="sprint-days">{left} day{left !== 1 ? 's' : ''} remaining</div>
          </div>
        </div>
        <button className="sprint-end-btn" onClick={onEnd}>End sprint</button>
      </div>
      <div style={{ padding: '10px 12px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {items.length === 0
          ? <p className="sprint-empty">No actions here yet. Open any action from Manage and choose ⚡ One Month Sprint.</p>
          : items.map(item => {
              const action = getAction(item.actionId);
              if (!action) return null;
              const theme = THEMES[action.theme];
              return (
                <div key={item.actionId} className="your-plan-item"
                  style={{ background: theme.bg, borderLeftColor: theme.border }}>
                  <div className="your-plan-item-text">
                    <span className="your-plan-item-cat" style={{ color: theme.text }}>{action.theme}</span>
                    <span className="your-plan-item-title" style={{ color: theme.text }}>{action.title}</span>
                  </div>
                </div>
              );
            })
        }
      </div>
    </div>
  );
}
