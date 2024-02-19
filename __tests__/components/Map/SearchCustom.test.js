import React from "react";
import { screen, cleanup } from "@testing-library/react";
import { render } from "../../setup/testUtils";
import { mapConfig } from "../../../src/configuration/config";
import SearchCustom from "../../../src/components/Map/SearchCustom";

describe("SearchCustom", () => {
  beforeEach(() => {
    render(<SearchCustom />).store;
  });
  afterEach(() => {
    cleanup();
  });

  describe("Renders as expected: ", () => {
    test("Screen as expected: ", () => {
      expect(
        screen.getByText("Search for a County or Watershed"),
      ).toBeInTheDocument();
    });

    test("Functions as expected: ", () => {
      expect(SearchCustom.center).not.toBe(null);
      expect(SearchCustom.zoom).not.toBe(null);
      expect(SearchCustom.layerListVisible).not.toBe(null);
      expect(SearchCustom.selectedRegion).not.toBe(null);
      expect(SearchCustom.userInitiatedRegion).not.toBe(null);
      expect(SearchCustom.handleRegionChange).not.toBe(null);
      expect(SearchCustom.MapEventsComponent).not.toBe(null);
      expect(SearchCustom.identifyClickHandler).not.toBe(null);
      expect(SearchCustom.handleShareLinkClose).not.toBe(null);
      expect(SearchCustom.shareMapHandler).not.toBe(null);
    });
  });
});
