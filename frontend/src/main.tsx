import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

import App from './App';
import './index.css';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#0f766e' },
    secondary: { main: '#ea580c' },
    background: {
      default: '#f7f0e8',
      paper: '#fffdf8',
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
    },
  },
  typography: {
    fontFamily: 'Outfit, system-ui, sans-serif',
    h1: {
      fontFamily: 'Fraunces, serif',
    },
    h2: {
      fontFamily: 'Fraunces, serif',
    },
    h3: {
      fontFamily: 'Fraunces, serif',
    },
    h4: {
      fontFamily: 'Fraunces, serif',
    },
    h5: {
      fontFamily: 'Fraunces, serif',
    },
    h6: {
      fontFamily: 'Fraunces, serif',
    },
  },
  shape: {
    borderRadius: 18,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 999,
          fontWeight: 700,
          paddingInline: 18,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
