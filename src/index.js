import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import { FirebaseProvider } from './context/FirebaseContext';

import { ApolloProvider } from '@apollo/client';

import client from './apollo-client';

const elementRoot = document.getElementById('root')
const root = createRoot(elementRoot)

root.render(
  <StrictMode>
    <FirebaseProvider>
      <ApolloProvider client={client}>
        <ColorModeScript />
        <App />
      </ApolloProvider>
    </FirebaseProvider>
  </StrictMode>
);
