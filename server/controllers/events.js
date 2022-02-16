import Event from '../models/event.js'
import User from '../models/user.js'

// Events controllers

export const getEvent = async (req, res) => {
  try {
    const { eventId } = req.params
    const event = await Event.findById(eventId).populate('eventMembers').populate('owner').populate('owner.habitCompletions.event')
    return res.status(200).json(event)
  } catch (err) {
    return res.status(404).json({ message: 'Not Found' })
  }
}

export const getAllEvents = async (_req, res) => {
  try {
    const events = await Event.find()
    console.log(events)
    return res.status(200).json(events)
  } catch (err) {
    return res.status(404).json({ message: 'Not Found' })
  }
}


export const addEvent = async (req, res) => {
  try {
    const newEvent = await Event.create({ ...req.body, owner: req.currentUser._id })
    return res.status(200).json(newEvent)
  } catch (err) {
    return res.status(422).json({ message: err.message })
  }
}

export const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params
    const eventToDelete = await Event.findById(eventId)
    if (!eventToDelete.owner.equals(req.currentUser._id)) throw new Error('Unauthorised')
    await eventToDelete.remove()
  } catch (err) {
    return res.status(404).json({ message: err.message })
  }
}

export const updateEvent = async (req, res) => {
  const { eventId } = req.params
  console.log(eventId)
  try {
    const eventToUpdate = await Event.findById(eventId)
    if (!eventToUpdate.owner.equals(req.currentUser._id)) throw new Error('Unauthorised')
    Object.assign(eventToUpdate, req.body)
    await eventToUpdate.save()
    return res.status(201).json(eventToUpdate)
  } catch (err) {
    return res.status(422).json(err)
  }
}

export const joinEvent = async (req, res) => {
  const { eventId } = req.params
  console.log(eventId)
  try {
    
    console.log(req.body)
    
    const currentUserProfile = await User.findById(req.currentUser._id)
    console.log(currentUserProfile)
    const event = await Event.findById(eventId)
    const currentDate = new Date().toLocaleDateString()
    if (currentDate > event.startDate.toLocaleDateString()) throw new Error('Event already started')
    // console.log('events for current user =>', currentUserProfile.events)
    // console.log('current event id =>', eventId)
    // console.log('if statement',currentUserProfile.events.some(event => event._id.equals(eventId)))
    if (currentUserProfile.events.some(event => event._id.equals(eventId))) { //If the user already joined the event, it will remove the user from the event
      currentUserProfile.events.splice(currentUserProfile.events.indexOf(eventId), 1)
    } else {
      currentUserProfile.events.push(eventId) //Otherwise add the user to the event
      console.log(currentUserProfile.events)
    }
    currentUserProfile.save()
    return res.status(200).json(currentUserProfile)
  } catch (err) {
    return res.status(422).json({ message: err.message })
  }
}
