import React from 'react';
import {
  ChakraProvider
} from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import { theme } from './theme'

import { AnimatedRoute } from './components'

import { store , persistor} from './store'

import './style/style.css'

function App() {
  return (
  
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

        <ChakraProvider theme={theme}>

            <AnimatedRoute/>
        
        </ChakraProvider>
      </PersistGate>
    </Provider>
  
  </BrowserRouter>
  );
}

export default App;
