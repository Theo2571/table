import { configureStore } from "@reduxjs/toolkit";
import { userSliceReducer } from "./TableSlice";
export const store = configureStore({
  reducer: {
    userReducer: userSliceReducer,
  },
});
export default store;
