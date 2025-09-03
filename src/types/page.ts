import { MediaFile } from "./utils-type";

export interface PageParent {
  id: number;
  title: string;
  slug: string;
  shortTitle: string;
  description: string;
  status: number;
  order: number;
  isMenu: number;
  isMainMenu: number;
  isFooterMenu: number;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface PageItem {
  id: number;
  title: string;
  slug: string;
  shortTitle: string;
  description: string;
  parent: PageParent | null;
  children: PageItem[];
  image: MediaFile | null;
  cover_image: MediaFile | null;
  status: number;
  order: number;
  isMenu: number;
  isMainMenu: number;
  isFooterMenu: number;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface Meta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface PageResponse {
  items: PageItem[];
  meta: Meta;
}
