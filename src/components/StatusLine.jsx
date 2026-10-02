import { LIFE_STAGES } from '../data/templates.js';

export default function StatusLine({ user, planItems }) {
  const stageName = LIFE_STAGES.find(s => s.value === user.lifeStage)?.label ?? '';
  const remaining = planItems.filter(p => p.year !== 'done').length;
  const done      = planItems.filter(p => p.year === 'done').length;
  return (
    <p className="status-line">
      {stageName}{stageName ? ' · ' : ''}{remaining} to go{done > 0 ? ` · ${done} done` : ''}
    </p>
  );
}
