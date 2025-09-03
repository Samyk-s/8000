import { Params } from "@/types/utils-type";
import { api } from "../axios-config/api";

class PageApi {

  async getPages(param: Params) {
    try {
      const response = await api.get(`/pages?page=${param.page}limit=${param.limit}`);
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
export default new PageApi()