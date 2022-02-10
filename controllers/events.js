import Event from '../models/event.js'
// import user from '../models/user.js'
import User from '../models/user.js'

export const getAllEvents = async (_req, res) => {
  try {
    const events = await Event.find()
    console.log(events)
    return res.status(200).json(events)
  } catch (err) {
    console.log(err)
  }
}

export const getEvent = async (req, res) => {
  try {
    const { id } = req.params
    const event = await Event.findById(id)
    return res.status(200).json(event)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: 'Not Found' })
  }
}

export const updateEvent = async (req, res) => {
  const { eventId } = req.params
  console.log(eventId)
  try {
    const eventToUpdate = await Event.findById(eventId)
    console.log('eventToUpdate', eventToUpdate)
    if (!eventToUpdate.owner.equals(req.currentUser._id)) throw new Error('Unauthorised')
    console.log(req.body)
    Object.assign(eventToUpdate, req.body)
    await eventToUpdate.save()
    return res.status(201).json(eventToUpdate)
  } catch (err) {
    console.log(err)
    return res.status(422).json(err)
  }
}

export const getAllHabits = async (req, res) => {
  try {
    const currentUserProfile = await User.findById(req.currentUser._id)
    const habitsForUser = currentUserProfile.habitCompletions
    console.log('user-habits', habitsForUser)
    return res.status(200).json(habitsForUser)
  } catch (err) {
    console.log(err)
  }
}

