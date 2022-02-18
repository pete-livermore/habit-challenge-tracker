import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'

export const registerUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body)
    console.log(newUser)
    const token = jwt.sign({ sub: newUser._id }, secret, { expiresIn: '7 days' })
    return res.status(202).json({ message: 'Registration Successful',token: token  })
    
  } catch (err) {
    console.log(err)
    return res.status(422).json(err)
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    console.log(req.body)
    const userToLogin = await User.findOne({ email: email })
    console.log(userToLogin)
    // console.log(userToLogin.validatePassword(password))
    if (!userToLogin || !userToLogin.validatePassword(password)) {
      return res.status(401).json({ message: 'Unauthorised' })
    }
    const token = jwt.sign({ sub: userToLogin._id }, secret, { expiresIn: '7 days' })
    return res.status(200).json({ message: `Welcome back, ${userToLogin.firstName}`, token: token })
  } catch (err) {
    console.log(err)
    return res.status(401).json(err)
  }
}

export const createSession = async (req, res) => {

  try {
    const stripe = require('stripe')('sk_test_TyMeY76Ef4pXsM1rA5rznKax')
    const { priceId } = req.body
    
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          // For metered billing, do not pass quantity
          quantity: 1,
        }
      ],

      success_url: 'http://localhost:3000/?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000',
    })
    console.log(session)
  } catch (error) {
    console.log(error)
  }

}
