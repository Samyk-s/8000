import { MediaFile } from "./utils-type";

export interface TeamCatgoryItem {
  id: number;
  name: string;
  slug: string;
  description: string;
  status: number;
  order: number;
  createdAt: string;
  updatedAt: string;
}




// teams 

export interface TeamPayload {
  name: string;
  categoryId: number;
  post: string;
  image: MediaFile;
  coverImage: MediaFile;
  bioData: MediaFile;
  description: string;
  email: string;
  phoneNo: string;
  fbLink: string;
  instagramLink: string;
  twitter: string;
  linkedIn: string;
  youtube: string;
  order: number;
  status: number;
}


export interface TeamItem {
  id: number;
  name: string;
  slug: string;
  category: TeamCatgoryItem;
  post: string;
  image: MediaFile;
  cover_image: MediaFile;
  bio_data: MediaFile;
  description: string;
  email: string;
  phone_no: string | null;
  fblink: string | null;
  instagramlink: string | null;
  twitter: string | null;
  linkedIn: string | null;
  youtube: string | null;
  order: number;
  status: number;
  created_at: string;
  updated_at: string;
}