const TOO_LARGE_STATUS = 413;

// Message for a failed zonal-statistics request; the backend answers 413 when an area spans too many pixels.
export const analysisErrorMessage = (error, regionLabel) => {
  if (error?.status === TOO_LARGE_STATUS) {
    return `At least one area is too large to analyze, so none of the areas in this request were added.
      Draw or upload a smaller area, or split a large shapefile into smaller shapes.`;
  }
  return `The sketched area returned no data and is most likely outside the
    specified region (${regionLabel}). Also, CREST
    currently includes areas near coastal areas, and the sketched area
    may not fit within the coastal area assessed`;
};

export const analysisErrorTitle = (error) =>
  error?.status === TOO_LARGE_STATUS
    ? "Area Too Large"
    : "Sketch an Area Error ";
