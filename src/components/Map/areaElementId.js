// The chart cards render these ids and the map looks them up, so the lookup must accept any character an area name can hold.
const slug = (areaName) =>
  areaName.toString().toLowerCase().replaceAll(" ", "-").replaceAll(",", "-");

export const areaElementId = (prefix, areaName) =>
  `${prefix}-${slug(areaName)}`;

export const findAreaElement = (prefix, areaName, doc = document) =>
  doc.getElementById(areaElementId(prefix, areaName));
