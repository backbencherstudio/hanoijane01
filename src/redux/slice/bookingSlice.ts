import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TermsConditions {
  onBehalfOf: string;
  title: string;
  signature: string;
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
    restoreBooking: (state, action: PayloadAction<BookingState>) => {
      return action.payload;
    },
  },
});

export const {
  updateStand,
  updateBookingInfo,
  updateTermsAndConditions,
  resetBookingInfo,
  restoreBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;