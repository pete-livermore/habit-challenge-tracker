import Event from '../models/event.js'
import User from '../models/user.js'

export const getAllEvents = async (_req, res) => {
  try {
    const events = await Event.find()
    console.log(events)
    return res.status(200).json(events)
  } catch (err) {
    return res.status(404).json({ message: 'Not Found' })
  }
}

export const getEvent = async (req, res) => {
  try {
    const { eventId } = req.params
    const event = await Event.findById(eventId)
    return res.status(200).json(event)
  } catch (err) {
    return res.status(404).json({ message: 'Not Found' })
  }
}

export const addEvent = async (req, res) => {
  try {
    const newEvent = await Event.create(req.body)
    return res.status(200).json(newEvent)
  } catch (err) {
    return res.status(422).json({ message: err.message })
  }
}

export const updateHabitCompleted = async (req, res) => {
  try {
    const { habitId } = req.params
    const userToFetch = await User.findById(req.currentUser._id)
    if (!userToFetch) throw new Error('Event not found')
    const habitCompletedToUpdate = userToFetch.id(habitId)
    if (!habitCompletedToUpdate) throw new Error()
    Object.assign(habitCompletedToUpdate, req.body)
    await userToFetch.save()
    res.status(200).json(userToFetch)
  } catch (err) {
    return res.status(404).json({ message: err.message })
  }
}