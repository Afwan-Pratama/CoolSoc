import React, { useState } from 'react'

import { 
    Flex,
    Avatar,
    Text,
    Button,
    Icon,
    Box,
    SkeletonCircle,
    SkeletonText
     } from '@chakra-ui/react'

import htmr from 'htmr'

import { FaCommentDots } from 'react-icons/fa'

import { useLazyQuery } from '@apollo/client'

import { fetchComments } from '../../../graphql/query'

import { CommentEditor } from '../../../components'

import CommentContainer from './CommentContainer'

export default function PostContainer(props) {
    
    const {post} = props

    const [openComment,setOpenComment] = useState(false)

    const [getComments,{data : dataComments,loading : loadingComments}] = useLazyQuery(fetchComments)

    const handleOpenComment = () => {

        if(!dataComments){
        getComments({variables:{
            post_id : post.post_id
        }}).then(()=>{
            setOpenComment((prev)=>{
                return !prev
            })
        })
        }

        if(dataComments){
            setOpenComment((prev)=>{
                return !prev
            })
        }
        
    }
  
    return (

        <>

            <Flex
            flexDirection='column'
            w={[300,500,700,800,1000]}
            boxShadow='around'
            p='5'
            borderRadius='25px'
            >
            
                <Flex
                alignItems='center'
                gap='2'
                >
                
                <Avatar
                size='sm' 
                src={post.user.user_avatar.avatar_url}/>
                
                <Text
                >{post.user.username}</Text>
                
                </Flex>

                <Flex
                flexDirection='column'
                gap='2'
                p='5'
                >
                    {htmr(post.content)}
                </Flex>

                <Button 
                leftIcon={
                    <Icon as={FaCommentDots}/>
                }
                onClick={handleOpenComment}
                >{post.comments_aggregate.aggregate.count}</Button>
            
            </Flex>

            {loadingComments && 
            <Box 
            padding='6' 
            boxShadow='lg' 
            bg='white'
            m='5'
            >
                <SkeletonCircle size='10' />
                <SkeletonText mt='4' noOfLines={4} spacing='4' />
            </Box>
            }

            {openComment &&

            <Flex
            p='5'
            gap='5'
            flexDir='column'
            >

                {dataComments.comments.map((comment,index)=>(
                    <Flex
                    key={index}
                    flexDir='column'
                    px='5'
                    py='2'
                    borderRadius='25px'
                    boxShadow='around'
                    >
                        <CommentContainer 
                        comment={comment}/>
                    
                    </Flex>
                ))}
            
                <CommentEditor/>
            
            </Flex>

            }

        </>

  )
}
