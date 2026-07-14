export interface ProfileFormData {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  contactPhone: string;
  companyPhone: string;
  website: string;
  password: string;
  bio: string;
}

export type DocumentStatus = "uploaded" | "missing";

export interface VerificationDocument {
  id: string;
  title: string;
  fileName?: string;
  fileSize?: string;
  fileType: "png" | "jpg" | "pdf";
  status: DocumentStatus;
}

export interface NewDocumentType {
  id: string;
  name: string;
}