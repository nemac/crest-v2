import { describe, expect, it } from "vitest";
import { areaElementId, findAreaElement } from "./areaElementId";

describe("areaElementId", () => {
  it("builds the same id the chart card renders", () => {
    expect(areaElementId("box", "Area 24")).toBe("box-area-24");
    expect(areaElementId("btn-more-less", "Prince George's County, MD")).toBe(
      "btn-more-less-prince-george's-county--md",
    );
  });
});

describe("findAreaElement", () => {
  const documentWith = (ids) => ({
    getElementById: (id) => (ids.includes(id) ? { id } : null),
    querySelector: () => {
      throw new SyntaxError("not a valid selector");
    },
  });

  it("finds an area element whose name has an apostrophe and a comma", () => {
    const doc = documentWith(["box-prince-george's-county--md"]);
    expect(findAreaElement("box", "Prince George's County, MD", doc)).toEqual({
      id: "box-prince-george's-county--md",
    });
  });

  it("finds an area element whose name has parentheses", () => {
    const doc = documentWith(["box-huc-8-(01090001)"]);
    expect(findAreaElement("box", "HUC 8 (01090001)", doc)).toEqual({
      id: "box-huc-8-(01090001)",
    });
  });

  it("returns null when the area has no card", () => {
    expect(findAreaElement("box", "Area 99", documentWith([]))).toBeNull();
  });
});
