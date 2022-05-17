import React from 'react'

import { 
    Box, 
    Button, 
    Flex,  
    Heading,
    Text,
    useMediaQuery } from '@chakra-ui/react'

import { Link as ReactLink } from 'react-router-dom'

import { motion } from 'framer-motion'

import SignInContainer from './components/SignInContainer'

export default function SignIn() {

    const [isLargerThan850px] = useMediaQuery('(min-width:850px)')
  
    return (
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity:1}}
        exit={{opacity:0}}>
        
        <Flex 
        textAlign='center'
        h={isLargerThan850px?'100vh':''}
        flexDir={isLargerThan850px?'row':'column-reverse'}
        >

                <Box 
                w={isLargerThan850px?'50%':'full'}
                padding='30px'>

                <Flex 
                bg='linear-gradient(180deg, rgba(78, 165, 255, 0) 0%, rgba(78, 165, 255, 0.463542) 0.01%, #4EA5FF 100%);'
                flexDirection='column'
                alignItems='center'
                borderRadius='25px'
                h={isLargerThan850px?'full':''}
                justifyContent='center'
                gap='20'
                px={[50, 100 , 75 , 100 , 140 , 170]}
                >
                    {isLargerThan850px &&
                    
                    <>
                    
                    <Heading
                    color='white'
                    >Welcome to Our Community</Heading>
        
                    <Heading
                    color='white'
                    >CoolSoc</Heading>
                    
                    </>
        
                    }
                    <Text 
                    color='white'
                    >Don't have account yet?</Text>
        
                    <Button
                    variant='solid'
                    w={isLargerThan850px?'full':''}
                    colorScheme='twitter'
                    bg='primary.100'
                    color='white'
                    as={ReactLink}
                    to='/sign-up'
                    >Create With Email</Button>
                
                </Flex>

            </Box>

            <SignInContainer/>

            {!isLargerThan850px &&

                <Box 
                padding='30px'>
                    
                    <Flex
                    flexDir='column'
                    alignItems='center'
                    rowGap='6'
                    bg='linear-gradient(180deg, rgba(78, 165, 255, 0) 0%, rgba(78, 165, 255, 0.463542) 0.01%, #4EA5FF 100%);'
                    borderRadius='25px'
                    >
                    
                        <Heading
                        color='white'
                        >Welcome to Our Community</Heading>
            
                        <Heading
                        color='white'
                        >CoolSoc</Heading>
                    
                    </Flex>

                </Box>
        
            }
        
        </Flex>
      </motion.div>
  )
}
