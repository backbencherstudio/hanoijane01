import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Notification } from "@/types/notification.types";

interface NotificationState {
  // This slice is only for socket real-time updates
  // RTK Query handles the API calls (fetch, mark as read, delete)
  socketNotifications: Notification[];
  unreadCount: number;
}

const initialState: NotificationState = {
  socketNotifications: [],
  unreadCount: 0,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    // Add notification from socket (real-time)
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.socketNotifications.unshift(action.payload);
      if (!action.payload.readAt) {
        state.unreadCount += 1;
      }
    },
    // Reset socket notifications
    resetNotifications: (state) => {
      state.socketNotifications = [];
      state.unreadCount = 0;
    },
  },
});

export const { addNotification, resetNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;