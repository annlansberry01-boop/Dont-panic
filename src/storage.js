export const LS_USER = 'dp_user';
export const LS_PLAN = 'dp_plan';
export const LS_SPRINT = 'dp_sprint';

export const loadUser = () => { try { return JSON.parse(localStorage.getItem(LS_USER)) || null; } catch { return null; } };
export const loadPlan = () => { try { return JSON.parse(localStorage.getItem(LS_PLAN)) || []; } catch { return []; } };
export const saveUser = (u) => localStorage.setItem(LS_USER, JSON.stringify(u));
export const savePlan = (p) => localStorage.setItem(LS_PLAN, JSON.stringify(p));
export const loadSprint = () => { try { return JSON.parse(localStorage.getItem(LS_SPRINT)) || null; } catch { return null; } };
export const saveSprint = (s) => s ? localStorage.setItem(LS_SPRINT, JSON.stringify(s)) : localStorage.removeItem(LS_SPRINT);
