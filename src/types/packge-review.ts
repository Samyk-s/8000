
import { PackageItem } from "./package";
import { MediaFile } from "./utils-type";

export interface ReviewItem {
  id: number;
  package: PackageItem;
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

export interface ReviewPayloads {
  fullName: string;
  email: string;
  country: string;
  rating: number;
  image: MediaFile;
  shortTitle: string;
  review: string;
}
