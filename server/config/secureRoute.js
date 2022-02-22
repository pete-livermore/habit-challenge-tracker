import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import { secret } from './environment.js'

export const secureRoute = async (req, res, next) => {
  try {
    console.log(req.headers.authorization)
    if (!req.headers.authorization) throw new Error('Header missing')
    const token = req.headers.authorization.replace('Bearer ', '')
    const payload = jwt.verify(token, secret)
    console.log('payload ->', payload)
    const user = await User.findById(payload.sub)
    console.log('payload.sub ->', payload.sub)
    if (!user) throw new Error('User is not found')
    req.currentUser = user
    console.log('User ->', user)
    next()
  } catch (e) {
    console.log(e)
    return res.status(401).json({ message: 'Unauthorized' })
  }
}