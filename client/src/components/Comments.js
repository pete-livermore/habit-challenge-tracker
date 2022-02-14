import react, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Text, Textarea, Flex, Avatar, Heading, FormControl, FormLabel, Button } from '@chakra-ui/react'
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
  // const [userProfileData, setUserProfileData] = useState([])
  const [comments, setComments] = useState([])
  const [hasError, setHasError] = useState({ error: false, message: '' })
  const { eventId } = useParams()
  const [FormSubmitted, setFormSubmitted] = useState(false)

  // useEffect(() => {
  //   const getUserProfileData = async () => {
  //     try {
  //       const token = localStorage.getItem('tinyhabits-token')
  //       console.log(token)
  //       const { data } = await axios.get('/api/profile', {
  //         'headers': {
  //           'Authorization': 'Bearer ' + token
  //         }
  //       })
  //       setUserProfileData(data)
  //     } catch (err) {
  //       setHasError({ error: true, message: err.message })
  //     }
  //   }
  //   getUserProfileData()
  // }, [])

  useEffect(() => {
    const getAllComments = async () => {
      try {
        const { data } = await axios.get('/api/events/6206a53687eae40ed28bf654/comments')
        setComments(data)
      } catch (err) {
        setHasError({ error: true, message: err.message })
      }
    }
    getAllComments()
  }, [FormSubmitted])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('tinyhabits-token')
      console.log(commentFormData)
      await axios.post(`/api/events/6206a53687eae40ed28bf654/comments`, commentFormData, {
        'headers': {
          'Authorization': 'Bearer ' + token
        }
      })
      if (!FormSubmitted) setFormSubmitted(true)
      else setFormSubmitted(false)
    } catch (err) {
      console.log(err.response.data.message)
      // setBackEndError(err.response.data.message)
      // setFormErrors(err.response.data.errors)
    }
  }

  const handleInputChange = (e) => {
    setCommentFormData({
      text: e.target.value
    })
    console.log(commentFormData)
  }

  const handleClick = () => {
    console.log('hello')
  }

  return (
    <>
      {userIsAuthenticated() &&
        <>

          <Box mt='4' p='4' backgroundColor='#F7FAFC'>
            <form onSubmit={handleSubmit}>
              <Text mb='8px'>Comment: {commentFormData.text}</Text>
              <Textarea backgroundColor='#FFFFFF'
                value={commentFormData.text}
                onChange={handleInputChange}
                placeholder='Here is a sample placeholder'
                size='sm'
              />
              <Button type='submit'>Submit comment</Button>
            </form>
          </Box>

          {comments.length &&
            <Box ml='4'>
              <Heading as='h2' size='md' mb='4'>Comments</Heading>
              {comments.map(comment => {
                return (
                  <Flex key={comment._id} backgroundColor='white' mb='2' ml='2'>
                    <Avatar src='' />
                    <Box ml='3'>
                      <Text fontWeight='bold'>
                        {comment.owner}
                      </Text>
                      <Text fontSize='sm'>{comment.text}</Text>
                      <Text onClick={handleClick}>reply</Text>
                    </Box>
                  </Flex>
                )
              })}
            </Box>
          }
        </>
      }
    </>
  )
}

export default Comments
