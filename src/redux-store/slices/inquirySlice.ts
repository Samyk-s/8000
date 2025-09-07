// store/packagesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { FetchPackagePayload, Meta, Params } from "@/types/utils-type";
import { ItineraryItem } from "@/types/itinerary";
import itineraryApi from "@/lib/api/itineraryApi";
import { InquiryItem } from "@/types/inquiry";
import inquiryApi from "@/lib/api/inquiryApi";

// ================= Async Thunks =================

// Fetch
export const fetchInquiries = createAsyncThunk<
  { items: InquiryItem[]; meta: Meta },
  { params: Params }
>("inquiries/fetchInquiries", async ({ params }, { rejectWithValue }) => {
  try {
    const res = await inquiryApi.getInquiries(params);
    console.log("res", "res")
    return res;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

// Define payloads

interface TogglePackagePayload {
  packageId: number;
  itineraryId: number;
}

interface DeleteItineraryPayload {
  packageId: number;
  itineraryId: number;
}

// Create
// export const createItinerary = createAsyncThunk<
//   ItineraryItem,
//   CreateItineraryPayload,
//   { rejectValue: string }
// >("itineraries/createItineraries", async ({ id, data }, { rejectWithValue }) => {
//   try {
//     const res = await itineraryApi.createItinerary(id, data as ItineraryItem);
//     return res.data;
//   } catch (error: any) {
//     return rejectWithValue(error?.message || "Failed to create itinerary");
//   }
// });

// Toggle Status
// export const toggleItineraryStatus = createAsyncThunk<
//   ItineraryItem,
//   TogglePackagePayload,
//   { rejectValue: string }
// >(
//   "itineraries/toggleItinerariesStatus",
//   async ({ packageId, itineraryId }, { rejectWithValue }) => {
//     try {
//       const res = await itineraryApi.toggleItinerary(packageId, itineraryId);
//       return res.data as ItineraryItem;
//     } catch (err: any) {
//       return rejectWithValue(err?.message || "Failed to toggle itinerary status");
//     }
//   }
// );

// Update
// export const updateItinerary = createAsyncThunk<
//   ItineraryItem,
//   UpdateItineraryPayload,
//   { rejectValue: string }
// >(
//   "itineraries/updateItinerary",
//   async ({ packageId, itineraryId, data }, { rejectWithValue }) => {
//     try {
//       const res = await itineraryApi.updateItinerary(packageId, itineraryId, data as ItineraryItem);
//       console.log(res.data, "data")
//       return res.data as ItineraryItem;
//     } catch (err: any) {
//       return rejectWithValue(err?.message || "Failed to update itinerary");
//     }
//   }
// );

// Delete
// export const deleteItinerary = createAsyncThunk<
//   { id: number }, // return only the deleted id
//   DeleteItineraryPayload,
//   { rejectValue: string }
// >(
//   "itineraries/deleteItinerary",
//   async ({ packageId, itineraryId }, { rejectWithValue }) => {
//     try {
//       await itineraryApi.deleteItinerary(packageId, itineraryId);
//       return { id: itineraryId };
//     } catch (err: any) {
//       return rejectWithValue(err?.message || "Failed to delete itinerary");
//     }
//   }
// );

//search
// export const searchItineraries = createAsyncThunk<
//   { items: ItineraryItem[]; meta: Meta },
//   FetchPackagePayload
// >("itineraries/searchItineraries", async ({ id, params }, { rejectWithValue }) => {
//   try {
//     const res = await itineraryApi.searchItinerary(id, params);
//     return res;
//   } catch (err: any) {
//     return rejectWithValue(err.message);
//   }
// });
// ================= State =================
interface InquiryState {
  items: InquiryItem[];
  meta: Meta;
  error: string | null;
  loading: boolean;
}

const initialState: InquiryState = {
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
const inquiriesSlice = createSlice({
  name: "itineraries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch
    builder
      .addCase(fetchInquiries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInquiries.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.meta = action.payload.meta;
        state.loading = false;
      })
      .addCase(fetchInquiries.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload || "Failed to fetch itineraries";
        state.loading = false;
      });

    // create
    // builder
    //   .addCase(createItinerary.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(createItinerary.fulfilled, (state, action) => {
    //     state.items.push(action.payload);
    //     state.meta.itemCount += 1;
    //     state.meta.totalItems += 1;
    //     state.loading = false;
    //   })
    // .addCase(createItinerary.rejected, (state, action: PayloadAction<any>) => {
    //   state.error = action.payload || "Failed to create itinerary";
    //   state.loading = false;
    // });

    // toggle
    // builder
    //   .addCase(toggleItineraryStatus.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(toggleItineraryStatus.fulfilled, (state, action) => {
    //     const index = state.items.findIndex((item) => item.id === action.payload.id);
    //     if (index !== -1) {
    //       state.items[index] = action.payload;
    //     }
    //     state.loading = false;
    //   })
    // .addCase(toggleItineraryStatus.rejected, (state, action: PayloadAction<any>) => {
    //   state.error = action.payload || "Failed to toggle itinerary status";
    //   state.loading = false;
    // });

    // update
    // builder
    //   .addCase(updateItinerary.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(updateItinerary.fulfilled, (state, action) => {
    //     const index = state.items.findIndex((item) => item.id === action.payload.id);
    //     if (index !== -1) {
    //       state.items[index] = action.payload;
    //     }
    //     state.loading = false;
    //   })
    //   .addCase(updateItinerary.rejected, (state, action: PayloadAction<any>) => {
    //     state.error = action.payload || "Failed to update itinerary";
    //     state.loading = false;
    //   });

    // delete
    // builder
    //   .addCase(deleteItinerary.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(deleteItinerary.fulfilled, (state, action) => {
    //     state.items = state.items.filter((item) => item.id !== action.payload.id);
    //     state.meta.itemCount -= 1;
    //     state.meta.totalItems -= 1;
    //     state.loading = false;
    //   })
    //   .addCase(deleteItinerary.rejected, (state, action: PayloadAction<any>) => {
    //     state.error = action.payload || "Failed to delete itinerary";
    //     state.loading = false;
    //   });
    // //search
    // builder.addCase(searchItineraries.pending, (state) => {
    //   state.loading = true;
    // })
    // .addCase(searchItineraries.fulfilled, (state, action: PayloadAction<any>) => {
    //   state.items = action.payload.items;
    //   state.meta = action.payload.meta
    //   state.loading = false;
    // })
    // .addCase(searchItineraries.rejected, (state, action: PayloadAction<any>) => {
    //   state.error = action.payload;
    //   state.loading = false;
    // })
  },
});

// ================= Export =================
export default inquiriesSlice.reducer;
