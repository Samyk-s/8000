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
  children: PageParent[];
  image: MediaFile;
  cover_image: MediaFile;
  status: number;
  order: number;
  isMenu: number;
  isMainMenu: number;
  isFooterMenu: number;
  page_template: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}


export interface PagePath {
  pathIds: number[];
  path: string;
  fullPath: string;
  isIndividual: boolean;
}

export interface PagePayload {
  title: string;
  shortTitle: string;
  description: string;
  parentId: number;
  image: MediaFile;
  cover_image: MediaFile;
  order: number;
  isMenu: number;
  isMainMenu: number;
  isFooterMenu: number;
  page_template: string;
}