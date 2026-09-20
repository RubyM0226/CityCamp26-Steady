import type { PlanModule } from "../types";

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
        "Ask about Alachua County's Special Needs Registry. It is free, voluntary, and confidential, and it lets the county arrange transportation and shelter for residents with physical or mental limitations who have no other way to evacuate. The county decides who qualifies. You can sign up at any time, and if you cannot use the online form, call 352-264-6500.",
      en_plain:
        "The county keeps a free, private list of people who need help in a storm. If you are on it, the county can arrange a ride and a shelter for you. The county decides who can join. You can sign up any time. If you cannot use the website, call 352-264-6500.",
    },
    links: [
      {
        label: "Special Needs Registry (Alachua County)",
        url: "https://alachuacounty.us/Depts/EM/Pages/special-needs-registry.aspx",
      },
    ],
    needs_check: false,
    verified_on: null,
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
        label: "County preparedness reminders",
        url: "https://alachuacounty.us/news/Article/Pages/Hurricane-Preparedness-Reminders.aspx",
      },
    ],
    needs_check: false,
    verified_on: null,
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
    verified_on: null,
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
    verified_on: null,
  },
  {
    id: "mobile_home",
    phase: "now",
    priority: 5,
    applies_when_any: [{ field: "home_type", equals: "mobile_home" }],
    text: {
      en_standard:
        "State guidance says people who live in a mobile home should plan to evacuate when a hurricane is coming, so decide now where you would go and how you would get there.",
      en_plain:
        "State guidance says to leave a mobile home when a hurricane is coming. Decide now where you will go and how you will get there.",
    },
    links: [
      {
        label: "Florida Public Hurricane Education Network",
        url: "https://floridastorms.org/plan-and-prepare/",
      },
    ],
    needs_check: false,
    verified_on: null,
  },
  {
    id: "no_car",
    phase: "now",
    priority: 6,
    applies_when_any: [{ field: "transport", in: ["no_car", "cannot_drive"] }],
    text: {
      en_standard:
        "Arrange your ride before you need it. Ask family, friends, or neighbors now. If you may qualify, ask the county about the Special Needs Registry, which can arrange transportation. When a storm is near, check the county's live channels for ride programs: during Hurricane Milton in 2024 the county offered free rides to shelters, but offers change with each storm.",
      en_plain:
        "Plan your ride before a storm comes. Ask family, friends, or neighbors now. The county's special needs list can arrange rides for people who qualify. When a storm is close, check the county's live updates for ride offers, because they change with each storm.",
    },
    links: [
      {
        label: "Special Needs Registry (Alachua County)",
        url: "https://alachuacounty.us/Depts/EM/Pages/special-needs-registry.aspx",
      },
      {
        label: "Hurricane Milton shelter and ride information",
        url: "https://cammack.house.gov/hurricane-preparedness/general-preparation-recovery-information",
      },
    ],
    needs_check: true,
    verified_on: null,
  },
  {
    id: "kit",
    phase: "now",
    priority: 7,
    applies_when_any: [],
    text: {
      en_standard:
        "Build a kit that can last at least seven days: about a gallon of water per person per day, non-perishable food and a can opener, and any medical supplies you use. Refill essential prescriptions early and expect that power could be out for days.",
      en_plain:
        "Get supplies for 7 days: 1 gallon of water per person each day, food that does not need a fridge, a can opener, and your medical supplies. Refill your medicines early. Power may be out for days.",
    },
    links: [
      {
        label: "Florida Department of Health: preparedness",
        url: "https://www.floridahealth.gov/individual-family-health/preparedness/",
      },
      {
        label: "Alachua County storm checklist (news)",
        url: "https://alachuachronicle.com/hurricane-milton-update-1-sandbags-and-special-needs-registry/",
      },
    ],
    needs_check: false,
    verified_on: null,
  },
  {
    id: "comm_plan",
    phase: "now",
    priority: 8,
    applies_when_any: [],
    text: {
      en_standard:
        "Write down who to call and where to meet if you are separated, and make copies of important papers such as IDs and insurance and keep them together. The printed page from this tool has blanks for you to fill in by hand.",
      en_plain:
        "Write down phone numbers and a place to meet. Copy your important papers and keep them together. Use the printed page and fill it in by hand.",
    },
    links: [
      { label: "Ready.gov family plan form", url: "https://www.ready.gov/plan-form" },
    ],
    needs_check: false,
    verified_on: null,
  },
  {
    id: "pets",
    phase: "now",
    priority: 9,
    applies_when_any: [{ field: "has_pet_or_service_animal", equals: true }],
    text: {
      en_standard:
        "Plan for your animals. Alachua County shelters are pet-friendly and service animals are allowed, so stock what your pet or service animal needs and bring it with you.",
      en_plain:
        "Plan for your animal. County shelters allow pets and service animals. Pack food and supplies for them too.",
    },
    links: [
      {
        label: "County Emergency Management on WCJB",
        url: "https://www.wcjb.com/2026/05/31/alachua-county-provides-resources-residents-with-special-needs-preparing-hurricane-season/",
      },
      { label: "RTS: ADA emergency services", url: "https://go-rts.com/ada-emergency-services/" },
    ],
    needs_check: false,
    verified_on: null,
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
        label: "County storm preparation reminders",
        url: "https://alachuachronicle.com/hurricane-milton-update-1-sandbags-and-special-needs-registry/",
      },
    ],
    needs_check: false,
    verified_on: null,
  },
  {
    id: "shelter_info",
    phase: "coming",
    priority: 1,
    applies_when_any: [],
    text: {
      en_standard:
        "When a storm is coming, call 3-1-1 for shelter information and check AlachuaCountyReady.com. Shelters open depending on the storm, so use the live information and not an older list.",
      en_plain:
        "When a storm is close, call 3-1-1 to find open shelters. Check AlachuaCountyReady.com. Shelters change with each storm.",
    },
    links: [
      { label: "RTS: ADA emergency services", url: "https://go-rts.com/ada-emergency-services/" },
      { label: "Alachua County Ready", url: "https://alachuacountyready.com" },
    ],
    needs_check: false,
    verified_on: null,
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
        "If you go to a special needs shelter, bring your own bedding, prescription medications, any special-diet food, spare clothes, personal care items, and ID.",
      en_plain:
        "If you go to a special needs shelter, bring your bedding, your medicines, special food, spare clothes, personal care items, and ID.",
    },
    links: [
      {
        label: "What to take to a shelter (Florida Disaster)",
        url: "https://www.floridadisaster.org/planprepare/disability/evacuations-and-shelters/shelter-information/what-to-take/",
      },
    ],
    needs_check: true,
    verified_on: null,
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
    verified_on: null,
  },
  {
    id: "generator",
    phase: "during",
    priority: 2,
    applies_when_any: [{ field: "relies_on_power", equals: true }],
    text: {
      en_standard:
        "If you use a generator, run it outside and well away from windows, doors, and vents. Never run one inside a home or garage.",
      en_plain:
        "If you use a generator, keep it outside, far from windows and doors. Never run it inside your home or garage.",
    },
    links: [
      {
        label: "Generator safety (Florida Disaster)",
        url: "https://www.floridadisaster.org/planprepare/generator-safety/",
      },
    ],
    needs_check: true,
    verified_on: null,
  },
  {
    id: "after",
    phase: "after",
    priority: 1,
    applies_when_any: [],
    text: {
      en_standard:
        "After the storm, keep following county updates, check on your neighbors, and call 3-1-1 with storm-related questions when the line is active. Call 911 for emergencies.",
      en_plain:
        "After the storm, keep checking county updates and check on your neighbors. Call 3-1-1 with questions when the line is open. Call 911 in an emergency.",
    },
    links: [
      { label: "Alachua County Ready", url: "https://alachuacountyready.com" },
    ],
    needs_check: false,
    verified_on: null,
  },
];