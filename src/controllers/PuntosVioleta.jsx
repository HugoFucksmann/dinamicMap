import React from "react";
import CustomMapContainer from "../customMapContainer";
import GlobalMap from "../maps/globalMap";
import puntos_violeta from "../../data/puntos_violeta.json";
import puntosVioletaData from "../mapData/PuntosVioleta.json";
import { GlobalProvider } from "../context/globalContext";
import Sidebar from "../sidebar/sideBar";

//? carga de data:
const geoJSONData = puntos_violeta;
const {
  legend,
  legendOptions,
  keyPoints,
  charts,
  featureKeys,
  filtersData,
  infoTab,
} = puntosVioletaData;

const map = (
  <GlobalMap
    geoJSONData={geoJSONData}
    legendOptions={legendOptions}
    keyPoints={keyPoints}
    featureKeys={featureKeys}
  />
);

const PuntosVioleta = () => {
  return (
    <GlobalProvider>
      <Sidebar
        geoJSONData={geoJSONData}
        // charts={charts}
        filtersData={filtersData}
        infoTab={infoTab}
      />
      <CustomMapContainer legend={legend} map={map} />
    </GlobalProvider>
  );
};

export default PuntosVioleta;
