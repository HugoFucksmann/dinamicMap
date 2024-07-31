import React from "react";
import { PieChart } from "../charts/pieChart";
import { HorizontalBarChart } from "../charts/horizontalBarChart";

const appInfo = {
  welcomeText: "Estadisticas e informacion",
};

const ChartsTab = ({ geoJSONData = {}, charts = [] }) => {
  if (!charts || charts.length === 0 || !geoJSONData)
    return <h6 style={{ margin: 8 }}>No hay graficos para mostrar</h6>;
  return (
    <div>
      {charts.map(({ filterKey, title }) => (
        <PieChart
          key={title}
          geoJSONData={geoJSONData}
          filterKey={filterKey}
          title={title}
        />
      ))}
    </div>
  );
};

export default ChartsTab;
