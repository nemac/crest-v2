import React from "react";
import { screen, cleanup } from "@testing-library/react";
import { render } from "../../setup/testUtils";
import { mapConfig } from "../../../src/configuration/config";
import ChartHeaderActionButtons from "../../../src/components/AnalyzeArea/ChartHeaderActionButtons";

//Done
const testArea = "alaska";

describe("ChartHeaderActionButtons", () => {
  beforeEach(() => {
    render(<ChartHeaderActionButtons areaName={testArea} />).store;
  });
  afterEach(() => {
    cleanup();
  });

  describe("Renders as expected: ", () => {
    test("Screen as expected: ", () => {
      expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
      expect(ChartHeaderActionButtons.analyzeAreaState).not.toBe(null);
    });
  });
});
