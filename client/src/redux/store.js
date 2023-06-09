import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import userDetailsReducer from "./features/userDetailsSlice";
import entryReducer from "./features/entrySlice";

export default configureStore({
  reducer: {
    userAuth: userReducer,
    userDetails: userDetailsReducer,
    entries: entryReducer,
  },
});
