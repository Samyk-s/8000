import { Params } from "@/types/utils-type";
import { api } from "../axios-config/api";
import { BookingPayload } from "@/types/booking";

class BookingApi {
  // get all bookins
  async getBookings(params: Params) {
    try {
      const res = await api.get(`/bookings?page=${params?.page}&limit=${params?.limit}`);
      return res.data
    } catch (error) {
      throw error
    }
  }
  // search booking
  async searchBookings(params: Params) {
    try {
      const res = await api.get(`/bookings/search?keyword=${params?.search}&page=${params?.page}&limit=${params?.limit}`);
      return res.data
    } catch (error) {
      throw error
    }
  }
  // get booking
  async getBooking(id: number) {
    try {
      const res = await api.get(`/bookings/${id}`);
      return res.data
    } catch (error) {
      throw error
    }
  }
  //view booking
  async viwBooking(id: number, view: number) {
    try {
      const res = await api.patch(`/bookings/${id}`, { isViewd: view });
      return res.data
    } catch (error) {
      throw error
    }
  }
  // delete booking
  async deleteBooking(id: number) {
    try {
      const res = await api.delete(`/bookings/${id}?id=${id}`);
      return res.data
    } catch (error) {
      throw error
    }
  }
  // update booking
  async updateeBooking(id: number, data: BookingPayload) {
    try {
      const res = await api.patch(`/bookings/${id}`,);
      return res.data
    } catch (error) {
      throw error
    }
  }
}


export default new BookingApi()