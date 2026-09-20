import type { Settings, TextSize } from "../lib/settings";

type SettingsPanelProps = {
  settings: Settings;
  plainLanguage: boolean;
  onSettingsChange: (settings: Settings) => void;
  onPlainLanguageChange: (plain: boolean) => void;
};

const SIZE_OPTIONS: { value: TextSize; label: string }[] = [
  { value: "normal", label: "Normal" },
  { value: "large", label: "Large" },
  { value: "xlarge", label: "Extra large" },
];

export default function SettingsPanel({
  settings,
  plainLanguage,
  onSettingsChange,
  onPlainLanguageChange,
}: SettingsPanelProps) {
  return (
    <details className="rounded-xl border-2 border-ink bg-white p-4 print:hidden">
      <summary className="cursor-pointer text-xl font-bold">
        Display settings
      </summary>

      <div className="mt-4 space-y-5">
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
      </div>
    </details>
  );
}