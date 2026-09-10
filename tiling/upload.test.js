import { describe, expect, it } from "vitest";
import { BOUNDARY_NAME } from "./lib/commands.js";
import { BUCKET, DISTRIBUTION_ID, PREFIX, uploadCommands } from "./upload.js";

describe("upload constants", () => {
  it("targets only the dev CONUS prefix on the live tiles bucket", () => {
    expect(BUCKET).toBe("tiles.resilientcoasts.org");
    expect(PREFIX).toBe("dev/conus");
    expect(DISTRIBUTION_ID).toBe("E34VC6CQ814IM");
  });

  it("shares the boundary name with the build script", () => {
    expect(BOUNDARY_NAME).toBe("north_atlantic_boundary");
  });
});

describe("uploadCommands", () => {
  const commands = uploadCommands(
    ["storm_surge", "north_atlantic_boundary"],
    "tiling/work/out",
  );

  it("copies each archive with the expected headers, then invalidates once", () => {
    expect(commands.map((c) => c.label)).toEqual([
      "upload storm_surge",
      "upload north_atlantic_boundary",
      "invalidate",
    ]);
    expect(commands[0]).toEqual({
      label: "upload storm_surge",
      cmd: "aws",
      args: [
        "s3",
        "cp",
        "tiling/work/out/storm_surge.pmtiles",
        "s3://tiles.resilientcoasts.org/dev/conus/storm_surge.pmtiles",
        "--content-type",
        "application/octet-stream",
        "--cache-control",
        "public,max-age=3600",
        "--acl",
        "public-read",
      ],
    });
    commands
      .slice(0, 2)
      .forEach((c) =>
        expect(c.args.slice(-2)).toEqual(["--acl", "public-read"]),
      );
    expect(commands[2]).toEqual({
      label: "invalidate",
      cmd: "aws",
      args: [
        "cloudfront",
        "create-invalidation",
        "--distribution-id",
        "E34VC6CQ814IM",
        "--paths",
        "/dev/conus/*",
      ],
    });
  });

  it("never references any other bucket or prefix", () => {
    const text = JSON.stringify(commands);
    expect(text).not.toMatch(/nfwf-tiles/);
    expect(text.match(/s3:\/\//g)).toHaveLength(2);
    expect(
      text.match(/s3:\/\/tiles\.resilientcoasts\.org\/dev\/conus\//g),
    ).toHaveLength(2);
  });
});
