import React from "react";
import CustomMapContainer from "../customMapContainer";
import GlobalMap from "../maps/globalMap";
import empresa_propiedad_mujeres from "../../data/empresa_propiedad_mujeres.json";
import { GlobalProvider } from "../context/globalContext";
import Sidebar from "../sidebar/sideBar";
import empresaPropiedadMujeresData from "../mapData/EmpresaPropiedadMujeres.json";

//? carga de data:
const geoJSONData = empresa_propiedad_mujeres;

const {
  legend,
  legendOptions,
  keyPoints,
  charts,
  featureKeys,
  filtersData,
  infoTab,
} = empresaPropiedadMujeresData;

const map = (
  <GlobalMap
    geoJSONData={geoJSONData}
    legendOptions={legendOptions}
    keyPoints={keyPoints}
    featureKeys={featureKeys}
  />
);

const EmpresaPropiedadMujeres = () => {
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

export default EmpresaPropiedadMujeres;
