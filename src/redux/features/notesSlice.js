import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage } from "../../utils/storage/getLocalStorage";
import { LOCAL_STORAGE_KEY } from "../../utils/constants";
import { updateLocalStorage } from "../../utils/storage/updateLocalStorage";

const notesSlice = createSlice({
  name: "notes",
  initialState: getLocalStorage(LOCAL_STORAGE_KEY)
    ? getLocalStorage(LOCAL_STORAGE_KEY)
    : [],
  reducers: {
    addNoteActioncreator: (state, action) => {
      state.push(action.payload);
      updateLocalStorage(LOCAL_STORAGE_KEY, state);
    },
    deleteNoteActioncreator: (state, action) => {
      const newState = state.filter((note) => note.id !== action.payload);
      updateLocalStorage(LOCAL_STORAGE_KEY, newState);
      return newState;
    },
  },
});

export const notesState = (state) => state.notes;
export const { addNoteActioncreator, deleteNoteActioncreator } =
  notesSlice.actions;

export default notesSlice.reducer;
