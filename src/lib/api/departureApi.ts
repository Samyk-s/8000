import { Params } from "@/types/utils-type";
import { api } from "../axios-config/api";
import { ItineraryItem } from "@/types/itinerary";
import { DepartureItem } from "@/types/departure";

class DepartureApi {
  async getDeparture(id: number, parms: Params) {
    try {
      const res = await api.get(`/packages/${id}/departures?limit=${parms?.limit}&page=${parms.page}`);
      return res.data
    } catch (error) {
      throw error
    }
  }
  async createDeparture(id: number, values: DepartureItem) {
    try {
      const res = await api.post(`/packages/${id}/departures`, values);
      return res.data
    } catch (error) {
      throw error
    }
  }
  async toggleDeparture(packageId: number, id: number) {
    try {
      const res = await api.patch(`/packages/${packageId}/departures/${id}/toggle-status`);
      return res.data
    } catch (error) {
      throw error
    }
  }

  async deleteDeparture(packageId: number, id: number) {
    try {
      const res = await api.delete(`/packages/${packageId}/departures/${id}`);
      return res.data
    } catch (error) {
      throw error
    }
  }
  async searchDeparture(packageId: number, params: Params) {
    try {
      const res = await api.get(
        `/packages/${packageId}/departures/search?keyword=${params?.search || ''}&packageId=${packageId}&page=${params?.page || 1}&limit=${params?.limit || 10}`
      );
      return res.data
    } catch (error) {
      throw error
    }
  }
}

export default new DepartureApi();