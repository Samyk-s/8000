import summitterApi from "@/lib/api/summitterApi";
import { SummitterItem, SummiterPayload } from "@/types/summitter";
import { Meta, Params } from "@/types/utils-type";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";


interface updateSummiterPayload {
  id: number,
  payload: SummitterItem
}

// Async thunk to create a summiter
export const createSummiter = createAsyncThunk<
  SummitterItem,
  SummiterPayload,
  { rejectValue: string }
>(
  "summiter/createSummiter",
  async (payload: SummiterPayload, { rejectWithValue }) => {
    try {
      const res = await summitterApi.createSummiter(payload);
      message.success(res?.message || "Summiter created successfully");
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to create summiter");
    }
  }
);

// Fetch summiter list
export const fetchSummitters = createAsyncThunk<
  { items: SummitterItem[]; meta: Meta },
  Params | undefined,
  { rejectValue: string }
>(
  "summiter/fetchSummiter",
  async (params, { rejectWithValue }) => {
    try {
      const res = await summitterApi.getSummiters(params as Params);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Toggle summiter status
export const toggleSummiter = createAsyncThunk<
  SummitterItem,
  number,
  { rejectValue: string }
>("summiter/toggleSummiter", async (id, { rejectWithValue }) => {
  try {
    const res = await summitterApi.toggleSummiter(id);
    message.success(res?.message || "Summiter toggled successfully");
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to toggle summiter");
  }
});

// Delete summiter
export const deleteSummiter = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("summiter/deleteSummiter", async (id, { rejectWithValue }) => {
  try {
    const res = await summitterApi.deleteSummiter(id);
    message.success(res?.message);
    return id;
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to delete summiter");
  }
});
// fetch summiter by id
export const fetchSummiterById = createAsyncThunk<
  SummitterItem,
  number,
  { rejectValue: string }
>(
  "summiter/fetchSummiterById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await summitterApi.getSummterById(id);
      // console.log("res", res)
      return res;
    } catch (err: any) {
      message.error(err?.message)
      return rejectWithValue(err.message || "Failed to fetch summiter");
    }
  }
);

// update 
export const updateSummiter = createAsyncThunk<
  SummitterItem,
  updateSummiterPayload,
  { rejectValue: string }
>(
  "summiter/createSummiter",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const res = await summitterApi.updateSummter(id, payload as any);
      // console.log(res, "res")
      message.success(res?.message || "Summiter created successfully");
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to create summiter");
    }
  }
);

interface SummiterState {
  items: SummitterItem[];
  meta: Meta;
  loading: boolean;
  error: string | null;
  summitter: SummitterItem | null
}

const initialState: SummiterState = {
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
  summitter: null
};

const summiterSlice = createSlice({
  name: "summiter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // CREATE summiter
    builder
      .addCase(createSummiter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createSummiter.fulfilled,
        (state, action: PayloadAction<SummitterItem>) => {
          state.items.push(action.payload);
          state.loading = false;
        }
      )
      .addCase(createSummiter.rejected, (state, action) => {
        state.error = action.payload || "Failed to create summiter";
        state.loading = false;
      });

    // FETCH summiter list
    builder
      .addCase(fetchSummitters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSummitters.fulfilled,
        (state, action: PayloadAction<{ items: SummitterItem[]; meta: Meta }>) => {
          state.items = action.payload.items;
          state.meta = action.payload.meta;
          state.loading = false;
        }
      )
      .addCase(fetchSummitters.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch summitter list";
        state.loading = false;
      });

    // TOGGLE summiter
    builder
      .addCase(toggleSummiter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleSummiter.fulfilled, (state, action: PayloadAction<SummitterItem>) => {
        const index = state.items.findIndex((item: SummitterItem) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(toggleSummiter.rejected, (state, action) => {
        state.error = action.payload || "Failed to toggle summiter";
        state.loading = false;
      });

    // DELETE summiter
    builder
      .addCase(deleteSummiter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSummiter.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((item: SummitterItem) => item.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteSummiter.rejected, (state, action) => {
        state.error = action.payload || "Failed to delete summiter";
        state.loading = false;
      });
    // get summiter by id
    builder
      .addCase(fetchSummiterById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSummiterById.fulfilled, (state, action: PayloadAction<SummitterItem>) => {
        // console.log("payload", action.payload)
        state.summitter = action.payload
        state.loading = false;
      })
      .addCase(fetchSummiterById.rejected, (state, action) => {
        state.error = action.payload || "Failed to delete summiter";
        state.loading = false;
      });
  },
});

export default summiterSlice.reducer;
