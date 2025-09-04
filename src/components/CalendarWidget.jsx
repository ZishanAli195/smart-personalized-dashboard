import React from 'react';
import WidgetCard from './WidgetCard';
import EventIcon from '@mui/icons-material/Event';

const events = [
  { date: '2025-09-05', title: 'Project Meeting' },
  { date: '2025-09-07', title: 'Doctor Appointment' },
  { date: '2025-09-10', title: 'Friend\'s Birthday' },
];

export default function CalendarWidget() {
  return (
    <WidgetCard title="Upcoming Events" icon={<EventIcon />}>
      <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
        {events.map((e, i) => (
          <li key={i} style={{ marginBottom: 12 }}>
            <strong>{e.date}</strong>: {e.title}
          </li>
        ))}
      </ul>
    </WidgetCard>
  );
}