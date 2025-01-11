"use client"

import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';
  
  // Register the necessary components
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );


export default function AnalyticsDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/analytics');
      const result = await response.json();
      setData(result);
    };
    fetchData();
  }, []);

  const chartData = {
    // Look up error Property 'model/accuracy/relevance/responseTime' does not exist on type 'never'
    labels: data.map((item) => item.model),
    datasets: [
      {
        label: 'Accuracy',
        data: data.map((item) => item.accuracy),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Relevance',
        data: data.map((item) => item.relevance),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
      {
        label: 'Response Time',
        data: data.map((item) => item.responseTime),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      },
    ],
  };

  return <Bar data={chartData} />;
}
