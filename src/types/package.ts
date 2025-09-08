import { MediaFile } from "./utils-type";


export interface PackageItem {
  slug: string;
  id: number;
  title: string;
  image: MediaFile;
  cover_image: MediaFile;
  route_map: MediaFile;
  altitude: number;
  grade: string;
  season: string;
  groupSize: string;
  packageDays: number;
  price: number;
  country: string;
  order: number;
  description: string;
  includes: string;
  excludes: string;
  tripNotes: string;
  page_id: number;
  status: number;
  isUpcoming: number;
  isBooking: number;
}


export interface PackagePayload {
  title: string;
  image: MediaFile;
  cover_image: MediaFile;
  route_map: MediaFile;
  altitude: number;
  grade: string;
  season: string;
  groupSize: string;
  packageDays: number;
  price: number;
  country: string;
  order: number;
  description: string;
  includes: string;
  excludes: string;
  tripNotes: string;
  parentPageIds: number[];
  status: number;
  isUpcoming: number;
  isBooking: number;
}