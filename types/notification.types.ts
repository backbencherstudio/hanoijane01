export interface Notification {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  readAt: string | null;
}

export interface NotificationMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
  unreadCount: number;
}

export interface GetNotificationsResponse {
  success: boolean;
  message: string;
  data: Notification[];
  metaData: NotificationMeta;
}

export interface MarkAsReadResponse {
  success: boolean;
  message: string;
}

export interface DeleteNotificationResponse {
  success: boolean;
  message: string;
}