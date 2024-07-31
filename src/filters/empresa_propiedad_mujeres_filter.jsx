import React, { useState } from "react";
import { useEmpresaPropiedadMujeresContext } from "../context/EmpresaPropiedadMujeresContext";
import empresa_propiedad_mujeres from "../../data/empresa_propiedad_mujeres.json";

const ClearAllFilters = () => {
  const { handleClearAllFilters } = useEmpresaPropiedadMujeresContext();
  const [isClicked, setIsClicked] = useState(false);

  const buttonStyles = {
    padding: 4,
    backgroundColor: "#3498db",
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

const SelectFilterOne = () => {
  const { selectedTwo, handleSelectOne } = useEmpresaPropiedadMujeresContext();
  /**
   * Arreglo de todos los departamentos ordenado
   */
  const departamentos = [
    ...new Set(
      empresa_propiedad_mujeres.features.map(
        (obj) => obj.properties.departamento
      )
    ),
  ].sort((a, b) => a.localeCompare(b));

  return (
    <>
      <span>Filtrar por departamento: </span>
      <br />
      <select
        value={selectedTwo}
        onChange={handleSelectOne}
        style={inputStyle}
        // disabled={selectedRubro.length > 0}
      >
        <option key={"all"} value="all">
          Mostrar todo
        </option>
        {departamentos.map((departamento) => (
          <option key={departamento} value={departamento}>
            {departamento}
          </option>
        ))}
      </select>
    </>
  );
};

const SelectFilterTwo = () => {
  const { selectedOne, handleSelectTwo } = useEmpresaPropiedadMujeresContext();
  /**
   * Arreglo de todos las localidades ordenado
   */
  const localidades = [
    ...new Set(
      empresa_propiedad_mujeres.features.map((obj) => obj.properties.localidad)
    ),
  ].sort((a, b) => a.localeCompare(b));

  return (
    <>
      Filtrar por localidad:
      <br />
      <select
        value={selectedOne}
        onChange={handleSelectTwo}
        style={inputStyle}
        // disabled={selectedRubro.length > 0}
      >
        <option key={"all"} value="all">
          Mostrar todo
        </option>
        {localidades.map((localidad) => (
          <option key={localidad} value={localidad}>
            {localidad}
          </option>
        ))}
      </select>
    </>
  );
};

const CheckboxFilter = () => {
  const { selectedRubro, handleCheckBoxChange } =
    useEmpresaPropiedadMujeresContext();

  const rubros = [
    "Construcción",
    "Servicios",
    "Agropecuario",
    "Arte",
    "Comercio",
    "Industria",
  ].sort((a, b) => a.localeCompare(b));

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      // Agregar la categoría seleccionada
      handleCheckBoxChange([...selectedRubro, value]);
    } else {
      // Eliminar la categoría deseleccionada
      handleCheckBoxChange(
        selectedRubro.filter((category) => category !== value)
      );
    }
  };

  return (
    <>
      <p style={{ marginBottom: 6 }}>Filtrar por rubro:</p>

      {rubros.map((rubro) => (
        <label
          key={rubro}
          style={{
            display: "inline-block",
            width: "50%",
          }}
        >
          <input
            type="checkbox"
            style={{ transform: "scale(1.2)", marginRight: 4 }}
            value={rubro}
            checked={selectedRubro.includes(rubro)}
            onChange={handleCheckboxChange}
          />
          {rubro}
        </label>
      ))}
    </>
  );
};

const TextSearch = () => {
  const { handleTextSearch, textSearch } = useEmpresaPropiedadMujeresContext();
  return (
    <>
      Buscar por titulo:{" "}
      <span style={{ fontSize: "0.8em" }}>( mas de 3 caracteres )</span>
      <input
        type="text"
        style={inputStyle}
        onChange={(e) => handleTextSearch(e.target.value)}
        value={textSearch}
      />
    </>
  );
};

const DistanciaFilter = () => {
  const { rangeMarket, setRangeMarket, setIsSelectedMarker, isSelectedMarker } =
    useEmpresaPropiedadMujeresContext();
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        Buscar por distancia:{" "}
        <input
          style={{
            marginRight: 10,
          }}
          type="checkbox"
          onChange={(e) => setIsSelectedMarker(!isSelectedMarker)}
        />
      </div>
      <div style={{ display: "flex" }}>
        <input
          style={{ height: 16, width: 34, marginRight: 4, paddingLeft: 4 }}
          readOnly
          type="text"
          value={rangeMarket}
        />
        <span style={{ marginRight: 4 }}>km</span>
        <input
          type="range"
          min={0}
          max={999}
          value={rangeMarket}
          style={inputStyle}
          onChange={(e) => setRangeMarket(e.target.value)}
        />
      </div>
    </>
  );
};

const inputStyle = {
  width: "100%",
  borderRadius: 6,
  padding: 2,
  border: "solid grey 1px",
  outline: "none",
};

//? carga de filtros
export const filters_mujeres = [
  ClearAllFilters,
  TextSearch,
  SelectFilterOne,
  SelectFilterTwo,
  CheckboxFilter,
  // DistanciaFilter,
];
