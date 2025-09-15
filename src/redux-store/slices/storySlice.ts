import summitterApi from "@/lib/api/summitterApi";
import { StoryPayload, StoryItem } from "@/types/summitter";
import { Meta, Params } from "@/types/utils-type";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";

/**
 * ================
 * Types
 * ================
 */
interface SummiterStoryPayloadForm {
  id: number; // summitter id
  payload: StoryPayload;
}

interface SummiterStoryState {
  items: StoryItem[];
  meta: Meta;
  loading: boolean;
  error: string | null;
  currentStory?: StoryItem | null;
}

/**
 * ================
 * Initial State
 * ================
 */
const initialState: SummiterStoryState = {
  items: [],
  meta: {
    currentPage: 1,
    totalPages: 0,
    itemCount: 0,
    itemsPerPage: 0,
    totalItems: 0,
  },
  loading: false,
  error: null,
  currentStory: null,
};

/**
 * ================
 * Async Thunks
 * ================
 */

// Create Story
export const createSummitterStory = createAsyncThunk<
  StoryItem,
  SummiterStoryPayloadForm,
  { rejectValue: string }
>("summiterStory/createStory", async ({ id, payload }, { rejectWithValue }) => {
  try {
    const res = await summitterApi.createSummitterStory(id, payload);
    message.success(res?.message || "Summiter story created successfully");
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to create summiter story");
  }
});

// Fetch Stories (All)
export const fetchSummitterStories = createAsyncThunk<
  { items: StoryItem[]; meta: Meta },
  Params | undefined,
  { rejectValue: string }
>("summiterStory/fetchAll", async (params, { rejectWithValue }) => {
  try {
    const res = await summitterApi.getSummitterStories(params as Params);
    return {
      items: res.items as StoryItem[],
      meta: res.meta as Meta,
    };
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to fetch stories");
  }
});
// search Stories
export const searchchSummitterStories = createAsyncThunk<
  { items: StoryItem[]; meta: Meta },
  Params | undefined,
  { rejectValue: string }
>("summiterStory/searchAll", async (params, { rejectWithValue }) => {
  try {
    const res = await summitterApi.searchSummitterStories(params as Params);
    return {
      items: res.items as StoryItem[],
      meta: res.meta as Meta,
    };
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to fetch stories");
  }
});

// Update Story
export const updateSummitterStory = createAsyncThunk<
  StoryItem,
  { id: number; payload: StoryPayload },
  { rejectValue: string }
>("summiterStory/update", async ({ id, payload }, { rejectWithValue }) => {
  try {
    const res = await summitterApi.updateSummitterStory(id, payload);
    message.success(res?.message || "Summitter story updated successfully");
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to update story");
  }
});

// Delete Story
export const deleteSummitterStory = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("summiterStory/delete", async (id, { rejectWithValue }) => {
  try {
    const res = await summitterApi.deleteSummitterStory(id);
    message.success(res?.message || "Summitter story deleted successfully");
    return id;
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to delete story");
  }
});

// Toggle Story status
export const toggleSummitterStory = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("summiterStory/toggle", async (id, { rejectWithValue }) => {
  try {
    const res = await summitterApi.toggleSummitterStory(id);
    message.success(res?.message || "Story status toggled successfully");
    return id;
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to toggle story");
  }
});
// ==================
// Get Story By ID
// ==================
export const fetchSummitterStoryById = createAsyncThunk<
  StoryItem,
  number,
  { rejectValue: string }
>("summiterStory/fetchById", async (id, { rejectWithValue }) => {
  try {
    const res = await summitterApi.getSummitterStoryById(id);
    return res as StoryItem;
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to fetch story by id");
  }
});


/**
 * ================
 * Slice
 * ================
 */
const summiterStorySlice = createSlice({
  name: "summiterStory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // CREATE
    builder
      .addCase(createSummitterStory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSummitterStory.fulfilled, (state, action: PayloadAction<StoryItem>) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(createSummitterStory.rejected, (state, action) => {
        state.error = action.payload || "Failed to create story";
        state.loading = false;
      });

    // FETCH ALL
    builder
      .addCase(fetchSummitterStories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSummitterStories.fulfilled,
        (state, action: PayloadAction<{ items: StoryItem[]; meta: Meta }>) => {
          state.items = action.payload.items;
          state.meta = action.payload.meta;
          state.loading = false;
        }
      )
      .addCase(fetchSummitterStories.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch stories";
        state.loading = false;
      });
    // SEARCH ALL
    builder
      .addCase(searchchSummitterStories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        searchchSummitterStories.fulfilled,
        (state, action: PayloadAction<{ items: StoryItem[]; meta: Meta }>) => {
          state.items = action.payload.items;
          state.meta = action.payload.meta;
          state.loading = false;
        }
      )
      .addCase(searchchSummitterStories.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch stories";
        state.loading = false;
      });


    // UPDATE
    builder
      .addCase(updateSummitterStory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSummitterStory.fulfilled, (state, action: PayloadAction<StoryItem>) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateSummitterStory.rejected, (state, action) => {
        state.error = action.payload || "Failed to update story";
        state.loading = false;
      });

    // DELETE
    builder
      .addCase(deleteSummitterStory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSummitterStory.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteSummitterStory.rejected, (state, action) => {
        state.error = action.payload || "Failed to delete story";
        state.loading = false;
      });

    // TOGGLE
    builder
      .addCase(toggleSummitterStory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleSummitterStory.fulfilled, (state, action: PayloadAction<number>) => {
        const index = state.items.findIndex((item) => item.id === action.payload);
        if (index !== -1) {
          state.items[index].status = state.items[index].status === 1 ? 0 : 1;
        }
        state.loading = false;
      })
      .addCase(toggleSummitterStory.rejected, (state, action) => {
        state.error = action.payload || "Failed to toggle story";
        state.loading = false;
      });
    // GET BY ID
    builder
      .addCase(fetchSummitterStoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSummitterStoryById.fulfilled, (state, action: PayloadAction<StoryItem>) => {
        state.currentStory = action.payload;
        state.loading = false;
      })
      .addCase(fetchSummitterStoryById.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch story by id";
        state.loading = false;
      });

  },
});

export default summiterStorySlice.reducer;
