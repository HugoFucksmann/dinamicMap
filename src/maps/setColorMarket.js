import { generateColorsWithTransparency } from "../utils/generateColors";

export const setColorMarket = (key, legendOptions) => {
  if (!key)
    return {
      radius: 8,
      color: legendOptions.colorKey,
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8,
    };

  const colorIndex = legendOptions.items.indexOf(key);
  const colors = generateColorsWithTransparency(legendOptions.items.length, 1);

  return {
    radius: 8,
    fillColor: colors[colorIndex],
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8,
  };
};
