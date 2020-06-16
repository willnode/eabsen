import { hydrate, render } from 'react-dom';
import React, { useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { publicUrl } from './main/Config';
import App from './main/App';
import { Context } from './main/Contexts';
import { ErrorBoundary } from './static/offline';
import './media/style.css';

function GenerateTheme(theme) {
  return createMuiTheme({
    typography: {
      "fontFamiliy" : '"Century Gothic", "Helvetica", "Arial", sans-serif',
      "fontSize": 14,
      "fontWeightLight": 300,
      "fontWeightReguler": 400,
      "fontWeightMedium": 500
    },
    overrides: {
      MuiFormLabel: {
        asterisk: {
          display: "none", // Disable asterisk on required
        }
      },
      MuiTextField: {
        root: {
          background: 'var(--paper)',
        }
      },
      MuiSelect: {
        root: {
          background: 'var(--paper)',
        },
        outlined: {
          background: 'var(--paper)',
        }
      }
    },
    palette: {
      primary: {
        main: '#FEC50C',
        dark: '#94080f',
        light: '#ff4a53'
      },
      type: theme, // Autochoose dark mode
    },
  })
}

function MainApp() {
  const theme = Context.bind('theme', useState('light'))[0];
  const generated = React.useMemo(() => GenerateTheme(theme), [theme]);

  return (
    <ThemeProvider theme={generated}>
      <CssBaseline />
      <BrowserRouter forceRefresh={false} basename={publicUrl}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </ThemeProvider>
  );
}

let root = document.getElementById('root');
(root.hasChildNodes() ? hydrate : render)(<MainApp />, root);
