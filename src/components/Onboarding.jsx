import { useState } from 'react';
import { LIFE_STAGES } from '../data/templates.js';

export default function Onboarding({ onComplete }) {
  const [email, setEmail]         = useState('');
  const [postcode, setPostcode]   = useState('');
  const [lifeStage, setLifeStage] = useState('');
  const [error, setError]         = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim() || !postcode.trim() || !lifeStage) {
      setError('Please fill in all three fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    onComplete({ email: email.trim(), postcode: postcode.trim(), lifeStage });
  }

  return (
    <div className="onboarding">
      <div className="onboarding-inner">
        <div className="onboarding-logo">
          <span className="logo-leaf">🌿</span>
        </div>
        <h1 className="onboarding-title">Don't Panic</h1>
        <p className="onboarding-sub">
          Your personal plan to care for people, planet and local place —
          at your own pace, budget and life stage.
        </p>

        <form className="onboarding-form" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              inputMode="email"
            />
          </div>

          <div className="field">
            <label htmlFor="postcode">Postcode</label>
            <input
              id="postcode"
              type="text"
              value={postcode}
              onChange={e => setPostcode(e.target.value)}
              placeholder="e.g. 3000"
              autoComplete="postal-code"
              inputMode="numeric"
              maxLength={10}
            />
          </div>

          <div className="field">
            <label htmlFor="lifestage">Life stage</label>
            <div className="select-wrap">
              <select
                id="lifestage"
                value={lifeStage}
                onChange={e => setLifeStage(e.target.value)}
              >
                <option value="" disabled>Choose your life stage</option>
                {LIFE_STAGES.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="btn-primary btn-full">
            Build my plan
          </button>
        </form>

        <p className="onboarding-note">
          We only store your email and postcode — nothing else. No third-party tracking.
        </p>
      </div>
    </div>
  );
}
