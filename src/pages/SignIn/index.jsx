import React from 'react'

import { 
    Box, 
    Button, 
    ButtonGroup, 
    Flex, 
    FormControl, 
    FormLabel, 
    Heading, 
    Input, 
    Text } from '@chakra-ui/react'

import { Link as ReactLink } from 'react-router-dom'

export default function SignIn() {
  
    return (
      <>
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
                gap='12'
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

                    <Text
                    color='white'
                    >Or Create With</Text>

                    <ButtonGroup
                    gap='12'>
                        
                        <Button 
                        variant='solid'
                        bg='white'
                        color='black'
                        colorScheme='twitter'
                        >Google</Button>
                        
                        <Button
                        variant='solid'
                        bg='white'
                        color='black'
                        colorScheme='twitter'
                        >Twitter</Button>
                    
                    </ButtonGroup>
                
                </Flex>

            </Box>
            
            <Flex
            w='50%'
            
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            gap='12'
            px={[200, 100 , 75 , 100 , 150 , 200]}
            >

                <Heading>Sign In</Heading>
                
                <Text
                >
                Sign Your Account Here!</Text>

                <FormControl 
                variant='floating'>
                
                    <Input placeholder=' '/>
                
                    <FormLabel>Email</FormLabel>
                
                </FormControl>

                <FormControl 
                variant='floating'
                >
                
                    <Input placeholder=' '/>
            
                    <FormLabel>Password</FormLabel>
            
                </FormControl>

                <Button
                width='full'
                variant='solid'
                colorScheme='twitter'
                bg='primary.100'
                color='white'
                >
                Sign In</Button>

                <Text 
                >Or Continue With</Text>

                <ButtonGroup
                gap='12'>
                        
                        <Button
                        variant='solid'
                        bg='white'
                        boxShadow='around'
                        color='black'
                        colorScheme='twitter'
                        >Google</Button>
                        
                        <Button
                        variant='solid'
                        bg='white'
                        boxShadow='around'
                        color='black'
                        colorScheme='twitter'
                        >Twitter</Button>
                    
                </ButtonGroup>

            </Flex>
        
        </Flex>
      </>
  )
}
