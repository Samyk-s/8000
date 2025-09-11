import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Meta, Params } from "@/types/utils-type";
import { BlogItem, BlogPayload } from "@/types/blog";
import blogApi from "@/lib/api/blogApi";
import { message } from "antd";
import { BlogCategory } from "@/types/enum/enum";

// ================= Async Thunks =================

// Fetch Blogs
interface FetchBlogsPayload {
  params: Params,
  type: string
}
export const fetchBlogs = createAsyncThunk<
  { items: BlogItem[]; meta: Meta },
  FetchBlogsPayload,
  { rejectValue: string }
>("blogs/fetchBlogs", async ({ params, type }, { rejectWithValue }) => {
  try {
    const res = await blogApi.getBlogs(params, type);
    return res;
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to fetch blogs");
  }
});

// Create Blog
interface CreateBlogPayload {
  type: BlogCategory;
  data: BlogPayload;
}
export const createBlog = createAsyncThunk<
  BlogItem,
  CreateBlogPayload,
  { rejectValue: string }
>("blogs/createBlog", async ({ type, data }, { rejectWithValue }) => {
  try {
    const res = await blogApi.createBlog(type, data);
    message.success(res?.message || "Blog created successfully");
    return res.data as BlogItem;
  } catch (err: any) {
    return rejectWithValue(err?.message || "Failed to create blog");
  }
});

export const toggleBlogStatus = createAsyncThunk<
  BlogItem,
  number,
  { rejectValue: string }
>("blogs/toggleBlogStatus", async (id, { rejectWithValue }) => {
  try {
    const res = await blogApi.toggleBlogStatus(id);
    message.success(res?.message || "Blog status updated");
    return res.data as BlogItem;
  } catch (err: any) {
    message.error("Failed to toggle blog status");
    return rejectWithValue(err?.message || "Failed to toggle blog status");
  }
});

export const deleteBlog = createAsyncThunk<
  { id: number },
  number,
  { rejectValue: string }
>("blogs/deleteBlog", async (id, { rejectWithValue }) => {
  try {
    const res = await blogApi.deleteBlog(id);
    message.success(res?.message || "Blog deleted successfully");
    return { id };
  } catch (err: any) {
    message.error("Failed to delete blog");
    return rejectWithValue(err?.message || "Failed to delete blog");
  }
});

// ================= Async Thunks =================

export const getBlogById = createAsyncThunk<
  BlogItem,
  number,
  { rejectValue: string }
>("blogs/getBlogById", async (id, { rejectWithValue }) => {
  try {
    const res = await blogApi.getBlogById(id);
    // console.log("res", res)
    return res as BlogItem;
  } catch (err: any) {
    return rejectWithValue(err?.message || "Failed to fetch blog");
  }
});

// Update Blog
interface UpdateBlogPayload {
  blogId: number;
  data: BlogPayload;
}
export const updateBlog = createAsyncThunk<
  BlogItem,
  UpdateBlogPayload,
  { rejectValue: string }
>("blogs/updateBlog", async ({ blogId, data }, { rejectWithValue }) => {
  try {
    const res = await blogApi.updateBlog(blogId, data);
    message.success(res?.message || "Blog updated successfully");
    // console.log("res", res)
    return res.data as BlogItem;
  } catch (err: any) {
    return rejectWithValue(err?.message || "Failed to update blog");
  }
});



// ================= State =================
interface BlogState {
  items: BlogItem[];
  meta: Meta;
  loading: boolean;
  error: string | null;
  blog: BlogItem | null;
}

const initialState: BlogState = {
  items: [],
  meta: {
    currentPage: 1,
    totalPages: 0,
    itemCount: 0,
    itemsPerPage: 0,
    totalItems: 0,
  },
  loading: false,
  error: null,
  blog: null,
};

// ================= Slice =================
const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Blogs
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchBlogs.fulfilled,
        (state, action: PayloadAction<{ items: BlogItem[]; meta: Meta }>) => {
          state.items = action.payload.items;
          state.meta = action.payload.meta;
          state.loading = false;
        }
      )
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch blogs";
        state.loading = false;
      });

    // Create Blog
    builder
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action: PayloadAction<BlogItem>) => {
        state.items.push(action.payload);
        state.meta.itemCount += 1;
        state.meta.totalItems += 1;
        state.loading = false;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.error = action.payload || "Failed to create blog";
        state.loading = false;
      });

    // Toggle Blog Status
    builder
      .addCase(toggleBlogStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleBlogStatus.fulfilled, (state, action: PayloadAction<BlogItem>) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
        state.loading = false;
      })
      .addCase(toggleBlogStatus.rejected, (state, action) => {
        state.error = action.payload || "Failed to toggle blog status";
        state.loading = false;
      });

    // Delete Blog
    builder
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action: PayloadAction<{ id: number }>) => {
        state.items = state.items.filter((item) => item.id !== action.payload.id);
        state.meta.itemCount = Math.max(0, state.meta.itemCount - 1);
        state.meta.totalItems = Math.max(0, state.meta.totalItems - 1);
        state.loading = false;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.error = action.payload || "Failed to delete blog";
        state.loading = false;
      });
    // Get Blog by ID
    builder
      .addCase(getBlogById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.blog = null;
      })
      .addCase(getBlogById.fulfilled, (state, action: PayloadAction<BlogItem>) => {
        state.blog = action.payload;
        state.loading = false;
      })
      .addCase(getBlogById.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch blog";
        state.loading = false;
      });

    // Update Blog
    builder
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action: PayloadAction<BlogItem>) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
        // also update state.blog if editing the same blog
        if (state.blog?.id === action.payload.id) state.blog = action.payload;
        state.loading = false;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.error = action.payload || "Failed to update blog";
        state.loading = false;
      });
  },
});

export default blogSlice.reducer;
