import React from 'react'

import { 
    Avatar,
    Flex, 
    Heading, 
    Image, 
    Text,
    useMediaQuery} from '@chakra-ui/react'

import { Pagination } from '@nextui-org/react'

import { useQuery } from '@apollo/client'

import { useParams , useNavigate} from 'react-router-dom'

import { useCookies } from 'react-cookie'

import { fetchViewProfile , fetchUserData } from '../../graphql/query'

import { Navbar, SpinnerPage , PostContainer } from '../../components'

import defaultBackground from '../../assets/default-bg.jpg'

export default function ViewProfile() {

    const param = useParams()

    const navigate = useNavigate()

    const [cookies] = useCookies()
    
    const [isLargerThan500px] = useMediaQuery('(min-width:500px)')

    const {data : dataUser, loading : loadingUser} = useQuery(fetchUserData,{
        variables : {
            uid : cookies.uid
        }
    })

    const {data : dataProfile , loading : loadingProfile ,refetch} = useQuery(fetchViewProfile,{
        
        variables:{
            username : param.username,
            offset : (param.page*10 - 10) || 0,
            limit : 10
        }
    
    })

    if (loadingProfile || loadingUser){

        return <SpinnerPage/>

    }

    let totalPage

    if(dataProfile.user[0].posts_aggregate.aggregate.count % 10 > 0){
        totalPage = parseInt((dataProfile.user[0].posts_aggregate.aggregate.count /10)+1)
    }
    else{
        totalPage = parseInt(dataProfile.user[0].posts_aggregate.aggregate.count / 10)
    }

    const handleRefetchLike = () => {
    
        refetch()
    
    }

    const handleChangePage = (e) =>{

        if(e===1){
        return navigate('/user/'+dataProfile.user[0].username)
        }
        return navigate('/user/'+dataProfile.user[0].username+'/'+e)

    }

    return (
        
        <Flex
        flexDir='column'
        gap='12'
        pb='32'
        >

            <Navbar 
            avatarUrl={dataUser.user[0].user_avatar.avatar_url}
            username={dataUser.user[0].username}
            />

            <Flex
            position='relative'
            flexDir='column'
            alignItems='center'
            pt={isLargerThan500px?'':'28'}
            >

                <Image
                w='full'
                h={isLargerThan500px?'500px':'300px'}
                objectFit='cover' 
                src={dataProfile.user[0].user_avatar.background_url || defaultBackground} 
                />

                <Flex
                position='absolute'
                flexDir={isLargerThan500px?'row':'column'}
                transform={isLargerThan500px?'translateY(340%)':'translateY(100%)'}
                alignItems={isLargerThan500px?'flex-end':'center'}
                gap={isLargerThan500px?'12':'4'}
                >

                    <Avatar
                    size='2xl'
                    src={dataProfile.user[0].user_avatar.avatar_url}
                    />
                    
                    <Flex
                    flexDir='column'
                    alignItems={isLargerThan500px?'flex-start':'center'}
                    >

                        <Heading>{dataProfile.user[0].username}</Heading>

                        <Text
                        color='gray.500'
                        fontWeight='semibold'
                        >
                        {(dataProfile.user[0].user_detail.first_name + ' ' +
                        dataProfile.user[0].user_detail.last_name)}
                        </Text>

                    </Flex>
       
                </Flex>
            
            </Flex>

            <Flex
            mt='24'
            justifyContent='center'
            gap='12'
            alignItems='center'
            flexDir={isLargerThan500px?'row':'column'}
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
                    >{dataProfile.user[0].posts_aggregate.aggregate.count}</Text>
                    
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
                    >{dataProfile.user[0].comments_aggregate.aggregate.count}</Text>
                
                    <Text>Commented</Text>
                
                </Flex>

            </Flex>


            <Flex
            flexDirection='column'
            alignItems='center'
            rowGap='12'
            >

                <Heading>
                {(dataProfile.user[0].user_detail.first_name + ' ' +
                dataProfile.user[0].user_detail.last_name+`'s Posts`)}
                </Heading>

                    {dataProfile.user[0].posts.map((post,index)=>(

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
