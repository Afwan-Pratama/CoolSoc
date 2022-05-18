import React,{useState} from 'react'

import { 
  Box,
  Flex,
  Text,
  useMediaQuery} from '@chakra-ui/react'

import { motion } from 'framer-motion'

import CardSetup from './component/CardSetup'
import CardDetail from './component/CardDetail'

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
  
  const [isLargerThan750px] = useMediaQuery('(min-width:750px)') 

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
        width={isLargerThan750px?'600px':'300px'}
        position='relative'
        justifyContent='space-between'
        mt={isLargerThan750px?'24' : '6'}
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
          w={isLargerThan750px?'520px' : '200px'}
          position='absolute'
          h='1.5'
          bg={progress.background}
          transform={isLargerThan750px?'translate(7%,300%)':'translate(17%,300%)'}
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
        
        {form.one.slide &&  <CardSetup
        form={form.one} 
        handleNext={handleNext}/>}

       {form.two.slide && <CardDetail
        form={form.two}
        handlePrevious={handlePrevious}/>
       }
      </Flex>
  
  </motion.div>
  
  )
}
