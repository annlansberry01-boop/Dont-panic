import { useState } from 'react';
import { LIFE_STAGES, PLAN_TYPES } from '../data/templates.js';

export default function Profile({ user, onSave }) {
  const [planType,  setPlanType]  = useState(user.planType  || 'standard');
  const [lifeStage, setLifeStage] = useState(user.lifeStage || '');
  const [saved,     setSaved]     = useState(false);

  const [confirming, setConfirming] = useState(false);

  const stageName = LIFE_STAGES.find(s => s.value === user.lifeStage)?.label ?? '';
  // Compare against the settings the plan was last built from, not just the
  // saved profile — older profiles changed settings without rebuilding.
  const builtFor    = user.planBuiltFor || {};
  const planChanged = lifeStage !== builtFor.lifeStage || planType !== builtFor.planType;

  function handleSave() {
    if (!lifeStage) return;
    if (planChanged && !confirming) { setConfirming(true); return; }
    setConfirming(false);
    onSave({ ...user, planType, lifeStage }, planChanged);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="screen">
      <div className="profile-header">
        <div className="profile-avatar">👤</div>
        <div className="profile-stage-label">{stageName}</div>
      </div>
      <div className="profile-form">
        <div className="field">
          <label htmlFor="pr-plan">Plan type</label>
          <div className="select-wrap">
            <select id="pr-plan" value={planType} onChange={e => { setPlanType(e.target.value); setConfirming(false); }}>
              {PLAN_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
        </div>
        <div className="field">
          <label htmlFor="pr-stage">Stage of life</label>
          <div className="select-wrap">
            <select id="pr-stage" value={lifeStage} onChange={e => { setLifeStage(e.target.value); setConfirming(false); }}>
              {LIFE_STAGES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
        </div>
        {confirming && (
          <p className="profile-confirm-note">
            This will rebuild your plan for the new settings. Actions you've ticked off are kept; other changes you've made to your plan will be replaced.
          </p>
        )}
        {saved
          ? <div className="profile-saved-msg">✓ Changes saved</div>
          : confirming
            ? <>
                <button className="btn-primary btn-full" onClick={handleSave}>Rebuild my plan</button>
                <button className="btn-secondary btn-full" onClick={() => setConfirming(false)}>Cancel</button>
              </>
            : <button className="btn-primary btn-full" onClick={handleSave}>Save changes</button>
        }
      </div>
    </div>
  );
}
