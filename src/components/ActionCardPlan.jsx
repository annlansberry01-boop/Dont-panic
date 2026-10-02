import { Fragment } from 'react';
import { THEMES, getAction } from '../data/actions.js';
import InlineActionPanel from './InlineActionPanel.jsx';

export default function ActionCardPlan({
  planItem, onTap, dragging, onPressStart, onPressEnd,
  panelOpen, onMove, onDone, onRemove, onClosePanel, sprintActive,
}) {
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

  const card = isDone ? (
    <div className="action-card action-card--done" onClick={() => onTap(planItem.actionId)}>
      <span className="card-theme-label">done</span>
      <span className="card-title card-title--done">{action.title}</span>
    </div>
  ) : (
    <div className={`action-card${dragging ? ' action-card--dragging' : ''}`}
      onClick={() => onTap(planItem.actionId)}
      onMouseDown={handleMouseDown}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressEnd}
      onTouchStart={handleTouchStart}
      onTouchEnd={handlePressEnd}>
      <span className="card-theme-label" style={{ color: theme.text }}>{action.theme}</span>
      <span className="card-title">{action.title}</span>
      {isOngoing && <span className="card-ongoing-badge">↺ Ongoing</span>}
    </div>
  );

  if (!panelOpen) return card;

  return (
    <Fragment>
      {card}
      <InlineActionPanel
        action={action}
        planItem={planItem}
        onMove={(year) => onMove(planItem.actionId, year)}
        onDone={() => onDone(planItem.actionId)}
        onRemove={() => onRemove(planItem.actionId)}
        onClose={onClosePanel}
        sprintActive={sprintActive}
      />
    </Fragment>
  );
}
