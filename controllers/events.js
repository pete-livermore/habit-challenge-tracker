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
    const { eventId } = req.params
    const event = await Event.findById(eventId)
    return res.status(200).json(event)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: 'Not Found' })
  }
}

//Delete Event events/:eventId


export const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params
    const eventToDelete = await Event.findById(eventId)
    console.log('request',req.currentUser._id)
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