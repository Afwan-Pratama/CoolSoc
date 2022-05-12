import React,{useState} from 'react'

import { 
  Button, 
  Flex,
  Icon,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Input
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

import { 
  MdBorderHorizontal,
  MdFormatAlignCenter,
  MdFormatAlignLeft,
  MdFormatAlignRight,
  MdFormatBold,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatUnderlined,
  MdInsertLink,
  MdStrikethroughS} from 'react-icons/md'

import { RiImageAddLine } from 'react-icons/ri'

const TextEditor = () => {

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      DropCursor,
      TextStyle,
      Color,
      Bold,
      HorizontalRule
    ],
    content: '<h2>Halo</h2>',
  })

  if(!editor) {
    return null
  }

  const handleAddImage = () =>{}

  const getHtml = () => {

  const html = editor.getHTML()
  
  console.log(html)
  
}

  return (
    
    <Flex
    flexDirection='column'
    >

    <Flex 
    >

      <IconButton
      size='md' 
      icon={<Icon
          fontSize='xl'
          as={MdFormatBold}
          onClick={()=>editor.chain().focus().toggleBold().run()}/>}
      ></IconButton>

      <IconButton
      size='md' 
      icon={<Icon
          fontSize='xl'
          as={MdFormatItalic}/>}
      ></IconButton>

      <IconButton
      size='md' 
      icon={<Icon
          fontSize='xl'
          as={MdFormatListBulleted}/>}
      ></IconButton>

      <IconButton
        size='md' 
        icon={<Icon
            fontSize='xl'
            as={MdFormatListNumbered}
            />}
      ></IconButton>

      <input
      style={{height: '20px' , width: '20px'}}
      onInput={e => editor.chain().focus().setColor(e.target.value).run()}
      type='color'></input>
      
      <IconButton
        size='md' 
        icon={<Icon
            fontSize='xl'
            as={MdBorderHorizontal}
            />}
          onClick={()=> editor.chain().focus().setHorizontalRule().run()}
      ></IconButton>

      <Popover
      closeOnBlur={false}
      >

          <PopoverTrigger>

            <IconButton
            size='md' 
            icon={<Icon
              fontSize='xl'
              as={RiImageAddLine}
              />}
            ></IconButton>
          
          </PopoverTrigger>
            
          <PopoverContent>

              <PopoverArrow/>

              <PopoverHeader>Upload Image</PopoverHeader>

              <PopoverCloseButton/>
              
              <PopoverBody>Halo</PopoverBody>

              <PopoverFooter>

                <Input type='file' />

              </PopoverFooter>

          </PopoverContent>
      
      </Popover>

      <IconButton
        size='md' 
        icon={<Icon
            fontSize='xl'
            as={MdInsertLink}
            />}
      ></IconButton>

      <IconButton
        size='md' 
        icon={<Icon
            fontSize='xl'
            as={MdStrikethroughS}
            />}
      ></IconButton>

      <IconButton
        size='md' 
        icon={<Icon
            fontSize='xl'
            as={MdFormatAlignLeft}
            />}
      ></IconButton>

      <IconButton
        size='md' 
        icon={<Icon
            fontSize='xl'
            as={MdFormatAlignCenter}
            />}
      ></IconButton>

      <IconButton
        size='md' 
        icon={<Icon
            fontSize='xl'
            as={MdFormatAlignRight}
            />}
      ></IconButton>

      <IconButton
        size='md' 
        icon={<Icon
            fontSize='xl'
            as={MdFormatUnderlined}
            />}
      ></IconButton>
    
    </Flex>
    
    <EditorContent editor={editor} />
    
    <Button onClick={getHtml}>Html</Button>
    
    </Flex>
    
  )
}

export default TextEditor