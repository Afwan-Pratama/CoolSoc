import React from 'react'

import { Flex} from '@chakra-ui/react'

import { useQuery, useMutation } from '@apollo/client'

import { motion } from 'framer-motion'

import { useCookies } from 'react-cookie'

import { fetchUserData } from '../../graphql/query'

import { Navbar , SpinnerPage , TextEditor} from '../../components'

export default function AddPostPage() {
    
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
    
            <Navbar avatarUrl={data.user[0].user_avatar.avatar_url}/>

            <Flex
            mt='20'
            >

            <TextEditor />

            </Flex>

        </motion.div>

)
}
