import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import eventImage from '../../assets/images/coding-challenge.jpg'
import DiscoverEvents from './DiscoverEvents'
import { getPayload } from '../helper/auth'

const Dashboard = ({ eventList }) => {
  const [profileData, setProfileData] = useState([])
  const [userEvents, setUserEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState({})
  const [eventHabitCompletions, setEventHabitCompletions] = useState([])
  const [widget, setWidget] = useState([])

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const token = localStorage.getItem('tinyhabits-token');
        const res = await axios.get('/api/profile', {
          'headers': {
            'Authorization': 'Bearer ' + token
          }
          
        })
        console.log('response',res)
        setProfileData(res.data)
      } catch (err) {
      }
    }
    getProfileData()
  }, [])

  useEffect(() => {
    eventList.forEach(event => console.log(event._id))
    const filtered = eventList.filter(event => profileData.events.some(ev => ev._id === event._id))
    console.log('filtered',filtered)
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
        arr.push(<div className='widgetCells' key={day} id={day}>{`Day ${i + 1}`}</div>)
      })
      if (eventHabitCompletions.length) {
        const completedDates = eventHabitCompletions.map(habit => new Date(habit.createdAt).toLocaleDateString())
        const completedCells = arr.filter(obj => obj.key === String(completedDates))
        completedCells.forEach(obj => {
          arr[arr.indexOf(obj)] = <div className='widgetCells completed' key={obj.key} id={obj.key}>Completed</div>
        })
        setWidget(arr)
      } else {
        setWidget(arr)
      }
    }
  }, [selectedEvent, eventHabitCompletions])


  return (
    <Container>
      <Col lg={8} className='mx-auto'>
        <h2>User dashboard</h2>
        {userEvents &&
          <>
            <label htmlFor='event-selector'>Select event:</label>
            <select name='event-selector' onChange={handleOptionChange}>
              {userEvents.map(event => {
                return <option key={event.name} value={event.name}>{event.name}</option>
              })}
            </select>
          </>
        }
      </Col>
      <>
        {selectedEvent &&
          <Row className='flex-column align-items-center mt-4'>
            <Col lg={8}>
              <h3>{selectedEvent.name}</h3>
            </Col>
            <Col lg={8} className='d-flex flex-wrap'>
              <Col>
                {/* Commented out code below is the actual code. The code below that is just so we can see an image for example purposes
              <img src={selectedEvent.picture} alt={selectedEvent.name} className='w-100' /> */}
                <img src={eventImage} alt={selectedEvent.name} className='w-100' />
              </Col>
              <Col className='ps-2'>
                <Row>
                  <Col><h6>Start date:</h6></Col>
                  <Col>{currentDateFormat(selectedEvent)}</Col>
                </Row>
                <Row>
                  <Col><h6>Your habit completion streak:</h6></Col>
                  <Col>{calcStreak()}</Col>
                </Row>
                <Row>
                  <Col><h6>Your completion %:</h6></Col>
                  <Col>{`${((eventHabitCompletions.length / 30) * 100).toFixed(2)}%`}</Col>
                </Row>
                <Row>
                  <Col><h6>Days of challenge left:</h6></Col>
                  <Col>{daysLeft(selectedEvent)}</Col>
                </Row>
              </Col>
            </Col>
          </Row>
        }
        <Row>
          <Col lg={8} className='d-flex flex-wrap mt-4 mx-auto'>
            {widget.length && widget}
          </Col>
        </Row>
        <Row>
        </Row>
      </>
    </Container>
  )
}

export default Dashboard