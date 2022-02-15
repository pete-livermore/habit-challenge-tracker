import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { params, useParams, useNavigate } from 'react-router-dom'
import HabitFormTemplate from './HabitFormTemplate'

const EditHabit = () => {

const params = useParams()
const navigate = useNavigate()

const [singleHabitData, setSingleHabitData] = useState({
    comment: '',
    picture: '',
})

const [ formErrors, setFormErrors ] = useState({
    comment: '',
    picture: '',
  })

  const [ habitError, setHabitError ] = useState('')

    useEffect(() => {
        const getLoggedInProfile = async () => {
            try {
                const token = localStorage.getItem('tinyhabits-token')
                console.log(token)
                const { data } = await axios.get(`/api/events/${params.eventId}/habits/${params.habitId}`, {
                    'headers': {
                        'Authorization': 'Bearer ' + token
                    }
                })
                // console.log('data', data)
                const filterData = { comment: data.comment, picture: data.picture }
                setSingleHabitData(filterData)
            } catch (err) {
                console.log(err)
                setHabitError(err.response)


            }
        }
        getLoggedInProfile()
    }, [params]) // Only on first render


    const handleSubmit = async (e) => {
        e.preventDefault() // prevent reload
        try {
          const token = localStorage.getItem('tinyhabits-token')
      
          await axios.put(`/api/events/${params.eventId}/habits/${params.habitId}`, singleHabitData, {
            'headers': {
              'Authorization': 'Bearer ' + token
            }
            })
            navigate(`/profile/${params.userId}`)
        } catch (err) {
            console.log(err.response.data.message)
            setFormErrors(err.response.data.errors)
          }
        }

        const handleChange = (e) => {
            setSingleHabitData({ ...singleHabitData, [e.target.name]: e.target.value })
            setFormErrors({ ...formErrors, [e.target.name]: '' })
          }

          const handleImageUrl = url => {
            setSingleHabitData({ ...singleHabitData, picture: url })
          }

    console.log(singleHabitData)
    return (
      <HabitFormTemplate 
      handleSubmit={handleSubmit} 
      handleChange={handleChange} 
      formData={singleHabitData}
      formErrors={formErrors}
      habitError={habitError}
      handleImageUrl={handleImageUrl}
    />
    )
}

export default EditHabit