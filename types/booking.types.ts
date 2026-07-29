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
