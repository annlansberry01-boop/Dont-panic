import { THEMES, getAction } from '../data/actions.js';

export default function ActionCardPlan({ planItem, onTap, dragging, onPressStart, onPressEnd }) {
  const action    = getAction(planItem.actionId);
  if (!action) return null;
  const isDone    = planItem.year === 'done';
  const isOngoing = planItem.year === 'ongoing';
  const theme     = THEMES[action.theme];
  const draggable = !!onPressStart;

  function handleMouseDown(e) {
    if (!draggable) return;
    onPressStart(planItem.actionId, e.clientX, e.clientY, false);
  }
  function handleTouchStart(e) {
    if (!draggable) return;
    const t = e.touches[0];
    onPressStart(planItem.actionId, t.clientX, t.clientY, true);
  }
  function handlePressEnd() {
    if (!draggable) return;
    onPressEnd && onPressEnd();
  }

  if (isDone) {
    return (
      <div className="action-card action-card--done" onClick={() => onTap(planItem.actionId)}>
        <span className="card-theme-label">done</span>
        <span className="card-title card-title--done">{action.title}</span>
      </div>
    );
  }
  return (
    <div className={`action-card${dragging ? ' action-card--dragging' : ''}`}
      style={{ background: theme.bg, borderColor: theme.border }}
      onClick={() => onTap(planItem.actionId)}
      onMouseDown={handleMouseDown}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressEnd}
      onTouchStart={handleTouchStart}
      onTouchEnd={handlePressEnd}>
      <span className="card-theme-label" style={{ color: theme.text }}>{action.theme}</span>
      <span className="card-title" style={{ color: theme.text }}>{action.title}</span>
      {isOngoing && (
        <span className="card-ongoing-badge" style={{ color: theme.text, borderColor: theme.border }}>↺ Ongoing</span>
      )}
    </div>
  );
}
