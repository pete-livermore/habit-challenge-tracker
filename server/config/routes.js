import express from 'express'
import { getAllEvents, getEvent, updateEvent, deleteEvent, addEvent, joinEvent, getUserSingleHabit, getUserHabits, updateHabitComplete, addHabitComplete, deleteSingleHabit } from '../controllers/events.js'
import { registerUser, loginUser } from '../controllers/auth.js'
import { secureRoute } from './secureRoute.js'
import { getProfile, getAllProfile } from '../controllers/users.js'

const router = express.Router()

// GET all events and POST event
router.route('/events')
  .get(getAllEvents)
  .post(secureRoute, addEvent)

//GET, UPDATE and DELETE a single event + JOIN an event
router.route('/events/:eventId')
  .get(getEvent)
  .put(secureRoute, updateEvent)
  .delete(secureRoute, deleteEvent)
  .post(secureRoute, joinEvent)

// GET and ADD all habits for a specific user
router.route('/events/:eventId/habits')
  .get(secureRoute, getUserHabits)
  .post(secureRoute, addHabitComplete)

// GET, UPDATE and ADD single habit completion
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