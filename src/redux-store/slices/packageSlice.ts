// store/packagesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import packageApi from "@/lib/api/packageApi";
import { Package } from "@/types/package";
import { Meta, Params } from "@/types/utils-type";

// ================= Async Thunks =================

// fetch all packages
export const fetchPackages = createAsyncThunk<{ items: Package[]; meta: Meta }, Params>(
  "packages/fetchPackages",
  async (params, { rejectWithValue }) => {
    try {
      const res = await packageApi.getPackages(params);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// create a new package
export const createPackage = createAsyncThunk<Package, any>(
  "packages/createPackage",
  async (data) => {
    try {
      const res = await packageApi.createPackage(data);
      return res;
    } catch (error: any) {
      return error?.message;
    }
  }
);

// toggle package status
export const togglePackageStatus = createAsyncThunk<Package, number>(
  "packages/togglePackageStatus",
  async (id: number) => {
    try {
      const res = await packageApi.togglePackage(id);
      return res;
    } catch (error: any) {
      return error.message;
    }
  }
);

// ================= State =================
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

// ================= Slice =================
const packagesSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchPackages
    builder
      .addCase(fetchPackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPackages.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.meta = action.payload.meta;
        state.loading = false;
      })
      .addCase(fetchPackages.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload || "Failed to fetch packages";
        state.loading = false;
      });

    // createPackage
    builder
      .addCase(createPackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPackage.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.meta.itemCount += 1;
        state.meta.totalItems += 1;
        state.loading = false;
      })
      .addCase(createPackage.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload || "Failed to create package";
        state.loading = false;
      });

    // togglePackageStatus
    builder
      .addCase(togglePackageStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(togglePackageStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex(pkg => pkg.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(togglePackageStatus.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Failed to toggle package status";
      });
  },
});

// ================= Export =================
export default packagesSlice.reducer;
