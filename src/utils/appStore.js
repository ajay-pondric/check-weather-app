import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "../utils/locationSlice";
import themeReducer from "../utils/themeSlice";

const appStore = configureStore({
  reducer: {
    location: locationReducer,
    theme: themeReducer,
  }
});

export default appStore;

