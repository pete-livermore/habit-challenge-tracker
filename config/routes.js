import express from 'express'
import { getAllEvents, getAllHabits, getEvent, updateEvent, deleteEvent } from '../controllers/events.js'
import { registerUser, loginUser } from '../controllers/auth.js'
import { secureRoute } from './secureRoute.js'
import { getProfile } from '../controllers/users.js'

const router = express.Router()

// Get all events
router.route('/events')
  .get(getAllEvents)

//Get/delete single event
router.route('/events/:eventId')
  .get(getEvent)
  .put(secureRoute, updateEvent)

router.route('/habits')
  .get(secureRoute, getAllHabits)

  .delete(secureRoute, deleteEvent)

// Account

router.route('/register')
  .post(registerUser)

router.route('/login')
  .post(loginUser)




export default router