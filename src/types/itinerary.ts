export interface ItineraryItem {
  id: number;
  day: string;
  title: string;
  meal: string;
  accommodation: string;
  description: string;
  order: number;
  maxAltitude: number;
  status: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
