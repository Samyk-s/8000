import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { SiteSettingItem, SettingPayload } from "@/types/site-setting";
import siteSettingApi from "@/lib/api/siteSettingApi";
import { message } from "antd";

// ================= Async Thunks =================

// Fetch site setting (single record)
export const fetchSetting = createAsyncThunk<
  SiteSettingItem,
  void,
  { rejectValue: string }
>("setting/fetchSetting", async (_, { rejectWithValue }) => {
  try {
    const res = await siteSettingApi.getSiteSetting();
    return res as SiteSettingItem;
  } catch (err: any) {
    return rejectWithValue(err?.message || "Failed to fetch setting");
  }
});

// Update site setting
export const updateSetting = createAsyncThunk<
  SiteSettingItem,
  SettingPayload,
  { rejectValue: string }
>("setting/updateSetting", async (data, { rejectWithValue }) => {
  try {
    const res = await siteSettingApi.updageSitsetting(data);
    message.success("Setting updated successfully");
    return res.data as SiteSettingItem;
  } catch (err: any) {
    message.error(err?.message || "Failed to update setting");
    return rejectWithValue(err?.message || "Failed to update setting");
  }
});

// ================= State =================
interface SettingState {
  item: SiteSettingItem | null;
  loading: boolean;
  error: string | null;
}

const initialState: SettingState = {
  item: null,
  loading: false,
  error: null,
};

// ================= Slice =================
const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // Fetch
    builder
      .addCase(fetchSetting.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSetting.fulfilled, (state, action: PayloadAction<SiteSettingItem>) => {
        state.item = action.payload;
        state.loading = false;
      })
      .addCase(fetchSetting.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch setting";
        state.loading = false;
      });

    // Update
    builder
      .addCase(updateSetting.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSetting.fulfilled, (state, action: PayloadAction<SiteSettingItem>) => {
        state.item = action.payload; // ✅ updated item replaces old
        state.loading = false;
      })
      .addCase(updateSetting.rejected, (state, action) => {
        state.error = action.payload || "Failed to update setting";
        state.loading = false;
      });
  },
});

export default settingSlice.reducer;
