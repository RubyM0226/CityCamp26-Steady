import { useEffect, useRef, useState } from "react";
import { parseSituation } from "../lib/intakeApi";
import type { ParsedSituation } from "../lib/intakeApi";

type DescribeStepProps = {
  onParsed: (parsed: ParsedSituation) => void;
  onUseQuestions: () => void;
};

const EXAMPLE_TEXT =
  "I live alone in a mobile home. I use an oxygen concentrator that needs electricity, and I do not have a car. I have a small dog.";

export default function DescribeStep({
  onParsed,
  onUseQuestions,
}: DescribeStepProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  async function handleRead() {
    setLoading(true);
    setFailed(false);
    const parsed = await parseSituation(text.trim());
    setLoading(false);
    if (parsed === null) {
      setFailed(true);
      return;
    }
    onParsed(parsed);
  }

  const canRead = text.trim().length > 0 && !loading;

  return (
    <section>
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="text-3xl font-bold outline-none"
      >
        Describe your situation
      </h1>
      <p className="mt-3 text-lg text-muted">
        Write a few sentences in your own words: who lives with you, how you
        get around, and anything you would need help with. Please leave out
        names, addresses, and medical details. This text is sent to the Google
        Gemini service to be read, and we do not save it.
      </p>

      <label htmlFor="situation" className="mt-6 block text-lg font-bold">
        Your situation
      </label>
      <textarea
        id="situation"
        rows={6}
        maxLength={1000}
        value={text}
        onChange={(event) => setText(event.target.value)}
        className="mt-2 w-full rounded-xl border-2 border-ink bg-white p-4 text-xl"
      />

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleRead}
          disabled={!canRead}
          className="min-h-14 rounded-xl border-2 border-accent bg-accent px-5 py-3 text-lg font-bold text-accent-ink disabled:opacity-50"
        >
          Read my situation
        </button>
        <button
          type="button"
          onClick={() => setText(EXAMPLE_TEXT)}
          className="min-h-14 rounded-xl border-2 border-ink bg-white px-5 py-3 text-lg font-bold"
        >
          Use an example
        </button>
      </div>

      <p role="status" className="mt-4 text-lg">
        {loading ? "Reading your description..." : ""}
      </p>
      {failed && (
        <p role="alert" className="mt-2 text-lg font-bold">
          The reading helper is busy or unavailable. Please answer the
          questions instead.
        </p>
      )}

      <button
        type="button"
        onClick={onUseQuestions}
        className="mt-6 text-lg font-bold underline"
      >
        Answer the questions instead
      </button>
    </section>
  );
}