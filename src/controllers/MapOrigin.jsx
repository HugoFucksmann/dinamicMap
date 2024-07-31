import {
  //    createElementHook,
  //<    createElementObject,
  useLeafletContext,
} from "@react-leaflet/core";
import React, { useEffect, useRef } from "react";
import L from "leaflet";
import {
  MapContainer,
  CircleMarker,
  TileLayer,
  WMSTileLayer,
  GeoJSON,
  Marker,
  useMap,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "./map.css";

//import ministerio from '../../data/ministerio.json';
//import institucion_cuidados from '../../data/espacios_cuidados.json';
import empresa_propiedad_mujeres from "../../data/empresa_propiedad_mujeres.json";

import ministerioIcon from "../../images/marker-icon.png";

delete L.Icon.Default.prototype._getIconUrl;
//https://github.com/pointhi/leaflet-color-markers
//https://github.com/bluetechsky/Leaflet.DynamicMarker

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("../../images/marker-icon-2x.png"),
  iconUrl: require("../../images/marker-icon.png"),
  shadowUrl: require("../../images/marker-shadow.png"),
});

const markerDefault = {
  radius: 8,
  fillColor: "#ad1fd7",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

const markerConstruccion = {
  radius: 8,
  fillColor: "#1ebee6",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

const markerServicios = {
  radius: 8,
  fillColor: "#ff447f",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

const markerAgropecuario = {
  radius: 8,
  fillColor: "#8bd50e",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

const markerArte = {
  radius: 8,
  fillColor: "#ad1fd7",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

const markerComercio = {
  radius: 8,
  fillColor: "#F5B041",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

const markerIndustria = {
  radius: 8,
  fillColor: "#AAB7B8",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

function Instituciones(props) {
  const context = useLeafletContext();

  useEffect(() => {
    const container = context.layerContainer || context.map;

    const parksGeoJson = new L.GeoJSON(institucion_cuidados, {
      onEachFeature: (feature = {}, layer) => {
        const { properties = {} } = feature;
        const {
          cuidado_de,
          tipo_de_gestion,
          institucion,
          localidad,
          calle,
          numero,
          telefono,
          mail,
        } = properties;

        if (!institucion) return;

        let txt_popup = `<p><b>${institucion}</b></p>`;
        txt_popup += `<p>Cuidado: ${cuidado_de}</p>`;
        txt_popup += `<p>Tipo de Gestion: ${tipo_de_gestion}</p>`;
        txt_popup += `<p>Direccion: ${calle} ${numero}, ${localidad}</p>`;
        txt_popup += `<p>Telefono: ${telefono}</p>`;
        txt_popup += `<p>Email: ${mail}</p>`;
        layer.bindPopup(txt_popup);

        let txt_tooltip = `<p><b>${institucion}</b></p>`;
        /*if ( tipo_de_establecimiento )
                  txt_tooltip += '<p>Tipo de Establecimiento: '+tipo_de_establecimiento+'</p>';*/
        layer.bindTooltip(txt_tooltip);
      },
    });
    parksGeoJson.addTo(container);
  });
}

function EmpresaPropiedadMujeres(props) {
  const context = useLeafletContext();

  useEffect(() => {
    const container = context.layerContainer || context.map;

    const parksGeoJson = new L.GeoJSON(empresa_propiedad_mujeres, {
      onEachFeature: (feature = {}, layer) => {
        const { properties = {} } = feature;
        const { nombre, rubro, sitio_web, localidad, departamento } =
          properties;

        if (!nombre) return;

        let txt_popup = `<p><b>${nombre}</b></p>`;
        txt_popup += `<p>Rubro: ${rubro}</p>`;
        txt_popup += `<p>Redes: ${sitio_web ? sitio_web : ""}</p>`;
        txt_popup += `<p>Localidad: ${localidad}</p>`;
        txt_popup += `<p>Departamento: ${departamento}</p>`;
        layer.bindPopup(txt_popup);

        let txt_tooltip = `<p><b>${nombre}</b></p>`;
        /*if ( tipo_de_establecimiento )
                txt_tooltip += '<p>Tipo de Establecimiento: '+tipo_de_establecimiento+'</p>';*/
        layer.bindTooltip(txt_tooltip);
      },
      pointToLayer: function (feature, latlng) {
        let marker = markerDefault;
        if (feature.properties.rubro == "Construcción")
          marker = markerConstruccion;
        if (feature.properties.rubro == "Servicios") marker = markerServicios;
        if (feature.properties.rubro == "Agropecuario")
          marker = markerAgropecuario;
        if (feature.properties.rubro == "Arte") marker = markerArte;
        if (feature.properties.rubro == "Comercio") marker = markerComercio;
        if (feature.properties.rubro == "Industria") marker = markerIndustria;

        return L.circleMarker(latlng, marker);
      },
    });

    const markersAll = L.markerClusterGroup().addLayer(parksGeoJson);
    markersAll.addTo(container);

    var legend = L.control({ position: "bottomleft" });

    legend.onAdd = function (map) {
      var div = L.DomUtil.create("div", "legend");
      div.innerHTML += "<h4>Rubro</h4>";
      div.innerHTML +=
        '<i style="background: #1ebee6"></i><span>Construcción</span><br>';
      div.innerHTML +=
        '<i style="background: #ff447f"></i><span>Servicios</span><br>';
      div.innerHTML +=
        '<i style="background: #8bd50e"></i><span>Agropecuario</span><br>';
      div.innerHTML +=
        '<i style="background: #ad1fd7"></i><span>Arte</span><br>';
      div.innerHTML +=
        '<i style="background: #F5B041"></i><span>Comercio</span><br>';
      div.innerHTML +=
        '<i style="background: #AAB7B8"></i><span>Industria</span><br>';

      return div;
    };

    legend.addTo(container);
  });
}

const Map = () => {
  //
  //const map = useRef(null);
  //const mapRef = useRef();

  //const map =  React.createRef();
  //const defaultPosition: LatLngExpression = [-31.6244477760916, -60.698839780023754]; // Santa Fe position
  const defaultPosition = [-31.6244477760916, -60.698839780023754]; // Santa Fe position

  return (
    <MapContainer
      style={{ width: "100vw", height: "100vh" }}
      whenCreated={(mapInstance) => {
        this.mapRef.current = mapInstance;
      }}
      center={defaultPosition}
      zoom={7}
    >
      {/*<WMSTileLayer
                      layers='limite_provincial,departamentos,distritos'
                      url="https://aswe.santafe.gov.ar/idesf/wms"
                      crs={L.CRS.EPSG4326}
                      
                  />
                  <WMSTileLayer
                      layers='manzanasipec,ejesipec'
                      url="https://aswe.santafe.gov.ar/idesf/wms"
                      transparent={true}
                      format='image/png'
                      crs={L.CRS.EPSG4326}
                  />*/}
      {
        {
          /*   <TileLayer
          attribution='&copy; <a href="https://www.ign.gob.ar/">IGN</a> Instituto Geográfico Nacional'
          url="https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG%3A3857@png/{z}/{x}/{-y}.png"
        /> */
        }
      }
      {/*  <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/*<GeoJSON
                      data={institucion_cuidados}
                      style={{color: 'red'}}
                      
                  />*/}
      <EmpresaPropiedadMujeres />
    </MapContainer>
  );
};

export default Map;

// https://codesandbox.io/embed/github/colbyfayock/egghead-code-examples/tree/master/add-data-to-map-geojson-react-leaflet?fontsize=14&hidenavigation=1&theme=dark
// https://egghead.io/lessons/react-add-geojson-location-data-to-a-map-using-markers-and-popups-in-react-leaflet
// https://react-leaflet.js.org/docs/core-architecture/
