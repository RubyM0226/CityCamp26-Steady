import { useEffect, useState } from "react";
import { MotionConfig } from "motion/react";
import Intake from "./components/Intake";
import PlanView from "./components/PlanView";
import SettingsPanel from "./components/SettingsPanel";
import { modules } from "./content/modules";
import { buildPlan } from "./lib/plan";
import { DEFAULT_SETTINGS, TEXT_SIZE_PERCENT } from "./lib/settings";
import type { Settings } from "./lib/settings";
import { EMPTY_PROFILE } from "./types";
import type { Profile } from "./types";

export default function App() {
  const [profile, setProfile] = useState<Profile>(EMPTY_PROFILE);
  const [screen, setScreen] = useState<"intake" | "plan">("intake");
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const plan = buildPlan(profile, modules);

  // Apply text size and contrast to the whole page.
  useEffect(() => {
    document.documentElement.style.fontSize = TEXT_SIZE_PERCENT[settings.textSize];
    document.documentElement.dataset.contrast = settings.contrast;
  }, [settings]);

  function setPlainLanguage(plain: boolean) {
    setProfile({ ...profile, reading_level: plain ? "plain" : "standard" });
  }

  function startOver() {
    // Keep the reading level so the person's preference carries over.
    setProfile({ ...EMPTY_PROFILE, reading_level: profile.reading_level });
    setScreen("intake");
  }

  return (
    <MotionConfig reducedMotion={settings.reduceMotion ? "always" : "user"}>
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-8">
        <header className="space-y-4">
          <p className="text-xl font-bold text-accent">Storm Steps</p>
          <SettingsPanel
            settings={settings}
            plainLanguage={profile.reading_level === "plain"}
            onSettingsChange={setSettings}
            onPlainLanguageChange={setPlainLanguage}
          />
        </header>

        <main className="flex-1 py-6">
          {screen === "intake" ? (
            <Intake
              profile={profile}
              onChange={setProfile}
              onDone={() => setScreen("plan")}
            />
          ) : (
            <PlanView profile={profile} plan={plan} onStartOver={startOver} />
          )}
        </main>

        <footer className="border-t border-line pt-4 text-base text-muted print:hidden">
          Not official guidance. In an emergency, call 911. Your answers stay
          in this browser.
        </footer>
      </div>
    </MotionConfig>
  );
}