import { configureStore } from "@reduxjs/toolkit";
import engagementReducer from "./slices/engagementSlice";

const store = configureStore({
  reducer: {
    engagement: engagementReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
