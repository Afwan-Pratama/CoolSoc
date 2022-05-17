import React,{useState,useEffect} from 'react'

import { 
    Box, 
    Icon, 
    IconButton, 
    Image,
    Tooltip,
    Popover,
    PopoverTrigger,
    PopoverArrow,
    PopoverBody,
    PopoverHeader,
    PopoverContent,
    PopoverFooter,
    useToast,
    Input,
    Button } from '@chakra-ui/react'

import { ref , uploadBytesResumable , getDownloadURL} from 'firebase/storage'

import { useCookies } from 'react-cookie'

import { storage } from '../../../firebase'

import { BsPencil } from 'react-icons/bs'

import { FaCheck } from 'react-icons/fa'

import defaultBackground from '../assets/default.jpg'

export default function BackgroundContainer(props) {

    const {backgroundUrl,handleSelectBackground} = props

    const [openImage,setOpenImage] = useState(false)
    
    const [imageAsPreview , setImageAsPreview] = useState()
    
    const [imageAsFile, setImageAsFile] = useState()
    
    const [loadingUpload, setLoadingUpload] = useState(false)

    const toast = useToast()

    const [cookies] = useCookies()

    useEffect(()=>{

        if (imageAsFile === undefined) return;
        const imageObject = URL.createObjectURL(imageAsFile)  
        setImageAsPreview(imageObject)
    
      },[imageAsFile])
    
      const handleImagePreview = (e) =>{
      
        setImageAsFile(e.target.files[0])
      
      }
    
      const handleCancelImage = () =>{
        
        setOpenImage(false)
        
      }

      const handleAddImage = () =>{
    
        setLoadingUpload(true)
    
        const storageRef = ref(storage,`background-profile/${imageAsFile.name}-${cookies.uid}`)
    
        const uploadTask = uploadBytesResumable(storageRef,imageAsFile)
    
        uploadTask.on('state_changed',(snapshot)=>{
          
        }, 
        (error) => {
    
            setLoadingUpload(false)
            
            toast({
              title : "Something Went Wrong",
              description : "Please Try Again",
              variant : "solid",
              status : "error",
              position : "bottom",
              isClosable : true,
              duration : 3000
            })
    
          }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    
            toast({
              title : "Yay,Your New Background is Success Uploaded",
              description : "Please Click Button Apply",
              variant : "solid",
              status : "success",
              position : "bottom",
              isClosable : true,
              duration : 3000
            })
            
            setLoadingUpload(false)
            setImageAsFile()
            handleSelectBackground(downloadURL)
          });
        }
        )
    
    
      }

  return (
            
            <Box
            position='relative'
            >

                <Image 
                h='500px'
                w='full'
                objectFit='cover'
                src={imageAsPreview || backgroundUrl || defaultBackground}
                />

                <Popover
                isOpen={openImage}
                >

                    <PopoverTrigger>

                        <Tooltip
                        hasArrow
                        label='Change Background Image'
                        bg='white'
                        color='primary.100'
                        >

                            <IconButton
                            bg='blackAlpha.500'
                            position='absolute'
                            size='sm'
                            bottom='20px'
                            right='20px'
                            icon={
                                <Icon 
                                as={BsPencil}
                                />}
                            onClick={()=>setOpenImage(true)}
                            />

                        </Tooltip>

                    </PopoverTrigger>
                        
                    <PopoverContent
                    bg='white'
                    >

                        <PopoverArrow/>

                        <PopoverHeader>Upload Image</PopoverHeader>
                        
                        <PopoverBody>

                            <Input accept='image/*' type='file' onChange={handleImagePreview}/>
                            
                            {imageAsPreview &&
                            <img src={imageAsPreview} alt='Not Found'></img>}

                        </PopoverBody>

                        <PopoverFooter>

                            <Button
                            isDisabled={loadingUpload}
                            onClick={handleCancelImage}
                            >Close</Button>
                            
                        </PopoverFooter>

                    </PopoverContent>
                
                </Popover>
                
                {imageAsFile &&
                <Tooltip
                hasArrow
                label='Select And Upload Image Here'
                bg='white'
                color='primary.100'
                isOpen={imageAsFile?true:false}
                >

                    <IconButton
                    bg='blackAlpha.500'
                    position='absolute'
                    size='sm'
                    bottom='20px'
                    right='70px'
                    isLoading={loadingUpload}
                    icon={
                        <Icon 
                        as={FaCheck}
                        />}
                    onClick={handleAddImage}
                    />

                </Tooltip>}
            
            </Box>
  )
}
