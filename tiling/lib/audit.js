export function parseHistogramValues(gdalinfoJson) {
  const histogram = gdalinfoJson.bands?.[0]?.histogram;
  if (!histogram) {
    throw new Error("gdalinfo returned no histogram for band 1");
  }
  const { count, min, max, buckets } = histogram;
  const width = (max - min) / count;
  if (width > 1) {
    throw new Error(
      `histogram bucket width ${width} is too coarse to resolve integer classes`,
    );
  }
  return buckets
    .map((n, i) => (n > 0 ? Math.round(min + width * (i + 0.5)) : null))
    .filter((v) => v !== null);
}

export function auditValues(present, allowed) {
  const allowedSet = new Set(allowed);
  const unexpected = present.filter((v) => !allowedSet.has(v));
  return { ok: unexpected.length === 0, unexpected };
}
