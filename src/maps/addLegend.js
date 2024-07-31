import L from "leaflet";
import { generateColorsWithTransparency } from "../utils/generateColors";

export function addLegend(container, legendOptions) {
  let legend = L.control({ position: "bottomright" });
  legend.onAdd = function () {
    let div = L.DomUtil.create("div", "legend");
    div.style.borderRadius = "8px";
    div.style.padding = "12px";
    div.innerHTML += `<h4>${legendOptions.title}</h4>`;
    console.log("legendOptions ", legendOptions);
    if (legendOptions.title == "organismos y organizaciones") {
      div.innerHTML += `<i style="background: ${"purple"}"></i><span> ${
        legendOptions.title
      } </span><br>`;
    } else if (legendOptions.title == "Areas de la mujer") {
      div.innerHTML +=
        '<i style="background: #f8c507"></i><span>Region 1</span><br>';
      div.innerHTML +=
        '<i style="background: #4582cb"></i><span>Region 2</span><br>';
      div.innerHTML +=
        '<i style="background: #e93120"></i><span>Region 3</span><br>';
      div.innerHTML +=
        '<i style="background: #f17116"></i><span>Region 4</span><br>';
      div.innerHTML +=
        '<i style="background: #2a9244"></i><span>Region 5</span><br>';
    } else
      legendOptions.items.forEach((value, index) => {
        const color = generateColorsWithTransparency(
          legendOptions.items.length,
          1
        )[index];
        div.innerHTML += `<i style="background: ${color}"></i><span>${value}</span><br>`;
      });

    return div;
  };

  legend.addTo(container);
}
