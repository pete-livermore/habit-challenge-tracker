import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import axios from 'axios'
import { ImageUpload } from './helper/ImageUpload'
import { useParams } from 'react-router-dom'

const AddHabitForm = () => {


  const [habitFormData, setHabitFormData] = useState({
    comment: '',
    picture: '',
  })

  const [ formErrors, setFormErrors ] = useState({
    comment: '',
    picture: '',
  })

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
      await axios.post(`/api/events/${eventId}/habits`, habitFormData)
      // Redirect using the navigate variable, passing in the route we want to redirect to
    } catch (err) {
      setFormErrors(err.response.data.errors)
    }
  }

  const handleImageUrl = url => {
    setHabitFormData({ ...habitFormData, picture: url })
  }

  console.log(habitFormData)
  return (
    <div className="form-page">
      <Container>
        <Form onSubmit={handleSubmit} className='mt-4'>
          <h2>Add Completed Habit</h2>
          <Form.Group className='mb-2'>
            <Form.Label htmlFor='comment'>Comment</Form.Label>
            <Form.Control onChange={handleChange} type="text" name="comment" placeholder='Comment' defaultValue={habitFormData.comment} />
            {formErrors.comment && <Form.Text>{formErrors.comment}</Form.Text>}
          </Form.Group>
          <ImageUpload
            value={habitFormData.picture}
            name='picture'
            handleImageUrl={handleImageUrl}
          />
          <Form.Group className='mt-4 text-center'>
            <Button className='btn btn-light' type="submit">Add Completed Habit</Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  )
}

export default AddHabitForm