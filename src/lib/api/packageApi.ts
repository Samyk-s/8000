import { api } from "../axios-config/api";

class PackageApi {

  async getPackages(limit: number) {
    try {
      const response = await api.get(`/packages?${limit = limit}`);
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

export default new PackageApi;