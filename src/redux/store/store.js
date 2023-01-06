import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "../features/categorySlice";
import notesSlice from "../features/notesSlice";
const store = configureStore({
  reducer: {
    notes: notesSlice,
  },
});

export default store;
