import React, { useMemo, useState, useEffect } from 'react'
import { ThemeProvider, createTheme, CssBaseline, Container } from '@mui/material'
import Navbar from './components/Navbar.jsx'
import WidgetCard from './components/WidgetCard.jsx'
import WeatherWidget from './components/WeatherWidget.jsx'
import NewsWidget from './components/NewsWidget.jsx'
import CryptoWidget from './components/CryptoWidget.jsx'
import TodoWidget from './components/TodoWidget.jsx'
import ClockWidget from './components/ClockWidget.jsx'
import CalendarWidget from './components/CalendarWidget.jsx'
import NotesWidget from './components/NotesWidget.jsx'
import QuoteWidget from './components/QuoteWidget.jsx'
import StockWidget from './components/StockWidget.jsx'
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import './styles/global.scss'

const defaultLayout = [
  { i: 'clock',  x: 0, y: 0, w: 3, h: 2 },
  { i: 'weather',x: 3, y: 0, w: 4, h: 3 },
  { i: 'news',   x: 7, y: 0, w: 5, h: 6 },
  { i: 'crypto', x: 0, y: 2, w: 3, h: 2 },
  { i: 'todo',   x: 3, y: 3, w: 4, h: 3 }
]

const getStored = (key, fallback) => {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback } catch { return fallback }
}

export default function App() {
  const [mode, setMode] = useState(getStored('theme', 'dark'))
  const [layout, setLayout] = useState(getStored('layout', defaultLayout))

  useEffect(() => { localStorage.setItem('theme', JSON.stringify(mode)) }, [mode])
  useEffect(() => { localStorage.setItem('layout', JSON.stringify(layout)) }, [layout])

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: '#7c3aed' },
      secondary: { main: '#06b6d4' },
      background: {
        default: mode === 'dark' ? '#0b1020' : '#f6f7fb',
        paper: mode === 'dark' ? 'rgba(20,25,45,0.6)' : '#ffffff'
      }
    },
    shape: { borderRadius: 16 },
    typography: { fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif' }
  }), [mode])

  const onLayoutChange = (newLayout) => setLayout(newLayout)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={mode === 'dark' ? "bg-gradient dark dashboard-container" : "bg-gradient light dashboard-container"}>
        <Navbar mode={mode} setMode={setMode} />
        <Container maxWidth="xl" sx={{ py: 3 }}>
          <div className="widgets-grid">
            <ClockWidget />
            <WeatherWidget />
            <CryptoWidget />
            <NewsWidget />
            <TodoWidget />
            <CalendarWidget />
            <NotesWidget />
            <QuoteWidget />
            <StockWidget />
          </div>
        </Container>
      </div>
    </ThemeProvider>
  )
}
