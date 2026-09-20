import type { Settings, TextSize } from "../lib/settings";

type SettingsPanelProps = {
  settings: Settings;
  plainLanguage: boolean;
  onSettingsChange: (settings: Settings) => void;
  onPlainLanguageChange: (plain: boolean) => void;
  onReadPage: () => void;
  isReadingPage: boolean;
  speechSupported: boolean;
};

const SIZE_OPTIONS: { value: TextSize; label: string }[] = [
  { value: "normal", label: "Normal" },
  { value: "large", label: "Large" },
  { value: "xlarge", label: "Extra large" },
];

function Controls({
  settings,
  plainLanguage,
  onSettingsChange,
  onPlainLanguageChange,
  onReadPage,
  isReadingPage,
  speechSupported,
}: SettingsPanelProps) {
  return (
    <div className="space-y-5">
      <fieldset>
        <legend className="text-lg font-bold">Text size</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {SIZE_OPTIONS.map((option) => {
            const selected = settings.textSize === option.value;
            const colors = selected
              ? "border-accent bg-accent text-accent-ink"
              : "border-ink bg-white text-ink";
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={selected}
                onClick={() =>
                  onSettingsChange({ ...settings, textSize: option.value })
                }
                className={`min-h-12 rounded-lg border-2 px-4 py-2 text-lg font-bold ${colors}`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <label className="flex items-center gap-3 text-lg font-bold">
        <input
          type="checkbox"
          className="h-6 w-6 accent-accent"
          checked={settings.contrast === "high"}
          onChange={(event) =>
            onSettingsChange({
              ...settings,
              contrast: event.target.checked ? "high" : "standard",
            })
          }
        />
        High contrast
      </label>

      <label className="flex items-center gap-3 text-lg font-bold">
        <input
          type="checkbox"
          className="h-6 w-6 accent-accent"
          checked={settings.reduceMotion}
          onChange={(event) =>
            onSettingsChange({
              ...settings,
              reduceMotion: event.target.checked,
            })
          }
        />
        Reduce motion
      </label>

      <label className="flex items-center gap-3 text-lg font-bold">
        <input
          type="checkbox"
          className="h-6 w-6 accent-accent"
          checked={plainLanguage}
          onChange={(event) => onPlainLanguageChange(event.target.checked)}
        />
        Plain language
      </label>

      {speechSupported && (
        <fieldset>
          <legend className="text-lg font-bold">Audio</legend>
          <button
            type="button"
            onClick={onReadPage}
            aria-pressed={isReadingPage}
            className="mt-2 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-ink bg-white px-4 py-2 text-lg font-bold"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
            {isReadingPage ? "Stop reading" : "Read this page aloud"}
          </button>
          <p className="mt-1 text-base text-muted">
            Reads the current page out loud.
          </p>
        </fieldset>
      )}
    </div>
  );
}

export default function SettingsPanel(props: SettingsPanelProps) {
  return (
    <>
      <details className="rounded-xl border-2 border-ink bg-white p-4 lg:hidden">
        <summary className="cursor-pointer text-xl font-bold">
          Display settings
        </summary>
        <div className="mt-4">
          <Controls {...props} />
        </div>
      </details>

      <div className="hidden rounded-2xl border-2 border-ink bg-white p-5 shadow-sm lg:block">
        <h2 className="text-xl font-bold">Display settings</h2>
        <p className="mt-1 text-base text-muted">
          Change how this page looks. These stay in view while you use the
          site.
        </p>
        <div className="mt-4">
          <Controls {...props} />
        </div>
      </div>
    </>
  );
}