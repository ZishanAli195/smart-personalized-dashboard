import React, { useState, useEffect } from 'react';
import WidgetCard from './WidgetCard';
import ShowChartIcon from '@mui/icons-material/ShowChart';

export default function StockWidget({ symbol = "AAPL" }) {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const key = import.meta.env.VITE_FINNHUB_KEY;
    fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${key}`)
      .then(res => res.json())
      .then(data => {
        setPrice(data.c || "N/A"); // current price
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [symbol]);

  return (
    <WidgetCard title={`${symbol} / USD`} icon={<ShowChartIcon />}>
      {loading ? <div>Loading...</div> : <h2>${price}</h2>}
    </WidgetCard>
  );
}
