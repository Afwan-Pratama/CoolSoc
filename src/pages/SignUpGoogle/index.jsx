import React from 'react'

import { 
  Flex,
  Box,
  Text} from '@chakra-ui/react'

import { motion } from 'framer-motion'

import Card from './components/Card'

export default function SignUpGoogle() {
    
    return (
    <motion.div
    initial={{opacity: 0}}
    animate={{opacity:1}}
    exit={{opacity:0}}
   >

      <Flex
      h='100vh'
      w='full'
      bg='linear-gradient(180deg, #4EA5FF 0%, rgba(78, 165, 255, 0.5625) 99.99%, rgba(78, 165, 255, 0) 100%);'
      alignItems='center'
      textAlign='center'
      flexDirection='column'
      gap='12'
      >

        <Flex
        width='600px'
        position='relative'
        justifyContent='space-between'
        mt='24'
        >
          
          <Flex
          flexDir='column'
          alignItems='center'
          >
            
            <Text
            color='white'
            bg='primary.100'
            py='2'
            px='4'
            borderRadius='full'
            zIndex='1'
            >1</Text>
          
            <Text
            color='white'
            >Account Setup</Text>

          </Flex>
          
          <Box
          w='520px'
          position='absolute'
          h='1.5'
          bg='primary.100'
          transform='translate(7%,300%)'
          />
          
          <Flex 
          flexDir='column'
          alignItems='center'>

            <Text
            bg='primary.100'
            py='2'
            px='4'
            borderRadius='full'
            zIndex='1'
            color='white'
            >2</Text>

            <Text
            color='white'
            >Personal Details</Text>
          
          </Flex>
        
        </Flex>

        <Card/>
        
      </Flex>
  
  </motion.div>
  )
}
