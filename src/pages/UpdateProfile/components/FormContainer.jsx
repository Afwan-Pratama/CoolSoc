import React,{useState} from 'react'

import { 
    Flex,
    Button,
    FormControl,
    Input,
    FormLabel,
    FormErrorMessage,
    Heading,
     } from '@chakra-ui/react'
     
import { useStateWithValidation } from '../../../hooks'

import { fetchUsername } from '../../../graphql/query'

import { InputWithCheck } from '../../../components'     

export default function FormContainer(props) {

    const {dataDetails,handleUpload} = props

    const [loadingApply , setLoadingApply] = useState(false)

    const regex = {
        username : /^[a-z0-9_]{3,12}$/,
        name : /[A-Za-z\s]$/
    }
    
    const [ username , setUsername , isUsernameValid] = useStateWithValidation(
      value => !regex.username.test(value),dataDetails.username
    )  
    
    const [ firstName , setFirstName, isFirstNameValid ] = useStateWithValidation(
      value => !regex.name.test(value),dataDetails.first_name
    )
      
    const [ lastName , setLastName, isLastNameValid ] = useStateWithValidation(
      value => !regex.name.test(value),dataDetails.last_name
    )

    const onChangeUsername = (e) =>{
    
      setUsername(e)
      
    }

    const handleApply = async() => {

      setLoadingApply(true)

      await handleUpload(username,firstName,lastName)

      setLoadingApply(false)

    }
  
    return (
    
        <Flex
        flexDir='column'
        gap='12'
        px={[30,50,100,200,400]}
        mb='32'
        >
            <Heading>Update Profile</Heading>

            <InputWithCheck
            typeInput='Username'
            onChangeProps={onChangeUsername}
            isInputValid={isUsernameValid}
            valueInput={username}
            query={fetchUsername}
            />
    
            <FormControl 
            variant='floating'
            isInvalid={isFirstNameValid}>
                    
              <Input 
              placeholder=' '
              value={firstName}
              onChange={(e)=>setFirstName(e.target.value)}/>
                    
              <FormLabel>First Name</FormLabel>

              {isFirstNameValid && 
              <FormErrorMessage
              position='absolute'
              >First Name must only contain letter</FormErrorMessage>}
                    
            </FormControl>

            <FormControl 
            variant='floating'
            isInvalid={isLastNameValid}>
                    
              <Input placeholder=' '
              value={lastName}
              onChange={(e)=>setLastName(e.target.value)}/>
                    
              <FormLabel>Last Name</FormLabel>
              
              {isLastNameValid && 
              <FormErrorMessage
              position='absolute'
              >Last Name must only contain letter</FormErrorMessage>}

            </FormControl>

            <Button
            w='fit-content'
            onClick={handleApply}
            isLoading={loadingApply}
            >
                Apply
            </Button>
            
        </Flex>    

  )
}
