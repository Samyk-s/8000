import { Params } from "@/types/utils-type";
import { api } from "../axios-config/api";

class InquiryApi {
  async getInquiries(params: Params) {
    try {
      const res = await api.get(`/inquiry?inquiry_type=${params?.search}&page=${params?.page}&limit=${params.limit}`)
      return res.data
    } catch (error) {
      throw error
    }
  }
}

export default new InquiryApi()