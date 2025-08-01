import { ApiResponse, BookingItem } from '@/types/booking';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export class BookingApi {
  static async fetchBookings(page: number = 1, limit: number = 10, search: string = ''): Promise<ApiResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search })
    });

    const response = await fetch(`${API_BASE_URL}/bookings?${params}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  static async fetchBookingById(id: number): Promise<BookingItem> {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  static async deleteBooking(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to delete booking');
    }
  }

  static async updateBooking(id: number, data: Partial<BookingItem>): Promise<BookingItem> {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update booking');
    }

    return response.json();
  }

  // ✅ Add this function
  static async markAsViewed(id: number): Promise<BookingItem> {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ isViewd: 1 }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to mark booking as viewed');
    }

    return response.json();
  }
}
