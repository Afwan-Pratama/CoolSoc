import React,{useState,useRef} from 'react'

import {
    SlideFade,
    Box,
    Heading,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
    InputGroup,
    InputRightElement,
    Icon,
    Text,
    ButtonGroup
} from '@chakra-ui/react'

import { useDispatch , useSelector} from 'react-redux'

import { useNavigate } from 'react-router-dom'

import { FaRegEye , FaRegEyeSlash } from 'react-icons/fa'

import { useStateWithValidation } from '../../../hooks'

import { fetchEmail } from '../../../graphql/query'

import { addUserLocal , deleteUserLocal} from '../../../store/Slices/UserSlice'

import InputWithCheck from '../../../components/InputWithCheck'

export default function Card1(props) {

    const {form,handleNext} = props

    const regex = {
        email : /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ,
        password : /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/ ,
    }

    const userLocal = useSelector((state)=>state.user.user)

    let initialValueForm = {
      email : '',
      password : ''
    }

    if(Object.keys(userLocal).length > 0) {
      initialValueForm = {
        email : userLocal.email,
        password : userLocal.password
      }
    }

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [ email , setEmail, isEmailValid ] = useStateWithValidation(
        value => !regex.email.test(value), initialValueForm.email
      )

    const [ password , setPassword, isPasswordValid ] = useStateWithValidation(
        value => !regex.password.test(value) , initialValueForm.password
      )
    
    const passwordConfirmRef = useRef()

    const [ showPassword, setShowPassword] = useState(false)

    const [ isPasswordConfirmValid, setIsPasswordConfirmValid ] = useState(false)
    
    const onChangeEmail = (e) =>{
     
      setEmail(e)
    
    }

    const toggleShowPassword = () =>{
        setShowPassword((prev)=> !prev)
    }

    const handleNextButton = () =>{
        
        if (passwordConfirmRef.current.value !== password){
            return setIsPasswordConfirmValid(true)
          }
        
        dispatch(addUserLocal({
          email : email,
          password : password
        }))
        
        handleNext()
    }

    const handletoSignIn = () => {

      dispatch(deleteUserLocal())

      navigate('/sign-in')

    }

  return (

        <SlideFade 
        in={form.slide}
        offsetX='-100px'>

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
            <Heading>Create Your Account</Heading>

            <InputWithCheck
            typeInput='Email'
            onChangeProps={onChangeEmail}
            isInputValid={isEmailValid}
            valueInput={email}
            query={fetchEmail}
            />

            <FormControl 
            variant='floating'
            isInvalid={isPasswordValid}>
              
              <InputGroup>

                <Input 
                placeholder=' ' 
                type={showPassword? 'text' : 'password'}
                value={password}
                onChange={(e)=>setPassword(e.target.value)}/>
                      
                <FormLabel>Password</FormLabel>

                <InputRightElement
                onClick={toggleShowPassword}
                >
                
                  <Icon 
                  color='gray' 
                  as={showPassword? FaRegEye : FaRegEyeSlash}/>
                
                </InputRightElement>
              
              </InputGroup>

              { isPasswordValid && 
              <FormErrorMessage 
              position='absolute'
              >Password must be 8 character or more</FormErrorMessage>}
                    
            </FormControl>

            <FormControl 
            variant='floating'
            isInvalid={isPasswordConfirmValid}>
              
              <InputGroup>

              <Input 
              placeholder=' '
              type={showPassword? 'text' : 'password'}
              ref={passwordConfirmRef}
              />
                    
              <FormLabel>Password Confirmation</FormLabel>
              
              <InputRightElement
                onClick={toggleShowPassword}
                >
                
                  <Icon 
                  color='gray' 
                  as={showPassword? FaRegEye : FaRegEyeSlash}/>
                
                </InputRightElement>

              </InputGroup>

              { isPasswordConfirmValid && 
              <FormErrorMessage
              position='absolute'
              >Password Confirmation not same with Password</FormErrorMessage>}
            
            </FormControl>

            <ButtonGroup
            flexDirection='column'
            gap='5'
            >

              <Button 
              onClick={handleNextButton}
              disabled={isEmailValid || isPasswordValid}
              >
                Next
              </Button>

              <Text>Already Have Account ?</Text>
              
              <Button
              variant='solid'
              colorScheme='twitter'
              bg='primary.100'
              color='white'
              onClick={handletoSignIn}>
               Sign In
              </Button>

            </ButtonGroup>
          </Box>

        </SlideFade>

  )
}