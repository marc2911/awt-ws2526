import { getByText, render } from "@testing-library/react";
import App from "./App";

test("renders without crashing", () => {
  render(<App />);
  const container = document.querySelector(".App");
  expect(container).toBeDefined();
});
