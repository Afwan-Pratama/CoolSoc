import { ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import { FirebaseProvider } from './context/FirebaseContext';

import { ApolloProvider } from '@apollo/client';

import { CookiesProvider } from 'react-cookie'

import apolloClient from './apollo-client';

const elementRoot = document.getElementById('root')
const root = createRoot(elementRoot)

root.render(

    <FirebaseProvider>
      <ApolloProvider client={apolloClient}>
        <CookiesProvider>
          <ColorModeScript />
          <App />
        </CookiesProvider>
      </ApolloProvider>
    </FirebaseProvider>

);
