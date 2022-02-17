import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Flex, VStack, Center, Alert, Box, Heading, Select, Image, Wrap, WrapItem, Stat, StatLabel, StatNumber, StatGroup, Progress, Spinner, Text, Button } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'
import { useNavigate, Link } from "react-router-dom"
import { getTokenFromLocalStorage, userIsAuthenticated } from '../helper/auth'
import { HabitsCompletedDashboard } from '../helper/habitStats'
import EventDropdown from '../helper/eventDropdown'
import { startDateFormat, endDateFormat, daysLeftUntilEvent, daysLeftInEvent, habitDateFormat, todayDateFormat, eventBeforeStartDate, eventAfterEndDate } from '../helper/eventData'


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
        arr.push(<WrapItem h='20px' w='20px' backgroundColor='gray.200' borderRadius='50%' justifyContent='center' key={day} id={day}></WrapItem>)
      })
      if (eventHabitCompletions.length) {
        const completedDates = eventHabitCompletions.map(habit => new Date(habit.createdAt).toLocaleDateString())
        console.log('completed dates =>', completedDates)
        arr.filter(obj => completedDates.includes(obj.key)).forEach(obj => {
          arr[arr.indexOf(obj)] = <WrapItem h='20px' w='20px' backgroundColor='third' borderRadius='50%' justifyContent='center' key={obj.key} id={obj.key}></WrapItem>
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
      await axios.post(`/api/events/${selectedEvent}`, { data: 'hello' }, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`
        }
      })
    } catch (err) {
      console.log(err.response)
    }
  }

  const toAddHabitPage = () => {
    navigate(`/events/${selectedEvent.id}/AddHabitCompletion`)
  }

  return (
    <>
      {userIsAuthenticated() && userEvents.length ?

        <>

          {Object.keys(selectedEvent).length ?

            <Flex name='header' display='flex' width='xxl' flexWrap='wrap' mx='20'>


              <Flex name='welcome-header' justifyContent='flex-start' pb='50' mt='35' pt='50' mr='0' pr={{ base: 0, md: 20 }} display='flex' flexDirection='column' align='left'>
                <Heading fontWeight='regular' size='md' mt='5' mb='3' color='second'>Welcome {profileData.firstName}!</Heading>


                {selectedEvent.isLive &&
                  <Heading size='xl' name='event-selector' mb='5' color='second' textAlign='left'>You have {daysLeftInEvent(selectedEvent)} left in your challenge!</Heading>}
                {!selectedEvent.isLive && eventBeforeStartDate(selectedEvent) &&
                  <Heading size='xl' name='event-selector' mb='5' color='second' textAlign='left'>Your challenge starts in {daysLeftUntilEvent(selectedEvent)}!</Heading>
                }
                {!selectedEvent.isLive && eventAfterEndDate(selectedEvent) && <Text fontSize={{ base: '12px', md: '16px', xl: '24px' }} fontWeight='bold' textAlign='center'>The challenge is over</Text>}

                <EventDropdown mt='5' handleOptionChange={handleOptionChange} selectedEvent={selectedEvent} userEvents={userEvents} />
              </Flex>
              <Flex name="actions" mt='5' bg='white' width='300px' flexDirection='column' alignItems='center' justifyContent='space-evenly' boxShadow='2xl' borderRadius='10'>
                <Link to={`/events/${selectedEvent._id}`}>
                  <Box name="widget-header" display='flex' flexDirection='column' w='300px' minHeight='300px' p='4' justifyContent='space-evenly' borderTopRadius='10' bgGradient='linear(to-r, first, third)' >
                    <Heading textAlign='center' mt='5' fontSize="6em">{selectedEvent.emoji}</Heading>
                    <Box name="headline" pl='4' pr='4' mb='2' width=''>
                      <Text name='subtitle' mt='3' fontSize='14px' color='second'>{selectedEvent.subTitle}</Text>
                      <Heading name='eventName' color='white' mt='0' size='lg'>{selectedEvent.name}</Heading>
                    </Box>

                    {selectedEvent.isLive && userIsAuthenticated() &&
                      <Box name='progress' pl='4' pr='4' mb='6' >
                        <HabitsCompletedDashboard eventHabitCompletions={eventHabitCompletions} />
                      </Box>
                    }

                  </Box>
                </Link>
                {selectedEvent.isLive && userIsAuthenticated() ?
                  <>
                    <Box name='widget-footer' display='flex' h='230px' flexDirection='column' p='6' alignItems='center' justifyContent='flex-end'>
                      <Button onClick={toAddHabitPage} fontSize='16px' fontWeight='bold' w='60%' backgroundColor='fourth' boxShadow='2xl' p='6' rounded='md' bg='white' color='white'>Add Habit</Button>
                      <Wrap p='4'>{widget}</Wrap>
                    </Box>
                  </>
                  :
                  <>
                    <Box display='flex' flexDirection='column' p='6' alignItems='center'>
                      <Link to={`/events/${selectedEvent._id}`} >
                        < Button fontSize='16px' fontWeight='bold' backgroundColor='fourth' p='6' rounded='md' bg='white' color='white'>View Event</Button>
                      </Link>
                    </Box>

                  </>

                }
              </Flex>

            </Flex>


            :
            hasError.error ?
              <p>{hasError.message}</p> : <Spinner />
          }
        </>
        :
        <Box m='6'>
          <Heading color='white' textAlign='center' as='h1' mb='4' mt='6' size='2xl'>Welcome to TinyHabit</Heading>
          <Text textAlign='center' fontSize='xl' color='white'>Create together a new habit in 30 days</Text>
        </Box>
      }
    </>
  )
}

export default Dashboard