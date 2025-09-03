import { Params } from "@/types/utils-type";
import { api } from "../axios-config/api";

class PackageApi {

  async getPackages(param: Params) {
    try {
      const response = await api.get(`/packages?search=${param.search}&page=${param.page}limit=${param.limit}`);
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  async createPackage(data: any) {
    try {
      const response = await api.post("/packages", data)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async togglePackage(id: number) {
    try {
      const response = await api.patch(`/packages/${id}/toggle-status`)
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

export default new PackageApi();