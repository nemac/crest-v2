import React from "react";
import { screen, cleanup } from "@testing-library/react";
import { render } from "../../setup/testUtils";
import { mapConfig } from "../../../src/configuration/config";
import AnalyzeAreaHolder from "../../../src/components/AnalyzeArea/AnalyzeAreaHolder";

//Done
describe("AnalyzeAreaHolder", () => {
  beforeEach(() => {
    render(<AnalyzeAreaHolder />).store;
  });
  afterEach(() => {
    cleanup();
  });

  describe("Renders as expected: ", () => {
    test("Screen as expected: ", () => {
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });
});
