import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { FetchPackagePayload, Meta } from "@/types/utils-type";
import { DepartureItem } from "@/types/departure";
import departureApi from "@/lib/api/departureApi";
import { message } from "antd";

// ================= Async Thunks =================

// Fetch departures
export const fetchDepartures = createAsyncThunk<
  { items: DepartureItem[]; meta: Meta },
  FetchPackagePayload,
  { rejectValue: string }
>("departures/fetchDepartures", async ({ id, params }, { rejectWithValue }) => {
  try {
    const res = await departureApi.getDeparture(id, params);
    return res;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

// Create departure payload
interface CreateDeparturePayload {
  id: number;
  data: Partial<DepartureItem>;
}

// Toggle/Delete payload
interface DeparturePayload {
  packageId: number;
  departureId: number;
}

// Create departure
export const createDeparture = createAsyncThunk<
  DepartureItem,
  CreateDeparturePayload,
  { rejectValue: string }
>("departures/createDeparture", async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await departureApi.createDeparture(id, data as DepartureItem);
    // console.log(res, "create")
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err?.message || "Failed to create departure");
  }
});

// Toggle departure status
export const toggleDepartureStatus = createAsyncThunk<
  DepartureItem,
  DeparturePayload,
  { rejectValue: string }
>("departures/toggleDepartureStatus", async ({ packageId, departureId }, { rejectWithValue }) => {
  try {
    const res = await departureApi.toggleDeparture(packageId, departureId);
    message.success(res?.message)
    return res.data as DepartureItem;
  } catch (err: any) {
    message.error("Failed to toggle")
    return rejectWithValue(err?.message || "Failed to toggle departure status");
  }
});

// Delete departure
export const deleteDeparture = createAsyncThunk<
  { id: number },
  DeparturePayload,
  { rejectValue: string }
>("departures/deleteDeparture", async ({ packageId, departureId }, { rejectWithValue }) => {
  try {
    const res = await departureApi.deleteDeparture(packageId, departureId);
    message.success(res?.message)
    return { id: departureId };
  } catch (err: any) {
    message.error("Failed to delete")
    return rejectWithValue(err?.message || "Failed to delete departure");
  }
});

//search
export const searchDeparture = createAsyncThunk<
  { items: DepartureItem[]; meta: Meta },
  FetchPackagePayload
>("itineraries/searchItineraries", async ({ id, params }, { rejectWithValue }) => {
  try {
    const res = await departureApi.searchDeparture(id, params);
    return res;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});
// ================= State =================
interface DepartureState {
  items: DepartureItem[];
  meta: Meta;
  error: string | null;
  loading: boolean;
}

const initialState: DepartureState = {
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
const departuresSlice = createSlice({
  name: "departures",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch
    builder
      .addCase(fetchDepartures.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepartures.fulfilled, (state, action: PayloadAction<{ items: DepartureItem[]; meta: Meta }>) => {
        state.items = action.payload?.items
        state.meta = action.payload?.meta;
        state.loading = false;
      })
      .addCase(fetchDepartures.rejected, (state, action) => {
        state.error = action.payload as string || "Failed to fetch departures";
        state.loading = false;
      });

    // Create
    builder
      .addCase(createDeparture.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDeparture.fulfilled, (state, action: PayloadAction<DepartureItem>) => {
        if (!Array.isArray(state.items)) state.items = [];
        state.items.push(action.payload);
        state.meta.itemCount += 1;
        state.meta.totalItems += 1;
        state.loading = false;
      })
      .addCase(createDeparture.rejected, (state, action) => {
        state.error = action.payload as string || "Failed to create departure";
        state.loading = false;
      });

    // Toggle
    builder
      .addCase(toggleDepartureStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleDepartureStatus.fulfilled, (state, action: PayloadAction<DepartureItem>) => {
        if (Array.isArray(state.items)) {
          const index = state.items.findIndex((item) => item.id === action.payload.id);
          if (index !== -1) state.items[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(toggleDepartureStatus.rejected, (state, action) => {
        state.error = action.payload as string || "Failed to toggle departure status";
        state.loading = false;
      });

    // Delete
    builder
      .addCase(deleteDeparture.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDeparture.fulfilled, (state, action: PayloadAction<{ id: number }>) => {
        if (Array.isArray(state.items)) {
          state.items = state.items.filter((item) => item.id !== action.payload.id);
        }
        state.meta.itemCount = Math.max(0, state.meta.itemCount - 1);
        state.meta.totalItems = Math.max(0, state.meta.totalItems - 1);
        state.loading = false;
      })
      .addCase(deleteDeparture.rejected, (state, action) => {
        state.error = action.payload as string || "Failed to delete departure";
        state.loading = false;
      });
    //search
    builder.addCase(searchDeparture.pending, (state) => {
      state.loading = true;
    })
      .addCase(searchDeparture.fulfilled, (state, action: PayloadAction<any>) => {
        state.items = action.payload.items;
        state.meta = action.payload.meta
        state.loading = false;
      })
      .addCase(searchDeparture.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.loading = false;
      })
  },
});

export default departuresSlice.reducer;
