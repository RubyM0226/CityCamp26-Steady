import { useEffect, useRef } from "react";
import { QUESTIONS } from "../content/questions";
import type { Profile } from "../types";

type ConfirmScreenProps = {
  profile: Profile;
  onChange: (profile: Profile) => void;
  onConfirm: () => void;
  onBack: () => void;
};

export default function ConfirmScreen({
  profile,
  onChange,
  onConfirm,
  onBack,
}: ConfirmScreenProps) {
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
        Here is what we understood
      </h1>
      <p className="mt-3 text-lg text-muted">
        Please check each answer and change anything that is wrong. Not sure
        is fine.
      </p>

      <div className="mt-6 space-y-6">
        {QUESTIONS.map((question) => {
          const promptText =
            profile.reading_level === "plain"
              ? question.text.en_plain
              : question.text.en_standard;
          const currentValue = profile[question.field];

          return (
            <fieldset key={question.field}>
              <legend className="text-xl font-bold">{promptText}</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {question.options.map((option) => {
                  const selected = currentValue === option.value;
                  const colors = selected
                    ? "border-accent bg-accent text-accent-ink"
                    : "border-ink bg-white text-ink";
                  return (
                    <button
                      key={option.label}
                      type="button"
                      aria-pressed={selected}
                      onClick={() =>
                        onChange({
                          ...profile,
                          [question.field]: option.value,
                        } as Profile)
                      }
                      className={`min-h-12 rounded-lg border-2 px-4 py-2 text-lg font-bold ${colors}`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onConfirm}
          className="min-h-14 rounded-xl border-2 border-accent bg-accent px-5 py-3 text-lg font-bold text-accent-ink"
        >
          Looks right, show my plan
        </button>
        <button
          type="button"
          onClick={onBack}
          className="min-h-14 rounded-xl border-2 border-ink bg-white px-5 py-3 text-lg font-bold"
        >
          Back
        </button>
      </div>
    </section>
  );
}