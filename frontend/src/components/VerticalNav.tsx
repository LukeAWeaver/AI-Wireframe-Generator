import { Link as RouterLink } from 'react-router-dom';
import { Box, List, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import { Home, School, Login, AccountCircle, DynamicForm, Settings as SettingsIcon, Info, ViewQuilt } from '@mui/icons-material';
import { useUser } from '../hooks/useUser';

export const VerticalNav = () => {
  const { isAuthenticated } = useUser();

  const navItems = [
    { text: 'Home', to: '/', icon: <Home />, auth: true },
    { text: 'Tutorial', to: '/tutorial', icon: <School />, auth: true },
    { text: 'Dynamic Form', to: '/dynamic-form', icon: <DynamicForm />, auth: true },
    { text: 'Wireframe Generator', to: '/wireframe-generator', icon: <ViewQuilt />, auth: true },
    !isAuthenticated && { text: 'Login', to: '/login', icon: <Login />, auth: false },
    isAuthenticated && { text: 'User Profile', to: '/profile', icon: <AccountCircle />, auth: true },
    isAuthenticated && { text: 'Settings', to: '/settings', icon: <SettingsIcon />, auth: true },
    { text: 'Architecture', to: '/architecture', icon: <Info />, auth: true },
  ].filter(Boolean);

  return (
    <Box sx={{ width: 240, flexShrink: 0, bgcolor: 'background.paper' }}>
      <List>
        {navItems.map((item) => item && (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={RouterLink} to={item.to}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}; 