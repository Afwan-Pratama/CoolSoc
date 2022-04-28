import React from 'react'

import { Avatar, 
        Box , 
        Flex, 
        Heading, 
        Link, 
        Spacer  } from '@chakra-ui/react'

import { Link  as ReactLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <Flex 
    minWidth='full'
    alignItems='center'
    marginTop='1rem'
    position='fixed'
    zIndex={10}
    >

        <Box w='1rem'/>
        
        <Flex 
        w='full'
        bg='blackAlpha.100' 
        justifyContent='space-between'
        borderRadius='25px'
        alignItems='center'
        padding='0.25rem 4rem'>
            
            <Heading
            size='lg'
            >
            Merk
            </Heading>
            
            <Flex 
            gap='30'
            alignItems='center'>

                <Flex>
                    <Link as={ReactLink} to='/'>Home</Link>
                </Flex>
                
                <Avatar 
                size='sm'/>
            
            </Flex>
        
        </Flex>
        
        <Box w='1rem' float='right'/>
    
    </Flex>
  )
}
