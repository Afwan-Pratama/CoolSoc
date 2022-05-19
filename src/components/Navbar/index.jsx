import React from 'react'

import { Avatar, 
        Box ,
        Flex, 
        Heading, 
        Icon, 
        Link,
        Menu,
        MenuButton,
        MenuDivider,
        MenuItem,
        MenuList,
        useMediaQuery,
        Button,
      } from '@chakra-ui/react'

import { Link  as ReactLink , useNavigate} from 'react-router-dom'

import { useCookies } from 'react-cookie'

import { RiHome2Line , 
  RiNotification2Line,
  RiAccountCircleLine,
  RiLogoutCircleLine,
  RiSettings3Line } from 'react-icons/ri'
  
import { useAuth } from '../../context/FirebaseContext'

export default function Navbar(props) {
  
  const { avatarUrl , username } = props
  
  const { logOut } = useAuth()

  const [isLargerThan480px] = useMediaQuery('(min-width:480px)')

  const navigate = useNavigate()

  // eslint-disable-next-line no-unused-vars
  const [cookies,setCookie,removeCookies ] = useCookies()

  const isLogin = cookies.uid

  const handleToProfile = () =>{

    navigate('/user/'+ username)
  
  }

  const handleToUpdateProfile = () =>{

    navigate('/update-profile')
  
  }

  const handleToSetting = () =>{

    navigate('/settings')

  }

  const handleLogOut = async () =>{

    await logOut()
    removeCookies('uid',{
      sameSite : 'none',
      path: '/',
      secure : true
    })
    navigate("/sign-in")

  }

  return (
    <Flex
    top='0' 
    minWidth='full'
    alignItems='center'
    marginTop='1rem'
    position='fixed'
    zIndex={10}
    >

        <Box w='3rem'/>
        
        <Flex 
        w='full'
        justifyContent='space-between'
        alignItems='center'
        flexDir={isLargerThan480px?'row':'column'}
        bg={isLargerThan480px?'':'primary.100'}
        borderRadius='25px'
        boxShadow={isLargerThan480px?'':'around'}
        >

          <Box
          w={isLargerThan480px?[280,180,300,300,300]:''}
          bg='primary.100'
          color='white'
          py={isLogin?'.2rem':'.7rem'}
          borderRadius='25px'
          textAlign='center'
          boxShadow={isLargerThan480px?'around':''}
          >

            <Heading
            fontSize='2xl'
            >
            CoolSoc
            </Heading>
          
          </Box>  
            
            <Flex 
            w={isLargerThan480px?[280,180,300,300,300]:''}
            alignItems='center'
            justifyContent='space-around'
            columnGap={isLargerThan480px?'':'12'}
            bg='primary.100'
            py='.35rem'
            borderRadius='25px'
            boxShadow={isLargerThan480px?'around':''}
            >
                
                {!isLogin && 

                  <>

                    <Button
                    onClick={()=>navigate('/sign-up')}
                    >
                      Sign Up
                    </Button>

                    <Button
                    onClick={()=>navigate('/sign-in')}
                    >
                      Sign In
                    </Button>
                  
                  </>
                
                }

                {isLogin && 
                
                <>

                  <Link as={ReactLink} to='/'>
                  
                    <Icon 
                    color='white'
                    fontSize='xl'
                    as={RiHome2Line} />
                  
                  </Link>
                  
                  <Link>
                  
                    <Icon 
                    color='white'
                    fontSize='xl'
                    as={RiNotification2Line}/>
                  
                  </Link>
                  
                  <Menu>

                    <MenuButton>

                      <Avatar 
                      size='xs'
                      src={avatarUrl}
                      />
                    
                    </MenuButton>
              
                    <MenuList>

                    <MenuItem
                      display='flex'
                      alignItems='center'
                      gap='5'
                      onClick={handleToProfile}
                      >
                      
                      <Avatar src={avatarUrl} size='2xs'/>
                      {username}
                      
                    </MenuItem>

                    <MenuDivider/>
                      
                    <MenuItem
                      display='flex'
                      alignItems='center'
                      gap='5'
                      onClick={handleToUpdateProfile}
                    >
                      
                      <Icon 
                      fontSize='xl'
                      as={RiAccountCircleLine}/>
                      Update Profile
                      
                    </MenuItem>

                    <MenuDivider/>

                    <MenuItem
                      display='flex'
                      alignItems='center'
                      gap='5'
                      onClick={handleToSetting}
                    >
                      
                      <Icon 
                      fontSize='xl'
                      as={RiSettings3Line}/>
                      Settings
                      
                    </MenuItem>
                      
                      <MenuDivider/>

                      <MenuItem
                      display='flex'
                      alignItems='center'
                      gap='5'
                      onClick={handleLogOut}
                      >
                      
                      <Icon 
                      fontSize='xl'
                      as={RiLogoutCircleLine}/>
              
                        Log Out
                      
                      </MenuItem>
              
                    </MenuList>

                  </Menu>
                
                </>
                
                }
            
            </Flex>
        
        </Flex>
        
        <Box w='3rem' float='right'/>
    
    </Flex>
  )
}
