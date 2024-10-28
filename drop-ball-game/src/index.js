import React from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App";
import store from "./redux/store";

const root = createRoot(document.getElementById("root"));
if (store) {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("The `store` is undefined");
}
