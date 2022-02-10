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

// * Add virtuals for calculating analytics...

// eventSchema.virtual('eventMembers')
//   .get(function() {
//     const joined = User.find({ events: this._id } )
//     console.log('joined', joined)
//     return joined
//   })


eventSchema.virtual('eventMembers', {
  ref: 'User',
  localField: 'owner', 
  foreignField: '_id', 
})


eventSchema.set('toJSON', {
  virtuals: true,
})

export default mongoose.model('Event', eventSchema)