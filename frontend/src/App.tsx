import { 
  Box, 
  Container, 
  Typography, 
  AppBar, 
  Toolbar, 
  IconButton,
} from '@mui/material'
import { Menu as MenuIcon, Lightbulb as LightbulbIcon } from '@mui/icons-material'
import { LoginForm } from './components/LoginForm'
import { UserProfile } from './components/UserProfile'
import { useThemeContext } from './theme/ThemeContext'
import { useUser } from './hooks/useUser'

function App() {
  const { toggleTheme } = useThemeContext()
  const { isAuthenticated } = useUser()

  return (
    <Box sx={{ 
      flexGrow: 1, 
      minHeight: '100vh', 
      bgcolor: 'background.default',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AI Feature Explorer
          </Typography>
          <IconButton color="inherit" onClick={toggleTheme} aria-label="toggle theme">
            <LightbulbIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="md" sx={{ mt: 4, mb: 4, flex: 1 }}>
        {!isAuthenticated ? (
          <LoginForm />
        ) : (
          <UserProfile />
        )}
      </Container>
    </Box>
  )
}

export default App 