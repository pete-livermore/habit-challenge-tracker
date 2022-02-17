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
            <Heading as='h2' mt='10' size='lg'>Discover challenges</Heading>
            <Flex w='100%' justify='space-between' flexDirection={{ base: 'column', md: 'row', lg: 'row' }} flexWrap='wrap' mt='4' mb='6'>
              <>
                {events.map(event => {
                  const { name, subTitle, _id, description, picture } = event
                  return (
                    <Flex flexDirection='column' key={_id} w={{ base: '100%', md: '30%', lg: '30%' }} boxShadow='lg' p='6' rounded='md' mb='6'>
                      <Text fontWeight='600'>{name}</Text>
                      <Text fontWeight='500' color='gray.400' mb='2'>{subTitle}</Text>
                      <Link to={`/events/${_id}`}>
                        <Box h='200px' mb='2'>
                          <Image src={picture} alt='event-img' h='100%' />
                        </Box>
                      </Link>
                      <Text mb='2'>{`${description.substring(0, 90)}...`}</Text>
                    </Flex>
                  )
                })}
              </>
              <Box width='100%' zIndex='-1' position='absolute' top='0' left='0' bgGradient='linear(to-r, first, third)' height={{ base: '460px', md: '460x', lg: '460' }}>
              <Text opacity='30%' color='first' fontSize='400px'>30</Text>
            </Box>
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