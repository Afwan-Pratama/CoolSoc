import React, { useEffect, useState } from 'react'

import { 
    Flex,
    Avatar,
    Text,
    Button,
    Icon,
    Box,
    SkeletonCircle,
    SkeletonText,
    ButtonGroup,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    Input,
    InputGroup,
    InputRightElement,
    IconButton,
    Tooltip,
    useClipboard,
    useToast
     } from '@chakra-ui/react'

import htmr from 'htmr'

import { FaHeart, FaCommentDots , FaShareAlt, FaRegCopy} from 'react-icons/fa'

import { useLazyQuery , useMutation} from '@apollo/client'

import { useCookies } from 'react-cookie'

import { fetchComments } from '../../../graphql/query'

import { insertLike , deleteLike } from '../../../graphql/mutation'

import { CommentEditor } from '../../../components'

import CommentContainer from './CommentContainer'

export default function PostContainer(props) {
    
    const {post,refetchPost} = props

    const [openComment,setOpenComment] = useState(false)

    const [likePost,setLikePost] = useState(false)

    const [loadingLike,setLoadingLike] = useState(false)

    const [cookies] = useCookies()

    const [getComments,{
        data : dataComments,
        loading : loadingComments,
        refetch}] = useLazyQuery(fetchComments)
    
    useEffect(()=>{
       
        for(let i= 0 ; i < post.likes.length ; i++){
           
            if(post.likes[i].uid === cookies.uid){
                setLikePost(true)
            }
        
        }
    
    },[post])

    const [addLike] = useMutation(insertLike)
    
    const [removeLike] = useMutation(deleteLike)

    const {onCopy} = useClipboard(('http://localhost:3000/post/' + post.post_id))

    const toast = useToast()

    const handleLike = () => {

        setLoadingLike(true)
        if(likePost){
           return removeLike({variables:{
                uid : cookies.uid,
                post_id : post.post_id
            }}).then(()=>{
                setLoadingLike(false)
                setLikePost(false)
                refetchPost()
            })
        }
        if(!likePost){
           return addLike({variables:{
                uid : cookies.uid,
                post_id : post.post_id
            }}).then(()=>{
                setLoadingLike(false)
                setLikePost(true)
                refetchPost()
            })
        }    

    }

    const handleOpenComment = () => {

        if(!dataComments){
        getComments({variables:{
            post_id : post.post_id
        }}).then(()=>{
            setOpenComment((prev)=>{
                return !prev
            })
        })
        }

        if(dataComments){
            setOpenComment((prev)=>{
                return !prev
            })
        }
        
    }


    const handleSendComment = () =>{

        refetch()

    }

    const handleCopyShare = () =>{

        onCopy()

        toast({
            title: "Yay,Link has been copied",
            variant : "solid",
            status:"success",
            isClosable : true,
            duration : 5000,
            position : "bottom"
        })

    }
  
    return (

        <>

            <Flex
            flexDir='column'
            boxShadow='around'
            borderRadius='25px'
            w={[300,450,700,800,1000]}
            p={[7,21,35]}
            >


                <Flex
                alignItems='center'
                gap='2'
                pb='5'
                >
                    
                    <Avatar
                    size='sm' 
                    src={post.user.user_avatar.avatar_url}/>
                    
                    <Text
                    >{post.user.username}</Text>
                    
                </Flex>

                <Flex
                flexDirection='column'
                gap='2'
                px='5'
                maxH={[300,450,700,800,1000]}
                overflowY='scroll'
                >

                    {htmr(post.content)}
                
                </Flex>

                <ButtonGroup
                pt='5'
                px='10'
                justifyContent='space-between'
                >

                    <Button
                    bg={likePost?'primary.100':'gray.100'}
                    color={likePost?'white':'black'}
                    isLoading={loadingLike}
                    leftIcon={
                        <Icon as={FaHeart}/>
                    }
                    onClick={handleLike}
                    >{post.likes.length}</Button>

                    <Button
                    bg={openComment?'primary.100':'gray.100'}
                    color={openComment?'white':'black'}
                    leftIcon={
                        <Icon as={FaCommentDots}/>
                    }
                    onClick={handleOpenComment}
                    >{post.comments_aggregate.aggregate.count}</Button>

                    <Popover>

                        <PopoverTrigger>

                            <IconButton
                            icon={<Icon
                                    as={FaShareAlt}/>}
                            />

                        </PopoverTrigger>

                        <PopoverContent>
                            
                            <PopoverArrow/>

                            <PopoverCloseButton/>

                            <PopoverHeader>Share Post Link</PopoverHeader>

                            <PopoverBody>

                                <InputGroup>
                                
                                    <Input 
                                    isReadOnly
                                    value={('http://localhost:3000/post/' + post.post_id)}    
                                    />

                                    <InputRightElement>
                                        
                                        <Tooltip
                                        hasArrow
                                        label='Copy'
                                        bg='white'
                                        color='primary.100'
                                        >

                                            <IconButton
                                            icon={<Icon
                                                as={FaRegCopy}/>}
                                            onClick={handleCopyShare}/>
                                        
                                        </Tooltip>

                                    </InputRightElement>
                                
                                </InputGroup>
                           
                            </PopoverBody>

                        </PopoverContent>

                    </Popover>
                    
                
                </ButtonGroup>

            </Flex>

            {loadingComments && 
            <Box 
            padding='6' 
            boxShadow='lg' 
            bg='white'
            m='5'
            >
                <SkeletonCircle size='10' />
                <SkeletonText mt='4' noOfLines={4} spacing='4' />
            </Box>
            }

            {openComment &&

            <Flex
            flexDir='column'
            >
 
                <Flex
                p='5'
                gap='5'
                flexDir='column'
                alignItems='start'
                >

                    {dataComments.comments.map((comment,index)=>(
                        <Flex  
                        key={index}
                        flexDir='column'
                        px='5'
                        pt='4'
                        pb='2'
                        borderRadius='25px'
                        boxShadow='around'
                        maxW={[250,400,650,750,950]}
                        >
                            <CommentContainer 
                            comment={comment}/>
                        
                        </Flex>
                    ))}
                
                
                </Flex>
                
                <CommentEditor
                handleCancelComment={()=>{setOpenComment(false)}}
                postId={post.post_id}
                handleSendComment={handleSendComment}
                disableCancel={false}
                />

            </Flex>

            }

        </>

  )
}
