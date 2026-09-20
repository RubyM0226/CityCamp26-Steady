import type { Profile } from "../types";

export type Option = {
  label: string;
  value: string | boolean | null;
};

export type Question = {
  field: keyof Profile;
  text: { en_standard: string; en_plain: string };
  options: Option[];
};

export const QUESTIONS: Question[] = [
  {
    field: "relies_on_power",
    text: {
      en_standard:
        "Does anyone in your home rely on electricity for a medical device, such as oxygen equipment or a power wheelchair?",
      en_plain: "Does someone at home need electricity for a medical machine?",
    },
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false },
      { label: "Not sure", value: null },
    ],
  },
  {
    field: "needs_help_evacuating",
    text: {
      en_standard:
        "If you had to leave your home, would you need help getting out or getting to a safe place?",
      en_plain: "If you had to leave, would you need help to get out?",
    },
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false },
      { label: "Not sure", value: null },
    ],
  },
  {
    field: "transport",
    text: {
      en_standard: "How would you get around if you had to evacuate?",
      en_plain: "How would you travel if you had to leave?",
    },
    options: [
      { label: "I have a car and can drive", value: "own_car" },
      { label: "I do not have a car", value: "no_car" },
      { label: "I have a car but cannot drive", value: "cannot_drive" },
      { label: "Not sure", value: null },
    ],
  },
  {
    field: "lives_alone",
    text: {
      en_standard: "Do you live alone?",
      en_plain: "Do you live by yourself?",
    },
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false },
      { label: "Not sure", value: null },
    ],
  },
  {
    field: "has_pet_or_service_animal",
    text: {
      en_standard: "Do you have a pet or a service animal?",
      en_plain: "Do you have a pet or a service animal?",
    },
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false },
      { label: "Not sure", value: null },
    ],
  },
  {
    field: "home_type",
    text: {
      en_standard: "What kind of home do you live in?",
      en_plain: "What kind of home do you live in?",
    },
    options: [
      { label: "House", value: "house" },
      { label: "Apartment", value: "apartment" },
      { label: "Mobile home", value: "mobile_home" },
      { label: "Something else", value: "other" },
      { label: "Not sure", value: null },
    ],
  },
];