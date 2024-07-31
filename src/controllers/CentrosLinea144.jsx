import React from "react";
import CustomMapContainer from "../customMapContainer";
import GlobalMap from "../maps/globalMap";
import Centros_Linea_144 from "../../data/centros_linea_144.json";
import { GlobalProvider } from "../context/globalContext";
import Sidebar from "../sidebar/sideBar";
import CentrosLinea144Data from "../mapData/CentrosLinea144.json";

//? carga de data:
const geoJSONData = Centros_Linea_144;

const {
  legend,
  legendOptions,
  keyPoints,
  charts,
  featureKeys,
  filtersData,
  infoTab,
} = CentrosLinea144Data;

const map = (
  <GlobalMap
    geoJSONData={geoJSONData}
    legendOptions={legendOptions}
    keyPoints={keyPoints}
    featureKeys={featureKeys}
  />
);

const CentrosLinea144 = () => {
  return (
    <GlobalProvider>
      <Sidebar
        geoJSONData={geoJSONData}
        charts={charts}
        filtersData={filtersData}
        infoTab={infoTab}
      />
      <CustomMapContainer legend={legend} map={map} />
    </GlobalProvider>
  );
};

export default CentrosLinea144;
