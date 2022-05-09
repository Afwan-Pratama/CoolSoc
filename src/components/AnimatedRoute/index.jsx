import React from 'react'

import { Routes , Route } from 'react-router-dom'

import { AnimatePresence } from 'framer-motion'

import AuthAfterSignUp from '../../helper/AuthAfterSignUp';
import AuthBeforeSignUp from '../../helper/AuthBeforeSignUp';

import Home from '../../pages/Home'
import SignUp from '../../pages/SignUp';
import SignIn from '../../pages/SignIn';

export default function AnimatedRoute() {

  return (
      <AnimatePresence>

        <Routes>
            <Route path='/' >
  
            <Route index element={
            
            <AuthAfterSignUp>
            
              <Home/>
            
            </AuthAfterSignUp>
            
            }/>

            <Route path='sign-in' element={
            
            <AuthBeforeSignUp>
           
             <SignIn/>
            
            </AuthBeforeSignUp>
           
           }/>
            
            <Route path='sign-up' element={
            
            <AuthBeforeSignUp>

              <SignUp/>

            </AuthBeforeSignUp>
            
            }/>
            
            </Route>      
        
        </Routes>  
    
    </AnimatePresence>
  )
}
