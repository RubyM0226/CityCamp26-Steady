import type { Condition, Phase, PlanModule, Profile } from "../types";

export const PHASE_ORDER: Phase[] = ["now", "coming", "during", "after"];

function conditionMatches(condition: Condition, profile: Profile): boolean {
  const value = profile[condition.field];

  // Not answered, or "not sure": show the step so nobody misses something important.
  if (value === null) {
    return true;
  }
  if (condition.equals !== undefined) {
    return value === condition.equals;
  }
  if (condition.in !== undefined) {
    return condition.in.includes(value);
  }
  return false;
}

export function moduleApplies(planModule: PlanModule, profile: Profile): boolean {
  // An empty list means the step applies to everyone.
  if (planModule.applies_when_any.length === 0) {
    return true;
  }
  return planModule.applies_when_any.some((condition) =>
    conditionMatches(condition, profile),
  );
}

export function buildPlan(
  profile: Profile,
  modules: PlanModule[],
): Record<Phase, PlanModule[]> {
  const plan: Record<Phase, PlanModule[]> = {
    now: [],
    coming: [],
    during: [],
    after: [],
  };

  for (const planModule of modules) {
    if (moduleApplies(planModule, profile)) {
      plan[planModule.phase].push(planModule);
    }
  }

  for (const phase of PHASE_ORDER) {
    plan[phase].sort((a, b) => a.priority - b.priority);
  }

  return plan;
}

export function getText(planModule: PlanModule, profile: Profile): string {
  if (profile.reading_level === "plain") {
    return planModule.text.en_plain;
  }
  return planModule.text.en_standard;
}