import { ProfileFormData, VerificationDocument } from "@/types/profile";

export const profileData: ProfileFormData = {
  firstName: "Jacob",
  lastName: "Jones",
  companyName: "The Walt Disney Company",
  email: "jacob@gmail.com",
  contactPhone: "+353 (0)45 888883",
  companyPhone: "+353 (0)45 888883",
  website: "https://",
  password: "12345678",
  bio: "",
};

export const verificationDocuments: VerificationDocument[] = [
  {
    id: "1",
    title: "Company logo",
    fileName: "company-logo.png",
    fileSize: "900 KB",
    fileType: "png",
    status: "uploaded",
  },
  {
    id: "2",
    title: "Company bio",
    fileName: "company-licence.pdf",
    fileSize: "850 KB",
    fileType: "pdf",
    status: "uploaded",
  },
  {
    id: "3",
    title: "Insurance/ licence certificate",
    fileName: "company-insurance.png",
    fileSize: "700 KB",
    fileType: "png",
    status: "uploaded",
  },
  {
    id: "4",
    title: "Health & Safety declaration",
    status: "missing",
    fileType: "pdf",
  },
];