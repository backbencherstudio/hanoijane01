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
  fill: string;
  x: number;
  y: number;
}

export const standData: StandData[] = [
  {
    stand_no: "2",
    category: "goff-standard",
    fill: "#8A9A5B",
    x: 58.5,
    y: 257,
  },
  {
    stand_no: "3",
    category: "goff-standard",
    fill: "#8A9A5B",
    x: 58.5,
    y: 220,
  },
  {
    stand_no: "4",
    category: "goff-standard",
    fill: "#8A9A5B",
    x: 58.5,
    y: 182.5,
  },
  {
    stand_no: "5",
    category: "goff-standard",
    fill: "#8A9A5B",
    x: 58.5,
    y: 145.5,
  },
    {
    stand_no: "6",
    category: "goff-standard",
    fill: "#8A9A5B",
    x: 58.5,
    y: 108.5,
  },
  {
    stand_no: "7",
    category: "goff-standard",
    fill: "#8A9A5B",
    x: 58.5,
    y: 71.5,
  },
];
