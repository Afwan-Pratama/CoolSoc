import React from 'react'

import { Routes , Route } from 'react-router-dom'

import { AnimatePresence } from 'framer-motion'

import {
  NextUIProvider
} from '@nextui-org/react'

import { 
  AuthAfterSignUp,
  AuthOnSignIn,
  AuthOnSignUp,
  AuthOnSignUpGoogle} from '../../helper/Authentication'

import Home from '../../pages/Home'
import SignUp from '../../pages/SignUp';
import SignIn from '../../pages/SignIn';
import SignUpGoogle from '../../pages/SignUpGoogle'
import ForgotPassword from '../../pages/ForgotPassword'
import AddPostPage from '../../pages/AddPostPages'
import DetailPost from '../../pages/DetailPost'
import UpdateProfile from '../../pages/UpdateProfile'
import ViewProfile from '../../pages/ViewProfile'

export default function AnimatedRoute() {

  return (
      <AnimatePresence>

        <Routes>

            <Route path='/' >
  
              <Route index element={
              
              <AuthAfterSignUp>

                <NextUIProvider>
      
                  <Home/>
  
                </NextUIProvider>
              
              </AuthAfterSignUp>
              
              }/>

              <Route path=':page' element={

              <AuthAfterSignUp>
                            
                <NextUIProvider>
      
                  <Home/>
  
                </NextUIProvider>

              </AuthAfterSignUp>

              }/>

              <Route path='sign-in' element={
              
              <AuthOnSignIn>
            
              <SignIn/>
              
              </AuthOnSignIn>
            
            }/>
              
              <Route path='sign-up' element={
              
              <AuthOnSignUp>

                <SignUp/>

              </AuthOnSignUp>
              
              }/>

              <Route path='personal-details' element={
              
              <AuthOnSignUpGoogle>

                <SignUpGoogle/>
  
              </AuthOnSignUpGoogle>
    
              }/>

              <Route path='forgot-password' element={
              
              <AuthOnSignIn>

                <ForgotPassword/>

              </AuthOnSignIn>
              
              }/>
              
              <Route path='add-post' element={

                <AuthAfterSignUp>

                  <AddPostPage/>

                </AuthAfterSignUp>

              }/>

              <Route path='post/:post_id' element={
                
                <DetailPost />
                
              }/>

              <Route path='update-profile'element={
               
                <AuthAfterSignUp>

                  <UpdateProfile/>

                </AuthAfterSignUp>
             
              }/>

              <Route path='user/:username/'>

                <Route index element={

                  <NextUIProvider>

                    <ViewProfile/>
                 
                  </NextUIProvider>

                }/>

                <Route path=':page' element={

                    <NextUIProvider>

                      <ViewProfile/>

                    </NextUIProvider>

                } />

              </Route>

            </Route>      
        
        </Routes>  
    
    </AnimatePresence>
  )
}
