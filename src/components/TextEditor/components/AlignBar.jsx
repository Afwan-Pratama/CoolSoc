import React,{useState} from 'react'

import { 
    Flex,
    IconButton,
    Icon,
    Tooltip,
    Heading } from '@chakra-ui/react'

import {
  MdFormatAlignCenter,
  MdFormatAlignLeft,
  MdFormatAlignRight,
} from 'react-icons/md'

export default function AlignBar(props) {
  
    const {editor} = props
    
    const initialAlign = {
      left : true,
      center : false,
      right : false
    }

    const [align,setAlign] = useState(initialAlign)

    const handleLeftAlign = () =>{

      setAlign(initialAlign)
      editor.commands.setTextAlign('left')

    }
  
    const handleCenterAlign = () =>{

      setAlign({
        left : false,
        center : true,
        right : false
      })
      editor.commands.setTextAlign('center')
  
    }
  
    const handleRightAlign = () =>{
      
      setAlign({
        left : false,
        center : false,
        right : true
      })
      editor.commands.setTextAlign('right')

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
        >Align</Heading>

        <Flex
        alignItems='center'
        gap='3'>

        <Tooltip
        hasArrow
        label='Left Align'
        bg='white'
        color='primary.100'
        >

          <IconButton
          size='md' 
          bg={align.left?'primary.100':'gray.300'} 
          icon={<Icon
              color={align.left?'white':'black'}
              fontSize='xl'
              as={MdFormatAlignLeft}
              />}
          onClick={handleLeftAlign}
          ></IconButton>
  
        </Tooltip>

        <Tooltip
        hasArrow
        label='Center Align'
        bg='white'
        color='primary.100'
        >

          <IconButton
          size='md' 
          bg={align.center?'primary.100':'gray.300'} 
          icon={<Icon
              color={align.center?'white':'black'}
              fontSize='xl'
              as={MdFormatAlignCenter}
              />}
          onClick={handleCenterAlign}
          ></IconButton>

        </Tooltip>
        
        <Tooltip
        hasArrow
        label='Right Align'
        bg='white'
        color='primary.100'
        >
          <IconButton
          size='md' 
          bg={align.right?'primary.100':'gray.300'} 
          icon={<Icon
              color={align.right?'white':'black'}
              fontSize='xl'
              as={MdFormatAlignRight}
              />}
          onClick={handleRightAlign}
          ></IconButton>
        
        </Tooltip>
      
      </Flex>
    
    </Flex>

  )
}
