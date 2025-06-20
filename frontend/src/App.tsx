import { 
  Box, 
  Container, 
  Typography, 
  AppBar, 
  Toolbar, 
  IconButton,
  useTheme,
} from '@mui/material'
import { Menu as MenuIcon, Lightbulb as LightbulbIcon } from '@mui/icons-material'
import { DynamicForm } from './components/DynamicForm'
import { LoginForm } from './components/LoginForm'
import { UserProfile } from './components/UserProfile'
import { askGPT } from './utils/ai'
import { useThemeContext } from './theme/ThemeContext'
import { useUser } from './hooks/useUser'

interface FeatureRequest {
  feature: string;
  complexity: string;
  priority: string;
  [key: string]: any;
}

function App() {
  const theme = useTheme()
  const { isDarkMode, toggleTheme } = useThemeContext()
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
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
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