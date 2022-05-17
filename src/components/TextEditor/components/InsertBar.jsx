import React,{useState,useEffect} from 'react'

import {
  Flex,
  Icon,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  Input,
  Progress,
  Text as TextChakra,
  useToast,
  Button,
  FormControl,
  FormErrorMessage,
  Heading,
  Tooltip
} from '@chakra-ui/react'

import { 
  MdInsertLink,
  } from 'react-icons/md'

import {VscHorizontalRule} from 'react-icons/vsc'

import { RiImageAddLine } from 'react-icons/ri'

import { ref , uploadBytesResumable , getDownloadURL} from 'firebase/storage'

import { useCookies } from 'react-cookie'

import { storage } from '../../../provider/firebase'

import { useStateWithValidation } from '../../../hooks'

export default function InsertBar(props) {

  const {editor,type} = props

  const regexLink = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/

  const [openImage,setOpenImage] = useState(false)

  const [openLink,setOpenLink] = useState(false)
  
  const [imageAsPreview , setImageAsPreview] = useState()
  
  const [imageAsFile, setImageAsFile] = useState()

  const [progressUpload,setProgressUpload] = useState()
  
  const [loadingUpload, setLoadingUpload] = useState(false)

  const [linkString,setLinkString,isLinkValid] = useStateWithValidation(
    value => !regexLink.test(value),''
  )
  const toast = useToast()

  const [cookies] = useCookies()

  useEffect(()=>{

    if (imageAsFile === undefined) return;
    const imageObject = URL.createObjectURL(imageAsFile)  
    setImageAsPreview(imageObject)

  },[imageAsFile])

  const handleHorizontalRule = () =>{
    
    editor.chain().focus().setHorizontalRule().run()
  
  }

  const handleImagePreview = (e) =>{
  
    setImageAsFile(e.target.files[0])
  
  }

  const handleCancelImage = () =>{
    
    setImageAsFile()
    setImageAsPreview()
    setOpenImage(false)
    
  }

  const changeLink = (e) => {

    setLinkString(e.target.value)
  
  }

  const handleAddLink = (e) =>{

    editor.commands.setLink({
      href : linkString,
      target : '_blank'
    })
    
    setLinkString('')
    setOpenLink(false)

  }

  const handleCancelLink = () => {

    setOpenLink(false)
    setLinkString('')

  }

  const handleAddImage = () =>{
    
    setLoadingUpload(true)

    const storageRef = ref(storage,`${type}/${imageAsFile.name}-${cookies.uid}`)

    const uploadTask = uploadBytesResumable(storageRef,imageAsFile)

    uploadTask.on('state_changed',(snapshot)=>{
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      setProgressUpload(progress)
    }, 
    (error) => {

        setLoadingUpload(false)
   
        setProgressUpload()
        
        toast({
          title : "Something Went Wrong",
          description : "Please Try Again",
          variant : "solid",
          status : "error",
          position : "bottom",
          isClosable : true,
          duration : 5000
        })

      }, 
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      
        editor.commands.setImage({src : downloadURL})

        toast({
          title : "Yay,Your Upload Image is Success",
          description : "Let's see in the Editor",
          variant : "solid",
          status : "success",
          position : "bottom",
          isClosable : true,
          duration : 5000
        })
        
        setLoadingUpload(false)
        setImageAsPreview()
        setImageAsFile()
        setOpenImage(false)
        setProgressUpload()
        
      });
    }
    )


  }

  return (
   
    <Flex
    flexDir='column'
    alignItems='center'
    borderRadius='25px'
    boxShadow='around'
    pb='3'
    px='3'
    >

        <Heading
        size='sm'
        py='3'
        >Insert</Heading>

        <Flex
        alignItems='center'
        gap='3'>  

          <Tooltip
          hasArrow
          label='Horintal Rule'
          bg='white'
          color='primary.100'      
          >

            <IconButton
              size='md'
              bg='gray.300' 
              icon={<Icon
                  fontSize='xl'
                  as={VscHorizontalRule}
                  />}
                onClick={handleHorizontalRule}
            ></IconButton>

          </Tooltip>

          <Popover
          closeOnBlur={false}
          isOpen={openImage}
          >

              <PopoverTrigger>

                <Tooltip
                hasArrow
                label='Add Image'
                bg='white'
                color='primary.100'
                >

                  <IconButton
                  onClick={()=>{setOpenImage(true)}}
                  size='md'
                  bg={openImage?'primary.100':'gray.300'} 
                  icon={<Icon
                    color={openImage?'white':'black'}
                    fontSize='xl'
                    as={RiImageAddLine}
                    />}
                  ></IconButton>

                </Tooltip>

              </PopoverTrigger>
                
              <PopoverContent>

                  <PopoverArrow/>

                  <PopoverHeader>Upload Image</PopoverHeader>
                  
                  <PopoverBody>

                    <Input accept='image/*' type='file' onChange={handleImagePreview}/>
                    
                    {imageAsPreview &&
                    <img src={imageAsPreview} alt='Not Found'></img>}

                    {progressUpload &&
                    <Flex 
                    my='5'
                    gap='5'
                    flexDirection='column'
                    alignItems='center'>
                    <TextChakra>Uploading...</TextChakra>
                      <Progress w='full'hasStripe value={progressUpload} />
                    </Flex>
                    }
              
                  </PopoverBody>

                  <PopoverFooter>

                    <Button
                    onClick={handleAddImage}
                    isLoading={loadingUpload}
                    >Select</Button>
                    
                    <Button
                    isDisabled={loadingUpload}
                    onClick={handleCancelImage}
                    >Cancel</Button>
                    
                  </PopoverFooter>

              </PopoverContent>
          
          </Popover>

          <Popover
          closeOnBlur={false}
          isOpen={openLink}
          >

              <PopoverTrigger>

                <Tooltip
                hasArrow
                label='Add Image'
                bg='white'
                color='primary.100'
                >

                  <IconButton
                    size='md' 
                    bg={openLink?'primary.100':'gray.300'} 
                    icon={<Icon
                        color={openLink?'white':'black'}
                        fontSize='xl'
                        as={MdInsertLink}
                        />}
                    onClick={()=>{setOpenLink(true)}}
                  ></IconButton>
          
                </Tooltip>
              
              </PopoverTrigger>
                
              <PopoverContent>

                  <PopoverArrow/>

                  <PopoverHeader>Upload Link</PopoverHeader>
                  
                  <PopoverBody>
                    
                    <FormControl
                    isInvalid={isLinkValid}
                    pb='5'
                    >

                    <Input
                    placeholder='https://www.example.com' 
                    onChange={changeLink}/>

                      {isLinkValid &&
                      <FormErrorMessage
                      position='absolute'
                      >Link is Invalid</FormErrorMessage>
                      }

                    </FormControl>
                    
                  </PopoverBody>

                  <PopoverFooter>

                    <Button
                    onClick={handleAddLink}
                    isDisabled={isLinkValid}
                    >Select</Button>
                    
                    <Button
                    onClick={handleCancelLink}
                    >Cancel</Button>
                    
                  </PopoverFooter>

              </PopoverContent>
          
          </Popover>
          
        </Flex>
      
      </Flex>
  )
}
