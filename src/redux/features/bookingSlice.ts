import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TermsConditions {
  onBehalfOf: string;
  title: string;
  /** base64 data URL — used for preview only */
  signature: string;
  /** raw binary file used for the actual upload (not serializable) */
  signatureFile: File | null;
  accepted: boolean;
}

interface BookingState {
  stand: {
    id: string;
    name: string;
    type: string;
    size: string;
    area: string;
    event: string;
    date: string;
    price: number;
    vatRate: number;
  };
  standId: string;
  bookingId: string;
  bookingInfo: {
    companyName: string;
    contactName: string;
    email: string;
    phoneNumber: string;
    companyAddress: string;
  };
  termsAndConditions: TermsConditions;
}

const initialState: BookingState = {
  stand: {
    id: "",
    name: "",
    type: "",
    size: "",
    area: "",
    event: "",
    date: "",
    price: 0,
    vatRate: 0.2,
  },
  standId: "",
  bookingId: "",
  bookingInfo: {
    companyName: "",
    contactName: "",
    email: "",
    phoneNumber: "",
    companyAddress: "",
  },
  termsAndConditions: {
    onBehalfOf: "",
    title: "",
    signature: "",
    signatureFile: null,
    accepted: false,
  },
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    updateStand: (
      state,
      action: PayloadAction<Partial<BookingState["stand"]>>,
    ) => {
      state.stand = { ...state.stand, ...action.payload };
      // Selecting a stand starts a NEW booking — any previous bookingId is
      // stale and must not leak into the new flow (e.g. paying the wrong
      // booking via /booking-info?step=2).
      state.bookingId = "";
    },
    updateStandId: (state, action: PayloadAction<string>) => {
      state.standId = action.payload;
      // Selecting a stand starts a NEW booking — clear the previous bookingId
      // so stale state never carries over into the new flow.
      state.bookingId = "";
    },
    updateBookingId: (state, action: PayloadAction<string>) => {
      state.bookingId = action.payload;
    },
    updateBookingInfo: (
      state,
      action: PayloadAction<Partial<BookingState["bookingInfo"]>>,
    ) => {
      state.bookingInfo = { ...state.bookingInfo, ...action.payload };
    },
    updateTermsAndConditions: (
      state,
      action: PayloadAction<Partial<TermsConditions>>,
    ) => {
      state.termsAndConditions = {
        ...state.termsAndConditions,
        ...action.payload,
      };
    },
    resetBookingInfo: (state) => {
      state.bookingInfo = initialState.bookingInfo;
    },
    /** Full reset — used after a booking is completed so the next booking
     * starts from a clean state (no stale standId/bookingId/signature). */
    resetBooking: () => initialState,
    restoreBooking: (state, action: PayloadAction<BookingState>) => {
      return action.payload;
    },
  },
});

export const {
  updateStand,
  updateStandId,
  updateBookingId,
  updateBookingInfo,
  updateTermsAndConditions,
  resetBookingInfo,
  resetBooking,
  restoreBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;