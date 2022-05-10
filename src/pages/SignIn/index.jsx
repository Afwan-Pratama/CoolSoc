import React from 'react'

import { 
    Box, 
    Button, 
    Flex,  
    Heading,
    Text } from '@chakra-ui/react'

import { Link as ReactLink } from 'react-router-dom'

import { motion } from 'framer-motion'

import SignInContainer from './components/SignInContainer'

export default function SignIn() {
  
    return (
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity:1}}
        exit={{opacity:0}}>
        <Flex 
        textAlign='center'
        h='100vh'>

            <Box 
            w='50%'
            padding='30px'>

                <Flex 
                bg='linear-gradient(180deg, rgba(78, 165, 255, 0) 0%, rgba(78, 165, 255, 0.463542) 0.01%, #4EA5FF 100%);'
                flexDirection='column'
                alignItems='center'
                borderRadius='25px'
                h='full'
                justifyContent='center'
                gap='20'
                px={[200, 100 , 75 , 100 , 140 , 170]}
                >
        
                    <Heading
                    color='white'
                    >Welcome to Our Community</Heading>
        
                    <Heading
                    color='white'
                    >CoolSoc</Heading>
        
                    <Text 
                    color='white'
                    >Don't have account yet?</Text>
        
                    <Button
                    variant='solid'
                    w='full'
                    colorScheme='twitter'
                    bg='primary.100'
                    color='white'
                    as={ReactLink}
                    to='/sign-up'
                    >Create With Email</Button>
                
                </Flex>

            </Box>

            <SignInContainer/>
        
        </Flex>
      </motion.div>
  )
}
