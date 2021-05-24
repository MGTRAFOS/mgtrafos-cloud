import React from 'react';
import { Router } from 'react-router-dom';

import Routes from './routes';
import history from './history';

import { GlobalStyle } from './styles/global';

import { AuthProvider } from './contexts/AuthContext';
import { FileProvider } from './contexts/FilesContext';

function App() {
  return (
    <AuthProvider>
      <FileProvider>
        <Router history={history}>
          <Routes />
          <GlobalStyle />
        </Router>
      </FileProvider>
    </AuthProvider>
  );
}

export default App;