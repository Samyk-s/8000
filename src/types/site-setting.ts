import { MediaFile } from "./utils-type";

export interface SiteSettingItem {
  id: number;
  title: string;
  logo: MediaFile;
  secondaryLogo: MediaFile;
  favicon: MediaFile;
  email: string;
  phone: string;
  alt_phone: string;
  payment_img: MediaFile;
  recommended_img: MediaFile;
  address: string;
  map_link: string;
  youtube: string;
  twitter: string;
  facebook: string;
  instagram: string;
  tik_tok: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}


export interface SettingPayload {
  title: string;
  logo: MediaFile;
  secondaryLogo?: MediaFile;
  favicon?: MediaFile;
  email: string;
  phone: string;
  alt_phone: string;
  payment_img?: MediaFile;
  recommended_img?: MediaFile;
  address: string;
  map_link: string;
  youtube: string;
  twitter: string;
  facebook: string;
  instagram: string;
  tik_tok: string;
}