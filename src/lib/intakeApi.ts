import type { Profile } from "../types";

export type ParsedSituation = {
  relies_on_power: Profile["relies_on_power"];
  needs_help_evacuating: Profile["needs_help_evacuating"];
  transport: Profile["transport"];
  lives_alone: Profile["lives_alone"];
  has_pet_or_service_animal: Profile["has_pet_or_service_animal"];
  home_type: Profile["home_type"];
};

export async function parseSituation(
  text: string,
): Promise<ParsedSituation | null> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch("/api/intake", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
      signal: controller.signal,
    });

    if (!response.ok) {
      return null;
    }
    return (await response.json()) as ParsedSituation;
  } catch {
    return null;
  } finally {
    window.clearTimeout(timer);
  }
}