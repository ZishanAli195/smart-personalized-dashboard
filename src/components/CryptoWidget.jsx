// CryptoWidget.jsx
import React, { useState, useEffect } from 'react';
import WidgetCard from './WidgetCard';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function CryptoWidget({ coin = 'bitcoin' }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=7`
    )
      .then(res => res.json())
      .then(result => {
        setData(result);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [coin]);

  if (loading)
    return <WidgetCard title="Crypto" icon={<MonetizationOnIcon />}>Loading...</WidgetCard>;

  if (!data) 
    return <WidgetCard title="Crypto" icon={<MonetizationOnIcon />}>Error loading data</WidgetCard>;

  const prices = data.prices.map(p => p[1]);
  const timestamps = data.prices.map(p => new Date(p[0]).toLocaleDateString());

  const latestPrice = prices[prices.length - 1] ?? 0;

  const chartData = {
    labels: timestamps,
    datasets: [
      {
        label: 'Price USD',
        data: prices,
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  };

  return (
    <WidgetCard title={`${coin.toUpperCase()} / USD`} icon={<MonetizationOnIcon />}>
      <h2>${latestPrice.toLocaleString()}</h2>
      <Line data={chartData} options={{ responsive: true, plugins: { legend: { display: false } }}} />
    </WidgetCard>
  );
}
