// store/packagesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { FetchPackagePayload, Meta, Params } from "@/types/utils-type";
import { ReviewItem, ReviewPayloads } from "@/types/packge-review";
import reviewApi from "@/lib/api/reviewApi";
import { message } from "antd";

// ================= Async Thunks =================

// Fetch
export const fetchReviews = createAsyncThunk<
  { items: ReviewItem[]; meta: Meta },
  FetchPackagePayload
>("reviews/fetchReviews", async ({ id, params }, { rejectWithValue }) => {
  try {
    const res = await reviewApi.getPackageReviews(id, params);
    // console.log(res, "reviews")
    return res;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});
export const fetchReview = createAsyncThunk<
  ReviewItem,
  { reviewId: number },
  { rejectValue: string }
>(
  "reviews/fetchReviewById",
  async ({ reviewId }, { rejectWithValue }) => {
    try {
      const res = await reviewApi.getReviewById(reviewId);
      // console.log(res, "reviews");
      return res as any;
    } catch (err: any) {
      return rejectWithValue(err?.message || "Failed to fetch review");
    }
  }
);
// get alll
export const getAllReviews = createAsyncThunk<
  { items: ReviewItem[]; meta: Meta },
  { params: Params }
>("reviews/fetchAllReviews", async ({ params }, { rejectWithValue }) => {
  try {
    const res = await reviewApi.getAllReviews(params);
    // console.log(res, "reviews")
    return res;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});


// Define payloads
interface CreateReviewPayload {
  id: number;
  data: ReviewPayloads;
}
interface ReviewPayload {
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
export const toggleReviewStatus = createAsyncThunk<
  ReviewItem,
  ReviewPayload,
  { rejectValue: string }
>(
  "reviews/toggleReviewsStatus",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await reviewApi.toggleReview(id);
      message.success(res?.message)
      return res.data;
    } catch (err: any) {
      message.error("Failed to toggle")
      return rejectWithValue(err?.message || "Failed to toggle itinerary status");
    }
  }
);

// create
export const createReview = createAsyncThunk<
  ReviewItem,
  CreateReviewPayload,
  { rejectValue: string }
>(
  "itineraries/updateItinerary",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await reviewApi.createReview(id, data);
      return res.data as ReviewItem;
    } catch (err: any) {
      return rejectWithValue(err?.message || "Failed to update itinerary");
    }
  }
);

// Delete
export const deleteReview = createAsyncThunk<
  { id: number }, // return only the deleted id
  ReviewPayload,
  { rejectValue: string }
>(
  "reviews/deleteReview",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await reviewApi.deleteReview(id);
      message.success(res.message)
      return { id };
    } catch (err: any) {
      message.error("Failed to delete")
      return rejectWithValue(err?.message || "Failed to delete Review");
    }
  }
);

//search
export const searchReviews = createAsyncThunk<
  { items: ReviewItem[]; meta: Meta },
  { params: Params }
>("reviews/searchReviews", async ({ params }, { rejectWithValue }) => {
  try {
    const res = await reviewApi.searchReviews(params);
    return res;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});
export const searchReviewsBypackage = createAsyncThunk<
  { items: ReviewItem[]; meta: Meta },
  FetchPackagePayload
>("reviews/searchReviewsPackages", async ({ params }, { rejectWithValue }) => {
  try {
    const res = await reviewApi.searchReviews(params);
    return res;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});
// ================= State =================
interface ReviewState {
  items: ReviewItem[];
  meta: Meta;
  error: string | null;
  loading: boolean;
  review: ReviewItem | null
}

const initialState: ReviewState = {
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
  review: null
};

// ================= Slice =================
const reviewsSlice = createSlice({
  name: "itineraries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.items = action.payload as any;
        state.meta = action.payload.meta;
        state.loading = false;
      })
      .addCase(fetchReviews.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload || "Failed to fetch itineraries";
        state.loading = false;
      });
    builder
      .addCase(fetchReview.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(fetchReview.fulfilled, (state, action) => {
        state.review = action.payload as any;
        state.loading = false;
      })
      .addCase(fetchReview.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload || "Failed to fetch itineraries";
        state.loading = false;
      });
    // get all
    builder
      .addCase(getAllReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllReviews.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.meta = action.payload.meta;
        state.loading = false;
      })
      .addCase(getAllReviews.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload || "Failed to fetch itineraries";
        state.loading = false;
      });

    // create
    builder
      .addCase(createReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.meta.itemCount += 1;
        state.meta.totalItems += 1;
        state.loading = false;
      })
      .addCase(createReview.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload || "Failed to create itinerary";
        state.loading = false;
      });

    // toggle
    builder
      .addCase(toggleReviewStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleReviewStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(toggleReviewStatus.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload || "Failed to toggle itinerary status";
        state.loading = false;
      });

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
    builder
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload.id);
        if (state.meta) {
          state.meta.itemCount = Math.max(0, state.meta.itemCount - 1);
          state.meta.totalItems = Math.max(0, state.meta.totalItems - 1);
        }
        state.loading = false;
      })

      .addCase(deleteReview.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload || "Failed to delete itinerary";
        state.loading = false;
      });
    //search
    builder.addCase(searchReviews.pending, (state) => {
      state.loading = true;
    })
      .addCase(searchReviews.fulfilled, (state, action: PayloadAction<any>) => {
        state.items = action.payload.items;
        state.meta = action.payload.meta
        state.loading = false;
      })
      .addCase(searchReviews.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.loading = false;
      })
    builder.addCase(searchReviewsBypackage.pending, (state) => {
      state.loading = true;
    })
      .addCase(searchReviewsBypackage.fulfilled, (state, action: PayloadAction<any>) => {
        state.items = action.payload.items;
        state.meta = action.payload.meta
        state.loading = false;
      })
      .addCase(searchReviewsBypackage.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.loading = false;
      })
  },
});

// ================= Export =================
export default reviewsSlice.reducer;
