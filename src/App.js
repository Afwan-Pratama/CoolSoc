import React from 'react';
import {
  ChakraProvider
} from '@chakra-ui/react';
import { BrowserRouter , Routes , Route } from 'react-router-dom';

import { theme } from './theme'

import { Navbar } from './components'

// import Home from './pages/Home'
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

function App() {
  return (
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      
      <Routes>
        <Route path='/' >
          {/* <Route path='/' element={<Home/>}/> */}
          <Route path='sign-in' element={<SignIn/>}/>
          <Route path='sign-up' element={<SignUp/>}/>
        </Route>      
      </Routes>  
    
    </ChakraProvider>
  </BrowserRouter>
  );
}

export default App;
