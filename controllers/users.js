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