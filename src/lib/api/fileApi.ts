import { FileParams } from "@/types/utils-type";
import { api } from "../axios-config/api";
import { FilePayload } from "@/types/file";

class FileApi {
  async getFile(params: FileParams) {
    try {
      const res = await api.get(`/files?file_of=${params?.file_of}&related_id=${params?.related_id}&type=${params?.type}&page=${params?.page}&limit=${params?.limit}`);
      return res.data
    } catch (error) {
      throw error
    }
  }
  async createFile(params: FileParams, data: FilePayload) {
    try {
      const res = await api.post(
        `/files/${params.file_of}/${params.related_id}/${params.type}`,
        data
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async createResource(data: FormData) {
    try {
      const res = await api.post(`/resources/image`, data);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async toggleFile(id: number) {
    try {
      const res = await api.patch(`/files/${id}/toggle-status`);
      return res.data
    } catch (error) {
      throw error
    }
  }
  async deleteFile(id: number) {
    try {
      const res = await api.delete(`/files/${id}`);
      return res.data
    } catch (error) {
      throw error
    }
  }
  async searchFile(params: FileParams) {
    try {
      const res = await api.get(`/files/search?keyword=${params?.search}&file_of=${params?.file_of}&related_id=${params?.related_id}&type=${params?.type}&page=${params?.page}&limit=${params?.limit}`)
      return res.data
    } catch (error) {
      throw error
    }
  }
}

const fileApi = new FileApi();
export default fileApi;