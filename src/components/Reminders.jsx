import { getAction } from '../data/actions.js';

const REMINDER_COPY = {
  1: (t) => `Hey — a month ago you added "${t}" to your plan for this year. How's it going? No pressure, just checking in.`,
  3: (t) => `Three months since you planned to ${t.toLowerCase()}. If you've started — nice work. If not, there's still plenty of time.`,
  6: (t) => `Halfway through the year! You had a goal to ${t.toLowerCase()}. Still on track? You've got this — and if life got in the way, that's completely fine too.`,
};

function addMonths(date, n) { const d = new Date(date); d.setMonth(d.getMonth() + n); return d; }
function fmtDate(d) { return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' }); }

export default function Reminders({ planItems, onUpdatePlan }) {
  const now = new Date();
  const reminders = [];
  for (const item of planItems.filter(p => p.year === 'this_year' && p.addedAt)) {
    const action = getAction(item.actionId);
    if (!action) continue;
    const added = new Date(item.addedAt);
    for (const months of [1, 3, 6]) {
      const triggerDate = addMonths(added, months);
      reminders.push({
        id: `${item.actionId}-${months}m`, actionId: item.actionId,
        actionTitle: action.title, triggerDate, months,
        sent: triggerDate <= now,
        copy: REMINDER_COPY[months](action.title),
      });
    }
  }
  reminders.sort((a, b) => a.triggerDate - b.triggerDate);
  const upcoming = reminders.filter(r => !r.sent);
  const sent     = reminders.filter(r => r.sent).reverse();

  if (reminders.length === 0) {
    return (
      <div className="screen">
        <div className="empty-state-center">
          <p className="empty-icon">📬</p>
          <p className="empty-title">No reminders yet</p>
          <p className="empty-body">Add actions to <strong>This year</strong> in your plan and we'll schedule friendly nudges at 1, 3 and 6 months.</p>
        </div>
      </div>
    );
  }

  const RCard = ({ r }) => (
    <div className={`reminder-card${r.sent ? ' reminder-card--sent' : ''}`}>
      <div className="reminder-meta">
        <span className="reminder-tag">{r.months} month{r.months > 1 ? 's' : ''}</span>
        <span className="reminder-date">{fmtDate(r.triggerDate)}</span>
      </div>
      <p className="reminder-copy">{r.copy}</p>
      <button className="reminder-link" onClick={() => onUpdatePlan(r.actionId)}>Update my plan</button>
    </div>
  );

  return (
    <div className="screen">
      {upcoming.length > 0 && (
        <section className="reminders-section">
          <h2 className="section-title">Coming up</h2>
          {upcoming.map(r => <RCard key={r.id} r={r} />)}
        </section>
      )}
      {sent.length > 0 && (
        <section className="reminders-section">
          <h2 className="section-title">Sent</h2>
          {sent.map(r => <RCard key={r.id} r={r} />)}
        </section>
      )}
    </div>
  );
}
