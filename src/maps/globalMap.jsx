import React, { useEffect, useState, useCallback, useRef } from "react";
import { useLeafletContext } from "@react-leaflet/core";
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
import { addLegend } from "./addLegend";
import { setColorMarket } from "./setColorMarket";

const GlobalMap = ({ geoJSONData, legendOptions, keyPoints, featureKeys }) => {
  const {
    checkBoxFilter,
    textSearch,
    selectedOne,
    isSelectedCircle,
    selectedTwo,
    rangeMarket,
  } = useGlobalContext();

  if (!legendOptions || !keyPoints || !geoJSONData || !featureKeys)
    return (
      <div style={divLegendStyle}>
        NO HAY DATOS !!
        <p>
          falta cargar {!legendOptions && "legendOptions"}
          {!keyPoints && "keyPoints"} {!geoJSONData && " geoJSONData"}
          {!featureKeys && " featureKeys"} en globalMap
        </p>
      </div>
    );

  const context = useLeafletContext();
  const container = context.layerContainer || context.map;
  const legendRef = useRef(null);
  const markersGroupRef = useRef(null);
  const selectedCircleRef = useRef(null);

  const [selectedCoordinates, setSelectedCoordinates] = useState(null);

  const handleDistanciaClick = useCallback(
    (e) => {
      if (!isSelectedCircle) return;

      const { lat, lng } = e.latlng;
      setSelectedCoordinates({ lat, lng });

      const circle = L.circle([lat, lng], {
        radius: rangeMarket * 500,
      }).addTo(container);

      if (selectedCircleRef.current) {
        container.removeLayer(selectedCircleRef.current);
      }

      selectedCircleRef.current = circle;
    },
    [container, isSelectedCircle, rangeMarket]
  );

  const parksGeoJson = new L.GeoJSON(geoJSONData, {
    onEachFeature: (feature = {}, layer) => {
      const { properties = null } = feature;

      if (!properties) return;

      let txt_popup = Object.keys(keyPoints.keysToShow)
        .filter((key) => properties[key])
        .map((key) => {
          if (properties[key].length > 126) {
            return `<div style="height: 90px; overflow-y: scroll;"><b>${keyPoints.keysToShow[key]}:</b> ${properties[key]}</div>`;
          } else
            return `<p><b>${keyPoints.keysToShow[key]}:</b> ${properties[key]}</p>`;
        })
        .join("");

      layer.bindPopup(txt_popup);

      let txt_tooltip = properties[keyPoints.tooltipTxt]
        ? `<p><b>${properties[keyPoints.tooltipTxt]}</b></p>`
        : "";
      layer.bindTooltip(txt_tooltip);

      if (selectedCircleRef.current && isSelectedCircle) {
        const pointLatLng = L.latLng(
          layer.feature.geometry.coordinates[1],
          layer.feature.geometry.coordinates[0]
        );

        const distanceInMeters = pointLatLng.distanceTo(
          selectedCircleRef.current.getLatLng()
        );
        const distanceInKilometers = distanceInMeters / 1000;

        if (distanceInMeters <= selectedCircleRef.current.getRadius()) {
          const distanceText =
            distanceInMeters < 1000
              ? `${distanceInMeters.toFixed(0)} m`
              : `${distanceInKilometers.toFixed(2)} km`;

          const popupContent = `<b>${
            properties[keyPoints.tooltipTxt]
          }</b><br>Distancia al centro: ${distanceText}`;
          layer.bindTooltip(popupContent);
        }
      }
    },
    pointToLayer: (feature = {}, latLang) => {
      if (feature.properties.region) {
        let marker = markerDefault;
        const { region } = feature.properties;

        if (region.includes("1")) marker = markerRegion1;
        if (region.includes("2")) marker = markerRegion2;
        if (region.includes("3")) marker = markerRegion3;
        if (region.includes("4")) marker = markerRegion4;
        if (region.includes("5")) marker = markerRegion5;

        return L.circleMarker(latLang, marker);
      } else
        return L.circleMarker(
          latLang,
          setColorMarket(
            feature.properties[legendOptions.colorKey],
            legendOptions
          )
        );
    },
    filter: ({ properties = {} }) => {
      const { keyNombre, keyLegend, keyLocalidad, keyDepartamento } =
        featureKeys;

      return (
        filterNombre(properties[keyNombre], textSearch) &&
        !filterLegend(properties[keyLegend], checkBoxFilter) &&
        filterLocalidad(properties[keyLocalidad], selectedOne) &&
        filterDepartamento(properties[keyDepartamento], selectedTwo)
      );
    },
  });

  useEffect(() => {
    if (markersGroupRef.current) {
      container.removeLayer(markersGroupRef.current);
    }

    if (!isSelectedCircle && selectedCircleRef.current) {
      container.removeLayer(selectedCircleRef.current);
    }

    if (container) {
      container.on("click", handleDistanciaClick);
    }

    if (geoJSONData.name === "secgenero.areas_mujer(geom)") {
      parksGeoJson.addTo(container);
      markersGroupRef.current = parksGeoJson;
    } else {
      const markersAll = L.markerClusterGroup().addLayer(parksGeoJson);
      markersAll.addTo(container);
      markersGroupRef.current = markersAll;
    }

    if (!legendRef.current) {
      const legend = addLegend(container, legendOptions);
      if (legend) {
        legendRef.current = legend;
      }
    }

    return () => {
      if (container) {
        container.off("click", handleDistanciaClick);
      }
    };
  }, [
    checkBoxFilter,
    textSearch,
    selectedOne,
    selectedTwo,
    selectedCoordinates,
    isSelectedCircle,
    rangeMarket,
  ]);

  return null;
};

const divLegendStyle = {
  zIndex: 999,
  padding: 12,
  borderRadius: 8,
  color: "#f2f2f2",
  backgroundColor: "black",
  position: "absolute",
  right: window.innerWidth / 2,
  top: window.innerHeight / 2,
  textAlign: "center",
};

export default GlobalMap;

const markerDefault = {
  radius: 8,
  fillColor: "#ad1fd7",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

const markerRegion1 = {
  radius: 8,
  fillColor: "#f8c507",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

const markerRegion2 = {
  radius: 8,
  fillColor: "#4582cb",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

const markerRegion3 = {
  radius: 8,
  fillColor: "#e93120",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

const markerRegion4 = {
  radius: 8,
  fillColor: "#f17116",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

const markerRegion5 = {
  radius: 8,
  fillColor: "#2a9244",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};
