import React, { useEffect, useState } from "react";
import { useLeafletContext } from "@react-leaflet/core";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { useGlobalContext } from "../context/globalContext";
import {
  filterNombre,
  filterDepartamento,
  filterLocalidad,
  filterLegend,
} from "../filters/globalFilters_logic";

const keysToShow = [
  "calle",
  "cuidado_de",
  "institucion",
  "localidad",
  "departamento",
  "mail",
  "telefono",
  "tipo_de_gestion",
];
const tooltipTxt = "institucion";

const espaciosCuidadosPoints = ({ geoJSONData }) => {
  const {
    checkBoxFilter,
    textSearch,
    selectedOne,
    isSelectedCircle,
    selectedTwo,
    rangeMarket,
  } = useGlobalContext();
  const context = useLeafletContext();
  const [isLegend, setIsLegend] = useState(null);
  const [markersGroup, setMarkersGroup] = useState(null);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [selectedCircle, setSelectedCircle] = useState(null);

  const container = context.layerContainer || context.map;

  const handleDistanciaClick = (e) => {
    if (!isSelectedCircle) {
      return;
    }

    const { lat, lng } = e.latlng;
    setSelectedCoordinates({ lat, lng });

    const circle = L.circle([lat, lng], {
      radius: rangeMarket * 500,
    }).addTo(container);

    if (selectedCircle) {
      container.removeLayer(selectedCircle);
    }

    setSelectedCircle(circle);
  };

  const parksGeoJson = new L.GeoJSON(geoJSONData, {
    onEachFeature: (feature = {}, layer) => {
      const { properties = null } = feature;

      if (!properties) return;

      let txt_popup = "";

      // muestra keys en keysToShow
      keysToShow.forEach((key) => {
        if (properties[key]) {
          txt_popup += `<p><b>${key}:</b> ${properties[key]}</p>`;
        }
      });

      layer.bindPopup(txt_popup);
      let txt_tooltip = properties[tooltipTxt]
        ? `<p><b>${properties[tooltipTxt]}</b></p>`
        : "";
      layer.bindTooltip(txt_tooltip);

      if (selectedCircle && isSelectedCircle) {
        const pointLatLng = L.latLng(
          layer.feature.geometry.coordinates[1],
          layer.feature.geometry.coordinates[0]
        );

        const distanceInMeters = pointLatLng.distanceTo(
          selectedCircle.getLatLng()
        );
        const distanceInKilometers = distanceInMeters / 1000;

        if (distanceInMeters <= selectedCircle.getRadius()) {
          const popupContent = `<b>${
            properties[tooltipTxt]
          }</b><br>Distancia al centro: ${
            distanceInMeters < 1000
              ? distanceInMeters.toFixed(0) + " m"
              : distanceInKilometers.toFixed(2) + " km"
          }`;
          layer.bindTooltip(popupContent);
        }
      }
    },
    pointToLayer: function (feature, latlng) {
      let marker = { ...markerDefault };

      setColorRubro(marker, feature.properties.cuidado_de);

      return L.circleMarker(latlng, marker);
    },
    filter: function (feature) {
      const { localidad, departamento, institucion, cuidado_de } =
        feature.properties;

      return (
        filterNombre(institucion, textSearch) &&
        !filterLegend(cuidado_de, checkBoxFilter) &&
        filterLocalidad(localidad, selectedOne) &&
        filterDepartamento(departamento, selectedTwo)
      );
    },
  });

  useEffect(() => {
    if (markersGroup) {
      container.removeLayer(markersGroup);
    }

    if (!isSelectedCircle) {
      if (selectedCircle) {
        container.removeLayer(selectedCircle);
      }
    }

    if (container) {
      container.on("click", handleDistanciaClick);
    }

    const markersAll = L.markerClusterGroup().addLayer(parksGeoJson);
    markersAll.addTo(container);
    setMarkersGroup(markersAll);

    if (!isLegend) {
      addLegend(container);
      setIsLegend(true);
    }
    return () => {
      if (container) {
        container.off("click", handleDistanciaClick);
      }
    };
  }, [
    geoJSONData,
    checkBoxFilter,
    textSearch,
    selectedOne,
    selectedTwo,
    selectedCoordinates,
    selectedCircle,
    isSelectedCircle,
    rangeMarket,
  ]);

  return null;
};

function addLegend(container) {
  let legend = L.control({ position: "bottomright" });
  legend.onAdd = function () {
    let div = L.DomUtil.create("div", "legend");
    div.style.borderRadius = "8px";
    div.style.padding = "12px";
    div.innerHTML += "<h4>Cuidado de</h4";
    div.innerHTML +=
      '<i style="background: #1ebee6"></i><span>Infancias</span><br>';
    div.innerHTML +=
      '<i style="background: #ff447f"></i><span>Discapacidad</span><br>';
    div.innerHTML +=
      '<i style="background: #8bd50e"></i><span>Personas Mayores</span><br>';

    return div;
  };

  legend.addTo(container);
}

const markerDefault = {
  radius: 8,
  fillColor: "#ad1fd7",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

const setColorRubro = (marker, cuidado_de) => {
  switch (cuidado_de) {
    case "Infancias":
      return (marker.fillColor = "#1ebee6");
    case "Discapacidad":
      return (marker.fillColor = "#ff447f");
    case "Personas Mayores":
      return (marker.fillColor = "#8bd50e");
    default:
      break;
  }
};

export default espaciosCuidadosPoints;
