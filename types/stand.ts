import { StandData, StandCategory } from "@/data/exhibition-map/standData";

// ── Merged stand used in the interactive SVG map ─────────────────────
export interface Stand extends StandData {
  stand_no: string;
  category: StandCategory;
  standType: string;
  size: string;
  price: number;
  isAvailable: boolean;
  title: string;
  categorySlug: string;
  exhibitor: string | null;
}

// ── API response shape for a single stand ────────────────────────────
export interface ApiStand {
  id: string;
  title: string;
  standNumber: string;
  isAvailable: boolean;
  size: string;
  price: number;
  vatPercentage: number;
  totalPrice: number;
  categoryTitle: string;
  categorySlug: string;
}

// ── API response types for halls (used by StandCategoryAccordion) ────

export interface HallStand {
  id: string;
  standNumber: string;
  title: string;
}

export interface HallStandCategory {
  title: string;
  slug: string;
  size: string;
  price: number;
  vatPercentage: number;
  totalPrice: number;
  stands: HallStand[];
  totalStands: number;
}

export interface Hall {
  title: string;
  standCategories: HallStandCategory[];
  totalStands: number;
}