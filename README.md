# Aplicación de Mapas Interactivos React

## 📝 Descripción

Esta aplicación web React proporciona un mapa interactivo con funcionalidades de filtrado, búsqueda, visualización de puntos en el mapa y gráficos estadísticos. La característica más destacada es su capacidad para generar automáticamente un nuevo mapa con filtros, puntos y colores personalizados simplemente cargando un archivo JSON con una estructura predefinida.
✨ Características principales

- 🗺️ Mapa interactivo con marcadores
- 🔍 Filtros dinámicos
- 🔎 Buscador integrado
- 📊 Visualización de datos mediante gráficos
- 🔄 Generación automática de mapas a partir de archivos JSON

# 🛠️ Tecnologías utilizadas

- ⚛️ React 18.3.1
- 🌐 Context API para el manejo del estado
- 🍃 Leaflet 1.9.4 para la visualización de mapas
- 📈 Chart.js 4.4.3 para la creación de gráficos
- 🔐 dotenv 16.4.5 para la gestión de variables de entorno

## 📦 Dependencias

```
{
    "chart.js": "^4.4.3",
    "dotenv": "^16.4.5",
    "leaflet": "^1.9.4",
    "leaflet.markercluster": "^1.5.3",
    "react": "^18.3.1",
    "react-chartjs-2": "^5.2.0",
    "react-dom": "^18.3.1",
    "react-leaflet": "^4.2.1"
}
```

## 🚀 Instalación

```
- git clone "https://github.com/HugoFucksmann/dinamicMap"
- cd dinamicMap
- npm install
- npm run dev
```

## 📖 Uso

- Carga tu archivo JSON con la estructura requerida
- La aplicación generará automáticamente un mapa interactivo con los puntos, filtros y colores especificados en el JSON
- Utiliza los filtros para refinar la visualización de los datos
- Usa el buscador para encontrar ubicaciones específicas
- Explora los gráficos generados a partir de los datos

## 📄 Estructura del archivo JSON

Para que la aplicación funcione correctamente, el archivo JSON debe tener la siguiente estructura:

```
interface Legend {
  urlTitle: string;
  text: string;
  url: string;
  urlText: string;
}

interface LegendOptions {
  title: string;
  colorKey: string;
  items: string[];
}

interface KeyPoints {
  tooltipTxt: string;
  keysToShow: {
    [key: string]: string;
  };
}

interface Chart {
  filterKey: string;
  title: string;
}

interface FeatureKeys {
  keyLocalidad: string;
  keyDepartamento: string;
}

interface FilterData {
  [key: string]: {
    dataKey?: string;
    label?: string;
  };
}

interface InfoTab {
  title: string;
  items: string[];
}

interface DataStructure {
  legend: Legend;
  legendOptions: LegendOptions;
  keyPoints: KeyPoints;
  charts: Chart[];
  featureKeys: FeatureKeys;
  filtersData: FilterData;
  infoTab: InfoTab;
}
```

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

- Haz fork del proyecto
- Crea una nueva rama (git checkout -b feature/AmazingFeature)
- Haz commit de tus cambios (git commit -m 'Add some AmazingFeature')
- Haz push a la rama (git push origin feature/AmazingFeature)
- Abre un Pull Request

## 📞 Contacto

- Hugo Fucksmann
- https://www.linkedin.com/in/hugofucksmann/
- hugoffuksmann@gmail.com
