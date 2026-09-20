import { useState } from "react";
import { MotionConfig, motion } from "motion/react";
import Intake from "./components/Intake";
import { modules } from "./content/modules";
import { buildPlan, getText, PHASE_ORDER } from "./lib/plan";
import { EMPTY_PROFILE } from "./types";
import type { Phase, Profile } from "./types";

const PHASE_TITLES: Record<Phase, string> = {
  now: "Do now",
  coming: "When a storm is coming",
  during: "During the storm",
  after: "After the storm",
};

export default function App() {
  const [profile, setProfile] = useState<Profile>(EMPTY_PROFILE);
  const [screen, setScreen] = useState<"intake" | "plan">("intake");
  const plan = buildPlan(profile, modules);

  function startOver() {
    setProfile(EMPTY_PROFILE);
    setScreen("intake");
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-8">
        <header>
          <p className="text-xl font-bold text-accent">Storm Steps</p>
        </header>

        <main className="flex-1 py-6">
          {screen === "intake" ? (
            <Intake
              profile={profile}
              onChange={setProfile}
              onDone={() => setScreen("plan")}
            />
          ) : (
            <section>
              <h1 className="text-3xl font-bold">Your storm plan</h1>
              {PHASE_ORDER.map((phase) => (
                <div key={phase} className="mt-8">
                  <h2 className="text-2xl font-bold">{PHASE_TITLES[phase]}</h2>
                  <ul className="mt-3 space-y-4">
                    {plan[phase].map((planModule, index) => (
                      <motion.li
                        key={planModule.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="rounded-xl border border-line bg-white p-4 text-lg"
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
              ))}
              <button
                type="button"
                onClick={startOver}
                className="mt-8 min-h-14 rounded-xl border-2 border-ink px-5 py-3 text-lg font-bold"
              >
                Start over
              </button>
            </section>
          )}
        </main>

        <footer className="border-t border-line pt-4 text-base text-muted">
          Not official guidance. In an emergency, call 911. Your answers stay
          in this browser.
        </footer>
      </div>
    </MotionConfig>
  );
}