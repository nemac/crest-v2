import { describe, expect, it } from "vitest";
import { analysisErrorMessage, analysisErrorTitle } from "./analysisErrors";

const tooLarge = {
  status: 413,
  data: { message: "area too large to analyze" },
};

describe("analysis error messages", () => {
  it("says the area is too large when the backend answers 413", () => {
    expect(analysisErrorTitle(tooLarge)).toBe("Area Too Large");
    const message = analysisErrorMessage(tooLarge, "North Atlantic");
    expect(message).toMatch(/too large to analyze/);
    expect(message).toMatch(/none of the areas in this request were added/);
    expect(message).not.toMatch(/outside the/);
  });

  it.each([
    [{ status: 500, data: { message: "internal error" } }],
    [{ status: "FETCH_ERROR", error: "TypeError: Failed to fetch" }],
    [{ status: "TIMEOUT_ERROR" }],
  ])("keeps the outside-the-region message for other errors (%o)", (error) => {
    expect(analysisErrorTitle(error)).toBe("Sketch an Area Error ");
    expect(analysisErrorMessage(error, "Guam")).toMatch(
      /outside the\s+specified region \(Guam\)/,
    );
  });
});
