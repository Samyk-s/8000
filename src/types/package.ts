import { MediaFile } from "./utils-type";
export interface ParentPage {
  id: number;
  title: string;
  slug: string;
  shortTitle: string;
  description: string;
  image: MediaFile;
  cover_image: MediaFile;
  status: number;
  order: number;
  isMenu: number;
  isMainMenu: number;
  isFooterMenu: number;
  page_template: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface PackageItem {
  id: number;
  title: string;
  slug: string;
  image: MediaFile;
  cover_image: MediaFile;
  route_map: MediaFile;
  altitude: number;
  grade: string;
  season: string;
  groupSize: string;
  packageDays: number;
  price: string;
  country: string;
  order: number;
  description: string;
  includes: string;
  excludes: string;
  tripNotes: string;
  parentPages: ParentPage[];
  status: number;
  isUpcoming: number;
  isBooking: number;
  createdAt: string;
  updatedAt: string;
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