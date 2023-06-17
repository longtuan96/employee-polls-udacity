import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import NewPollPage from ".";
import { store } from "../../redux/store";

describe("NewPoll", () => {
  it("should render the component", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPollPage />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });

  it("should display all required elements", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <NewPollPage />
        </BrowserRouter>
      </Provider>
    );

    const firstOptionInputElement = component.getByTestId("firstOptionInput");
    const secondOptionInputElement = component.getByTestId("secondOptionInput");
    const submitButton = component.getByTestId("submit-btn");
    expect(submitButton.textContent).toBe("Submit");

    fireEvent.change(firstOptionInputElement, {
      target: { value: "something 1" },
    });
    fireEvent.change(secondOptionInputElement, {
      target: { value: "something 2" },
    });
    expect(firstOptionInputElement.value).toBe("something 1");
    expect(secondOptionInputElement.value).toBe("something 2");
  });
});
