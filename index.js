import mongoose from 'mongoose'
import express from 'express'
import router from './config/routes.js'
import { port, dbURI } from './config/environment.js'

const app = express()

const startServer = async () => {
  try {
    await mongoose.connect(dbURI, console.log('Mongoose connected'))
    app.use(express.json())
    app.use(((req, res, next) => {
      console.log(`Request received: ${req.method} - ${req.url} `)
      next()
    }))
    app.use(router)
    app.listen(port, () => console.log(`Server running on port ${port}`))
    app.use(((_req, res) => {
      return res.status(404).json({ message: 'Route not found' })
    }))
  } catch (error) {
    console.log(error)
  }
}
startServer()
