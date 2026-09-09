import { describe, expect, it } from "vitest";
import palettes from "./conus.json";

const HEX = /^#[0-9A-F]{6}$/;

const EXPECTED_KEYS = [
  "resilience_opportunities",
  "community_exposure_index",
  "threat_index",
  "community_asset_index",
  "fish_and_wildlife_index",
  "areas_of_low_slope",
  "flood_prone_areas",
  "impermeability",
  "landslide_susceptibility",
  "sea_level_rise",
  "soil_erodibility",
  "storm_surge",
  "vertical_land_motion",
  "critical_facilities",
  "critical_infrastructure",
  "population_density",
  "amphibian_species",
  "aquatic_invertebrate_species",
  "bird_species",
  "fish_species",
  "mammal_species",
  "reptile_species",
  "habitat_protected_and_managed_areas",
];

describe("conus palettes", () => {
  it("has exactly the 23 expected palettes", () => {
    expect(Object.keys(palettes).sort()).toEqual([...EXPECTED_KEYS].sort());
  });

  it.each(Object.entries(palettes))(
    "%s is an ordered, unique palette",
    (name, entries) => {
      expect(entries.length).toBeGreaterThan(0);
      const values = entries.map((e) => e.value);
      expect(new Set(values).size).toBe(values.length);
      expect(values).toEqual([...values].sort((a, b) => a - b));
      entries.forEach((e) => {
        expect(Number.isInteger(e.value)).toBe(true);
        expect(e.color).toMatch(HEX);
      });
    },
  );

  it("never contains 0, which is background in every layer", () => {
    Object.values(palettes).forEach((entries) => {
      expect(entries.map((e) => e.value)).not.toContain(0);
    });
  });

  it("labels the vertical land motion uplift class", () => {
    const uplift = palettes.vertical_land_motion.find((e) => e.value === -1);
    expect(uplift).toEqual({ value: -1, color: "#00CC44", label: "Uplift" });
  });

  it("gives critical facilities a single class 5", () => {
    expect(palettes.critical_facilities).toEqual([
      { value: 5, color: "#0084A8" },
    ]);
  });
});
