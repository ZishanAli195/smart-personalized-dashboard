import React, { useEffect, useState } from 'react';
import WidgetCard from './WidgetCard';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

export default function QuoteWidget() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const today = new Date().toDateString(); // e.g., "Wed Sep 04 2025"
    const storedQuote = JSON.parse(localStorage.getItem('dailyQuote') || '{}');

    if (storedQuote.date === today && storedQuote.quote) {
      // Use stored quote if it's for today
      setQuote(storedQuote.quote);
    } else {
      // Fetch new quote and store it
      fetch('https://api.quotable.io/random')
        .then(res => res.json())
        .then(data => {
          const newQuote = `${data.content} — ${data.author}`;
          setQuote(newQuote);
          localStorage.setItem(
            'dailyQuote',
            JSON.stringify({ date: today, quote: newQuote })
          );
        })
        .catch(() => {
          const fallback = 'Stay positive and keep learning!';
          setQuote(fallback);
          localStorage.setItem(
            'dailyQuote',
            JSON.stringify({ date: today, quote: fallback })
          );
        });
    }
  }, []);

  return (
    <WidgetCard title="Quote of the Day" icon={<FormatQuoteIcon />}>
      <blockquote style={{ fontStyle: 'italic', margin: 0 }}>{quote}</blockquote>
    </WidgetCard>
  );
}
