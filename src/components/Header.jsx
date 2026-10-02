import { LIFE_STAGES, PLAN_TYPES } from '../data/templates.js';

export default function Header({ user, planItems }) {
  const stageName = LIFE_STAGES.find(s => s.value === user.lifeStage)?.label ?? '';
  const planType  = PLAN_TYPES.find(t => t.value === user.planType)?.label ?? '';
  const done      = planItems.filter(p => p.year === 'done').length;
  const remaining = planItems.filter(p => p.year !== 'done').length;
  return (
    <header className="app-header">
      <div className="header-top">
        <div className="header-brand">
          <span className="header-logo">🌿</span>
          <span className="header-name">Don't Panic</span>
        </div>
      </div>
      <div className="header-user">
        <div className="header-user-info">
          <span className="header-display-name">{stageName}</span>
          <span className="header-meta">{planType}</span>
        </div>
        <div className="header-pills">
          {done > 0 && <span className="pill pill-done">{done} done</span>}
          <span className="pill pill-remaining">{remaining} to go</span>
        </div>
      </div>
    </header>
  );
}
