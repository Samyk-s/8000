import { Params } from "@/types/utils-type";
import { api } from "../axios-config/api";
import { AddOnPayload } from "@/types/addOns";

class AddOnsApi {
  // get all addons
  async getAddons(id: number, param: Params) {
    try {
      const res = await api.get(`/packages/${id}/addon?page=${param?.page}&limit=${param?.limit}`);
      return res.data
    } catch (error) {
      throw error
    }
  }
  async toggleAddons(packageId: number, addonId: number) {
    try {
      const res = await api.patch(`/packages/${packageId}/addon/${addonId}/toggle-status`);
      return res.data
    } catch (error) {
      throw error
    }
  }
  async deleteAddons(packageId: number, addonId: number) {
    try {
      const res = await api.delete(`/packages/${packageId}/addon/${addonId}`);
      return res.data
    } catch (error) {
      throw error
    }
  }
  async searchAddons(packageId: number, params: Params) {
    try {
      const res = await api.get(`/packages/${packageId}/addon/search?packageId=${packageId}&keyword=${params?.search}&page=${params?.page}&limit=${params?.limit}`);
      return res.data
    } catch (error) {
      throw error
    }
  }
  async createAddons(packageId: number, data: AddOnPayload) {
    try {
      const res = await api.post(`/packages/${packageId}/addon`, data);
      return res.data
    } catch (error) {
      throw error
    }
  }
  async upateAddon(packageId: number, id: number, data: AddOnPayload) {
    try {
      const res = await api.patch(`/packages/${packageId}/addon/${id}`, data);
      return res.data
    } catch (error) {
      throw error
    }
  }
  async getAddonById(packageId: number, id: number) {
    try {
      const res = await api.get(`/packages/${packageId}/addon/${id}`);
      return res.data
    } catch (error) {
      throw error
    }
  }
}

const addonsApi = new AddOnsApi()
export default addonsApi;