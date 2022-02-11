import react, { useEffect, useState } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import eventImage from '../../assets/images/sample-event-image.jpg'
const jwtStr = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjA2NzhiMWFhNjc4M2FmZTgzMjEzMzAiLCJpYXQiOjE2NDQ1OTEyOTUsImV4cCI6MTY0NTE5NjA5NX0.2F81v9QC9aFjBgSKyDnLnG4oT3J9s5zuDFDhi18msFc'

const Dashboard = ({ eventList }) => {
  const [profileData, setProfileData] = useState([])
  const [userEvents, setUserEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState({})


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
    setSelectedEvent(filtered)
  }

  const currentDateFormat = (event) => {
    const startDate = event.startDate
    const newDate = new Date(startDate).toLocaleDateString()
    return newDate
  }

  const daysLeft = (event) => {
    const currentDate = new Date()
    const endDate = new Date(event.endDate)
    const timeDifference = Math.abs(endDate - currentDate)
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))
    return `${daysDifference} days`
  }

  const streakCalc = (input) => {
    return `${input} days`
  }

  const completionCalc = (input) => {
    const perc = (input / 30) * 100
    return `${perc.toFixed(1)}%`
  }

  // useEffect(() => {
  //   console.log(new Date(selectedEvent.startDate))
  // }, [selectedEvent])

  return (
    <Container>
      {userEvents &&
        <select onChange={handleOptionChange}>
          {userEvents.map(event => {
            return <option key={event.name} value={event.name}>{event.name}</option>
          })}
        </select>
      }
      <>
        {selectedEvent &&
          <Row>
            <h2>{selectedEvent.name}</h2>
            <Col lg={4}>
              <img src={eventImage} alt="30-day coding challenge" className='w-100' />
            </Col>
            <Col lg={8}>
              <Row>
                <Col>Start date</Col>
                <Col>{currentDateFormat(selectedEvent)}</Col>
              </Row>
              <Row>
                <Col>Your running streak</Col>
                <Col>{streakCalc(5)}</Col>
              </Row>
              <Row>
                <Col>Your completion</Col>
                <Col>{completionCalc(profileData.habitCompletions)}</Col>
              </Row>
              <Row>
                <Col>Days left</Col>
                <Col>{daysLeft(selectedEvent)}</Col>
              </Row>
            </Col>
          </Row>
        }
      </>
      <Row>
        This is where the widget goes
      </Row>
    </Container>
  )
}

export default Dashboard