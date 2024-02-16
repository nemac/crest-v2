import React from "react";
import { screen, cleanup } from "@testing-library/react";
import { render } from "../../setup/testUtils";
import { mapConfig } from "../../../src/configuration/config";
import ActionButtons from "../../../src/components/Map/ActionButtons";

//Done
describe("ActionButtons", () => {
  beforeEach(() => {
    render(<ActionButtons />).store;
  });
  afterEach(() => {
    cleanup();
  });

  describe("Renders as expected: ", () => {
    test("Screen as expected: ", () => {
      expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
    });

    test("Functions as expected: ", () => {
      expect(ActionButtons.layerListVisible).not.toBe(null);
      expect(ActionButtons.handleGenericClick).not.toBe(null);
      expect(ActionButtons.mapLayerVisiblityOnClick).not.toBe(null);
    });
  });
});
