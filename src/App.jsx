import React, { Suspense } from "react";
import "./index.css";
import mapConfig from "./mapConfig";

const mapData = Object.entries(mapConfig).map(([key, value]) => ({
  title: key,
  description: `Mapa de ${key}`,
  ...value,
}));

const MapCard = ({ title, description, onClick }) => (
  <div className="card" onClick={onClick}>
    <div className="card-header">
      <h2 className="card-title">{title}</h2>
      <p className="card-description">{description}</p>
    </div>
  </div>
);

function App() {
  const [selectedMap, setSelectedMap] = React.useState(null);

  if (selectedMap) {
    const MapComponent = selectedMap.component;
    return (
      <div className="full-screen-map">
        <button className="back-button" onClick={() => setSelectedMap(null)}>
          Volver
        </button>
        <Suspense fallback={<div>Cargando...</div>}>
          <MapComponent
            geoJSONData={selectedMap.geoJSONData}
            mapData={selectedMap.mapData}
          />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="app-title">Mapas de Recursos para Mujeres</h1>
      <div className="map-grid">
        {mapData.map((map, index) => (
          <MapCard
            key={index}
            title={map.title}
            description={map.description}
            onClick={() => setSelectedMap(map)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
