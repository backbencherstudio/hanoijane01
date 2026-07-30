export interface CreateBookingRequest {
  standId: string;
  userName: string;
  companyName: string;
  companyAddress: string;
  email: string;
  phoneNumber: string;
  termsAndConditionsAccepted: boolean;
  onBehalfOf: string;
  title: string;
  signature: string;
}

export interface CreateBookingResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    userName: string;
    companyName: string;
    companyAddress: string;
    email: string;
    phoneNumber: string;
    termsAndConditionsAccepted: boolean;
    onBehalfOf: string;
    title: string;
    signaturePath: string;
    subTotalAmount: number;
    vatAmount: number;
    vatPercentage: number;
    totalAmount: number;
    paymentStatus: string;
    paymentMethod: string;
    status: number;
  };
}

// ── Get User Bookings ────────────────────────────────────────────────

export type BookingStatus = "PENDING" | "BOOKED" | "CANCELLED" | string;
export type PaymentStatus = "paid" | "unpaid" | string;

export interface UserBooking {
  id: string;
  totalAmount: string;
  paymentStatus: PaymentStatus;
  createdAt: string;
  status: BookingStatus;
  standId: string;
  standNumber: string;
  standTitle: string;
  category: string;
  size: string;
  hall: string;
  exhibitionTitle: string;
  exhibitionLocation: string;
  exhibitionStartedAt: string;
}

export interface BookingMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface GetUserBookingResponse {
  success: boolean;
  message: string;
  data: UserBooking[];
  meta_data: BookingMeta;
}

// ── Booking Stats ────────────────────────────────────────────────────

export interface BookingStats {
  availableStands: number;
  bookedStands: number;
  canceledStands: number;
}

export interface BookingStatsResponse {
  success: boolean;
  message: string;
  data: BookingStats;
}

// ── Admin Bookings ───────────────────────────────────────────────────

export interface AdminBooking {
  id: string;
  standNumber: string;
  standCategory: string;
  hall: string;
  exhibitor: string;
  pricePerDay: number;
  status: "BOOKED" | "PENDING" | "CANCELED" | "REFUNDED" | string;
  paymentStatus: "PAID" | "UNPAID" | "REFUNDED" | "CANCELED" | string;
  bookingDate: string;
}

export interface AdminBookingsResponse {
  success: boolean;
  message: string;
  data: AdminBooking[];
  meta_data: BookingMeta;
}

// ── Admin Single Booking ─────────────────────────────────────────────

export interface AdminBookingDetails {
  id: string;
  status: string;
  bookingType: string;
  standNumber: string;
  hall: string;
  category: string;
  price: number;
  event: string;
  exhibitor: string;
  contactName: string;
  email: string;
  bookingDate: string;
  paymentStatus: string;
  subTotalAmount: number;
  discountAmount: number;
  vatAmount: number;
  vatPercentage: number;
  totalAmount: number;
  termsAndConditionsAccepted: boolean;
  onBehalfOf: string;
  title: string;
  signaturePath: string | null;
}

export interface AdminBookingDetailsResponse {
  success: boolean;
  message: string;
  data: AdminBookingDetails;
}
