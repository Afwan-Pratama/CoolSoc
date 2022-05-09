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
    Icon
} from '@chakra-ui/react'

import { FaRegEye , FaRegEyeSlash } from 'react-icons/fa'

import { useStateWithValidation } from '../../../hooks'

import InputWithCheck from './InputWithCheck'
import { fetchEmail } from '../../../graphql/query'

export default function Card1(props) {

    const {form,handleNext} = props

    const regex = {
        email : /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ,
        password : /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/ ,
    }

    const [ email , setEmail, isEmailValid ] = useStateWithValidation(
        value => !regex.email.test(value),''
      )

    const [ password , setPassword, isPasswordValid ] = useStateWithValidation(
        value => !regex.password.test(value) , ''
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
        
        handleNext()
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

              { isPasswordValid && <FormErrorMessage>Password must be 8 character or more</FormErrorMessage>}
                    
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
              <FormErrorMessage>Password Confirmation not same with Password</FormErrorMessage>}
            
            </FormControl>

            <Button 
            onClick={handleNextButton}
            disabled={isEmailValid || isPasswordValid}
            >
              Next
            </Button>

          </Box>

        </SlideFade>

  )
}