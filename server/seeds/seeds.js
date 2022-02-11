import mongoose from 'mongoose' // mongoose will allow us to connect to the DB
import eventData from './data/events.js' // Bring in the data file
import userData from './data/users.js'
import { dbURI } from '../config/environment.js'
import Event from '../models/event.js' // Bring in our Movie model
import User from '../models/user.js'

const seedDatabase = async () => {
  try {
    // Connect to the data base
    await mongoose.connect(dbURI)
    console.log('Database connected')

    // Drop all data from the database
    await mongoose.connection.db.dropDatabase()
    console.log('Database dropped')
    
    // Seed all the collections we have with our data
    const usersAdded = await User.create(userData)

    const eventWithOwners = eventData.map(event => {
      return { ...event, owner: usersAdded[0]._id }
    })

    const eventsAdded = await Event.create(eventWithOwners)

    console.log(`${eventsAdded.length} events added`)
    console.log(`${usersAdded.length} users added`)
    console.log(eventsAdded)
    console.log(usersAdded)

    // Close database connection
    await mongoose.connection.close()
    console.log('Bye')

  } catch (err) {
    console.log(err)
    await mongoose.connection.close()
  }
}

seedDatabase()