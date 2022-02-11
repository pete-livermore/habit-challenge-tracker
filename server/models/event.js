import mongoose from 'mongoose'

// State of event will change - need to think about this is rendered in DB and/or frontend

const { Schema } = mongoose

const eventSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true, maxlength: 500 },
  frequency: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
})

// * Add virtuals for calculating analytics...

eventSchema.virtual('eventMembers', {
  ref: 'User',
  localField: '_id',
  foreignField: 'events._id',
})

eventSchema.set('toJSON', {
  virtuals: true,
})

export default mongoose.model('Event', eventSchema)