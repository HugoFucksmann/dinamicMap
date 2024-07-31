import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  indexAxis: "y",

  plugins: {
    legend: {
      position: "top",
      labels: {
        // This more specific font property overrides the global property
        font: {
          size: 12,
        },
      },
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
  scales: {
    y: {
      ticks: {
        //  color: "red",
        font: {
          size: 12,
        },
      },
    },
    x: {
      ticks: {
        // color: "red",
        font: {
          size: 12,
        },
      },
    },
  },
};
const labels = ["J", "F", "M"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [690, 976, 626],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export function HorizontalBarChart() {
  return <Bar options={options} data={data} />;
}
