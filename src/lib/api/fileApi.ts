import { FileParams } from "@/types/utils-type";
import { api } from "../axios-config/api";

class FileApi {
  async getFile(params: FileParams) {
    try {
      const res = await api.get(`/files?file_of=${params?.file_of}&related_id=${params?.related_id}&type=${params?.type}&page=${params?.page}&limit=${params?.limit}`);
      return res.data
    } catch (error) {
      throw error
    }
  }
}

export default new FileApi()