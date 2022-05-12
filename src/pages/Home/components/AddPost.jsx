import React from 'react'

import {
    Flex,
    Icon} from '@chakra-ui/react'

import { useNavigate } from 'react-router-dom'

import { RiAddCircleLine } from 'react-icons/ri'

import TypeWriterEffect from 'react-typewriter-effect'

export default function AddPost() {
    
    const navigate = useNavigate()

    const handleToAddPost = () =>{

        navigate("/add-post")

    }

    return (

        <>

            <Flex
            w='500px'
            justifyContent='space-between'
            alignItems='center'
            boxShadow='around'
            borderRadius='25px'
            p='.25rem 2rem'
            onClick={handleToAddPost}
            >

            <TypeWriterEffect
            
            textStyle={{
                color: '#A8A8A8',
                fontWeight: 500,
                fontSize: '16px',
                }}
                startDelay={3000}
                cursorColor="#A8A8A8"
                multiText={[
                    'Hey, Welcome back mate',
                    'How are you today?',
                    'What do you think?',
                    'What do you feel?',
                    'What do you want to share ?',
                    'Pour it all here...',
                ]}
            multiTextDelay={2000}
            typeSpeed={50}
            
            />
            
            <Icon
            color='primary.100'
            fontSize='xl'
            as={RiAddCircleLine}
            />

            </Flex>
  
        </>
  )
}
