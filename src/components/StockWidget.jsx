import React, { useState, useEffect } from 'react';
import WidgetCard from './WidgetCard';
import ShowChartIcon from '@mui/icons-material/ShowChart';

export default function StockWidget({ symbol = "AAPL" }) {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`)
      .then(res => res.json())
      .then(data => {
        const quote = data.quoteResponse.result[0];
        setPrice(quote ? quote.regularMarketPrice : "N/A");
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