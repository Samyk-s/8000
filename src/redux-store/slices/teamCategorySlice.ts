import teamsApi from "@/lib/api/teamsApi";
import { Meta } from "@/types/booking";
import { TeamCatgoryItem } from "@/types/teams";
import { Params } from "@/types/utils-type";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


// get team category 
// get alll
export const fetchTeamsCategories = createAsyncThunk<
  { items: TeamCatgoryItem[]; meta: Meta },
  { params: Params }
>("reviews/fetchAllReviews", async ({ params }, { rejectWithValue }) => {
  try {
    const res = await teamsApi.getBlogCategory(params);
    console.log(res, "teams")
    return res;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});



interface TeamCategoryState {
  items: TeamCatgoryItem[],
  meta: Meta;
  error: string | null;
  loading: boolean;
}

const initialState: TeamCategoryState = {
  items: [],
  meta: {
    currentPage: 1,
    itemCount: 0,
    totalItems: 0,
    totalPages: 0,
    itemsPerPage: 0,
  },
  error: null,
  loading: false,
};

const teamCategoriesSlice = createSlice({
  name: "itineraries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch
    builder
      .addCase(fetchTeamsCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamsCategories.fulfilled, (state, action) => {
        state.items = action.payload?.items;
        state.meta = action.payload?.meta
        state.loading = false;
      })
      .addCase(fetchTeamsCategories.rejected, (state, action) => {
        state.error = action.payload as any
        state.loading = false;
      })
  }
})
export default teamCategoriesSlice.reducer;