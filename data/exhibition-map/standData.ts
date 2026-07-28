export type StandCategory =
  | "goff-standard"
  | "goff-premium-1"
  | "goff-premium-2"
  | "goff-premium-3"
  | "goff-small"
  | "marquee-standard"
  | "marquee-premium-a"
  | "marquee-premium-b"
  | "marquee-premium-c"
  | "marquee-premium-d"
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
  /** API categorySlug for matching live data */
  categorySlug: string;
  type?: StandShape;
  x: number;
  y: number;
}

export const standData: StandData[] = [
  // ── Goffs Complex ─────────────────────────────────────────────────────
  // Goffs Complex — Standard Size (goffs-complex-standard-size)
  { stand_no: "2",  category: "goff-standard",     categorySlug: "goffs-complex-standard-size",     type: "vertical",   x: 58.5,  y: 257 },
  { stand_no: "3",  category: "goff-standard",     categorySlug: "goffs-complex-standard-size",     type: "vertical",   x: 58.5,  y: 220 },
  { stand_no: "4",  category: "goff-standard",     categorySlug: "goffs-complex-standard-size",     type: "vertical",   x: 58.5,  y: 182.5 },
  { stand_no: "5",  category: "goff-standard",     categorySlug: "goffs-complex-standard-size",     type: "vertical",   x: 58.5,  y: 145.5 },
  { stand_no: "6",  category: "goff-standard",     categorySlug: "goffs-complex-standard-size",     type: "vertical",   x: 58.5,  y: 108.5 },
  { stand_no: "7",  category: "goff-standard",     categorySlug: "goffs-complex-standard-size",     type: "vertical",   x: 58.5,  y: 71.5 },

  // Premium Size (6m x 2m, rectangle)  — goffs-complex-premium-6x2
  { stand_no: "8",  category: "goff-premium-1",    categorySlug: "goffs-complex-premium-6x2",       x: 163.5, y: 21.5 },

  // Small Size  — goffs-complex-small-size
  { stand_no: "9",  category: "goff-small",        categorySlug: "goffs-complex-small-size",        x: 200,   y: 75 },

  // Premium Size (4m x 2m, rectangle)  — goffs-complex-premium-4x2
  { stand_no: "11", category: "goff-premium-2",    categorySlug: "goffs-complex-premium-4x2",       x: 114,   y: 368 },

  // Standard Size (horizontal)
  { stand_no: "12", category: "goff-standard",     categorySlug: "goffs-complex-standard-size",     type: "horizontal", x: 164,   y: 368 },
  { stand_no: "13", category: "goff-standard",     categorySlug: "goffs-complex-standard-size",     type: "horizontal", x: 201,   y: 368 },
  { stand_no: "14", category: "goff-standard",     categorySlug: "goffs-complex-standard-size",     type: "horizontal", x: 238,   y: 368 },
  { stand_no: "15", category: "goff-standard",     categorySlug: "goffs-complex-standard-size",     type: "horizontal", x: 306,   y: 368 },
  { stand_no: "16", category: "goff-standard",     categorySlug: "goffs-complex-standard-size",     type: "horizontal", x: 343,   y: 368 },

  // Premium Size (4m x 3.5m, corner)  — goffs-complex-premium-4x3.5
  { stand_no: "17", category: "goff-premium-3",    categorySlug: "goffs-complex-premium-4x3.5",     x: 380.5, y: 349.5 },

  // Standard Size (vertical)
  { stand_no: "18", category: "goff-standard",     categorySlug: "goffs-complex-standard-size",     type: "vertical",   x: 405,   y: 312.5 },
  { stand_no: "19", category: "goff-standard",     categorySlug: "goffs-complex-standard-size",     type: "vertical",   x: 405,   y: 254 },

  // ── Marquee ──────────────────────────────────────────────────────────
  // Standard Size  — marquee-standard-size
  { stand_no: "M1",  category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 629.5, y: 240.5 },

  // Premium Size (3m x 3m, corner)  — marquee-premium-3x3
  { stand_no: "M2",  category: "marquee-premium-a", categorySlug: "marquee-premium-3x3",    x: 629.5, y: 201 },

  // Standard Size (vertical right column)
  { stand_no: "M3",  category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 758,   y: 232 },
  { stand_no: "M4",  category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 758,   y: 271 },
  { stand_no: "M5",  category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 758,   y: 310 },
  { stand_no: "M6",  category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 758,   y: 350 },
  { stand_no: "M7",  category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 758,   y: 389 },
  { stand_no: "M8",  category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 758,   y: 427.5 },
  { stand_no: "M9",  category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 758,   y: 466 },
  { stand_no: "M10", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 758,   y: 505 },
  { stand_no: "M11", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 758,   y: 543 },
  { stand_no: "M12", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 758,   y: 582 },
  { stand_no: "M13", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 758,   y: 620.5 },
  { stand_no: "M14", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 758,   y: 659.5 },
  { stand_no: "M15", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 758,   y: 723.5 },
  { stand_no: "M16", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 758,   y: 762 },
  { stand_no: "M17", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 758,   y: 800.5 },
  { stand_no: "M18", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 758,   y: 839 },
  { stand_no: "M19", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 758,   y: 878 },
  { stand_no: "M20", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 758,   y: 916.5 },
  { stand_no: "M21", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 758,   y: 955 },
  { stand_no: "M22", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 758,   y: 993.5 },
  { stand_no: "M23", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 758,   y: 1032 },
  { stand_no: "M24", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 758,   y: 1070.5 },
  { stand_no: "M25", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 758,   y: 1109 },
  { stand_no: "M26", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 758,   y: 1148 },

  // Premium Size (4m x 3m, corner)  — marquee-premium-4x3
  { stand_no: "M27", category: "marquee-premium-d", categorySlug: "marquee-premium-4x3",   type: "corner-right", x: 745,   y: 1186 },

  // Standard Size (horizontal bottom area)
  { stand_no: "M28", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "horizontal", x: 687.5, y: 1173.5 },
  { stand_no: "M29", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "horizontal", x: 687.5, y: 1147.5 },
  { stand_no: "M30", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "horizontal", x: 687.5, y: 1096 },
  { stand_no: "M31", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "horizontal", x: 687.5, y: 1070.5 },
  { stand_no: "M32", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "horizontal", x: 687.5, y: 1019 },
  { stand_no: "M33", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "horizontal", x: 687.5, y: 993 },
  { stand_no: "M34", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "horizontal", x: 687.5, y: 942 },
  { stand_no: "M35", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "horizontal", x: 687.5, y: 916 },
  { stand_no: "M36", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "horizontal", x: 687.5, y: 865 },
  { stand_no: "M37", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "horizontal", x: 687.5, y: 839 },
  { stand_no: "M38", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "horizontal", x: 687.5, y: 787.5 },
  { stand_no: "M39", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "horizontal", x: 687.5, y: 762 },
  { stand_no: "M40", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "horizontal", x: 687.5, y: 704.5 },
  { stand_no: "M41", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "horizontal", x: 687.5, y: 679 },
  { stand_no: "M42", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "horizontal", x: 687.5, y: 626 },
  { stand_no: "M43", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "horizontal", x: 687.5, y: 600 },
  { stand_no: "M44", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "horizontal", x: 687.5, y: 549 },
  { stand_no: "M45", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "horizontal", x: 687.5, y: 523 },
  { stand_no: "M46", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "horizontal", x: 687.5, y: 470.5 },
  { stand_no: "M47", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "horizontal", x: 687.5, y: 445 },
  { stand_no: "M48", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "horizontal", x: 687.5, y: 393.5 },
  { stand_no: "M49", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "horizontal", x: 687.5, y: 367.5 },

  // Premium Size (3m x 4m, square)  — marquee-premium-3x4
  { stand_no: "M50", category: "marquee-premium-b", categorySlug: "marquee-premium-3x4",    x: 687.5, y: 276.5 },

  // Premium Size (5m x 2m, rectangle)  — marquee-premium-5x2
  { stand_no: "M51", category: "marquee-premium-c", categorySlug: "marquee-premium-5x2",    x: 627,   y: 320 },

  // Standard Size (vertical left inner column)
  { stand_no: "M52", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 627,   y: 389 },
  { stand_no: "M53", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 627,   y: 427.5 },
  { stand_no: "M54", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 627,   y: 466 },
  { stand_no: "M55", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 627,   y: 505 },
  { stand_no: "M56", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 627,   y: 543 },
  { stand_no: "M57", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 627,   y: 582 },
  { stand_no: "M58", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 627,   y: 620.5 },
  { stand_no: "M59", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 627,   y: 659.5 },

  // Standard Size (vertical left outer column)
  { stand_no: "M60", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 629.5, y: 724 },
  { stand_no: "M61", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 629.5, y: 762.5 },
  { stand_no: "M62", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 629.5, y: 801 },
  { stand_no: "M63", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 629.5, y: 839.5 },
  { stand_no: "M64", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 629.5, y: 878 },
  { stand_no: "M65", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 629.5, y: 916.5 },
  { stand_no: "M66", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 629.5, y: 955 },
  { stand_no: "M67", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 629.5, y: 993.5 },
  { stand_no: "M68", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 629.5, y: 1032 },
  { stand_no: "M69", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 629.5, y: 1070.5 },
  { stand_no: "M70", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 629.5, y: 1109 },
  { stand_no: "M71", category: "marquee-standard",  categorySlug: "marquee-standard-size",  type: "vertical",   x: 629.5, y: 1148 },

  // Premium Size (4m x 3m, corner)  — marquee-premium-4x3
  { stand_no: "M72", category: "marquee-premium-d", categorySlug: "marquee-premium-4x3",   type: "corner-left", x: 629.5, y: 1185.5 },

  // ── Outdoor ──────────────────────────────────────────────────────────
  { stand_no: "O1", category: "outdoor", categorySlug: "outdoor-standard-size", x: 270, y: 604 },
  { stand_no: "O2", category: "outdoor", categorySlug: "outdoor-standard-size", x: 270, y: 714 },
  { stand_no: "O3", category: "outdoor", categorySlug: "outdoor-standard-size", x: 270, y: 823 },
  { stand_no: "O4", category: "outdoor", categorySlug: "outdoor-standard-size", x: 270, y: 929.5 },
  { stand_no: "O5", category: "outdoor", categorySlug: "outdoor-standard-size", x: 270, y: 1040 },
  { stand_no: "O6", category: "outdoor", categorySlug: "outdoor-standard-size", x: 271, y: 1149 },
];