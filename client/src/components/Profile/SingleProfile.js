import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Spinner, HStack, Center, Container, Box, Heading, Flex, Avatar, Text, Textarea, Badge, Image, Button } from '@chakra-ui/react'
import { Link, useParams } from 'react-router-dom'
import { getTokenFromLocalStorage, userIsAuthenticated } from '../helper/auth'
import { HabitsActivity} from '../helper/habitStats'

const SingleProfile = () => {

  const [profileData, setProfileData] = useState(null)
  const [eventData, setEventData] = useState({})
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
        const res = await axios.get('/api/profile', {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          },
        })
        console.log('response', res.data)
        setProfileData(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getProfileData()
  }, [userId]) // Only on first render

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
      // console.log(filteredHabits)
      setHabitsFiltered(filteredHabits)
    }


  }, [filterHabits, profileData, eventData])

  return (
    <>
    <Center>
      
      {profileData &&
        <Box>
          <Box p='4' mt='4' backgroundColor='#0075ff' color='white' boxShadow='lg' rounded='md' maxWidth='400px' minWidth='300px'>
          {userIsAuthenticated() && <Button w='20%' backgroundColor='#ffbb0f' boxShadow='lg' p='6' rounded='md' bg='white' color='white'>Edit</Button>}
            <Center><Avatar
              borderRadius='full'
              boxSize='150px'
              src={profileData.picture !== '' ? profileData.picture : ''}
              alt='profile picture' /></Center>
          </Box>
          <Flex bg='white' w='100%' flexDirection='column' alignItems='center' boxShadow='lg' rounded='md'>
            <Heading as='h4' size='md'>First Name: {profileData.firstName}</Heading>
            <Heading as='h4' size='md'>Last Name: {profileData.lastName}</Heading>
            <Heading as='h4' size='md'>Email: {profileData.email}</Heading>
          </Flex>
        </Box>     
        }
      {profileData &&
        <Box>
          <Flex flexDirection='column' justifyContent='flex-start'>
            <Box>
              <Box p='4' mt='4' backgroundColor='#0075ff' color='white' boxShadow='lg' rounded='md' maxWidth='400px' minWidth='300px'>
                <Heading as='h5' size='sm'>Joined Events</Heading>
              </Box>
              <Flex bg='white' w='100%' flexDirection='column' alignItems='center' boxShadow='lg' rounded='md'>
                {profileData.events.length ? profileData.events.map(joinedEvent => {
                  return (
                    <Text key={joinedEvent._id} as='h4' size='md'>{eventData.length ? eventData.filter(event => event._id === joinedEvent._id)[0].name : '...'}</Text>
                  )
                }) : <Text as='h4' size='md'>Events: no events</Text>}
              </Flex>
            </Box>
          </Flex>
        </Box>
      }
        
    </Center>
        
      {habitsFiltered ?
        <>
        <Flex flexDirection='row' justifyContent='center'>
          <Box>
            <Flex flexDirection='column' justifyContent='flex-start'></Flex>
            <Box p='4' mt='4' backgroundColor='#0075ff' color='white' boxShadow='lg' rounded='md' maxWidth='400px' minWidth='300px'>
              <Heading as='h5' size='sm'>Habits Completed</Heading>
              <select className='filterHabit' name="event" id="event" onChange={filterHabitsFunction}>
                <option hidden>Filter Event</option>
                <option>All</option>
                {profileData.events.map(joinedEvent => {
                  // console.log('CHECKKK', eventData.filter(event => event._id === joinedEvent._id)[0].name)
                  return (
                    <option key={joinedEvent._id}>{eventData.length ? eventData.filter(event => event._id === joinedEvent._id)[0].name : '...'}</option>
                  )
                })}
              </select>
              <select className='filterHabit' name="date" id="date" onChange={filterHabitsFunction}>
                <option hidden>Filter Date</option>
                <option>All</option>
                {profileData.habitCompletions.sort(function (a, b) {
                  return new Date(b.createdAt) - new Date(a.createdAt)
                }).map(habit => {
                  return (
                    <option key={habit._id}>{new Date(habit.createdAt).toLocaleDateString()}</option>
                  )
                })}
              </select>
            </Box>
            <HabitsActivity habitsFiltered={habitsFiltered} eventData={eventData} profileData={profileData} />
          </Box>
        </Flex>
        </>
        :
        <Flex flexDirection='row' justifyContent='center'>
          <Spinner />
        </Flex>
      }
    </>
  )
}

export default SingleProfile