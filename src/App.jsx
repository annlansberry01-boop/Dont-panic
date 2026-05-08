import { useState, useCallback } from 'react';
import Onboarding  from './components/Onboarding.jsx';
import Header      from './components/Header.jsx';
import MyPlan      from './components/MyPlan.jsx';
import AllActions  from './components/AllActions.jsx';
import Reminders   from './components/Reminders.jsx';
import BottomSheet from './components/BottomSheet.jsx';
import Navigation  from './components/Navigation.jsx';
import { getAction } from './data/actions.js';
import { TEMPLATES } from './data/templates.js';

// ── Local storage helpers ─────────────────────────────────────────────────────
const LS_USER      = 'dp_user';
const LS_PLAN      = 'dp_plan';
const LS_COMMUNITY = 'dp_community';

function loadUser()  { try { return JSON.parse(localStorage.getItem(LS_USER))  || null; } catch { return null; } }
function loadPlan()  { try { return JSON.parse(localStorage.getItem(LS_PLAN))  || [];   } catch { return [];   } }
function saveUser(u) { localStorage.setItem(LS_USER, JSON.stringify(u)); }
function savePlan(p) { localStorage.setItem(LS_PLAN, JSON.stringify(p)); }

// Community data — postcode → completed action IDs (not surfaced in UI)
function recordCommunityAction(actionId, postcode) {
  try {
    const data = JSON.parse(localStorage.getItem(LS_COMMUNITY)) || {};
    data[postcode] = [...new Set([...(data[postcode] || []), actionId])];
    localStorage.setItem(LS_COMMUNITY, JSON.stringify(data));
  } catch { /* non-critical */ }
}

// Build initial plan from life stage template
function buildInitialPlan(lifeStage) {
  const template = TEMPLATES[lifeStage] || {};
  const items = [];
  for (const [year, actionIds] of Object.entries(template)) {
    for (const actionId of actionIds) {
      items.push({ actionId, year, addedAt: new Date().toISOString() });
    }
  }
  return items;
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [user,      setUser]      = useState(() => loadUser());
  const [planItems, setPlanItems] = useState(() => loadPlan());
  const [activeTab, setActiveTab] = useState('myPlan');
  const [sheet, setSheet]         = useState(null); // { actionId }

  // ── Onboarding complete ──────────────────────────────────────────────────
  function handleOnboardingComplete(userData) {
    const plan = buildInitialPlan(userData.lifeStage);
    saveUser(userData);
    savePlan(plan);
    setUser(userData);
    setPlanItems(plan);
  }

  // ── Plan mutations ───────────────────────────────────────────────────────
  function updatePlan(fn) {
    setPlanItems(prev => {
      const next = fn(prev);
      savePlan(next);
      return next;
    });
  }

  const handleAddToYear = useCallback((actionId, year) => {
    updatePlan(prev => {
      const without = prev.filter(p => p.actionId !== actionId);
      return [...without, { actionId, year, addedAt: new Date().toISOString() }];
    });
    setSheet(null);
  }, []);

  const handleMove = useCallback((actionId, year) => {
    updatePlan(prev =>
      prev.map(p => p.actionId === actionId ? { ...p, year } : p)
    );
    setSheet(null);
  }, []);

  const handleMarkDone = useCallback((actionId) => {
    updatePlan(prev =>
      prev.map(p => p.actionId === actionId ? { ...p, year: 'done' } : p)
    );
    // Record for community feature
    if (user?.postcode) recordCommunityAction(actionId, user.postcode);
    setSheet(null);
  }, [user]);

  const handleRemove = useCallback((actionId) => {
    updatePlan(prev => prev.filter(p => p.actionId !== actionId));
    setSheet(null);
  }, []);

  // ── Sheet helpers ────────────────────────────────────────────────────────
  function openSheet(actionId) { setSheet({ actionId }); }
  function closeSheet()        { setSheet(null); }

  const sheetAction   = sheet ? getAction(sheet.actionId) : null;
  const sheetPlanItem = sheet ? planItems.find(p => p.actionId === sheet.actionId) : null;

  // ── Render ───────────────────────────────────────────────────────────────
  if (!user) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="app">
      <Header user={user} planItems={planItems} />

      <main className="main-content">
        {activeTab === 'myPlan' && (
          <MyPlan planItems={planItems} onTapCard={openSheet} />
        )}
        {activeTab === 'allActions' && (
          <AllActions planItems={planItems} onTapCard={openSheet} />
        )}
        {activeTab === 'reminders' && (
          <Reminders
            planItems={planItems}
            onUpdatePlan={(actionId) => { openSheet(actionId); setActiveTab('myPlan'); }}
          />
        )}
      </main>

      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      {sheet && (
        <BottomSheet
          action={sheetAction}
          planItem={sheetPlanItem}
          onAdd={(year)    => handleAddToYear(sheet.actionId, year)}
          onMove={(year)   => handleMove(sheet.actionId, year)}
          onDone={()       => handleMarkDone(sheet.actionId)}
          onRemove={()     => handleRemove(sheet.actionId)}
          onClose={closeSheet}
        />
      )}
    </div>
  );
}
