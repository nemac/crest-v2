export function parseHistogramValues(gdalinfoJson) {
  const { count, min, max, buckets } = gdalinfoJson.bands[0].histogram;
  const width = (max - min) / count;
  return buckets
    .map((n, i) => (n > 0 ? Math.round(min + width * (i + 0.5)) : null))
    .filter((v) => v !== null);
}

export function auditValues(present, allowed) {
  const allowedSet = new Set(allowed);
  const unexpected = present.filter((v) => !allowedSet.has(v));
  return { ok: unexpected.length === 0, unexpected };
}
