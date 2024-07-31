import React from "react";
import { ZoomControl } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
const CustomMapContainer = ({ legend, map }) => {
  const defaultPosition = [-31.6244477760916, -60.698839780023754]; // Santa Fe position
  if (!legend)
    return (
      <div style={divLegendStyle}>
        NO HAY DATOS !!
        <p>falta cargar legend en CustomMapContainer</p>
      </div>
    );
  return (
    <>
      <MapContainer
        style={mapContainerStyle}
        whenCreated={(mapInstance) => {
          this.mapRef.current = mapInstance;
        }}
        center={defaultPosition}
        zoom={7}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {map}
        <ZoomControl position="topright" />
      </MapContainer>
    </>
  );
};

const divLegendStyle = {
  zIndex: 999,
  padding: 12,
  borderRadius: 8,
  color: "#f2f2f2",
  backgroundColor: "black",
  position: "absolute",
  right: window.innerWidth / 2.5,
  top: window.innerHeight / 2,
  textAlign: "center",
};

const mapContainerStyle = { width: "100vw", height: "100vh" };

export default CustomMapContainer;
