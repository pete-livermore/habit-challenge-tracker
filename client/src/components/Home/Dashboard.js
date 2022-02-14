import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Container, Flex, Spacer, Box, Heading, Select, Image, Wrap, WrapItem, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, StatGroup, Progress } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'
import eventImage from '../../assets/images/coding-challenge.jpg'
import DiscoverEvents from './DiscoverEvents'
import { useNavigate, Link } from "react-router-dom"
import { getTokenFromLocalStorage, userIsAuthenticated } from '../helper/auth'

const Dashboard = ({ eventList }) => {
  const [profileData, setProfileData] = useState([])
  const [userEvents, setUserEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState({
    name: ''
  })
  const [eventHabitCompletions, setEventHabitCompletions] = useState([])
  const [widget, setWidget] = useState([])
  const breakpoints = createBreakpoints({
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  })
  const navigate = useNavigate()

  useEffect(() => {

    !userIsAuthenticated() && navigate('/login')

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
        console.log(err)
      }
    }
    getProfileData()
  }, [navigate])

  useEffect(() => {
    if (profileData && eventList) {
      const filtered = eventList.filter(event => profileData.events.some(ev => ev._id === event._id))
      console.log('filtered', filtered)
      setUserEvents(filtered)
      setSelectedEvent(filtered[0])
    }
  }, [profileData, eventList])

  const handleOptionChange = (e) => {
    const filtered = userEvents.filter(event => event.name === e.target.value)
    console.log('selected event =>', filtered)
    setSelectedEvent(filtered[0])
  }

  const currentDateFormat = (event) => {
    return new Date(event.startDate).toLocaleDateString()
  }

  const daysLeft = (event) => {
    const currentDate = new Date()
    const endDate = new Date(event.endDate)
    const timeDifference = Math.abs(endDate - currentDate)
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))
    return `${daysDifference} days`
  }

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

  useEffect(() => {
    if (profileData.habitCompletions && selectedEvent && Object.keys(selectedEvent).length) {
      const filtered = profileData.habitCompletions.filter(habit => habit.event === selectedEvent._id)
      setEventHabitCompletions(filtered)
    }
  }, [profileData, selectedEvent])


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
        const completedCells = arr.filter(obj => obj.key === String(completedDates))
        completedCells.forEach(obj => {
          arr[arr.indexOf(obj)] = <WrapItem border='1px' h='25px' w='25px' backgroundColor='#48BB78' borderColor='gray.200' borderRadius='50%' justifyContent='center' key={obj.key} id={obj.key}></WrapItem>
        })
        setWidget(arr)
      } else {
        setWidget(arr)
      }
    }
  }, [selectedEvent, eventHabitCompletions])



  return (
    <Container maxW='container.lg' mb='6'>
      <Heading>User dashboard</Heading>
      {userEvents.length &&
        <Box mt='4' w={[400, 500, 600]}>
          <Select onChange={handleOptionChange} value={selectedEvent.name}>
            {userEvents.map(event => {
              return <option key={event.name} value={event.name}>{event.name}</option>
            })}
          </Select>
        </Box>
      }
      <>

        {selectedEvent &&
          <Flex direction='column' justify='center' mt='4' px='6' py='4' boxShadow='base' p='6' rounded='md' bg='brand.900' color='white'>
            <Box>
              <Heading as='h3' size='lg'>{selectedEvent.name}</Heading>
            </Box>
            <Flex mt='4'>
              <Box w='40%'>
                <Link to={`/events/${selectedEvent._id}`}>
                  <Image
                    objectFit='cover'
                    /* Commented out code below is the actual code. The code below that is just so we can see an image for example purposes
              <img src={selectedEvent.picture} alt={selectedEvent.name}/> */
                    src={eventImage}
                    alt={selectedEvent.name}
                  />
                </Link>
              </Box>
              <Flex w='60%' flexDirection='column' ml='6' justifyContent='space-evenly'>
                <StatGroup w='100%' flexWrap='wrap'>
                  <Stat flexBasis='50%'>
                    <StatLabel>Start date</StatLabel>
                    <StatNumber>{currentDateFormat(selectedEvent)}</StatNumber>
                  </Stat>
                  <Stat flexBasis='50%'>
                    <StatLabel>Days of challenge left</StatLabel>
                    <StatNumber>{daysLeft(selectedEvent)}</StatNumber>
                  </Stat>
                </StatGroup>
                <Box mt='4'>
                  <p>Your completion progress: {((eventHabitCompletions.length / 30) * 100).toFixed(1)}%</p>
                  <Progress borderRadius="1rem" colorScheme='green' size='lg' value={((eventHabitCompletions.length / 30) * 100).toFixed(1)} />
                </Box>
                <Wrap mt='6'>{widget}</Wrap>
              </Flex>
            </Flex>
          </Flex>
        }

      </>
    </Container>
  )
}

export default Dashboard