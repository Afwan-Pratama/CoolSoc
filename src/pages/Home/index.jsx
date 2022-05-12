import React from 'react'

import { motion } from 'framer-motion'

import {
  Flex
} from '@chakra-ui/react'

import { useQuery } from '@apollo/client'

import { useCookies } from 'react-cookie'

import { fetchUserData } from '../../graphql/query'

import { Navbar , SpinnerPage} from '../../components'

import AddPost from './components/AddPost'

export default function Home() {

  const [cookies] = useCookies(["uid"])

  const { data, loading } = useQuery(fetchUserData,{
    variables: {
      uid : cookies.uid
    }
  })

  if(loading) {
    return <SpinnerPage/>
  }

  return (
    
    <motion.div
    initial={{opacity: 0}}
    animate={{opacity:1}}
    exit={{opacity:0}}
    >
    
      <Navbar 
      avatarUrl={data.user[0].user_avatar.avatar_url}
      />

      <Flex
      flexDirection='column'
      alignItems='center'
      mt='20'
      >

      <AddPost/>

      </Flex>

    </motion.div>
  )
}
