import { getAction } from '../data/actions.js';

const OFFSETS_MONTHS = [1, 3, 6];

const REMINDER_COPY = {
  1: (title) => `Hey — a month ago you added "${title}" to your plan for this year. How's it going? No pressure, just checking in. Every small step counts.`,
  3: (title) => `Three months since you planned to ${title.toLowerCase()}. If you've started — nice work! If not, there's still plenty of time. Want to tweak your timeline?`,
  6: (title) => `Halfway through the year! You had a goal to ${title.toLowerCase()}. Still on track? You've got this — and if life got in the way, that's completely fine too.`,
};

function addMonths(date, months) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

function formatDate(date) {
  return date.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });
}

function generateReminders(planItems, now) {
  const reminders = [];
  const thisYearItems = planItems.filter(p => p.year === 'this_year' && p.addedAt);

  for (const item of thisYearItems) {
    const action = getAction(item.actionId);
    if (!action) continue;
    const added = new Date(item.addedAt);

    for (const months of OFFSETS_MONTHS) {
      const triggerDate = addMonths(added, months);
      reminders.push({
        id:          `${item.actionId}-${months}m`,
        actionId:    item.actionId,
        actionTitle: action.title,
        triggerDate,
        months,
        sent:        triggerDate <= now,
        copy:        REMINDER_COPY[months](action.title),
      });
    }
  }

  return reminders.sort((a, b) => a.triggerDate - b.triggerDate);
}

function ReminderCard({ reminder, onUpdatePlan }) {
  return (
    <div className={`reminder-card${reminder.sent ? ' reminder-card--sent' : ''}`}>
      <div className="reminder-meta">
        <span className="reminder-tag">{reminder.months} month{reminder.months > 1 ? 's' : ''}</span>
        <span className="reminder-date">{formatDate(reminder.triggerDate)}</span>
      </div>
      <p className="reminder-copy">{reminder.copy}</p>
      <button className="reminder-link" onClick={() => onUpdatePlan(reminder.actionId)}>
        Update my plan
      </button>
    </div>
  );
}

export default function Reminders({ planItems, onUpdatePlan }) {
  const now       = new Date();
  const reminders = generateReminders(planItems, now);
  const upcoming  = reminders.filter(r => !r.sent);
  const sent      = reminders.filter(r => r.sent).reverse();

  if (reminders.length === 0) {
    return (
      <div className="screen">
        <div className="empty-state-center">
          <p className="empty-icon">📬</p>
          <p className="empty-title">No reminders yet</p>
          <p className="empty-body">
            Add actions to <strong>This year</strong> in your plan and we'll send friendly nudges at 1, 3 and 6 months.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="screen">
      {upcoming.length > 0 && (
        <section className="reminders-section">
          <h2 className="section-title">Coming up</h2>
          {upcoming.map(r => (
            <ReminderCard key={r.id} reminder={r} onUpdatePlan={onUpdatePlan} />
          ))}
        </section>
      )}

      {sent.length > 0 && (
        <section className="reminders-section">
          <h2 className="section-title">Sent</h2>
          {sent.map(r => (
            <ReminderCard key={r.id} reminder={r} onUpdatePlan={onUpdatePlan} />
          ))}
        </section>
      )}
    </div>
  );
}
