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
}

export default new SeoApi()