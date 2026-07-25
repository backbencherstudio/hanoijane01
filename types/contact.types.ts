interface DataResponse {
  id: string;
  name: string;
  companyName: string;
  email: string;
  phoneNumber: string;
  message: string;
  userId: string | null;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  data: DataResponse;
}

export interface ContactRequest {
  name: string;
  companyName: string;
  email: string;
  phoneNumber: string;
  message: string;
}
