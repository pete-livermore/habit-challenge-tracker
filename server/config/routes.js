import express from 'express'
import { secureRoute } from './secureRoute.js'
import { registerUser, loginUser } from '../controllers/auth.js'
import { getAllEvents, getEvent, updateEvent, deleteEvent, addEvent, joinEvent } from '../controllers/events.js'
import { getSingleProfile, getProfile, getAllProfile } from '../controllers/users.js'
import { getUserSingleHabit, getUserHabits, updateHabitComplete, addHabitComplete, deleteSingleHabit } from '../controllers/habits.js'
import { addComment, getAllComments } from '../controllers/comments.js'

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

// ADD a comment for a specific event
router.route('/events/:eventId/comments')
  .post(secureRoute, addComment)
  .get(getAllComments)

// GET, UPDATE and ADD single habit completion
router.route('/events/:eventId/habits/:habitId')
  .get(secureRoute, getUserSingleHabit)
  .put(secureRoute, updateHabitComplete)
  .delete(secureRoute, deleteSingleHabit)

router.route('/profile')
  .get(secureRoute, getProfile)

router.route('/profile/:userId')
  .get(getSingleProfile)

router.route('/profile/all')
  .get(getAllProfile)

// Account
router.route('/register')
  .post(registerUser)

router.route('/login')
  .post(loginUser)

export default router