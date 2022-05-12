import React,{useState} from 'react'

import {
    SlideFade,
    Box,
    Heading,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    ButtonGroup,
    Button,
    useToast
} from '@chakra-ui/react'

import { useAuth } from '../../../context/FirebaseContext'

import { useNavigate } from 'react-router-dom'

import { useMutation } from '@apollo/client'

import { useSelector , useDispatch} from 'react-redux'

import { useCookies } from 'react-cookie'

import { fetchUsername } from '../../../graphql/query'

import { insertUserMutation } from '../../../graphql/mutation'

import { useStateWithValidation } from '../../../hooks'

import { deleteUserLocal } from '../../../store/Slices/UserSlice'

import InputWithCheck from '../../../components/InputWithCheck'

export default function CardDetail(props) {

    const {form,handlePrevious} = props

    const regex = {
        username : /^[a-z0-9_]{3,12}$/,
        name : /[A-Za-z\s]$/
    }

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const toast = useToast()

    const userData = useSelector((state)=>state.user.user)

    const [ username , setUsername , isUsernameValid] = useStateWithValidation(
        value => !regex.username.test(value),''
      )  
      
    const [ firstName , setFirstName, isFirstNameValid ] = useStateWithValidation(
        value => !regex.name.test(value),''
      )
        
    const [ lastName , setLastName, isLastNameValid ] = useStateWithValidation(
        value => !regex.name.test(value),''
      )
    
    const { signup } = useAuth()

    const [ insertUser ] = useMutation(insertUserMutation)

    const [loading, setLoading] = useState(false)

    const [ cookie, setCookie ] = useCookies(["uid"])

    const onChangeUsername = (e) =>{
    
        setUsername(e)
        
    }

    const onSubmitSignUp = async () =>{  
        
        setLoading(true)
        await signup(userData.email,userData.password)
        .then(async (result)=>{

          await insertUser({variables:{
            uid : result.user.uid,
            email : userData.email,
            username : username,
            first_name : firstName,
            last_name : lastName,
            avatar_url : ""
          }}).then(()=>{
            setCookie("uid",result.user.uid,{
              path: "/",
              sameSite : "none",
              secure : true
            })
            dispatch(deleteUserLocal())
            navigate('/')
          
          })
        
        })
        .catch((err)=>{
          toast({
            title : err.code,
            description : err.message,
            variant : 'solid',
            position : 'bottom',
            status : 'error',
            duration : 5000,
            isClosable : true
        })
        })


        setLoading(false)

    }

  return (

    <SlideFade 
        in={form.slide}
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
          display={form.display}
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

            <ButtonGroup
            justifyContent='space-between'
            >

            <Button
            onClick={handlePrevious}
            px='12'
            >
              Previous
            </Button>

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

            </ButtonGroup>
          
          </Box>
      
      </SlideFade>

  )
}
