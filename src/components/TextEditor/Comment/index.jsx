import React, { useState } from 'react'

import { 
  Box,
  ButtonGroup, 
  Flex, 
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
  Tooltip
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

import { insertComment } from '../../../graphql/mutation'

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

const CommentEditor = (props) => {

  const [loadingComment,setLoadingComment] = useState(false)

  const [isLargerThan550px] = useMediaQuery(
    '(min-width:550px)'
  )

  const {
    handleCancelComment,
    postId,
    handleSendComment}=props

  const [cookies] = useCookies()

  const toast = useToast()

  const [ addComment ] = useMutation(insertComment) 

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

  const sendToServer = () => {

    setLoadingComment(true)

    const html = editor.getHTML()

    addComment({
      variables: {
        post_id : postId,
        uid : cookies.uid,
        content : html
      }
    })
    .then(()=>{
      editor.commands.clearContent()
      handleSendComment()
      setLoadingComment(false)
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
      setLoadingComment(false)
    })
  
  }

  return (
    
    <Flex
    flexDirection='column'
    boxShadow='around'
    borderRadius='25px'
    gap='5'
    p={isLargerThan550px?'5': '2'}
    >
    

      <Box
      boxShadow='around'
      borderRadius='25px'
      p='5'
      >

        <EditorContent editor={editor} />
    
      </Box>
    
      <Flex
      justifyContent='space-between'
      flexDir={isLargerThan550px?'row':'column'}
      gap='2'
      >
        
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

                    <InsertBar editor={editor}/>
                
                    </PopoverBody>

                </PopoverContent>
            
          </Popover>

          <Tooltip
            hasArrow
            label='Undo'
            bg='white'
            color='primary.100'
          >

            <IconButton
            icon={<Icon
              fontSize='xl'
              as={FaUndo}/>}
            onClick={()=>{editor.commands.undo()}}
            />

          </Tooltip>
          
          <Tooltip
            hasArrow
            label='Redo'
            bg='white'
            color='primary.100'
            >

            <IconButton
            icon={<Icon
              fontSize='xl'
              as={FaRedoAlt}/>}
            onClick={()=>{editor.commands.redo()}}
            />
          
          </Tooltip>

        </ButtonGroup>
          
        <ButtonGroup
        justifyContent='flex-end'
        >
          
            <Tooltip
            hasArrow
            label='Cancel Comment'
            bg='white'
            color='primary.100'
            >

              <IconButton
              icon={<Icon
                fontSize='xl'
                as={MdCancel}/>}
              onClick={handleCancelComment}
              />
            
            </Tooltip>

            <Tooltip
            hasArrow
            label='Send Comment'
            bg='white'
            color='primary.100'
            >

              <IconButton
              icon={<Icon
                fontSize='xl'
                as={MdSend}/>}
              onClick={sendToServer}
              isDisabled={editor.isEmpty}
              isLoading={loadingComment}
              />
            
            </Tooltip>

        </ButtonGroup>
      
      </Flex>

    </Flex>
    
  )
}

export default CommentEditor