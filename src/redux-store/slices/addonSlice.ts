import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { FetchPackagePayload, Meta } from "@/types/utils-type";
import { AddOnItem, AddOnPayload } from "@/types/addOns";
import addonsApi from "@/lib/api/addonsApi";
import { message } from "antd";

// ================= Async Thunks =================

// Fetch AddOns
export const fetchAddons = createAsyncThunk<
  { items: AddOnItem[]; meta: Meta },
  FetchPackagePayload,
  { rejectValue: string }
>("addons/fetchAddons", async ({ id, params }, { rejectWithValue }) => {
  try {
    const res = await addonsApi.getAddons(id, params);
    return res;
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to fetch addons");
  }
});

// Create AddOn
interface CreateAddonPayload {
  packageId: number;
  data: AddOnPayload;
}
export const createAddon = createAsyncThunk<
  AddOnItem,
  CreateAddonPayload,
  { rejectValue: string }
>("addons/createAddon", async ({ packageId, data }, { rejectWithValue }) => {
  try {
    const res = await addonsApi.createAddons(packageId, data);
    message.success(res?.message || "Addon created successfully");
    return res.data as AddOnItem;
  } catch (err: any) {
    return rejectWithValue(err?.message || "Failed to create addon");
  }
});

// Toggle AddOn status
interface ToggleAddonPayload {
  packageId: number;
  addonId: number;
}
export const toggleAddonStatus = createAsyncThunk<
  AddOnItem,
  ToggleAddonPayload,
  { rejectValue: string }
>("addons/toggleAddonStatus", async ({ packageId, addonId }, { rejectWithValue }) => {
  try {
    const res = await addonsApi.toggleAddons(packageId, addonId);
    message.success(res?.message || "Addon status updated");
    return res.data as AddOnItem;
  } catch (err: any) {
    message.error("Failed to toggle addon status");
    return rejectWithValue(err?.message || "Failed to toggle addon status");
  }
});

// Delete AddOn
export const deleteAddon = createAsyncThunk<
  { id: number },
  ToggleAddonPayload,
  { rejectValue: string }
>("addons/deleteAddon", async ({ packageId, addonId }, { rejectWithValue }) => {
  try {
    const res = await addonsApi.deleteAddons(packageId, addonId);
    message.success(res?.message || "Addon deleted successfully");
    return { id: addonId };
  } catch (err: any) {
    message.error("Failed to delete addon");
    return rejectWithValue(err?.message || "Failed to delete addon");
  }
});

// Search AddOns
export const searchAddons = createAsyncThunk<
  { items: AddOnItem[]; meta: Meta },
  FetchPackagePayload,
  { rejectValue: string }
>("addons/searchAddons", async ({ id, params }, { rejectWithValue }) => {
  try {
    const res = await addonsApi.searchAddons(id, params);
    return res;
  } catch (err: any) {
    return rejectWithValue(err?.message || "Failed to search addons");
  }
});
interface GetAddonByIdPayload {
  packageId: number;
  addonId: number;
}

export const getAddonById = createAsyncThunk<
  AddOnItem,
  GetAddonByIdPayload,
  { rejectValue: string }
>(
  "addons/getAddonById",
  async ({ packageId, addonId }, { rejectWithValue }) => {
    try {
      const res = await addonsApi.getAddonById(packageId, addonId);
      return res.data as AddOnItem;
    } catch (err: any) {
      return rejectWithValue(err?.message || "Failed to fetch addon");
    }
  }
);
interface UpdateAddonPayload {
  packageId: number;
  addonId: number;
  data: AddOnPayload;
}

export const updateAddon = createAsyncThunk<
  AddOnItem,
  UpdateAddonPayload,
  { rejectValue: string }
>(
  "addons/updateAddon",
  async ({ packageId, addonId, data }, { rejectWithValue }) => {
    try {
      const res = await addonsApi.upateAddon(packageId, addonId, data);
      message.success(res?.message || "Addon updated successfully");
      return res.data as AddOnItem;
    } catch (err: any) {
      message.error(err?.message || "Failed to update addon");
      return rejectWithValue(err?.message || "Failed to update addon");
    }
  }
);


// ================= State =================
interface AddonsState {
  items: AddOnItem[];
  meta: Meta;
  loading: boolean;
  error: string | null;
  addon: AddOnItem | null
}

const initialState: AddonsState = {
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
  addon: null
};

// ================= Slice =================
const addonsSlice = createSlice({
  name: "addons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch
    builder
      .addCase(fetchAddons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAddons.fulfilled,
        (state, action: PayloadAction<{ items: AddOnItem[]; meta: Meta }>) => {
          state.items = action.payload.items;
          state.meta = action.payload.meta;
          state.loading = false;
        }
      )
      .addCase(fetchAddons.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch addons";
        state.loading = false;
      });

    // Create
    builder
      .addCase(createAddon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAddon.fulfilled, (state, action: PayloadAction<AddOnItem>) => {
        state.items.push(action.payload);
        state.meta.itemCount += 1;
        state.meta.totalItems += 1;
        state.loading = false;
      })
      .addCase(createAddon.rejected, (state, action) => {
        state.error = action.payload || "Failed to create addon";
        state.loading = false;
      });

    // Toggle
    builder
      .addCase(toggleAddonStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleAddonStatus.fulfilled, (state, action: PayloadAction<AddOnItem>) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
        state.loading = false;
      })
      .addCase(toggleAddonStatus.rejected, (state, action) => {
        state.error = action.payload || "Failed to toggle addon status";
        state.loading = false;
      });

    // Delete
    builder
      .addCase(deleteAddon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAddon.fulfilled, (state, action: PayloadAction<{ id: number }>) => {
        state.items = state.items.filter((item) => item.id !== action.payload.id);
        state.meta.itemCount = Math.max(0, state.meta.itemCount - 1);
        state.meta.totalItems = Math.max(0, state.meta.totalItems - 1);
        state.loading = false;
      })
      .addCase(deleteAddon.rejected, (state, action) => {
        state.error = action.payload || "Failed to delete addon";
        state.loading = false;
      });

    // Search
    builder
      .addCase(searchAddons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        searchAddons.fulfilled,
        (state, action: PayloadAction<{ items: AddOnItem[]; meta: Meta }>) => {
          state.items = action.payload.items;
          state.meta = action.payload.meta;
          state.loading = false;
        }
      )
      .addCase(searchAddons.rejected, (state, action) => {
        state.error = action.payload || "Failed to search addons";
        state.loading = false;
      });
    // Get AddOn by ID
    builder
      .addCase(getAddonById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAddonById.fulfilled, (state, action: PayloadAction<AddOnItem>) => {
        state.addon = action.payload; // store single addon
        state.loading = false;
      })
      .addCase(getAddonById.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch addon";
        state.loading = false;
      });
    // Update AddOn
    builder
      .addCase(updateAddon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAddon.fulfilled, (state, action: PayloadAction<AddOnItem>) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
        if (state.addon?.id === action.payload.id) state.addon = action.payload;
        state.loading = false;
      })
      .addCase(updateAddon.rejected, (state, action) => {
        state.error = action.payload || "Failed to update addon";
        state.loading = false;
      });

  },
});

export default addonsSlice.reducer;
