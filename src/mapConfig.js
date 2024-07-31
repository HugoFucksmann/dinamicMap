import React from "react";
import GenericMapController from "./GenericMapController";
import { dataJsonFiles, mapDataFiles } from "./exportJson";

const mapConfig = {};

Object.entries(dataJsonFiles).forEach(([path, dataModule]) => {
  const fileName = path.split("/").pop().replace(".json", "");

  const mapDataPath = Object.keys(mapDataFiles).find((p) =>
    p.includes(`/${fileName}.json`)
  );

  if (mapDataPath) {
    mapConfig[fileName] = {
      geoJSONData: dataModule.default,
      mapData: mapDataFiles[mapDataPath].default,
      component: GenericMapController,
    };
  }
});

export default mapConfig;
