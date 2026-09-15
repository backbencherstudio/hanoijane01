import { restoreBooking } from "@/src/redux/features/bookingSlice";
import {
  BOOKING_STORAGE_KEY,
  RootState,
} from "@/src/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const usePersistBooking = () => {
  const dispatch = useDispatch();
  const bookingState = useSelector((state: RootState) => state.booking);

  // 1) On mount: restore an in-progress booking from sessionStorage — but
  // ONLY when the in-memory state is still pristine (no stand selected, no
  // booking created, terms not accepted yet). That is the case after a real
  // page refresh / first load, which is exactly when restoring is wanted.
  //
  // During client-side navigation (map → terms → booking-info) the redux
  // state is already live, so restoring the snapshot here would clobber the
  // fresh booking state with stale data from an earlier/abandoned booking.
  // The pristine guard prevents that.
  useEffect(() => {
    const isPristine =
      !bookingState.standId && !bookingState.bookingId;
    if (!isPristine) return;

    const saved = sessionStorage.getItem(BOOKING_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.standId || parsed.stand?.id) {
          dispatch(restoreBooking(parsed));
        }
      } catch {
        console.warn("Failed to restore booking state");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2) Saving is handled by the global store subscriber (see store.ts), so
  // the sessionStorage snapshot stays current on EVERY page — including the
  // exhibition map and terms pages where this hook is not mounted. Do not
  // write the snapshot here; that reintroduced stale-snapshot races before.

  // 3) Clear storage only on successful booking completion
  const clearBookingState = () => {
    sessionStorage.removeItem(BOOKING_STORAGE_KEY);
  };

  return { clearBookingState };
};
