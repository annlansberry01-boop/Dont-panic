import { useState, useCallback } from 'react';
import Onboarding     from './components/Onboarding.jsx';
import Header         from './components/Header.jsx';
import MyPlan         from './components/MyPlan.jsx';
import AllActionsHub  from './components/AllActionsHub.jsx';
import AllActions     from './components/AllActions.jsx';
import Reminders      from './components/Reminders.jsx';
import BottomSheet    from './components/BottomSheet.jsx';
import Profile        from './components/Profile.jsx';
import Navigation     from './components/Navigation.jsx';
import { getAction } from './data/actions.js';
import { buildInitialPlan, SPRINT_PRELOAD_IDS } from './data/templates.js';
import { loadUser, loadPlan, saveUser, savePlan, loadSprint, saveSprint, recordCommunityAction } from './storage.js';

export default function App() {
  const [user,           setUser]           = useState(() => loadUser());
  const [planItems,      setPlanItems]      = useState(() => loadPlan());
  const [activeTab,      setActiveTab]      = useState('myPlan');
  const [allActionsView, setAllActionsView] = useState(null); // null=hub | 'personal'|'community'|'political'|'all'
  const [sheet,          setSheet]          = useState(null);
  const [sprint,         setSprint]         = useState(() => loadSprint()); // null | { startDate: ISO }

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
    if (user?.postcode) recordCommunityAction(actionId, user.postcode);
    setSheet(null);
  }, [user]);

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

  const sheetAction   = sheet ? getAction(sheet.actionId)                          : null;
  const sheetPlanItem = sheet ? planItems.find(p => p.actionId === sheet.actionId) : null;

  if (!user) return <Onboarding onComplete={handleOnboardingComplete} />;

  return (
    <div className="app">
      <Header user={user} planItems={planItems} />
      <main className="main-content">
        {activeTab === 'profile'   && <Profile user={user} onSave={handleSaveProfile} />}
        {activeTab === 'myPlan'    && <MyPlan user={user} planItems={planItems} onTapCard={openSheet} onMove={handleMove} sprint={sprint} onStartSprint={startSprint} onEndSprint={endSprint} />}
        {activeTab === 'allActions' && !allActionsView && (
          <AllActionsHub onSelect={setAllActionsView} />
        )}
        {activeTab === 'allActions' && allActionsView && (
          <AllActions
            planItems={planItems}
            onTapCard={openSheet}
            typeFilter={allActionsView}
            onBack={() => setAllActionsView(null)} />
        )}
        {activeTab === 'reminders' && (
          <Reminders planItems={planItems}
            onUpdatePlan={(id) => { openSheet(id); setActiveTab('myPlan'); }} />
        )}
      </main>
      <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
      {sheet && (
        <BottomSheet
          action={sheetAction}
          planItem={sheetPlanItem}
          onAdd={(year)  => handleAddToYear(sheet.actionId, year)}
          onMove={(year) => handleMove(sheet.actionId, year)}
          onDone={()     => handleMarkDone(sheet.actionId)}
          onRemove={()   => handleRemove(sheet.actionId)}
          onClose={closeSheet}
          sprintActive={!!sprint} />
      )}
    </div>
  );
}
