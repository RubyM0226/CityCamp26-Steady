import { useEffect, useRef } from "react";
import QrCode from "./QRCode";
import { SITE_URL } from "../lib/site";

type FlyerScreenProps = {
  onBack: () => void;
};

export default function FlyerScreen({ onBack }: FlyerScreenProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <section>
      <div className="print:hidden">
        <button
          type="button"
          onClick={onBack}
          className="mb-4 text-lg font-bold text-accent underline"
        >
          ← Back to Steady
        </button>
      </div>

      <div className="mx-auto max-w-md rounded-2xl border-2 border-ink bg-white p-8 text-center shadow-sm print:m-0 print:max-w-none print:rounded-none print:border-0 print:p-0 print:shadow-none">
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="text-3xl font-bold outline-none print:text-5xl"
        >
          Steady
        </h1>
        <p className="mt-2 text-lg text-muted print:mt-3 print:text-2xl">
          A storm plan that fits you.
        </p>

        <div className="mt-6 flex justify-center print:mt-8">
          <QrCode value={SITE_URL} size={220} className="rounded-lg border-2 border-line p-3" />
        </div>

        <p className="mt-4 text-base font-bold print:mt-6 print:text-2xl">
          Scan to build your storm plan
        </p>
        <p className="mt-1 break-all text-sm text-muted print:text-lg">
          {SITE_URL}
        </p>

        <p className="mt-6 text-base text-muted print:mt-8 print:text-xl">
          Free, private, and made for Alachua County — including options for
          power-dependent medical equipment, no car, and mobility needs.
        </p>

        <div className="mt-6 print:hidden">
          <button
            type="button"
            onClick={() => window.print()}
            className="min-h-14 rounded-xl border-2 border-accent bg-accent px-6 py-3 text-lg font-bold text-accent-ink"
          >
            Print this flyer
          </button>
        </div>
      </div>
    </section>
  );
}