import { useState } from 'react';
import { LIFE_STAGES, PLAN_TYPES } from '../data/templates.js';

export default function Profile({ user, onSave }) {
  const [email,     setEmail]     = useState(user.email    || '');
  const [suburb,    setSuburb]    = useState(user.suburb   || '');
  const [postcode,  setPostcode]  = useState(user.postcode  || '');
  const [planType,  setPlanType]  = useState(user.planType  || 'standard');
  const [lifeStage, setLifeStage] = useState(user.lifeStage || '');
  const [saved,     setSaved]     = useState(false);

  const stageName = LIFE_STAGES.find(s => s.value === user.lifeStage)?.label ?? '';

  function handleSave() {
    if (!email.trim() || !suburb.trim() || !postcode.trim() || !lifeStage) return;
    onSave({ ...user, email: email.trim(), suburb: suburb.trim(), postcode: postcode.trim(), planType, lifeStage });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="screen">
      <div className="profile-header">
        <div className="profile-avatar">👤</div>
        <div className="profile-stage-label">{stageName}</div>
        <div className="profile-location-label">{user.suburb} {user.postcode}</div>
      </div>
      <div className="profile-form">
        <div className="field">
          <label htmlFor="pr-email">Email</label>
          <input id="pr-email" type="email" value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com" autoComplete="email" inputMode="email" />
        </div>
        <div className="field">
          <label htmlFor="pr-suburb">Suburb</label>
          <input id="pr-suburb" type="text" value={suburb}
            onChange={e => setSuburb(e.target.value)} placeholder="e.g. Fitzroy" />
        </div>
        <div className="field">
          <label htmlFor="pr-postcode">Postcode</label>
          <input id="pr-postcode" type="text" value={postcode}
            onChange={e => setPostcode(e.target.value)}
            placeholder="e.g. 3065" inputMode="numeric" maxLength={10} />
        </div>
        <div className="field">
          <label htmlFor="pr-plan">Plan type</label>
          <div className="select-wrap">
            <select id="pr-plan" value={planType} onChange={e => setPlanType(e.target.value)}>
              {PLAN_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
        </div>
        <div className="field">
          <label htmlFor="pr-stage">Stage of life</label>
          <div className="select-wrap">
            <select id="pr-stage" value={lifeStage} onChange={e => setLifeStage(e.target.value)}>
              {LIFE_STAGES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
        </div>
        {saved
          ? <div className="profile-saved-msg">✓ Changes saved</div>
          : <button className="btn-primary btn-full" onClick={handleSave}>Save changes</button>
        }
      </div>
    </div>
  );
}
