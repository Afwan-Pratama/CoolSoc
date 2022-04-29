import React,{useState} from 'react'

import { 
  Box,
  Flex, 
  Heading,
  FormControl,
  Input,
  FormLabel, 
  Button,
  Text,
  ButtonGroup,
  SlideFade} from '@chakra-ui/react'

export default function SignUp() {

  const intialForm = {
      one : {
        display : "flex",
        slide : true
      },
      two : {
        display : "none",
        slide : false 
      }
  }

  const initialProgress = {
    background : "white",
    color : "black"
  }

  const [ form, setForm ] = useState(intialForm)

  const [ progress , setProgress ] = useState(initialProgress)

  const handleNext = () =>{
    
    setProgress({
      background : "primary.100",
      color : "white"
    })

    setForm({
      one : {
        display : "none",
        slide : false
      },
      two : {
        display : "flex",
        slide : true
      }
    })
  }

  const handlePrevious = () => {
    
    setProgress(initialProgress)

    setForm(intialForm)
  }
  
  return (
   
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
        bg={progress.background}
        transform='translate(7%,300%)'
        />
        
        <Flex 
        flexDir='column'
        alignItems='center'>

          <Text
          bg={progress.background}
          py='2'
          px='4'
          borderRadius='full'
          zIndex='1'
          color={progress.color}
          >2</Text>

          <Text
          color='white'
          >Personal Details</Text>
        
        </Flex>
      
      </Flex>
      
      {form.one.slide && <SlideFade 
      in={form.one.slide}
      offsetX='-100px'>

        <Box
        w='600px'
        h='600px'
        bg='white'
        borderRadius='25px'
        flexDirection='column'
        gap='12'
        justifyContent='center'
        px='100px'
        boxShadow='aroundmd'
        display={form.one.display}
        >
          <Heading>Create Your Account</Heading>

          <FormControl 
          variant='floating'>
                  
            <Input placeholder=' '/>
                  
            <FormLabel>Email</FormLabel>
                  
          </FormControl>

          <FormControl 
          variant='floating'>
                  
            <Input placeholder=' '/>
                  
            <FormLabel>Password</FormLabel>
                  
          </FormControl>

          <FormControl 
          variant='floating'>
                  
            <Input placeholder=' '/>
                  
            <FormLabel>Password Confirmation</FormLabel>
                  
          </FormControl>

          <Button 
          onClick={handleNext}
          >
            Next
          </Button>

        </Box>

      </SlideFade> }

      <SlideFade 
      in={form.two.slide}
      offsetX='100px'
      >

        <Box
        w='600px'
        h='600px'
        bg='white'
        borderRadius='25px'
        flexDirection='column'
        gap='12'
        justifyContent='center'
        px='100px'
        boxShadow='aroundmd'
        display={form.two.display}
        >
          <Heading>Personal Details</Heading>

          <FormControl 
          variant='floating'>
                  
            <Input placeholder=' '/>
                  
            <FormLabel>Username</FormLabel>
                  
          </FormControl>

          <FormControl 
          variant='floating'>
                  
            <Input placeholder=' '/>
                  
            <FormLabel>First Name</FormLabel>
                  
          </FormControl>

          <FormControl 
          variant='floating'>
                  
            <Input placeholder=' '/>
                  
            <FormLabel>Last Name</FormLabel>
                  
          </FormControl>

          <ButtonGroup>

          <Button
          onClick={handlePrevious}
          >
            Previous
          </Button>

          <Button>
            Submit
          </Button>

          </ButtonGroup>
        
        </Box>
     
     </SlideFade>

    </Flex>
  )
}
