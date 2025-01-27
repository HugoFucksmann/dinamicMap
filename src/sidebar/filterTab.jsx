import React from "react";
import { filters } from "../filters/globalFilters_ui";

const FilterTab = ({ geoJSONData, filtersData }) => {
  if (!geoJSONData || !filtersData) return null;

  const keys = Object.keys(filtersData);

  const funcionesFiltradas = filters.filter((f) => {
    return keys.includes(Object.keys(f)[0]);
  });

  return funcionesFiltradas.map((Filter, i) => {
    const FilterComponent = Filter[Object.keys(Filter)[0]];
    return (
      <div style={filterDiv} key={i}>
        <FilterComponent geoJSONData={geoJSONData} filtersData={filtersData} />
      </div>
    );
  });
};

const filterDiv = {
  backgroundColor: "#ebf5ff",
  display: "inline-block",
  flexDirection: "column",
  width: "100%",
  padding: 12,
  marginBottom: 8,
  boxShadow: "0px 2px 2px #dedede",
};

export default FilterTab;
