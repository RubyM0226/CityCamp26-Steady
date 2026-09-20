export type PrintLine = {
  standard: string;
  plain: string;
};

export const PRINT_LINES: Record<string, PrintLine> = {
  registry: {
    standard:
      "Ask about the county Special Needs Registry (free, voluntary, confidential): 352-264-6500.",
    plain: "Ask to join the county's free help list for storms. Call 352-264-6500.",
  },
  alerts: {
    standard: "Text ALACHUA to 888-777 for county storm alerts.",
    plain: "Text the word ALACHUA to 888-777 to get storm messages.",
  },
  power_backup: {
    standard:
      "Write down what your medical equipment needs and how long its battery lasts.",
    plain: "Write down what your machine needs and how long its battery lasts.",
  },
  zone: {
    standard:
      "Find out if you live in an evacuation zone. If your zone is told to leave, leave early.",
    plain: "Find out if your home is in an evacuation zone. If told to leave, go early.",
  },
  mobile_home: {
    standard:
      "Mobile home: plan to leave when a hurricane is coming. Decide where you will go and how.",
    plain: "Mobile home: plan to leave when a hurricane is coming. Decide where and how.",
  },
  no_car: {
    standard:
      "Arrange your ride now: ask family, friends, or neighbors. Ask the county about the registry.",
    plain: "Plan your ride now. Ask family, friends, or neighbors. Ask the county for help.",
  },
  kit: {
    standard:
      "Supplies for 7 days: 1 gallon of water per person per day, food, can opener, medicines. Refill prescriptions early.",
    plain: "Get supplies for 7 days: water (1 gallon each day), food, can opener, medicines.",
  },
  comm_plan: {
    standard:
      "Fill in the blanks below. Keep copies of ID and insurance papers together.",
    plain: "Fill in the blanks below. Keep copies of your ID and papers together.",
  },
  pets: {
    standard:
      "Pack food and supplies for your pet or service animal. County shelters allow them.",
    plain: "Pack food and supplies for your animal. County shelters allow pets.",
  },
  buddy: {
    standard:
      "Choose one person to check on you before and after the storm. Give them a copy of this page.",
    plain: "Pick one person to check on you. Give them a copy of this page.",
  },
  shelter_info: {
    standard:
      "When a storm is close, call 3-1-1 for open shelters. Shelters change with each storm.",
    plain: "When a storm is close, call 3-1-1 to find open shelters.",
  },
  what_to_bring: {
    standard:
      "Special needs shelter: bring bedding, medicines, special food, spare clothes, personal items, and ID.",
    plain: "Special needs shelter: bring bedding, medicines, food, clothes, and ID.",
  },
  during: {
    standard:
      "Follow officials' orders. Keep your phone charged. Call 911 if someone is in danger.",
    plain: "Do what officials say. Keep your phone charged. Call 911 if someone is in danger.",
  },
  generator: {
    standard:
      "Run generators outside, far from windows and doors. Never inside a home or garage.",
    plain: "Keep generators outside, far from windows and doors. Never inside.",
  },
  after: {
    standard:
      "Keep following county updates. Check on neighbors. Call 3-1-1 with storm questions.",
    plain: "Check county updates. Check on neighbors. Call 3-1-1 with questions.",
  },
};