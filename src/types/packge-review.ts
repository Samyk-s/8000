import { Package } from "./package";

export interface ReviewItem {
  id: number;
  package: Package;
  fullName: string;
  email: string;
  country: string;
  rating: number;
  shortTitle: string;
  review: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}
