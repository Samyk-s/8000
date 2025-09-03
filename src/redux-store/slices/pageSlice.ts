import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { PageItem } from "@/types/page";
import { Meta, Params } from "@/types/utils-type";
import pageApi from "@/lib/api/pageApi";

export const fetchPages = createAsyncThunk<{ items: PageItem[]; meta: Meta }, Params>(
  "packages/fetchPackages",
  async (params: Params, { rejectWithValue }) => {
    try {
      const res = await pageApi.getPages(params);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

interface PageItemState {
  items: PageItem[];
  meta: Meta;
  error: string | null;
  loading: boolean;
}

const initialState: PageItemState = {
  items: [],
  meta: {
    currentPage: 1,
    itemCount: 0,
    totalItems: 0,
    totalPages: 0,
    itemsPerPage: 0
  },
  error: null,
  loading: false
}

const pageSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
        state.error = action.payload || "Failed to fetch pages";
        state.loading = false;
      });

  }
})

export default pageSlice.reducer;
