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
  metaData: UserListMetaData;
}

export interface GetUserListQueryParams {
  search?: string;
  type?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export interface CreateAdminRequest {
  name: string;
  email: string;
  password: string;
  type: "admin";
  status: "ACTIVE";
}

export interface CreateAdminResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    type: string;
    status: string;
    createdAt: string;
  };
}

export interface GetUserByIdResponse {
  success: boolean;
  message: string;
  data: UserListItem;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  password?: string;
  type?: "admin" | "user";
  status?: "ACTIVE" | "INACTIVE" | "BANNED";
}

export interface UpdateUserResponse {
  success: boolean;
  message: string;
  data: UserListItem;
}

export interface DeleteUserResponse {
  success: boolean;
  message: string;
}
