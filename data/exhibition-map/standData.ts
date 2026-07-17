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
  fill: string;
  x: number;
  y: number;
}

export const standData: StandData[] = [
  {
    stand_no: "2",
    category: "goff-standard",
    type: "vertical",
    fill: "#8A9A5B",
    x: 58.5,
    y: 257,
  },
  {
    stand_no: "3",
    category: "goff-standard",
    type: "vertical",
    fill: "#8A9A5B",
    x: 58.5,
    y: 220,
  },
  {
    stand_no: "4",
    category: "goff-standard",
    type: "vertical",
    fill: "#8A9A5B",
    x: 58.5,
    y: 182.5,
  },
  {
    stand_no: "5",
    category: "goff-standard",
    type: "vertical",
    fill: "#8A9A5B",
    x: 58.5,
    y: 145.5,
  },
  {
    stand_no: "6",
    category: "goff-standard",
    type: "vertical",
    fill: "#8A9A5B",
    x: 58.5,
    y: 108.5,
  },
  {
    stand_no: "7",
    category: "goff-standard",
    type: "vertical",
    fill: "#8A9A5B",
    x: 58.5,
    y: 71.5,
  },
  {
    stand_no: "8",
    category: "goff-premium-1",
    fill: "#C49A6C",
    x: 163.5,
    y: 21.5,
  },
  {
    stand_no: "12",
    category: "goff-standard",
    type: "horizontal",
    fill: "#8A9A5B",
    x: 164,
    y: 368,
  },
  {
    stand_no: "13",
    category: "goff-standard",
    type: "horizontal",
    fill: "#8A9A5B",
    x: 201,
    y: 368,
  },
];
