import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Heading, Flex, Box, Container, Text, Image, Spinner } from '@chakra-ui/react'
import Dashboard from './Dashboard.js'
import { getTokenFromLocalStorage, userIsAuthenticated } from '../helper/auth'
import { startDateFormat, endDateFormat } from '../helper/eventData'
import moment from 'moment'

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
          <Container display='flex' flexDirection='column' mb='16' name='discover' maxW='container.lg' mt='' m='0' p='0'>
            {userIsAuthenticated()
              ?
              <Heading textAlign={{ base: 'center', md: 'left' }} mt='10' mb='5' size='lg'>Discover challenges</Heading>
              :
              <Heading color='white' textAlign='center' mt='5' mb='8' size='lg'>Discover challenges</Heading>
            }

            <Flex name='discover-container' alignItems='center' w='100%' justify='space-between' flexDirection={{ base: 'column', md: 'row', lg: 'row' }} flexWrap='wrap' mt='4' mb='6'>
              <>
                {events.map(event => {
                  const { name, subTitle, startDate, endDate, _id, picture, emoji, } = event
                  return (
                    <Flex key={_id} name="actions" p='4' mb='5' bgGradient='linear(to-r, white, gray.100)' width='300px' height='320px' flexDirection='column' borderWidth='1px' alignItems='center' justifyContent='flex-start' boxShadow='2xl' borderRadius='10'>
                      <Link to={`/events/${_id}`}>
                        <Heading textAlign='center' pt='10' fontSize="6em">{emoji}</Heading>
                        <Box name="headline" pl='4' pr='4' mb='4' width=''>
                          <Heading textAlign='center' name='eventName' color='primary' mt='0' size='lg'>{name}</Heading>
                          <Text textAlign='center' mt='4' color='gray.500'> {moment.utc(startDate).format('MMM Do')} - {moment.utc(endDate).format('MMM Do')}</Text>

                        </Box>

                      </Link>
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


