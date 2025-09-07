export interface InquiryItem {
  id: number;
  package: any | null; // Replace `any` with the specific type if you know the package structure
  type: string;
  country: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}
