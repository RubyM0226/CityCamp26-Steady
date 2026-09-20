import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { getText, PHASE_ORDER } from "../lib/plan";
import type { Phase, PlanModule, Profile } from "../types";

type PlanViewProps = {
  profile: Profile;
  plan: Record<Phase, PlanModule[]>;
  onStartOver: () => void;
};

const PHASE_TITLES: Record<Phase, string> = {
  now: "Do now",
  coming: "When a storm is coming",
  during: "During the storm",
  after: "After the storm",
};

const BLANKS: string[] = [
  "Who I will call:",
  "Where I will go if I have to leave:",
  "Who will check on me:",
  "Equipment, medicines, and papers to bring:",
];

export default function PlanView({ profile, plan, onStartOver }: PlanViewProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Move keyboard and screen reader focus to the plan when it appears.
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <section>
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="text-3xl font-bold outline-none"
      >
        Your storm plan
      </h1>
      <p className="mt-2 text-lg text-muted print:hidden">
        Print this plan and fill in your personal details by hand. This site
        does not ask for names, phone numbers, or medical details.
      </p>

      {PHASE_ORDER.map((phase) => {
        if (plan[phase].length === 0) {
          return null;
        }
        return (
          <div key={phase} className="mt-8">
            <h2 className="text-2xl font-bold">{PHASE_TITLES[phase]}</h2>
            <ul className="mt-3 space-y-4">
              {plan[phase].map((planModule, index) => (
                <motion.li
                  key={planModule.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-xl border border-line bg-white p-4 text-lg print:break-inside-avoid"
                >
                  <p>{getText(planModule, profile)}</p>
                  <ul className="mt-2 space-y-1">
                    {planModule.links.map((link) => (
                      <li key={link.url}>
                        <a href={link.url} target="_blank" rel="noreferrer" className="font-bold text-accent underline">{link.label}</a>
                      </li>
                    ))}
                  </ul>
                </motion.li>
              ))}
            </ul>
          </div>
        );
      })}

      <div className="mt-10 hidden print:block">
        <h2 className="text-2xl font-bold">Fill in by hand</h2>
        {BLANKS.map((blank) => (
          <div key={blank} className="mt-6 print:break-inside-avoid">
            <p className="font-bold">{blank}</p>
            <div className="mt-8 border-b-2 border-ink" />
            <div className="mt-8 border-b-2 border-ink" />
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3 print:hidden">
        <button
          type="button"
          onClick={() => window.print()}
          className="min-h-14 rounded-xl border-2 border-accent bg-accent px-5 py-3 text-lg font-bold text-accent-ink"
        >
          Print my plan
        </button>
        <button
          type="button"
          onClick={onStartOver}
          className="min-h-14 rounded-xl border-2 border-ink bg-white px-5 py-3 text-lg font-bold"
        >
          Start over
        </button>
      </div>
    </section>
  );
}