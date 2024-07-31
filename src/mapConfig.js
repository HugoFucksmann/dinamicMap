import React from "react";
import GenericMapController from "./controllers/GenericMapController";
import { dataJsonFiles, mapDataFiles } from "./exportJson";
console.log("mapDataFiles ", mapDataFiles);
console.log("dataJsonFiles ", dataJsonFiles);
const mapConfig = {};

Object.entries(dataJsonFiles).forEach(([path, dataModule]) => {
  const fileName = path.split("/").pop().replace(".json", "");
  console.log("fileName:", fileName); // Asegúrate de que sea el nombre correcto

  const mapDataPath = Object.keys(mapDataFiles).find((p) =>
    p.includes(`/${fileName}.json`)
  );

  console.log("mapDataPath:", mapDataPath); // Verifica el resultado

  if (mapDataPath) {
    mapConfig[fileName] = {
      geoJSONData: dataModule.default,
      mapData: mapDataFiles[mapDataPath].default,
      component: GenericMapController,
    };
  }
});

export default mapConfig;
