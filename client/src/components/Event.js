import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Container, VStack, Box, Alert, Heading, Flex, Avatar, Text, Image, Button, Spinner } from '@chakra-ui/react'
import { startDateFormat, endDateFormat, daysLeftUntilEvent, daysLeftInEvent, habitDateFormat, todayDateFormat, eventBeforeStartDate, eventAfterEndDate} from './helper/eventData'
import { userIsAuthenticated, getTokenFromLocalStorage } from './helper/auth'
import { HabitsCompleted } from './helper/habitStats'
import Comments from './Comments'
import likeIcon from '../assets/images/like_icon_unclicked.png'
import likeIconClicked from '../assets/images/like_icon_clicked.png'


const Event = () => {
  const [eventData, setEventData] = useState({})
  const [isError, setIsError] = useState({ error: false, message: '' })
  const { eventId } = useParams()
  const [value, setValue] = React.useState('')
  const [profileData, setProfileData] = useState({})
  const [eventHabitCompletions, setEventHabitCompletions] = useState([])
  const [habitsFiltered, setHabitsFiltered] = useState(null)
  const [userJoined, setUserJoined] = useState('')
  const [widget, setWidget] = useState([])
  const [hasError, setHasError] = useState('')
  const [joinError, setJoinError] = useState('')
  const [likeClick, setLikeClick] = useState({ liked: false, operator: 1 })

  const navigate = useNavigate()

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
  }, [eventId, likeClick])


  useEffect(() => {
    const getProfileData = async () => {
      try {
        const res = await axios.get('/api/profile', {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          }, 
        })
        setProfileData(res.data)
      } catch (err) {
        setHasError({ error: true, message: err.message })
      }
    }
    getProfileData()
  }, [eventId])

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`/api/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`
        }
      })
    } catch (err) {
      console.log('form error ->',joinError)
      console.log(err.response)
      setJoinError(err.response.data.message)
    }
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

  // handles click of the like icon
  const handleClick = () => {
    if (!likeClick.liked) {
      setLikeClick({ liked: true, operator: -1 })
    } else {
      setLikeClick({ liked: false, operator: 1 })
    }
  }


  useEffect(() => {
    const addLike = async () => {
      try {
        await axios.put(`/api/events/${eventId}/likes`, likeClick, {
          'headers': {
            'Authorization': `Bearer ${getTokenFromLocalStorage()}`,
          },
        })
      } catch (err) {
        setHasError({ error: true, message: err.message })
      }
    }
    addLike()
  }, [eventId, likeClick])


  useEffect(() => {
    console.log(likeClick)
  }, [likeClick])

  return (
    <>
      {Object.keys(eventData).length ? 
        <>
        <Flex zIndex='0' p='0' mt='5' name="wrapper" width='80%' direction={{ base: 'column', md: 'row' }}>
            <VStack display='flex' name="content" mr='10' direction='column' width='70%' alignItems='flex-start' mb='6'>
              <Box name="header" mb='45px' >
                <Box name="image" w='450px'>
                  <Heading fontSize="6em">{eventData.emoji}</Heading>
                </Box>
                <Box name="headline">
                  <Text mt='10' size='lg' color='second'>{eventData.subTitle}</Text>
                  <Heading color='white' mt='4' as='h1' size='2xl' mb='4'>{eventData.name}</Heading>
                </Box>
               <Box mt='6' name="event-owner" display='flex'>
                  <Link to={`/profile/${eventData.owner.id}`}>
                    <Avatar size='md' src={eventData ? eventData.owner.profilePicture : ''} />
                  </Link>
                  <Box ml='3'>
                    <Text fontSize='sm' color='second' >
                      Created by
                    </Text>
                    <Text fontWeight='bold' color='second'>{eventData.owner.firstName} {eventData.owner.lastName}</Text>
                  </Box>
                </Box> 
              </Box>
            <Box name="description"  borderWidth='1px' width='100%' borderRadius='lg' p='6' bg='#FFFFFF' mr='4'>
                <Heading size='sm' mb='5'>Event description</Heading>
                <Text color='gray.500'>{eventData.description}</Text>                
            </Box>
            <Flex name='widget' bg='white' w='100%' flexDirection='column' alignItems='center'rounded='md'>
            {habitsFiltered && habitsFiltered.map(userhabit => {
              return userhabit.map(habit => {
                console.log(habit)
                return (
                <Box name="habit-box" key={habit._id}  mt='5' borderWidth='1px' width='100%' borderRadius='lg' overflow='hidden'>
                <Box pl='6' mt='6' name="event-owner" display='flex'>
                    <Link to={`/profile/${eventData.owner.id}`}>
                      <Avatar size='md' src={habit.profilePicture} />
                    </Link>
                    <Box name='habitOwner' ml='2' display='flex' flexDirection='column'>
                      <Box>
                        <Link to={`/profile/${eventData.owner.id}`}>
                          <Text fontWeight='bold' color='third'>{habit.firstName} {habit.lastName}</Text>
                        </Link>
                      </Box>
                      <Box>
                        <Text fontSize='sm' color='gray.500'>{habitDateFormat(habit)}</Text>
                      </Box>
                    </Box>
                  </Box>
                <Box pl='6' mt='5' name='comment'>
                  <Text color='gray.500' pb='6'>{habit.comment}</Text>
                </Box>
                <Image src={habit.picture} alt='habit-pic' />
              
              </Box>
            )
              }) }) 
            }
            </Flex>

            </VStack>
          <Container width={{ base: '100%', md: '40%'}} name="widget">
              <Box name="challengers" p='8' mt='0' backgroundColor='#0075ff' color='white'  borderTopRadius='10' w='100%'>
                <Heading size='sm'>Challengers ({eventData.eventMembers.length})</Heading>
                <Flex flexWrap='wrap' mt='4' w='100%'>
                  {eventData.eventMembers.map(members => {
                    return (
                      <Link key={members._id} to={`/profile/${members._id}`}>
                        <Avatar mb='4' mr='4' src={members.profilePicture} />
                      </Link>
                    )
                  })}
                </Flex>
              </Box>
              <Flex name="actions" p='8' mt='0' bg='white' w='100%' flexDirection='column' alignItems='center' boxShadow='lg' borderBottomRadius='10'>
              

              {eventData.isLive &&                 
                <Text fontSize={{ base: '12px', md: '16px', lg: '24px' }} fontWeight='bold' textAlign='center'>The challenge<br></br> has {daysLeftInEvent(eventData)} left</Text>}
              {!eventData.isLive && eventBeforeStartDate(eventData) && 
                <>
                <Text fontSize={{ base: '12px', md: '16px', lg: '24px' }} fontWeight='bold' textAlign='center'>The challenge<br></br> starts in {daysLeftUntilEvent(eventData)}</Text>               
                <Button onClick={handleSubmit} fontSize='16px' fontWeight='bold' my='6' w='60%' backgroundColor='#ffbb0f' boxShadow='lg' p='6' rounded='md' bg='white' color='white'>Join Event</Button>

                </>
              }
              {!eventData.isLive && eventAfterEndDate(eventData) && <Text fontSize={{ base: '12px', md: '16px', lg: '24px' }} fontWeight='bold' textAlign='center'>The challenge is over</Text>}
              
              <Text textAlign='center' mt='4'>{startDateFormat(eventData)} - {endDateFormat(eventData)}</Text>
                  {joinError && <Alert status='error' mt={4}>{joinError}</Alert>}
                 
              {eventData.isLive && userIsAuthenticated() &&
                <>
                <HabitsCompleted eventHabitCompletions={eventHabitCompletions} />
                <Button onClick={toAddHabitPage} fontSize='16px' fontWeight='bold' mt='6' w='60%' backgroundColor='fourth' boxShadow='lg' p='6' rounded='md' bg='white' color='white'>Add Habit</Button>
                </>
              }
  
                {/* This is the like click functionality */}
                <Box mt='6' name='likes' display='flex' borderWidth='1px' borderRadius='lg' pl='4' pr='4' pt='2'pb='2' onClick={handleClick} style={{ cursor: 'pointer' }} >
                  <Image boxSize='20px' sized='sm' mr='2' src={!likeClick.liked ? likeIcon : likeIconClicked} ></Image>
                  <Text fontSize='sm' fontWeight='bold'>Likes({eventData.likes})</Text>                
                </Box>
                <Comments />
              </Flex>
          </Container>
            <Box width='100%' zIndex='-1' position='absolute' top='0' left='0' bgGradient='linear(to-r, first, third)' height={{ base: '460px', md: '460x', lg: '460' }}>
              <Text opacity='30%' color='first' fontSize='400px'>30</Text>
            </Box>
          </Flex>
        </>
        :
        <>
          <Container>
            {isError ? <p>{isError.message}</p> : <Spinner />}
          </Container>
        </>
      }
    </>
  )
}


export default Event