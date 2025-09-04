import React, { useEffect, useState } from 'react';
import WidgetCard from './WidgetCard';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';

export default function CryptoWidget() {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
      .then(res => res.json())
      .then(data => {
        setPrice(data.bitcoin.usd);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch price');
        setLoading(false);
      });
  }, []);

  return (
    <WidgetCard title="BTC / USD" icon={<CurrencyBitcoinIcon />}>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {price && (
        <div>
          <h2>${price}</h2>
        </div>
      )}
    </WidgetCard>
  );
}
