import { Params, SearchInquiriesParams } from "@/types/utils-type";
import { api } from "../axios-config/api";
import { message } from "antd";

class InquiryApi {
  async getInquiries(params: Params) {
    try {
      const res = await api.get(`/inquiry?inquiry_type=${params?.search}&page=${params?.page}&limit=${params.limit}`)
      return res.data
    } catch (error) {
      throw error
    }
  }
  async searchInquiries(params: SearchInquiriesParams) {
    try {
      const res = await api.get(`/inquiry/search?keyword=${params?.search}&inquiry_type=${params?.inquiry_type}&page=${params?.page}&limit=${params.limit}`)
      return res.data
    } catch (error) {
      throw error
    }
  }
  async deleteInquiry(id: number) {
    try {
      const res = await api.delete(`/inquiry/${id}`)
      return res.data
    } catch (error) {
      throw error
    }
  }
  async getInquiryById(id: number) {

    try {
      const res = await api.get(`/inquiry/${id}`)
      return res.data
    } catch (error) {
      throw error
    }
  }
}

const inquiryApi = new InquiryApi()
export default inquiryApi