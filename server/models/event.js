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

eventSchema.virtual('isLive')
  .get(function(){
    const currentDate = new Date().toLocaleDateString()
    if ( currentDate >= this.startDate.toLocaleDateString() && currentDate <= this.endDate.toLocaleDateString()){
      return true
    } else {
      console.log('false')
      return false
    }
  }
  )

eventSchema.virtual('eventMembers', {
  ref: 'User',
  localField: '_id',
  foreignField: 'events._id',
})

eventSchema.set('toJSON', {
  virtuals: true,
})



// pre save 
// check if the event is live 
// live => greater start date and less end date
// return true if it is live




export default mongoose.model('Event', eventSchema)