import { describe, expect, it } from "vitest";
import { selectZonalStatsLoading } from "./zonalstats";

const withQueries = (queries) => ({ zonalStatsApi: { queries } });

describe("selectZonalStatsLoading", () => {
  it("is true while any request is pending", () => {
    expect(
      selectZonalStatsLoading(
        withQueries({ a: { status: "fulfilled" }, b: { status: "pending" } }),
      ),
    ).toBe(true);
  });

  it("is false once every request has finished or failed, and with none", () => {
    expect(
      selectZonalStatsLoading(
        withQueries({ a: { status: "fulfilled" }, b: { status: "rejected" } }),
      ),
    ).toBe(false);
    expect(selectZonalStatsLoading(withQueries({}))).toBe(false);
    expect(selectZonalStatsLoading(withQueries({ a: undefined }))).toBe(false);
  });
});
