import { Params } from "@/types/utils-type";
import { api } from "../axios-config/api";
import { PackagePayload } from "@/types/package";

class PackageApi {

  async getPackages(param?: Params) {
    try {
      const response = await api.get(`/packages?search=${param?.search}&page=${param?.page}limit=${param?.limit}`);
      return response.data
    } catch (error) {
      // console.error(error)
      throw error
    }
  }
  async createPackage(data: PackagePayload) {
    try {
      const response = await api.post("/packages", data);
      return response;
    } catch (error) {
      // console.error(error)
      throw error
    }
  }

  async togglePackage(id: number) {
    try {
      const response = await api.patch(`/packages/${id}/toggle-status`)
      return response.data
    } catch (error) {
      // console.error(error)
      throw error
    }
  }
  async searchPackages(param: Params) {
    try {
      const response = await api.get(`/packages/search?keyword=${param?.search}&page=${param?.page}&limit=${param?.limit}`)
      return response.data
    } catch (error) {
      // console.error(error)
      throw error
    }
  }
  async updagtePackage(id: number, data: PackagePayload) {
    try {
      const response = await api.patch(`/packages/${id}`, data);
      return response;
    } catch (error) {
      // console.error(error)
      throw error
    }
  }
  async getPacakgeById(id: number) {
    try {
      const res = await api.get(`/packages/${id}`);
      return res.data
    } catch (error) {
      throw error
    }
  }
}

const packageApi = new PackageApi()
export default packageApi;