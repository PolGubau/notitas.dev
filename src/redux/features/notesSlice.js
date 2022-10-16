import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage } from "../../utils/storage/getLocalStorage";
import { LOCAL_STORAGE_KEY } from "../../utils/constants";
import { updateLocalStorage } from "../../utils/storage/updateLocalStorage";

const notesSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    loadData: (state, action) => {
      // const data = getLocalStorage(LOCAL_STORAGE_KEY);
      const data = ["1", "2"];
      state.content = data;
    },
  },
});

export const { loadData: loadDataActioncreator } = notesSlice.actions;

export default notesSlice.reducer;
