import { Params } from "@/types/utils-type";
import { api } from "../axios-config/api";
import { PageTemplate } from "@/types/enum/enum";
import { PagePayload } from "@/types/page";

class PageApi {

  async getPages(param: Params) {
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
  async getPageByType(params: Params) {
    try {
      const response = await api.get(`/pages/by-type/${params?.search}?page=${params?.page}&limit=${params?.limit}`);
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

  async getParentPagePath() {
    try {
      const res = await api.get("/pages/page-path");
      return res.data
    } catch (error) {
      throw error
    }
  }
  // create page
  async createPage(type: PageTemplate, data: PagePayload) {
    try {
      const res = await api.post(`/pages/${type}`, data)
      return res.data
    } catch (error) {
      throw error
    }
  }
  // update page
  async updatePage(id: number, data: PagePayload) {
    try {
      const res = await api.patch(`/pages/${id}`, data)
      return res.data
    } catch (error) {
      throw error
    }
  }
  // delete page
  async deletePage(id: number) {
    try {
      const res = await api.delete(`/pages/${id}`)
      return res.data
    } catch (error) {
      throw error
    }
  }

  // get parent page
  async getParentPage() {
    try {
      const res = await api.get(`/pages/active-pages`);
      return res.data
    } catch (error) {
      throw error
    }
  }
}
const pageApi = new PageApi()
export default pageApi