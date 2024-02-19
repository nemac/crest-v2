import React from "react";
import { screen, cleanup } from "@testing-library/react";
import { render } from "../../setup/testUtils";
import { mapConfig } from "../../../src/configuration/config";
import ChartCard from "../../../src/components/AnalyzeArea/AnalyzeProjectSitesChartCard";

//Done
describe("ChartActionButton", () => {
  beforeEach(() => {
    render(<ChartCard />).store;
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
