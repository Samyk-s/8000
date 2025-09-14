import { MediaFile } from "@/types/utils-type";
import { api } from "../axios-config/api";

class ResourceApi {
  async createResource(data: any) {
    try {
      const res = await api.post(`/resources/image`, data);
      return res.data
    } catch (error) {
      throw error
    }
  }
  async toggleFile(id: number) {
    console.log("id", id)
    try {
      const res = await api.patch(`/files/${id}/toggle-status`);
      return res.data
    } catch (error) {
      throw error
    }
  }
}

const resourcesApi = new ResourceApi()
export default resourcesApi