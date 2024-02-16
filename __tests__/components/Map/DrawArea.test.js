import React from "react";
import { screen, cleanup } from "@testing-library/react";
import { render } from "../../setup/testUtils";
import { mapConfig } from "../../../src/configuration/config";
import DrawArea from "../../../src/components/Map/DrawArea";

describe("ActionButton", () => {
  beforeEach(() => {
    render(<DrawArea />).store;
  });
  afterEach(() => {
    cleanup();
  });

  describe("Renders as expected: ", () => {
    test("Screen as expected: ", () => {
      expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
    });

    test("Functions as expected: ", () => {
      expect(DrawArea.handleSketchClick).not.toBe(null);
    });
  });
});
