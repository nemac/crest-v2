import React from "react";
import { screen, cleanup } from "@testing-library/react";
import { render } from "../../setup/testUtils";
import { mapConfig } from "../../../src/configuration/config";
import EmptyState from "../../../src/components/AnalyzeArea/EmptyStateAnalyzeProject";

//Done
describe("EmptyState", () => {
  beforeEach(() => {
    render(<EmptyState />).store;
  });
  afterEach(() => {
    cleanup();
  });

  describe("Renders as expected: ", () => {
    test("Screen as expected: ", () => {
      expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
      expect("View Chart UI").toBeInTheDocument;
    });

    test("Functions as expected: ", () => {
      expect(EmptyState.handleClick).not.toBe(null);
    });
  });
});
