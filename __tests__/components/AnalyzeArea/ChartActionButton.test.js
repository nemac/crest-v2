import React from "react";
import { screen, cleanup } from "@testing-library/react";
import { render } from "../../setup/testUtils";
import { mapConfig } from "../../../src/configuration/config";
import ChartActionButton from "../../../src/components/AnalyzeArea/ChartActionButton";

//Done
describe("ChartActionButton", () => {
  beforeEach(() => {
    render(<ChartActionButton />).store;
  });
  afterEach(() => {
    cleanup();
  });

  describe("Renders as expected:", () => {
    test("Screen as expected:", () => {
      expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
    });
  });
});
