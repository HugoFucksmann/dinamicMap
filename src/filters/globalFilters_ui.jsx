import React, { useState, useEffect, useMemo } from "react";
import { useGlobalContext } from "../context/globalContext";

const SelectFilter = ({
  dataKey,
  label,
  inputStyle,
  selectedValue,
  handleSelectChange,
  geoJSONData,
}) => {
  function capitalizeWords(str) {
    return str.replace(/(^|\s)\S/g, (match) => match.toUpperCase());
  }

  const puntosConGeometry = geoJSONData.features.filter(
    (obj) => obj.geometry !== null
  );

  function calculateStatistics(data, property) {
    const items = [
      ...new Set(data.map((obj) => obj.properties[property]?.toLowerCase())),
    ];

    const countsByProperty = {};

    data.forEach((obj) => {
      const prop = obj.properties[property];
      countsByProperty[prop.toLowerCase()] =
        (countsByProperty[prop.toLowerCase()] || 0) + 1;
    });

    return { items, countsByProperty };
  }

  const { items, countsByProperty } = useMemo(
    () => calculateStatistics(puntosConGeometry, dataKey),
    [puntosConGeometry]
  );

  const itemsOrdenados = items.sort((a, b) => a.localeCompare(b));

  return (
    <>
      <span>{label}</span>
      <br />
      <select
        value={selectedValue}
        onChange={handleSelectChange}
        style={inputStyle}
      >
        <option key={"all"} value="all">
          Mostrar todo
        </option>
        {itemsOrdenados.map((item) => (
          <option key={item} value={item}>
            {`${capitalizeWords(item)} (${
              countsByProperty[item.toLowerCase()]
            })`}
          </option>
        ))}
      </select>
    </>
  );
};

const SelectFilterOne = ({ geoJSONData = {}, filtersData }) => {
  const { selectedTwo, handleSelectOne } = useGlobalContext();
  const { SelectFilterOne } = filtersData;

  if (!SelectFilterOne) return null;

  return (
    <SelectFilter
      dataKey={SelectFilterOne.dataKey}
      label={SelectFilterOne.label}
      inputStyle={inputStyle}
      selectedValue={selectedTwo}
      handleSelectChange={handleSelectOne}
      geoJSONData={geoJSONData}
    />
  );
};

const SelectFilterTwo = ({ geoJSONData = {}, filtersData }) => {
  const { selectedOne, handleSelectTwo } = useGlobalContext();
  const { SelectFilterTwo } = filtersData;

  if (!SelectFilterTwo) return null;

  return (
    <SelectFilter
      dataKey={SelectFilterTwo.dataKey}
      label={SelectFilterTwo.label}
      inputStyle={inputStyle}
      selectedValue={selectedOne}
      handleSelectChange={handleSelectTwo}
      geoJSONData={geoJSONData}
    />
  );
};

const ClearAllFilters = () => {
  const { handleClearAllFilters } = useGlobalContext();
  const [isClicked, setIsClicked] = useState(false);

  const buttonStyles = {
    padding: 4,
    backgroundColor: "#245682",
    width: "80%",
    textAlign: "center",
    color: "white",
    border: "none",
    borderRadius: 6,
    boxShadow: isClicked ? "1px 1px 3px #888888" : "3px 3px 5px #888888",
    cursor: "pointer",
    transition: "all 0.2s",
    transform: isClicked ? "translateY(2px)" : "translateY(0)",
    alignSelf: "center",
  };

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 100);
    handleClearAllFilters();
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button style={buttonStyles} onClick={handleClick}>
          limpiar flitros
        </button>
      </div>
    </>
  );
};

const CheckboxFilter = ({ filtersData }) => {
  const { checkBoxFilter, handleCheckBoxChange } = useGlobalContext();
  const { CheckboxFilter } = filtersData;
  const { checkBoxOp = [], keyTextCheckBox = "" } = CheckboxFilter;

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      // Eliminar la categoría seleccionada de hiddenCategories
      handleCheckBoxChange(
        checkBoxFilter.filter((category) => category !== value)
      );
    } else {
      // Agregar la categoría deseleccionada a hiddenCategories
      handleCheckBoxChange([...checkBoxFilter, value]);
    }
  };

  return (
    <>
      <p style={{ marginBottom: 8 }}>Filtrar por {keyTextCheckBox}:</p>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {checkBoxOp.map((option) => (
          <label key={option} style={moreItemsStyle}>
            <input
              type="checkbox"
              style={{
                transform: "scale(1.2)",
                marginRight: 4,
                accentColor: "#245682",
              }}
              value={option}
              checked={!checkBoxFilter.includes(option)} // Invertir la comprobación
              onChange={handleCheckboxChange}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </>
  );
};

const TextSearch = ({ filtersData }) => {
  const { handleTextSearch, textSearch, handleClearAllFilters } =
    useGlobalContext();

  const [searchValue, setSearchValue] = useState(textSearch);

  useEffect(() => {
    const delay = 500;

    // se ejecutará después de un breve período de inactividad
    const delayedSearch = setTimeout(() => {
      handleTextSearch(searchValue);
    }, delay);

    // Limpia el temporizador si se realiza un nuevo cambio antes de que ocurra el retraso
    return () => {
      clearTimeout(delayedSearch);
    };
  }, [searchValue]);

  useEffect(() => {
    if (textSearch === "") setSearchValue("");
  }, [handleClearAllFilters]);

  return (
    <>
      Buscar por Institucion:{" "}
      <span style={{ fontSize: "0.8em" }}>( mas de 3 caracteres )</span>
      <input
        type="text"
        style={inputStyle}
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
      />
    </>
  );
};

const DistanciaFilter = () => {
  const { rangeMarket, setRangeMarket, setIsSelectedCircle, isSelectedCircle } =
    useGlobalContext();

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        Busqueda por distancia:{" "}
        <div>
          <label>
            activar
            <input
              checked={isSelectedCircle}
              style={{
                marginRight: 10,
                marginLeft: 5,
                accentColor: "#245682",
              }}
              type="checkbox"
              onChange={(e) => setIsSelectedCircle(e.target.checked)}
            />
          </label>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <input
          style={{ height: 16, width: 34, marginRight: 4, paddingLeft: 4 }}
          type="text"
          value={rangeMarket}
          onChange={(e) => setRangeMarket(e.target.value)}
        />
        <span style={{ marginRight: 4 }}>km</span>

        <input
          type="range"
          min={1}
          max={500}
          value={rangeMarket}
          style={inputStyle}
          onChange={(e) => setRangeMarket(e.target.value)}
        />
      </div>
    </>
  );
};

const inputStyle = {
  width: "90%",
  borderRadius: 6,
  padding: 2,
  border: "solid grey 1px",
  outline: "none",
  backgroundColor: "#fff",
  accentColor: "#245682",
};

const moreItemsStyle = {
  display: "inline-block",
  width: "50%",
  marginBottom: 4,
};

//? carga de filtros
export const filters = [
  { ClearAllFilters: ClearAllFilters },
  { TextSearch: TextSearch },
  { SelectFilterTwo: SelectFilterTwo },
  { SelectFilterOne: SelectFilterOne },
  { CheckboxFilter: CheckboxFilter },
  { DistanciaFilter: DistanciaFilter },
];
