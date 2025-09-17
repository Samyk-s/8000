import { MediaFile } from "./utils-type";

export interface TestimonialPayload {
  name: string;
  country: string;
  description: string;
  order: number;
  image?: MediaFile;

}

export interface TestimonialItem {
  id: number;
  name: string;
  country: string;
  description: string;
  order: number;
  status: number;
  image: MediaFile;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
