import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Container, Image, Badge, VStack, Box, Heading, Flex, Avatar, Text, Textarea, Button } from '@chakra-ui/react'
import { currentDateFormat, endDateFormat, daysLeft} from './helper/eventData'
import { getTokenFromLocalStorage } from './helper/auth'
import { HabitsCompleted, HabitsActivity } from './helper/habitStats'

import Comments from './Comments'

const Event = () => {
  const [eventData, setEventData] = useState({})
  const [isError, setIsError] = useState({ error: false, message: '' })
  const { eventId } = useParams()
  const [value, setValue] = React.useState('')
  const [profileData, setProfileData] = useState({})
  const [eventHabitCompletions, setEventHabitCompletions] = useState([])
  const [habitsFiltered, setHabitsFiltered] = useState(null)

  const [widget, setWidget] = useState([])
  const [hasError, setHasError] = useState({ error: false, message: '' })

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    let inputValue = e.target.value
    setValue(inputValue)
  }

  useEffect(() => {
    const getEventData = async () => {
      try {
        const { data } = await axios.get(`/api/events/${eventId}`)
        console.log(data)
        setEventData(data)
      } catch (err) {
        setIsError({ error: true, message: 'Server error' })
      }
    }
    getEventData()
  }, [eventId])


  useEffect(() => {
    const getProfileData = async () => {
      try {
        const res = await axios.get('/api/profile', {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          }, 
        })
        setProfileData(res.data)
        userJoinedEvent()
      } catch (err) {
        setHasError({ error: true, message: err.message })
      }
    }
    getProfileData()
  }, [eventData])

  useEffect(() => {
    if (profileData.habitCompletions && eventData && Object.keys(eventData).length) {
      const filtered = profileData.habitCompletions.filter(habit => habit.event === eventData._id)
      setEventHabitCompletions(filtered)
    }
  }, [profileData, eventData])

  useEffect(() => {

  }, [eventData])

  const toAddHabitPage = () => {
    navigate(`/events/${eventId}/AddHabitCompletion`)
  } 

  const userJoinedEvent = () => {
   
    const userJoined = profileData.events.some(ev => ev._id === eventData._id)
    console.log('userJoined', userJoined)
    return userJoined  
  } 

  useEffect(() => {
    if (Object.keys(eventData).length) {
      const filteredHabits = (eventData.eventMembers)
      .map(member => member)
      .map(habit => habit.habitCompletions)
      .filter(event => event.event === eventData.event)
      console.log('members.filtered',filteredHabits);
      setHabitsFiltered(filteredHabits) 
    }
  },[eventData])


console.log('eventdata',eventData)
return (
  <>
    {habitsFiltered && Object.keys(eventData).length ?
      <>
        <Flex zIndex='0' p='0' mt='5' name="wrapper" width='80%' direction={{ base: 'column', md: 'row' }}>
          <VStack display='flex' name="content" mr='10' direction='column' width='70%' alignItems='flex-start'>
            <Box name="header" mb='105px' >   
              <Box name="image" w='450px'>
                  <Heading fontSize="6em">{eventData.emoji}</Heading>
              </Box>
              <Box name="headline">
                <Text mt='10' size='lg' color='secondary'>{eventData.subTitle}</Text>
                <Heading color='white' mt='4' as='h1' size='2xl' mb='4'>{eventData.name}</Heading>
              </Box>
              <Box mt='6' name="event-owner" display='flex'>
                <Link to={`/profile/${eventData.owner.id}`}>
                  <Avatar size='md' src={profileData ? profileData.picture : ''} />
                </Link>
                    <Box ml='3'>
                      <Text fontSize='sm'color='secondary' >
                        Created by
                      </Text>
                      <Text fontWeight='bold' color='secondary'>{eventData.owner.firstName} {eventData.owner.lastName}</Text>
                    </Box>
              </Box>
            </Box> 
            <Box name="description" width='100%' boxShadow='base' p='6' rounded='md' bg='#FFFFFF' mr='4'>
                <Heading size='sm' mb='5'>Event description</Heading>
                <Text>{eventData.description}</Text>
                
            </Box>

            <Flex name='widget' bg='white' w='100%' flexDirection='column' alignItems='center' boxShadow='lg' rounded='md'>
            {habitsFiltered.map(userhabit => {
              return userhabit.map(habit => {
                return (
                <Box key={habit._id} maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
                <Link to={`/events/${habit.event}`}><Image src={habit.picture} alt='habit-pic' /></Link>

                <Box p='6'>
                  <Box display='flex' alignItems='baseline'>
                    <Badge borderRadius='full' px='2' colorScheme='teal'>
                      Completed
                    </Badge>
                    <Box
                      color='gray.500'
                      fontWeight='semibold'
                      letterSpacing='wide'
                      fontSize='xs'
                      textTransform='uppercase'
                      ml='2'
                    >
                      {new Date(habit.createdAt).toLocaleDateString()}
                    </Box>
                  </Box>
                  <Box
                    mt='1'
                    fontWeight='semibold'
                    as='h4'
                    lineHeight='tight'
                    isTruncated
                  >
                    {eventData.length ? eventData.filter(event => event._id === habit.event)[0].name : '...'}
                  </Box>

                  <Box>
                    {habit.comment}
                  </Box>
                </Box>
              
              </Box>
            )
              }) }) 
        }
          </Flex>

            <Comments />

            <Flex name="comments" direction='column' boxShadow='base' p='6' rounded='md' width="100%" mt='4' backgroundColor='#F7FAFC'>
              <Textarea backgroundColor='#FFFFFF'
                value={value}
                onChange={handleInputChange}
                placeholder='Leave a comment'
                size='sm'
              />
              <Button mt='4'>Comment</Button>
            </Flex>
          </VStack>
          <Container width={{ base: '100%', md: '40%'}} name="widget">
              <Box name="challengers" p='8' mt='0' backgroundColor='#0075ff' color='white'  borderTopRadius='10' w='100%'>
              <Heading size='sm'>Challengers ({eventData.eventMembers.length})</Heading>
                <Flex mt='4' w='100%'>
                  {eventData.eventMembers.map(members => {
                    return (
                      <Link key={members._id} to={`/profile/${members._id}`}>
                        <Avatar mr='4' src={members.picture} />
                      </Link>
                    )
                  })}
                </Flex>
              </Box>
              <Flex name="actions" p='8' mt='0' bg='white' w='100%' flexDirection='column' alignItems='center' boxShadow='lg'  borderBottomRadius='10'>  
              {eventData.isLive ?
                <Text>The Challenge is live!</Text>
                :
                <Text fontSize={{ base:'12px', md:'16px', lg:'24px' }} fontWeight='bold' textAlign='center'>The challenge<br></br> starts in {daysLeft(eventData)}</Text> }
                <HabitsCompleted m='3' eventHabitCompletions={eventHabitCompletions} /> 

                <Text textAlign='center' mt='4'>{currentDateFormat(eventData)} - {endDateFormat(eventData)}</Text>
              {userJoinedEvent ?
               
                <Button onClick={toAddHabitPage} fontSize='16px' fontWeight='bold' my='6' w='60%' backgroundColor='#ffbb0f' boxShadow='lg' p='6' rounded='md' bg='white' color='white'>Add Habit</Button>
                :
                <Button fontSize='16px' fontWeight='bold' my='6' w='60%' backgroundColor='#ffbb0f' boxShadow='lg' p='6' rounded='md' bg='white' color='white'>JOIN TODAY</Button>

              }
            </Flex>
          </Container>
          <Box width='100%' zIndex='-1' position='absolute' top='0' left='0' bgGradient='linear(to-r, primary, thirdary)' height={{base:'460px', md: '460x', lg: '460'}}>
                  <Text opacity='30%' color='primary' fontSize='400px'>30</Text>
          </Box>
        </Flex>
        
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