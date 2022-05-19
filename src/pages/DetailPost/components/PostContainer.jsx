import React,{useState,useEffect} from 'react'

import {
    Flex,
    Avatar,
    ButtonGroup,
    Button,
    IconButton,
    Icon,
    Popover,
    PopoverArrow,
    PopoverCloseButton,
    PopoverContent,
    PopoverBody,
    PopoverHeader,
    PopoverTrigger,
    Input,
    InputGroup,
    InputRightElement,
    Tooltip,
    useToast,
    useClipboard,
    Text   } from '@chakra-ui/react'

import { FaHeart, FaCommentDots , FaShareAlt, FaRegCopy} from 'react-icons/fa'

import htmr from 'htmr'

import { useMutation } from '@apollo/client'

import { insertLike, deleteLike } from '../../../graphql/mutation'

import { CommentEditor } from '../../../components'

import { useCookies } from 'react-cookie'

export default function PostContainer(props) {
    
    const {post} = props

    const [loadingLike,setLoadingLike] = useState(false)

    const [likePost,setLikePost] = useState(false)

    const [cookies] = useCookies()

    useEffect(()=>{
        
        for(let i= 0 ; i < post.likes.length ; i++){
        
            if(post.likes[i].uid === cookies.uid){
                setLikePost(true)
            }
        
        }

    },[post])

    const {onCopy} = useClipboard(('https://cool-soc.vercel.app/posts' + post.post_id))

    const [addLike] = useMutation(insertLike)

    const [removeLike] = useMutation(deleteLike)

    const toast = useToast()

    const handleRefresh = () =>{

        window.location.reload()

    }
    
    const handleLike = () => {

        setLoadingLike(true)

        if(likePost){
        return removeLike({variables:{
                uid : cookies.uid,
                post_id : post.post_id
            }}).then(()=>{
                setLoadingLike(false)
                setLikePost(false)
                handleRefresh()
            })
        }
        if(!likePost){
        return addLike({variables:{
                uid : cookies.uid,
                post_id : post.post_id
            }}).then(()=>{
                setLoadingLike(false)
                setLikePost(true)
                handleRefresh()
            })
        }    

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

       flexDirection='column'
       >

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
               >

                   {htmr(post.content)}
               
               </Flex>

               <ButtonGroup
               pt='5'
               px='10'
               justifyContent='space-between'
               >

                   <Button
                   bg={likePost?'primary.100':''}
                   color={likePost?'white':''}
                   isLoading={loadingLike}
                   leftIcon={
                       <Icon as={FaHeart}/>
                   }
                   onClick={handleLike}
                   >{post.likes.length}</Button>

                   <Button
                   leftIcon={
                       <Icon as={FaCommentDots}/>
                   }
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
                                   value={('https://cool-soc.vercel.app/post/' + post.post_id)}    
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
                                           onClick={handleCopyShare}
                                           />
                                       
                                       </Tooltip>

                                   </InputRightElement>
                               
                               </InputGroup>
                          
                           </PopoverBody>

                       </PopoverContent>

                   </Popover>
                   
               
               </ButtonGroup>

           </Flex>


           <Flex
           flexDir='column'
           >

               <Flex
               p='5'
               gap='5'
               flexDir='column'
               alignItems='start'
               >


                   {post.comments.map((comment,index)=>(
                      
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
                           <Flex
                            gap='2'
                            alignItems='center'
                            >
                                
                            <Avatar
                            size='xs' 
                            src={comment.user.user_avatar.avatar_url}/>

                            <Text>{comment.user.username}</Text>

                            </Flex>
                            
                            <Flex
                            px='5'
                            py='2'
                            >

                            {htmr(comment.content)}
                        
                            </Flex>
                       
                       </Flex>
                   
                   ))}
               
               
               </Flex>
               
               <CommentEditor
               postId={post.post_id}
               handleSendComment={handleRefresh}
               disableCancel={true}
               />

           </Flex>
     
   </Flex>
    </>

    )
}
