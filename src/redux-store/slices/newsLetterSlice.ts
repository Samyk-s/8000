// store/packagesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Meta, Params } from "@/types/utils-type";
import { InquiryItem } from "@/types/inquiry";
import inquiryApi from "@/lib/api/inquiryApi";
import { message } from "antd";
import { NewsLetterItem } from "@/types/news-letter";
import newsLetterApi from "@/lib/api/newsLetterApi";

// ================= Async Thunks =================

// Fetch
export const fetchNewsLetter = createAsyncThunk<
  { items: NewsLetterItem[]; meta: Meta },
  { params: Params }
>("newsletter/fetchNewsLetter", async ({ params }, { rejectWithValue }) => {
  try {
    const res = await newsLetterApi.getNewsLetter(params);
    // console.log("res", "res")
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
export const deleteNewsLetter = createAsyncThunk<
  { id: number },
  { id: number },
  { rejectValue: string }
>(
  "newsLetter/deleteNesLetter",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await newsLetterApi.deleteNewsLetter(id);
      message.success(res?.message)
      return { id };
    } catch (err: any) {
      message.error("Failed to delete news letter")
      return rejectWithValue(err?.message || "Failed to delete News Letter");
    }
  }
);
// get by id
export const getNewsLetter = createAsyncThunk<
  NewsLetterItem,
  number,
  { rejectValue: string }
>(
  "newsLetter/getNewsLetterById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await inquiryApi.getInquiryById(id);
      // Return the actual inquiry data
      // console.log("res", res)
      return res as NewsLetterItem;

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
interface NewsLetterState {
  items: NewsLetterItem[];
  meta: Meta;
  error: string | null;
  loading: boolean;
  inquiry: NewsLetterItem | null
}

const initialState: NewsLetterState = {
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
const newsLetterSlice = createSlice({
  name: "newsLetter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch
    builder
      .addCase(fetchNewsLetter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewsLetter.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.meta = action.payload.meta;
        state.loading = false;
      })
      .addCase(fetchNewsLetter.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload || "Failed to fetch itineraries";
        state.loading = false;
      });
    // get by id
    builder
      .addCase(getNewsLetter.pending, (state) => {
        state.error = null;
      })
      .addCase(getNewsLetter.fulfilled, (state, action) => {

        state.inquiry = action.payload;
        state.loading = false;
      })
      .addCase(getNewsLetter.rejected, (state, action: PayloadAction<any>) => {
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
      .addCase(deleteNewsLetter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNewsLetter.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload.id);
        state.meta.itemCount -= 1;
        state.meta.totalItems -= 1;
        state.loading = false;
      })
      .addCase(deleteNewsLetter.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload || "Failed to delete itinerary";
        state.loading = false;
      });
  },
});

// ================= Export =================
export default newsLetterSlice.reducer;
