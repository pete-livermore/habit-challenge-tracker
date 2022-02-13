import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Container, Box, Heading, Flex, Avatar, Text, Textarea, Badge, Image, Button } from '@chakra-ui/react'
import eventImage from '../assets/images/coding-challenge.jpg'

const Event = () => {
  const [eventData, setEventData] = useState({})
  const [isError, setIsError] = useState({ error: false, message: '' })
  const params = useParams()
  const [value, setValue] = React.useState('')


  const handleInputChange = (e) => {
    let inputValue = e.target.value
    setValue(inputValue)
  }


  useEffect(() => {
    const getEventData = async () => {
      try {
        const { data } = await axios.get(`/api/events/${params.eventId}`)
        setEventData(data)
      } catch (err) {
        setIsError({ error: true, message: 'Server error' })
      }
    }
    getEventData()
  }, [params])

  useEffect(() => {
    console.log(Object.keys(eventData))
    console.log(eventData)
  }, [eventData])

  return (
    <>
      {Object.keys(eventData).length ?
        <>
          <Box w='100%' h='450px' pt='6' bgGradient='linear(to-r, brand.900, brand.100)' color='white'>
            <Box ml='12'>
              <Box w='450px'>
                <Image
                  objectFit='cover'
                  /* Commented out code below is the actual code. The code below that is just so we can see an image for example purposes
            <img src={eventData.picture} alt={eventData.name}/> */
                  src={eventImage}
                  alt={eventData.name}
                />
              </Box>
              <Heading pl='4' as='h1' size='xl' mb='4'>{eventData.name}</Heading>
              <Flex>
                <Avatar src='https://bit.ly/sage-adebayo' />
                <Box ml='3'>
                  <Text fontSize='sm' >
                    Created by
                  </Text>
                  <Text fontWeight='bold'>{eventData.owner}</Text>
                </Box>
              </Flex>
            </Box>
          </Box>
          <Container maxW='container.lg' mt='4'>
            <Flex justifyContent='space-between'>
              <Box mt='4' boxShadow='base' p='6' rounded='md' bg='#FFFFFF' mr='4'>
                <Heading as='h2' size='md'>Event description</Heading>
                <p>{eventData.description}</p>
                <Heading as='h2' size='md'>Start date</Heading>
                <p>{new Date(eventData.startDate).toLocaleDateString()}</p>
              </Box>
              <Box>
                <Box p='4' mt='4' backgroundColor='#0075ff' color='white' boxShadow='lg' rounded='md' maxWidth='400px' minWidth='300px'>
                  <Heading as='h4' size='md'>Challengers ({eventData.eventMembers.length})</Heading>
                  <Flex mt='4' w='100%'>
                    {eventData.eventMembers.map(members => {
                      return (
                        <Avatar key={members._id} mr='4' src='https://bit.ly/sage-adebayo' />
                      )
                    })}
                  </Flex>
                </Box>
                <Flex bg='white' w='100%' flexDirection='column' alignItems='center' boxShadow='lg' rounded='md'>
                  <Box mt='6'>
                    <p>Challenge has started</p>
                    <p>Startdate to end date</p>
                  </Box>
                  <Button my='6' w='60%' backgroundColor='#ffbb0f' boxShadow='lg' p='6' rounded='md' bg='white' color='white'>Join today</Button>
                </Flex>
              </Box>
            </Flex>
            <Box mt='4' p='4' backgroundColor='#F7FAFC'>
              <Text mb='8px'>Comment: {value}</Text>
              <Textarea backgroundColor='#FFFFFF'
                value={value}
                onChange={handleInputChange}
                placeholder='Here is a sample placeholder'
                size='sm'
              />
            </Box>
          </Container >
        </>
        :
        <Container>
          {(isError ? <p>{isError.message}</p> : 'Loading')}
        </Container>
      }
    </>
  )
}


export default Event