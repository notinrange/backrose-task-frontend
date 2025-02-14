// src/components/ChartComponent.jsx
import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';

Chart.register(LineElement, PointElement, LinearScale, CategoryScale);

const ChartComponent = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Random Numbers',
        data: [],
        borderColor: 'rgba(144, 202, 249, 1)',
        backgroundColor: 'rgba(144, 202, 249, 0.2)',
        fill: true,
      },
    ],
  });

  const ws = useRef(null);

  useEffect(() => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    // Connect to the WebSocket endpoint (adjust the URL if needed)
    ws.current = const ws = new WebSocket(`${process.env.REACT_APP_API_BASE_URL.replace(/^http/, 'ws')}/ws/numbers?token=${token}`);
    
    ws.current.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const timestamp = new Date(message.timestamp).toLocaleTimeString();
      const value = message.value;
      // Update chart data while keeping only the last 20 entries
      setChartData((prevData) => ({
        labels: [...prevData.labels, timestamp].slice(-20),
        datasets: [
          {
            ...prevData.datasets[0],
            data: [...prevData.datasets[0].data, value].slice(-20),
          },
        ],
      }));
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.current.close();
    };
  }, []);

  return (
    <div>
      <Line data={chartData} />
    </div>
  );
};

export default ChartComponent;
