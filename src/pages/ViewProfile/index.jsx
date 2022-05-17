import React from 'react'

import { 
    Avatar, 
    Box,  
    Flex, 
    Heading, 
    Image, 
    Text} from '@chakra-ui/react'

import { Pagination } from '@nextui-org/react'

import { useQuery } from '@apollo/client'

import { useParams , useNavigate} from 'react-router-dom'

import { fetchViewProfile } from '../../graphql/query'

import { Navbar, SpinnerPage , PostContainer } from '../../components'

import defaultBackground from '../../assets/default-bg.jpg'

export default function ViewProfile() {

    const param = useParams()

    const navigate = useNavigate()

    const {data,loading,refetch} = useQuery(fetchViewProfile,{
        
        variables:{
            username : param.username,
            offset : (param.page*10 - 10) || 0,
            limit : 10
        }
    
    })

    if (loading){

        return <SpinnerPage/>

    }

    let totalPage

    if(data.user[0].posts_aggregate.aggregate.count % 10 > 0){
        totalPage = parseInt((data.user[0].posts_aggregate.aggregate.count /10)+1)
    }
    else{
        totalPage = parseInt(data.user[0].posts_aggregate.aggregate.count / 10)
    }

    const handleRefetchLike = () => {
    
        refetch()
    
    }

    const handleChangePage = (e) =>{

        if(e===1){
        return navigate('/user/'+data.user[0].username)
        }
        return navigate('/user/'+data.user[0].username+'/'+e)

    }
    
    return (
        
        <Flex
        flexDir='column'
        gap='12'
        mb='32'
        >

            <Navbar 
            avatarUrl={data.user[0].user_avatar.avatar_url}
            username={data.user[0].username}
            />

            <Box
            position='relative'
            >

                <Image
                w='full'
                h='500px'
                objectFit='cover' 
                src={data.user[0].user_avatar.background_url || defaultBackground} 
                />

                <Flex
                position='absolute'
                left='20%'
                transform='translateY(-50%)'
                alignItems='flex-end'
                gap='12'
                >

                    <Avatar
                    size='2xl'
                    src={data.user[0].user_avatar.avatar_url}
                    />
                    
                    <Box>

                        <Heading>{data.user[0].username}</Heading>

                        <Text
                        color='gray.500'
                        fontWeight='semibold'
                        >
                        {(data.user[0].user_detail.first_name + ' ' +
                        data.user[0].user_detail.last_name)}
                        </Text>

                    </Box>
       
                </Flex>
            
            </Box>

            <Flex
            mt='24'
            justifyContent='center'
            columnGap='12'
            >
                
                <Flex
                flexDir='column'
                alignItems='center'
                rowGap='2'
                boxShadow='around'
                p='4'
                borderRadius='25px'
                w='200px'
                >

                    <Text
                    fontWeight='bold'
                    bg='primary.100'
                    borderRadius='25px'
                    color='white'
                    w='full'
                    textAlign='center'
                    >Total Post</Text>
                    
                    <Text
                    fontSize='2xl'
                    fontWeight='extrabold'
                    >{data.user[0].posts_aggregate.aggregate.count}</Text>
                    
                    <Text>Posted</Text>
                
                </Flex>

                <Flex
                flexDir='column'
                alignItems='center'
                rowGap='2'
                boxShadow='around'
                p='4'
                borderRadius='25px'
                w='200px'
                >
                
                    <Text
                    fontWeight='bold'
                    bg='primary.100'
                    px='2'
                    borderRadius='25px'
                    w='full'
                    color='white'
                    textAlign='center'
                    >Total Comment</Text>
                
                    <Text
                    fontSize='2xl'
                    fontWeight='extrabold'
                    >{data.user[0].comments_aggregate.aggregate.count}</Text>
                
                    <Text>Commented</Text>
                
                </Flex>

            </Flex>

            <Flex
            flexDirection='column'
            alignItems='center'
            rowGap='12'
            >

                <Heading>
                {(data.user[0].user_detail.first_name + ' ' +
                data.user[0].user_detail.last_name+`'s Posts`)}
                </Heading>

                    {data.user[0].posts.map((post,index)=>(

                    <Flex
                    key={index}
                    flexDirection='column'
                    >

                    <PostContainer 
                    post={post}
                    refetchPost={handleRefetchLike}
                    /> 

                    </Flex>

                    ))}
                
                <Pagination 
                size='lg' 
                rounded 
                shadow 
                total={totalPage}
                page={parseInt(param.page)}
                onChange={handleChangePage}
                />

            </Flex>
        
        </Flex>
  )
}
