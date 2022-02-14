import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Event from './components/Event'
import Home from './components/Home/Home'
import AddHabitForm from './components/AddHabitForm'
import TopNavbar from './components/navbar/TopNavbar'
import SingleProfile from './components/SingleProfile'
import DeleteHabit from './components/DeleteAndEdit/DeleteHabit'
import Comments from './components/Comments'

const App = () => {
  return (
    <BrowserRouter>
      <TopNavbar zIndex='1' />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events/:eventId" element={<Event />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/events/:eventId/AddHabitCompletion" element={<AddHabitForm />} />
        <Route path="/profile/:userId" element={<SingleProfile />} />
        <Route path="/profile/:userId/:eventId/:habitId/delete-habit" element={<DeleteHabit />} />
        <Route path="/comments" element={<Comments />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
