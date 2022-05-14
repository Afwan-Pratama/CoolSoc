import React from 'react'

import { motion } from 'framer-motion'

import {
  Flex,
} from '@chakra-ui/react'

import { useQuery } from '@apollo/client'

import { useCookies } from 'react-cookie'

import { fetchUserAndPosts } from '../../graphql/query'

import { Navbar , SpinnerPage , TextEditor} from '../../components'

import AddPost from './components/AddPost'
import PostContainer from './components/PostContainer'

export default function Home() {

  const [cookies] = useCookies(["uid"])

  const { data, loading } = useQuery(fetchUserAndPosts,{
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
      username={data.user[0].username}
      />

      <Flex
      flexDirection='column'
      alignItems='center'
      m='20'
      gap='10'
      >

      <AddPost/>

      {data.posts.map((post,index)=>(

        <Flex
        key={index}
        flexDirection='column'
        >

        <PostContainer 
        post={post}
        /> 
      
        </Flex>

      ))}

      </Flex>

    </motion.div>
  )
}
