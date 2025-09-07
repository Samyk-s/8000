// store/packagesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Meta, Params } from "@/types/utils-type";
import { InquiryItem } from "@/types/inquiry";
import inquiryApi from "@/lib/api/inquiryApi";
import { message } from "antd";

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





// Delete
export const deleteInquiry = createAsyncThunk<
  { id: number },
  { id: number },
  { rejectValue: string }
>(
  "inquiries/deleteInquiries",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await inquiryApi.deleteInquiry(id);
      message.success(res?.message)
      return { id };
    } catch (err: any) {
      message.error("Failed to delete inquiry")
      return rejectWithValue(err?.message || "Failed to delete Inquiry");
    }
  }
);
// get by id
export const getInquiry = createAsyncThunk<
  InquiryItem,
  number,
  { rejectValue: string }
>(
  "inquiries/getInquiriesById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await inquiryApi.getInquiryById(id);
      // Return the actual inquiry data
      // console.log("res", res)
      return res as InquiryItem;

    } catch (err: any) {
      message.error("Failed to fetch inquiry");
      return rejectWithValue(err?.message || "Failed to fetch Inquiry");
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
interface InquiryState {
  items: InquiryItem[];
  meta: Meta;
  error: string | null;
  loading: boolean;
  inquiry: InquiryItem | null
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
  inquiry: null
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
    // get by id
    builder
      .addCase(getInquiry.pending, (state) => {
        state.error = null;
      })
      .addCase(getInquiry.fulfilled, (state, action) => {

        state.inquiry = action.payload;
        state.loading = false;
      })
      .addCase(getInquiry.rejected, (state, action: PayloadAction<any>) => {
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


    // delete
    builder
      .addCase(deleteInquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteInquiry.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload.id);
        state.meta.itemCount -= 1;
        state.meta.totalItems -= 1;
        state.loading = false;
      })
      .addCase(deleteInquiry.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload || "Failed to delete itinerary";
        state.loading = false;
      });
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
