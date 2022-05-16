import React, { useState , useEffect} from 'react'

import { useParams } from 'react-router-dom'

import  client  from '../../apollo-client'

import { useCookies } from 'react-cookie'

import { motion } from 'framer-motion'

import { fetchPostOne , fetchUserData} from '../../graphql/query'

import { Navbar , SpinnerPage } from '../../components'

import PostContainer from './components/PostContainer'
import { Flex } from '@chakra-ui/react'

export default function DetailPost() {

  const [dataUser,setDataUser] = useState(null)

  const [dataPost,setDataPost] = useState(null)

  const [loading,setLoading] = useState({
    
    user : true,
    post : true
  
  })

  const param = useParams()

  const [cookies] = useCookies()

  const isLogin = cookies.uid

  const fetchPost = () =>{

    
  }

  useEffect(()=>{

    if(isLogin){

      client.query({
        query : fetchUserData,
        variables : {
          uid : isLogin
        }
      }).then((result)=>{
        
        setDataUser(result.data.user[0])
        setLoading((prev)=>
      {
        return {...prev,user : false}
      })
      
      })
      
    }

    client.query({
      query: fetchPostOne,
      variables: {
        post_id : param.post_id
      }
    })
    .then((result) => {
      
      setDataPost(result.data.posts[0])
      setLoading((prev)=>
      {
        return {...prev,post : false}
      })
    
    })

    
  },[])
  
  if (loading.post || loading.user) {

    return <SpinnerPage/>

  }

  return (

    <motion.div
    initial={{opacity: 0}}
    animate={{opacity:1}}
    exit={{opacity:0}}
    >
      
      {dataPost &&
      <Navbar 
      avatarUrl = {isLogin?dataUser.user_avatar.avatar_url:''}
      username = {isLogin?dataUser.username : ''}
      />}

      <Flex
      my='32'
      flexDir='column'
      alignItems='center'
      >

        {dataPost &&
          <PostContainer 
          post={dataPost}
          />
        }
      
      </Flex>

    </motion.div>
  
  )
}
