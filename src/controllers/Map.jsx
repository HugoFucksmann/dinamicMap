import {
  //    createElementHook,
  //<    createElementObject,
  useLeafletContext,
} from "@react-leaflet/core";
import React, { useEffect, useRef, useState } from "react";
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
import espacios_cuidados from "../../data/espacios_cuidados.json";
import empresa_propiedad_mujeres from "../../data/empresa_propiedad_mujeres.json";
import centros_linea_144 from "../../data/centros_linea_144.json";
import puntos_violeta from "../../data/puntos_violeta.json";
import organismos_myds from "../../data/organismos_myds.json";
import areas_mujer from "../../data/areas_mujer.json";

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

const markerInfancias = {
  radius: 8,
  fillColor: "#e05252",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

const markerDiscapacidad = {
  radius: 8,
  fillColor: "#99e052",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

const markerFormacionCuidados = {
  radius: 8,
  fillColor: "#8bd50e",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

const markerPersonasMayores = {
  radius: 8,
  fillColor: "#4fdcda",
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

// Marker linea 144

const markerFamilia = {
  radius: 8,
  fillColor: "#1ebee6",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

const markerLegal = {
  radius: 8,
  fillColor: "#ff447f",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

const markerGenero = {
  radius: 8,
  fillColor: "#8bd50e",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

const markerSeguridad = {
  radius: 8,
  fillColor: "#ad1fd7",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

const markerSalud = {
  radius: 8,
  fillColor: "#F5B041",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

const markerOtra = {
  radius: 8,
  fillColor: "#AAB7B8",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

const markerVioleta = {
  radius: 8,
  //fillColor: "#78288C",
  fillColor: "#9F00FF",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

const markerRegion1 = {
  radius: 8,
  fillColor: "#f8c507",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

const markerRegion2 = {
  radius: 8,
  fillColor: "#4582cb",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

const markerRegion3 = {
  radius: 8,
  fillColor: "#e93120",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

const markerRegion4 = {
  radius: 8,
  fillColor: "#f17116",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

const markerRegion5 = {
  radius: 8,
  fillColor: "#2a9244",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

function Instituciones(props) {
  const context = useLeafletContext();

  useEffect(() => {
    const container = context.layerContainer || context.map;

    const parksGeoJson = new L.GeoJSON(espacios_cuidados, {
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
        txt_popup += `<p>Direccion: ${calle ? calle : ""} ${
          numero ? numero : ""
        }, ${localidad}</p>`;
        txt_popup += `<p>Telefono: ${telefono ? telefono : ""}</p>`;
        txt_popup += `<p>Email: ${mail ? mail : ""}</p>`;
        layer.bindPopup(txt_popup);

        let txt_tooltip = `<p><b>${institucion}</b></p>`;
        /*if ( tipo_de_establecimiento )
                txt_tooltip += '<p>Tipo de Establecimiento: '+tipo_de_establecimiento+'</p>';*/
        layer.bindTooltip(txt_tooltip);
      },
      pointToLayer: function (feature, latlng) {
        let marker = markerDefault;
        if (feature.properties.cuidado_de == "Infancias")
          marker = markerInfancias;
        if (feature.properties.cuidado_de == "Discapacidad")
          marker = markerDiscapacidad;
        if (feature.properties.cuidado_de == "Formación en cuidados")
          marker = markerFormacionCuidados;
        if (feature.properties.cuidado_de == "Personas mayores")
          marker = markerPersonasMayores;

        return L.circleMarker(latlng, marker);
      },
    });
    /*const markersAll = L.markerClusterGroup().addLayer(parksGeoJson);
    markersAll.addTo(container);*/
    parksGeoJson.addTo(container);

    var legend = L.control({ position: "bottomright" });

    legend.onAdd = function (map) {
      var div = L.DomUtil.create("div", "legend");
      div.innerHTML += "<h4>Rubro</h4>";
      div.innerHTML +=
        '<i style="background: #e05252"></i><span>Infancias</span><br>';
      div.innerHTML +=
        '<i style="background: #99e052"></i><span>Discapacidad</span><br>';
      div.innerHTML +=
        '<i style="background: #8bd50e"></i><span>Formación en cuidados</span><br>';
      div.innerHTML +=
        '<i style="background: #4fdcda"></i><span>Personas mayores</span><br>';

      return div;
    };

    legend.addTo(container);
    //parksGeoJson.addTo(container);
  });
}

function EmpresaPropiedadMujeres(props) {
  const context = useLeafletContext();
  const [nombreFilter, setNombreFilter] = useState(null);
  const [rubroFilter, setRubroFilter] = useState(null);

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
      filter: function (feature) {
        let flag = true;
        let { nombre, rubro } = feature.properties;

        flag &= filtrarNombre(nombre);
        flag &= filtrarRubro(rubro);

        return flag;
      },
    });

    const markersAll = L.markerClusterGroup().addLayer(parksGeoJson);
    markersAll.addTo(container);

    var legend = L.control({ position: "bottomright" });

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

  function filtrarRubro(rubro) {
    if (rubroFilter == null) return true;

    return rubro == rubroFilter;
  }

  function filtrarNombre(nombre) {
    if (nombreFilter == null) return true;

    return nombre.toLowerCase().search(nombreFilter.toLowerCase()) >= 0;
  }
}

function CentrosLinea144(props) {
  const context = useLeafletContext();
  const [nombreFilter, setNombreFilter] = useState(null);
  const [rubroFilter, setRubroFilter] = useState(null);

  useEffect(() => {
    const container = context.layerContainer || context.map;

    const parksGeoJson = new L.GeoJSON(centros_linea_144, {
      onEachFeature: (feature = {}, layer) => {
        const { properties = {} } = feature;
        const {
          municipio,
          tipo,
          institucion,
          localidad,
          direccion,
          telefono,
          horario,
          mas_info,
          correo_electronico,
          web,
        } = properties;

        if (!institucion) return;

        let txt_popup = `<p><b>${institucion}</b></p>`;
        txt_popup += `<p>Municipio: ${municipio}</p>`;
        txt_popup += `<p>Localidad: ${localidad}</p>`;
        txt_popup += `<p>Tipo: ${tipo}</p>`;
        txt_popup += `<p>Direccion: ${direccion}</p>`;
        txt_popup += `<p>Telefono: ${telefono}</p>`;
        txt_popup += `<p>Horario: ${horario}</p>`;
        txt_popup += `<p>Más Info: ${mas_info}</p>`;
        txt_popup += `<p>E-Mail: ${
          correo_electronico ? correo_electronico : ""
        }</p>`;
        txt_popup += `<p>web: ${web ? web : ""}</p>`;

        layer.bindPopup(txt_popup);

        let txt_tooltip = `<p><b>${institucion}</b></p>`;
        /*if ( tipo_de_establecimiento )
                txt_tooltip += '<p>Tipo de Establecimiento: '+tipo_de_establecimiento+'</p>';*/
        layer.bindTooltip(txt_tooltip);
      },
      pointToLayer: function (feature, latlng) {
        let marker = markerDefault;
        if (feature.properties.tipo == "Familia, Niñez y Adolescencia")
          marker = markerFamilia;
        if (feature.properties.tipo == "Legal") marker = markerLegal;
        if (feature.properties.tipo == "Áreas de Género y Diversidad")
          marker = markerGenero;
        if (feature.properties.tipo == "Seguridad") marker = markerSeguridad;
        if (feature.properties.tipo == "Salud") marker = markerSalud;
        if (feature.properties.tipo == "Otra") marker = markerOtra;

        return L.circleMarker(latlng, marker);
      },
      filter: function (feature) {
        let flag = true;
        let { institucion, localidad } = feature.properties;

        //flag &= filtrarNombre(institucion);

        return flag;
      },
    });

    const markersAll = L.markerClusterGroup().addLayer(parksGeoJson);
    markersAll.addTo(container);

    var legend = L.control({ position: "bottomright" });

    legend.onAdd = function (map) {
      var div = L.DomUtil.create("div", "legend");
      div.innerHTML += "<h4>Tipo</h4>";
      div.innerHTML +=
        '<i style="background: #1ebee6"></i><span>Familia, Niñez y Adolescencia</span><br>';
      div.innerHTML +=
        '<i style="background: #ff447f"></i><span>Legal</span><br>';
      div.innerHTML +=
        '<i style="background: #8bd50e"></i><span>Áreas de Género y Diversidad</span><br>';
      div.innerHTML +=
        '<i style="background: #ad1fd7"></i><span>Seguridad</span><br>';
      div.innerHTML +=
        '<i style="background: #F5B041"></i><span>Salud</span><br>';
      div.innerHTML +=
        '<i style="background: #AAB7B8"></i><span>Otra</span><br>';

      return div;
    };

    legend.addTo(container);
  });

  function filtrarRubro(rubro) {
    if (rubroFilter == null) return true;

    return rubro == rubroFilter;
  }

  function filtrarNombre(nombre) {
    if (nombreFilter == null) return true;

    return nombre.toLowerCase().search(nombreFilter.toLowerCase()) >= 0;
  }
}

function PuntosVioleta(props) {
  const context = useLeafletContext();
  const [nombreFilter, setNombreFilter] = useState(null);
  const [rubroFilter, setRubroFilter] = useState(null);

  useEffect(() => {
    const container = context.layerContainer || context.map;

    const parksGeoJson = new L.GeoJSON(puntos_violeta, {
      onEachFeature: (feature = {}, layer) => {
        const { properties = {} } = feature;
        const { localidad, referente, telefono, dia } = properties;

        if (!localidad) return;

        let txt_popup = `<p><b>${localidad}</b></p>`;
        txt_popup += `<p>Localidad: ${localidad}</p>`;
        txt_popup += `<p>referente: ${referente ? referente : ""}</p>`;
        txt_popup += `<p>Telefono: ${telefono ? telefono : ""}</p>`;
        txt_popup += `<p>dia: ${dia ? dia : ""}</p>`;

        layer.bindPopup(txt_popup);

        let txt_tooltip = `<p><b>${localidad}</b></p>`;
        /*if ( tipo_de_establecimiento )
              txt_tooltip += '<p>Tipo de Establecimiento: '+tipo_de_establecimiento+'</p>';*/
        layer.bindTooltip(txt_tooltip);
      },
      pointToLayer: function (feature, latlng) {
        let marker = markerVioleta;

        return L.circleMarker(latlng, marker);
      },
      filter: function (feature) {
        let flag = true;
        let { institucion, localidad } = feature.properties;

        //flag &= filtrarNombre(institucion);

        return flag;
      },
    });

    const markersAll = L.markerClusterGroup().addLayer(parksGeoJson);
    markersAll.addTo(container);

    var legend = L.control({ position: "bottomright" });

    legend.onAdd = function (map) {
      var div = L.DomUtil.create("div", "legend");
      div.innerHTML += "<h4>Puntos Violeta</h4>";
      div.innerHTML +=
        '<i style="background: #9F00FF"></i><span>Puntos Violeta</span><br>';

      return div;
    };

    legend.addTo(container);
  });

  function filtrarRubro(rubro) {
    if (rubroFilter == null) return true;

    return rubro == rubroFilter;
  }

  function filtrarNombre(nombre) {
    if (nombreFilter == null) return true;

    return nombre.toLowerCase().search(nombreFilter.toLowerCase()) >= 0;
  }
}

function OrganismosMyds(props) {
  const context = useLeafletContext();
  const [nombreFilter, setNombreFilter] = useState(null);
  const [rubroFilter, setRubroFilter] = useState(null);

  useEffect(() => {
    const container = context.layerContainer || context.map;

    const parksGeoJson = new L.GeoJSON(organismos_myds, {
      onEachFeature: (feature = {}, layer) => {
        const { properties = {} } = feature;
        const {
          nro,
          anio,
          convenio_por,
          nombre,
          localidad,
          nombre_apellido_r1,
          nombre_apellido_r2,
          tematica_objetivos,
          telefono,
          direccion,
          email,
        } = properties;

        if (!localidad) return;

        let txt_popup = `<p><b>${nombre}</b></p>`;
        txt_popup += `<p>Nro: ${nro}</p>`;
        txt_popup += `<p>Convenio: ${convenio_por}</p>`;
        txt_popup += `<p>Localidad: ${localidad}</p>`;
        txt_popup += `<p>Referente: ${
          nombre_apellido_r1 ? nombre_apellido_r1 : ""
        }</p>`;
        txt_popup += `<p>Temática/Objetivos: ${
          tematica_objetivos ? tematica_objetivos : ""
        }</p>`;
        txt_popup += `<p>Teléfono: ${telefono ? telefono : ""}</p>`;
        txt_popup += `<p>E-Mail: ${email ? email : ""}</p>`;
        txt_popup += `<p>Dirección: ${direccion ? direccion : ""}</p>`;

        layer.bindPopup(txt_popup);

        let txt_tooltip = `<p><b>${nombre}</b></p>`;
        /*if ( tipo_de_establecimiento )
              txt_tooltip += '<p>Tipo de Establecimiento: '+tipo_de_establecimiento+'</p>';*/
        layer.bindTooltip(txt_tooltip);
      },
      pointToLayer: function (feature, latlng) {
        let marker = markerVioleta;

        return L.circleMarker(latlng, marker);
      },
      filter: function (feature) {
        let flag = true;
        let { nombre, localidad } = feature.properties;

        //flag &= filtrarNombre(institucion);

        return flag;
      },
    });

    const markersAll = L.markerClusterGroup().addLayer(parksGeoJson);
    markersAll.addTo(container);

    var legend = L.control({ position: "bottomright" });

    legend.onAdd = function (map) {
      var div = L.DomUtil.create("div", "legend");
      div.innerHTML += "<h4>Puntos Violeta</h4>";
      div.innerHTML +=
        '<i style="background: #9F00FF"></i><span>Puntos Violeta</span><br>';

      return div;
    };

    legend.addTo(container);
  });

  function filtrarRubro(rubro) {
    if (rubroFilter == null) return true;

    return rubro == rubroFilter;
  }

  function filtrarNombre(nombre) {
    if (nombreFilter == null) return true;

    return nombre.toLowerCase().search(nombreFilter.toLowerCase()) >= 0;
  }
}

function AreasMujer(props) {
  const context = useLeafletContext();
  const [nombreFilter, setNombreFilter] = useState(null);
  const [rubroFilter, setRubroFilter] = useState(null);

  useEffect(() => {
    const container = context.layerContainer || context.map;

    const parksGeoJson = new L.GeoJSON(areas_mujer, {
      onEachFeature: (feature = {}, layer) => {
        const { properties = {} } = feature;
        const { region, loc } = properties;

        if (!loc) return;

        let txt_popup = `<p><b>${loc}</b></p>`;
        txt_popup += `<p>Localidad: ${loc}</p>`;
        txt_popup += `<p>${region}</p>`;

        layer.bindPopup(txt_popup);

        let txt_tooltip = `<p><b>${loc}</b></p>`;
        /*if ( tipo_de_establecimiento )
              txt_tooltip += '<p>Tipo de Establecimiento: '+tipo_de_establecimiento+'</p>';*/
        layer.bindTooltip(txt_tooltip);
      },
      pointToLayer: function (feature, latlng) {
        let marker = markerDefault;
        const { region, loc } = feature.properties;

        if (region.includes("1")) marker = markerRegion1;
        if (region.includes("2")) marker = markerRegion2;
        if (region.includes("3")) marker = markerRegion3;
        if (region.includes("4")) marker = markerRegion4;
        if (region.includes("5")) marker = markerRegion5;

        return L.circleMarker(latlng, marker);
      },
      filter: function (feature) {
        let flag = true;
        let { loc, region } = feature.properties;

        //flag &= filtrarNombre(institucion);

        return flag;
      },
    });

    //const markersAll = L.markerClusterGroup().addLayer(parksGeoJson);
    //markersAll.addTo(container);
    parksGeoJson.addTo(container);

    var legend = L.control({ position: "bottomright" });

    legend.onAdd = function (map) {
      var div = L.DomUtil.create("div", "legend");
      div.innerHTML += "<h4>Areas de la mujer</h4>";
      div.innerHTML +=
        '<i style="background: #f8c507"></i><span>Region 1</span><br>';
      div.innerHTML +=
        '<i style="background: #4582cb"></i><span>Region 2</span><br>';
      div.innerHTML +=
        '<i style="background: #e93120"></i><span>Region 3</span><br>';
      div.innerHTML +=
        '<i style="background: #f17116"></i><span>Region 4</span><br>';
      div.innerHTML +=
        '<i style="background: #2a9244"></i><span>Region 5</span><br>';

      return div;
    };

    legend.addTo(container);
  });

  function filtrarRubro(rubro) {
    if (rubroFilter == null) return true;

    return rubro == rubroFilter;
  }

  function filtrarNombre(nombre) {
    if (nombreFilter == null) return true;

    return nombre.toLowerCase().search(nombreFilter.toLowerCase()) >= 0;
  }
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
          /*  <TileLayer
          attribution='&copy; <a title="Instituto Geográfico Nacional" href="https://www.ign.gob.ar/">IGN</a> | <a title="Ministerio de Igualdad, Género y Diversidad" href="https://www.santafe.gov.ar/index.php/web/Temas-Nuevo-Portal/Igualdad-Genero-y-Diversidad">MIGyD</a>'
          url="https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG%3A3857@png/{z}/{x}/{-y}.png"
        /> */
        }
      }
      {/*   <TileLayer
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
      <AreasMujer />
    </MapContainer>
  );
};

export default Map;
