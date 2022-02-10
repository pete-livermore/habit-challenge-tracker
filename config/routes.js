import express from 'express'
<<<<<<< HEAD
import { addEvent, getAllEvents, getEvent, updateHabitCompleted } from '../controllers/events.js'
=======
import { getAllEvents, getAllHabits, getEvent, updateEvent, deleteEvent } from '../controllers/events.js'
>>>>>>> development
import { registerUser, loginUser } from '../controllers/auth.js'
import { secureRoute } from './secureRoute.js'
import { getProfile } from '../controllers/users.js'

const router = express.Router()

// Get all events
router.route('/events')
  .get(getAllEvents)

<<<<<<< HEAD
// Add an event
router.route('/events')
  .post(secureRoute, addEvent)
//Get single event
=======
//Get/delete single event
>>>>>>> development
router.route('/events/:eventId')
  .get(getEvent)
  .put(secureRoute, updateEvent)

<<<<<<< HEAD
// Update a single habit completion
router.route('/habits:habitId')
  .get(secureRoute, updateHabitCompleted)



=======
router.route('/habits')
  .get(secureRoute, getAllHabits)

  .delete(secureRoute, deleteEvent)
>>>>>>> development

// Account

router.route('/register')
  .post(registerUser)

router.route('/login')
  .post(loginUser)




export default router