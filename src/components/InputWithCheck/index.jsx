import React,{useState,useRef} from 'react'

import {
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
    useOutsideClick
} from '@chakra-ui/react'

import { useLazyQuery } from '@apollo/client'

import { FaCheck , FaTimes} from 'react-icons/fa'

import {HiArrowRight} from 'react-icons/hi'

export default function InputWithCheck(props) {
    
    const {typeInput,onChangeProps,isInputValid,valueInput,query} = props

    const initialCheck = {
        color : "gray.500",
        icon : HiArrowRight,
        isValid : true,
        tooltip : ("Please Check Availability of Your " + typeInput) 
    }

    const [clickCheck, setClickCheck] = useState(true)
    
    const [tooltipOpen, setTooltipOpen] = useState(false)

    const refTooltip = useRef()

    useOutsideClick({
      ref : refTooltip,
      handler : () => setTooltipOpen(false)
    })

    const [checkInput, setCheckInput] = useState(initialCheck)

    const [getInput,{loading}] = useLazyQuery(query)

    const onChangeInput = (e) =>{
    
        onChangeProps(e.target.value)

        setCheckInput(initialCheck)

        setClickCheck(true)

        if(!isInputValid) {
          setTooltipOpen(true)
        }

        if(isInputValid) {
          setTooltipOpen(false)
        }

    }

    const handleCheckInput = () =>{

      setClickCheck(false)

      getInput({variables:{
        input : valueInput
      }}).then(result=>{
        
        if (result.data.user.length === 0) {
          setCheckInput({
            color : "green.600",
            icon : FaCheck,
            isValid : true,
            tooltip : ("Your " + typeInput + " is available")
          })
        }

        if (result.data.user.length > 0) {
          setCheckInput({
            color : "red.600",
            icon : FaTimes,
            isValid : false,
            tooltip : ("Your " + typeInput +"is unavailable, please change to another " + typeInput)
          })
        }

        setTooltipOpen(true)

      })
      
    }

    return (
    <FormControl 
    variant='floating'
    isInvalid={isInputValid || !checkInput.isValid}
    >

        <InputGroup>
                    
            <Input 
            placeholder=' '
            value={valueInput}
            onChange={onChangeInput}
            isDisabled={loading}
            />
                
            <FormLabel>{typeInput}</FormLabel>

            <InputRightElement>
                    
                { tooltipOpen && <Tooltip 
                label={checkInput.tooltip}
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
                onClick={handleCheckInput}
                bg='transparent'
                isDisabled={isInputValid || !clickCheck}
                isLoading={loading}
                icon={<Icon
                color={checkInput.color}
                as={checkInput.icon}/>}
                />

            </InputRightElement>

        </InputGroup>

        {isInputValid && 
        <FormErrorMessage
        position='absolute'>{typeInput} is Invalid</FormErrorMessage>}
                    
    </FormControl>
  )
}
