import React from 'react'

import {Flex,Spinner} from '@chakra-ui/react'

export default function SpinnerPage() {
  return (
    <Flex 
    w='full'
    h='100vh'
    justifyContent='center'
    alignItems='center'
    >
        
        <Spinner
        thickness='5px'
        size='xl'
        color='primary.100'
        />

    </Flex>
  )
}
