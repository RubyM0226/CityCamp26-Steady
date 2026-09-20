import { useEffect, useRef, useState } from "react";
import { MotionConfig } from "motion/react";
import ConfirmScreen from "./components/ConfirmScreen";
import DescribeStep from "./components/DescribeStep";
import Intake from "./components/Intake";
import PlanView from "./components/PlanView";
import SettingsPanel from "./components/SettingsPanel";
import { modules } from "./content/modules";
import type { ParsedSituation } from "./lib/intakeApi";
import { buildPlan } from "./lib/plan";
import { DEFAULT_SETTINGS, TEXT_SIZE_PERCENT } from "./lib/settings";
import type { Settings } from "./lib/settings";
import { EMPTY_PROFILE } from "./types";
import type { Profile } from "./types";

type Screen = "start" | "describe" | "confirm" | "intake" | "plan";

type StartScreenProps = {
  onDescribe: () => void;
  onQuestions: () => void;
};

function StartScreen({ onDescribe, onQuestions }: StartScreenProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

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
        Make your storm plan
      </h1>
      <p className="mt-3 text-xl">
        Answer a few questions, or describe your situation in your own words.
        Either way you get a plan you can print and use without power.
      </p>
      <div className="mt-6 flex flex-col gap-3">
        <button
          type="button"
          onClick={onDescribe}
          className="min-h-16 rounded-xl border-2 border-accent bg-accent px-5 py-3 text-left text-xl font-bold text-accent-ink"
        >
          Describe my situation in my own words
        </button>
        <button
          type="button"
          onClick={onQuestions}
          className="min-h-16 rounded-xl border-2 border-ink bg-white px-5 py-3 text-left text-xl font-bold"
        >
          Answer a few questions
        </button>
      </div>
      <p className="mt-6 text-base text-muted">
        Answers to the questions stay in this browser. If you describe your
        situation in your own words, that text is sent to the Google Gemini
        service to be read, and we do not save it.
      </p>
    </section>
  );
}

export default function App() {
  const [profile, setProfile] = useState<Profile>(EMPTY_PROFILE);
  const [screen, setScreen] = useState<Screen>("start");
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const plan = buildPlan(profile, modules);

  // Apply text size and contrast to the whole page.
  useEffect(() => {
    document.documentElement.style.fontSize =
      TEXT_SIZE_PERCENT[settings.textSize];
    document.documentElement.dataset.contrast = settings.contrast;
  }, [settings]);

  function setPlainLanguage(plain: boolean) {
    setProfile({ ...profile, reading_level: plain ? "plain" : "standard" });
  }

  function handleParsed(parsed: ParsedSituation) {
    setProfile({ ...profile, ...parsed });
    setScreen("confirm");
  }

  function startOver() {
    // Keep the reading level so the person's preference carries over.
    setProfile({ ...EMPTY_PROFILE, reading_level: profile.reading_level });
    setScreen("start");
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
          {screen === "start" && (
            <StartScreen
              onDescribe={() => setScreen("describe")}
              onQuestions={() => setScreen("intake")}
            />
          )}
          {screen === "describe" && (
            <DescribeStep
              onParsed={handleParsed}
              onUseQuestions={() => setScreen("intake")}
            />
          )}
          {screen === "confirm" && (
            <ConfirmScreen
              profile={profile}
              onChange={setProfile}
              onConfirm={() => setScreen("plan")}
              onBack={() => setScreen("describe")}
            />
          )}
          {screen === "intake" && (
            <Intake
              profile={profile}
              onChange={setProfile}
              onDone={() => setScreen("plan")}
            />
          )}
          {screen === "plan" && (
            <PlanView profile={profile} plan={plan} onStartOver={startOver} />
          )}
        </main>

        <footer className="border-t border-line pt-4 text-base text-muted print:hidden">
          Not official guidance. In an emergency, call 911. Answers to the
          questions stay in this browser. If you describe your situation in
          your own words, that text is sent to the Google Gemini service to be
          read and is not saved by us.
        </footer>
      </div>
    </MotionConfig>
  );
}