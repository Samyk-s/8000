import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { PageItem, PagePayload } from "@/types/page";
import { Meta, Params, SearchPagePayload } from "@/types/utils-type";
import pageApi from "@/lib/api/pageApi";
import { message } from "antd";
import { PageTemplate } from "@/types/enum/enum";

// --- Async Thunks ---

// Fetch Pages
export const fetchPages = createAsyncThunk<{ items: PageItem[]; meta: Meta }, Params>(
  "pages/fetchPages",
  async (params: Params, { rejectWithValue }) => {
    try {
      const res = await pageApi.getPages(params);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);


// Search Pages
export const searchPages = createAsyncThunk<{ items: PageItem[]; meta: Meta }, { params: SearchPagePayload }>(
  "pages/searchPages",
  async ({ params }, { rejectWithValue }) => {
    try {
      const res = await pageApi.searchPages(params);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Create Page
export const createPage = createAsyncThunk<PageItem, { type: PageTemplate; data: PagePayload }>(
  "pages/createPage",
  async ({ type, data }, { rejectWithValue }) => {
    try {
      const res = await pageApi.createPage(type, data);
      message.success("Page created successfully!");
      return res;
    } catch (err: any) {
      message.error(err?.message || "Failed to create page");
      return rejectWithValue(err.message);
    }
  }
);

// Update Page
export const updatePage = createAsyncThunk<PageItem, { id: number; data: PagePayload }>(
  "pages/updatePage",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await pageApi.updatePage(id, data);
      message.success("Page updated successfully!");
      return res;
    } catch (err: any) {
      message.error(err?.message || "Failed to update page");
      return rejectWithValue(err.message);
    }
  }
);

// Delete Page
export const deletePage = createAsyncThunk<number, number>(
  "pages/deletePage",
  async (id: number, { rejectWithValue }) => {
    try {
      await pageApi.deletePage(id);
      message.success("Page deleted successfully!");
      return id;
    } catch (err: any) {
      message.error(err?.message || "Failed to delete page");
      return rejectWithValue(err.message);
    }
  }
);

// Get Page by ID
export const getPageById = createAsyncThunk<PageItem, number>(
  "pages/getPageById",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await pageApi.getPageById(id);
      // console.log("res", res)
      return res;
    } catch (err: any) {
      message.error(err?.message || "Failed to fetch page");
      return rejectWithValue(err.message);
    }
  }
);

// Get Page by type
export const getPageByType = createAsyncThunk<{ items: PageItem[], meta: Meta }, Params>(
  "pages/getPageByType",
  async (param, { rejectWithValue }) => {
    try {
      const res = await pageApi.getPageByType(param);
      // console.log("res", res)
      return res;
    } catch (err: any) {
      message.error(err?.message || "Failed to fetch page");
      return rejectWithValue(err.message);
    }
  }
);

// Toggle Page Status
export const togglePageStatus = createAsyncThunk<PageItem, number>(
  "pages/togglePageStatus",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await pageApi.togglePage(id);
      message.success(res?.message);
      return res.data;
    } catch (err: any) {
      message.error(err?.message || "Failed to toggle status");
      return rejectWithValue(err.message);
    }
  }
);

// --- Slice ---

interface PageState {
  items: PageItem[];
  meta: Meta;
  loading: boolean;
  error: string | null;
  page: PageItem | null;
}

const initialState: PageState = {
  items: [],
  meta: { currentPage: 1, itemCount: 0, totalItems: 0, totalPages: 0, itemsPerPage: 0 },
  loading: false,
  error: null,
  page: null
};

const pageSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Pages
    builder
      .addCase(fetchPages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPages.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.meta = action.payload.meta;
        state.loading = false;
      })
      .addCase(fetchPages.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch pages";
      });
    // Fetch Pages by type
    builder
      .addCase(getPageByType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPageByType.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.meta = action.payload.meta;
        state.loading = false;
      })
      .addCase(getPageByType.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch pages";
      });

    // Search Pages
    builder
      .addCase(searchPages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchPages.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.meta = action.payload.meta;
        state.loading = false;
      })
      .addCase(searchPages.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Failed to search pages";
      });

    // Create Page
    builder
      .addCase(createPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPage.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(createPage.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Failed to create page";
      });

    // Update Page
    builder
      .addCase(updatePage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePage.fulfilled, (state, action) => {
        const index = state.items.findIndex((i) => i.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
        state.loading = false;
      })
      .addCase(updatePage.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Failed to update page";
      });

    // Delete Page
    builder
      .addCase(deletePage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePage.fulfilled, (state, action) => {
        state.items = state.items.filter((i) => i.id !== action.payload);
        state.loading = false;
      })
      .addCase(deletePage.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete page";
      });

    // Get Page by ID
    builder
      .addCase(getPageById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPageById.fulfilled, (state, action) => {
        state.page = action.payload;
        state.loading = false;
      })
      .addCase(getPageById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch page";
      });

    // Toggle Page Status
    builder
      .addCase(togglePageStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(togglePageStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex((i) => i.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
        state.loading = false;
      })
      .addCase(togglePageStatus.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Failed to toggle status";
      });
  },
});

export default pageSlice.reducer;
