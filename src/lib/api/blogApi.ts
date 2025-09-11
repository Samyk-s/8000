import { BlogPayload } from "@/types/blog";
import { BlogCategory } from "@/types/enum/enum";
import { api } from "../axios-config/api";
import { Params } from "@/types/utils-type";

class BlogApi {
  // create blog
  async createBlog(category: BlogCategory, data: BlogPayload) {
    try {
      const res = await api.post(`/blogs/${category}`, data)
      return res.data
    } catch (error) {
      throw error
    }
  }
  // get blogs
  async getBlogs(params: Params, category: string) {
    try {
      const res = await api.get(`/blogs/by-type/${category}?page=${params?.page}&limit=${params?.limit}`)
      return res.data
    } catch (error) {
      throw error
    }
  }
  // toggle blogs
  async toggleBlogStatus(id: number) {
    try {
      const res = await api.patch(`/blogs/${id}/toggle-status`)
      return res.data
    } catch (error) {
      throw error
    }
  }
  // delete blogs
  async deleteBlog(id: number) {
    try {
      const res = await api.delete(`/blogs/${id}`)
      return res.data
    } catch (error) {
      throw error
    }
  }
  async getBlogById(id: number) {
    try {
      const res = await api.get(`/blogs/by-id/${id}`)
      return res.data
    } catch (error) {
      throw error
    }
  }

  // update blog
  async updateBlog(id: number, data: BlogPayload) {
    try {
      const res = await api.patch(`/blogs/${id}`, data)
      return res.data
    } catch (error) {
      throw error
    }
  }
}


const blogApi = new BlogApi();

export default blogApi;