import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/userSlice";
import feedReducer from "./features/feedSlice";
import connectionReducer from "./features/connectionSLice";
import requestReducer from "./features/requestSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connection: connectionReducer,
    requests: requestReducer,
  },
});

export default store;
