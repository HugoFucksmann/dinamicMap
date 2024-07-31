import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { generateColorsWithTransparency } from "../utils/generateColors";

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart({ geoJSONData, filterKey, title }) {
  // function generateColorsWithTransparency(numColors, transparency = 0.2) {
  //   const colorStep = 360 / numColors;
  //   return Array.from({ length: numColors }, (_, i) => {
  //     const hue = i * colorStep;
  //     return `hsla(${hue}, 70%, 50%, ${transparency})`;
  //   });
  // }

  const puntosConGeometry = geoJSONData.features.filter(
    (obj) => obj.geometry !== null
  );

  function calculateStatistics(data, property) {
    const countsByProperty = data.reduce((counts, obj) => {
      const prop = obj.properties[property].toLowerCase();
      counts[prop] = (counts[prop] || 0) + 1;
      return counts;
    }, {});

    return { items: Object.keys(countsByProperty), countsByProperty };
  }

  const { items, countsByProperty } = calculateStatistics(
    puntosConGeometry,
    filterKey
  );
  const cant = Object.keys(countsByProperty).length;

  const data = {
    labels: items,
    datasets: [
      {
        data: Object.values(countsByProperty),
        backgroundColor: generateColorsWithTransparency(cant, 0.2),
        borderColor: generateColorsWithTransparency(cant, 1),
        borderWidth: 1,
      },
    ],
  };

  function calculatePercentage(value, total) {
    const percentage = ((value / total) * 100).toFixed(2);
    return `${value} (${percentage}%)`;
  }

  const options = {
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const total = data.datasets[tooltipItem.datasetIndex].data.reduce(
              (a, b) => a + b,
              0
            );
            const value =
              data.datasets[tooltipItem.datasetIndex].data[
                tooltipItem.dataIndex
              ];
            return calculatePercentage(value, total);
          },
        },
      },
      legend: {
        position: "top",
        align: "start",
        labels: {
          boxWidth: 12,
          fontSize: 12,
          padding: 6,
          generateLabels: function (chart) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map(function (label, index) {
                const value = data.datasets[0].data[index];
                const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(2);
                return {
                  text: `${label}: ${value} (${percentage}%)`,
                  fillStyle: data.datasets[0].backgroundColor[index],
                };
              });
            }
            return [];
          },
        },
      },
    },
  };
  return (
    <div
      style={{
        margin: 8,
        padding: 8,
        backgroundColor: "#E0F1FF",
        borderRadius: 8,
      }}
    >
      <h6>{title}</h6>
      <div
        style={{
          height: 180 + cant * 25,
        }}
      >
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}
