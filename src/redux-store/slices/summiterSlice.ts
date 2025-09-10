import summitterApi from "@/lib/api/summitterApi";
import { SummitterItem, SummiterPayload } from "@/types/summitter";
import { Meta, Params } from "@/types/utils-type";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";


// Async thunk to create a summiter
export const createSummiter = createAsyncThunk<
  { item: SummitterItem },
  SummiterPayload,
  { rejectValue: string }
>(
  "summiter/createSummiter",
  async (payload: SummiterPayload, { rejectWithValue }) => {
    try {
      const res = await summitterApi.createSummiter(payload);
      message.success(res?.message)
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to create summiter");
    }
  }
);

export const fetchSummitters = createAsyncThunk<
  { items: SummitterItem[]; meta: Meta },  // return type
  Params | undefined                     // argument type (optional)
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


interface SummitterState {
  items: SummitterItem[];
  meta: Meta,
  loading: boolean;
  error: string | null
}

const initialState: SummitterState = {
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
}

const summiterSlice = createSlice({
  name: "summitter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSummiter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSummiter.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = true;
        state.error = null;
        state.items = state.items.push(action.payload) as any;
      })
      .addCase(createSummiter.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload || "Failed to fetch pages";
        state.loading = false;
      });
    //get summitters
    builder
      .addCase(fetchSummitters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSummitters.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.meta = action.payload.meta;
        state.loading = false;
      })
      .addCase(fetchSummitters.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload || "Failed to fetch pages";
        state.loading = false;
      });
  }
})

export default summiterSlice.reducer