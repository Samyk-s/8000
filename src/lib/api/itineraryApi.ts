import { Params } from "@/types/utils-type";
import { api } from "../axios-config/api";

class ItineraryApi {
  async getItenerary(id: number, parms: Params) {
    try {
      const res = await api.get(`/packages/${id}/itineraries?limit=${parms?.limit}&page=${parms.page}`);
      return res.data
    } catch (error) {
      throw error
    }
  }
}

export default new ItineraryApi();