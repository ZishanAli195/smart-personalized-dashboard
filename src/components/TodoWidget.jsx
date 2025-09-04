import React, { useState, useEffect } from 'react';
import WidgetCard from './WidgetCard';
import { IconButton, TextField, List, ListItem, Checkbox, ListItemText, ListItemSecondaryAction, Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';

export default function TodoWidget() {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('tasks') || '[]'));
  const [input, setInput] = useState('');
  const [editing, setEditing] = useState(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { text: input, done: false }]);
      setInput('');
    }
  };

  const deleteTask = idx => setTasks(tasks.filter((_, i) => i !== idx));
  const toggleTask = idx => setTasks(tasks.map((t, i) => i === idx ? { ...t, done: !t.done } : t));
  const startEdit = idx => { setEditing(idx); setEditValue(tasks[idx].text); };
  const saveEdit = idx => {
    setTasks(tasks.map((t, i) => i === idx ? { ...t, text: editValue } : t));
    setEditing(null);
    setEditValue('');
  };
  const clearAll = () => setTasks([]);

  return (
    <WidgetCard title="Tasks" icon={<PlaylistAddCheckIcon />}>
      <TextField
        label="Add a task"
        variant="outlined"
        size="small"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && addTask()}
        sx={{ mb: 2, width: '100%' }}
      />
      <Button onClick={addTask} variant="contained" sx={{ mb: 2 }}>Add</Button>
      <List>
        {tasks.map((task, idx) => (
          <ListItem key={idx} disablePadding secondaryAction={
            <>
              <IconButton edge="end" onClick={() => startEdit(idx)}><EditIcon /></IconButton>
              <IconButton edge="end" onClick={() => deleteTask(idx)}><DeleteIcon /></IconButton>
            </>
          }>
            <Checkbox checked={task.done} onChange={() => toggleTask(idx)} />
            {editing === idx ? (
              <TextField
                value={editValue}
                onChange={e => setEditValue(e.target.value)}
                onBlur={() => saveEdit(idx)}
                onKeyDown={e => e.key === 'Enter' && saveEdit(idx)}
                size="small"
                sx={{ ml: 1 }}
              />
            ) : (
              <ListItemText
                primary={task.text}
                sx={{ textDecoration: task.done ? 'line-through' : 'none', ml: 1 }}
              />
            )}
          </ListItem>
        ))}
      </List>
      <Typography variant="body2" sx={{ mt: 2 }}>
        {tasks.filter(t => !t.done).length} tasks remaining
      </Typography>
      <Button onClick={clearAll} color="error" sx={{ mt: 1 }}>Clear All</Button>
    </WidgetCard>
  );
}
