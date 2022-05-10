import React,{useState} from 'react'

import {
    SlideFade,
    Flex,
    Heading,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button
} from '@chakra-ui/react'

import { useAuth } from '../../../context/FirebaseContext'

import { useNavigate } from 'react-router-dom'

import { useMutation } from '@apollo/client'

import { useDispatch} from 'react-redux'

import { fetchUsername } from '../../../graphql/query'

import { insertUserMutation } from '../../../graphql/mutation'

import { useStateWithValidation } from '../../../hooks'

import { deleteUserLocal } from '../../../store/Slices/UserSlice'

import InputWithCheck from '../../../components/InputWithCheck'

export default function Card() {

    const regex = {
        username : /^[a-z0-9_]{3,12}$/,
        name : /[A-Za-z\s]$/
    }

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [ username , setUsername , isUsernameValid] = useStateWithValidation(
        value => !regex.username.test(value),''
      )  
      
    const [ firstName , setFirstName, isFirstNameValid ] = useStateWithValidation(
        value => !regex.name.test(value),''
      )
        
    const [ lastName , setLastName, isLastNameValid ] = useStateWithValidation(
        value => !regex.name.test(value),''
      )
    
    const { currentUser } = useAuth()

    const [ insertUser ] = useMutation(insertUserMutation)

    const [loading,setLoading] = useState(false)

    const onChangeUsername = (e) =>{
    
        setUsername(e)
        
    }

    const onSubmitSignUp = async () =>{  
        
        setLoading(true)
        
        await insertUser({variables:{
            uid : currentUser.uid,
            email : currentUser.email,
            username : username,
            first_name : firstName,
            last_name : lastName,
            avatar_url : currentUser.photoURL
        }}).then(()=>{
            
            dispatch(deleteUserLocal())
            navigate('/')
          
          })
        
        setLoading(false)

    }

  return (

    <SlideFade 
        in={true}
        offsetX='100px'
        >

          <Flex
          w='600px'
          h='600px'
          bg='white'
          borderRadius='25px'
          flexDirection='column'
          gap='12'
          justifyContent='center'
          px='100px'
          boxShadow='aroundmd'
          >
            <Heading>Personal Details</Heading>

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
            variant='solid'
            colorScheme='twitter'
            bg='primary.100'
            color='white'
            px='12'
            isDisabled={isUsernameValid || isFirstNameValid || isLastNameValid || loading}
            onClick={onSubmitSignUp}
            isLoading={loading}
            >
              Submit
            </Button>

          </Flex>
      
      </SlideFade>
  )
}