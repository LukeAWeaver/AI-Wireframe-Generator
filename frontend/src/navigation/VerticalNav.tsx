import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Box, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Divider, useMediaQuery, useTheme } from '@mui/material';
import { Home, Login, AccountCircle, Settings as SettingsIcon, ViewQuilt, Folder, LightMode, DarkMode } from '@mui/icons-material';
import { useUser } from '../hooks/useUser';
import { useThemeContext } from '../contexts/ThemeContext';

export const VerticalNav = () => {
  const { isAuthenticated } = useUser();
  const { isDarkMode, toggleTheme } = useThemeContext();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navItems = [
    { text: 'About', to: '/', icon: <Home />, auth: true },
    { text: 'Projects', to: '/projects', icon: <Folder />, auth: true },
    { text: 'Wireframe Generator', to: '/wireframe-generator', icon: <ViewQuilt />, auth: true },
    !isAuthenticated && { text: 'Login', to: '/login', icon: <Login />, auth: false },
    isAuthenticated && { text: 'User Profile', to: '/profile', icon: <AccountCircle />, auth: true },
    isAuthenticated && { text: 'Settings', to: '/settings', icon: <SettingsIcon />, auth: true },
    // { text: 'Architecture', to: '/architecture', icon: <Info />, auth: true },
  ].filter(Boolean);

  return (
    <Box 
      height="100%"
      sx={{ 
        width: isMobile ? '100%' : 240, 
        flexShrink: 0,  
        bgcolor: 'background.paper',
        borderRight: isMobile ? 0 : 0.1, 
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        WebkitTouchCallout: 'none',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {isMobile ? (
        // Mobile: Horizontal bottom navigation
        <List sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center", height: "100%" }}>
          {navItems.map((item) => item && (
            <ListItem key={item.text} disablePadding sx={{ flex: 1 }}>
              <ListItemButton
                component={RouterLink}
                to={item.to}
                selected={location.pathname === item.to}
                sx={{
                  flexDirection: "column",
                  minHeight: 0,
                  py: 1,
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  MozUserSelect: 'none',
                  msUserSelect: 'none',
                  WebkitTouchCallout: 'none',
                  WebkitTapHighlightColor: 'transparent'
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, mb: 0.5 }}>{item.icon}</ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  sx={{ 
                    textAlign: 'center',
                    '& .MuiListItemText-primary': { fontSize: '0.75rem' }
                  }} 
                />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding sx={{ flex: 1 }}>
            <ListItemButton
              onClick={toggleTheme}
              sx={{
                flexDirection: "column",
                minHeight: 0,
                py: 1,
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
                WebkitTouchCallout: 'none',
                WebkitTapHighlightColor: 'transparent'
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mb: 0.5 }}>
                {isDarkMode ? <LightMode /> : <DarkMode />}
              </ListItemIcon>
              <ListItemText 
                primary={isDarkMode ? 'Light' : 'Dark'} 
                sx={{ 
                  textAlign: 'center',
                  '& .MuiListItemText-primary': { fontSize: '0.75rem' }
                }} 
              />
            </ListItemButton>
          </ListItem>
        </List>
      ) : (
        // Desktop: Vertical sidebar navigation
        <List sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "100%" }}>
          <Box>
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
          <Box>
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
      )}
    </Box>
  );
}; 