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
        MenuList} from '@chakra-ui/react'

import { Link  as ReactLink , useNavigate} from 'react-router-dom'

import { useCookies } from 'react-cookie'

import { RiHome2Line , 
  RiNotification2Line,
  RiAccountCircleLine,
  RiLogoutCircleLine } from 'react-icons/ri'
  
import { useAuth } from '../../context/FirebaseContext'

export default function Navbar(props) {
  
  const { avatarUrl , username } = props
  
  const { logOut } = useAuth()

  const navigate = useNavigate()

  const [cookies,setCookie,removeCookies ] = useCookies()

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
        alignItems='center'>

          <Box
          w='300px'
          bg='primary.100'
          color='white'
          py='.25rem'
          borderRadius='25px'
          textAlign='center'
          >

            <Heading
            fontSize='2xl'
            >
            CoolSoc
            </Heading>
          
          </Box>  
            
            <Flex 
            w='300px'
            alignItems='center'
            justifyContent='space-around'
            bg='primary.100'
            py='.35rem'
            borderRadius='25px'
            >

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
                    >
                    
                    <Icon 
                    fontSize='xl'
                    as={RiAccountCircleLine}/>
                    {username}
                    
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
            
            </Flex>
        
        </Flex>
        
        <Box w='3rem' float='right'/>
    
    </Flex>
  )
}
