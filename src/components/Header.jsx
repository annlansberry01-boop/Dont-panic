import { LIFE_STAGES } from '../data/templates.js';

function nameFromEmail(email) {
  const local = email.split('@')[0];
  return local.charAt(0).toUpperCase() + local.slice(1).replace(/[._-]/g, ' ');
}

export default function Header({ user, planItems }) {
  const stageName = LIFE_STAGES.find(s => s.value === user.lifeStage)?.label ?? '';
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
          <span className="header-display-name">{nameFromEmail(user.email)}</span>
          <span className="header-meta">{stageName} · {user.postcode}</span>
        </div>
        <div className="header-pills">
          {done > 0 && (
            <span className="pill pill-done">{done} done</span>
          )}
          <span className="pill pill-remaining">{remaining} to go</span>
        </div>
      </div>
    </header>
  );
}
