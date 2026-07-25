export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  companyName: string;
  companyAddress: string | null;
  companyPhoneNumber: string | null;
  companyBio: string | null;
  websiteLink: string | null;
  avatar: string | null;
  phoneNumber: string;
  billingId: string | null;
  type: "user" | "admin";
  attachments: Attachment[];
}

// Sign Up

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  success: boolean;
  data: {
    token: null;
    user: User;
  };
}

// Sign In

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    token: string;
    user: User;
  };
}

export interface ResendVerificationEmailRequest {
  email: string;
}

export interface VerifyEmailRequest {
  email: string;
  otp: string;
}

// Reset Password

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  password: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
}

export interface GetMeResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface Attachment {
  id: string;
  fileName: string;
  filePath: string;
  fileType: string;
  byteSize: number;
  mimeType: string;
}

export interface UploadAttachmentResponse {
  success: boolean;
  message: string;
  data: Attachment;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}
