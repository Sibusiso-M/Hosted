import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import reducer from "../redux/reducer.js";

export default function createStoreTest(initialState) {
  return configureStore({
    reducer: reducer,
    preloadedState: initialState,
    middleware: [thunk],
  });
}
