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
  async deleteItinerary(packageId: number, itineraryId: number) {
    try {
      const res = await api.delete(`/packages/${packageId}/itineraries/${itineraryId}`);
      return res.data
    } catch (error) {
      throw error
    }
  }
  async searchItinerary(packageId: number, params: Params) {
    try {
      const res = await api.get(`/packages/${packageId}/itineraries/search}?searchkeyword=${params?.search}&page=${params?.page}&limig=${params?.limit}`);
      return res.data
    } catch (error) {
      throw error
    }
  }
}

export default new ItineraryApi();