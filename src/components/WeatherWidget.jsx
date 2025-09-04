import React, { useEffect, useState } from 'react'
import { TextField, InputAdornment, IconButton, Stack, Typography, Tooltip } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import axios from 'axios'

export default function WeatherWidget() {
  const [city, setCity] = useState(localStorage.getItem('city') || 'New Delhi')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const getWeather = async (c = city) => {
    try {
      setLoading(true); setError('')
      const key = import.meta.env.VITE_OPENWEATHER_KEY
      if (!key) { setError('Set VITE_OPENWEATHER_KEY in .env'); setLoading(false); return }
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(c)}&appid=${key}&units=metric`
      const res = await axios.get(url)
      setData(res.data)
      localStorage.setItem('city', c)
    } catch (e) {
      setError('City not found or network error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { getWeather(city) }, [])

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {/* Search bar */}
      <Stack direction="row" spacing={1} alignItems="center">
        <TextField
          size="small"
          label="City"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Search">
                  <IconButton onClick={() => getWeather()} size="small"><SearchIcon /></IconButton>
                </Tooltip>
              </InputAdornment>
            )
          }}
        />
      </Stack>

      {/* Loading / Error */}
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {/* Weather data */}
      {data && (
        <div className="weather" style={{ textAlign: "center" }}>
          {/* Weather Icon */}
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={data.weather[0].description}
            style={{ width: 100, height: 100 }}
          />

          <Typography variant="h3" sx={{ fontWeight: 800 }}>
            {Math.round(data.main.temp)}°C
          </Typography>
          <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
            {data.weather[0].description}
          </Typography>
          <Typography variant="body2">
            Humidity: {data.main.humidity}% · Wind: {Math.round(data.wind.speed)} m/s
          </Typography>
        </div>
      )}
    </div>
  )
}
