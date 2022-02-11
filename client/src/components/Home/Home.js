import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Dashboard from './Dashboard'

const Home = () => {

  const [events, setEvents] = useState([])

  useEffect(() => {
    const getEvents = async () => {
      try {
        const { data } = await axios.get('/api/events')
        setEvents(data)
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
    getEvents()
  }, []) // Only on first render

  return (
    <>
      {events ?
        events.map(event => {
          const { name, _id, description, picture } = event

          return (
            <div key={_id}>
              <div>{name}</div>
              <div>{description}</div>
              <img src={picture} alt='event-img' />
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