/** @jest-environment jsdom */
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { App } from "./App";

/**
 * Verify something should render
 */
test("App should render", () => {
  render(<App />);

  expect(screen.getByText("Welcome, party people!")).toBeInTheDocument();
});

test("Button should render", () => {
  expect(screen.getByRole("button")).not.toBeDisabled();
});

/**
 * Verify clicking button should change theme
 * hint: use fireEvent.click(element) to trigger a click event on an element
 */
test("theme button should update button text", () => {
  render(<App />);

  const themeButton = screen
    .getByRole("button")
    .toHaveTextContent("Current theme:");

  expect(themeButton).toHaveTextContent(/light/i);

  fireEvent.click(themeButton);

  expect(themeButton).toHaveTextContent(/dark/i);
});

// BONUS
// hint: there is a `.toHaveStyle` method.
// e.g.: expect(element).toHaveStyle('color: #FFF');
test("theme button should toggle styles", () => {
  render(<App />);

  const body = screen.getByRole("body");

  expect(body).toHaveStyle("background-color: rgb(255, 255, 255)");
  expect(body).toHaveStyle("color: rgb(51, 51, 51)");

  fireEvent.click(
    screen.getByRole("button").toHaveTextContent("Current theme:")
  );

  expect(header).toHaveStyle("background-color: rgb(51,51,51)");
  expect(header).toHaveStyle("color: rgb(255,255,255)");
});

/**
 * Verify clicking button should toggle hidden content
 *
 * hint: you can check if something does not exist by using .not
 * e.g. expect(element).not.toBeInTheDocument()
 *
 * hint: use `queryByText` instead of `getByText` to check if something is _not_ rendered
 * (getByText will throw an error if it is not rendered)
 */
test("hidden button should toggle hidden content", () => {
  render(<App />);

  const showButton = screen.getByText("Show hidden content");
  const hideButton = screen.getByText("Hide hidden content");
  const hiddenParagraph = screen.queryByText(
    "this content is hidden by default"
  );

  // Initial state
  expect(showButton).toBeInTheDocument();
  expect(hideButton).not.toBeInTheDocument();
  expect(hiddenParagraph).not.toBeInTheDocument();

  fireEvent.click(showButton);

  expect(hideButton).toBeInTheDocument();
  expect(hiddenParagraph).toBeInTheDocument();

  fireEvent.click(hideButton);

  expect(showButton).toBeInTheDocument();
  expect(hiddenParagraph).not.toBeInTheDocument();
});

/**
 * Want more? Try these:
 *   - check for the presence of a specific element, like the paragraph containing the text "Click the button to toggle the theme"
 *   - check the for the class name .container on the surrounding div
 *   - after clicking the toggle hidden content button, check for the button text to update to "hide" instead of "show"
 */
