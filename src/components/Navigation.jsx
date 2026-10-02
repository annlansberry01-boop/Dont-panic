const NAV_TABS = [
  { id: 'myPlan',     label: 'Manage' },
  { id: 'allActions', label: 'All Actions' },
  { id: 'profile',    label: 'Profile' },
];

export default function Navigation({ activeTab, onTabChange }) {
  return (
    <nav className="top-nav">
      {NAV_TABS.map(tab => (
        <button key={tab.id}
          className={`nav-tab${activeTab === tab.id ? ' nav-tab--active' : ''}`}
          onClick={() => onTabChange(tab.id)}
          aria-current={activeTab === tab.id ? 'page' : undefined}>
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
