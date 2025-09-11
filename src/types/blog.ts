import { MediaFile } from "./utils-type";

export interface BlogPayload {
  title: string;
  country: string;
  order: number;
  image: MediaFile;
  description: string;
}
export interface BlogItem {
  id: number;
  title: string;
  slug: string;
  category: BlogItem; // could also use an enum like BlogCategory
  country: string;
  order: number;
  image: MediaFile;
  description: string;
  status: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}