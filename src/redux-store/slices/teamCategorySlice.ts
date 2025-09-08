import teamsApi from "@/lib/api/teamsApi";
import { Meta } from "@/types/booking";
import { TeamCatgoryItem } from "@/types/teams";
import { Params } from "@/types/utils-type";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";


// get team category 
// get alll
export const fetchTeamsCategories = createAsyncThunk<
  { items: TeamCatgoryItem[]; meta: Meta },
  { params?: Params }
>("teamCategoreis/fetchAllTeamsCategories", async ({ params }, { rejectWithValue }) => {
  try {
    const res = await teamsApi.getBlogCategory(params as Params);
    // console.log(res, "teams")
    return res;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});
// search
export const searchTeamCategory = createAsyncThunk<
  { items: TeamCatgoryItem[]; meta: Meta },
  { params?: Params }
>("teamCategoreis/searchTeamsCategories", async ({ params }, { rejectWithValue }) => {
  try {
    const res = await teamsApi.searchTeamCategory(params as Params);
    console.log(res, "jsbfsdk ")
    return res;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});
//toggle team

export const toggleTeamCategory = createAsyncThunk<
  TeamCatgoryItem, // return type
  number,   // argument type
  { rejectValue: string }
>(
  "teamsCategories/toggleTeamsCategory",
  async (id, { rejectWithValue }) => {
    try {
      // Assuming toggle API expects an ID
      const res = await teamsApi.toggleTeamCategory(id);
      // console.log(res, "team toggled");
      message.success(res?.message)
      return res.data;
    } catch (err: any) {
      message.error(err?.message)
      return rejectWithValue(err.message);
    }
  }
);



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
    //SEARCH
    builder
      .addCase(searchTeamCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchTeamCategory.fulfilled, (state, action) => {
        state.items = action.payload.items
        state.meta = action.payload.meta
        state.loading = false;
      })
      .addCase(searchTeamCategory.rejected, (state, action) => {
        state.error = action.payload as any
        state.loading = false;
      });
    //toggle
    builder
      .addCase(toggleTeamCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleTeamCategory.fulfilled, (state, action) => {
        // Update the specific team item in the state
        const updatedTeam = action.payload;
        const index = state.items.findIndex(item => item.id === updatedTeam.id);
        if (index !== -1) {
          state.items[index] = updatedTeam;
        }
        state.loading = false;
      })
      .addCase(toggleTeamCategory.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  }
})
export default teamCategoriesSlice.reducer;