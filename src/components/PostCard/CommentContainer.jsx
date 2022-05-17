import React from 'react'

import { 
    Flex,
    Avatar,
    Text } from '@chakra-ui/react'

import htmr from 'htmr'    

export default function CommentContainer(props) {
    
    const {comment} = props

    return (
        
    <>
    
        <Flex
        gap='2'
        alignItems='center'
        >
            
         <Avatar
           size='xs' 
           src={comment.user.user_avatar.avatar_url}/>

          <Text>{comment.user.username}</Text>

        </Flex>
        
        <Flex
        px='5'
        py='2'
        >

        {htmr(comment.content)}
     
        </Flex>
    
    </>
     
  )
}
