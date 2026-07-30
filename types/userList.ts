export interface UserListItem {
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  companyAddress: string | null;
  type: string;
  status: number;
  avatar: string | null;
  approvedAt: string | null;
  createdAt: string;
  updatedAt: string;
  statusText: string;
  avatar_url: string | null;
}

export interface UserListMetaData {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface GetUserListResponse {
  success: boolean;
  message: string;
  data: UserListItem[];
  meta_data: UserListMetaData;
}

export interface GetUserListQueryParams {
  search?: string;
  type?: string;
  status?: string;
  page?: number;
  limit?: number;
}