import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import NavBar from './components/NavBar'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import Event from './components/Event'
import Home from './components/Home/Home'
import AddHabitForm from './components/AddHabitForm'

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events/:eventId" element={<Event />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/events/:eventId/AddHabitCompletion" element={<AddHabitForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
