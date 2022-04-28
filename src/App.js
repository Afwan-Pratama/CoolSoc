import React from 'react';
import {
  ChakraProvider
} from '@chakra-ui/react';
import { BrowserRouter , Routes , Route } from 'react-router-dom';

import { theme } from './theme'

import { Navbar } from './components'

import Home from './pages/Home'

function App() {
  return (
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      
      <Navbar />
      
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>  
    
    </ChakraProvider>
  </BrowserRouter>
  );
}

export default App;
