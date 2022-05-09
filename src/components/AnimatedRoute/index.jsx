import React from 'react'

import { Routes , Route , useLocation } from 'react-router-dom'

import { AnimatePresence } from 'framer-motion'

// import Home from '../../pages/Home'
import SignUp from '../../pages/SignUp';
import SignIn from '../../pages/SignIn';

export default function AnimatedRoute() {

    const location =  useLocation()

  return (
      <AnimatePresence>

        <Routes location={location} key={location.pathname}>
            <Route path='/' >
            {/* <Route path='/' element={<Home/>}/> */}
            <Route path='sign-in' element={<SignIn/>}/>
            <Route path='sign-up' element={<SignUp/>}/>
            </Route>      
        </Routes>  
    
    </AnimatePresence>
  )
}
