import testimonialApi from "@/lib/api/testimonialApi";
import { TestimonialPayload, TestimonialItem } from "@/types/testimonials";
import { Meta, Params } from "@/types/utils-type";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";

// ================= Async Thunks =================

// Create testimonial
export const createTestimonial = createAsyncThunk<
  TestimonialItem,
  { values: TestimonialPayload }
>("testimonials/createTestimonials", async ({ values }, { rejectWithValue }) => {
  try {
    const res = await testimonialApi.createTestimonial(values);
    return res;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

// Get testimonials
export const getTestimonials = createAsyncThunk<
  { items: TestimonialItem[]; meta: Meta },
  Params
>("testimonials/getTestimonials", async (params, { rejectWithValue }) => {
  try {
    const res = await testimonialApi.getTestimonial(params);
    return res;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});
export const searchTestimonials = createAsyncThunk<
  { items: TestimonialItem[]; meta: Meta },
  { params: Params }
>("testimonials/searchTestimonials", async ({ params }, { rejectWithValue }) => {
  try {
    const res = await testimonialApi.searchTesimonial(params);
    return res;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

// Delete testimonial
export const deleteTestimonial = createAsyncThunk<
  number, // return deleted testimonial id
  number  // testimonial id to delete
>("testimonials/deleteTestimonial", async (id, { rejectWithValue }) => {
  try {
    await testimonialApi.deleteTestimonial(id);
    return id;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

// Get testimonial by ID
export const getTestimonialById = createAsyncThunk<
  TestimonialItem, // returns the testimonial object
  number           // testimonial ID to fetch
>(
  "testimonials/getTestimonialById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await testimonialApi.getTestimonialById(id); // call correct API
      // console.log("res", res)
      return res; // return testimonial object
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Toggle testimonial status
export const toggleTestimonialStatus = createAsyncThunk<
  TestimonialItem, // return updated testimonial
  number           // testimonial id to toggle
>("testimonials/toggleTestimonialStatus", async (id, { rejectWithValue }) => {
  try {
    const res = await testimonialApi.toggleTestimonial(id);
    // console.log(res.data)
    message.success(res?.message)
    return res.data;
  } catch (err: any) {
    message.error(err?.message)
    return rejectWithValue(err.message);
  }
});

// Update testimonial
export const updateTestimonial = createAsyncThunk<
  TestimonialItem, // returns updated testimonial
  { id: number; values: TestimonialPayload } // payload: id + updated data
>(
  "testimonials/updateTestimonial",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const res = await testimonialApi.updateTesimonial(id, values);
      message.success("Testimonial updated successfully");
      return res;
    } catch (err: any) {
      message.error(err.message || "Update failed");
      return rejectWithValue(err.message);
    }
  }
);

// ================= State Types =================
interface TestimonialState {
  items: TestimonialItem[];
  meta: Meta;
  loading: boolean;
  error: string | null;
  testimonial: TestimonialItem | null
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
  testimonial: null
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
        state.items.unshift(action.payload); // add to top
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
    // ===== search TESTIMONIALS =====
    builder
      .addCase(searchTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        searchTestimonials.fulfilled,
        (state, action: PayloadAction<{ items: TestimonialItem[]; meta: Meta }>) => {
          state.loading = false;
          state.items = action.payload.items;
          state.meta = action.payload.meta;
        },
      )
      .addCase(searchTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // ===== DELETE TESTIMONIAL =====
    builder
      .addCase(deleteTestimonial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTestimonial.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.meta.totalItems -= 1;
      })
      .addCase(deleteTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // ===== TOGGLE TESTIMONIAL STATUS =====
    builder
      .addCase(toggleTestimonialStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleTestimonialStatus.fulfilled, (state, action: PayloadAction<TestimonialItem>) => {
        state.loading = false;
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(toggleTestimonialStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    // get by id
    builder
      .addCase(getTestimonialById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTestimonialById.fulfilled, (state, action: PayloadAction<TestimonialItem>) => {
        state.loading = false;
        state.testimonial = action.payload
      })
      .addCase(getTestimonialById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    // ===== UPDATE TESTIMONIAL =====
    builder
      .addCase(updateTestimonial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTestimonial.fulfilled, (state, action: PayloadAction<TestimonialItem>) => {
        state.loading = false;
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload; // update existing item in array
        }
        // Also update single testimonial if it's being edited
        if (state.testimonial?.id === action.payload.id) {
          state.testimonial = action.payload;
        }
      })
      .addCase(updateTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default testimonialSlice.reducer;
