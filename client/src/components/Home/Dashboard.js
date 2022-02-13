import react, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container } from '@chakra-ui/react'
import { Flex, Spacer } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'
import { Wrap, WrapItem } from '@chakra-ui/react'
import eventImage from '../../assets/images/coding-challenge.jpg'
import DiscoverEvents from './DiscoverEvents'
const jwtStr = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjA2NzhiMWFhNjc4M2FmZTgzMjEzMzAiLCJpYXQiOjE2NDQ1OTEyOTUsImV4cCI6MTY0NTE5NjA5NX0.2F81v9QC9aFjBgSKyDnLnG4oT3J9s5zuDFDhi18msFc'

const Dashboard = ({ eventList }) => {
  const [profileData, setProfileData] = useState([])
  const [userEvents, setUserEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState({})
  const [eventHabitCompletions, setEventHabitCompletions] = useState([])
  const [widget, setWidget] = useState([])
  const breakpoints = createBreakpoints({
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  })

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const res = await axios.get('/api/profile', {
          'headers': {
            'Authorization': 'Bearer ' + jwtStr
          }
        })
        setProfileData(res.data)
      } catch (err) {
      }
    }
    getProfileData()
  }, [])

  useEffect(() => {
    eventList.forEach(event => console.log(event._id))
    const filtered = eventList.filter(event => profileData.events.some(ev => ev._id === event._id))
    setUserEvents(filtered)
    setSelectedEvent(filtered[0])
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
        arr.push(<WrapItem className='widgetCells' key={day} id={day}>{`Day ${i + 1}`}</WrapItem>)
      })
      if (eventHabitCompletions.length) {
        const completedDates = eventHabitCompletions.map(habit => new Date(habit.createdAt).toLocaleDateString())
        const completedCells = arr.filter(obj => obj.key === String(completedDates))
        completedCells.forEach(obj => {
          arr[arr.indexOf(obj)] = <WrapItem className='widgetCells completed' key={obj.key} id={obj.key}>Completed</WrapItem>
        })
        setWidget(arr)
      } else {
        setWidget(arr)
      }
    }
  }, [selectedEvent, eventHabitCompletions])


  return (
    <Container maxW='container.lg'>
      <Heading>User dashboard</Heading>
      {userEvents &&
        <Box mt='4' w={[400, 500, 600]}>
          <Select onChange={handleOptionChange} value={selectedEvent}>
            {userEvents.map(event => {
              return <option key={event.name} value={event.name}>{event.name}</option>
            })}
          </Select>
        </Box>
      }
      <>
        {selectedEvent &&
          <Flex direction='column' justify='center' mt='4'>
            <Box>
              <Heading as='h3' size='lg'>{selectedEvent.name}</Heading>
            </Box>
            <Flex>
              <Box w={[400, 500, 500]}>
                <Image
                  objectFit='cover'
                  src={eventImage}
                  alt={selectedEvent.name}
                />
              </Box>
              {/* Commented out code below is the actual code. The code below that is just so we can see an image for example purposes
              <img src={selectedEvent.picture} alt={selectedEvent.name} className='w-100' /> */}
              {/* <img src={eventImage} alt={selectedEvent.name} className='w-100' /> */}
              <Box flexGrow='1' pl='3'>
                <Flex>
                  <Box mr='2'>Start date:</Box>
                  <Box>{currentDateFormat(selectedEvent)}</Box>
                </Flex>
                <Flex>
                  <Box mr='2'>Your habit completion streak:</Box>
                  <Box>{calcStreak()}</Box>
                </Flex>
                <Flex>
                  <Box mr='2'>Your completion %:</Box>
                  <Box>{`${((eventHabitCompletions.length / 30) * 100).toFixed(2)}%`}</Box>
                </Flex>
                <Flex>
                  <Box mr='2'>Days of challenge left:</Box>
                  <Box>{daysLeft(selectedEvent)}</Box>
                </Flex>
              </Box>
            </Flex>
          </Flex>
        }
        <Wrap mt='4'>
          {widget.length && widget}
        </Wrap>
      </>
    </Container>
  )
}

export default Dashboard