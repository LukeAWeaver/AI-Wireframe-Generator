import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Box, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Divider } from '@mui/material';
import { Home, Login, AccountCircle, Settings as SettingsIcon, ViewQuilt, Folder, LightMode, DarkMode } from '@mui/icons-material';
import { useUser } from '../hooks/useUser';
import { useThemeContext } from '../contexts/ThemeContext';

export const VerticalNav = () => {
  const { isAuthenticated } = useUser();
  const { isDarkMode, toggleTheme } = useThemeContext();
  const location = useLocation();

  const navItems = [
    { text: 'Home', to: '/', icon: <Home />, auth: true },
    { text: 'Wireframe Generator', to: '/wireframe-generator', icon: <ViewQuilt />, auth: true },
    { text: 'Projects', to: '/projects', icon: <Folder />, auth: true },
    !isAuthenticated && { text: 'Login', to: '/login', icon: <Login />, auth: false },
    isAuthenticated && { text: 'User Profile', to: '/profile', icon: <AccountCircle />, auth: true },
    isAuthenticated && { text: 'Settings', to: '/settings', icon: <SettingsIcon />, auth: true },
    // { text: 'Architecture', to: '/architecture', icon: <Info />, auth: true },
  ].filter(Boolean);

  return (
    <Box 
      height={"100%"} 
      display={"flex"} 
      flexDirection={"column"}
      sx={{ 
        width: 240, 
        flexShrink: 0,  
        bgcolor: 'background.paper',
        borderRight:1, 
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        WebkitTouchCallout: 'none',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <List sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "100%" }}>
        <Box >
        {navItems.map((item) => item && (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.to}
              selected={location.pathname === item.to}
              sx={{
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
                WebkitTouchCallout: 'none',
                WebkitTapHighlightColor: 'transparent'
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        </Box>
        <Box  >
          <Divider />
          <ListItemButton
            onClick={toggleTheme}
            sx={{
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none',
              WebkitTouchCallout: 'none',
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            <ListItemIcon>
              {isDarkMode ? <LightMode /> : <DarkMode />}
            </ListItemIcon>
            <ListItemText primary={isDarkMode ? 'Light Mode' : 'Dark Mode'} />
          </ListItemButton>
        </Box>
      </List>
    </Box>
  );
}; 