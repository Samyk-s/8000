export interface MediaFile {
  uid: string;
  name: string;
  url: string;
  alt: string;
  type: string;
  size: string;
}

export interface Package {
  slug: string;
  id: number;
  title: string;
  image: MediaFile;
  cover_image: MediaFile;
  route_map: MediaFile;
  altitude: number;
  grade: string;
  season: string;
  groupSize: string;
  packageDays: number;
  price: number;
  country: string;
  order: number;
  description: string;
  includes: string;
  excludes: string;
  tripNotes: string;
  page_id: number;
  status: number;
  isUpcoming: number;
  isBooking: number;
}
