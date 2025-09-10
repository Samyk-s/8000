export interface AddOnItem {
  id: number;
  title: string;
  price: string;
  description: string;
  order: number;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export interface AddOnPayload {
  title: string;
  price: number;
  description: string;
  order: number;
}
