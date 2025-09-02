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