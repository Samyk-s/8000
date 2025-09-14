import { Params } from "@/types/utils-type";
import { api } from "../axios-config/api";

class BlogsApi {

  async getBlogsCategory(param: Params) {
    try {
      const response = await api.get(`/pages?page=${param.page}limit=${param.limit}`);
      return response.data
    } catch (error) {
      // console.error(error)
      throw error
    }
  }
  async getPageById(id: number) {
    try {
      const response = await api.get(`/pages/by-id/${id}`);
      return response.data
    } catch (error) {
      // console.error(error)
      throw error
    }
  }
  async togglePage(id: number) {
    try {
      const response = await api.patch(`/pages/${id}/toggle-status`)
      return response.data
    } catch (error) {
      // console.error(error)
      throw error
    }
  }
  async searchPages(params: Params) {

    try {
      const res = await api?.get(
        `/pages/search?keyword=${params?.search || ''}&page=${params?.page || 1}&limit=${params?.limit || 10}`
      );

      return res.data
    } catch (error) {
      throw error
    }
  }
}
const blogsApi = new BlogsApi()
export default blogsApi;