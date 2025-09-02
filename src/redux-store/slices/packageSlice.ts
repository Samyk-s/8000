// store/packagesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import packageApi from "@/lib/api/packageApi";
import { Package } from "@/types/package";
import { Meta, Params } from "@/types/utils-type";

// --- Step 1: create async thunk for fetching packages
export const fetchPackages = createAsyncThunk(
  "packages/fetchPackages",
  async (params: Params, { rejectWithValue }) => {
    try {
      const res = await packageApi.getPackages(params);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// create async thunk for add packages
export const createPackage = createAsyncThunk(
  "packages/createPackage",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await packageApi.createPackage(data)
      return res;
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

// --- Step 2: create initial state
interface PackageState {
  items: Package[];
  meta: Meta;
  error: string | null;
  loading: boolean;
}

const initialState: PackageState = {
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

// --- Step 3: create slice
const packagesSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPackages.fulfilled, (state, action: PayloadAction<{ items: Package[]; meta: Meta }>) => {
        state.items = action.payload.items;
        state.meta = action.payload.meta;
        state.loading = false;
      })
      .addCase(fetchPackages.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});
// --- Step 4: export reducer
export default packagesSlice.reducer;
