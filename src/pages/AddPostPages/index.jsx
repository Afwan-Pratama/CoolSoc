import React from 'react'

import { Flex , useMediaQuery} from '@chakra-ui/react'

import { useQuery } from '@apollo/client'

import { motion } from 'framer-motion'

import { useCookies } from 'react-cookie'

import { fetchUserData } from '../../graphql/query'

import { Navbar , SpinnerPage , PostEditor} from '../../components'

export default function AddPostPage() {

    const [isLargerThan550px] = useMediaQuery(
        '(min-width:550px)'
      )

    const [cookies] = useCookies(["uid"])

    const { data , loading } = useQuery(fetchUserData,{
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
            username={data.user[0].username}/>

            <Flex
            mt='32'
            mb={isLargerThan550px?'32':'52'}
            flexDirection='column'
            alignItems='center'
            >

            <PostEditor />

            </Flex>

        </motion.div>

)
}
