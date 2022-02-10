import Event from '../models/event.js'
import User from '../models/user.js'

// Events controllers

export const getEvent = async (req, res) => {
  try {
    const { eventId } = req.params
    const event = await Event.findById(eventId).populate('eventMembers')
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
    const newEvent = await Event.create(req.body)
    return res.status(200).json(newEvent)
  } catch (err) {
    return res.status(422).json({ message: err.message })
  }
}

export const joinEvent = async (req, res) => {
  try {
    const { eventId } = req.params
    const currentUserProfile = await User.findById(req.currentUser._id)
    currentUserProfile.events.push(eventId)
    currentUserProfile.save()
    return res.status(200).json(currentUserProfile)
  } catch (err) {
    return res.status(422).json({ message: err.message })
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

// Habits completions controllers


export const getUserHabits = async (req, res) => {
  try {
    const currentUserProfile = await User.findById(req.currentUser._id).populate('habitCompletions.event')
    const habitsForUser = currentUserProfile.habitCompletions
    console.log('user-habits', habitsForUser)
    return res.status(200).json(habitsForUser)
  } catch (err) {
    console.log(err)
  }
}

export const getUserSingleHabit = async (req, res) => {
  try {
    const { habitId } = req.params
    const currentUserProfile = await User.findById(req.currentUser._id).populate('habitCompletions.event')
    const singleHabitForUser = currentUserProfile.habitCompletions.id(habitId)
    if (!singleHabitForUser) throw new Error('Habit not found')
    console.log('singe-user-habits', singleHabitForUser)
    return res.status(200).json(singleHabitForUser)
  } catch (err) {
    console.log(err)
  }
}

export const deleteSingleHabit = async (req, res) => {
  try {
    const { habitId } = req.params
    const currentUserProfile = await User.findById(req.currentUser._id).populate('habitCompletions.event')
    const singleHabitForUser = currentUserProfile.habitCompletions.id(habitId)
    if (!singleHabitForUser) throw new Error('Habit not found')
    if (!singleHabitForUser.owner.equals(req.currentUser._id)) throw new Error('Unauthorised')
    await singleHabitForUser.remove()
    await currentUserProfile.save()
    return res.sendStatus(204)
  } catch (error) {
    console.log(error)
  }
}

export const addHabitComplete = async (req, res) => {
  try {
    const { eventId } = req.params
    const userToFetch = await User.findById(req.currentUser._id).populate('habitCompletions.event')
    const habitCompleteToadd = { ...req.body, owner: req.currentUser._id, event: eventId }
    userToFetch.habitCompletions.push(habitCompleteToadd)
    await userToFetch.save()
    return res.status(201).json(userToFetch)
  } catch (err) {
    console.log(err)
  }
}

export const updateHabitComplete = async (req, res) => {
  try {
    const { habitId } = req.params
    const userToFetch = await User.findById(req.currentUser._id)
    if (!userToFetch) throw new Error('Event not found')
    const habitCompletedToUpdate = userToFetch.habitCompletions.id(habitId)
    if (!habitCompletedToUpdate) throw new Error()
    Object.assign(habitCompletedToUpdate, req.body)
    await userToFetch.save()
    res.status(200).json(userToFetch)
  } catch (err) {
    return res.status(404).json({ message: err.message })
  }
}




//Delete Event events/:eventId


export const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params
    const eventToDelete = await Event.findById(eventId)
    console.log('request', req.currentUser._id)
    if (!eventToDelete.owner.equals(req.currentUser._id)) throw new Error('Unauthorised')
    await eventToDelete.remove()
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}

//async req/register
//try and catch
//findbyId
//if not found throw errors
