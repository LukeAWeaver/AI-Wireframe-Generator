import { useState } from 'react'
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  AppBar, 
  Toolbar, 
  IconButton,
  useTheme
} from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
import { DynamicForm } from './components/DynamicForm'
import { askGPT } from './utils/ai'

function App() {
  const theme = useTheme()
  const [response, setResponse] = useState<string>('')

  const handleSubmit = async (formData: Record<string, any>) => {
    try {
      const result = await askGPT(formData)
      setResponse(result)
    } catch (error) {
      console.error('Error:', error)
      setResponse('An error occurred while processing your request.')
    }
  }

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static">
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
 !       </Toolbar>
      </AppBar>
      
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            display: 'flex', 
            flexDirection: 'column',
            gap: 3
          }}
        >
          <DynamicForm onSubmit={handleSubmit} />
          {response && (
            <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="h6" gutterBottom>
                Response:
              </Typography>
              <Typography component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
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