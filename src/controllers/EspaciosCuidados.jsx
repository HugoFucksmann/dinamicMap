import React from "react";
import CustomMapContainer from "../customMapContainer";
import espacios_cuidados from "../../data/espacios_cuidados.json";
import { GlobalProvider } from "../context/globalContext";
import Sidebar from "../sidebar/sideBar";
import GlobalMap from "../maps/globalMap";
import espaciosCuidadosData from "../mapData/EspaciosCuidados.json";

//? carga de data:
const geoJSONData = espacios_cuidados;

const {
  legend,
  legendOptions,
  keyPoints,
  charts,
  featureKeys,
  filtersData,
  infoTab,
} = espaciosCuidadosData;

const map = (
  <GlobalMap
    geoJSONData={geoJSONData}
    legendOptions={legendOptions}
    keyPoints={keyPoints}
    featureKeys={featureKeys}
  />
);

const EspaciosCuidados = () => {
  return (
    <GlobalProvider>
      <Sidebar
        filtersData={filtersData}
        geoJSONData={geoJSONData}
        charts={charts}
        infoTab={infoTab}
      />
      <CustomMapContainer legend={legend} map={map} />
    </GlobalProvider>
  );
};

export default EspaciosCuidados;
