import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, Navigate, useParams, useNavigate } from 'react-router-dom'
import { Container, VStack, Box, Heading, Flex, Avatar, Text, Textarea, Button } from '@chakra-ui/react'
import eventImage from '../assets/images/coding-challenge.jpg'

const Event = () => {
  const [eventData, setEventData] = useState({})
  const [isError, setIsError] = useState({ error: false, message: '' })
  const params = useParams()
  const [value, setValue] = React.useState('')
  const [profileDetails, setProfileDetails] = useState(null)

  const navigate = useNavigate()

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
      const getProfile = async () => {
        try {  
          const token = localStorage.getItem('tinyhabits-token')
    console.log(token)
    console.log('owner inside profile get', eventData.owner)
          const { data } = await axios.get(`/api/profile/${eventData.owner}`, {
            'headers': {
              'Authorization': 'Bearer ' + token
            }
            })
            // console.log('data', data)
          setProfileDetails(data)
        } catch (err) {
          console.log(err)
        }
      }
      getProfile()
    
  }, [eventData]) // Only on first render

  useEffect(() => {
    console.log(Object.keys(eventData))
    console.log(eventData)
  }, [eventData])

const toAddHabitPage = () => {
  navigate(`/events/${params.eventId}/AddHabitCompletion`)
}

return (
  <>
    {Object.keys(eventData).length ?
      <>
      <Container m='4' maxWidth='container.xl' padding={0} centerContent>
        <Flex z-index='1' name="wrapper" >
          <VStack name="content" m='10' direction='column'>
            <Box name="header" mb='75px'>   
              <Box name="image" w='450px'>
                  <Heading size="4xl">👩‍💻</Heading>
              </Box>
              <Box name="headline">
                <Text mt='10' size='lg' color='secondary'>30 DAY CHALLENGE</Text>
                <Heading color='white' mt='4' as='h1' size='2xl' mb='4'>{eventData.name}</Heading>
              </Box>
              <Box name="event-owner" display='flex'>
                <Link to={`/profile/${eventData.owner}`}>
                  <Avatar  src={profileDetails ? profileDetails.picture : ''} />
                </Link>
                    <Box ml='3'>
                      <Text fontSize='sm'color='secondary' >
                        Created by
                      </Text>
                      <Text fontWeight='bold' color='secondary'>{eventData.owner.firstName} {eventData.owner.lastName}</Text>
                    </Box>
              </Box>
            </Box> 
            <Box name="description" margin-top='40px' boxShadow='base' p='6' rounded='md' bg='#FFFFFF' mr='4'>
                <Heading size='sm'>Event description</Heading>
                <Text>{eventData.description}</Text>
                <Heading as='h2' size='md'>Start date</Heading>
                <Text>{new Date(eventData.startDate).toLocaleDateString()}</Text>      
            </Box>
            <Flex name="comments" mt='4' p='4' backgroundColor='#F7FAFC'>
              <Text mb='8px'>Comment: {value}</Text>
              <Textarea backgroundColor='#FFFFFF'
                value={value}
                onChange={handleInputChange}
                placeholder='Here is a sample placeholder'
                size='sm'
              />
            </Flex>
          </VStack>
          <VStack name="widget">
              <Box name="challengers" p='4' mt='0' backgroundColor='#0075ff' color='white' boxShadow='lg' rounded='md' maxWidth='400px' minWidth='300px'>
                <Heading as='h4' size='md'>Challengers ({eventData.eventMembers.length})</Heading>
                <Flex mt='4' w='100%'>
                  {eventData.eventMembers.map(members => {
                    return (
                      <Link to={`/profile/${members._id}`}>
                        <Avatar key={members._id} mr='4' src={members.picture} />
                      </Link>
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
                <Button onClick={toAddHabitPage} my='6' w='60%' backgroundColor='#ffbb0f' boxShadow='lg' p='6' rounded='md' bg='white' color='white'>Add Completed Habit</Button>
              </Flex>
          </VStack>
          <Box mt='4' p='4' backgroundColor='#F7FAFC'>
            <Text mb='8px'>Comment: {value}</Text>
            <Textarea backgroundColor='#FFFFFF'
              value={value}
              onChange={handleInputChange}
              placeholder='Here is a sample placeholder'
              size='sm'
            />
          </Box>
        </Flex>
      </Container >
      </>
      :
      <>
      <Container>
        {(isError ? <p>{isError.message}</p> : 'Loading')}
      </Container>
      </>
    }
</>
)
}


export default Event