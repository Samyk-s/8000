import teamsApi from "@/lib/api/teamsApi";
import { Meta } from "@/types/utils-type";
import { TeamCategoryPayload, TeamCatgoryItem } from "@/types/teams";
import { Params } from "@/types/utils-type";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";
interface UpdateTeamPayload {
  id: number;
  values: TeamCategoryPayload;
}


// get team category 
// get alll
export const fetchTeamsCategories = createAsyncThunk<
  { items: TeamCatgoryItem[]; meta: Meta },
  { params?: Params }
>("teamCategoreis/fetchAllTeamsCategories", async ({ params }, { rejectWithValue }) => {
  try {
    const res = await teamsApi.getTeamCategory(params as Params);
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
    // console.log(res, "jsbfsdk ")
    return res;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});
//toggle team category
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


// Delete team category
export const deleteTeamCategory = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>(
  "teamsCategories/deleteTeamCategory",
  async (id, { rejectWithValue }) => {
    try {
      const res = await teamsApi.deleteTeamCategory(id);
      message.success(res?.message);
      return id; // return deleted team's ID
    } catch (err: any) {
      message.error(err?.message);
      return rejectWithValue(err.message);
    }
  }
);

// get team by id
export const getTeamCategory = createAsyncThunk<
  TeamCatgoryItem,   // return type
  number,     // argument type
  { rejectValue: string }
>(
  "teamsCategories/getTeamCategory",
  async (id, { rejectWithValue }) => {
    try {
      const res = await teamsApi.getTeamCategoryId(id);
      // console.log("res", res)
      return res; // return the fetched TeamItem
    } catch (err: any) {
      message.error(err?.message);
      return rejectWithValue(err.message);
    }
  }
);

//create team
export const createTeamCategory = createAsyncThunk<
  { items: TeamCatgoryItem[]; meta: Meta },
  { values: TeamCategoryPayload }
>("teamsCategories/createTeamsCategory", async ({ values }, { rejectWithValue }) => {
  try {
    const res = await teamsApi.createTeamCategory(values);
    // console.log(res, "teams")
    return res;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

//update
export const updateTeamCategory = createAsyncThunk<
  TeamCatgoryItem,             // return type
  UpdateTeamPayload,    // argument type
  { rejectValue: string }
>(
  "teamsCategories/updateTeamCategory",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const res = await teamsApi.updateTeamCategory(id, values);
      message.success(res?.message || "Team updated successfully!");
      return res.data; // return updated TeamItem
    } catch (err: any) {
      message.error(err?.message || "Failed to update team");
      return rejectWithValue(err.message);
    }
  }
);


interface TeamCategoryState {
  items: TeamCatgoryItem[],
  meta: Meta;
  error: string | null;
  loading: boolean;
  teamCategory: TeamCatgoryItem | null
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
  teamCategory: null
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
    // delete
    builder
      .addCase(deleteTeamCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTeamCategory.fulfilled, (state, action: PayloadAction<number>) => {
        // Remove the deleted team from state.items
        state.items = state.items.filter(item => item.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteTeamCategory.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
    // get team by id
    builder
      .addCase(getTeamCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeamCategory.fulfilled, (state, action: PayloadAction<TeamCatgoryItem>) => {
        // Remove the deleted team from state.items
        state.teamCategory = action.payload
        state.loading = false;
      })
      .addCase(getTeamCategory.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
    // update team category
    builder
      .addCase(updateTeamCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTeamCategory.fulfilled, (state, action: PayloadAction<TeamCatgoryItem>) => {
        const updatedTeam = action.payload;
        // Update the team in the items array if it exists
        const index = state.items.findIndex(item => item.id === updatedTeam.id);
        if (index !== -1) {
          state.items[index] = updatedTeam;
        }
        // Also update the single team object (useful for edit form)
        state.teamCategory = updatedTeam;
        state.loading = false;
      })
      .addCase(updateTeamCategory.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
    // update
    builder
      .addCase(createTeamCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTeamCategory.fulfilled, (state, action: PayloadAction<any>) => {
        const updatedTeam = action.payload;
        // Update the team in the items array if it exists
        const index = state.items.findIndex(item => item.id === updatedTeam.id);
        if (index !== -1) {
          state.items[index] = updatedTeam;
        }
        // Also update the single team object (useful for edit form)
        state.teamCategory = updatedTeam;
        state.loading = false;
      })
      .addCase(createTeamCategory.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  }
})
export default teamCategoriesSlice.reducer;