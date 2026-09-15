import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/auth/authSlice";
import bookingReducer from "./features/bookingSlice";
import profileEditReducer from "./features/profile/profileEditSlice";
import notificationReducer from "./features/notification/notificationSlice";
import { baseApi } from "./api/baseApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    booking: bookingReducer,
    profileEdit: profileEditReducer,
    notification: notificationReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "profileEdit/setImage",
          "profileEdit/setPreview",
          "booking/updateTermsAndConditions",
          "booking/restoreBooking",
        ],
        ignoredPaths: [
          "profileEdit.image",
          "booking.termsAndConditions.signatureFile",
        ],
      },
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ── Booking state persistence ────────────────────────────────────────────
// Keep the sessionStorage snapshot of the booking flow ALWAYS in sync with
// the redux state. The snapshot previously only updated on pages that mount
// usePersistBooking (/booking-info, /booking-success), so a stale snapshot
// from an older booking survived while the user was on the map / terms pages
// and later clobbered the fresh booking state when /booking-info mounted.
// Persisting globally (client-only) fixes that at the root.
export const BOOKING_STORAGE_KEY = "bookingState";

let lastSerializedBookingState = "";

if (typeof window !== "undefined") {
  store.subscribe(() => {
    const serialized = JSON.stringify(store.getState().booking);
    if (serialized === lastSerializedBookingState) return;
    lastSerializedBookingState = serialized;
    try {
      sessionStorage.setItem(BOOKING_STORAGE_KEY, serialized);
    } catch {
      // sessionStorage full/unavailable — persistence is best-effort only
    }
  });
}
