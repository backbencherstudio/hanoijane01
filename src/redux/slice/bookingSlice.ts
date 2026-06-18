import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number; // per unit
  selected: boolean;
  quantity: number;
   icon?: string;   // path to icon
  unit?: string;   // e.g., 'piece', 'pcs', 'person'
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
    vatRate: number; // e.g., 0.2 for 20%
  };
  addOns: AddOn[];
}

const initialState: BookingState = {
  stand: {
    id: 'B05',
    name: 'Stand B05',
    type: 'Standard',
    size: '3×3m',
    area: 'Indoor Stand',
    event: 'ITBA EXPO The NEXT 100',
    date: '14-16 March 2027',
    price: 400,
    vatRate: 0.2,
  },
  addOns: [
    {
      id: '1',
      name: 'Standard Exhibition Chair',
      description: 'Dedicated high-speed broadband',
      price: 20,
      selected: false,
      quantity: 1,
    },
    {
      id: '2',
      name: 'Premium Wi-Fi',
      description: 'Dedicated high-speed broadband',
      price: 20,
      selected: false,
      quantity: 1,
    },
    {
      id: '3',
      name: 'Additional 500W Power Socket',
      description: 'Dedicated high-speed broadband',
      price: 20,
      selected: false,
      quantity: 1,
    },
    {
      id: '4',
      name: 'Additional Exhibitor Pass',
      description: 'Dedicated high-speed broadband',
      price: 20,
      selected: false,
      quantity: 1,
    },
    {
      id: '5',
      name: 'Lead Capture Device',
      description: 'Dedicated high-speed broadband',
      price: 20,
      selected: false,
      quantity: 1,
    },
  ],
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    toggleAddOn: (state, action: PayloadAction<string>) => {
      const addOn = state.addOns.find((a) => a.id === action.payload);
      if (addOn) {
        addOn.selected = !addOn.selected;
        // if unselected, reset quantity to 1 (optional)
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
    // Optionally update stand info from BookingInfoForm later
    updateStand: (state, action: PayloadAction<Partial<BookingState['stand']>>) => {
      state.stand = { ...state.stand, ...action.payload };
    },
    // For future API – replace all add‑ons
    setAddOns: (state, action: PayloadAction<AddOn[]>) => {
      state.addOns = action.payload;
    },
  },
});

export const {
  toggleAddOn,
  incrementQuantity,
  decrementQuantity,
  updateStand,
  setAddOns,
} = bookingSlice.actions;

export default bookingSlice.reducer;