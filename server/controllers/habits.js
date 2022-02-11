import User from '../models/user.js'

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
    const currentUserProfile = await User.findById(req.currentUser._id).populate('habitCompletions')
    const singleHabitForUser = currentUserProfile.habitCompletions.id(habitId)
    if (!singleHabitForUser) throw new Error('Habit not found')
    console.log('singe-user-habits', singleHabitForUser)
    return res.status(200).json(singleHabitForUser)
  } catch (err) {
    console.log(err)
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

export const addHabitComplete = async (req, res) => {
  try {
    const { eventId } = req.params
    const userToFetch = await User.findById(req.currentUser._id).populate('habitCompletions') 
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

export const deleteSingleHabit = async (req, res) => {
  try {
    const { habitId } = req.params
    const currentUserProfile = await User.findById(req.currentUser._id)
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
