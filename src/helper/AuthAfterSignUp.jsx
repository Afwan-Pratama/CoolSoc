import React from 'react'
import { useAuth } from '../context/FirebaseContext'
import { Navigate } from 'react-router-dom'

export default function AuthAfterSignUp({children}){
    
    const { currentUser } = useAuth()

    return currentUser? children : <Navigate replace to="/sign-in"/>
}