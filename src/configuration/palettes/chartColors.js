export const NO_DATA_COLOR = "#E9ECEF";

export const chartCSSColorFromPalette = (entries) =>
  entries.reduce(
    (colors, entry) => ({ ...colors, [entry.value]: entry.color }),
    { 0: NO_DATA_COLOR },
  );
