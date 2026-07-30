export interface StandPriceProps {
  standPackage: {
    title: string;
    description: string;
    price: number;
    priceLabel: string;
    includes: string[];
  };
}

export interface StandBookedBy {
  name: string;
  email: string;
}

export interface StandApiItem {
  id: string;
  isAvailable: boolean;
  standNumber: string;
  title: string;
  hall: string;
  category: string;
  size: string;
  price: number;
  bookingId: string | null;
  bookedBy: StandBookedBy | null;
}

export interface StandsApiMetaData {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface StandsApiResponse {
  success: boolean;
  message: string;
  data: StandApiItem[];
  metaData: StandsApiMetaData;
}
