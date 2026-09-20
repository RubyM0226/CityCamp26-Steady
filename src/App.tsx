import { useState } from "react";
import { MotionConfig, motion } from "motion/react";
import { modules } from "./content/modules";
import { buildPlan, getText, PHASE_ORDER } from "./lib/plan";
import { EMPTY_PROFILE } from "./types";
import type { Phase, Profile } from "./types";

type YesNo = boolean | null;
type YesNoField =
  | "relies_on_power"
  | "needs_help_evacuating"
  | "lives_alone"
  | "has_pet_or_service_animal";

const PHASE_TITLES: Record<Phase, string> = {
  now: "Do now",
  coming: "When a storm is coming",
  during: "During the storm",
  after: "After the storm",
};

const TEST_FIELDS: { field: YesNoField; label: string }[] = [
  { field: "relies_on_power", label: "Relies on power" },
  { field: "needs_help_evacuating", label: "Needs help evacuating" },
  { field: "lives_alone", label: "Lives alone" },
  { field: "has_pet_or_service_animal", label: "Has an animal" },
];

function nextValue(current: YesNo): YesNo {
  if (current === null) {
    return true;
  }
  if (current === true) {
    return false;
  }
  return null;
}

function describe(value: YesNo): string {
  if (value === true) {
    return "Yes";
  }
  if (value === false) {
    return "No";
  }
  return "Not sure";
}

export default function App() {
  const [profile, setProfile] = useState<Profile>(EMPTY_PROFILE);
  const plan = buildPlan(profile, modules);

  function cycleField(field: YesNoField) {
    setProfile({ ...profile, [field]: nextValue(profile[field]) });
  }

  function togglePlain() {
    const next = profile.reading_level === "plain" ? "standard" : "plain";
    setProfile({ ...profile, reading_level: next });
  }

  return (
    <MotionConfig reducedMotion="user">
      <main className="mx-auto min-h-screen max-w-2xl bg-stone-50 p-6 text-stone-900">
        <h1 className="text-3xl font-bold">Storm Steps: rules test</h1>

        <div className="mt-4 flex flex-wrap gap-2">
          {TEST_FIELDS.map((item) => (
            <button
              key={item.field}
              type="button"
              onClick={() => cycleField(item.field)}
              className="rounded-lg border-2 border-stone-900 px-4 py-2 text-lg font-bold"
            >
              {item.label}: {describe(profile[item.field])}
            </button>
          ))}
          <button
            type="button"
            onClick={togglePlain}
            className="rounded-lg border-2 border-stone-900 px-4 py-2 text-lg font-bold"
          >
            Reading level: {profile.reading_level}
          </button>
        </div>

        {PHASE_ORDER.map((phase) => (
          <section key={phase} className="mt-8">
            <h2 className="text-2xl font-bold">
              {PHASE_TITLES[phase]} ({plan[phase].length})
            </h2>
            <ul className="mt-3 space-y-4">
              {plan[phase].map((planModule) => (
                <motion.li
                  key={planModule.id}
                  layout
                  className="rounded-lg border border-stone-300 bg-white p-4 text-lg"
                >
                  {getText(planModule, profile)}
                </motion.li>
              ))}
            </ul>
          </section>
        ))}
      </main>
    </MotionConfig>
  );
}