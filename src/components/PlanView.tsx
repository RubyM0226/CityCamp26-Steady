import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { getText, PHASE_ORDER } from "../lib/plan";
import type { Phase, PlanModule, Profile } from "../types";
import Icon from "./Icons";
import type { IconName } from "./Icons";
import PrintSheet from "./PrintSheet";
import { speak, stopSpeaking, isSpeechSupported } from "../lib/speech";

type PlanViewProps = {
  profile: Profile;
  plan: Record<Phase, PlanModule[]>;
  onStartOver: () => void;
};

type PhaseMeta = {
  title: string;
  icon: IconName;
  color: string;
  bg: string;
  ink: string;
};

const PHASE_META: Record<Phase, PhaseMeta> = {
  now: {
    title: "Do now",
    icon: "clock",
    color: "var(--phase-now)",
    bg: "var(--phase-now-bg)",
    ink: "var(--phase-now-ink)",
  },
  coming: {
    title: "When a storm is coming",
    icon: "storm",
    color: "var(--phase-coming)",
    bg: "var(--phase-coming-bg)",
    ink: "var(--phase-coming-ink)",
  },
  during: {
    title: "During the storm",
    icon: "wind",
    color: "var(--phase-during)",
    bg: "var(--phase-during-bg)",
    ink: "var(--phase-during-ink)",
  },
  after: {
    title: "After the storm",
    icon: "sun",
    color: "var(--phase-after)",
    bg: "var(--phase-after-bg)",
    ink: "var(--phase-after-ink)",
  },
};

type ActionButtonsProps = {
  onPrint: () => void;
  onStartOver: () => void;
};

function ActionButtons({ onPrint, onStartOver }: ActionButtonsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <motion.button
        type="button"
        onClick={onPrint}
        whileTap={{ scale: 0.97 }}
        className="flex min-h-14 items-center gap-2 rounded-xl border-2 border-accent bg-accent px-5 py-3 text-lg font-bold text-accent-ink"
      >
        <Icon name="printer" className="h-6 w-6" />
        Print my plan
      </motion.button>
      <motion.button
        type="button"
        onClick={onStartOver}
        whileTap={{ scale: 0.97 }}
        className="min-h-14 rounded-xl border-2 border-ink bg-white px-5 py-3 text-lg font-bold"
      >
        Start over
      </motion.button>
    </div>
  );
}

export default function PlanView({ profile, plan, onStartOver }: PlanViewProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [includeLinks, setIncludeLinks] = useState(false);
  const [done, setDone] = useState<string[]>([]);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const speechSupported = isSpeechSupported();

  // Move keyboard and screen reader focus to the plan when it appears.
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  useEffect(() => {
    return () => stopSpeaking();
  }, []);

  let totalSteps = 0;
  for (const phase of PHASE_ORDER) {
    totalSteps += plan[phase].length;
  }
  const percent =
    totalSteps === 0 ? 0 : Math.round((done.length / totalSteps) * 100);

  function toggleDone(id: string) {
    if (done.includes(id)) {
      setDone(done.filter((item) => item !== id));
    } else {
      setDone([...done, id]);
    }
  }

  function readAloud(id: string, text: string) {
    if (speakingId === id) {
      stopSpeaking();
      setSpeakingId(null);
      return;
    }
    setSpeakingId(id);
    speak(text, () => setSpeakingId(null));
  }

  return (
    <section>
      <div className="print:hidden">
        <div className="rounded-2xl border-2 border-ink bg-white p-5 shadow-sm">
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="text-3xl font-bold outline-none"
          >
            Your storm plan
          </h1>
          <p className="mt-2 text-lg text-muted">
            Do the steps in order. The printed page has the phone numbers
            written out, so it works without power or internet. This site does
            not ask for names, phone numbers, or medical details.
          </p>

          <div className="mt-4">
            <p className="text-lg font-bold" aria-live="polite">
              {done.length} of {totalSteps} steps done
            </p>
            <div
              className="mt-2 h-3 overflow-hidden rounded-full bg-line"
              role="progressbar"
              aria-label="Steps done"
              aria-valuemin={0}
              aria-valuemax={totalSteps}
              aria-valuenow={done.length}
            >
              <motion.div
                className="h-3 rounded-full bg-accent"
                initial={false}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="mt-1 text-base text-muted">
              Ticks are just for you and are not saved.
            </p>
          </div>

          <label className="mt-4 flex items-center gap-3 text-lg font-bold">
            <input
              type="checkbox"
              className="h-6 w-6 accent-accent"
              checked={includeLinks}
              onChange={(event) => setIncludeLinks(event.target.checked)}
            />
            Include web links on the printed page
          </label>

          <div className="mt-4">
            <ActionButtons
              onPrint={() => window.print()}
              onStartOver={onStartOver}
            />
          </div>
        </div>

        {PHASE_ORDER.map((phase) => {
          const steps = plan[phase];
          if (steps.length === 0) {
            return null;
          }
          const meta = PHASE_META[phase];
          return (
            <section
              key={phase}
              className="mt-8"
              aria-labelledby={`phase-${phase}`}
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2"
                  style={{
                    backgroundColor: meta.bg,
                    color: meta.ink,
                    borderColor: meta.color,
                  }}
                >
                  <Icon name={meta.icon} className="h-6 w-6" />
                </span>
                <h2 id={`phase-${phase}`} className="text-2xl font-bold">
                  {meta.title}
                </h2>
                <span
                  className="rounded-full px-3 py-1 text-base font-bold"
                  style={{ backgroundColor: meta.bg, color: meta.ink }}
                >
                  {steps.length}
                </span>
              </div>

              <ul className="mt-3 space-y-3">
                {steps.map((planModule, index) => {
                  const isDone = done.includes(planModule.id);
                  const textClass = isDone
                    ? "text-lg text-muted line-through"
                    : "text-lg";
                  return (
                    <motion.li
                      key={planModule.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className="rounded-2xl border border-line bg-white p-4 shadow-sm"
                      style={{ borderLeftWidth: 6, borderLeftColor: meta.color }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <label className="flex flex-1 cursor-pointer items-start gap-3">
                          <input
                            type="checkbox"
                            className="mt-1 h-6 w-6 shrink-0 accent-accent"
                            checked={isDone}
                            onChange={() => toggleDone(planModule.id)}
                          />
                          <span className={textClass}>
                            {getText(planModule, profile)}
                          </span>
                        </label>
                        {speechSupported && (
                          <button
                            type="button"
                            onClick={() => readAloud(planModule.id, getText(planModule, profile))}
                            aria-pressed={speakingId === planModule.id}
                            aria-label={speakingId === planModule.id ? "Stop reading this step" : "Read this step aloud"}
                            className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-white"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                          </button>
                        )}
                      </div>
                      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 pl-9">
                        {planModule.links.map((link) => (
                          <li key={link.url}>
                            <a href={link.url} target="_blank" rel="noreferrer" className="text-base font-bold text-accent underline">{link.label}<span className="sr-only"> (opens in a new tab)</span></a>
                          </li>
                        ))}
                      </ul>
                    </motion.li>
                  );
                })}
              </ul>
            </section>
          );
        })}

        <div className="mt-10">
          <ActionButtons
            onPrint={() => window.print()}
            onStartOver={onStartOver}
          />
        </div>
      </div>

      <PrintSheet profile={profile} plan={plan} includeLinks={includeLinks} />
    </section>
  );
}