import mongoose from 'mongoose'

const { Schema } = mongoose

const eventSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true, maxlength: 500 },
  frequency: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  members: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
})

//* Add virtuals for calculating analytics...

// eventSchema.virtual('members', {
//   ref: 'User',
//   localField: '_id', // localField in this case is the _id field on the User document
//   foreignField: 'events' // localField is checked against foreignField for a match, if it matches it will be returned
// })


export default mongoose.model('Event', eventSchema)