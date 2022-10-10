import { configureStore } from "@reduxjs/toolkit";
import notesSlice from "./features/notesSlice";
// ...

const store = configureStore({
  reducer: {
    notes: notesSlice,
  },
});

export default store;
