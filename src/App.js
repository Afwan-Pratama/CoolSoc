import React from 'react';
import {
  ChakraProvider
} from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';

import { theme } from './theme'

import { AnimatedRoute } from './components'
import { Provider } from 'react-redux';
import { store , persistor} from './store'
import { PersistGate } from 'redux-persist/integration/react';

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
