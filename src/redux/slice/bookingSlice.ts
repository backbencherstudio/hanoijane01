import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  icon?: string;
  unit?: string;
}

export interface SelectedAddOn extends AddOn {
  selected: boolean;
  quantity: number;
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
  addOns: SelectedAddOn[];
  bookingInfo: {
    companyName: string;
    contactName: string;
    email: string;
    phoneNumber: string;
    companyAddress: string;
    companyLicense?: File | null; // optional, not stored in Redux for serialization
  };
}

const initialState: BookingState = {
  stand: {
    id: "B05",
    name: "Stand B05",
    type: "Standard",
    size: "3×3m",
    area: "Indoor Stand",
    event: "ITBA EXPO The NEXT 100",
    date: "14-16 March 2027",
    price: 400,
    vatRate: 0.2,
  },
  addOns: [],
  bookingInfo: {
    companyName: "",
    contactName: "",
    email: "",
    phoneNumber: "",
    companyAddress: "",
  },
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setAddOns: (state, action: PayloadAction<AddOn[]>) => {
      state.addOns = action.payload.map((addOn) => ({
        ...addOn,
        selected: false,
        quantity: 1,
      }));
    },
    toggleAddOn: (state, action: PayloadAction<string>) => {
      const addOn = state.addOns.find((a) => a.id === action.payload);
      if (addOn) {
        addOn.selected = !addOn.selected;
        if (!addOn.selected) addOn.quantity = 1;
      }
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const addOn = state.addOns.find((a) => a.id === action.payload);
      if (addOn && addOn.selected) addOn.quantity += 1;
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const addOn = state.addOns.find((a) => a.id === action.payload);
      if (addOn && addOn.selected && addOn.quantity > 1) {
        addOn.quantity -= 1;
      }
    },
    updateStand: (
      state,
      action: PayloadAction<Partial<BookingState["stand"]>>,
    ) => {
      state.stand = { ...state.stand, ...action.payload };
    },
    resetAddOns: (state) => {
      state.addOns = state.addOns.map((a) => ({
        ...a,
        selected: false,
        quantity: 1,
      }));
    },
    updateBookingInfo: (
      state,
      action: PayloadAction<Partial<BookingState["bookingInfo"]>>,
    ) => {
      state.bookingInfo = { ...state.bookingInfo, ...action.payload };
    },
    resetBookingInfo: (state) => {
      state.bookingInfo = initialState.bookingInfo;
    },
  },
});

// Selectors
export const selectSubtotal = (state: { booking: BookingState }) => {
  const standPrice = state.booking.stand.price;
  const addOnsTotal = state.booking.addOns
    .filter((a) => a.selected)
    .reduce((sum, a) => sum + a.price * a.quantity, 0);
  return standPrice + addOnsTotal;
};

export const selectVat = (state: { booking: BookingState }) => {
  const subtotal = selectSubtotal(state);
  return subtotal * state.booking.stand.vatRate;
};

export const selectTotal = (state: { booking: BookingState }) => {
  return selectSubtotal(state) + selectVat(state);
};

export const selectSelectedAddOns = (state: { booking: BookingState }) => {
  return state.booking.addOns.filter((a) => a.selected);
};

export const {
  setAddOns,
  toggleAddOn,
  incrementQuantity,
  decrementQuantity,
  updateStand,
  resetAddOns,
  updateBookingInfo,
  resetBookingInfo,
} = bookingSlice.actions;

export default bookingSlice.reducer;
