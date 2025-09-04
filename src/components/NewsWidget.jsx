import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Link,
  Typography,
  Divider,
  CircularProgress,
  Box
} from "@mui/material";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

export default function NewsWidget() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const url = "https://hn.algolia.com/api/v1/search?tags=front_page";
      const res = await axios.get(url);
      setItems(res.data.hits.slice(0, 8)); // top 8
    } catch (e) {
      setError("Failed to load news.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", py: 2 }}>
        <CircularProgress size={28} />
        <Typography variant="body2">Loading news...</Typography>
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
        📰 Latest Tech News
      </Typography>
      <Divider sx={{ mb: 1 }} />

      <List dense>
        {items.map((n) => (
          <ListItem key={n.objectID} divider>
            <ListItemText
              primary={
                <Link
                  href={
                    n.url ||
                    `https://news.ycombinator.com/item?id=${n.objectID}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  underline="hover"
                >
                  {n.title.length > 80
                    ? n.title.slice(0, 80) + "..."
                    : n.title}{" "}
                  🔗
                </Link>
              }
              secondary={`${n.points} points • ${n.author} • ${formatDistanceToNow(
                new Date(n.created_at)
              )} ago`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
