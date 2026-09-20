import { PRINT_LINES } from "../content/printLines";
import { getText, PHASE_ORDER } from "../lib/plan";
import type { Phase, PlanModule, Profile } from "../types";

type PrintSheetProps = {
  profile: Profile;
  plan: Record<Phase, PlanModule[]>;
  includeLinks: boolean;
};

const PHASE_TITLES: Record<Phase, string> = {
  now: "Do now",
  coming: "When a storm is coming",
  during: "During the storm",
  after: "After the storm",
};

const KEY_NUMBERS: { label: string; value: string }[] = [
  { label: "Emergency", value: "911" },
  { label: "County storm information line", value: "3-1-1" },
  { label: "Special Needs Registry", value: "352-264-6500" },
  { label: "County alerts", value: "Text ALACHUA to 888-777" },
  { label: "Live updates (needs internet)", value: "AlachuaCountyReady.com" },
];

const BLANKS: string[] = [
  "Who I will call:",
  "Where I will go if I must leave:",
  "Who will check on me:",
  "Medicines, equipment, and papers to bring:",
];

function lineFor(planModule: PlanModule, profile: Profile): string {
  const printLine = PRINT_LINES[planModule.id];
  if (printLine === undefined) {
    return getText(planModule, profile);
  }
  if (profile.reading_level === "plain") {
    return printLine.plain;
  }
  return printLine.standard;
}

export default function PrintSheet({ profile, plan, includeLinks }: PrintSheetProps) {
  const allLinks: { label: string; url: string }[] = [];
  const seen = new Set<string>();
  for (const phase of PHASE_ORDER) {
    for (const planModule of plan[phase]) {
      for (const link of planModule.links) {
        if (!seen.has(link.url)) {
          seen.add(link.url);
          allLinks.push(link);
        }
      }
    }
  }

  return (
    <div className="hidden print:block">
      <h1 className="text-xl font-bold">My storm plan</h1>
      <p className="text-sm">
        Alachua County, Florida. Printed {new Date().toLocaleDateString()} from
        Storm Steps. Not official guidance.
      </p>

      <section className="mt-3 border-2 border-black p-2 print:break-inside-avoid">
        <h2 className="text-lg font-bold">Key numbers</h2>
        <ul className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1">
          {KEY_NUMBERS.map((item) => (
            <li key={item.label}>
              <span className="font-bold">{item.label}:</span> {item.value}
            </li>
          ))}
        </ul>
      </section>

      {PHASE_ORDER.map((phase) => {
        if (plan[phase].length === 0) {
          return null;
        }
        return (
          <section key={phase} className="mt-3 print:break-inside-avoid">
            <h2 className="text-lg font-bold">{PHASE_TITLES[phase]}</h2>
            <ul className="mt-1 space-y-1">
              {plan[phase].map((planModule) => (
                <li key={planModule.id} className="flex gap-2">
                  <span className="mt-1 inline-block h-3 w-3 shrink-0 border-2 border-black" />
                  <span>{lineFor(planModule, profile)}</span>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <section className="mt-3 print:break-inside-avoid">
        <h2 className="text-lg font-bold">Fill in by hand</h2>
        <div className="mt-1 grid grid-cols-2 gap-x-6 gap-y-2">
          {BLANKS.map((blank) => (
            <div key={blank}>
              <p className="font-bold">{blank}</p>
              <div className="mt-5 border-b border-black" />
              <div className="mt-5 border-b border-black" />
            </div>
          ))}
        </div>
      </section>

      {includeLinks && (
        <section className="mt-3 text-sm">
          <h2 className="text-lg font-bold">Web links (need internet)</h2>
          <ul className="mt-1 space-y-1">
            {allLinks.map((link) => (
              <li key={link.url} className="break-all">
                {link.label}: {link.url}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}