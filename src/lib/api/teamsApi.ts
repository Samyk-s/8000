import { Params } from "@/types/utils-type";
import { api } from "../axios-config/api";
import { TeamPayload } from "@/types/teams";

class TeamApi {
  // function get blog category
  async getBlogCategory(params: Params) {
    try {
      const res = await api.get(`/teams-categories?page=${params?.page}&limit=${params?.limit}`);
      return res.data
    } catch (error) {
      throw error
    }
  }



  // teams
  //create teams fucntion
  async getTeams(params: Params) {
    try {
      const res = await api.get(`/teams?page=${params?.page}&limit=${params?.limit}`);
      return res.data
    } catch (error) {
      throw error
    }
  }
  async createTeam(data: TeamPayload) {
    try {
      const res = await api.post(`/teams`, data)
      return res.data
    } catch (error) {
      throw error
    }
  }
  async searchTeam(params: Params) {
    try {
      const res = await api.get(`/teams/search?keyword=${params?.search}&page=${params?.page}&limit=${params?.limit}`)
      return res.data
    } catch (error) {
      throw error
    }
  }

}

export default new TeamApi()