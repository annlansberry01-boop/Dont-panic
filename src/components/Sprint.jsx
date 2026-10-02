import ActionCardPlan from './ActionCardPlan.jsx';

export function sprintDaysLeft(sprint) {
  if (!sprint?.startDate) return 30;
  const ms = Date.now() - new Date(sprint.startDate).getTime();
  return Math.max(0, 30 - Math.floor(ms / 86400000));
}

// Sprint section shown inside MyPlan (card grid style)
export function SprintCards({
  planItems, onTapCard, sprint, onEnd,
  openActionId, onMove, onDone, onRemove, onClosePanel, sprintActive,
}) {
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
          : <div className="card-grid">
              {items.map(item => (
                <ActionCardPlan key={item.actionId} planItem={item} onTap={onTapCard}
                  panelOpen={openActionId === item.actionId}
                  onMove={onMove} onDone={onDone} onRemove={onRemove}
                  onClosePanel={onClosePanel} sprintActive={sprintActive} />
              ))}
            </div>
        }
      </div>
    </div>
  );
}
