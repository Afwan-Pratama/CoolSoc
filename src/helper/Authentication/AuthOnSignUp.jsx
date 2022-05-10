import React from 'react'

import { Navigate } from 'react-router-dom'

import { useAuth } from '../../context/FirebaseContext'

export default function AuthOnSignUp({children}){
    
    const { currentUser } = useAuth()

    return !currentUser? children : <Navigate replace to="/"/>
    
}