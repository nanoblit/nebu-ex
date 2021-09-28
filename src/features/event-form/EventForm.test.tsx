import { render, screen } from "@testing-library/react";

import EventForm from "./EventForm";
import { store } from "../../app/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { theme } from "../../App";
import GlobalStyle from "../../styles/global.style";
import userEvent from "@testing-library/user-event";

describe("event form", () => {
  const setup = () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <EventForm />
        </ThemeProvider>
      </Provider>
    );

    return {
      firstNameInput: screen.getByLabelText("First name") as HTMLInputElement,
      lastNameInput: screen.getByLabelText("Last name") as HTMLInputElement,
      emailInput: screen.getByLabelText("Email") as HTMLInputElement,
      eventDateInput: screen.getByLabelText("Event date") as HTMLInputElement,
      submitButton: screen.getByText("Submit"),
    };
  };

  beforeEach(() => jest.useFakeTimers("modern"));

  afterAll(() => jest.useRealTimers());

  it("should show the event form", () => {
    const {
      firstNameInput,
      lastNameInput,
      emailInput,
      eventDateInput,
      submitButton,
    } = setup();
    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(eventDateInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("should show and hide the event created message", async () => {
    const { firstNameInput, lastNameInput, emailInput, submitButton } = setup();

    userEvent.type(firstNameInput, "John");
    userEvent.type(lastNameInput, "Doe");
    userEvent.type(emailInput, "john.doe@gmail.com");

    expect(screen.queryByText("Event created!")).not.toBeInTheDocument();
    userEvent.click(submitButton);
    expect(await screen.findByText("Event created!")).toBeInTheDocument();
    // jest.runAllTimers();
    // expect(screen.queryByText("Event created!")).not.toBeInTheDocument();
  });

  it("should show errors", async () => {
    const { submitButton } = setup();

    userEvent.click(submitButton);

    expect(await screen.findAllByText(/^Please enter/)).toBeInstanceOf(Array);
  });
});
