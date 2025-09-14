import { Params } from "@/types/utils-type";
import { api } from "../axios-config/api";
import { ReviewItem, ReviewPayloads } from "@/types/packge-review";

class ReviewApi {
  async getPackageReviews(id: number, parms: Params) {
    try {
      const res = await api.get(`/reviews/package/${id}?limit=${parms?.limit}&page=${parms.page}`);
      return res.data
    } catch (error) {
      throw error
    }
  }
  async createReview(package_id: number, values: ReviewPayloads) {
    try {
      const res = await api.post(`/reviews/${package_id}`, values);
      return res.data
    } catch (error) {
      throw error
    }
  }
  async toggleReview(id: number) {
    try {
      const res = await api.patch(`/reviews/toggle-status/${id}`);
      return res.data
    } catch (error) {
      throw error
    }
  }

  async deleteReview(id: number) {
    try {
      const res = await api.delete(`/reviews/${id}`);
      return res.data
    } catch (error) {
      throw error
    }
  }
  async searchReviews(params: Params) {

    try {
      const res = await api.get(
        `/reviews/search?keyword=${params?.search || ''}&page=${params?.page || 1}&limit=${params?.limit || 10}`
      );

      return res.data
    } catch (error) {
      throw error
    }
  }
  async searchReviewsByPackageId(id: number, params: Params) {

    try {
      const res = await api.get(
        `/reviews/search/${id}?keyword=${params?.search || ''}&page=${params?.page || 1}&limit=${params?.limit || 10}`
      );

      return res.data
    } catch (error) {
      throw error
    }
  }
  async getAllReviews(params: Params) {

    try {
      const res = await api.get(
        `/reviews?page=${params?.page || 1}&limit=${params?.limit || 10}`
      );

      return res.data
    } catch (error) {
      throw error
    }
  }
  async getReviewById(ReviewId: number) {
    try {
      const res = await api.get(`/reviews/id/${ReviewId}`);
      return res.data
    } catch (error) {
      throw error
    }
  }

}

const reviewApi = new ReviewApi()

export default reviewApi;