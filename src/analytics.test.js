import { beforeEach, describe, expect, it, vi } from "vitest";
import ReactGA from "react-ga4";

import { analyticsEnabled, initAnalytics } from "./analytics";

vi.mock("react-ga4", () => ({
  default: { event: vi.fn(), send: vi.fn(), initialize: vi.fn() },
}));

describe("analytics", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.each([
    [{ PROD: true }, true],
    [{ PROD: true, VITE_CREST_DATA_CHANNEL: "prod" }, true],
    [{ PROD: true, VITE_CREST_DATA_CHANNEL: "dev" }, false],
    [{ PROD: false }, false],
    [{ DEV: true, PROD: false, VITE_CREST_DATA_CHANNEL: "dev" }, false],
  ])("is enabled for %o: %s", (env, expected) => {
    expect(analyticsEnabled(env)).toBe(expected);
  });

  it("starts Google Analytics on the production site", () => {
    expect(initAnalytics({ PROD: true })).toBe(true);
    expect(ReactGA.initialize).toHaveBeenCalledWith("G-2E98LXVQPJ");
    expect(ReactGA.send).toHaveBeenCalledWith("pageview");
  });

  it("does not start Google Analytics on the dev site or locally", () => {
    expect(initAnalytics({ PROD: true, VITE_CREST_DATA_CHANNEL: "dev" })).toBe(
      false,
    );
    expect(initAnalytics({ PROD: false, DEV: true })).toBe(false);
    expect(ReactGA.initialize).not.toHaveBeenCalled();
    expect(ReactGA.send).not.toHaveBeenCalled();
  });
});
