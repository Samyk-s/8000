// types/booking.ts

export interface Package {
  title: string;
}

export interface Addon {
  title: string;
}

export interface BookingItem {
  id: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  noOfTravellers: number;
  arrivalDate: string;
  departureDate: string;
  package: Package;
  addons: Addon[];
  status: 'pending' | 'confirmed' | 'cancelled';
  totalPrice: string;
  isViewd: 0 | 1;
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

export interface ApiResponse {
  items: BookingItem[];
  meta: Meta;
}

export type BookingStatus = BookingItem['status'];
export type ViewedStatus = BookingItem['isViewd'];