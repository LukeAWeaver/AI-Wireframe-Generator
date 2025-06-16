import { useState } from 'react'
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  AppBar, 
  Toolbar, 
  IconButton,
  useTheme,
  Divider
} from '@mui/material'
import { Menu as MenuIcon, Lightbulb as LightbulbIcon } from '@mui/icons-material'
import { DynamicForm } from './components/DynamicForm'
import { askGPT } from './utils/ai'
import { useThemeContext } from './theme/ThemeContext'

interface FeatureRequest {
  feature: string;
  complexity: string;
  priority: string;
  [key: string]: any;
}

function App() {
  const theme = useTheme()
  const { isDarkMode, toggleTheme } = useThemeContext()
  const [response, setResponse] = useState<string>('')

  const handleSubmit = async (formData: FeatureRequest) => {
    try {
      const result = await askGPT(formData)
      setResponse(result)
    } catch (error) {
      console.error('Error:', error)
      setResponse('An error occurred while processing your request.')
    }
  }

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
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            display: 'flex', 
            flexDirection: 'column',
            gap: 3,
            height: '100%'
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Feature Analysis
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Describe your feature and get AI-powered insights and recommendations.
          </Typography>
          <Divider />
          <DynamicForm onSubmit={handleSubmit} />
          {response && (
            <Box sx={{ 
              mt: 2, 
              p: 3, 
              bgcolor: 'background.paper',
              borderRadius: 1,
              border: `1px solid ${theme.palette.divider}`
            }}>
              <Typography variant="h6" gutterBottom color="primary">
                Analysis Results
              </Typography>
              <Typography 
                component="pre" 
                sx={{ 
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'monospace',
                  color: 'text.secondary',
                  bgcolor: 'background.default',
                  p: 2,
                  borderRadius: 1
                }}
              >
                {response}
              </Typography>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  )
}

export default App 