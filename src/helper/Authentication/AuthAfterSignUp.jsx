import React from 'react'
import { useAuth } from '../../context/FirebaseContext'
import { Navigate } from 'react-router-dom'

import { useSelector } from 'react-redux'

export default function AuthAfterSignUp({children}){
    
    const { currentUser } = useAuth()

    const userLocal = useSelector((state)=>state.user.user)

    if ( Object.keys(userLocal).length === 1 ) {
        return <Navigate replace to="/personal-details"/>
    }

    if ( currentUser ) {
        return children
    }

    if ( Object.keys(userLocal).length > 0 ) {
        return <Navigate replace to="/sign-up"/>
    }
    
    return <Navigate replace to="/sign-in"/>
}