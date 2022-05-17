import React, { useState } from 'react'

import {
  Flex,
  IconButton,
  Icon,
  Tooltip,
  Heading
} from '@chakra-ui/react'

import {
  MdFormatListBulleted,
  MdFormatListNumbered} from 'react-icons/md'

export default function ListBar(props) {
  
  const {editor} = props

  const [list,setList] = useState({
    bullet : false,
    number : false
  })

  const handleBulletList = () =>{

    setList((prev)=>{
      
      return{
      bullet : !prev.bullet,
      number : false
      }
    
    })
    editor.commands.toggleBulletList()

  }

  const handleNumberList = () =>{

    setList((prev)=>{
      
      return{
      bullet : false,
      number : !prev.number
      }
    
    })
    editor.commands.toggleOrderedList()

  }

  return (
    

    <Flex
    flexDir='column'
    alignItems='center'
    borderRadius='25px'
    boxShadow='around'
    pb='3'
    px='3'
    >

        <Heading
        size='sm'
        py='3'
        >List</Heading>

        <Flex
        alignItems='center'
        gap='3'>

          <Tooltip
          hasArrow
          label='Bulleted List'
          bg='white'
          color='primary.100'
          >

            <IconButton
              size='md' 
              bg={list.bullet?'primary.100':'gray.300'} 
              icon={<Icon
                  color={list.bullet?'white':'black'}
                  fontSize='xl'
                  as={MdFormatListBulleted}/>}
              onClick={handleBulletList}
            ></IconButton>
          
          </Tooltip>
          
          <Tooltip
          hasArrow
          label='Number List'
          bg='white'
          color='primary.100'
          >
      
            <IconButton
            size='md' 
            bg={list.number?'primary.100':'gray.300'} 
            icon={<Icon
                  color={list.number?'white':'black'} 
                  fontSize='xl'
                  as={MdFormatListNumbered}
                  />}
            onClick={handleNumberList}
            ></IconButton>
          
          </Tooltip>
      
      </Flex>
    
    </Flex>
  )
}
