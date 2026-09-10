import { afterEach, describe, expect, it, vi } from "vitest";
import {
  GEOCODE_ROOT,
  suggestUrl,
  findAddressCandidatesUrl,
  suggestPlaces,
  findCandidate,
} from "./arcgisGeocode";

describe("geocoder urls", () => {
  it("builds a suggest url with the token and ten results", () => {
    const url = new URL(suggestUrl("Wilmington", "KEY"));
    expect(url.origin + url.pathname).toBe(`${GEOCODE_ROOT}/suggest`);
    expect(url.searchParams.get("text")).toBe("Wilmington");
    expect(url.searchParams.get("maxSuggestions")).toBe("10");
    expect(url.searchParams.get("token")).toBe("KEY");
    expect(url.searchParams.get("f")).toBe("json");
  });

  it("builds a findAddressCandidates url from a suggestion", () => {
    const url = new URL(
      findAddressCandidatesUrl(
        { text: "Wilmington, NC", magicKey: "abc" },
        "KEY",
      ),
    );
    expect(url.pathname.endsWith("/findAddressCandidates")).toBe(true);
    expect(url.searchParams.get("singleLine")).toBe("Wilmington, NC");
    expect(url.searchParams.get("magicKey")).toBe("abc");
    expect(url.searchParams.get("outSR")).toBe("4326");
    expect(url.searchParams.get("maxLocations")).toBe("1");
  });
});

describe("geocoder calls", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("returns the suggestions array", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ suggestions: [{ text: "A", magicKey: "1" }] }),
      }),
    );
    expect(await suggestPlaces("A", "KEY")).toEqual([
      { text: "A", magicKey: "1" },
    ]);
  });

  it("returns the first candidate or null", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ candidates: [] }),
      }),
    );
    expect(await findCandidate({ text: "A", magicKey: "1" }, "KEY")).toBeNull();
  });

  it("throws on http failures", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 403 }),
    );
    await expect(suggestPlaces("A", "KEY")).rejects.toThrow("403");
  });
});
