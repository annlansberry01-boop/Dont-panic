import { useState } from 'react';
import { LIFE_STAGES, PLAN_TYPES } from '../data/templates.js';

export default function Onboarding({ onComplete }) {
  const [lifeStage, setLifeStage] = useState('');
  const [planType, setPlanType]   = useState('standard');
  const [error, setError]         = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!lifeStage) {
      setError('Please choose your life stage.'); return;
    }
    onComplete({ lifeStage, planType });
  }

  return (
    <div className="onboarding">
      <div className="onboarding-inner">
        <div className="hero">
          <h1 className="hero-title">Don't Panic.<br />You've got this.</h1>
          <p className="hero-sub">Let's build your plan together.</p>
          <p className="hero-intro">
            Feeling overwhelmed about the state of the planet? You're not alone, and you don't need to fix
            everything at once. Choose how ambitious you want to be, and we'll build you a personalised plan
            across transport, energy, stuff, nature, food and money.
          </p>
        </div>

        <div className="how-it-works">
          <h2 className="how-it-works-title">How it works</h2>
          <ol className="how-it-works-steps">
            <li><span className="step-num">1</span> Tell us your stage of life</li>
            <li><span className="step-num">2</span> Choose how ambitious you want to be</li>
            <li><span className="step-num">3</span> Get your plan — yours to customise and download</li>
          </ol>
        </div>

        <form className="onboarding-form" onSubmit={handleSubmit} noValidate>
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
            <label htmlFor="ob-type">How ambitious do you want to be?</label>
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
          Nothing you choose here is sent anywhere. Once you've created your plan, you can download it.
        </p>
      </div>
    </div>
  );
}
