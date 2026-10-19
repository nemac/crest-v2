import { describe, expect, it, vi } from "vitest";
import {
  CSV_HEADER,
  areaRows,
  csvCell,
  csvFilename,
  downloadCsv,
  formatValue,
  rowsToCsv,
} from "./csvExport";

describe("formatValue", () => {
  it.each([
    [4.56789, "4.568"],
    [0, "0.000"],
    [-1, "-1.000"],
    [100, "100.000"],
    ["2.5", "2.500"],
  ])("formats %s as %s", (value, expected) => {
    expect(formatValue(value)).toBe(expected);
  });

  it.each([["NaN"], [null], [undefined], [""], ["not a number"], [NaN]])(
    "writes no data (%s) as an empty cell, not 0",
    (value) => {
      expect(formatValue(value)).toBe("");
    },
  );
});

describe("csvCell", () => {
  it("leaves ordinary text and numbers as they are", () => {
    expect(csvCell("Area 1")).toBe("Area 1");
    expect(csvCell("4.568")).toBe("4.568");
    expect(csvCell(7)).toBe("7");
    expect(csvCell("1-10")).toBe("1-10");
  });

  it("writes null and undefined as empty cells", () => {
    expect(csvCell(null)).toBe("");
    expect(csvCell(undefined)).toBe("");
  });

  it("quotes commas so a name stays in one column", () => {
    expect(csvCell("Cape May, NJ")).toBe('"Cape May, NJ"');
  });

  it("doubles quotes inside a quoted cell", () => {
    expect(csvCell('The "North" marsh')).toBe('"The ""North"" marsh"');
  });

  it("quotes line breaks and edge spaces", () => {
    expect(csvCell("two\nlines")).toBe('"two\nlines"');
    expect(csvCell("two\r\nlines")).toBe('"two\r\nlines"');
    expect(csvCell(" padded ")).toBe('" padded "');
  });

  it("keeps # in the value (it used to cut the file short)", () => {
    expect(csvCell("Site #2")).toBe("Site #2");
  });

  it.each([
    ['=HYPERLINK("http://x")', '\'=HYPERLINK("http://x")'],
    ["+cmd", "'+cmd"],
    ["-cmd", "'-cmd"],
    ["@SUM(A1)", "'@SUM(A1)"],
    ["\tTab", "'\tTab"],
  ])("stops %s from running as a spreadsheet formula", (value, guarded) => {
    expect(csvCell(value).replace(/^"|"$/g, "").replaceAll('""', '"')).toBe(
      guarded,
    );
  });

  it("does not touch negative numbers", () => {
    expect(csvCell("-1.000")).toBe("-1.000");
    expect(csvCell(-2)).toBe("-2");
  });
});

describe("rowsToCsv", () => {
  it("joins cells with commas and rows with line breaks", () => {
    expect(
      rowsToCsv([
        ["a", "b"],
        ["c", "d"],
      ]),
    ).toBe("a,b\nc,d");
  });

  it("quotes only the cells that need it", () => {
    expect(rowsToCsv([["Cape May, NJ", "Site #2", "1.000"]])).toBe(
      '"Cape May, NJ",Site #2,1.000',
    );
  });

  it("returns an empty string for no rows", () => {
    expect(rowsToCsv([])).toBe("");
  });
});

describe("areaRows", () => {
  const label = (region, key) => `${region}:${key}`;
  const range = (region, key) => (key === "threat" ? "1-10" : "0");

  it("writes one row per statistic in the data's order", () => {
    const rows = areaRows({
      areaName: "Area 1",
      region: "Guam",
      data: { threat: 4.25, exposure: "NaN", lc_open_water: 12.5 },
      label,
      range,
    });
    expect(rows).toEqual([
      ["Area 1", "Guam:threat", "4.250", "1-10"],
      ["Area 1", "Guam:exposure", "", "0"],
      ["Area 1", "Guam:lc_open_water", "12.500", "0"],
    ]);
  });

  it("returns no rows for an area without statistics", () => {
    expect(
      areaRows({ areaName: "A", region: "Guam", data: {}, label, range }),
    ).toEqual([]);
  });
});

describe("a full export", () => {
  it("round-trips an awkward area name into one column", () => {
    const csv = rowsToCsv([
      CSV_HEADER,
      ...areaRows({
        areaName: 'Smith\'s "Back" Bay, #2',
        region: "Guam",
        data: { threat: 3 },
        label: () => "Threat Index",
        range: () => "1-10",
      }),
    ]);
    expect(csv).toBe(
      'Area,Index,Values,Range(s)\n"Smith\'s ""Back"" Bay, #2",Threat Index,3.000,1-10',
    );
  });
});

describe("csvFilename", () => {
  it("builds the name from the export type, region and time, without separators", () => {
    const date = { toLocaleString: () => "10/19/2026, 3:04:05 PM" };
    expect(csvFilename("ALL-DATA", "U.S. Virgin Islands", date)).toBe(
      "ALL-DATA-U-S--Virgin-Islands-10-19-2026--3-04-05-PM.csv",
    );
  });
});

describe("downloadCsv", () => {
  it("saves a UTF-8 CSV blob, with a byte order mark for Excel, under the given name", async () => {
    const save = vi.fn();
    downloadCsv("Area\nHawaiʻi", "export.csv", save);
    const [blob, filename] = save.mock.calls[0];
    expect(filename).toBe("export.csv");
    expect(blob.type).toBe("text/csv;charset=utf-8");
    const bytes = new Uint8Array(await blob.arrayBuffer());
    expect([...bytes.slice(0, 3)]).toEqual([0xef, 0xbb, 0xbf]);
    expect(new TextDecoder().decode(bytes)).toBe("Area\nHawaiʻi");
  });
});

describe("areaRows hidden statistics", () => {
  it("drops social vulnerability, which CREST does not show anywhere", () => {
    const rows = areaRows({
      areaName: "Area 1",
      region: "U.S. Virgin Islands",
      data: { hubs: 3, social_vuln: 0.068, lc_bare_land: 0.6 },
      label: (region, key) => key,
      range: () => "",
    });
    expect(rows.map((row) => row[1])).toEqual(["hubs", "lc_bare_land"]);
  });
});
