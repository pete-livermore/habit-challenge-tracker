import react, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Text, Textarea, Flex, Avatar, Heading, FormControl, FormLabel, Button, Spinner, Alert, AlertIcon } from '@chakra-ui/react'
import { userIsAuthenticated } from './helper/auth'
import axios from 'axios'

const Comments = () => {
  const [commentFormData, setCommentFormData] = useState({
    text: '',
  })
  // const [formErrors, setFormErrors] = useState({
  //   text: '',
  // })

  // const [backEndError, setBackEndError] = useState('')
  const [comments, setComments] = useState(null)
  const [hasError, setHasError] = useState({ error: false, message: '' })
  const { eventId } = useParams()
  const [formSubmitted, setFormSubmitted] = useState(false)

  useEffect(() => {
    const getAllComments = async () => {
      try {
        const { data } = await axios.get(`/api/events/${eventId}/comments`)
        setComments(data)
      } catch (err) {
        setHasError({ error: true, message: err.message })
      }
    }
    getAllComments()
  }, [formSubmitted, eventId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log('hello')
      const token = localStorage.getItem('tinyhabits-token')
      await axios.post(`/api/events/${eventId}/comments`, commentFormData, {
        'headers': {
          'Authorization': 'Bearer ' + token
        }
      })
      setFormSubmitted(true)
      setCommentFormData({ text: '' })
      // const timer = setTimeout(() => {
      //   console.log('timer')

      // }, 1000)
      // return clearTimeout(timer)
    } catch (err) {
      // setBackEndError(err.response.data.message)
      // setFormErrors(err.response.data.errors)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormSubmitted(false)
    }, 1000)
    return () => clearTimeout(timer);
  }, [formSubmitted])

  const handleInputChange = (e) => {
    setCommentFormData({
      text: e.target.value
    })
  }

  const handleClick = () => {
    console.log('hello')
  }

  const generateDate = (comment) => {
    if (new Date(comment.createdAt).toLocaleDateString() === new Date().toLocaleDateString()) return 'Today'
    if (new Date(comment.createdAt).getDate() === new Date().getDate() - 1) return 'Yesterday'
    else return new Date(comment.createdAt).toLocaleDateString()
  }

  return (
    <>
      {userIsAuthenticated() &&
        <>
          <Box mt='6' p='4' backgroundColor='#F7FAFC' w='100%' boxShadow='lg' rounded='md'>
            <form onSubmit={handleSubmit}>
              <Text mb='8px' fontWeight='700'>Join the conversation</Text>
              <Textarea backgroundColor='#FFFFFF'
                value={commentFormData.text}
                onChange={handleInputChange}
                placeholder='Leave a comment'
                size='sm'
              />
              <Button colorScheme='blue' mt='2' type='submit'>Comment</Button>
            </form>
            {formSubmitted &&
              <Alert mt='4' status='success'>
                <AlertIcon />
                'Comment submitted!'
              </Alert>
            }
          </Box>
          {comments !== null ?
            <Box ml='4' mt='6' p='4' backgroundColor='#F7FAFC' w='100%' boxShadow='lg' rounded='md'>
              <Heading as='h3' size='sm' mb='4'>Comments</Heading>
              {comments.length ?
                comments.map(comment => {
                  return (
                    <Flex key={comment._id} backgroundColor='white' mb='4' ml='2' p='2'>
                      <Avatar src='' />
                      <Box ml='3'>
                        <Flex>
                          <Text fontWeight='bold' mr='2'>
                            {`${comment.owner.firstName} ${comment.owner.lastName} `}
                          </Text>
                          <Text fontSize='sm' color='gray.500' lineHeight='190%'>{`  ${generateDate(comment)} at ${String(comment.createdAt).substring(11, 16)}`}</Text>
                        </Flex>
                        <Text fontSize='sm'>{comment.text}</Text>
                        <Text fontSize='sm' color='gray.500' onClick={handleClick}>Reply</Text>
                      </Box>
                    </Flex>
                  )
                })
                :
                <Text color='gray.500'>No comments yet</Text>
              }
            </Box>
            : hasError.error ? (
              <Alert status='error'>
                <AlertIcon />
                {hasError.message}
              </Alert>) : <Spinner />
          }
        </>
      }
    </>
  )
}

export default Comments
