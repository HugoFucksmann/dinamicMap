import React from "react";

const InfoTab = ({ infoTab = { title: "No hay descripcion", items: [] } }) => {
  return (
    <div style={{ padding: 14 }}>
      <h6>{infoTab.title}</h6>
      <br />
      {infoTab.items.map((item, i) => (
        <p key={i}>{item}</p>
      ))}
    </div>
  );
};

export default InfoTab;
