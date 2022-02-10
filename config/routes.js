import express from 'express'
import { addEvent, getAllEvents, getEvent, updateHabitCompleted } from '../controllers/events.js'
import { registerUser, loginUser } from '../controllers/auth.js'
import { secureRoute } from './secureRoute.js'
import { getProfile } from '../controllers/users.js'

const router = express.Router()

// Get all events
router.route('/events')
  .get(getAllEvents)

// Add an event
router.route('/events')
  .post(secureRoute, addEvent)
//Get single event
router.route('/events/:eventId')
  .get(getEvent)

// Update a single habit completion
router.route('/habits:habitId')
  .get(secureRoute, updateHabitCompleted)




// Account

router.route('/register')
  .post(registerUser)

router.route('/login')
  .post(loginUser)




export default router