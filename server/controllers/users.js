import User from '../models/user.js'

export const getProfile = async (req, res) => {
  try {
    const userToFetch = await User.findById(req.currentUser._id)
    if (!userToFetch) throw new Error('User not found')
    return res.status(200).json(userToFetch)
  } catch (err) {
    return res.status(404).json({ message: err.message })
  }
}

export const getAllProfile = async (req, res) => {
  try {
    const userToFetch = await User.find()
    if (!userToFetch) throw new Error('User not found')
    return res.status(200).json(userToFetch)
  } catch (err) {
    return res.status(404).json({ message: err.message })
  }
}

export const getSingleProfile = async (req, res) => {
  try {
    const { userId } = req.params
    const userToFetch = await User.findById(userId)
    if (!userToFetch) throw new Error('User not found')
    return res.status(200).json(userToFetch)
  } catch (err) {
    return res.status(404).json({ message: err.message })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const userToFetch = await User.findById(req.currentUser._id)
    if (!userToFetch) throw new Error('Event not found')
    Object.assign(userToFetch, req.body)
    await userToFetch.save()
    res.status(200).json(userToFetch)
  } catch (err) {
    return res.status(404).json({ message: err.message })
  }
}
