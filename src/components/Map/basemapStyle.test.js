import { describe, expect, it } from "vitest";
import { BASEMAP_STYLES_ROOT, basemapStyleUrl } from "./basemapStyle";

describe("basemapStyleUrl", () => {
  it("points at the v2 styles service with token and worldview", () => {
    const url = new URL(
      basemapStyleUrl(
        { basemap: "arcgis/dark-gray", worldview: "unitedStatesOfAmerica" },
        "KEY",
      ),
    );
    expect(url.origin + url.pathname).toBe(
      `${BASEMAP_STYLES_ROOT}/arcgis/dark-gray`,
    );
    expect(url.searchParams.get("token")).toBe("KEY");
    expect(url.searchParams.get("worldview")).toBe("unitedStatesOfAmerica");
  });

  it("omits worldview when the basemap has none", () => {
    const url = new URL(
      basemapStyleUrl({ basemap: "arcgis/imagery/standard" }, "KEY"),
    );
    expect(url.pathname.endsWith("/arcgis/imagery/standard")).toBe(true);
    expect(url.searchParams.has("worldview")).toBe(false);
  });
});
