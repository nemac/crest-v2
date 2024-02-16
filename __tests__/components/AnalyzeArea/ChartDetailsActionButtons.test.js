import React from "react";
import { screen, cleanup, fireEvent } from "@testing-library/react";
import { render } from "../../setup/testUtils";
import { mapConfig } from "../../../src/configuration/config";
import ChartDetailsActionButtons from "../../../src/components/AnalyzeArea/ChartDetailsActionButtons";

//Done
describe("ChartDetails", () => {
  beforeEach(() => {
    render(<ChartDetailsActionButtons />).store;
  });
  afterEach(() => {
    cleanup();
  });

  describe("Renders as expected: ", () => {
    test("Screen as expected: ", () => {
      expect(screen.getAllByRole("button")).toBeInTheDocument;
    });

    //I don't think there is any way to test if propogation was stopped
  });
});
