import React, { useEffect, useState } from 'react'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
// import Container from 'react-bootstrap/Container'
import axios from 'axios'
import { ImageUpload } from './helper/ImageUpload'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert

} from '@chakra-ui/react'

const AddHabitForm = () => {

  const navigate = useNavigate()

  const [habitFormData, setHabitFormData] = useState({
    comment: '',
    picture: '',
  })

  const [ formErrors, setFormErrors ] = useState({
    comment: '',
    picture: '',
  })

  const [ backEndError, setBackEndError] = useState('')

  const [ getEvent, setGetEvent ] = useState([])

  function handleChange(e) {
    const newObj = { ...habitFormData, [e.target.name]: e.target.value }
    // console.log(newObj)
    setHabitFormData(newObj)
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  const { eventId } = useParams()
  console.log(eventId)

  const handleSubmit = async (e) => {
    e.preventDefault() // prevent reload
    try {
      const token = localStorage.getItem('tinyhabits-token')
  console.log(token)
  
      await axios.post(`/api/events/${eventId}/habits`, habitFormData, {
        'headers': {
          'Authorization': 'Bearer ' + token
        }
        })
      navigate('/profile')
      // Redirect using the navigate variable, passing in the route we want to redirect to
    } catch (err) {
      console.log(err.response.data.message)
      setBackEndError(err.response.data.message)
      setFormErrors(err.response.data.errors)
    }
  }

  const handleImageUrl = url => {
    setHabitFormData({ ...habitFormData, picture: url })
  }

  useEffect(() => {
   const getEventDetails = async () => {
    try {
      const { data } = await axios.get(`/api/events/${eventId}`)
  console.log(data)
  setGetEvent(data)
    } catch (error) {
      console.log(error)
    }
   }
   getEventDetails()
  }, [eventId])

  
  console.log(habitFormData)
  console.log(getEvent.isLive)
  return (
    // <div className="form-page">
    //   <Container>
    //     <Form onSubmit={handleSubmit} className='mt-4'>
    //       <h2>Add Completed Habit</h2>
    //       <Form.Group className='mb-2'>
    //         <Form.Label htmlFor='comment'>Comment</Form.Label>
    //         <Form.Control onChange={handleChange} type="text" name="comment" placeholder='Comment' defaultValue={habitFormData.comment} />
    //         {formErrors.comment && <Form.Text>{formErrors.comment}</Form.Text>}
    //       </Form.Group>
    //       <ImageUpload
    //         value={habitFormData.picture}
    //         name='picture'
    //         handleImageUrl={handleImageUrl}
    //       />
    //       <Form.Group className='mt-4 text-center'>
    //         <Button className='btn btn-light' type="submit">Add Completed Habit</Button>
    //       </Form.Group>
    //     </Form>
    //   </Container>
    // </div>


<Flex width="full" align="center" justifyContent="center">
<Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
    <>
      <Box textAlign="center">
        <Heading>Add Completed Habit</Heading>
        {backEndError && <Alert status='error' mt={4}>{backEndError}</Alert>}
      </Box>
      <Box my={4} textAlign="left">
        <form onSubmit={handleSubmit}>
        {/* Comment */}
        <FormControl isRequired>
        <FormLabel htmlFor='comment'>Comment</FormLabel>
        <Input onChange={handleChange} type="text" name="comment" placeholder='comment' defaultValue={habitFormData.comment} />
        {/* {formErrors.comment && <Alert status='error' mt={4}>{formErrors.comment}</Alert>} */}
        </FormControl>
          {/* Picture */}
        <FormControl isRequired>
        <ImageUpload
            value={habitFormData.picture}
            name='picture'
            handleImageUrl={handleImageUrl}
          />
        </FormControl>
        {/* Error + Button */}
        <Button type="submit" width="full" mt={4}>Register</Button>      
        </form>
      </Box>
    </>
</Box>
</Flex>


  )
}

export default AddHabitForm