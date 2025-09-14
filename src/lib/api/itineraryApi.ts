import { Params } from "@/types/utils-type";
import { api } from "../axios-config/api";
import { ItineraryItem } from "@/types/itinerary";

class ItineraryApi {
  async getItenerary(id: number, parms: Params) {
    try {
      const res = await api.get(`/packages/${id}/itineraries?limit=${parms?.limit}&page=${parms.page}`);
      return res.data
    } catch (error) {
      throw error
    }
  }
  async createItinerary(id: number, values: ItineraryItem) {
    try {
      const res = await api.post(`/packages/${id}/itineraries`, values);
      return res.data
    } catch (error) {
      throw error
    }
  }
  async toggleItinerary(packageId: number, itineraryId: number) {
    try {
      const res = await api.patch(`/packages/${packageId}/itineraries/${itineraryId}/toggle-status`);
      return res.data
    } catch (error) {
      throw error
    }
  }
  async updateItinerary(packageId: number, itineraryId: number, data: ItineraryItem) {
    try {
      const res = await api.patch(`/packages/${packageId}/itineraries/${itineraryId}`, data);
      return res.data
    } catch (error) {
      throw error
    }
  }
  async deleteItinerary(package_id: number, itineraryId: number) {
    try {
      const res = await api.delete(`/packages/${package_id}/itineraries/${itineraryId}`);
      return res.data
    } catch (error) {
      throw error
    }
  }
  async searchItinerary(package_id: number, params: Params) {

    try {
      const res = await api.get(
        `/packages/${package_id}/itineraries/search?keyword=${params?.search || ''}&packageId=${package_id}&page=${params?.page || 1}&limit=${params?.limit || 10}`
      );

      return res.data
    } catch (error) {
      throw error
    }
  }
}

const itineraryApi = new ItineraryApi()

export default itineraryApi;