import { Params } from "@/types/utils-type";
import { api } from "../axios-config/api";

class NewsLetterApi {
  async getNewsLetter(params: Params) {
    try {
      const res = await api.get(`/subscriber?page=${params?.page}&limit=${params.limit}`)
      return res.data
    } catch (error) {
      throw error
    }
  }
  async deleteNewsLetter(id: number) {
    try {
      const res = await api.delete(`/subscriber/${id}`)
      return res.data
    } catch (error) {
      throw error
    }
  }
}

const newsLetterApi = new NewsLetterApi()

export default newsLetterApi