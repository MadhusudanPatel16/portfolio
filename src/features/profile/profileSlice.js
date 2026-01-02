import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPublicProfileApi } from "./profileApi";

// Async thunk
export const fetchPublicProfile = createAsyncThunk(
  "profile/fetchPublicProfile",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchPublicProfileApi();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load profile"
      );
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    status: "idle", // idle | loading | success | error
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublicProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPublicProfile.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(fetchPublicProfile.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
