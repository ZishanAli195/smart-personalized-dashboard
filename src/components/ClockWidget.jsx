import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material'

const greetings = (d) => {
  const h = d.getHours()
  if (h < 5) return 'Good night'
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

export default function ClockWidget() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <Typography variant="h4" sx={{ fontWeight: 800 }}>{greetings(now)} 👋</Typography>
      <Typography variant="h2" sx={{ letterSpacing: 1 }}>
        {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </Typography>
      <Typography variant="body1">
        {now.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </Typography>
    </div>
  )
}
