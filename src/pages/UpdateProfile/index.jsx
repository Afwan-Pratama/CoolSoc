import React,{useState,useEffect} from 'react'

import { Box , useToast } from '@chakra-ui/react'

import { motion } from 'framer-motion'

import { useCookies } from 'react-cookie'

import { useMutation } from '@apollo/client'

import apolloClient from '../../provider/apollo-client'

import { fetchUserData } from '../../graphql/query'
 
import { updateUser } from '../../graphql/mutation'

import { Navbar, SpinnerPage } from '../../components'

import BackgroundContainer from './components/BackgroundContainer'
import FormContainer from './components/FormContainer'
import AvatarContainer from './components/AvatarContainer'

export default function UpdateProfile() {
    
    const [dataUser,setDataUser] = useState({
        background_url : null,
        avatar_url : null,
        username : null,
        first_name : null,
        last_name : null,
        loading : true
    })
    
    const [cookies] = useCookies()

    const [updateProfile] = useMutation(updateUser)

    const toast = useToast()
    
    useEffect(()=>{
        apolloClient.query({
            query: fetchUserData,
            variables: {
              uid : cookies.uid
            }
          })
          .then((result) => {
            
            let user = result.data.user[0]
    
            setDataUser({
                background_url : user.user_avatar.background_url,
                avatar_url : user.user_avatar.avatar_url,
                username : user.username,
                first_name : user.user_detail.first_name,
                last_name : user.user_detail.last_name,
                loading : false
            })
    
          })
    },[])

    if (dataUser.loading) {
        return <SpinnerPage/>
    }

    const handleSelectBackground = (linkBackground) => {

        setDataUser(prev=>{return{...prev,background_url:linkBackground}})
        console.log(linkBackground)

    }

    const handleSelectAvatar = (linkAvatar) => {

        setDataUser(prev=>{return{...prev,avatar_url:linkAvatar}})
        console.log(dataUser)

    }

    const handleUpload = async (username,firstName,lastName) =>{

        await updateProfile({variables:{
            uid: cookies.uid,
            username : username,
            first_name : firstName,
            last_name : lastName,
            avatar_url : dataUser.avatar_url,
            background_url : dataUser.background_url
        }}).then(()=>{
            toast({
                title : "Yay,Your New Profile is Updated",
                variant : "solid",
                status : "success",
                position : "bottom",
                duration : 3000
              })
        }).catch((error)=>{
            toast({
                title : error.message,
                description : "Please try again",
                variant : "solid",
                status : "error",
                position : "bottom",
                duration : 3000
            })
        })

    }
    
    return (

        <motion.div
        initial={{opacity: 0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        >

            <Navbar
            avatarUrl = {dataUser.avatar_url}
            username = {dataUser.username}
            />

            <Box
            position='relative'
            >

                <BackgroundContainer
                backgroundUrl={dataUser.background_url}
                handleSelectBackground={handleSelectBackground}
                />

                <AvatarContainer
                avatarUrl={dataUser.avatar_url}
                handleSelectAvatar={handleSelectAvatar}
                />
            
            </Box>

            <FormContainer 
            dataDetails = {dataUser}
            handleUpload = {handleUpload}
            />    

        </motion.div>
    )
}
