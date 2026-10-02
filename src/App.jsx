import { useState, useCallback, useEffect } from 'react';
import Onboarding     from './components/Onboarding.jsx';
import StatusLine     from './components/StatusLine.jsx';
import MyPlan         from './components/MyPlan.jsx';
import AllActionsHub  from './components/AllActionsHub.jsx';
import AllActions     from './components/AllActions.jsx';
import Profile        from './components/Profile.jsx';
import Navigation     from './components/Navigation.jsx';
import { buildInitialPlan, SPRINT_PRELOAD_IDS } from './data/templates.js';
import { loadUser, loadPlan, saveUser, savePlan, loadSprint, saveSprint } from './storage.js';

export default function App() {
  const [user,           setUser]           = useState(() => loadUser());
  const [planItems,      setPlanItems]      = useState(() => loadPlan());
  const [activeTab,      setActiveTab]      = useState('myPlan');
  const [allActionsView, setAllActionsView] = useState(null); // null=hub | 'personal'|'community'|'political'|'all'
  const [sheet,          setSheet]          = useState(null);
  const [sprint,         setSprint]         = useState(() => loadSprint()); // null | { startDate: ISO }

  // Tell the parent page (when embedded in an iframe) how tall the content is,
  // so it can resize the iframe instead of the app scrolling internally.
  useEffect(() => {
    let lastHeight = 0;
    function report() {
      const height = document.body.scrollHeight;
      if (height !== lastHeight) {
        lastHeight = height;
        window.parent.postMessage({ type: 'dont-panic-height', height }, '*');
      }
    }
    const observer = new ResizeObserver(report);
    observer.observe(document.body);
    report();
    return () => observer.disconnect();
  }, []);

  function handleTabChange(tab) {
    if (tab !== 'allActions') setAllActionsView(null);
    setActiveTab(tab);
  }

  function handleOnboardingComplete(userData) {
    const plan = buildInitialPlan(userData.lifeStage, userData.planType);
    saveUser(userData); savePlan(plan);
    setUser(userData); setPlanItems(plan);
  }

  function updatePlan(fn) {
    setPlanItems(prev => { const next = fn(prev); savePlan(next); return next; });
  }

  const handleAddToYear = useCallback((actionId, year) => {
    updatePlan(prev => [...prev.filter(p => p.actionId !== actionId), { actionId, year, addedAt: new Date().toISOString() }]);
    setSheet(null);
  }, []);

  const handleMove = useCallback((actionId, year) => {
    updatePlan(prev => prev.map(p => p.actionId === actionId ? { ...p, year } : p));
    setSheet(null);
  }, []);

  const handleMarkDone = useCallback((actionId) => {
    updatePlan(prev => prev.map(p => p.actionId === actionId ? { ...p, year: 'done' } : p));
    setSheet(null);
  }, []);

  const handleRemove = useCallback((actionId) => {
    updatePlan(prev => prev.filter(p => p.actionId !== actionId));
    setSheet(null);
  }, []);

  function startSprint() {
    const now  = new Date().toISOString();
    const data = { startDate: now };
    setSprint(data);
    saveSprint(data);
    updatePlan(prev => {
      const inPlan = new Set(prev.map(p => p.actionId));
      const extras = SPRINT_PRELOAD_IDS
        .filter(id => !inPlan.has(id))
        .map(id => ({ actionId: id, year: 'sprint', addedAt: now }));
      return [...prev, ...extras];
    });
  }

  function endSprint() {
    setSprint(null);
    saveSprint(null);
    updatePlan(prev => prev.map(p => p.year === 'sprint' ? { ...p, year: 'this_year' } : p));
  }

  function handleSaveProfile(updatedUser) {
    saveUser(updatedUser);
    setUser(updatedUser);
  }

  function openSheet(actionId)  { setSheet({ actionId }); }
  function closeSheet()         { setSheet(null); }

  if (!user) return <Onboarding onComplete={handleOnboardingComplete} />;

  const openActionId = sheet?.actionId ?? null;

  return (
    <div className="app">
      <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
      <StatusLine user={user} planItems={planItems} />
      <main className="main-content">
        {activeTab === 'profile'   && <Profile user={user} onSave={handleSaveProfile} />}
        {activeTab === 'myPlan'    && (
          <MyPlan user={user} planItems={planItems} onTapCard={openSheet} onMove={handleMove}
            sprint={sprint} onStartSprint={startSprint} onEndSprint={endSprint}
            openActionId={openActionId} onDone={handleMarkDone} onRemove={handleRemove}
            onClosePanel={closeSheet} />
        )}
        {activeTab === 'allActions' && !allActionsView && (
          <AllActionsHub onSelect={setAllActionsView} />
        )}
        {activeTab === 'allActions' && allActionsView && (
          <AllActions
            planItems={planItems}
            onTapCard={openSheet}
            typeFilter={allActionsView}
            onBack={() => setAllActionsView(null)}
            openActionId={openActionId}
            onAdd={handleAddToYear} onMove={handleMove} onDone={handleMarkDone} onRemove={handleRemove}
            onClosePanel={closeSheet} sprintActive={!!sprint} />
        )}
      </main>
    </div>
  );
}
