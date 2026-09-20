import type { PlanModule } from "../types";

const VERIFIED = "2026-09-20";

export const modules: PlanModule[] = [
  {
    id: "registry",
    phase: "now",
    priority: 1,
    applies_when_any: [
      { field: "relies_on_power", equals: true },
      { field: "needs_help_evacuating", equals: true },
    ],
    text: {
      en_standard:
        "Ask about Alachua County's Special Needs Registry. It is free, voluntary, and confidential. It lets the county arrange transportation and shelter for residents with physical or mental limitations who have no other way to evacuate. The county decides who qualifies. You can register online, or call 352-264-6500 if you cannot use the online form.",
      en_plain:
        "The county keeps a free, private list of people who need help in a storm. If you are on it, the county can arrange a ride and a shelter for you. The county decides who can join. You can sign up online. If you cannot use the website, call 352-264-6500.",
    },
    links: [
      {
        label: "Special Needs Registry (Alachua County)",
        url: "https://alachuacounty.us/Depts/EM/Pages/special-needs-registry.aspx",
      },
      {
        label: "Formulario en español (Spanish form, PDF)",
        url: "https://alachuacounty.us/Depts/EM/Documents/ADACompliant/SPNS%20Form%20Spanish.pdf",
      },
    ],
    needs_check: false,
    verified_on: VERIFIED,
  },
  {
    id: "alerts",
    phase: "now",
    priority: 2,
    applies_when_any: [],
    text: {
      en_standard:
        "Sign up for county alerts. Text ALACHUA to 888-777 for real-time updates during a large emergency, and bookmark AlachuaCountyReady.com.",
      en_plain:
        "Get storm messages on your phone. Text the word ALACHUA to 888-777. Also save AlachuaCountyReady.com.",
    },
    links: [
      { label: "Alachua County Ready", url: "https://alachuacountyready.com" },
      {
        label: "Alert Alachua signup",
        url: "https://member.everbridge.net/index/453003085613764#/signup",
      },
      {
        label: "County disaster preparedness",
        url: "https://alachuacounty.us/Depts/EM/Pages/preparedness.aspx",
      },
    ],
    needs_check: false,
    verified_on: VERIFIED,
  },
  {
    id: "power_backup",
    phase: "now",
    priority: 3,
    applies_when_any: [{ field: "relies_on_power", equals: true }],
    text: {
      en_standard:
        "If you rely on electricity for medical equipment, write down what it needs and how long it runs on battery, and tell the county through the registry. County special needs shelters have generators to power vital medical equipment.",
      en_plain:
        "If a machine you need runs on electricity, write down what it needs and how long its battery lasts. County special needs shelters have generators for medical equipment.",
    },
    links: [
      {
        label: "County emergency shelters guide (PDF)",
        url: "https://alachuacounty.us/Depts/EO/Documents/ADACompliant/Emergency%20Shelters.pdf",
      },
    ],
    needs_check: false,
    verified_on: VERIFIED,
  },
  {
    id: "zone",
    phase: "now",
    priority: 4,
    applies_when_any: [],
    text: {
      en_standard:
        "Find out whether you live in an evacuation zone or a flood-prone area. If evacuation is ordered for your zone, plan to leave before the storm arrives.",
      en_plain:
        "Find out if your home is in an evacuation zone. If officials tell your zone to leave, go early.",
    },
    links: [
      { label: "Know your zone", url: "https://floridadisaster.org/knowyourzone" },
      {
        label: "Florida Public Hurricane Education Network",
        url: "https://floridastorms.org/plan-and-prepare/",
      },
    ],
    needs_check: false,
    verified_on: VERIFIED,
  },
  {
    id: "mobile_home",
    phase: "now",
    priority: 5,
    applies_when_any: [{ field: "home_type", equals: "mobile_home" }],
    text: {
      en_standard:
        "Mobile homes are among the places most likely to be evacuated in a hurricane. Follow evacuation orders, and decide now where you would go and how you would get there.",
      en_plain:
        "Mobile homes are often told to leave in a hurricane. Follow evacuation orders. Decide now where you will go and how you will get there.",
    },
    links: [
      {
        label: "Florida Public Hurricane Education Network",
        url: "https://floridastorms.org/plan-and-prepare/",
      },
      { label: "Know your zone", url: "https://floridadisaster.org/knowyourzone" },
    ],
    needs_check: false,
    verified_on: VERIFIED,
  },
  {
    id: "no_car",
    phase: "now",
    priority: 6,
    applies_when_any: [{ field: "transport", in: ["no_car", "cannot_drive"] }],
    text: {
      en_standard:
        "Arrange your ride before you need it. Ask family, friends, or neighbors now. If you may qualify, ask the county about the Special Needs Registry, which can arrange transportation. When a storm is near, check the county's live updates for ride programs, because offers change with each storm.",
      en_plain:
        "Plan your ride before a storm comes. Ask family, friends, or neighbors now. The county's special needs list can arrange rides for people who qualify. When a storm is close, check the county's live updates for ride offers, because they change with each storm.",
    },
    links: [
      {
        label: "Special Needs Registry (Alachua County)",
        url: "https://alachuacounty.us/Depts/EM/Pages/special-needs-registry.aspx",
      },
      { label: "Alachua County Ready", url: "https://alachuacountyready.com" },
    ],
    needs_check: false,
    verified_on: VERIFIED,
  },
  {
    id: "kit",
    phase: "now",
    priority: 7,
    applies_when_any: [],
    text: {
      en_standard:
        "Build a kit that can last at least seven days: one gallon of water per person per day, non-perishable food and a can opener, and any prescription medicines and medical supplies you use. Keep copies of important papers, such as ID and insurance, in a waterproof container. Power outages are common in hurricanes.",
      en_plain:
        "Get supplies for 7 days: 1 gallon of water per person each day, food that does not need a fridge, a can opener, and your medicines. Keep copies of your ID and insurance papers in a waterproof bag. Power outages are common in hurricanes.",
    },
    links: [
      {
        label: "Florida Department of Health: preparedness",
        url: "https://www.floridahealth.gov/individual-family-health/preparedness/",
      },
      {
        label: "Disaster supply kit checklist (Florida Disaster)",
        url: "https://www.floridadisaster.org/planprepare/hurricane-supply-checklist/",
      },
    ],
    needs_check: false,
    verified_on: VERIFIED,
  },
  {
    id: "comm_plan",
    phase: "now",
    priority: 8,
    applies_when_any: [],
    text: {
      en_standard:
        "Write down who to call and where to meet if you are separated, and keep copies of important papers such as IDs and insurance together. The printed page from this tool has blanks for you to fill in by hand.",
      en_plain:
        "Write down phone numbers and a place to meet. Copy your important papers and keep them together. Use the printed page and fill it in by hand.",
    },
    links: [
      { label: "Ready.gov family plan form", url: "https://www.ready.gov/plan-form" },
    ],
    needs_check: false,
    verified_on: VERIFIED,
  },
  {
    id: "pets",
    phase: "now",
    priority: 9,
    applies_when_any: [{ field: "has_pet_or_service_animal", equals: true }],
    text: {
      en_standard:
        "Plan for your animals. Service animals are allowed at emergency shelters, and the county's emergency management director has said its shelters are pet-friendly. Pack food and supplies for your pet or service animal.",
      en_plain:
        "Plan for your animal. Service animals are allowed at shelters, and the county says its shelters allow pets. Pack food and supplies for them too.",
    },
    links: [
      { label: "RTS: ADA emergency services", url: "https://go-rts.com/ada-emergency-services/" },
      {
        label: "County Emergency Management on WCJB",
        url: "https://www.wcjb.com/2026/05/31/alachua-county-provides-resources-residents-with-special-needs-preparing-hurricane-season/",
      },
    ],
    needs_check: false,
    verified_on: VERIFIED,
  },
  {
    id: "buddy",
    phase: "now",
    priority: 10,
    applies_when_any: [{ field: "lives_alone", equals: true }],
    text: {
      en_standard:
        "Choose one person who will check on you before and after a storm, and share this plan with them. If you can, check on neighbors who might need help too.",
      en_plain:
        "Pick one person who will call or visit you before and after a storm. Give them a copy of this plan.",
    },
    links: [
      {
        label: "Florida Department of Health: preparedness",
        url: "https://www.floridahealth.gov/individual-family-health/preparedness/",
      },
    ],
    needs_check: false,
    verified_on: VERIFIED,
  },
  {
    id: "shelter_info",
    phase: "coming",
    priority: 1,
    applies_when_any: [],
    text: {
      en_standard:
        "When a storm is close, check AlachuaCountyReady.com for open shelters. In Gainesville you can also call 3-1-1 for shelter information. Shelters open depending on the storm, so use live information and not an older list.",
      en_plain:
        "When a storm is close, check AlachuaCountyReady.com to find open shelters. In Gainesville you can also call 3-1-1. Shelters change with each storm.",
    },
    links: [
      { label: "Alachua County Ready", url: "https://alachuacountyready.com" },
      { label: "RTS: ADA emergency services", url: "https://go-rts.com/ada-emergency-services/" },
    ],
    needs_check: false,
    verified_on: VERIFIED,
  },
  {
    id: "what_to_bring",
    phase: "coming",
    priority: 2,
    applies_when_any: [
      { field: "relies_on_power", equals: true },
      { field: "needs_help_evacuating", equals: true },
    ],
    text: {
      en_standard:
        "If you go to a special needs shelter, bring your emergency kit plus a 30-day supply of your medicines with copies of your prescriptions, medical equipment and supplies for two weeks, backup power for essential equipment, your provider's contact information and insurance cards, photo ID and important papers, and non-perishable special-diet food.",
      en_plain:
        "If you go to a special needs shelter, bring: your emergency kit, 30 days of medicines and copies of your prescriptions, your medical equipment and supplies, backup power for your equipment, doctor and insurance information, photo ID, and food for your special diet.",
    },
    links: [
      {
        label: "What to take to a shelter (Florida Disaster)",
        url: "https://www.floridadisaster.org/planprepare/disability/evacuations-and-shelters/shelter-information/what-to-take/",
      },
    ],
    needs_check: false,
    verified_on: VERIFIED,
  },
  {
    id: "during",
    phase: "during",
    priority: 1,
    applies_when_any: [],
    text: {
      en_standard:
        "Follow the orders of local officials, keep your phone charged, and stay tuned to county alerts. Call 911 for life-threatening emergencies.",
      en_plain:
        "Do what officials tell you to do. Keep your phone charged. Call 911 if someone is in danger.",
    },
    links: [
      {
        label: "Florida Public Hurricane Education Network",
        url: "https://floridastorms.org/plan-and-prepare/",
      },
    ],
    needs_check: false,
    verified_on: VERIFIED,
  },
  {
    id: "generator",
    phase: "during",
    priority: 2,
    applies_when_any: [{ field: "relies_on_power", equals: true }],
    text: {
      en_standard:
        "If you use a generator, run it outdoors, far from windows, doors, and vents. Never run one in a garage or basement. Turn it off and let it cool for at least 20 minutes before refueling.",
      en_plain:
        "If you use a generator, keep it outside, far from windows and doors. Never run it in a garage or basement. Turn it off and let it cool before you add fuel.",
    },
    links: [
      {
        label: "Generator safety (Florida Disaster)",
        url: "https://www.floridadisaster.org/planprepare/generator-safety/",
      },
    ],
    needs_check: false,
    verified_on: VERIFIED,
  },
  {
    id: "after",
    phase: "after",
    priority: 1,
    applies_when_any: [],
    text: {
      en_standard:
        "After the storm, keep following county updates and check on your neighbors. Call 911 for emergencies.",
      en_plain:
        "After the storm, keep checking county updates and check on your neighbors. Call 911 in an emergency.",
    },
    links: [{ label: "Alachua County Ready", url: "https://alachuacountyready.com" }],
    needs_check: false,
    verified_on: VERIFIED,
  },
    {
    id: "shelter_bring",
    phase: "coming",
    priority: 1.5,
    applies_when_any: [],
    text: {
      en_standard:
        "If you go to a shelter, bring your emergency kit: water, non-perishable food and a can opener, your medicines, a flashlight, phone chargers, copies of important papers, and blankets or sleeping bags.",
      en_plain:
        "If you go to a shelter, bring your emergency kit: water, food, your medicines, a flashlight, phone chargers, your papers, and blankets.",
    },
    links: [
      {
        label: "What to take to a shelter (Florida Disaster)",
        url: "https://www.floridadisaster.org/planprepare/disability/evacuations-and-shelters/shelter-information/what-to-take/",
      },
      {
        label: "Florida Department of Health: preparedness",
        url: "https://www.floridahealth.gov/individual-family-health/preparedness/",
      },
    ],
    needs_check: false,
    verified_on: "2026-09-20",
  },
];