import Event from '../models/event.js'


export const addLike = async (req, res) => {
  try {
    const { eventId } = req.params
    const event = await Event.findById(eventId)
    console.log(req.body.value)
    event.likes += req.body.value
    console.log(event.likes)
    event.save()
    res.status(201).json(event)
  } catch (err) {
    console.log(err)
  }
}