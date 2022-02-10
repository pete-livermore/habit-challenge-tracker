import express from 'express'
import { getAllEvents, getAllHabits, getEvent, updateEvent, deleteEvent, addEvent, updateHabitCompleted } from '../controllers/events.js'
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
  .put(secureRoute, updateEvent)

router.route('events/eventId')
  .delete(secureRoute, deleteEvent)

// Get all habits for a specific user
router.route('/habits')
  .get(secureRoute, getAllHabits)

// Update a single habit completion
router.route('/habits:habitId')
  .get(secureRoute, updateHabitCompleted)

router.route('profile')
  .get(secureRoute, getProfile)

// Account
router.route('/register')
  .post(registerUser)

router.route('/login')
  .post(loginUser)




export default router