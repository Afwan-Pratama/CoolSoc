import React from 'react'

import { 
  Box,
  Button, 
  ButtonGroup, 
  Flex, 
  Heading, 
  Icon, 
  useToast,
  useMediaQuery,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  } from '@chakra-ui/react'

import { useEditor, EditorContent } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import DropCursor from '@tiptap/extension-dropcursor'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Bold from '@tiptap/extension-bold'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Image from '@tiptap/extension-image'
import GapCursor from '@tiptap/extension-gapcursor'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import Underline from '@tiptap/extension-underline'
import Typography from '@tiptap/extension-typography'
import Placeholder from '@tiptap/extension-placeholder'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import BulletList from '@tiptap/extension-bullet-list'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import History from '@tiptap/extension-history'

import { useCookies } from 'react-cookie'

import { useMutation } from '@apollo/client'

import { insertPost } from '../../../graphql/mutation'

import { useNavigate } from 'react-router-dom'

import { 
  MdSend, 
  MdCancel , 
  MdFormatAlignRight,
  MdList
} from 'react-icons/md'

import { GoPlus } from 'react-icons/go'

import { ImTextColor } from 'react-icons/im'

import { FaRedoAlt,FaUndo } from 'react-icons/fa'

import FormatBar from '../components/FormatBar'
import AlignBar from '../components/AlignBar'
import ListBar from '../components/ListBar'
import InsertBar from '../components/InsertBar'
import HistoryBar from '../components/HistoryBar'

const PostEditor = () => {

  const [isLargerThan550px] = useMediaQuery(
    '(min-width:480px)'
  )

  const [cookies] = useCookies()

  const toast = useToast()

  const [ addPost,{loading : loadingSendPost} ] = useMutation(insertPost) 
  
  const navigate = useNavigate()

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      DropCursor,
      TextStyle,
      Color,
      Bold,
      HorizontalRule,
      Image.configure({
        inline : true
      }),
      GapCursor,
      Italic,
      Strike,
      Underline,
      Typography.configure({
        oneHalf: false,
        oneQuarter: false,
        threeQuarters: false,
      }),
      Placeholder.configure({
        placeholder: 'Write something here...',
      }),
      ListItem,
      OrderedList,
      BulletList,
      TextAlign.configure({
        types:['paragraph']
      }),
      Link,
      History
    ],
  })

  if(!editor) {
    return null
  }

  const cancelPost = () =>{
  
    navigate("/")
  
  }

  const sendToServer = () => {

    const html = editor.getHTML()

    addPost({
      variables: {
        uid : cookies.uid,
        content : html
      }
    })
    .then(()=>{
      navigate("/")
    })
    .catch(()=>{
      toast({
        title : "Something Went Wrong",
        description : "Please Try Again",
        variant : "solid",
        status : "error",
        position : "bottom",
        isClosable : true,
        duration : 5000
      })
    })
  
  }

  return (
    <>
      {isLargerThan550px &&
      <Flex
      w={[300,450,700,800,1000]}
      flexDir='column'
      pb='5'
      boxShadow='around'
      borderRadius='25px'
      position='fixed'
      zIndex='10'
      >

        <Heading
        textAlign='center'
        size='md'
        py='5'
        >
          Format
        </Heading>
  
        <Flex 
        alignItems='center'
        flexWrap='wrap'
        justifyContent='center'
        gap='5' 
        >

            <FormatBar 
            editor={editor}
            />

            <AlignBar
            editor={editor}
            />

            <ListBar
            editor={editor}
            />      
            
            <InsertBar
            editor={editor}
            type='post'
            />

            <HistoryBar
            editor={editor}
            />
        
        </Flex>
      
    </Flex>}

    <Flex
    flexDirection='column'
    w={[300,450,700,800,1000]}
    boxShadow='around'
    borderRadius='25px'
    gap='5'
    p={isLargerThan550px?'5': '2'}
    mt={[50,320,320,320,200]}
    >
    
      <Box
      boxShadow={isLargerThan550px?'around' : ''}
      borderRadius='25px'
      p={isLargerThan550px?'5':'2'}
      >

        <Heading
        size='md'
        textAlign='center'
        pb={isLargerThan550px?'5':'2'}
        > 
        Text
        </Heading>

        <Box
        boxShadow='around'
        borderRadius='25px'
        p='5'
        >

          <EditorContent editor={editor} />
      
        </Box>
      
      </Box>

      {!isLargerThan550px && 
          
          <ButtonGroup>
          
          <Popover>

                <PopoverTrigger>

                  <IconButton
                  icon={<Icon
                    fontSize='xl'
                    as={ImTextColor}/>}
                  />

                </PopoverTrigger>
                  
                <PopoverContent
                borderRadius='25px'
                p='4'
                >

                    <PopoverArrow/>

                    <PopoverCloseButton/>
                    
                    <PopoverBody>

                    <FormatBar editor={editor}/>
                
                    </PopoverBody>

                </PopoverContent>
            
          </Popover>

          <Popover>

                <PopoverTrigger>

                <IconButton
                icon={<Icon
                  fontSize='xl'
                  as={MdFormatAlignRight}/>}
                />

                </PopoverTrigger>
                  
                <PopoverContent
                borderRadius='25px'
                p='4'
                >

                    <PopoverArrow/>

                    <PopoverCloseButton/>
                    
                    <PopoverBody>

                    <AlignBar editor={editor}/>
                
                    </PopoverBody>

                </PopoverContent>
            
          </Popover>

          <Popover>

                <PopoverTrigger>

                  <IconButton
                  icon={<Icon
                    fontSize='xl'
                    as={MdList}/>}
                  />

                </PopoverTrigger>
                  
                <PopoverContent
                borderRadius='25px'
                p='4'
                >

                    <PopoverArrow/>

                    <PopoverCloseButton/>
                    
                    <PopoverBody>

                    <ListBar editor={editor}/>
                
                    </PopoverBody>

                </PopoverContent>
            
          </Popover>

          <Popover>

                <PopoverTrigger>

                <IconButton
                icon={<Icon
                  fontSize='xl'
                  as={GoPlus}/>}
                />

                </PopoverTrigger>
                  
                <PopoverContent
                borderRadius='25px'
                p='4'
                >

                    <PopoverArrow/>

                    <PopoverCloseButton/>
                    
                    <PopoverBody>

                    <InsertBar type='comment' editor={editor}/>
                
                    </PopoverBody>

                </PopoverContent>
            
          </Popover>

          <IconButton
          icon={<Icon
            fontSize='xl'
            as={FaUndo}/>}
          onClick={()=>editor.commands.undo()}
          />

          <IconButton
          icon={<Icon
            fontSize='xl'
            as={FaRedoAlt}/>}
          onClick={()=>editor.commands.redo()}
          />

          </ButtonGroup>
      
      }

      {isLargerThan550px &&
      
      <ButtonGroup
      justifyContent='space-between'
      flexDir='row-reverse'
      >

        <Button 
        onClick={sendToServer}
        isLoading={loadingSendPost}
        leftIcon={
          <Icon
          as={MdSend}
          />
        }
        isDisabled={editor.isEmpty}
        >Post</Button>

        <Button
        onClick={cancelPost}
        rightIcon={
          <Icon
          as={MdCancel}
          />
        }
        >
          Cancel
        </Button>
      
      </ButtonGroup> }

      {!isLargerThan550px &&

      <ButtonGroup
      position='fixed'
      bottom='5'
      right='5'
      zIndex='10'
      >
      
        <IconButton
        size='lg'
          icon={<Icon
            fontSize='xl'
            as={MdCancel}/>}
          onClick={cancelPost}
        />

        <IconButton
        size='lg'
          icon={<Icon
            fontSize='xl'
            as={MdSend}/>}
        onClick={sendToServer}
        isLoading={loadingSendPost}
        isDisabled={editor.isEmpty}
        />

      </ButtonGroup>

      }


    </Flex>
  
    
  </>
  )
}

export default PostEditor