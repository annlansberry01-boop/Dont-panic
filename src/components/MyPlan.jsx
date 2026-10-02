import { useState, useRef } from 'react';
import { getAction, THEMES } from '../data/actions.js';
import { LIFE_STAGES, PLAN_TYPES, PLAN_YEAR_BUCKETS } from '../data/templates.js';
import ActionCardPlan from './ActionCardPlan.jsx';
import { SprintCards } from './Sprint.jsx';

export default function MyPlan({ user, planItems, onTapCard, onMove, sprint, onStartSprint, onEndSprint }) {
  const done    = planItems.filter(p => p.year === 'done');
  const ongoing = planItems.filter(p => p.year === 'ongoing');

  const stageName = LIFE_STAGES.find(s => s.value === user.lifeStage)?.label ?? '';
  const planType  = PLAN_TYPES.find(t => t.value === user.planType)?.label ?? '';

  // ── Drag to move between year buckets ──────────────────────────────────
  const [draggingId, setDraggingId] = useState(null);
  const [overYear,   setOverYear]   = useState(null);
  const dragRef  = useRef({ actionId: null, holdTimer: null, dragging: false, overYear: null });
  const ghostRef = useRef(null);

  function moveGhost(x, y) {
    if (ghostRef.current) {
      ghostRef.current.style.left = x + 'px';
      ghostRef.current.style.top  = y + 'px';
    }
  }

  function findYearAt(x, y) {
    const el   = document.elementFromPoint(x, y);
    const zone = el && el.closest ? el.closest('[data-drop-year]') : null;
    return zone ? zone.getAttribute('data-drop-year') : null;
  }

  function clearHoldTimer() {
    if (dragRef.current.holdTimer) { clearTimeout(dragRef.current.holdTimer); dragRef.current.holdTimer = null; }
  }

  function handleMouseMove(e) {
    if (!dragRef.current.dragging) return;
    moveGhost(e.clientX, e.clientY);
    const year = findYearAt(e.clientX, e.clientY);
    if (year !== dragRef.current.overYear) { dragRef.current.overYear = year; setOverYear(year); }
  }
  function handleTouchMove(e) {
    if (!dragRef.current.dragging) return;
    e.preventDefault();
    const t = e.touches[0];
    moveGhost(t.clientX, t.clientY);
    const year = findYearAt(t.clientX, t.clientY);
    if (year !== dragRef.current.overYear) { dragRef.current.overYear = year; setOverYear(year); }
  }

  function endDrag() {
    clearHoldTimer();
    if (dragRef.current.dragging && dragRef.current.overYear && dragRef.current.actionId) {
      onMove(dragRef.current.actionId, dragRef.current.overYear);
    }
    dragRef.current.dragging = false;
    dragRef.current.actionId = null;
    dragRef.current.overYear = null;
    setDraggingId(null);
    setOverYear(null);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', endDrag);
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', endDrag);
  }

  function handlePressStart(actionId, x, y, isTouch) {
    clearHoldTimer();
    dragRef.current.holdTimer = setTimeout(() => {
      dragRef.current.dragging = true;
      dragRef.current.actionId = actionId;
      setDraggingId(actionId);
      moveGhost(x, y);
      if (isTouch) {
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', endDrag);
      } else {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', endDrag);
      }
    }, 300);
  }

  function handlePressEnd() {
    clearHoldTimer();
  }

  function buildShareText() {
    let out = `My Don't Panic Action Plan\n`;
    out += `${user.email} · ${user.suburb} ${user.postcode}\n`;
    out += `${stageName}${planType ? ' · ' + planType : ''}\n\n`;
    const sprintItems = planItems.filter(p => p.year === 'sprint');
    if (sprintItems.length) {
      out += `⚡ ONE MONTH SPRINT\n`;
      sprintItems.forEach(item => { const a = getAction(item.actionId); if (a) out += `• ${a.title}\n`; });
      out += '\n';
    }
    for (const b of [...PLAN_YEAR_BUCKETS, { value: 'ongoing', label: 'Ongoing' }]) {
      const items = planItems.filter(p => p.year === b.value);
      if (!items.length) continue;
      out += `${b.label.toUpperCase()}\n`;
      items.forEach(item => {
        const a = getAction(item.actionId);
        if (a) out += `• ${a.title}\n`;
      });
      out += '\n';
    }
    if (done.length) {
      out += `DONE ✓\n`;
      done.forEach(item => {
        const a = getAction(item.actionId);
        if (a) out += `• ${a.title}\n`;
      });
      out += '\n';
    }
    out += `Generated with Don't Panic`;
    return out;
  }

  async function handleShare() {
    const text = buildShareText();
    if (navigator.share) {
      try { await navigator.share({ title: "My Don't Panic Action Plan", text }); }
      catch (_) {}
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      alert('Plan copied to clipboard!');
    }
  }

  return (
    <div className="screen">
      <div className="your-plan-toolbar">
        <div>
          <div className="your-plan-title">Your plan</div>
          <div className="your-plan-subtitle">{stageName} · {user.suburb} {user.postcode}</div>
        </div>
        <div className="toolbar-btns">
          <button className="toolbar-btn" onClick={handleShare}>
            <span>↑</span> Share
          </button>
        </div>
      </div>
      {/* Sprint section — shown at top when active */}
      {sprint
        ? <SprintCards planItems={planItems} onTapCard={onTapCard} sprint={sprint} onEnd={onEndSprint} />
        : <button className="sprint-cta" onClick={onStartSprint}>
            <span className="sprint-cta-icon">⚡</span>
            <div className="sprint-cta-body">
              <div className="sprint-cta-title">Start a One Month Sprint</div>
              <div className="sprint-cta-desc">Pick a focus area and tackle a few actions intensely for 30 days.</div>
            </div>
            <span className="sprint-cta-arrow">›</span>
          </button>
      }
      {done.length > 0 && (
        <section className="plan-section">
          <div className="bucket-header bucket-header--done">
            <span className="bucket-title">Celebrating wins</span>
            <span className="bucket-count">{done.length}</span>
          </div>
          <div className="card-grid">
            {done.map(item => <ActionCardPlan key={item.actionId} planItem={item} onTap={onTapCard} />)}
          </div>
        </section>
      )}
      <section className="plan-section">
        <h2 className="section-title">Your plan</h2>
        {PLAN_YEAR_BUCKETS.map(bucket => {
          const specific = planItems.filter(p => p.year === bucket.value);
          const all      = [...specific, ...ongoing];
          if (all.length === 0) return null;
          const isDropActive = overYear === bucket.value;
          return (
            <div key={bucket.value} className="bucket">
              <div className="bucket-header">
                <span className="bucket-title">{bucket.label}</span>
                <span className="bucket-count">{all.length}</span>
              </div>
              <div className={`card-grid${isDropActive ? ' bucket--drop-active' : ''}`}
                data-drop-year={bucket.value}>
                {specific.map(item => (
                  <ActionCardPlan key={item.actionId} planItem={item} onTap={onTapCard}
                    dragging={draggingId === item.actionId}
                    onPressStart={handlePressStart} onPressEnd={handlePressEnd} />
                ))}
                {ongoing.map(item => (
                  <ActionCardPlan key={`${bucket.value}-${item.actionId}`} planItem={item} onTap={onTapCard}
                    dragging={draggingId === item.actionId}
                    onPressStart={handlePressStart} onPressEnd={handlePressEnd} />
                ))}
              </div>
            </div>
          );
        })}
        {planItems.filter(p => p.year !== 'done').length === 0 && (
          <p className="empty-state">Your plan is empty. Head to All Actions to add some.</p>
        )}
      </section>
      {draggingId && (() => {
        const ghostAction = getAction(draggingId);
        if (!ghostAction) return null;
        const ghostTheme = THEMES[ghostAction.theme];
        return (
          <div ref={ghostRef} className="drag-ghost">
            <div className="action-card drag-ghost-card" style={{ background: ghostTheme.bg, borderColor: ghostTheme.border }}>
              <span className="card-theme-label" style={{ color: ghostTheme.text }}>{ghostAction.theme}</span>
              <span className="card-title" style={{ color: ghostTheme.text }}>{ghostAction.title}</span>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
