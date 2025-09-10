import { SummiterPayload } from "@/types/summitter";
import { api } from "../axios-config/api";
import { Params } from "@/types/utils-type";

class SummitterApi {
  // create summitter
  async createSummiter(data: SummiterPayload) {
    try {
      const res = await api.post("/summitter", data)
      return res.data
    } catch (error) {
      throw error
    }
  }
  // get summitters
  async getSummiters(params: Params) {
    try {
      const res = await api.get(`/summitter?page=${params?.page}&limit=${params?.limit}`)
      return res.data
    } catch (error) {
      throw error
    }
  }

  // toggle summitter
  async toggleSummiter(id: number) {
    try {
      const res = await api.patch(`/summitter/${id}/toggle-status`)
      return res.data
    } catch (error) {
      throw error
    }
  }
  // delete summitter
  async deleteSummiter(id: number) {
    try {
      const res = await api.delete(`/summitter/${id}`)
      return res.data
    } catch (error) {
      throw error
    }
  }
  // get summitter by id
  async getSummterById(id: number) {
    try {
      const res = await api.get(`/summitter/${id}?id=${id}`);
      return res.data
    } catch (error) {
      throw error
    }
  }
  // update summitter by id
  async updateSummter(id: number, payload: SummiterPayload) {
    try {
      const res = await api.patch(`/summitter/${id}`, payload);
      return res.data
    } catch (error) {
      throw error
    }
  }
}

export default new SummitterApi()