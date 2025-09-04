import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'; // Default no profile icon

export default function InteractiveNavbar({ dark, setDark }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Avatar menu
  const [avatarAnchor, setAvatarAnchor] = useState(null);
  const openAvatarMenu = (e) => setAvatarAnchor(e.currentTarget);
  const closeAvatarMenu = () => setAvatarAnchor(null);

  // Notifications menu
  const [notifAnchor, setNotifAnchor] = useState(null);
  const openNotifMenu = (e) => setNotifAnchor(e.currentTarget);
  const closeNotifMenu = () => setNotifAnchor(null);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const iconColor = dark ? '#fff' : '#222'; // Ensure icons are visible

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background: dark ? '#1e1b4b' : '#ffffff',
          color: iconColor,
          boxShadow: '0 1px 5px rgba(0,0,0,0.1)',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Smart Dashboard
          </Typography>

          {/* Mobile Hamburger */}
          {isMobile && (
            <IconButton onClick={toggleDrawer} sx={{ color: iconColor }}>
              <MenuIcon />
            </IconButton>
          )}

          {/* Desktop Icons */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton onClick={() => setDark(d => !d)} sx={{ color: iconColor }}>
                {dark ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>

              {/* Notifications */}
              <IconButton onClick={openNotifMenu} sx={{ color: iconColor }}>
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Menu
                anchorEl={notifAnchor}
                open={Boolean(notifAnchor)}
                onClose={closeNotifMenu}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem>New message received</MenuItem>
                <MenuItem>Server alert</MenuItem>
                <MenuItem>Update available</MenuItem>
              </Menu>

              {/* Default Avatar */}
              <IconButton onClick={openAvatarMenu}>
                <PersonOutlineIcon sx={{ fontSize: 32, color: iconColor }} />
              </IconButton>
              <Menu
                anchorEl={avatarAnchor}
                open={Boolean(avatarAnchor)}
                onClose={closeAvatarMenu}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem>Logout</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <List sx={{ width: 250 }}>
          <ListItem button>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Profile" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
