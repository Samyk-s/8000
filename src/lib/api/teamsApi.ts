import { Params } from "@/types/utils-type";
import { api } from "../axios-config/api";
import { TeamCategoryPayload, TeamPayload } from "@/types/teams";

class TeamApi {
  // get  team category
  async getTeamCategory(params: Params) {
    try {
      const res = await api.get(`/teams-categories?page=${params?.page}&limit=${params?.limit}`);
      return res.data
    } catch (error) {
      throw error
    }
  }
  // get  team category by id
  async getTeamCategoryId(id: number) {
    try {
      const res = await api.get(`/teams-categories/by-id/${id}`);
      return res.data
    } catch (error) {
      throw error
    }
  }
  //search team category
  async searchTeamCategory(params: Params) {
    try {
      const res = await api.get(`/teams-categories/search?keyword=${params?.search}&page=${params?.page}&limit=${params?.limit}`);
      return res.data
    } catch (error) {
      throw error
    }
  }
  //toggle blog category
  async toggleTeamCategory(id: number) {
    try {
      const res = await api.patch(`/teams-categories/${id}/toggle-status`);
      return res.data
    } catch (error) {
      throw error
    }
  }
  //toggle blog category
  async deleteTeamCategory(id: number) {
    try {
      const res = await api.delete(`/teams-categories/${id}`);
      return res.data
    } catch (error) {
      throw error
    }
  }
  //update team
  async updateTeamCategory(id: number, values: TeamCategoryPayload) {
    try {
      const res = await api.patch(`/teams-categories/${id}`, values)
      return res.data
    } catch (error) {
      throw error
    }
  }
  //create category
  async createTeamCategory(data: TeamCategoryPayload) {
    // console.log(data, "dsfd")
    try {
      const res = await api.post(`/teams-categories`, data)
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
      const res = await api.patch(`/teams/${id}`, values)
      return res.data
    } catch (error) {
      throw error
    }
  }
}

const teamApi = new TeamApi()

export default teamApi;