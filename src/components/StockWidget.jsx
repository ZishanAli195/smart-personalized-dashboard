import React, { useState, useEffect } from 'react';
import WidgetCard from './WidgetCard';
import ShowChartIcon from '@mui/icons-material/ShowChart';

export default function StockWidget({ symbol = "AAPL" }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const key = import.meta.env.VITE_FINNHUB_KEY;
    if (!key) {
      console.error("Finnhub API key missing! Check your .env file.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${key}`);
        const json = await res.json();
        console.log("Finnhub API response:", json); // Debug
        if (json && json.c !== undefined) {
          setData(json);
        } else {
          setData(null);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol]);

  if (loading)
    return (
      <WidgetCard title={`${symbol} / USD`} icon={<ShowChartIcon />}>
        Loading...
      </WidgetCard>
    );

  if (!data)
    return (
      <WidgetCard title={`${symbol} / USD`} icon={<ShowChartIcon />}>
        Error loading data
      </WidgetCard>
    );

  const { c: current, pc: prevClose, h: high, l: low } = data;
  const change = current - prevClose;
  const percentChange = (change / prevClose) * 100;

  return (
    <WidgetCard title={`${symbol} / USD`} icon={<ShowChartIcon />}>
      <h2>${current.toFixed(2)}</h2>
      <p style={{ color: change >= 0 ? 'green' : 'red' }}>
        {change.toFixed(2)} ({percentChange.toFixed(2)}%)
      </p>
      <p>
        High: ${high.toFixed(2)} · Low: ${low.toFixed(2)}
      </p>
    </WidgetCard>
  );
}
