// store/packagesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { FetchPackagePayload, Meta } from "@/types/utils-type";
import { ItineraryItem } from "@/types/itinerary";
import itineraryApi from "@/lib/api/itineraryApi";

// ================= Async Thunks =================

export const fetchItineraries = createAsyncThunk<
  { items: any[]; meta: Meta }, // replace any with your PackageItem type
  FetchPackagePayload
>(
  "itineraries/fetchItineraries",
  async ({ id, params }, { rejectWithValue }) => {
    try {
      const res = await itineraryApi.getItenerary(id, params);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);


// Define the payload shape
interface CreateItineraryPayload {
  id: number;
  data: Partial<ItineraryItem>; // or whatever structure your API expects
}

// create a new itinerary
export const createItinerary = createAsyncThunk<
  ItineraryItem,              // Return type
  CreateItineraryPayload,     // Payload type
  { rejectValue: string }     // Rejected value type
>(
  "packages/createPackage",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await itineraryApi.createItinerary(id, data as ItineraryItem);
      return res as ItineraryItem;
    } catch (error: any) {
      return rejectWithValue(error?.message || "Failed to create itinerary");
    }
  }
);

// toggle package status
// export const togglePackageStatus = createAsyncThunk<Package, number>(
//   "packages/togglePackageStatus",
//   async (id: number) => {
//     try {
//       const res = await packageApi.togglePackage(id);
//       return res.data
//     } catch (err: any) {
//       console.log("err", err)
//       return err.message;
//     }
//   }
// );

// ================= State =================
interface ItineraryState {
  items: ItineraryItem[];
  meta: Meta;
  error: string | null;
  loading: boolean;
}

const initialState: ItineraryState = {
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
const itinerariesSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchPackages
    builder
      .addCase(fetchItineraries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItineraries.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.meta = action.payload.meta;
        state.loading = false;
      })
      .addCase(fetchItineraries.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload || "Failed to fetch packages";
        state.loading = false;
      });

    // createPackage
    builder
      .addCase(createItinerary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createItinerary.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.meta.itemCount += 1;
        state.meta.totalItems += 1;
        state.loading = false;
      })
      .addCase(createItinerary.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload || "Failed to create package";
        state.loading = false;
      });

    // togglePackageStatus
    // builder
    //   .addCase(togglePackageStatus.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(togglePackageStatus.fulfilled, (state, action) => {
    //     const index = state.items.findIndex(pkg => pkg.id === action.payload.id);
    //     if (index !== -1) {
    //       state.items[index] = action.payload;
    //     }
    //     state.loading = false;
    //     state.error = null;
    //   })
    //   .addCase(togglePackageStatus.rejected, (state, action: PayloadAction<any>) => {
    //     state.loading = false;
    //     state.error = action.payload || "Failed to toggle package status";
    //   });
  },
});

// ================= Export =================
export default itinerariesSlice.reducer;
