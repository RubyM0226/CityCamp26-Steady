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
  { label: "Storm info (in Gainesville)", value: "3-1-1" },
  { label: "Special Needs Registry", value: "352-264-6500" },
  { label: "County alerts: text ALACHUA to", value: "888-777" },
];

const BLANKS: string[] = [
  "Who I will call:",
  "Where I will go if I must leave:",
  "Who will check on me:",
  "Medicines, equipment, and papers to bring:",
];

type PackItem = {
  text: string;
  show: (profile: Profile) => boolean;
};

// Unanswered or "not sure" still shows the item, so nothing important is missed.
function notNo(value: boolean | null): boolean {
  return value !== false;
}

function needsSpecial(profile: Profile): boolean {
  return notNo(profile.relies_on_power) || notNo(profile.needs_help_evacuating);
}

const PACK_ITEMS: PackItem[] = [
  { text: "Water: 1 gallon per person per day", show: () => true },
  { text: "Non-perishable food and a can opener", show: () => true },
  { text: "Medicines and copies of prescriptions", show: () => true },
  { text: "Flashlight and extra batteries", show: () => true },
  { text: "Phone, chargers, and a backup battery", show: () => true },
  { text: "Battery or hand-crank radio", show: () => true },
  { text: "First aid kit", show: () => true },
  { text: "Copies of ID and insurance in a waterproof bag", show: () => true },
  { text: "Cash", show: () => true },
  { text: "Blankets or sleeping bags", show: () => true },
  { text: "Extra clothes and sturdy shoes", show: () => true },
  { text: "Soap, toothbrush, and hygiene items", show: () => true },
  {
    text: "30-day supply of medicines (special needs shelter)",
    show: needsSpecial,
  },
  {
    text: "Doctor's contact information and insurance cards",
    show: needsSpecial,
  },
  {
    text: "Special-diet food that does not need a fridge",
    show: needsSpecial,
  },
  {
    text: "Medical equipment and supplies for two weeks (such as oxygen)",
    show: (profile) => notNo(profile.relies_on_power),
  },
  {
    text: "Backup power for essential medical equipment",
    show: (profile) => notNo(profile.relies_on_power),
  },
  {
    text: "Pet food, water, leash, carrier, and vaccination records",
    show: (profile) => notNo(profile.has_pet_or_service_animal),
  },
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

export default function PrintSheet({
  profile,
  plan,
  includeLinks,
}: PrintSheetProps) {
  const packItems = PACK_ITEMS.filter((item) => item.show(profile));

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
      <header className="flex items-end justify-between border-b-8 border-black pb-2">
        <h1 className="text-4xl font-bold tracking-tight">My storm plan</h1>
        <p className="text-right text-sm">
          Alachua County, Florida
          <br />
          Printed {new Date().toLocaleDateString()}
        </p>
      </header>

      <section className="mt-3 border-4 border-black p-3 print:break-inside-avoid">
        <h2 className="text-sm font-bold uppercase tracking-wide">
          Key numbers
        </h2>
        <ul className="mt-1 grid grid-cols-2 gap-x-6 gap-y-2">
          {KEY_NUMBERS.map((item) => (
            <li key={item.label}>
              <p className="text-sm">{item.label}</p>
              <p className="text-2xl font-bold">{item.value}</p>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-sm">
          Live updates (needs internet): AlachuaCountyReady.com
        </p>
      </section>

      {PHASE_ORDER.map((phase) => {
        if (plan[phase].length === 0) {
          return null;
        }
        return (
          <section key={phase} className="mt-4">
            <h2 className="border-b-4 border-black pb-1 text-xl font-bold">
              {PHASE_TITLES[phase]}
            </h2>
            <ul className="mt-2 columns-2 gap-6">
              {plan[phase].map((planModule) => (
                <li
                  key={planModule.id}
                  className="mb-2 flex gap-2 break-inside-avoid"
                >
                  <span className="mt-1 inline-block h-4 w-4 shrink-0 border-2 border-black" />
                  <span>{lineFor(planModule, profile)}</span>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <section className="mt-4 print:break-inside-avoid">
        <h2 className="border-b-4 border-black pb-1 text-xl font-bold">
          Pack list (if you leave home)
        </h2>
        <ul className="mt-2 columns-2 gap-6">
          {packItems.map((item) => (
            <li key={item.text} className="mb-1 flex gap-2 break-inside-avoid">
              <span className="mt-1 inline-block h-4 w-4 shrink-0 border-2 border-black" />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-4 print:break-inside-avoid">
        <h2 className="border-b-4 border-black pb-1 text-xl font-bold">
          Fill in by hand
        </h2>
        <div className="mt-2 grid grid-cols-2 gap-3">
          {BLANKS.map((blank) => (
            <div key={blank} className="h-24 border-2 border-black p-2">
              <p className="text-sm font-bold">{blank}</p>
            </div>
          ))}
        </div>
      </section>

      {includeLinks && (
        <section className="mt-4 text-sm">
          <h2 className="border-b-4 border-black pb-1 text-xl font-bold">
            Web links (need internet)
          </h2>
          <ul className="mt-2 space-y-1">
            {allLinks.map((link) => (
              <li key={link.url} className="break-all">
                {link.label}: {link.url}
              </li>
            ))}
          </ul>
        </section>
      )}

      <footer className="mt-4 border-t-2 border-black pt-2 text-xs">
        Not official guidance. Call 911 in an emergency. Made with Steady at CityCamp Gainesville 2026.
      </footer>
    </div>
  );
}