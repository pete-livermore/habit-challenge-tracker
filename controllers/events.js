import Event from '../models/event.js'

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