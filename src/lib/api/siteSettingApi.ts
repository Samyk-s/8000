import { SettingPayload } from "@/types/site-setting";
import { api } from "../axios-config/api";

class SiteSetting {
  async getSiteSetting() {
    try {
      const res = await api.get("/site-settings");
      return res.data
    } catch (error) {
      throw error
    }
  }
  async updageSitsetting(data: SettingPayload) {
    try {
      const res = await api.patch("/site-settings", data);
      return res.data
    } catch (error) {
      throw error
    }
  }
}

const siteSettingApi = new SiteSetting();

export default siteSettingApi