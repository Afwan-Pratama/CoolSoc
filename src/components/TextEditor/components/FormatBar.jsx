import React,{useState} from 'react'

import {
    Flex,
    IconButton,
    Icon,
    Heading,
    Tooltip
} from '@chakra-ui/react'

import {
    MdFormatBold,
    MdFormatItalic,
     MdFormatUnderlined,
    MdStrikethroughS
} from 'react-icons/md'

export default function FormatBar(props) {

    const {editor} = props

    const [toggle,setToggle] = useState({
        bold : false,
        italic : false,
        strike : false,
        underline : false,
    })

    const handleBold = () =>{
        
        setToggle((prev)=>{
            return {...prev,bold :!prev.bold}
        })
        editor.chain().focus().toggleBold().run()
    
      }
    
    const handleItalic = () =>{
        
        setToggle((prev)=>{
            return {...prev,italic :!prev.italic}
        })
        editor.chain().focus().toggleItalic().run()
    
    }
    
    const handleColor = (e) =>{
        
        editor.chain().focus().setColor(e).run()
    
    }
    
    const handleStrike = () =>{
        
        setToggle((prev)=>{
            return {...prev,strike :!prev.strike}
        })
        editor.commands.toggleStrike()
    
    }
    
    const handleUnderline = () =>{
        
        setToggle((prev)=>{
            return {...prev,underline :!prev.underline}
        })
        editor.commands.toggleUnderline()
    
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
        >Font</Heading>

        <Flex
        alignItems='center'
        gap='3'
        >

            <Tooltip
            hasArrow
            label='Font Color'
            bg='white'
            color='primary.100'
            >

                <input
                style={{height: '30px' , width: '30px'}}
                onInput={e => handleColor(e)}
                type='color'/>

            </Tooltip>
            
            <Tooltip
            hasArrow
            label='Bold'
            bg='white'
            color='primary.100'
            >

                <IconButton
                size='md'
                bg={toggle.bold?'primary.100':'gray.300'} 
                icon={<Icon
                    color={toggle.bold?'white':'black'}        
                    fontSize='xl'
                    as={MdFormatBold}
                    />}
                onClick={handleBold}
                ></IconButton>

            </Tooltip>
            
            <Tooltip
            hasArrow
            label='Italic'
            bg='white'
            color='primary.100'
            >

                <IconButton
                size='md' 
                bg={toggle.italic?'primary.100':'gray.300'} 
                icon={<Icon
                    color={toggle.italic?'white':'black'}
                    fontSize='xl'
                    as={MdFormatItalic}/>}
                onClick={handleItalic}
                ></IconButton>
            
            </Tooltip>
            
            <Tooltip
            hasArrow
            label='Strike Through'
            bg='white'
            color='primary.100'
            >

                <IconButton
                size='md' 
                bg={toggle.strike?'primary.100':'gray.300'} 
                icon={<Icon
                    color={toggle.strike?'white':'black'}
                    fontSize='xl'
                    as={MdStrikethroughS}
                    />}
                    onClick={handleStrike}
                ></IconButton>
            
            </Tooltip>

            <Tooltip
            hasArrow
            label='Underline'
            bg='white'
            color='primary.100'
            >

                <IconButton
                size='md' 
                bg={toggle.underline?'primary.100':'gray.300'} 
                icon={<Icon
                    color={toggle.underline?'white':'black'}
                    fontSize='xl'
                    as={MdFormatUnderlined}
                    />}
                onClick={handleUnderline}
                ></IconButton>
            
            </Tooltip>

        </Flex>

    
    </Flex>

  )
}
