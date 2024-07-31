export function generateColorsWithTransparency(numColors, transparency = 0.2) {
  const colorStep = 360 / numColors;
  return Array.from({ length: numColors }, (_, i) => {
    const hue = i * colorStep;
    return `hsla(${hue}, 70%, 50%, ${transparency})`;
  });
}
