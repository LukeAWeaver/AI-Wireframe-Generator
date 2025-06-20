import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App'
import { ThemeContextProvider } from './theme/ThemeContext'
import { store, persistor } from './store/store'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeContextProvider>
          <CssBaseline />
          <App />
        </ThemeContextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
) 