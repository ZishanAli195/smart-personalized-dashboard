import React, { useState, useEffect } from 'react';
import WidgetCard from './WidgetCard';
import NoteIcon from '@mui/icons-material/Note';

export default function NotesWidget() {
  const [note, setNote] = useState(() => localStorage.getItem('note') || '');

  useEffect(() => {
    localStorage.setItem('note', note);
  }, [note]);

  return (
    <WidgetCard title="Quick Notes" icon={<NoteIcon />}>
      <textarea
        value={note}
        onChange={e => setNote(e.target.value)}
        rows={6}
        style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #ccc', resize: 'vertical' }}
        placeholder="Write your notes here..."
      />
    </WidgetCard>
  );
}