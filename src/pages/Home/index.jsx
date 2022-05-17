import React from 'react'

import { motion } from 'framer-motion'

import {
  Flex,
  useMediaQuery
} from '@chakra-ui/react'

import { Pagination } from '@nextui-org/react'

import { useNavigate , useParams } from 'react-router-dom'

import { useQuery } from '@apollo/client'

import { useCookies } from 'react-cookie'

import { fetchUserAndPosts } from '../../graphql/query'

import { Navbar , SpinnerPage , PostContainer } from '../../components'

import AddPost from './components/AddPost'

export default function Home() {

  const [isLargerThan480px] = useMediaQuery('(min-width:480px)')

  const [cookies] = useCookies(["uid"])

  const navigate = useNavigate()

  const param = useParams()

  const { data , loading , refetch } = useQuery(fetchUserAndPosts,{
    variables: {
      uid : cookies.uid,
      offset : (param.page*10 - 10) || 0,
      limit : 10
    },
  })

  if(loading) {

    return <SpinnerPage/>
  
  }

  let totalPage

  if(data.posts_aggregate.aggregate.count % 10 > 0){
    totalPage = parseInt((data.posts_aggregate.aggregate.count /10)+1)
  }
  else{
    totalPage = parseInt(data.posts_aggregate.aggregate.count / 10)
  }

  const handleRefetchLike = () => {
  
    refetch()
  
  }

  const handleChangePage = (e) =>{

    if(e===1){
      return navigate('/')
    }
    return navigate('/'+e)

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
      m={isLargerThan480px?'20':'32'}
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
          refetchPost={handleRefetchLike}
          /> 
        
          </Flex>

        ))}

        <Pagination 
        size='lg' 
        rounded 
        shadow 
        total={totalPage}
        page={parseInt(param.page)}
        onChange={handleChangePage}
        />
      
      </Flex>

    </motion.div>
  )
}
