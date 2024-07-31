import L from "leaflet";
import { generateColorsWithTransparency } from "../utils/generateColors";

export function addLegend(container, legendOptions) {
  if (container._legendControl) return;
  let legend = L.control({ position: "bottomright" });
  legend.onAdd = function () {
    let div = L.DomUtil.create("div", "legend");
    div.style.borderRadius = "8px";
    div.style.padding = "12px";
    div.style.boxShadow = "2px 2px 2px grey";
    div.style.border = "1px solid #ccc";
    div.style.backgroundColor = "#f2f2f2";
    div.innerHTML += `<h4>${legendOptions.title}</h4>`;

    legendOptions.items.forEach((value, index) => {
      const color = generateColorsWithTransparency(
        legendOptions.items.length,
        1
      )[index];

      div.innerHTML += `<i style="background: ${color}; width: 20px; height: 20px; display: inline-block; margin-right: 5px;"></i><span>${value}</span><br>`;
    });

    return div;
  };

  legend.addTo(container);
}
