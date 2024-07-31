import React, { useState } from "react";
import menuIcon from "../../images/menu.png";
import configuracion from "../../images/iconos/configuracion.png";
import exit from "../../images/iconos/exit.png";
import informacion from "../../images/iconos/informacion.png";
import filtrar from "../../images/iconos/filtrar.png";
import FilterTab from "./filterTab";
import InfoTab from "./infoTab";
import ConfigTab from "./configTab";

const Sidebar = ({ checkBoxOp, geoJSONData }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState("filtrar");

  const tabs = {
    configuracion: {
      label: "Configuración",
      img: configuracion,
      content: <ConfigTab />,
    },
    informacion: {
      label: "Información",
      img: informacion,
      content: <InfoTab />,
    },
    filtrar: {
      label: "Filtrar",
      img: filtrar,
      content: <FilterTab checkBoxOp={checkBoxOp} geoJSONData={geoJSONData} />,
    },
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleTabClick = (tab) => {
    setActiveTabIndex(tab);
  };

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
                style={{ height: 14, margin: "auto" }}
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
        <div id="contetSidebar">{tabs[activeTabIndex].content}</div>
      </div>
    </>
  );
};

const menuStyles = (isMenuOpen) => {
  return {
    width: 260,
    height: "100%",
    position: "absolute",
    top: 0,
    left: isMenuOpen ? 0 : -260,
    background: "#fff",
    transition: "left 0.3s",
    zIndex: 902,
    fontSize: "0.8em",
    boxShadow: "2px 2px 3px #c2c2c2",
  };
};

const imgStyle = {
  width: 18,
  height: 18,
};

const btnMenuDivStyle = {
  backgroundColor: "#e0f1ff",
  display: "flex",
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
    border: "1px solid grey",
    boxShadow: tab !== activeTabIndex && "1px 1px 2px grey",
    fontWeight: "bold",
    transition: ".3s all",
    height: 26,
    width: 26,
    backgroundColor: tab === activeTabIndex ? "#77b5ed" : "#fff",
  };
};

export default Sidebar;
