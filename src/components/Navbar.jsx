import React from 'react'
import { AppBar, Toolbar, Typography, IconButton, InputBase, Badge, Avatar, Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

export default function Navbar({ dark, setDark }) {
  return (
    <AppBar position="static" sx={{ background: dark ? '#1e1b4b' : '#f6f7fb', boxShadow: 'none', mb: 2 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo/Title */}
        <Typography variant="h6" sx={{ fontWeight: 700, color: dark ? '#fff' : '#222' }}>
          Smart Personalized Dashboard
        </Typography>

        {/* Search Bar */}
        <Box sx={{ display: 'flex', alignItems: 'center', background: dark ? '#23235b' : '#e0e7ff', borderRadius: 2, px: 1 }}>
          <InputBase placeholder="Search…" sx={{ ml: 1, flex: 1, color: dark ? '#fff' : '#222' }} />
          <IconButton size="small">
            <SearchIcon sx={{ color: dark ? '#fff' : '#222' }} />
          </IconButton>
        </Box>

        {/* Right Side Icons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Theme Toggle */}
          <IconButton onClick={() => setDark(d => !d)} color="inherit">
            {dark ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          {/* Notifications */}
          <IconButton color="inherit">
            <Badge badgeContent={2} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          {/* User Avatar */}
          <Avatar alt="User" src="https://i.pravatar.cc/40?img=3" />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
