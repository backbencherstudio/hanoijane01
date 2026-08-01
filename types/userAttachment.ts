export interface UserAttachment {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  avatar: string;
  attachments: Attachment[];
}

export interface Attachment {
  id: string;
  fileName: string;
  filePath: string;
  fileUrl: string;
  fileType: string | null;
  mimeType: string;
  byteSize: number;
  createdAt: string;
}

export interface GetUserAttachmentsResponse {
  success: boolean;
  message: string;
  data: UserAttachment[];
  metaData: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}