import React, { useEffect, useState } from 'react'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
// import Container from 'react-bootstrap/Container'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import HabitFormTemplate from './HabitFormTemplate'

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

        const getProfileId = async () => {
          try {  
            const token = localStorage.getItem('tinyhabits-token')
      console.log(token)
            const { data } = await axios.get('/api/profile', {
              'headers': {
                'Authorization': 'Bearer ' + token
              }
              })
               console.log('data', data.id)
               navigate(`/profile/${data.id}`)
              //  setUserProfileId(data.id)
          } catch (err) {
            console.log(err)
          }
        }
        getProfileId()

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
  console.log(getEvent)
  console.log(backEndError)
  return (
<HabitFormTemplate 
          handleSubmit={handleSubmit} 
          handleChange={handleChange} 
          formData={habitFormData}
          formErrors={formErrors}
          habitError={backEndError}
          handleImageUrl={handleImageUrl}
        />
  )
}

export default AddHabitForm