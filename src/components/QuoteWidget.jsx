import React, { useEffect, useState } from 'react';
import WidgetCard from './WidgetCard';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

export default function QuoteWidget() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    fetch('https://api.quotable.io/random')
      .then(res => res.json())
      .then(data => setQuote(`${data.content} — ${data.author}`))
      .catch(() => setQuote('Stay positive and keep learning!'));
  }, []);

  return (
    <WidgetCard title="Quote of the Day" icon={<FormatQuoteIcon />}>
      <blockquote style={{ fontStyle: 'italic', margin: 0 }}>{quote}</blockquote>
    </WidgetCard>
  );
}