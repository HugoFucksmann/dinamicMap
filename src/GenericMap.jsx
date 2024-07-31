import React from "react";
import CustomMapContainer from "./customMapContainer";
import GlobalMap from "./maps/globalMap";
import { GlobalProvider } from "./context/globalContext";
import Sidebar from "./sidebar/sideBar";

const GenericMap = ({ mapData, mapConfig }) => {
  const {
    legend,
    legendOptions,
    keyPoints,
    charts,
    featureKeys,
    filtersData,
    infoTab,
    geoJSONData,
  } = mapData;
  console.log("mapData ", mapData);

  const map = (
    <GlobalMap
      geoJSONData={mapData}
      legendOptions={legendOptions}
      keyPoints={keyPoints}
      featureKeys={featureKeys}
    />
  );

  return (
    <GlobalProvider>
      <Sidebar
        geoJSONData={mapData}
        charts={charts}
        filtersData={filtersData}
        infoTab={infoTab}
      />
      <CustomMapContainer legend={legend} map={map} />
    </GlobalProvider>
  );
};
export default GenericMap;
