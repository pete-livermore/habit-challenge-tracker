import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Flex, Alert,Box, Heading, Select, Image, Wrap, WrapItem, Stat, StatLabel, StatNumber, StatGroup, Progress, Spinner, Text, Button } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'
import { useNavigate, Link } from "react-router-dom"
import { getTokenFromLocalStorage, userIsAuthenticated } from '../helper/auth'
import { HabitsCompleted } from '../helper/habitStats'
import { startDateFormat, endDateFormat, daysLeftUntilEvent, daysLeftInEvent, habitDateFormat, todayDateFormat, eventBeforeStartDate, eventAfterEndDate} from '../helper/eventData'


const Dashboard = ({ eventList }) => {
  const [profileData, setProfileData] = useState({})
  const [userEvents, setUserEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState({})
  const [eventHabitCompletions, setEventHabitCompletions] = useState([])
  const [widget, setWidget] = useState([])
  const [hasError, setHasError] = useState({ error: false, message: '' })
  const breakpoints = createBreakpoints({
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  })
  const navigate = useNavigate()

  // Fetching user profile data if user is logged in
  useEffect(() => {
    const getProfileData = async () => {
      try {
        const res = await axios.get('/api/profile', {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          },
        })
        console.log('response', res)
        setProfileData(res.data)
      } catch (err) {
        setHasError({ error: true, message: err.message })
      }
    }
    getProfileData()
  }, [navigate])

  // Setting the list of events user has joined and initially populating the selected event
  useEffect(() => {
    console.log(profileData)
    if (eventList.length && Object.keys(profileData).length) {
      const filtered = eventList.filter(event => profileData.events.some(ev => ev._id === event._id))
      setUserEvents(filtered)
      setSelectedEvent(filtered[0])
    }
  }, [profileData, eventList])

  // Changing the selected event on user's input
  const handleOptionChange = (e) => {
    const filtered = userEvents.filter(event => event.name === e.target.value)
    console.log('selected event =>', filtered)
    setSelectedEvent(filtered[0])
  }

  // Calculating the days remaining of the event

  // Calculating the user's best habit completion streak
  const calcStreak = () => {
    console.log(selectedEvent)
    if (!eventHabitCompletions.length) return 0
    if (selectedEvent && Object.keys(selectedEvent).length) {
      const strDate = Date.parse(selectedEvent.startDate)
      const endDate = Date.parse(selectedEvent.endDate)
      const days = []
      for (let i = new Date(strDate); i <= endDate; i.setDate(i.getDate() + 1)) {
        days.push(new Date(i).toLocaleDateString())
      }
      console.log(days)
      const completedDates = eventHabitCompletions.map(habit => new Date(habit.createdAt).toLocaleDateString())
      console.log(completedDates)
      const mapped = days.map(date => {
        return completedDates.includes(date) ? 1 : 0
      })
      let streaks = mapped.reduce((res, n) =>
        (n ? res[res.length - 1]++ : res.push(0), res)
        , [0])
      console.log(streaks.join(","))
      return Math.max(...streaks)
    }
  }

  // Fetching the habit completion data for the selected event
  useEffect(() => {
    if (profileData.habitCompletions && selectedEvent && Object.keys(selectedEvent).length) {
      const filtered = profileData.habitCompletions.filter(habit => habit.event === selectedEvent._id)
      setEventHabitCompletions(filtered)
    }
  }, [profileData, selectedEvent])

  // Generating the circle progress widget
  useEffect(() => {
    const arr = []
    if (selectedEvent && Object.keys(selectedEvent).length) {
      const strDate = Date.parse(selectedEvent.startDate)
      const endDate = Date.parse(selectedEvent.endDate)
      const days = []
      for (let i = new Date(strDate); i <= endDate; i.setDate(i.getDate() + 1)) {
        days.push(new Date(i).toLocaleDateString())
      }
      days.forEach((day, i) => {
        arr.push(<WrapItem border='1px' h='25px' w='25px' borderColor='gray.200' borderRadius='50%' justifyContent='center' key={day} id={day}></WrapItem>)
      })
      if (eventHabitCompletions.length) {
        const completedDates = eventHabitCompletions.map(habit => new Date(habit.createdAt).toLocaleDateString())
        console.log('completed dates =>', completedDates)
        arr.filter(obj => completedDates.includes(obj.key)).forEach(obj => {
          arr[arr.indexOf(obj)] = <WrapItem border='1px' h='25px' w='25px' backgroundColor='#48BB78' borderColor='gray.200' borderRadius='50%' justifyContent='center' key={obj.key} id={obj.key}></WrapItem>
        })
        setWidget(arr)
      } else {
        setWidget(arr)
      }
    }
  }, [selectedEvent, eventHabitCompletions])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`/api/events/${selectedEvent}`, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`
        }
      })
    } catch (err) {
      console.log(err.response)
    }
  }

  const toAddHabitPage = () => {
    navigate(`/events/${selectedEvent}/AddHabitCompletion`)
  }

  return (
    <>
      {userIsAuthenticated() ?
        userEvents.length ?
          <Container width='lg' mb='6'>
            {Object.keys(selectedEvent).length ?
              <>
               
          <Flex name="actions" p='8' mt='0' bg='white' w='100%' flexDirection='column' alignItems='center' boxShadow='lg' borderBottomRadius='10'>
          <Select onChange={handleOptionChange} value={selectedEvent.name}>
                    {userEvents.map(event => {
                      return <option key={event.name} value={event.name}>{event.name}</option>
                    })}
                  </Select>
                  {selectedEvent.isLive &&                 
                    <Text fontSize={{ base: '12px', md: '16px', lg: '24px' }} fontWeight='bold' textAlign='center'>The challenge<br></br> has {daysLeftInEvent(selectedEvent)} left</Text>}
                  {!selectedEvent.isLive && eventBeforeStartDate(selectedEvent) && 
                    <>
                    <Text fontSize={{ base: '12px', md: '16px', lg: '24px' }} fontWeight='bold' textAlign='center'>The challenge<br></br> starts in {daysLeftUntilEvent(selectedEvent)}</Text>               
                                    <Button onClick={handleSubmit} fontSize='16px' fontWeight='bold' my='6' w='60%' backgroundColor='#ffbb0f' boxShadow='lg' p='6' rounded='md' bg='white' color='white'>Join Event</Button>
        
                    </>
                  }
                  {!selectedEvent.isLive && eventAfterEndDate(selectedEvent) && <Text fontSize={{ base: '12px', md: '16px', lg: '24px' }} fontWeight='bold' textAlign='center'>The challenge is over</Text>}
            <Box  mt='4' w={[400, 500, 600]}>
                  
                </Box><Link to={`/events/${selectedEvent._id}`}>
                <Box name="widget-header" w='450px' height='400px' bgGradient='linear(to-r, first, third)' >
                  <Heading fontSize="6em">{selectedEvent.emoji}</Heading>
                  <Box  name="headline">
                  <Text mt='10' size='lg' color='second'>{selectedEvent.subTitle}</Text>
                  <Heading color='white' mt='4' as='h1' size='2xl' mb='4'>{selectedEvent.name}</Heading>
                  {selectedEvent.isLive && userIsAuthenticated() && 
                    <HabitsCompleted eventHabitCompletions={eventHabitCompletions} />   
                  }
                </Box>
                </Box>
                </Link>
                        
             
          {selectedEvent.isLive && userIsAuthenticated() &&
            <>
            
            <Box mt='4'>
            <p>Your best completion streak is: {calcStreak()}</p>
            <Wrap mt='2'>{widget}</Wrap>
          </Box>
            <Button onClick={toAddHabitPage} fontSize='16px' fontWeight='bold' mt='6' w='60%' backgroundColor='fourth' boxShadow='lg' p='6' rounded='md' bg='white' color='white'>Add Habit</Button>
            </>
          }
       

          </Flex>
              </>
              :
              hasError.error ?
                <p>{hasError.message}</p> : <Spinner />
            }
          </Container>
          :
          <>
            <Heading>Welcome {profileData.firstName}</Heading>
            <Text>Start your challenge journey by signing up for a challenge below: </Text>
          </>
        :
        <Container mb='4'>
          <Heading textAlign='center' as='h1' size='lg'>Welcome to TinyHabit</Heading>
          <Text textAlign='center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae libero et sem pulvinar mattis eget nec sapien</Text>
        </Container>
      }
    </>
  )
}

export default Dashboard