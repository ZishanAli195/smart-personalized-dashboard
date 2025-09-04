import React, { useEffect, useState } from 'react'
import { List, ListItem, ListItemText, Link, Typography } from '@mui/material'
import axios from 'axios'

export default function NewsWidget() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  const fetchNews = async () => {
    try {
      const url = 'https://hn.algolia.com/api/v1/search?tags=front_page'
      const res = await axios.get(url)
      setItems(res.data.hits.slice(0, 10))
    } catch (e) {
      setError('Failed to load news.')
    }
  }

  useEffect(() => { fetchNews() }, [])

  if (error) return <Typography color="error">{error}</Typography>

  return (
    <List dense>
      {items.map((n) => (
        <ListItem key={n.objectID} divider>
          <ListItemText
            primary={<Link href={n.url || `https://news.ycombinator.com/item?id=${n.objectID}`} target="_blank" rel="noreferrer">{n.title}</Link>}
            secondary={`${n.points} points • ${n.author}`}
          />
        </ListItem>
      ))}
    </List>
  )
}
