import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Heading } from '@chakra-ui/react'

const Home = () => {

  const [ events, setEvents ] = useState([])

  useEffect(() => {
    const getEvents = async () => {
      try {
        const { data } = await axios.get('/api/events')
        setEvents(data)
      } catch (err) {
        console.log(err)
      }
    }
    getEvents()
  },[]) // Only on first render

  return (
    <>
    <Heading>Home</Heading>
    {events ?
      events.map(event => {
        const { name, _id, description } = event
        
        return (
          <div key={_id}>
            <div>{name}</div>
            <div>{description}</div>
          </div>
        )  

      })
      :
      <p>Nothing to see</p>
    }
    </>
  )
}

export default Home