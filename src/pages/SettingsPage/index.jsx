import React from 'react'

import { 
    Flex, 
    Heading,
    TabList,
    Tabs,
    Tab, 
    TabPanel,
    TabPanels,
    Text} from '@chakra-ui/react'

import { useQuery } from '@apollo/client'

import { useCookies } from 'react-cookie'

import { fetchUserData } from '../../graphql/query'

import { Navbar, SpinnerPage , ColorModeSwitcher } from '../../components'

export default function SettingsPage() {

    const [cookies] = useCookies()

    const {data,loading} = useQuery(fetchUserData,{
        variables : {
            uid : cookies.uid
        }
    })

    if(loading){
        return <SpinnerPage/>
    }
  
    return (
        <>

            <Navbar
            avatarUrl={data.user[0].user_avatar.avatar_url}
            username={data.user[0].username}
            />

            <Flex
            py='32'
            px={['2','10','32','52','64']}
            flexDir='column'
            rowGap='12'
            >
                <Heading>Settings</Heading>

                <Tabs
                variant='enclosed-colored'
                >

                    <TabList>
                        <Tab>Appreance</Tab>
                    </TabList>


                    <TabPanels>

                        <TabPanel
                        display='flex'
                        p='12'
                        >

                            <Flex
                            alignItems='center'
                            columnGap='12'
                            >

                                <Text>Color Mode : </Text>

                                <ColorModeSwitcher/>
                            
                            </Flex>

                        </TabPanel>
                
                    </TabPanels>
                
                </Tabs>
            
            </Flex>

        </>
  )

}
