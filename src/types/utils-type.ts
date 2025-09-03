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