import { Params } from "@/types/utils-type";
import { api } from "../axios-config/api";

class BookingApi {
  async getBookings(params: Params) {
    try {
      const res = await api.get(`/bookings?page=${params?.page}&limit=${params?.limit}`);
      return res.data
    } catch (error) {
      throw error
    }
  }
  async getBooking(id: number) {
    try {
      const res = await api.get(`/bookings/${id}`);
      return res.data
    } catch (error) {
      throw error
    }
  }
  async viwBooking(id: number, view: number) {
    try {
      const res = await api.patch(`/bookings/${id}`, { isViewd: view });
      return res.data
    } catch (error) {
      throw error
    }
  }
}


export default new BookingApi()