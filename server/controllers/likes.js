import Event from '../models/event.js'


export const addLike = async (req, res) => {
  try {
    const { eventId } = req.params
    const event = await Event.findById(eventId)
    console.log('before', event.likes)
    event.likes += req.body.operator
    await event.save()
    console.log('after', event.likes)
    res.status(201).json(event)
  } catch (err) {
    console.log(err)
  }
}

export const getLikes = async (req, res) => {
  try {
    const { eventId } = req.params
    const event = await Event.findById(eventId)
    res.status(200).json(event.likes)
  } catch (err) {
    console.log(err)
  }
}