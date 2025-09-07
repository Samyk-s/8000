import { MediaFile } from "./utils-type"
export interface Seo {
  title: string;
  keywords: string;
  description: string;
  image: MediaFile;
}
export interface SeoPayload {
  title: string;
  keywords: string;
  description: string;
  image: {
    uid: string;
    name: string;
    url: string;
    alt: string;
    type: string;
    size: string;
  };
}
