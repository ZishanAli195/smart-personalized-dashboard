import React from 'react';
import WidgetCard from './WidgetCard';
import EventIcon from '@mui/icons-material/Event';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

// Sample events
const events = [
  { date: '2025-09-05', title: 'Project Meeting' },
  { date: '2025-09-07', title: 'Doctor Appointment' },
  { date: '2025-09-10', title: "Friend's Birthday" },
];

export default function CalendarWidget() {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <WidgetCard title="Upcoming Events" icon={<EventIcon />}>
      {events.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No upcoming events
        </Typography>
      ) : (
        <List dense>
          {events.map((e, i) => (
            <ListItem key={i} divider>
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: e.date === today ? 'bold' : 'normal',
                      color: e.date === today ? 'primary.main' : 'text.primary',
                    }}
                  >
                    {e.title}
                  </Typography>
                }
                secondary={formatDate(e.date)}
              />
            </ListItem>
          ))}
        </List>
      )}
    </WidgetCard>
  );
}
