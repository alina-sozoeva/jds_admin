import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  foto: null,
};

export const newsSlice = createSlice({
  name: "newsFoto",
  initialState,
  reducers: {
    addFoto: (state, action) => {
      state.foto = action.payload;
    },
    clearFoto: (state, action) => {
      state.foto = null;
    },
  },
});

export const { addFoto, clearFoto } = newsSlice.actions;
