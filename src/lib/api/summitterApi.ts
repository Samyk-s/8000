import { StoryPayload, SummiterPayload } from "@/types/summitter";
import { api } from "../axios-config/api";
import { Params } from "@/types/utils-type";

class SummitterApi {
  // create summitter
  async createSummiter(data: SummiterPayload) {
    try {
      const res = await api.post("/summitter", data)
      return res.data
    } catch (error) {
      throw error
    }
  }

  // get summitters
  async getSummiters(params: Params) {
    try {
      const res = await api.get(`/summitter?page=${params?.page}&limit=${params?.limit}`)
      return res.data
    } catch (error) {
      throw error
    }
  }
  // search summitters
  async searchSummiters(params: Params) {
    try {
      const res = await api.get(`/summitter/search?keyword=${params?.search}&page=${params?.page}&limit=${params?.limit}`)
      return res.data
    } catch (error) {
      throw error
    }
  }
  // toggle summitter
  async toggleSummiter(id: number) {
    try {
      const res = await api.patch(`/summitter/${id}/toggle-status`)
      return res.data
    } catch (error) {
      throw error
    }
  }
  // delete summitter
  async deleteSummiter(id: number) {
    try {
      const res = await api.delete(`/summitter/${id}`)
      return res.data
    } catch (error) {
      throw error
    }
  }
  // get summitter by id
  async getSummterById(id: number) {
    try {
      const res = await api.get(`/summitter/${id}?id=${id}`);
      return res.data
    } catch (error) {
      throw error
    }
  }
  // update summitter by id
  async updateSummter(id: number, payload: SummiterPayload) {
    try {
      const res = await api.patch(`/summitter/${id}`, payload);
      return res.data
    } catch (error) {
      throw error
    }
  }




  //story
  //create summiter story
  async createSummitterStory(summiter_id: number, data: StoryPayload) {
    try {
      const res = await api.post(`/stories/${summiter_id}`, data)
      return res.data
    } catch (error) {
      throw error
    }
  }
  //get summiter story
  async getSummitterStories(params: Params) {
    try {
      const res = await api.get(`/stories?page=${params?.page}&limit=${params?.limit}`)
      return res.data
    } catch (error) {
      throw error
    }
  }
  //update summiter story
  async updateSummitterStory(id: number, data: StoryPayload) {
    try {
      const res = await api.patch(`/stories/${id}`, data)
      return res.data
    } catch (error) {
      throw error
    }
  }
  //delete summiter story
  async deleteSummitterStory(id: number) {
    try {
      const res = await api.delete(`/stories/${id}`)
      return res.data
    } catch (error) {
      throw error
    }
  }
  //toggle summiter story
  async toggleSummitterStory(id: number) {
    try {
      const res = await api.patch(`/stories/${id}/toggle-status`)
      return res.data
    } catch (error) {
      throw error
    }
  }
  //get summiter story by id
  async getSummitterStoryById(id: number) {
    try {
      const res = await api.get(`/stories/${id}`)
      return res.data
    } catch (error) {
      throw error
    }
  }
  async summitterCertificate(id: number) {
    try {
      const res = await api.post(`/summitter/${id}/certificate`)
      return res.data
    } catch (error) {
      throw error
    }
  }
}

const summittterApi = new SummitterApi()
export default summittterApi