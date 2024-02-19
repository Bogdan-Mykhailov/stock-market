import {createSlice} from "@reduxjs/toolkit";

interface SharesState {

}

const initialState: SharesState = {
  isDarkTheme: false,
};

const shares = createSlice({
  name: 'shares',
  initialState,
  reducers: {

  }
})

export const { } = shares.actions;
export const sharesSlice = shares.reducer;
