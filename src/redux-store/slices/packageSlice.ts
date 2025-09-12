// store/packagesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import packageApi from "@/lib/api/packageApi";
import { PackageItem, PackagePayload } from "@/types/package";
import { Meta, Params } from "@/types/utils-type";
import { message } from "antd";

// ================= Async Thunks =================

// Fetch packages with pagination & filters
export const fetchPackages = createAsyncThunk<
  { items: PackageItem[]; meta: Meta },  // return type
  Params | undefined                     // argument type (optional)
>(
  "packages/fetchPackages",
  async (params, { rejectWithValue }) => {
    try {
      const res = await packageApi.getPackages(params as Params);

      return res;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Search packages
export const searchPackages = createAsyncThunk<
  { items: PackageItem[]; meta: Meta },
  { params: Params }
>("packages/searchPackages", async ({ params }, { rejectWithValue }) => {
  try {
    const res = await packageApi.searchPackages(params);
    console.log("search", res)
    return res;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

// Create a new package
export const createPackage = createAsyncThunk<
  PackageItem,
  PackagePayload
>("packages/createPackage", async (data, { rejectWithValue }) => {
  try {
    const res = await packageApi.createPackage(data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

// Update a package
export const updatePackage = createAsyncThunk<
  PackageItem,
  { id: number; data: PackagePayload }
>("packages/updatePackage", async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await packageApi.updagtePackage(id, data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

// get package by id a package
export const getPacakgeById = createAsyncThunk<PackageItem, number>(
  "packages/getPackage",
  async (id, { rejectWithValue }) => {
    try {
      const res = await packageApi.getPacakgeById(id);
      return res;
    } catch (err: any) {
      message.error("Failed to delete package");
      return rejectWithValue(err.message);
    }
  }
);

// Toggle package status
export const togglePackageStatus = createAsyncThunk<
  PackageItem,
  number
>("packages/togglePackageStatus", async (id, { rejectWithValue }) => {
  try {
    const res = await packageApi.togglePackage(id);
    message.success(res?.message || "Package status updated");
    return res.data;
  } catch (err: any) {
    message.error(err?.message || "Failed to toggle status");
    return rejectWithValue(err.message);
  }
});

// ================= State =================
interface PackageState {
  items: PackageItem[];
  meta: Meta;
  loading: boolean;
  error: string | null;
  currentPackage: PackageItem | null
}

const initialState: PackageState = {
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
  currentPackage: null
};

// ================= Slice =================
const packagesSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ===== Fetch Packages =====
    builder
      .addCase(fetchPackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPackages.fulfilled,
        (state, action: PayloadAction<{ items: PackageItem[]; meta: Meta }>) => {
          state.items = action.payload.items;
          state.meta = action.payload.meta;
          state.loading = false;
        }
      )
      .addCase(fetchPackages.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch packages";
      });

    // ===== Search Packages =====
    builder
      .addCase(searchPackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        searchPackages.fulfilled,
        (state, action: PayloadAction<{ items: PackageItem[]; meta: Meta }>) => {
          state.items = action.payload.items;
          state.meta = action.payload.meta;
          state.loading = false;
        }
      )
      .addCase(searchPackages.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Search failed";
      });

    // ===== Create Package =====
    builder
      .addCase(createPackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPackage.fulfilled, (state, action: PayloadAction<PackageItem>) => {
        state.items.unshift(action.payload);
        state.meta.totalItems += 1;
        state.loading = false;
      })
      .addCase(createPackage.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Failed to create package";
      });

    // ===== Update Package =====
    builder
      .addCase(updatePackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePackage.fulfilled, (state, action: PayloadAction<PackageItem>) => {
        const index = state.items.findIndex(pkg => pkg.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
        state.loading = false;
      })
      .addCase(updatePackage.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Failed to update package";
      });

    // ===== Delete Package =====
    builder
      .addCase(getPacakgeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPacakgeById.fulfilled, (state, action: PayloadAction<PackageItem>) => {
        state.currentPackage = action.payload
        state.loading = false;
      })
      .addCase(getPacakgeById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete package";
      });

    // ===== Toggle Package Status =====
    builder
      .addCase(togglePackageStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(togglePackageStatus.fulfilled, (state, action: PayloadAction<PackageItem>) => {
        const index = state.items.findIndex(pkg => pkg.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
        state.loading = false;
      })
      .addCase(togglePackageStatus.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Failed to toggle status";
      });
  },
});

// ================= Export =================
export default packagesSlice.reducer;
