// src/components/ChartComponent.tsx
import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';

Chart.register(LineElement, PointElement, LinearScale, CategoryScale);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill: boolean;
  }[];
}

const ChartComponent: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData>({
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

  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found in localStorage.");
      return;
    }

    // Get the API base URL from environment variables
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    if (!apiUrl) {
      console.error("REACT_APP_API_BASE_URL is not set.");
      return;
    }

    // Build the WebSocket URL by replacing 'http' or 'https' with 'wss'
    const wsUrl = `${apiUrl.replace(/^https?/, 'wss')}/ws/numbers?token=${token}`;
    console.log("Connecting to WebSocket URL:", wsUrl);
    
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.current.onmessage = (event: MessageEvent) => {
      try {
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
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.current.onerror = (error: Event) => {
      console.error("WebSocket error:", error);
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  return (
    <div>
      <Line data={chartData} />
    </div>
  );
};

export default ChartComponent;
