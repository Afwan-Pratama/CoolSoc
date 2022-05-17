import React,{useState,useEffect} from 'react'

import { 
    Box, 
    Icon, 
    IconButton, 
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
    Button,
    Avatar} from '@chakra-ui/react'

import { ref , uploadBytesResumable , getDownloadURL} from 'firebase/storage'

import { useCookies } from 'react-cookie'

import { storage } from '../../../firebase'

import { BsPencil } from 'react-icons/bs'

import { FaCheck } from 'react-icons/fa'

export default function AvatarContainer(props) {

    const {avatarUrl,handleSelectAvatar} = props

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
    
        const storageRef = ref(storage,`avatar-profile/${imageAsFile.name}-${cookies.uid}`)
    
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
                title : "Yay,Your New Avatar is Success Uploaded",
                description : "Please Click Button Apply",
                variant : "solid",
                status : "success",
                position : "bottom",
                isClosable : true,
                duration :3000
              })
            
            setLoadingUpload(false)
            setImageAsFile()
            handleSelectAvatar(downloadURL)
          });
        }
        )
    
    
      }

  return (

            <Box
            w='fit-content'
            position='relative'
            transform='translate(100%,-50%)'
            >

                <Avatar
                src={imageAsPreview || avatarUrl}
                size='2xl'
                />

                <Popover
                isOpen={openImage}
                >

                    <PopoverTrigger>

                        <Tooltip
                        hasArrow
                        label='Change Avatar Image'
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
                        
                    <PopoverContent>

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
                label='Select And Upload Avatar Here'
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
