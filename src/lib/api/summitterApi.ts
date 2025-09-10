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
  // search summitters
  async searchSummiters(params: Params) {
    try {
      const res = await api.get(`/summitter/search?keyword=${params?.search}&page=${params?.page}&limit=${params?.limit}`)
      return res.data
    } catch (error) {
      throw error
    }
  }
}

export default new SummitterApi()