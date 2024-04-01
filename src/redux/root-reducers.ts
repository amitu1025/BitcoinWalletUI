import { combineReducers } from "@reduxjs/toolkit";
import usersReducer from "./users/usersSlice";

export const rootReducers = combineReducers({
  users: usersReducer,
});

export default rootReducers;
