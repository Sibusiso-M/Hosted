import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

import PageHeader from "./PageHeader";
import { initialState } from "../../redux/reducer.js";
import createStoreTest from "../../utilities/testHelperFunctions.js";

describe("PageHeader component", () => {
  it("should render", () => {
    const appStore = createStoreTest({ ...initialState });
    render(
      <Provider store={appStore}>
        <PageHeader />
      </Provider>
    );
    expect(
      screen.getByRole("heading", { name: /welcome to recipe search/i })
    ).toBeInTheDocument();
  });
});
