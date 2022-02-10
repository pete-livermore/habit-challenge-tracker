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
  // members: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
})

//* Add virtuals for calculating analytics...

// eventSchema.virtual('members', {
//   ref: 'User',
//   localField: '_id', // localField in this case is the _id field on the User document
//   foreignField: 'events' // localField is checked against foreignField for a match, if it matches it will be returned
// })

export default mongoose.model('Event', eventSchema)