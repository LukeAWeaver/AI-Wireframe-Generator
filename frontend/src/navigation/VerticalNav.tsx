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

  const navItems = ([
    { text: 'About', to: '/', icon: <Home />, auth: true },
    { text: 'Projects', to: '/projects', icon: <Folder />, auth: true },
    { text: 'Work History', to: '/work-history', icon: <AccountCircle />, auth: false },
    // { text: 'Wireframe Generator', to: '/wireframe-generator', icon: <ViewQuilt />, auth: true },
    !isAuthenticated && { text: 'Login', to: '/login', icon: <Login />, auth: false },
    // isAuthenticated && { text: 'User Profile', to: '/profile', icon: <AccountCircle />, auth: true },
    isAuthenticated && { text: 'Settings', to: '/settings', icon: <SettingsIcon />, auth: true },
    // { text: 'Architecture', to: '/architecture', icon: <Info />, auth: true },
  ] as Array<{ text: string; to: string; icon: React.ReactNode; auth: boolean; }> ).filter(Boolean);

  return (
    <Box 
      height="100%"
      sx={{ 
        width: isMobile ? '100%' : 240, 
        flexShrink: 0,  
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
          {navItems.map((item) => {
            const selected = location.pathname === item.to;
            return (
              <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  component={RouterLink}
                  to={item.to}
                  selected={selected}
                  sx={{
                    userSelect: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    px: 0,
                    py: 1.5,
                    background: 'none',
                    transition: 'none',
                    '&:hover .nav-dash, &.Mui-selected .nav-dash': {
                      width: 32,
                      backgroundColor: theme => theme.palette.primary.main,
                    },
                    '&:hover .nav-text, &.Mui-selected .nav-text': {
                      color: theme => theme.palette.primary.main,
                      fontWeight: 700,
                    },
                  }}
                >
                  <Box
                    className="nav-dash"
                    sx={{
                      display: 'inline-block',
                      width: selected ? 32 : 0,
                      height: 2,
                      minWidth: 0,
                      maxWidth: 32,
                      backgroundColor: selected ? theme => theme.palette.primary.main : theme => theme.palette.text.disabled,
                      borderRadius: 1,
                      marginRight: 2,
                      transition: 'width 0.3s, background-color 0.3s',
                    }}
                  />
                  <span
                    className="nav-text"
                    style={{
                      letterSpacing: '0.1em',
                      fontWeight: selected ? 700 : 400,
                      color: selected ? theme.palette.primary.main : theme.palette.text.secondary,
                      fontSize: '1.1rem',
                      transition: 'color 0.3s, font-weight 0.3s',
                    }}
                  >
                    {item.text.toUpperCase()}
                  </span>
                </ListItemButton>
              </ListItem>
            );
          })}
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