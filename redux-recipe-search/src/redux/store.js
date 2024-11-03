import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer.js";
import thunk from "redux-thunk";

const store = configureStore({
  reducer: reducer,
  middleware: [thunk],
});

export default store;
