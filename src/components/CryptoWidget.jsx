import React, { useState, useEffect } from "react";
import WidgetCard from "./WidgetCard";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

export default function CryptoWidget({ coin = "bitcoin" }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd&include_24hr_change=true&include_24hr_high_low=true`
    )
      .then((res) => res.json())
      .then((result) => {
        setData(result[coin] || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [coin]);

  if (loading)
    return (
      <WidgetCard title="Crypto" icon={<MonetizationOnIcon />}>
        Loading...
      </WidgetCard>
    );

  if (!data)
    return (
      <WidgetCard title="Crypto" icon={<MonetizationOnIcon />}>
        Error loading data
      </WidgetCard>
    );

  const price = data.usd ?? 0;
  const change = data.usd_24h_change ?? 0;
  const high = data.usd_24h_high ?? 0;
  const low = data.usd_24h_low ?? 0;

  return (
    <WidgetCard title="BTC / USD" icon={<MonetizationOnIcon />}>
      <h2>${price.toLocaleString()}</h2>
      <p style={{ color: change >= 0 ? "green" : "red" }}>
        {change.toFixed(2)}% (24h)
      </p>
      <p>
        High: ${high.toLocaleString()} · Low: ${low.toLocaleString()}
      </p>
    </WidgetCard>
  );
}
