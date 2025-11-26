import { render } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  it("renders without crashing", () => {
    render(<App />);
    const container = document.querySelector(".App");
    expect(container).toBeDefined();
  });
});
