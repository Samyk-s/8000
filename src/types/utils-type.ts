import { FileType } from "./enum/enum";

export interface Meta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number
}

export interface Params {
  limit?: number,
  search?: number | string,
  page?: number
}
export interface MediaFile {
  uid: string;
  name: string;
  url: string;
  alt: string;
  type: string;
  size: string;
}

export interface FetchPackagePayload {
  id: number;
  params: Params;
}


export interface FileParams {
  file_of: string;
  related_id: number;
  type: string;
  page?: number;
  limit?: number,
  search?: string;
}
export interface FetchFilePayload {
  id: number;
  params: FileParams;
}
export interface SearchFilePayload {
  params: FileParams;
}

