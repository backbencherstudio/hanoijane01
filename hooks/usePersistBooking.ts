import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import { restoreBooking } from "@/src/redux/slice/bookingSlice";

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
        // Only restore if it has some data (not empty)
        if (parsed.bookingInfo?.companyName || parsed.addOns?.length) {
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

  // 3) On unmount (leaving page): clear storage and reset state
  useEffect(() => {
    return () => {
      sessionStorage.removeItem(STORAGE_KEY);
      // Optionally, you can also reset redux, but we'll rely on the slice's reset actions
    };
  }, []);
};
