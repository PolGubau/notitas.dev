import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
  },
  reducers: {
    loadNotes: (notes, action) => ({
      notes: [...action.payload],
    }),
  },
});

export const { loadNotes: loadNotesActioncreator } = noteSlice.actions;

export default noteSlice.reducer;
