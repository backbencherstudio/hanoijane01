"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAppDispatch } from "@/src/redux/hooks";
import { addNotification } from "@/src/redux/features/notification/notificationSlice";
import { getAccessToken } from "@/lib/cookies";
import { baseApi } from "@/src/redux/api/baseApi";
import type { Notification as NotificationType } from "@/types/notification.types";

// Derive socket URL: use NEXT_PUBLIC_SOCKET_URL if set, otherwise strip "/api" from API URL
// The "/api" suffix is for REST API only; socket.io connects to root namespace "/"
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || API_URL.replace(/\/api$/, "");
const SOCKET_PATH = process.env.NEXT_PUBLIC_SOCKET_PATH || "/socket.io";

// Common event names the backend might use for notifications
const NOTIFICATION_EVENTS = [
  "notification",
  "newNotification",
  "new-notification",
  "notification:created",
];

export const useSocketNotification = () => {
  const dispatch = useAppDispatch();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;

    try {
      // Create socket connection with auth - matching backend expectations
      // Socket.IO auth middleware typically reads the raw token (no "Bearer " prefix)
      const socket: Socket = io(SOCKET_URL, {
        path: SOCKET_PATH,
        auth: {
          token, // Raw token - most common Socket.IO auth pattern
        },
        transports: ["websocket", "polling"], // Fallback to polling if websocket fails
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5,
        autoConnect: true,
      });

      // Debug: Log ALL incoming events to identify the correct event name
      socket.onAny((eventName, ...args) => {
        console.log("📡 Socket event received:", eventName, args);
      });

      // Connection handlers
      socket.on("connect", () => {
        console.log("✅ Connected to Notification Socket:", socket.id);
        setIsConnected(true);

        // Many backends require the client to join a room after connecting
        // Try common join patterns - the backend will ignore unknown events
        socket.emit("join", { token: `Bearer ${token}` });
        socket.emit("subscribe", "notifications");
      });

      socket.on("connect_error", (error) => {
        // Socket.IO attach error includes details in `description` and `context`
        const socketError = error as Error & {
          description?: string;
          context?: unknown;
        };
        console.error("❌ Socket Connection Error:", socketError.message, {
          url: SOCKET_URL,
          path: SOCKET_PATH,
          description: socketError.description,
          context: socketError.context,
        });
        setIsConnected(false);
      });

      // Handler for incoming notifications
      const handleNotification = (newNotification: unknown) => {
        console.log("🔔 New Notification Received:", newNotification);

        // Handle notification that might be wrapped in a "data" property
        const payload = newNotification as { data?: NotificationType } & NotificationType;
        const notification: NotificationType = payload?.data ?? payload;

        // Add notification to Redux store
        // This pushes to socketNotifications array and increments unreadCount
        dispatch(addNotification(notification));

        // Invalidate the Notification tag to trigger a refetch
        // This keeps the RTK Query cache in sync with the socket data
        dispatch(baseApi.util.invalidateTags(["Notification"]));
      };

      // Listen for new notifications on multiple possible event names
      NOTIFICATION_EVENTS.forEach((eventName) => {
        socket.on(eventName, handleNotification);
      });

      // Error handlers
      socket.on("error", (err) => {
        console.error("❌ Socket Auth Error:", err, {
          stringified: JSON.stringify(err),
          message: (err as Error)?.message,
        });
        setIsConnected(false);
      });

      socket.on("disconnect", (reason) => {
        console.log("🔌 Disconnected from Notification Socket:", reason);
        setIsConnected(false);
      });

      // Cleanup on unmount
      return () => {
        socket.disconnect();
      };
    } catch (error) {
      console.error("Failed to initialize socket:", error);
    }
  }, [dispatch]);

  return { isConnected };
};