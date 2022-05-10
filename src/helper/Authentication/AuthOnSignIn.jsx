import React from 'react'

import { Navigate } from 'react-router-dom'

import { useSelector } from 'react-redux'

import { useAuth } from '../../context/FirebaseContext'

export default function AuthOnSignIn({children}){
    
    const { currentUser } = useAuth()

    const userLocal = useSelector((state)=>state.user.user)

    if (!currentUser) {
        return children
    }

    if ( Object.keys(userLocal).length > 0 ) {
        return <Navigate replace to="/sign-up"/>
    }

    return <Navigate replace to="/"/>
}