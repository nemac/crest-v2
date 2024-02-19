import React from "react";
import { screen, cleanup } from "@testing-library/react";
import { render } from "../../setup/testUtils";
import { mapConfig } from "../../../src/configuration/config";
import ChartHeaderActionButton from "../../../src/components/AnalyzeArea/ChartHeaderActionButton";

const buttonTest = "test";
let store;

//Done
describe("ChartHeaderActionButton", () => {
  beforeEach(() => {
    store = render(<ChartHeaderActionButton buttonName={buttonTest} />).store;
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
