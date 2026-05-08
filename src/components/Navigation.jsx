const TABS = [
  { id: 'myPlan',     label: 'My Plan',     icon: '📋' },
  { id: 'allActions', label: 'All Actions', icon: '🗂️' },
  { id: 'reminders',  label: 'Reminders',   icon: '🔔' },
];

export default function Navigation({ activeTab, onTabChange }) {
  return (
    <nav className="bottom-nav">
      {TABS.map(tab => (
        <button
          key={tab.id}
          className={`nav-tab${activeTab === tab.id ? ' nav-tab--active' : ''}`}
          onClick={() => onTabChange(tab.id)}
          aria-current={activeTab === tab.id ? 'page' : undefined}
        >
          <span className="nav-icon">{tab.icon}</span>
          <span className="nav-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
