// store/packagesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { FetchFilePayload, FileParams, Meta } from "@/types/utils-type";
import { FileItem, FilePayload } from "@/types/file";
import fileApi from "@/lib/api/fileApi";
import { message } from "antd";

// ================= Async Thunks =================

// Fetch
export const fetchFiles = createAsyncThunk<
  { items: FileItem[]; meta: Meta },
  FetchFilePayload
>("files/fetchFiles", async ({ params }, { rejectWithValue }) => {
  try {
    const res = await fileApi.getFile(params);
    // console.log(res, "files")
    return res;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

interface ToggleFilePayload {
  id: number
}
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
export const createFile = createAsyncThunk<
  FileItem,
  { params: FileParams; data: FilePayload },
  { rejectValue: string }
>(
  "files/createFile",
  async ({ params, data }, { rejectWithValue }) => {
    try {
      const res = await fileApi.createFile(params, data);
      // console.log("res", res)
      message.success(res?.message)
      return res as FileItem;
    } catch (error: any) {
      message.error("Failed to create file")
      return rejectWithValue(error?.message || "Failed to create file");
    }
  }
);



// Toggle Status
export const toggleFileStatus = createAsyncThunk<
  FileItem,
  ToggleFilePayload,
  { rejectValue: string }
>(
  "files/toggleFilesStatus",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await fileApi.toggleFile(id);
      message.success(res.message)
      return res.data as FileItem;
    } catch (err: any) {
      message.error("Failed toggle image")
      return rejectWithValue(err?.message || "Failed to toggle itinerary status");
    }
  }
)




// Delete
export const deleteFile = createAsyncThunk<
  { id: number }, // return only the deleted id
  ToggleFilePayload,
  { rejectValue: string }
>(
  "files/deleteFile",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await fileApi.deleteFile(id);
      message.success(res.message)
      return { id: id };
    } catch (err: any) {
      message.error("Failed to delete image")
      return rejectWithValue(err?.message || "Failed to delete itinerary");
    }
  }
);

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
    builder
      .addCase(createFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFile.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.meta.itemCount += 1;
        state.meta.totalItems += 1;
        state.loading = false;
      })
      .addCase(createFile.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload || "Failed to create itinerary";
        state.loading = false;
      });

    // toggle
    builder
      .addCase(toggleFileStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleFileStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(toggleFileStatus.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload || "Failed to toggle itinerary status";
        state.loading = false;
      });

    // delete
    builder
      .addCase(deleteFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload.id);
        state.meta.itemCount -= 1;
        state.meta.totalItems -= 1;
        state.loading = false;
      })
      .addCase(deleteFile.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload || "Failed to delete itinerary";
        state.loading = false;
      });
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
