import React, { useEffect, useState } from "react";
import { useLeafletContext } from "@react-leaflet/core";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { useGlobalContext } from "../context/globalContext";
import {
  filterDepartamento,
  filterLocalidad,
  filterNombre,
  filterLegend,
} from "../filters/globalFilters_logic";

/**
 * Objeto clave.valor para armar el popup
 * clave se asocia con el atributo properties del geoJson
 */
const keysToShow = {
  rubro: "Rubro",
  sitio_web: "Redes",
  localidad: "Localidad",
  departamento: "Departamento",
};
/**
 * atributo properties del geoJson a mostrar en el tooltip
 */
const tooltipProperties = "nombre";

const EmpresaPropiedadMujeresPoints = ({ geoJSONData }) => {
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

      let txt_popup = `<p><b>${properties.nombre}</b></p>`;

      //Itera sobre las propiedades del objeto keysToShow para armar el popup
      //keysToShow.forEach((key) => {
      //for (let key in keysToShow) {
      for (let [property, value] of Object.entries(keysToShow)) {
        if (properties[property]) {
          if (property == "sitio_web")
            txt_popup += `<p><b>${value}:</b> <a href="${properties[property]}">${properties[property]}</a></p>`;
          else txt_popup += `<p><b>${value}:</b> ${properties[property]}</p>`;
        }
      }

      layer.bindPopup(txt_popup);
      let txt_tooltip = `<p><b>${properties[tooltipProperties]}</b></p>`;
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
          const distanceText =
            distanceInMeters < 1000
              ? `${distanceInMeters.toFixed(0)} m`
              : `${distanceInKilometers.toFixed(2)} km`;

          const popupContent = `<b>${properties[tooltipTxt]}</b><br>Distancia al centro: ${distanceText}`;
          layer.bindTooltip(popupContent);
        }
      }
    },
    pointToLayer: function (feature, latlng) {
      let marker = { ...markerDefault };
      setColorRubro(marker, feature.properties.rubro);

      return L.circleMarker(latlng, marker);
    },
    filter: function (feature) {
      // Optimización: Simplificar la lógica de filtro
      const { nombre, rubro, localidad, departamento } = feature.properties;
      return (
        filterNombre(nombre, textSearch) &&
        !filterLegend(rubro, checkBoxFilter) &&
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
    div.innerHTML += "<h4>Rubro</h4";
    div.innerHTML +=
      '<i style="background: #1ebee6"></i><span>Construcción</span><br>';
    div.innerHTML +=
      '<i style="background: #ff447f"></i><span>Servicios</span><br>';
    div.innerHTML +=
      '<i style="background: #8bd50e"></i><span>Agropecuario</span><br>';
    div.innerHTML += '<i style="background: #ad1fd7"></i><span>Arte</br>';
    div.innerHTML +=
      '<i style="background: #F5B041"></i><span>Comercio</span><br>';
    div.innerHTML +=
      '<i style="background: #AAB7B8"></i><span>Industria</span><br>';

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

const setColorRubro = (marker, rubro) => {
  switch (rubro) {
    case "Construcción":
      return (marker.fillColor = "#1ebee6");

    case "Servicios":
      return (marker.fillColor = "#ff447f");

    case "Agropecuario":
      return (marker.fillColor = "#8bd50e");

    case "Arte":
      return (marker.fillColor = "#ad1fd7");

    case "Comercio":
      return (marker.fillColor = "#F5B041");

    case "Industria":
      return (marker.fillColor = "#AAB7B8");

    default:
      break;
  }
};

export default EmpresaPropiedadMujeresPoints;
