import { restoreBooking } from "@/src/redux/features/bookingSlice";
import { RootState } from "@/src/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const STORAGE_KEY = "bookingState";

export const usePersistBooking = () => {
  const dispatch = useDispatch();
  const bookingState = useSelector((state: RootState) => state.booking);

  // 1) On mount: load from sessionStorage
  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.standId || parsed.stand?.id) {
          dispatch(restoreBooking(parsed));
        }
      } catch (e) {
        console.warn("Failed to restore booking state");
      }
    }
  }, [dispatch]);

  // 2) On every change: save to sessionStorage
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(bookingState));
  }, [bookingState]);

  // 3) Clear storage only on successful booking completion
  const clearBookingState = () => {
    sessionStorage.removeItem(STORAGE_KEY);
  };

  return { clearBookingState };
};
