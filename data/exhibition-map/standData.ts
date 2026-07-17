export type StandCategory =
  | "goff-standard"
  | "goff-premium-1"
  | "goff-premium-2"
  | "goff-premium-3"
  | "goff-small"
  | "marquee-standard"
  | "marquee-premium-1"
  | "marquee-premium-2"
  | "marquee-premium-3"
  | "outdoor";

export type StandShape =
  | "vertical"
  | "horizontal"
  | "corner-left"
  | "corner-right"
  | "square"
  | "large";

export interface StandData {
  stand_no: string;
  category: StandCategory;
  type?: StandShape;
  x: number;
  y: number;
}

export const standData: StandData[] = [
  {
    stand_no: "2",
    category: "goff-standard",
    type: "vertical",
    x: 58.5,
    y: 257,
  },
  {
    stand_no: "3",
    category: "goff-standard",
    type: "vertical",
    x: 58.5,
    y: 220,
  },
  {
    stand_no: "4",
    category: "goff-standard",
    type: "vertical",
    x: 58.5,
    y: 182.5,
  },
  {
    stand_no: "5",
    category: "goff-standard",
    type: "vertical",
    x: 58.5,
    y: 145.5,
  },
  {
    stand_no: "6",
    category: "goff-standard",
    type: "vertical",
    x: 58.5,
    y: 108.5,
  },
  {
    stand_no: "7",
    category: "goff-standard",
    type: "vertical",
    x: 58.5,
    y: 71.5,
  },
  {
    stand_no: "8",
    category: "goff-premium-1",
    x: 163.5,
    y: 21.5,
  },
  {
    stand_no: "9",
    category: "goff-small",
    x: 200,
    y: 75,
  },
  {
    stand_no: "11",
    category: "goff-premium-2",
    x: 114,
    y: 368,
  },
  {
    stand_no: "12",
    category: "goff-standard",
    type: "horizontal",
    x: 164,
    y: 368,
  },
  {
    stand_no: "13",
    category: "goff-standard",
    type: "horizontal",
    x: 201,
    y: 368,
  },
  {
    stand_no: "14",
    category: "goff-standard",
    type: "horizontal",
    x: 238,
    y: 368,
  },
  {
    stand_no: "15",
    category: "goff-standard",
    type: "horizontal",
    x: 306,
    y: 368,
  },
  {
    stand_no: "16",
    category: "goff-standard",
    type: "horizontal",
    x: 343,
    y: 368,
  },
  {
    stand_no: "17",
    category: "goff-premium-3",
    x: 380.5,
    y: 349.5,
  },
  {
    stand_no: "18",
    category: "goff-standard",
    type: "vertical",
    x: 405,
    y: 312.5,
  },
  {
    stand_no: "19",
    category: "goff-standard",
    type: "vertical",
    x: 405,
    y: 254,
  },
  {
    stand_no: "Outdoor-1",
    category: "outdoor",
    x: 270,
    y: 604,
  },
  {
    stand_no: "Outdoor-2",
    category: "outdoor",
    x: 270,
    y: 714,
  },
  {
    stand_no: "Outdoor-3",
    category: "outdoor",
    x: 270,
    y: 823,
  },
  {
    stand_no: "Outdoor-4",
    category: "outdoor",
    x: 270,
    y: 929.5,
  },
  {
    stand_no: "Outdoor-5",
    category: "outdoor",
    x: 270,
    y: 1040,
  },
  {
    stand_no: "Outdoor-6",
    category: "outdoor",
    x: 271,
    y: 1149,
  },
];
