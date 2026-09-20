import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { QUESTIONS } from "../content/questions";
import type { Question } from "../content/questions";
import type { Profile } from "../types";

type IntakeProps = {
  profile: Profile;
  onChange: (profile: Profile) => void;
  onDone: () => void;
};

type QuestionScreenProps = {
  question: Question;
  profile: Profile;
  answered: boolean;
  step: number;
  total: number;
  onChoose: (value: string | boolean | null) => void;
  onBack: () => void;
};

function QuestionScreen({
  question,
  profile,
  answered,
  step,
  total,
  onChoose,
  onBack,
}: QuestionScreenProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Move keyboard and screen reader focus to the new question.
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const promptText =
    profile.reading_level === "plain"
      ? question.text.en_plain
      : question.text.en_standard;
  const currentValue = profile[question.field];

  return (
    <div>
      <p className="text-lg text-muted">
        Question {step + 1} of {total}
      </p>
      <div className="mt-2 h-2 rounded-full bg-line" aria-hidden="true">
        <div
          className="h-2 rounded-full bg-accent"
          style={{ width: `${((step + 1) / total) * 100}%` }}
        />
      </div>

      <h1
        ref={headingRef}
        tabIndex={-1}
        id="question-heading"
        className="mt-6 text-3xl font-bold outline-none"
      >
        {promptText}
      </h1>

      <div
        role="group"
        aria-labelledby="question-heading"
        className="mt-6 flex flex-col gap-3"
      >
        {question.options.map((option) => {
          const selected = answered && currentValue === option.value;
          const colors = selected
            ? "border-accent bg-accent text-accent-ink"
            : "border-ink bg-white text-ink";
          return (
            <button
              key={option.label}
              type="button"
              aria-pressed={selected}
              onClick={() => onChoose(option.value)}
              className={`min-h-16 rounded-xl border-2 px-5 py-3 text-left text-xl font-bold ${colors}`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {step > 0 && (
        <button
          type="button"
          onClick={onBack}
          className="mt-6 text-lg font-bold underline"
        >
          Back
        </button>
      )}
    </div>
  );
}

export default function Intake({ profile, onChange, onDone }: IntakeProps) {
  const [step, setStep] = useState(0);
  const [answered, setAnswered] = useState<string[]>([]);

  const question = QUESTIONS[step];
  const isLast = step === QUESTIONS.length - 1;

  function choose(value: string | boolean | null) {
    // The cast is needed because the field name is chosen at run time.
    onChange({ ...profile, [question.field]: value } as Profile);
    setAnswered([...answered, question.field]);
    if (isLast) {
      onDone();
    } else {
      setStep(step + 1);
    }
  }

  function goBack() {
    setStep(step - 1);
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -24 }}
        transition={{ duration: 0.2 }}
      >
        <QuestionScreen
          question={question}
          profile={profile}
          answered={answered.includes(question.field)}
          step={step}
          total={QUESTIONS.length}
          onChoose={choose}
          onBack={goBack}
        />
      </motion.div>
    </AnimatePresence>
  );
}