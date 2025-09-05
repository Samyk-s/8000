// store/packagesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { FetchFilePayload, Meta } from "@/types/utils-type";
import { FileItem } from "@/types/file";
import fileApi from "@/lib/api/fileApi";

// ================= Async Thunks =================

// Fetch
export const fetchFiles = createAsyncThunk<
  { items: FileItem[]; meta: Meta },
  FetchFilePayload
>("files/fetchFiles", async ({ params }, { rejectWithValue }) => {
  try {
    const res = await fileApi.getFile(params);
    console.log(res, "files")
    return res;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

// Define payloads
// interface CreateItineraryPayload {
//   id: number;
//   data: Partial<ItineraryItem>;
// }
// interface TogglePackagePayload {
//   packageId: number;
//   itineraryId: number;
// }
// interface UpdateItineraryPayload {
//   packageId: number;
//   itineraryId: number;
//   data: Partial<ItineraryItem>;
// }
// interface DeleteItineraryPayload {
//   packageId: number;
//   itineraryId: number;
// }

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
interface FileState {
  items: FileItem[];
  meta: Meta;
  error: string | null;
  loading: boolean;
}

const initialState: FileState = {
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
const filesSlice = createSlice({
  name: "itineraries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch
    builder
      .addCase(fetchFiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.meta = action.payload.meta;
        state.loading = false;
      })
      .addCase(fetchFiles.rejected, (state, action: PayloadAction<any>) => {
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
    //   .addCase(createItinerary.rejected, (state, action: PayloadAction<any>) => {
    //     state.error = action.payload || "Failed to create itinerary";
    //     state.loading = false;
    //   });

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
    //   .addCase(toggleItineraryStatus.rejected, (state, action: PayloadAction<any>) => {
    //     state.error = action.payload || "Failed to toggle itinerary status";
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
    //search
    // builder.addCase(searchItineraries.pending, (state) => {
    //   state.loading = true;
    // })
    //   .addCase(searchItineraries.fulfilled, (state, action: PayloadAction<any>) => {
    //     state.items = action.payload.items;
    //     state.meta = action.payload.meta
    //     state.loading = false;
    //   })
    //   .addCase(searchItineraries.rejected, (state, action: PayloadAction<any>) => {
    //     state.error = action.payload;
    //     state.loading = false;
    //   })
  },
});

// ================= Export =================
export default filesSlice.reducer;
