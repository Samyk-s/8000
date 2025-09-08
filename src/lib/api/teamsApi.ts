import { Params } from "@/types/utils-type";
import { api } from "../axios-config/api";
import { TeamPayload } from "@/types/teams";
import { message } from "antd";

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
  //get teams fucntion
  async getTeams(params: Params) {
    try {
      const res = await api.get(`/teams?page=${params?.page}&limit=${params?.limit}`);
      return res.data
    } catch (error) {
      throw error
    }
  }
  //create
  async createTeam(data: TeamPayload) {
    try {
      const res = await api.post(`/teams`, data)
      return res.data
    } catch (error) {
      throw error
    }
  }
  //search
  async searchTeam(params: Params) {
    try {
      const res = await api.get(`/teams/search?keyword=${params?.search}&page=${params?.page}&limit=${params?.limit}`)
      return res.data
    } catch (error) {
      throw error
    }
  }
  //toggle
  async toggleTeam(id: number) {
    try {
      const res = await api.patch(`/teams/${id}/toggle-status`)
      return res.data
    } catch (error) {
      throw error
    }
  }
  //Delete
  async deleteTeam(id: number) {
    try {
      const res = await api.delete(`/teams/${id}`)
      return res.data
    } catch (error) {
      throw error
    }
  }
  // get by id
  async getTeamId(id: number) {
    try {
      const res = await api.get(`/teams/${id}`)
      return res
    } catch (error) {
      throw error
    }
  }
  //update team
  async updateTeam(id: number, values: TeamPayload) {
    try {
      const res = await api.patch(`/teams/${id}`)
      return res.data
    } catch (error) {
      throw error
    }
  }
}

export default new TeamApi()