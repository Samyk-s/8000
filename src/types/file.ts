import { MediaFile } from "./utils-type";

export interface FileItem {
  id: number;
  slug: string;
  file_of: string;
  related_id: number;
  type: string;
  file: MediaFile;
  order: number;
  status: number;
  alt: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}
