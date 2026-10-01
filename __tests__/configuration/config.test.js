import { mapConfig } from "../../src/configuration/config";

describe.each(["nlcdLandcover", "ccapLandcover"])("mapConfig.%s", (key) => {
  test("exists and is a non-empty array", () => {
    expect(Array.isArray(mapConfig[key])).toBe(true);
    expect(mapConfig[key].length).toBeGreaterThan(0);
  });

  test("every entry has a name, value and color", () => {
    mapConfig[key].forEach((entry) => {
      expect(entry).toEqual(
        expect.objectContaining({
          name: expect.any(String),
          value: expect.any(String),
          color: expect.any(String),
        })
      );
    });
  });
});
