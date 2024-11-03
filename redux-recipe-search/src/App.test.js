import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

import App from "./App.js";
import { initialState } from "./redux/reducer.js";
import createStoreTest from "./utilities/testHelperFunctions.js";

describe("App component", () => {
  it("should render App component", () => {
    const appStore = createStoreTest({ ...initialState });
    render(
      <Provider store={appStore}>
        <App />
      </Provider>
    );
    expect(screen.getByTestId("app-wrapper")).toBeInTheDocument();
  });
});
