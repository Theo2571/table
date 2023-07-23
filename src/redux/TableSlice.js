import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const BASE_URL = "https://jsonplaceholder.typicode.com";
const initialState = {
  table: [],
};

export const getTable = createAsyncThunk("table/getTable", async (data) => {
  const res = await axios.get(`${BASE_URL}/posts`, data);
  return res.data;
});

export const userSlice = createSlice({
  name: "table",
  initialState,
  reducers: {},
  extraReducers: {
    [getTable.pending]: (state) => {
      state.loading = true;
    },
    [getTable.fulfilled]: (state, action) => {
      state.table = action.payload;
      state.loading = false;
    },
    [getTable.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export const userSliceReducer = userSlice.reducer;
