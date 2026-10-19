import { describe, expect, it, vi } from "vitest";
import AppErrorBoundary, { resetSavedState } from "./AppErrorBoundary.jsx";

describe("AppErrorBoundary", () => {
  it("switches to the fallback when a child throws while rendering", () => {
    expect(AppErrorBoundary.getDerivedStateFromError(new Error("x"))).toEqual({
      hasError: true,
    });
  });

  it("resets only the saved map state and reloads", () => {
    const storage = { removeItem: vi.fn(), clear: vi.fn() };
    const location = { reload: vi.fn() };
    resetSavedState(storage, location);
    expect(storage.removeItem).toHaveBeenCalledWith("state");
    expect(storage.clear).not.toHaveBeenCalled();
    expect(location.reload).toHaveBeenCalledOnce();
  });
});
