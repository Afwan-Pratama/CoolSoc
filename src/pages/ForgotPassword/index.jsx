import React,{useState,useRef} from 'react'

import {
    Flex,
    Heading,
    Box,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    InputGroup,
    InputRightElement,
    Tooltip,
    Icon,
    IconButton,
    useOutsideClick,
    useToast,
    ButtonGroup,
    Button,
    Text
} from '@chakra-ui/react'

import { Link as ReactLink } from 'react-router-dom'

import { motion } from 'framer-motion'

import { useLazyQuery } from '@apollo/client'

import { useAuth } from '../../context/FirebaseContext'

import { useStateWithValidation } from '../../hooks'

import { fetchEmail } from '../../graphql/query'

import { FaCheck , FaAngleRight , FaTimes} from 'react-icons/fa'


export default function ForgotPassword() {

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 

    const [ email , setEmail, isEmailValid ] = useStateWithValidation(
        value => !regexEmail.test(value), ''
      )

    const initialCheck = {
        color : 'gray.500',
        icon : FaAngleRight,
        isValid : true,
    }

    const toast = useToast()

    const [clickCheck, setClickCheck] = useState(true)
    
    const [tooltipOpen, setTooltipOpen] = useState(false)

    const [loadingSend, setLoadingSend] = useState(false)

    const refTooltip = useRef()

    useOutsideClick({
      ref : refTooltip,
      handler : () => setTooltipOpen(false)
    })

    const [checkInput, setCheckInput] = useState(initialCheck)

    const [getEmail,{loading : loadingEmail }] = useLazyQuery(fetchEmail)

    const { forgotPassword } = useAuth()

    const onChangeEmail = (e) => {
    
        setEmail(e.target.value)

        setClickCheck(true)

        setCheckInput(initialCheck)

        if(!isEmailValid) {
          setTooltipOpen(true)
        }

        if(isEmailValid) {
          setTooltipOpen(false)
        }

    }

    const handleCheckEmail = () =>{

      setClickCheck(false)

      getEmail({variables:{
        input : email
      }}).then(result=>{
        
        if (result.data.user.length === 0) {
          
            setCheckInput({
            color : 'red.500',
            icon : FaTimes,
            isValid : true,
            })

            toast({
                title : 'Your Email is not Registered',
                description : 'Please input email correctly',
                variant : 'solid',
                position : 'bottom',
                status : 'error',
                duration : 5000,
                isClosable : true
            })

        }

        if (result.data.user.length > 0) {
          setCheckInput({
            color : 'green.500',
            icon : FaCheck,
            isValid : false,
          })

          toast({
            title : 'Yay, Your Email is Registered',
            description : 'Now, you can send email to reset password',
            variant : 'solid',
            position : 'bottom',
            status : 'success',
            duration : 5000,
            isClosable : true
        })

        }

      })
      
    }

    const handleSendEmail = async () => {

        setLoadingSend(true)
        await forgotPassword(email)
        .then(()=>{
            toast({
                title : 'Yay, Email already Sended',
                description : 'Please check your email to reset password',
                variant : 'solid',
                position : 'bottom',
                status : 'success',
                isClosable : true
            })
            setEmail('')
        })
        setLoadingSend(false)

    }

    return (
    <motion.div
    initial={{opacity: 0}}
    animate={{opacity:1}}
    exit={{opacity:0}}
    >

      <Flex
      h='100vh'
      w='full'
      bg='linear-gradient(180deg, #4EA5FF 0%, rgba(78, 165, 255, 0.5625) 99.99%, rgba(78, 165, 255, 0) 100%);'
      alignItems='center'
      justifyContent='center'
      textAlign='center'
      gap='12'
      >

        <Flex
          w='600px'
          bg='white'
          borderRadius='25px'
          flexDirection='column'
          gap='12'
          justifyContent='center'
          p='100px'
          boxShadow='aroundmd'
          >
            <Heading>Forgot Your Password</Heading>

            <Text> We will send reset password email to your email </Text>

            <FormControl 
            variant='floating'
            isInvalid={isEmailValid || checkInput.isValid}
            >

                <InputGroup>
                            
                    <Input 
                    placeholder=' '
                    value={email}
                    onChange={onChangeEmail}
                    isDisabled={loadingEmail}
                    />
                        
                    <FormLabel>Email</FormLabel>

                    <InputRightElement>
                            
                        { tooltipOpen && <Tooltip 
                        label='Please Check Your Email Here'
                        placement='bottom'
                        hasArrow
                        isOpen
                        ref={refTooltip}
                        bg={checkInput.color}>
                            
                            <Box 
                            position='absolute'
                            width='full'
                            height='full'
                            />
                
                        </Tooltip>}

                        <IconButton
                        onClick={handleCheckEmail}
                        bg='transparent'
                        isDisabled={isEmailValid || !clickCheck}
                        isLoading={loadingEmail}
                        icon={<Icon
                        color={checkInput.color}
                        as={checkInput.icon}/>}
                        />

                    </InputRightElement>

                </InputGroup>

                {isEmailValid && 
                <FormErrorMessage
                position='absolute'>Email is Invalid</FormErrorMessage>}
                            
            </FormControl>

            <ButtonGroup
            flexDirection='column'
            gap='5'
            >

              <Button 
              onClick={handleSendEmail}
              disabled={isEmailValid || checkInput.isValid}
              isLoading={loadingSend}
              >
                Send Email Reset Password
              </Button>

              <Text>Your Email is not Register yet? </Text>
              
              <Button
              variant='solid'
              colorScheme='twitter'
              bg='primary.100'
              color='white'
              as={ReactLink}
              to='/sign-up'>
               Create With Email
              </Button>

              <Text>Already Reset your Password? </Text>
              
              <Button
              variant='solid'
              colorScheme='twitter'
              bg='primary.100'
              color='white'
              as={ReactLink}
              to='/sign-in'>
               Sign In
              </Button>

            </ButtonGroup>
          </Flex>
       
      </Flex>
  
  </motion.div>
  )
}
