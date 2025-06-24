import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ThemeContextProvider } from './theme/ThemeContext'
import { store, persistor } from './store/store'
import { RightSidebarProvider } from './components/RightSidebarContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeContextProvider>
          <RightSidebarProvider>
            <BrowserRouter>
              <CssBaseline />
              <App />
            </BrowserRouter>
          </RightSidebarProvider>
        </ThemeContextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
) 