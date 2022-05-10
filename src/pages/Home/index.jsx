import React from 'react'

import { motion } from 'framer-motion'

import { Button } from '@chakra-ui/react'

import { useNavigate } from 'react-router-dom'

import { useAuth } from '../../context/FirebaseContext'

export default function Home() {

  const { currentUser , logOut } = useAuth()

  const navigate = useNavigate()

  const handleLogOut = async () =>{

    try{
      await logOut()
      navigate("/sign-in")
    }catch{

    }
    
  }

  return (
    <motion.div
    initial={{opacity: 0}}
    animate={{opacity:1}}
    exit={{opacity:0}}
    style={{height : '100vh' , width: '100%' , backgroundColor: 'seagreen'}}>
      <Button onClick={handleLogOut}>Log Out</Button>
    </motion.div>
  )
}
