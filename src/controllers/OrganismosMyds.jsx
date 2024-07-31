import React from "react";
import CustomMapContainer from "../customMapContainer";
import GlobalMap from "../maps/globalMap";
import organismos_myds from "../../data/organismos_myds.json";
import { GlobalProvider } from "../context/globalContext";
import Sidebar from "../sidebar/sideBar";
import OrganismosMydsData from "../mapData/OrganismosMyds.json";

//? carga de data:
const geoJSONData = organismos_myds;

const {
  legend,
  legendOptions,
  keyPoints,
  charts,
  featureKeys,
  filtersData,
  infoTab,
} = OrganismosMydsData;

const map = (
  <GlobalMap
    geoJSONData={geoJSONData}
    legendOptions={legendOptions}
    keyPoints={keyPoints}
    featureKeys={featureKeys}
  />
);

const OrganismosMyds = () => {
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

export default OrganismosMyds;
