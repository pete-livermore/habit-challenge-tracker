import express from 'express'
import { getAllEvents, getEvent, updateEvent, deleteEvent, addEvent, joinEvent, getUserSingleHabit, getUserHabits, updateHabitComplete, addHabitComplete, deleteSingleHabit } from '../controllers/events.js'
import { registerUser, loginUser } from '../controllers/auth.js'
import { secureRoute } from './secureRoute.js'
import { getProfile, getAllProfile } from '../controllers/users.js'

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
  .delete(secureRoute, deleteEvent)
  .post(secureRoute, joinEvent)

// Get all habits for a specific user
router.route('/events/:eventId/habits')
  .get(secureRoute, getUserHabits)
  .post(secureRoute, addHabitComplete)

// Update a single habit completion
router.route('/events/:eventId/habits/:habitId')
  .get(secureRoute, getUserSingleHabit)
  .put(secureRoute, updateHabitComplete)
  .delete(secureRoute, deleteSingleHabit)

router.route('/profile')
  .get(secureRoute, getProfile)

router.route('/profile/all')
  .get(getAllProfile)

// Account
router.route('/register')
  .post(registerUser)

router.route('/login')
  .post(loginUser)




export default router