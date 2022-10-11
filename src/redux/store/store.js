import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "../features/categorySlice";

const store = configureStore({
  reducer: {
    categories: categorySlice,
  },
});

export default store;
