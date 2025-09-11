import { SeoPayload } from "@/types/seo";
import { api } from "../axios-config/api";

class SeoApi {

  async getSeo(entity: string, id: number) {
    try {
      const res = await api.get(`/seo?seoable_entity=${entity}&seoable_id=${id}`)
      return res.data
    } catch (error) {
      throw error;
    }
  }
  async updateSeo(id: number, data: SeoPayload) {
    console.log(id)
    console.log(data)
    try {
      const res = await api.patch(`/seo/${id}`, data)
      return res.data
    } catch (error) {
      throw error;
    }
  }
}

export default new SeoApi()