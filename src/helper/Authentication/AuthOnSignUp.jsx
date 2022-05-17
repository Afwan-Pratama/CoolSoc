import React from 'react'

import { Navigate } from 'react-router-dom'

import { useCookies } from 'react-cookie'
 
import { useAuth } from '../../context/FirebaseContext'

export default function AuthOnSignUp({children}){
    
    const { currentUser } = useAuth()
    
    const [cookies,setCookie] = useCookies() 
    
    if (!cookies.uid) {
    
        if(currentUser){
    
            setCookie("uid",currentUser.uid,{
                path:"/"
            })
            return <Navigate replace to="/"/>
        
        }
    
        return children
    }
    
    return <Navigate replace to="/"/>
    
}