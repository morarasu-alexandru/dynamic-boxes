import { createSlice } from "@reduxjs/toolkit";
import { DynamicTableColors } from "../../types";
import { RootState } from "../index";

interface InitialState {
  table: { rows: DynamicTableColors };
}

const initialState: InitialState = {
  table: {
    rows: [],
  },
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    updateBoxes(state, { payload }: { payload: DynamicTableColors }) {
      state.table.rows = payload;
    },
  },
});

export const selectTable = (state: RootState): { rows: DynamicTableColors } =>
  state.board.table;
export const { updateBoxes } = boardSlice.actions;

export const boardReducer = boardSlice.reducer;
