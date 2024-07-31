import React from "react";
import CustomMapContainer from "../customMapContainer";
import GlobalMap from "../maps/globalMap";
import { GlobalProvider } from "../context/globalContext";
import Sidebar from "../sidebar/sideBar";

const GenericMapController = ({ geoJSONData, mapData }) => {
  const {
    legend,
    legendOptions,
    keyPoints,
    charts,
    featureKeys,
    filtersData,
    infoTab,
  } = mapData;

  const map = (
    <GlobalMap
      geoJSONData={geoJSONData}
      legendOptions={legendOptions}
      keyPoints={keyPoints}
      featureKeys={featureKeys}
    />
  );

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

export default GenericMapController;
