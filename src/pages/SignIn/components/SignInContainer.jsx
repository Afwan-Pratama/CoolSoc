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
    Icon,
    useToast,
    Link } from '@chakra-ui/react'

import { useNavigate , Link as ReactLink} from 'react-router-dom'

import { useLazyQuery } from '@apollo/client'

import { useDispatch } from 'react-redux'

import { FaRegEye , FaRegEyeSlash, FaTwitter } from 'react-icons/fa'

import { FcGoogle } from 'react-icons/fc'

import { useAuth } from '../../../context/FirebaseContext'

import { useStateWithValidation } from '../../../hooks'

import { fetchUID } from '../../../graphql/query'

import { addIncompletedSignUp } from '../../../store/Slices/UserSlice'

export default function SignInContainer() {

    const regex = {
        email : /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ,
        password : /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/ ,
    }

    const navigate = useNavigate()

    const toast = useToast()

    const dispatch = useDispatch()

    const { login , signGoogle} = useAuth()

    const [ email , setEmail, isEmailValid ] = useStateWithValidation(
        value => !regex.email.test(value),''
      )

    const [ password , setPassword, isPasswordValid ] = useStateWithValidation(
        value => !regex.password.test(value) , ''
      )
    
    const [ showPassword, setShowPassword] = useState(false)

    const [ loading, setLoading ] = useState({
        email : false,
        google : false,
        twitter : false,
    })

    const [getUID] = useLazyQuery(fetchUID)
    
    const toggleShowPassword = () =>{
        setShowPassword((prev)=> !prev)
    }

    const handleSubmitSignIn = async () =>{

        setLoading({
            email : true
        })
        
        await login(email,password)
        
        .then(()=>{
            navigate("/")
        })
        
        .catch((err)=>{

            let titleToast = 'User Not Found'
            let descToast = 'Please Enter Your Email & Password Again'

            if(err.code === 'auth/wrong-password'){
                titleToast = 'Your Password is Invalid'
                descToast = 'Please Enter Your Password Correctly'
            }

            toast({
                title : titleToast,
                description : descToast,
                variant : 'solid',
                position : 'bottom',
                status : 'error',
                duration : 5000,
                isClosable : true
            })
        })

        setLoading({
            email : false
        })

    }

    const handleSignInGoogle = async () => {

        setLoading({
            google : true,
        })

        await signGoogle()

        .then(async (result)=>{
            
            console.log(result.user)
            await getUID({variables:{
                uid : result.user.uid
            }}).then((response)=>{
                if(response.data.user.length === 0){
                    dispatch(addIncompletedSignUp())
                    navigate('/personal-details')
                }
                if(response.data.user.length > 0) {
                    navigate('/')
                }
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
        setLoading({
            google : false
        })
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
                    <FormErrorMessage
                    position='absolute'
                    >Email is Invalid</FormErrorMessage>}
                
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

                    { isPasswordValid && <FormErrorMessage
                    position='absolute'
                    >Password must be 8 character or more</FormErrorMessage>}

                </FormControl>
                
                <ButtonGroup
                w='full'
                flexDirection='column'
                alignItems='baseline'
                gap='5'
                >

                <Link
                ml='3'
                fontWeight='medium'
                color='primary.100'
                as={ReactLink}
                to='/forgot-password'
                >Forgot Your Password ?</Link>

                <Button
                width='full'
                variant='solid'
                colorScheme='twitter'
                bg='primary.100'
                color='white'
                isDisabled={isEmailValid||isPasswordValid}
                isLoading={loading.email}
                onClick={handleSubmitSignIn}
                >
                Sign In</Button>
                
                </ButtonGroup>

                <Text 
                >Or Continue With</Text>

                <ButtonGroup
                gap='12'>
                        
                        <Button
                        leftIcon={<Icon as={FcGoogle} />}
                        px='10'
                        variant='solid'
                        bg='white'
                        boxShadow='around'
                        color='black'
                        colorScheme='twitter'
                        onClick={handleSignInGoogle}
                        isLoading={loading.google}
                        >Google</Button>
                        
                        <Button
                        leftIcon={<Icon color='twitter.500' as={FaTwitter}/>}
                        px='10'
                        variant='solid'
                        bg='white'
                        boxShadow='around'
                        color='black'
                        colorScheme='twitter'
                        isLoading={loading.twitter}
                        >Twitter</Button>
                    
                </ButtonGroup>

            </Flex>
  )
}
