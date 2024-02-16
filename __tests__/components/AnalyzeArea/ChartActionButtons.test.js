import React from "react";
import { screen, cleanup } from "@testing-library/react";
import { render } from "../../setup/testUtils";
import { mapConfig } from "../../../src/configuration/config";
import ChartActionButtons from "../../../src/components/AnalyzeArea/ChartActionButtons";

//Done-ish
describe("ChartActionButton", () => {
  beforeEach(() => {
    render(<ChartActionButtons />).store;
  });
  afterEach(() => {
    cleanup();
  });

  describe("Renders as expected:", () => {
    test("Screen as expected:", () => {
      expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
      expect(ChartActionButtons.analyzeAreaState).not.toBe(null);
    });
  });
});
