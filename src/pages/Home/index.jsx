import React from 'react'

import { motion } from 'framer-motion'

import {
  Flex,
  useMediaQuery
} from '@chakra-ui/react'

import { useQuery , useSubscription } from '@apollo/client'

import { useCookies } from 'react-cookie'

import { fetchUserData } from '../../graphql/query'

import { postSubcription } from '../../graphql/subsript'

import { Navbar , SpinnerPage } from '../../components'

import AddPost from './components/AddPost'
import PostContainer from './components/PostContainer'

export default function Home() {

  const [isLargerThan480px] = useMediaQuery('(min-width:480px)')

  const [cookies] = useCookies(["uid"])

  const { data : dataUser , loading : loadingUser } = useQuery(fetchUserData,{
    variables: {
      uid : cookies.uid
    }
  })

  const { data : dataPost , loading : loadingPosts} = useSubscription(postSubcription)
  
  if(loadingUser || loadingPosts) {

    return <SpinnerPage/>
  
  }

  return (
    
    <motion.div
    initial={{opacity: 0}}
    animate={{opacity:1}}
    exit={{opacity:0}}
    >
    
      <Navbar 
      avatarUrl={dataUser.user[0].user_avatar.avatar_url}
      username={dataUser.user[0].username}
      />

      <Flex
      flexDirection='column'
      alignItems='center'
      m={isLargerThan480px?'20':'32'}
      gap='10'
      >

      <AddPost/>

      {dataPost.posts.map((post,index)=>(

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
