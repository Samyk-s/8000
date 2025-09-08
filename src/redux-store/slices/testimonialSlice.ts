import testimonialApi from "@/lib/api/testimonialApi";
import { TestimonialPayload, TestimonialItem } from "@/types/testimonials";
import { Meta, Params } from "@/types/utils-type";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// ================= Async Thunks =================

// Create testimonial
export const createTestimonial = createAsyncThunk<
  TestimonialItem, // returns single item
  { values: TestimonialPayload }
>("testimonials/createTestimonials", async ({ values }, { rejectWithValue }) => {
  try {
    const res = await testimonialApi.createTestimonial(values);
    // console.log("res", res)
    return res;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

// Get testimonials (with pagination/filters)
export const getTestimonials = createAsyncThunk<
  { items: TestimonialItem[]; meta: Meta },
  Params
>("testimonials/getTestimonials", async (params, { rejectWithValue }) => {
  try {
    const res = await testimonialApi.getTestimonial(params);
    console.log("testimonial", res)
    return res;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

// ================= State Types =================
interface TestimonialState {
  items: TestimonialItem[];
  meta: Meta;
  loading: boolean;
  error: string | null;
}

// ================= Initial State =================
const initialState: TestimonialState = {
  items: [],
  meta: {
    totalPages: 0,
    currentPage: 1,
    itemCount: 0,
    itemsPerPage: 0,
    totalItems: 0,
  },
  loading: false,
  error: null,
};

// ================= Slice =================
const testimonialSlice = createSlice({
  name: "testimonials",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ===== CREATE TESTIMONIAL =====
    builder
      .addCase(createTestimonial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTestimonial.fulfilled, (state, action: PayloadAction<TestimonialItem>) => {
        state.loading = false;
        // Push new testimonial at the top
        state.items.push(action.payload);
        // Increase totalItems count
        state.meta.totalItems += 1;
      })
      .addCase(createTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // ===== GET TESTIMONIALS =====
    builder
      .addCase(getTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getTestimonials.fulfilled,
        (state, action: PayloadAction<{ items: TestimonialItem[]; meta: Meta }>) => {
          state.loading = false;
          state.items = action.payload.items;
          state.meta = action.payload.meta;
        },
      )
      .addCase(getTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default testimonialSlice.reducer;
