import React from "react";
import { screen, cleanup } from "@testing-library/react";
import { render } from "../../setup/testUtils";
import { mapConfig } from "../../../src/configuration/config";
import ChartDetails from "../../../src/components/AnalyzeArea/ChartDetails";

//Done
describe("ChartDetails", () => {
  beforeEach(() => {
    render(<ChartDetails areaName="alaska" />).store;
  });
  afterEach(() => {
    cleanup();
  });

  describe("Renders as expected: ", () => {
    test("Screen as expected: ", () => {
      expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
    });
  });
});
