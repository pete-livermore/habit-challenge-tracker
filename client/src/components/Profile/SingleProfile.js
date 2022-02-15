import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Select, Spinner, VStack, HStack, Center, Container, Box, Heading, Flex, Avatar, Text, Textarea, Badge, Image, Button } from '@chakra-ui/react'
import { Link, useParams } from 'react-router-dom'
import { getTokenFromLocalStorage, userIsAuthenticated } from '../helper/auth'
import { HabitsActivity} from '../helper/habitStats'

const SingleProfile = () => {

  const [profileData, setProfileData] = useState(null)
  const [loggedInProfile, setLoggedInProfile] = useState(null)
  const [eventData, setEventData] = useState([])
  const [filterHabits, setFilterHabits] = useState({
    event: '',
    date: ''
  })
  const [habitsFiltered, setHabitsFiltered] = useState(null)

  // const [isError, setIsError] = useState({ error: false, message: '' })
  // const navigate = useNavigate()

  const { userId } = useParams()

  useEffect(() => {

    const getEventsData = async () => {
      try {
        const { data } = await axios.get(`/api/events`)
        setEventData(data)
        console.log('This is setEventData -> ', data)
        // console.log(data)
      } catch (err) {
        // setIsError({ error: true, message: 'Server error' })
      }
    }
    getEventsData()

    const getProfileData = async () => {
        try {
            const token = localStorage.getItem('tinyhabits-token')
            console.log(token)
            const { data } = await axios.get(`/api/profile/${userId}`)
            console.log('data', data)
            setProfileData(data)
        } catch (err) {
            console.log(err)
        }
    }
    getProfileData()
  }, [userId]) // Only on first render

  useEffect(() => {
    const getLoggedInProfile = async () => {
        try {
            const token = localStorage.getItem('tinyhabits-token')
            console.log(token)
            const { data } = await axios.get(`/api/profile`, {
                headers: {
                  Authorization: `Bearer ${getTokenFromLocalStorage()}`,
                }
            })
            // console.log('data', data)
            setLoggedInProfile(data)
        } catch (err) {
            console.log(err)
        }
    }
    getLoggedInProfile()
}, [])

  function filterHabitsFunction(e) {
    console.log(e.target.value)
    console.log(e.target.name)
    setFilterHabits({ ...filterHabits, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (profileData) {
      let filteredHabits
      if ((filterHabits.event === 'All' | filterHabits.event === '') && (filterHabits.date === 'All' | filterHabits.date === '')) {
        filteredHabits = profileData.habitCompletions
      } else if (filterHabits.event === 'All' | filterHabits.event === '') {
        filteredHabits = profileData.habitCompletions.filter(habit => new Date(habit.createdAt).toLocaleDateString() === filterHabits.date)
      } else if (filterHabits.date === 'All' | filterHabits.date === '') {
        filteredHabits = profileData.habitCompletions.filter(habit => eventData.filter(event => event._id === habit.event)[0].name === filterHabits.event)
      } else {
        filteredHabits = profileData.habitCompletions.filter(habit => (new Date(habit.createdAt).toLocaleDateString() === filterHabits.date) && (eventData.filter(event => event._id === habit.event)[0].name === filterHabits.event))
      }
      console.log('filtered habits ->', filteredHabits)
      setHabitsFiltered(filteredHabits)
    }


  }, [filterHabits, profileData, eventData])

  return (
        <>
            {profileData ?
                <>
                    <Flex zIndex='0' p='0' mt='5' name="wrapper" width='80%' direction={{ base: 'column', md: 'row' }}>
                        <VStack display='flex' name="content" direction='column' width='70%' alignItems='flex-start'>
                            <Box name="header" mb='70px' >
                                <Box name="image" w='450px'>
                                    <Avatar
                                        borderRadius='full'
                                        boxSize='150px'
                                        src={profileData.picture !== '' ? profileData.picture : ''}
                                        alt='profile picture' />
                                </Box>
                                <Box name="headline">
                                    <Text mt='3' size='lg' color='secondary'>Email: {profileData.email}</Text>
                                    <Heading color='white' mt='3' as='h1' size='2xl' mb='4'>{profileData.firstName + ' ' + profileData.lastName}</Heading>
                                </Box>
                                {loggedInProfile && userIsAuthenticated() && loggedInProfile.id === userId ?
                                    <Link to={`/profile/${profileData.id}/edit-profile`}>
                                        <Button w='20%' mt='3' backgroundColor='#ffbb0f' boxShadow='lg' rounded='md' bg='white' color='white'>Edit</Button>
                                    </Link>
                                    : ''}
                            </Box>
                            <Box>
                                <Flex flexDirection='row' justifyContent='center'>
                                    <Box>
                                        <Flex flexDirection='column' justifyContent='flex-start'>
                                            {habitsFiltered ?
                                                <>
                                                    <Box name="habits-completed-box" p='5' mt='0' color='black' borderTopRadius='10' boxShadow='lg' width='100%'>
                                                        <Heading as='h5' mb='2' size='md'>Habits Completed</Heading>
                                                        <Flex flexDirection='row' justifyContent='center'>
                                                            <Select mr='1' width='60%' className='filterHabit' name="event" id="event" onChange={filterHabitsFunction}>
                                                                <option hidden>Event</option>
                                                                <option>All</option>
                                                                {profileData.events.map(joinedEvent => {
                                                                    // console.log('CHECKKK', eventData.filter(event => event._id === joinedEvent._id)[0].name)
                                                                    return (
                                                                        <option key={joinedEvent._id}>{eventData.length ? eventData.filter(event => event._id === joinedEvent._id)[0].name : '...'}</option>
                                                                    )
                                                                })}
                                                            </Select>
                                                            <Select ml='1' width='30%' className='filterHabit' name="date" id="date" onChange={filterHabitsFunction}>
                                                            <option hidden>Date</option>
                                                            <option>All</option>
                                                            {profileData.habitCompletions.sort(function (a, b) {
                                                                return new Date(b.createdAt) - new Date(a.createdAt)
                                                            }).map(habit => {
                                                                return (
                                                                    <option key={habit._id}>{new Date(habit.createdAt).toLocaleDateString()}</option>
                                                                )
                                                            })}
                                                            </Select>
                                                            </Flex>
                                                    </Box>
                                                    <Flex bg='white' w='100%' flexDirection='column' alignItems='center' boxShadow='lg' borderBottomRadius='10' rounded='md'>
                                                        {habitsFiltered.length ? habitsFiltered.map(habit => {
                                                            return (
                                                                <Box key={habit._id} width='80%' mt='2' mb='2' borderWidth='1px' boxShadow='lg' borderRadius='lg' overflow='hidden'>
                                                                    <Flex flexDirection='column' alignItems='center'>
                                                                    <Link to={`/events/${habit.event}`}><Image src={habit.picture} alt='habit-pic' /></Link>
                                                                    </Flex>
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
                                                                    {loggedInProfile && userIsAuthenticated() && loggedInProfile.id === userId ?
                                                                        <Box>
                                                                            <Flex flexDirection='row' justifyContent='center'>
                                                                                <Box mr='2'>
                                                                                <Link to={`/profile/${profileData.id}/${habit.event}/${habit._id}/edit`}>
                                                                                <Button w='100%' mb='5' backgroundColor='#ffbb0f' boxShadow='lg' rounded='md' bg='white' color='white'>Edit</Button>
                                                                                </Link>
                                                                                </Box>
                                                                                <Box mr='2'>
                                                                                <Link to={`/profile/${profileData.id}/${habit.event}/${habit._id}/delete-habit`}>
                                                                                <Button w='100%' mb='5' backgroundColor='#ffbb0f' boxShadow='lg' rounded='md' bg='white' color='white'>Delete</Button>
                                                                                </Link>
                                                                                </Box>
                                                                            </Flex>
                                                                        </Box>
                                                                        : ''}
                                                                </Box>
                                                            )
                                                        }) : <Text mb='4' fontSize='md'>no habits completed</Text>}
                                                    </Flex>
                                                </>
                                                :
                                                <Text mb='4'>Nothing to see</Text>}
                                        </Flex>
                                    </Box>

                                </Flex>
                            </Box>
                        </VStack>
                        <Container width={{ base: '100%', md: '40%' }} name="widget">
                            <Box name="joined-events-box" p='5' mt='0' backgroundColor='#0075ff' color='white' borderTopRadius='10' w='100%'>
                                <Heading as='h5' size='md'>Joined Events</Heading>
                            </Box>
                            <Flex name="joined-events" p='3' mt='0' bg='white' w='100%' flexDirection='column' alignItems='center' boxShadow='lg' borderBottomRadius='10'>
                                {profileData.events.length ? profileData.events.map(joinedEvent => {
                                    return (
                                        <Text key={joinedEvent._id} as='h4' mb='1.5' mt='1.5' size='md'>- {eventData.length ? eventData.filter(event => event._id === joinedEvent._id)[0].name : '...'}</Text>
                                    )
                                }) : <Text as='h4' size='md'>Events: no events</Text>}
                            </Flex>
                        </Container>
                    </Flex>
                </>
                :
                <Flex flexDirection='row' justifyContent='center'>
                    <Spinner />
                </Flex>
            }
            <Box width='100%' zIndex='-1' position='absolute' top='0' left='0' bgGradient='linear(to-r, primary, thirdary)' height={{ base: '460px', md: '460x', lg: '460' }}>
            </Box>
    </>
  )
}

export default SingleProfile