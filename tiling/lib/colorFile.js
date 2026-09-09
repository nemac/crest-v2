const HEX = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;

export function hexToRgb(hex) {
  const match = HEX.exec(hex);
  if (!match) {
    throw new Error(`Expected a #RRGGBB hex colour, got "${hex}"`);
  }
  return [match[1], match[2], match[3]].map((part) => parseInt(part, 16));
}

export function paletteToColorFile(entries) {
  return entries
    .map(({ value, color }) => `${value} ${hexToRgb(color).join(" ")} 255\n`)
    .join("");
}
