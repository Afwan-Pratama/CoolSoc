import React from 'react'

import {
    Flex,
    Heading,
    IconButton,
    Icon,
    Tooltip,
} from '@chakra-ui/react'

import {
    FaUndo,
    FaRedo
} from 'react-icons/fa'

export default function HistoryBar(props) {

    const {editor} = props

    const handleUndo = () =>{

        editor.commands.undo()

    }

    const handleRedo = () =>{

        editor.commands.redo()

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
            >History</Heading>

            <Flex
            gap='3'
            alignItems='center'
            >
                <Tooltip
                hasArrow
                label='Undo'
                bg='white'
                color='primary.100'
                >
                 
                    <IconButton
                    size='md'
                    bg='gray.300'
                    icon={
                        <Icon
                        as={FaUndo}
                        fontSize='md'/>
                    }
                    onClick={handleUndo}
                    />
                
                </Tooltip> 
                
                <Tooltip
                hasArrow
                label='Redo'
                bg='white'
                color='primary.100'>

                    <IconButton
                    size='md'
                    bg='gray.300'
                    icon={
                        <Icon
                        as={FaRedo}
                        fontSize='md'/>
                    }
                    onClick={handleRedo}
                    />
                
                </Tooltip>

            </Flex>

        </Flex>
  )

}
