export const GEOCODE_ROOT =
  "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer";

const MAX_SUGGESTIONS = 10;

export const suggestUrl = (text, token) =>
  `${GEOCODE_ROOT}/suggest?${new URLSearchParams({
    f: "json",
    text,
    maxSuggestions: String(MAX_SUGGESTIONS),
    token,
  })}`;

export const findAddressCandidatesUrl = (suggestion, token) =>
  `${GEOCODE_ROOT}/findAddressCandidates?${new URLSearchParams({
    f: "json",
    singleLine: suggestion.text,
    magicKey: suggestion.magicKey,
    outFields: "*",
    outSR: "4326",
    maxLocations: "1",
    token,
  })}`;

const getJson = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Geocoder request failed with HTTP ${response.status}`);
  }
  const json = await response.json();
  if (json.error) throw new Error(json.error.message);
  return json;
};

export const suggestPlaces = async (text, token) =>
  (await getJson(suggestUrl(text, token))).suggestions ?? [];

export const findCandidate = async (suggestion, token) => {
  const { candidates = [] } = await getJson(
    findAddressCandidatesUrl(suggestion, token),
  );
  return candidates[0] ?? null;
};
