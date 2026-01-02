import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSkillsByUserApi } from "./skillsApi";

export const fetchSkillsByUser = createAsyncThunk(
  "skills/fetchByUser",
  async (userId, { rejectWithValue }) => {
    try {
      return await fetchSkillsByUserApi(userId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load skills"
      );
    }
  }
);

const skillsSlice = createSlice({
  name: "skills",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkillsByUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSkillsByUser.fulfilled, (state, action) => {
        state.status = "success";
        state.list = action.payload;
      })
      .addCase(fetchSkillsByUser.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export default skillsSlice.reducer;
