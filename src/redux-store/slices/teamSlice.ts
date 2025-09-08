import teamsApi from "@/lib/api/teamsApi";
import { Meta } from "@/types/booking";
import { TeamCatgoryItem, TeamItem, TeamPayload } from "@/types/teams";
import { Params } from "@/types/utils-type";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";



// get alll
export const fetchTeams = createAsyncThunk<
  { items: TeamItem[]; meta: Meta },
  { params?: Params }
>("teams/fetchTeams", async ({ params }, { rejectWithValue }) => {
  try {
    const res = await teamsApi.getTeams(params as Params);
    console.log(res, "teams")
    return res;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});
// search
export const searchTeam = createAsyncThunk<
  { items: TeamItem[]; meta: Meta },
  { params?: Params }
>("teams/searchTeams", async ({ params }, { rejectWithValue }) => {
  try {
    const res = await teamsApi.searchTeam(params as Params);
    console.log(res, "teams")
    return res;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

//create team
export const createTeam = createAsyncThunk<
  { items: TeamItem[]; meta: Meta },
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
//toggle team

export const toggleTeam = createAsyncThunk<
  TeamItem, // return type
  number,   // argument type
  { rejectValue: string }
>(
  "teams/toggleTeams",
  async (id, { rejectWithValue }) => {
    try {
      // Assuming toggle API expects an ID
      const res = await teamsApi.toggleTeam(id);
      // console.log(res, "team toggled");
      message.success(res?.message)
      return res.data;
    } catch (err: any) {
      message.error(err?.message)
      return rejectWithValue(err.message);
    }
  }
);

// Delete team
export const deleteTeam = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>(
  "teams/deleteTeam",
  async (id, { rejectWithValue }) => {
    try {
      const res = await teamsApi.deleteTeam(id);
      message.success(res?.message);
      return id; // return deleted team's ID
    } catch (err: any) {
      message.error(err?.message);
      return rejectWithValue(err.message);
    }
  }
);


interface TeamState {
  items: TeamItem[],
  meta: Meta;
  error: string | null;
  loading: boolean;
}

const initialState: TeamState = {
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
      .addCase(fetchTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.items = action.payload.items
        state.meta = action.payload.meta
        state.loading = false;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.error = action.payload as any
        state.loading = false;
      });
    //SEARCH
    builder
      .addCase(searchTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchTeam.fulfilled, (state, action) => {
        state.items = action.payload.items
        state.meta = action.payload.meta
        state.loading = false;
      })
      .addCase(searchTeam.rejected, (state, action) => {
        state.error = action.payload as any
        state.loading = false;
      });

    //create
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
      });
    builder
      .addCase(toggleTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleTeam.fulfilled, (state, action) => {
        // Update the specific team item in the state
        const updatedTeam = action.payload;
        const index = state.items.findIndex(item => item.id === updatedTeam.id);
        if (index !== -1) {
          state.items[index] = updatedTeam;
        }
        state.loading = false;
      })
      .addCase(toggleTeam.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
    // delete
    builder
      .addCase(deleteTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTeam.fulfilled, (state, action: PayloadAction<number>) => {
        // Remove the deleted team from state.items
        state.items = state.items.filter(item => item.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteTeam.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });

  }
})
export default teamSlice.reducer;