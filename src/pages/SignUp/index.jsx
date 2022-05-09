import React,{useState} from 'react'

import { 
  Box,
  Flex,
  Text} from '@chakra-ui/react'

import { motion } from 'framer-motion'

import Card1 from './component/Card1'
import Card2 from './component/Card2'

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
        
        {form.one.slide &&  <Card1 
        form={form.one} 
        handleNext={handleNext}/>}

       {form.two.slide && <Card2
        form={form.two}
        handlePrevious={handlePrevious}/>
       }
      </Flex>
  
  </motion.div>
  
  )
}
