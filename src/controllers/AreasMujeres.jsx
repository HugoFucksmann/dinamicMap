import React from "react";
import CustomMapContainer from "../customMapContainer";
import GlobalMap from "../maps/globalMap";
import areas_mujer from "../../dataJson/areas_mujer.json";
import { GlobalProvider } from "../context/globalContext";
import Sidebar from "../sidebar/sideBar";
import AreasMujeresData from "../mapData/AreasMujeres.json";

//? carga de data:
const geoJSONData = areas_mujer;

const {
  legend,
  legendOptions,
  keyPoints,
  charts,
  featureKeys,
  filtersData,
  infoTab,
} = AreasMujeresData;

const map = (
  <GlobalMap
    geoJSONData={geoJSONData}
    legendOptions={legendOptions}
    keyPoints={keyPoints}
    featureKeys={featureKeys}
  />
);

const AreasMujeres = () => {
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

export default AreasMujeres;
