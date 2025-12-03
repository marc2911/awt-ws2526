import { fireEvent, render } from "@testing-library/react";
import OmmMemeMUC from "./mememuc";

describe("OmmMemeMUC Component", () => {
  beforeEach(() => render(<OmmMemeMUC />));

  it("renders without crashing", () => {
    const container = document.querySelector(".mememuc");
    expect(container).toBeDefined();
  });

  it("selected img shows up", () => {
    const images = (document.querySelector(".meme-list") as HTMLUListElement)
      .children;

    const firstImg = images[0] as HTMLDivElement;

    const expectedLink = (
      firstImg.getElementsByTagName("img")[0] as HTMLImageElement
    ).src;

    fireEvent.click(firstImg);

    const resultsContainer = document.querySelector(
      ".results",
    ) as HTMLDivElement;

    const result = resultsContainer.getElementsByTagName(
      "img",
    )[0] as HTMLImageElement;

    expect(result).toBeDefined();
    expect(result.src.startsWith(expectedLink)).toBeTruthy();
  });
});
