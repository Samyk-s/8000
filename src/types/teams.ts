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
