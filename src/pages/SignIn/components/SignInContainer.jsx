import React,{useState} from 'react'

import { 
    Button, 
    ButtonGroup, 
    Flex, 
    FormControl, 
    FormLabel, 
    Heading, 
    Input, 
    Text,
    FormErrorMessage,
    InputGroup,
    InputRightElement,
    Icon } from '@chakra-ui/react'

import { useNavigate } from 'react-router-dom'

import { FaRegEye , FaRegEyeSlash } from 'react-icons/fa'

import { useAuth } from '../../../context/FirebaseContext'

import { useStateWithValidation } from '../../../hooks'

export default function SignInContainer() {

    const regex = {
        email : /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ,
        password : /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/ ,
    }

    const navigate = useNavigate()

    const { login } = useAuth()

    const [ email , setEmail, isEmailValid ] = useStateWithValidation(
        value => !regex.email.test(value),''
      )

    const [ password , setPassword, isPasswordValid ] = useStateWithValidation(
        value => !regex.password.test(value) , ''
      )
    
    const [ showPassword, setShowPassword] = useState(false)

    const [ loading, setLoading ] = useState(false)
    
    const toggleShowPassword = () =>{
        setShowPassword((prev)=> !prev)
    }

    const handleSubmitSignIn = async () =>{

        try{

            setLoading(true)
            await login(email,password)
            navigate("/")

        }catch{

        }

        setLoading(false)

    }

  return (
    <Flex
            w='50%'
            
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            gap='12'
            px={[200, 100 , 75 , 100 , 150 , 200]}
            >

                <Heading>Sign In</Heading>
                
                <Text
                >
                Sign Your Account Here!</Text>

                <FormControl 
                variant='floating'
                isInvalid={isEmailValid}>
                
                    <Input 
                    placeholder=' '
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}/>
                
                    <FormLabel>Email</FormLabel>

                    {isEmailValid && 
                    <FormErrorMessage>Email is Invalid</FormErrorMessage>}
                
                </FormControl>

                <FormControl 
                variant='floating'
                isInvalid={isPasswordValid}
                >
                
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

                <Button
                width='full'
                variant='solid'
                colorScheme='twitter'
                bg='primary.100'
                color='white'
                isDisabled={isEmailValid||isPasswordValid}
                isLoading={loading}
                onClick={handleSubmitSignIn}
                >
                Sign In</Button>

                <Text 
                >Or Continue With</Text>

                <ButtonGroup
                gap='12'>
                        
                        <Button
                        variant='solid'
                        bg='white'
                        boxShadow='around'
                        color='black'
                        colorScheme='twitter'
                        >Google</Button>
                        
                        <Button
                        variant='solid'
                        bg='white'
                        boxShadow='around'
                        color='black'
                        colorScheme='twitter'
                        >Twitter</Button>
                    
                </ButtonGroup>

            </Flex>
  )
}
