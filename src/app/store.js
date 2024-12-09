import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/userSlice";
import feedReducer from "../features/feedSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
  },
});

export default store;
