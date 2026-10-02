import { useState } from 'react';
import { LIFE_STAGES, PLAN_TYPES } from '../data/templates.js';

export default function Onboarding({ onComplete }) {
  const [email, setEmail]         = useState('');
  const [suburb, setSuburb]       = useState('');
  const [postcode, setPostcode]   = useState('');
  const [lifeStage, setLifeStage] = useState('');
  const [planType, setPlanType]   = useState('standard');
  const [error, setError]         = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim() || !suburb.trim() || !postcode.trim() || !lifeStage) {
      setError('Please fill in all fields.'); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.'); return;
    }
    onComplete({ email: email.trim(), suburb: suburb.trim(), postcode: postcode.trim(), lifeStage, planType });
  }

  return (
    <div className="onboarding">
      <div className="onboarding-inner">
        <div className="onboarding-logo">🌿</div>
        <h1 className="onboarding-title">Don't Panic</h1>
        <p className="onboarding-sub">
          Your personal plan to care for people, planet and local place —
          at your own pace, budget and life stage.
        </p>
        <form className="onboarding-form" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="ob-email">Email</label>
            <input id="ob-email" type="email" value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com" autoComplete="email" inputMode="email" />
          </div>
          <div className="field">
            <label htmlFor="ob-suburb">Suburb</label>
            <input id="ob-suburb" type="text" value={suburb}
              onChange={e => setSuburb(e.target.value)}
              placeholder="e.g. Fitzroy" autoComplete="address-level2" />
          </div>
          <div className="field">
            <label htmlFor="ob-postcode">Postcode</label>
            <input id="ob-postcode" type="text" value={postcode}
              onChange={e => setPostcode(e.target.value)}
              placeholder="e.g. 3065" autoComplete="postal-code" inputMode="numeric" maxLength={10} />
          </div>
          <div className="field">
            <label htmlFor="ob-stage">Life stage</label>
            <div className="select-wrap">
              <select id="ob-stage" value={lifeStage} onChange={e => setLifeStage(e.target.value)}>
                <option value="" disabled>Choose your life stage</option>
                {LIFE_STAGES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
          </div>
          <div className="field">
            <label htmlFor="ob-type">Plan type</label>
            <div className="select-wrap">
              <select id="ob-type" value={planType} onChange={e => setPlanType(e.target.value)}>
                {PLAN_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
          </div>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="btn-primary btn-full">Build my plan</button>
        </form>
        <p className="onboarding-note">
          We save your details on this device so you're recognised next time. No password needed.
        </p>
      </div>
    </div>
  );
}
