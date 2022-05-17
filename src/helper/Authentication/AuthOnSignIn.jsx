import React from 'react'

import { Navigate } from 'react-router-dom'

import { useSelector } from 'react-redux'

import { useCookies } from 'react-cookie'

import { useAuth } from '../../context/FirebaseContext'

export default function AuthOnSignIn({children}){
    
    const { currentUser } = useAuth()

    const [cookies,setCookie] = useCookies() 

    const userLocal = useSelector((state)=>state.user.user)

    if (!cookies.uid) {

        if(currentUser){

            setCookie("uid",currentUser.uid,{
                path:"/"
            })
            return <Navigate replace to="/"/>
        
        }

        return children
    }

    if ( Object.keys(userLocal).length > 0 ) {
        return <Navigate replace to="/sign-up"/>
    }

    return <Navigate replace to="/"/>
}