export const NO_DATA_COLOR = "#E9ECEF";

export const chartCSSColorFromPalette = (entries) =>
  entries.reduce(
    (colors, entry) => ({ ...colors, [entry.value]: entry.color }),
    { 0: NO_DATA_COLOR },
  );

export const topClass = (chartCSSColor) =>
  Math.max(
    ...Object.keys(chartCSSColor)
      .map(Number)
      .filter((value) => value > 0),
  );

export const barValue = (chartCSSColor, value) =>
  value > 0 ? value / topClass(chartCSSColor) : 0;
