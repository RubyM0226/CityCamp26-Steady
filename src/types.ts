export type Profile = {
  relies_on_power: boolean | null;
  transport: "own_car" | "no_car" | "cannot_drive" | null;
  needs_help_evacuating: boolean | null;
  has_pet_or_service_animal: boolean | null;
  home_type: "house" | "apartment" | "mobile_home" | "other" | null;
  lives_alone: boolean | null;
  language: "en" | "es";
  reading_level: "standard" | "plain";
};

export type Phase = "now" | "coming" | "during" | "after";

export type Condition = {
  field: keyof Profile;
  equals?: string | boolean;
  in?: Array<string | boolean>;
};

export type PlanModule = {
  id: string;
  phase: Phase;
  priority: number;
  applies_when_any: Condition[];
  text: {
    en_standard: string;
    en_plain: string;
  };
  links: { label: string; url: string }[];
  needs_check: boolean;
  verified_on: string | null;
};

export const EMPTY_PROFILE: Profile = {
  relies_on_power: null,
  transport: null,
  needs_help_evacuating: null,
  has_pet_or_service_animal: null,
  home_type: null,
  lives_alone: null,
  language: "en",
  reading_level: "standard",
};