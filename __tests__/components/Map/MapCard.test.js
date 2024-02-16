import React from "react";
import { screen, cleanup } from "@testing-library/react";
import { render } from "../../setup/testUtils";
import { mapConfig } from "../../../src/configuration/config";
import MapActionCard from "../../../src/components/Map/MapActionCard";

describe("MapActionCard", () => {
  beforeEach(() => {
    render(<MapActionCard />).store;
  });
  afterEach(() => {
    cleanup();
  });

  describe("Renders as expected: ", () => {
    test("Screen as expected: ", () => {
      expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
    });

    test("Functions as expected: ", () => {
      expect(MapActionCard.layerListVisible).not.toBe(null);
    });
  });
});
