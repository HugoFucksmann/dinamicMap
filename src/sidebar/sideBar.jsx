import React, { useState } from "react";
import menuIcon from "../images/menu.png";
import estadistica from "../images/iconos/estadistica.png";
import exit from "../images/iconos/exit.png";
import informacion from "../images/iconos/informacion.png";
import filtrar from "../images/iconos/filtrar.png";
import FilterTab from "./filterTab";
import InfoTab from "./infoTab";
import ChartsTab from "./chartsTab";

const Sidebar = ({ geoJSONData, charts, filtersData, infoTab }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState("filtrar");

  const tabs = {
    configuracion: {
      label: "Configuración",
      img: estadistica,
      content: <ChartsTab geoJSONData={geoJSONData} charts={charts} />,
    },
    informacion: {
      label: "Información",
      img: informacion,
      content: <InfoTab infoTab={infoTab} />,
    },
    filtrar: {
      label: "Filtrar",
      img: filtrar,
      content: (
        <FilterTab geoJSONData={geoJSONData} filtersData={filtersData} />
      ),
    },
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleTabClick = (tab) => {
    setActiveTabIndex(tab);
  };

  if (!geoJSONData || !filtersData)
    return (
      <div style={divLegendStyle}>
        NO HAY DATOS !!
        {!geoJSONData && <p>falta cargar geoJSONData en sideBar </p>}
        {!filtersData && <p>falta cargar filtersData en sideBar </p>}
      </div>
    );

  return (
    <>
      <button style={buttonStyles(isMenuOpen)} onClick={toggleMenu}>
        <img src={menuIcon} alt="Abrir Menú" style={imgStyle} />
      </button>
      <div style={menuStyles(isMenuOpen)}>
        <div style={btnMenuDivStyle}>
          {Object.keys(tabs).map((tabKey) => (
            <button
              key={tabKey}
              style={menuBtnStyle(tabKey, activeTabIndex)}
              onClick={() => handleTabClick(tabKey)}
            >
              <img
                style={{
                  height: 14,
                  margin: "auto",
                  filter:
                    tabKey === activeTabIndex && "invert(1) grayscale(100%)",
                }}
                src={tabs[tabKey].img}
                alt="Icono"
              />
            </button>
          ))}

          <button onClick={toggleMenu} style={menuBtnStyle("exit")}>
            <img
              style={{ height: 12, margin: "auto" }}
              src={exit}
              alt="Icono"
            />
          </button>
        </div>
        <div style={contentContainerStyle} id="contetSidebar">
          {tabs[activeTabIndex].content}
        </div>
      </div>
    </>
  );
};

const contentContainerStyle = {
  flexGrow: 1, // Permite que el contenido ocupe todo el espacio disponible
  width: "100%", // Ocupa todo el ancho disponible
};

const menuStyles = (isMenuOpen) => {
  return {
    overflowY: "auto",
    overflowX: "hidden",
    width: 280,
    height: "100%",
    position: "fixed",
    top: 0,
    left: isMenuOpen ? 0 : -280,
    background: "#fff",
    transition: "left 0.3s",
    zIndex: 902,
    fontSize: "0.8em",
    boxShadow: "2px 2px 3px #c2c2c2",
    flexDirection: "column",
  };
};

const imgStyle = {
  width: 18,
  height: 18,
};

const btnMenuDivStyle = {
  backgroundColor: "#d1dfeb",
  display: "flex",
  position: "sticky",
  top: 0,
  justifyContent: "flex-end",
  borderBottom: "1px solid #cfcfcf",
};

const buttonStyles = (isMenuOpen) => {
  return {
    position: "absolute",
    top: 20,
    left: 15,
    zIndex: 901,
    borderRadius: 6,
    opacity: isMenuOpen ? 0 : 1,
    padding: 6,
    border: "1px solid grey",
    boxShadow: "3px 3px 3px grey",
    backgroundColor: "#f2f2f2",
  };
};

const menuBtnStyle = (tab, activeTabIndex) => {
  return {
    marginTop: 8,
    marginBottom: 10,
    marginRight: 10,
    display: "flex",
    fontSize: 16,
    borderRadius: 6,
    border: "2px solid #fff",
    boxShadow: tab !== activeTabIndex && "2px 2px 3px grey",
    fontWeight: "bold",
    transition: ".3s all",
    height: 30,
    width: 30,
    backgroundColor: tab === activeTabIndex ? "#6c92ab" : "#fff",
  };
};

const divLegendStyle = {
  zIndex: 999,
  padding: 12,
  borderRadius: 8,
  color: "#f2f2f2",
  backgroundColor: "black",
  position: "absolute",
  right: window.innerWidth / 2,
  top: window.innerHeight / 2,
  textAlign: "center",
};

export default Sidebar;
