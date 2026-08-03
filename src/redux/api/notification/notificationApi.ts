import { baseApi } from "../baseApi";
import {
  GetNotificationsResponse,
  MarkAsReadResponse,
  DeleteNotificationResponse,
  AdminSettingResponse,
  UpdateAdminSettingRequest,
} from "@/types/notification.types";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<
      GetNotificationsResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => ({
        url: "/notification",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["Notification"],
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItems) => {
        // For pagination: append new items to existing
        if (newItems.metaData.currentPage === 1) {
          return newItems;
        }
        return {
          ...newItems,
          data: [...currentCache.data, ...newItems.data],
        };
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return (
          currentArg?.page !== previousArg?.page ||
          currentArg?.limit !== previousArg?.limit
        );
      },
    }),
    markNotificationAsRead: builder.mutation<MarkAsReadResponse, string>({
      query: (notificationId) => ({
        url: `/notification/${notificationId}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notification"],
    }),
    markAllNotificationsAsRead: builder.mutation<MarkAsReadResponse, void>({
      query: () => ({
        url: "/notification/read",
        method: "PATCH",
      }),
      invalidatesTags: ["Notification"],
    }),
    deleteNotification: builder.mutation<DeleteNotificationResponse, string>({
      query: (notificationId) => ({
        url: `/notification/${notificationId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notification"],
    }),
    clearAllNotifications: builder.mutation<DeleteNotificationResponse, void>({
      query: () => ({
        url: "/notification",
        method: "DELETE",
      }),
      invalidatesTags: ["Notification"],
    }),
    getAdminSetting: builder.query<AdminSettingResponse, void>({
      query: () => ({
        url: "/admin/setting",
        method: "GET",
      }),
      providesTags: ["Notification"],
    }),
    updateAdminSetting: builder.mutation<
      AdminSettingResponse,
      UpdateAdminSettingRequest
    >({
      query: (body) => ({
        url: "/admin/setting",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useMarkAllNotificationsAsReadMutation,
  useDeleteNotificationMutation,
  useClearAllNotificationsMutation,
  useGetAdminSettingQuery,
  useUpdateAdminSettingMutation,
} = notificationApi;
