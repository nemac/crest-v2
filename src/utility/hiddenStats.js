// Statistics the backend returns but CREST does not show; drop this once social vulnerability is redone.
export const HIDDEN_STATS = ["social_vuln"];

export const withoutHiddenStats = (data) =>
  Object.fromEntries(
    Object.entries(data).filter(([key]) => !HIDDEN_STATS.includes(key)),
  );
