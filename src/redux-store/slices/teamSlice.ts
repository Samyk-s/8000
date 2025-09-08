import teamsApi from "@/lib/api/teamsApi";
import { Meta } from "@/types/booking";
import { TeamCatgoryItem, TeamPayload } from "@/types/teams";
import { Params } from "@/types/utils-type";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


// get team category 
// get alll
export const createTeam = createAsyncThunk<
  { items: TeamCatgoryItem[]; meta: Meta },
  { values: TeamPayload }
>("teams/createTeams", async ({ values }, { rejectWithValue }) => {
  try {
    const res = await teamsApi.createTeam(values);
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

const teamSlice = createSlice({
  name: "itineraries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch
    builder
      .addCase(createTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        // state.items = state.items.push(action.payload as any);

        state.loading = false;
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.error = action.payload as any
        state.loading = false;
      })
  }
})
export default teamSlice.reducer;