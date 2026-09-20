import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import ConfirmScreen from "./components/ConfirmScreen";
import DescribeStep from "./components/DescribeStep";
import FlyerScreen from "./components/FlyerScreen";
import Icon from "./components/Icons";
import type { IconName } from "./components/Icons";
import Intake from "./components/Intake";
import PlanView from "./components/PlanView";
import SettingsPanel from "./components/SettingsPanel";
import { modules } from "./content/modules";
import type { ParsedSituation } from "./lib/intakeApi";
import { buildPlan } from "./lib/plan";
import { DEFAULT_SETTINGS, TEXT_SIZE_PERCENT } from "./lib/settings";
import type { Settings } from "./lib/settings";
import { SITE_URL } from "./lib/site";
import { speak, stopSpeaking, isSpeechSupported } from "./lib/speech";
import { EMPTY_PROFILE } from "./types";
import type { Profile } from "./types";

type Screen = "start" | "describe" | "confirm" | "intake" | "plan" | "flyer";

type ChoiceCardProps = {
  icon: IconName;
  title: string;
  description: string;
  onClick: () => void;
  primary?: boolean;
};

function ChoiceCard({
  icon,
  title,
  description,
  onClick,
  primary,
}: ChoiceCardProps) {
  const colors = primary
    ? "border-accent bg-accent text-accent-ink"
    : "border-ink bg-white text-ink";
  const circle = primary
    ? "bg-white/20 text-accent-ink"
    : "bg-accent-soft text-accent";
  const subtle = primary ? "text-accent-ink" : "text-muted";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`flex w-full items-center gap-4 rounded-2xl border-2 p-5 text-left shadow-sm ${colors}`}
    >
      <span
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${circle}`}
      >
        <Icon name={icon} className="h-7 w-7" />
      </span>
      <span className="flex-1">
        <span className="block text-xl font-bold">{title}</span>
        <span className={`mt-1 block text-lg ${subtle}`}>{description}</span>
      </span>
      <Icon name="arrow" className="h-6 w-6 shrink-0" />
    </motion.button>
  );
}

const BENEFITS: string[] = [
  "Steps in the order you should do them",
  "A one-page printout that works without power or internet",
  "Large print, high contrast, plain language, and reduced motion",
];

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
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-lg font-bold text-accent">
          Hurricane season in Alachua County
        </p>
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="mt-2 text-4xl font-bold leading-tight outline-none sm:text-5xl"
        >
          A storm plan that fits you.
        </h1>
        <p className="mt-4 text-xl text-muted">
          Answer a few questions, or describe your situation in your own words.
          You get a plan you can print and use without power.
        </p>
      </motion.div>

      <motion.div
        className="mt-6 flex flex-col gap-3"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.08 }}
      >
        <ChoiceCard
          primary
          icon="pencil"
          title="Describe my situation"
          description="Write a few sentences in your own words and we will read them."
          onClick={onDescribe}
        />
        <ChoiceCard
          icon="list"
          title="Answer a few questions"
          description="Six quick questions with big buttons. Nothing leaves your browser."
          onClick={onQuestions}
        />
      </motion.div>

      <motion.ul
        className="mt-6 space-y-2"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.16 }}
      >
        {BENEFITS.map((benefit) => (
          <li key={benefit} className="flex items-start gap-3 text-lg">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
              <Icon name="check" className="h-4 w-4" />
            </span>
            {benefit}
          </li>
        ))}
      </motion.ul>

      <p className="mt-6 rounded-xl border border-line bg-white p-4 text-base text-muted">
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
  const mainRef = useRef<HTMLElement>(null);
  const [readingPage, setReadingPage] = useState(false);
  const speechSupported = isSpeechSupported();

  // Apply text size and contrast to the whole page.
  useEffect(() => {
    document.documentElement.style.fontSize =
      TEXT_SIZE_PERCENT[settings.textSize];
    document.documentElement.dataset.contrast = settings.contrast;
  }, [settings]);

  // Let the print stylesheet know whether this is the flyer (normal size)
  // or any other screen (compact, for the one-page plan printout).
  useEffect(() => {
    document.documentElement.dataset.printMode =
      screen === "flyer" ? "flyer" : "plan";
  }, [screen]);

  // Stop any reading in progress whenever the screen changes.
  useEffect(() => {
    stopSpeaking();
    setReadingPage(false);
  }, [screen]);

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

  function readCurrentPage() {
    if (readingPage) {
      stopSpeaking();
      setReadingPage(false);
      return;
    }
    const text = mainRef.current?.innerText ?? "";
    if (!text.trim()) return;
    setReadingPage(true);
    speak(text, () => setReadingPage(false));
  }

  return (
    <MotionConfig reducedMotion={settings.reduceMotion ? "always" : "user"}>
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8 lg:max-w-none lg:px-8 print:m-0 print:block print:min-h-0 print:max-w-none print:p-0">
        
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:border-2 focus:border-ink focus:bg-white focus:px-4 focus:py-2 focus:font-bold">Skip to main content</a>

        <header className="mb-6 print:hidden">
          <div className="flex items-start justify-between gap-3">
            <button
              type="button"
              onClick={() => setScreen("start")}
              className="flex items-center gap-3 rounded-lg text-left"
              aria-label="Steady, go to home screen"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full -rotate-3 bg-accent text-accent-ink">
                <Icon name="shield" className="h-6 w-6" />
              </span>
              <div>
                <p className="text-xl font-bold leading-tight">Steady</p>
                <p className="text-sm text-muted">
                  A plan that adapts to you, for Alachua County
                </p>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setScreen("flyer")}
              className="flex min-h-11 items-center gap-2 rounded-lg border-2 border-ink bg-white px-3 py-2 text-sm font-bold"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><line x1="14" y1="14" x2="14" y2="21"/><line x1="21" y1="14" x2="21" y2="21"/><line x1="14" y1="17.5" x2="21" y2="17.5"/></svg>
              Share via QR code
            </button>
          </div>
        </header>

        <div className="wave-divider" aria-hidden="true" />

        <div className="mt-6 flex-1 lg:grid lg:grid-cols-3 lg:items-start lg:gap-8 print:m-0">
          <aside aria-label="Display settings" className="lg:sticky lg:top-6 lg:col-span-1 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto print:hidden">
            <SettingsPanel
              settings={settings}
              plainLanguage={profile.reading_level === "plain"}
              onSettingsChange={setSettings}
              onPlainLanguageChange={setPlainLanguage}
              onReadPage={readCurrentPage}
              isReadingPage={readingPage}
              speechSupported={speechSupported}
            />
          </aside>

          <main id="main-content" ref={mainRef} className="mt-6 min-w-0 lg:col-span-2 lg:mt-0 print:p-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={screen}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
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
                  <PlanView
                    profile={profile}
                    plan={plan}
                    onStartOver={startOver}
                  />
                )}
                {screen === "flyer" && (
                  <FlyerScreen onBack={() => setScreen("start")} />
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>

        <div className="wave-divider wave-divider-flip mt-10" aria-hidden="true" />

        <footer className="mt-6 border-t border-line pt-4 text-base text-muted print:hidden">
          Not official guidance. In an emergency, call 911. Answers to the
          questions stay in this browser. If you describe your situation in
          your own words, that text is sent to the Google Gemini service to be
          read and is not saved by us.
        </footer>
      </div>
    </MotionConfig>
  );
}