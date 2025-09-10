import { TeamItem } from "./teams";
import { MediaFile } from "./utils-type";

export interface SummiterPayload {
  name: string;
  nationality: string;
  summittedDate: string;
  peak: string;
  summitterEmail: string;
  order: number;
  led_by_id: number;
  image: MediaFile;
}

export interface SummitterItem {
  id: number;
  name: string;
  nationality: string;
  image: MediaFile;
  summittedDate: string;
  peak: string;
  ledBy: TeamItem;
  summitterEmail: string;
  certificateUrl: string | null;
  order: number;
  status: number;
  created_at: string;
  updated_at: string;
}


export interface StoryPayload {
  title: string;
  image: MediaFile;
  coverImage: MediaFile;
  description: string;
}

export interface StoryItem {
  id: number;
  title: string;
  slug: string;
  summitter: SummitterItem;
  image: MediaFile;
  coverImage: MediaFile;
  description: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}