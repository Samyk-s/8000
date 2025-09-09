

export interface BookingItem {
  id: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  noOfTravellers: number;
  arrivalDate: string; // ISO Date string (e.g., "2025-05-05")
  departureDate: string; // ISO Date string
  package: {
    title: string;
  };
  addons: {
    title: string;
  }[];
  status: "pending" | "confirmed" | "cancelled" | string; // extendable
  totalPrice: string; // keeping as string since it looks like a decimal from DB
  isViewd: number; // 0 or 1
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
}


export interface BookingPayload {
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  customerAddress?: string;
  noOfTravellers?: number;
  arrivalDate?: string;
  departureDate?: string;
  packageId?: number;
  addonIds?: number[];
  status?: string;
}
