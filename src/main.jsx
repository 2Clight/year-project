import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { SnackbarProvider } from 'notistack';
import { UserProvider } from './context/UserContext.jsx';

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <UserProvider>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </UserProvider>
  </StrictMode>,
)
