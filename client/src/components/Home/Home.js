import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Heading, Flex, Box, Container, Text, Image, Spinner } from '@chakra-ui/react'
import Dashboard from './Dashboard.js'

const Home = () => {
  const [events, setEvents] = useState([])
  const [hasError, setHasError] = useState({ error: false, message: '' })

  useEffect(() => {
    const getEvents = async () => {
      try {
        const { data } = await axios.get('/api/events')
        setEvents(data)
        console.log(data)
      } catch (err) {
        setHasError({ error: true, message: err.message })
      }
    }
    getEvents()
  }, []) // Only on first render

  return (
    <>
      {events.length ?
        <>
          <Dashboard eventList={events} />
          <Container maxW='container.lg' mt='4'>
            <Heading as='h2' size='lg'>Discover challenges</Heading>
            <Flex w='100%' justify='space-between' mt='4'>
              <>
                {events.map(event => {
                  const { name, _id, description, picture } = event
                  return (
                    <Box key={_id} w='30%' boxShadow='lg' p='6' rounded='md'>
                      <Link to={`/events/${_id}`}>
                        <Text fontWeight='600'>{name}</Text>
                        <Image src={picture} alt='event-img' />
                        <Text>{description}</Text>
                      </Link>
                    </Box>
                  )
                })}
              </>
            </Flex>
          </Container>
        </>
        :
        <Container>
          {hasError.error ? <p>{hasError.message}</p> : <Spinner />}
        </Container>

      }
    </>
  )
}

export default Home